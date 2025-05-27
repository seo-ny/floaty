
<!--------------------------------------------------------------

  [ 필수 체크리스트 ]

  1. 릴리즈 라벨 선택
  - 아래 라벨 중 하나가 PR에 추가되어 있습니까?
    - `release:next:patch`
    - `release:next:minor`
    - `release:next:major`

  > ✅ PR 라벨이 없으면 CI에 실패하여 병합할 수 없습니다. 반드시 라벨을 추가해주세요.

  2. Changeset 확인
  - `.changeset/*.md` 파일이 이 PR에 포함되어 있습니까?

  > ✅ 이 파일이 없으면 CI에 실패하여 병합할 수 없습니다. `pnpm changeset`을 실행하여 반드시 해당 파일을 만들어주세요.

  3. 본문 내용 확인
  - (feat/* -> dev) 본문에는 "## 0.0.0-next.0"이 포함되어서는 안됨
  - (dev -> main) 본문에는 "## 0.0.0"이 포함되어서는 안됨

  > ✅ 정규표현식을 이용해 CHANGELOG.md에서 릴리즈 노트에 추가할 내용을 가져오기 때문에 주의가 필요합니다.

  4. 코드 최신 상태 확인
  - 로컬 브랜치가 최신 원격 브랜치와 동일합니까?

  ```bash
  git fetch origin && git status

  # "Your branch is ahead of 'origin/main' by 2 commits."
  # → 로컬에만 있고 아직 push 안 된 커밋이 있다는 뜻

  # "Your branch is up to date with 'origin/main'."
  # → 둘이 같다는 뜻
  ```

  > ✅ CI는 로컬 상태를 알 수 없으므로 push 하지 않은 커밋이 있는지 직접 확인해야 합니다.

-------------------------------------------------------------->
