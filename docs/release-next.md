# 기능 개발 후 프리릴리즈 과정

## 1. feat/\* 브랜치에서 기능 개발

- 모든 기능 개발 작업은 `feat/* 브랜치`에서 진행함

<br />

## 2. PR 생성 (feat/\* 브랜치 → dev 브랜치)

<aside>

### ✅ PR 생성 “전” 체크리스트

- 개발자가 changeset cli를 실행하여 `.changeset/*.md` 파일 작성

  - 프리릴리즈/정식 릴리즈 구분 없이 똑같이 실행하면 됨

  ```bash
  pnpm changeset (O)                   # md 파일 생성
  pnpm changeset version (X)           # 릴리즈 버전 업데이트 + md 파일 생성
  ```

- `pnpm changeset` 명령어 실행하면,

  - (1) 변경 범위 선택, (2) 버전 범위(patch|minor|major) 선택, (3) 본문 작성의 과정을 거침

- `@changesets/changelog-github` & `.changeset/*.md` 파일

  - `.changeset/*.md` 은 CI 실행 시 `.changeset/*.md` 의 버전 범위와 PR 라벨이 일치하는지 확인하기 위해 반드시 필요함

  - `.changeset/*.md` 은 기본적으로 추후 버전 업데이트 시 `CHANGELOG.md`에 반영됨

  - `@changesets/changelog-github` 를 이용하여 이후 깃허브 릴리즈 시 릴리즈 노트 작성에 `CHANGELOG.md`를 이용함

- 따라서, PR이 릴리즈 노트에 반영될 때 혼란을 방지하기 위해 앞서 `.changeset/*.md` 본문에는 최소한의 내용만 작성한 후 그대로 cli 종료할 것

</aside>

<aside>

### ✅ PR 생성 “시” 체크리스트 (Github PR 템플릿으로 제공)

- PR 생성 시 다음 라벨 중 하나를 선택해야 함

  - `release:next:patch`

  - `release:next:minor`

  - `release:next:major`

- `.changeset/*.md` 파일이 존재하는지 확인 (추후 CI에서도 점검)

- PR 본문에는 `## ${VERSION}`(ex. ## 0.0.0-next.0) 이 포함되어서는 안됨

- 코드 최신 상태인지 점검 (로컬 최신 커밋 === 원격 최신 커밋)

</aside>

<br />

## 3. CI 실행 순서 (`ci-next.yml` 참고)

```yaml
# 'pull_request:'를 사용하면 외부 사용자가 fork해서 PR 올릴 때는 워크플로우에서 라벨 못 가져옴
# 외부 fork를 받으려면 pull_request_target을 사용해야 함 (w. '머지 전 PR 리뷰 필수' 브랜치 룰 추가)

on:
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
      - labeled
    branches:
      - dev
```

### 1) `프리릴리즈` 하려는 게 맞는지 확인

- PR 라벨 중 위 3가지 라벨 중 하나가 포함되어 있는지 확인

- 유효한 라벨이 포함되어 있지 않으면 github actions 종료

### 2) PR 라벨과 `.changeset/*.md` 파일의 버전 범위가 일치하는지 확인

- 둘 다 수동 작업이라 둘이 다를 수 있기 때문에 잘못된 버전이 릴리즈되지 않도록 하기 위해 확인 필요

- `.changeset/*.md` 파일 존재 확인 (앞서 `프리릴리즈 버전`을 미리 업데이트 했는지 확인하는 것)

- `.changeset/*.md` 안의 bump type 추출 & PR 라벨과 bump type 비교

### 3)테스트

- eslint, prettier 테스트 통과

- 라이브러리 테스트 통과

### 4) 빌드

- 라이브러리 빌드 통과

<br />

## 4. PR 머지 시도 (`release-next.yml` 참고)

- [브랜치 보호 규칙](./cicd.md#3-github-브랜치-보호-및-병합-조건-설정)을 추가해두었다면, CI는 다시 실행하지 않아도 됨

- 즉, 바로 버전 업데이트, 태그 생성 및 푸시, 릴리즈 하면 됨

  <details>
    <summary>상세 과정</summary>

    - 버전 업데이트

      - package.json에서 버전 업데이트

      - `.changeset/*.md`가 `CHANGELOG.md`에 반영되고, `.changeset/*.md` 삭제됨

      ```bash
      pnpm changeset pre enter next        # 프리릴리즈 모드 진입 (현재 프리릴리즈 모드가 아닐 때만 실행)
      pnpm changeset version               # 프리릴리즈 버전 업데이트
      ```

    - 태그 생성 및 푸시

      ```bash
      - name: Tag version
        run: |
          TAG="v$(jq -r .version < ./packages/your-pkg/package.json)"
          git tag $TAG
          git push origin $TAG
      ```

    - npm 레지스트리 배포

      ```bash
      pnpm changeset publish --tag next    # 프리릴리즈
      ```

    - Github에 릴리즈

      - `CHANGELOG.md` 내용을 가져와서 릴리즈 노트 구성
  </details>

<aside>

<br />

## 4-1. ”버전 업데이트 + 태그 생성, 푸시 + 모든 릴리즈” 한번에 처리

### 문제

- “기능 PR 머지 시도할 때, 버전 업데이트부터 npm 레지스트리 배포까지 스트레이트 진행” → 위험함!

  - 버전 업데이트가 github actions 과정에 포함되어 실제 다음 릴리즈될 버전이 무엇인지 개발자가 확인할 수 없음

### 해결 방법

- 기능 PR 머지

  - (기능 PR이 CI 통과해서 머지 버튼 활성화되면) 릴리즈는 하지 않고 그냥 dev 브랜치로 머지

  - 자동으로 버전 업데이트 PR(릴리즈 PR)을 추가함

- 릴리즈 PR 머지

  - (릴리즈 PR이 CI 통과해서 머지 버튼 활성화되면) npm 패키지 프리릴리즈 과정만 수행

  - 프리릴리즈 시에는 jsdoc이나 스토리북은 따로 배포하지 않도록 함

#### 💡 `changesets/action@v1` 를 사용하면, 위 작업을 한꺼번에 다음과 같이 처리할 수 있음

  - PR 머지 시점에 스스로 판단하여 1) `.changeset/*.md`를 기준으로 자동 릴리즈 PR을 만들거나, 2) publish를 실행함

  ```bash
  - name: Create release pull request or publish
    uses: changesets/action@v1
    with:
      publish: |
        if pnpm ci:publish:next; then
          echo "published=true" > .published
        fi
    env:
      GITHUB_TOKEN: ${{ secrets.PERSONAL_GITHUB_TOKEN }}
      NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
  ```
</aside>
