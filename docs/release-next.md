# 📚 기능 개발 후 프리릴리즈 과정

## 💡 CI/CD 핵심 설계 원칙

### 📌 기능 PR과 프리릴리즈 PR 구분

- 기능 PR을 머지할 때 버전 업데이트 ~ npm 배포까지 스트레이트로 진행해버리면, 개발자가 다음 릴리즈될 버전이 무엇인지 확인할 수 없어 위험함

- 전체적인 배포 흐름을 다음과 같음

  ```bash
  (.changeset/*.md 파일 존재함) - 기능 PR 생성(기능 브랜치) -
  
  CI 통과 - 기능 PR 머지(dev 브랜치) -

  버전 업데이트(prerelease/* 브랜치) - 프리릴리즈 PR 생성 -
  
  CI 통과 - 프리릴리즈 PR 머지(dev 브랜치) -

  npm 배포 - github 릴리즈
  ```

**[ 기능 PR 머지 ]**

  - 다음 중 하나의 PR 라벨을 반드시 포함해야 함

    - `release:next:patch`
    - `release:next:minor`
    - `release:next:major`

  - (기능 PR이 CI 통과해서 머지 버튼 활성화되면) 프리릴리즈는 하지 않고 그냥 dev 브랜치로 머지

  - 자동으로 버전 업데이트 PR(프리릴리즈 PR)을 추가함

**[ 프리릴리즈 PR 머지 ]**

  - PR 라벨 필수 X

  - (프리릴리즈 PR이 CI 통과해서 머지 버튼 활성화되면) npm 패키지 프리릴리즈 과정 수행

  - 프리릴리즈가 끝난 후 jsdoc이나 스토리북은 따로 배포하지 않도록 함

### 📌 `changesets/action@v1` 사용의 단점

  ```yml
  - name: Create release pull request or publish
    id: changesets
    uses: changesets/action@v1
    with:
      version: pnpm ci:version:next
      publish: pnpm ci:publish:next
    env:
      GITHUB_TOKEN: ${{ secrets.PERSONAL_GITHUB_TOKEN }}
      NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
  ```

- PR 머지 시점에 스스로 판단하여 1) `.changeset/*.md`를 바탕으로 자동으로 릴리즈 PR을 만들거나, 2) npm 배포를 실행함

- 얼핏 깔끔한 듯 보이나, 실상은 그 판단 기준이 프리릴리즈인지 정식 릴리즈인지 여부와 `pre.json` 파일 유무, `.changeset/*.md` 파일 유무에 따라 서로 복합적으로 얽혀 있음

- 이는 본 프로젝트의 CI/CD 설계 원칙과 부합하지 않고 오히려 예외 처리 해야 할 부분이 많아져 코드가 복잡해질 우려가 있다고 판단함

- github actions 실패 시 그 원인을 명확히 확인하기 위해 `changesets/action@v1` 대신 그 세부 과정을 step으로 나누도록 함

### 📌 release job과 post-release job 구분

```yaml
post-release:
  needs: release
  if: needs.release.outputs.published == 'true'
  runs-on: ubuntu-latest
```

- npm 배포 성공 시에만 post-release job이 실행되도록 함

- npm 배포에 실패했거나 애초에 npm 배포 자체를 시도하지 않고 PR만 생성한 경우 `needs.release.outputs.published` 값이 "true"가 아니므로 post-release job이 실행되지 않음

<br />

## 💡 브랜치 전략

- 기능 개발 작업은 `feat/* 브랜치`에서 진행함

- 배포 관련 작업은 `chore/* 브랜치`에서 진행함

- 그 외 목적에 따라 `refactor/* 브랜치` 등을 사용할 수 있음

<br />

## 💡 PR 생성 (feat/\* 브랜치 → dev 브랜치)

<aside>

### ✅ PR 생성 “전” 체크리스트

- 개발자가 changeset cli를 실행하여  `.changeset/*.md` 파일을 작성해야 함

  - 프리릴리즈/정식 릴리즈 구분 없이 똑같이 `pnpm changeset` 실행

- `pnpm changeset` 명령어 실행하면,

  - (1) 변경 범위 선택, (2) 버전 범위(patch|minor|major) 선택, (3) 본문 작성의 과정을 거침

- `.changeset/*.md` 파일의 역할

  - CI에서 `.changeset/*.md`의 버전 범위와 PR 라벨을 비교하기 위해 필요함

  - changeset은 기본적으로 버전 업데이트 시 `.changeset/*.md`의 내용을 `CHANGELOG.md`에 반영하고,(해당 파일은 사라지지 않음) 이 `CHANGELOG.md`의 내용을 릴리즈 노트에 반영함

  - 그런데 본 프로젝트에서는 `@changesets/changelog-github`를 이용하여 `CHANGELOG.md`과 더불어 PR 내용 또한 릴리즈 노트에 반영하도록 함

  - 따라서, 혼란을 방지하기 위해 `.changeset/*.md` 본문에는 최소한의 내용만 작성한 후 그대로 cli 종료할 것

</aside>

<aside>

### ✅ PR 생성 “시” 체크리스트 (Github PR 템플릿으로 제공)

- PR 생성 시 다음 라벨 중 하나를 선택해야 함

  - `release:next:patch`

  - `release:next:minor`

  - `release:next:major`

- `.changeset/*.md` 파일이 존재하는지 확인 (`pnpm changeset`을 실행했는가)

- PR 본문에는 `## ${VERSION}`(ex. ## 0.0.0-next.0) 이 포함되어서는 안됨

- 코드 최신 상태인지 점검 (로컬 최신 커밋 === 원격 최신 커밋)

</aside>

<br />

## 💡 CI 실행 (`ci-next.yml` 참고)


### 1) 기능 PR인지 프리릴리즈 PR인지 확인

- 기능 PR이라면 라벨 비교 필요

- 프리릴리즈 PR이라면 PR에 라벨이 없으므로 라벨 관련 코드 스킵

### 2) (기능 PR이라면) 유효한 PR 라벨을 포함하는지 확인

- PR 라벨 중 `release:next:patch`, `release:next:minor`, `release:next:major` 이 셋 중 하나가 포함되어 있는지 확인

- 유효한 라벨이 포함되어 있지 않으면 github actions 종료

### 3) (기능 PR이라면) PR 라벨과 `.changeset/*.md` 파일의 버전 범위가 일치하는지 확인

- 둘 다 수동 작업이라 둘이 다를 수 있기 때문에 잘못된 버전이 릴리즈되지 않도록 하기 위해 확인 필요

- `.changeset/*.md` 파일 존재 확인 (기능 PR이라면 프리릴리즈를 위해 md 파일이 반드시 있어야 함)

- `.changeset/*.md` 안의 bump type 추출, PR 라벨과 bump type 비교

### 4) 테스트

- eslint, prettier 테스트 통과

- 라이브러리 테스트 통과

### 5) 빌드

- 라이브러리 빌드 통과

<br />

## 💡 프리릴리즈 진행 (`release-next.yml` 참고)

> [브랜치 보호 규칙](./cicd.md#3-github-브랜치-보호-및-병합-조건-설정)을 추가해두었다면, CI는 다시 실행하지 않아도 됨

### 1) 기능PR인지 프리릴리즈 PR인지 확인

- 기능 PR이라면 프리릴리즈 PR 생성

- 프리릴리즈 PR이라면 npm 배포 진행

### 2) 현재 PR이 `기능 PR`인 경우

- 새로운 브랜치 생성

  - 이미 존재하는 브랜치를 만들면 새로운 PR을 생성하지 않고 기존 PR을 업데이트함

  - github actions가 생성하는 브랜치가 겹치지 않도록 브랜치명에 타임스탬프 추가

- 프리릴리즈 모드 진입 (`pnpm ci:pre:enter`)

  - `pre.json` 파일이 없으면 생성

  - changeset은 이 파일에서 changesets 값을 바탕으로 각 버전의 변경사항을 추적함

- 버전 업데이트 (`pnpm ci:version:next`)

- 새로운 브랜치 변경사항 커밋, 푸시

  - `.changeset/*.md` 파일이 기준 브랜치와 달라야 커밋 시 변경사항이 없다는 에러가 뜨지 않음

- 프리릴리즈 PR 생성

  - `Prerelease 버전 업데이트 ~`을 PR 제목으로 함

  - PR 생성 시 어떤 라벨도 필요없음

### 3) 현재 PR이 `프리릴리즈 PR`인 경우

- npm 배포

- npm 배포 성공 여부 확인

  ```yaml
  - name: Publish if release PR
    if: steps.check-release-pr.outputs.is_release_pr == 'true'
    id: publish
    env:
      NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
    run: |
      if pnpm ci:publish:next; then
        echo "published=true" >> $GITHUB_OUTPUT
      else
        echo "published=false" >> $GITHUB_OUTPUT
        echo "❌ Failed to publish packages"
        exit 1
      fi
  ```

### 4) npm 배포 성공 이후

- `CHANGELOG.md` 내용을 릴리즈 노트에 반영하여 github 릴리즈
