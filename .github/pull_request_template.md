## 📌 필수 체크리스트 <span style="color: red;">*(확인 후 삭제할 것)*</span>

### 🔖 릴리즈 라벨 선택
- [ ] 아래 라벨 중 하나가 PR에 추가되어 있습니까?
  - `release:next:patch`
  - `release:next:minor`
  - `release:next:major`

> ✅ PR 라벨이 없으면 CI에 실패하여 병합할 수 없습니다. 반드시 라벨을 추가해주세요.

---

### 📝 Changeset 확인
- [ ] `.changeset/*.md` 파일이 이 PR에 포함되어 있습니까?

> ✅ 이 파일이 없으면 CI에 실패하여 병합할 수 없습니다. `pnpm changeset`을 실행하여 반드시 해당 파일을 만들어주세요.

---

### 🔄 코드 최신 상태 확인
- [ ] 로컬 브랜치가 최신 원격 브랜치와 동일합니까?

```bash
# 예시 확인 명령어 (main 브랜치 기준)

git fetch origin
git log HEAD..origin/main --oneline
```

> ✅ 이 명령어 결과가 비어 있으면 최신 상태입니다. CI는 로컬 상태를 알 수 없으므로 직접 확인 필요합니다.
