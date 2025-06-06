<!-- 다음은 릴리즈 PR이 아닌 사전 PR을 위한 체크리스트입니다. 릴리즈 PR은 github actions 실행 시 자동 생성되며 다음 체크리스트는 해당되지 않습니다. -->


# 💡 필수 체크리스트

## 1. PR 라벨 선택

### 📌 다음 라벨 중 하나가 PR에 추가되어 있습니까?

**[ 프리릴리즈 ]**

- `release:next:patch`
- `release:next:minor`
- `release:next:major`

**[ 정식 릴리즈 ]**

- `release:prod:patch`
- `release:prod:minor`
- `release:prod:major`

<br />

> ✅ PR 라벨이 없으면 CI에 실패하여 병합할 수 없습니다. 반드시 라벨을 추가해주세요.

<br />

## 2. Changeset 확인

### 📌 새로 추가한 `.changeset/*.md` 파일이 이 PR에 포함되어 있습니까?

<br />

> ✅ 이 파일이 없으면 CI에 실패하여 병합할 수 없습니다. `pnpm changeset`을 실행하여 반드시 해당 파일을 만들어주세요. (프리릴리즈의 경우, 기존에 `.changeset/*.md` 파일이 존재하더라도 해당 명령어를 실행하여 새로 추가해야 릴리즈 PR을 생성할 수 있습니다.)

<br />

## 3. 코드 최신 상태 확인

### 📌 로컬 브랜치가 최신 원격 브랜치와 동일합니까?

**[ 확인 방법 ]**

```bash
git fetch origin && git status

# "Your branch is ahead of 'origin/main' by 2 commits."
# → 로컬에만 있고 아직 push 안 된 커밋이 있다는 뜻

# "Your branch is up to date with 'origin/main'."
# → 둘이 같다는 뜻
```

<br />

> ✅ CI는 로컬 상태를 알 수 없으므로 push 하지 않은 커밋이 있는지 직접 확인해야 합니다.
