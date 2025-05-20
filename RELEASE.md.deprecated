# 릴리즈 프로세스

`@seo-ny/floaty-core`는 [changesets](https://github.com/changesets/changesets)를 사용하여 버전 관리 및 패키지 릴리즈를 진행합니다.

## 변경사항 기록

변경사항이 있을 때마다 다음 명령어를 실행하여 변경사항을 기록합니다:

```bash
pnpm changeset
```

이 명령어를 실행하면 다음과 같은 과정을 거칩니다:

1. 변경 사항의 범위를 선택합니다 (patch, minor, major).
2. 변경 내용을 입력합니다.
3. 모노레포 루트의 `.changeset` 디렉토리에 임시 변경 사항 파일(예: `.changeset/random-name.md`)이 생성됩니다.

## 프리릴리즈 배포

1. 프리릴리즈를 위한 변경사항을 기록합니다.

   ```bash
   pnpm changeset
   ```

2. 프리릴리즈를 실행합니다

   ```bash
   pnpm release:next
   ```

   이 명령어는 다음 작업을 수행합니다:

   - 커밋되지 않은 변경사항이 없고, 로컬 브랜치가 원격과 동기화되어 있는지 확인
   - 프리릴리즈 모드 활성화
   - 변경사항을 기반으로 패키지 버전 업데이트
     - `.changeset` 디렉토리의 임시 파일들이 소비(처리)됩니다.
     - 패키지 디렉토리(예: `packages/floaty-core/`)에 `CHANGELOG.md` 파일이 생성되거나 업데이트됩니다.
     - 이 `CHANGELOG.md` 파일에는 모든 버전의 변경 내역이 누적되어 기록됩니다.
   - 변경 내용 커밋 및 태그 생성
   - GitHub에 변경사항 푸시

   태그가 푸시되면 GitHub Actions가 자동으로 npm 레지스트리에 `next` 태그로 패키지를 배포합니다.

## 정식 릴리즈 배포

1. 정식 릴리즈를 위한 변경사항을 기록합니다.

   ```bash
   pnpm changeset
   ```

2. 정식 릴리즈를 실행합니다

   ```bash
   pnpm release:prod
   ```

   이 명령어는 다음 작업을 수행합니다:

   - 커밋되지 않은 변경사항이 없고, 로컬 브랜치가 원격과 동기화되어 있는지 확인
   - 프리릴리즈 모드에서 나가기 (필요한 경우)
   - 변경사항을 기반으로 패키지 버전 업데이트
     - `.changeset` 디렉토리의 임시 파일들이 소비(처리)됩니다.
     - 패키지 디렉토리(예: `packages/floaty-core/`)에 `CHANGELOG.md` 파일이 생성되거나 업데이트됩니다.
     - 이 `CHANGELOG.md` 파일에는 모든 버전의 변경 내역이 누적되어 기록됩니다.
   - 변경 내용 커밋 및 태그 생성
   - GitHub에 변경사항 푸시

   태그가 푸시되면 GitHub Actions가 자동으로 npm 레지스트리에 `latest` 태그로 패키지를 배포합니다.
