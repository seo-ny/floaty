import { execSync } from "node:child_process";

function run(cmd) {
  return execSync(cmd, { stdio: "inherit" });
}

function getOutput(cmd) {
  return execSync(cmd).toString().trim();
}

const uncommitted = getOutput("git status --porcelain");
if (uncommitted) {
  console.error("❌ 커밋되지 않은 변경사항이 있습니다.");
  process.exit(1);
}

const currentBranch = getOutput("git rev-parse --abbrev-ref HEAD");
const local = getOutput(`git rev-parse ${currentBranch}`);
const remote = getOutput(`git rev-parse origin/${currentBranch}`);
if (local !== remote) {
  console.error("❌ 로컬 브랜치가 원격과 동기화되지 않았습니다.");
  process.exit(1);
}

// 프리릴리즈 모드에서 나가기
const isPrerelease = getOutput(
  "cat .changeset/pre.json 2>/dev/null || echo ''"
);
if (isPrerelease) {
  console.log("📦 프리릴리즈(next) 모드 종료 중...");
  run("pnpm changeset pre exit");
}

// 마지막 next 태그 체크 로직 유지
const lastNextTag = getOutput(
  "git tag --sort=-creatordate | grep -m 1 '-next' || echo \"\""
);
if (lastNextTag) {
  const isMerged = getOutput(
    `git branch --contains ${lastNextTag} | grep ${currentBranch} || echo ""`
  );

  if (!isMerged) {
    console.error(
      `❌ 최신 프리릴리즈(${lastNextTag})가 ${currentBranch}에 병합되지 않았습니다.`
    );
    process.exit(1);
  }
}

console.log("📦 변경사항 버전 계산 및 패키지 버전 업데이트 중...");
run("pnpm changeset version");

console.log("📦 변경된 파일 커밋 및 태그 생성 후 원격 저장소에 푸시 중...");
const newVersion = getOutput(
  "cat packages/floaty-core/package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d ' '"
);
run(`git add .`);
run(`git commit -m "chore(release): v${newVersion} [prod]"`);
run(`git tag -a v${newVersion} -m "v${newVersion}"`);
run("git push --follow-tags");

console.log("✅ 정식 릴리즈 태그 푸시 완료");
