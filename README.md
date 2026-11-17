# 1일 1바이브코딩

매일 하나씩, AI와 함께 만든 것을 기록하는 사이트 (Astro + GitHub Pages)

## 처음 한 번만: 배포 설정

1. GitHub에서 새 저장소 `vibe-log`를 만듭니다 (Public).
2. `astro.config.mjs`에서 `YOUR-ID`를 내 GitHub 아이디로 바꿉니다.
   - 저장소 이름을 `<아이디>.github.io`로 했다면 `base: '/'`로 바꿉니다.
3. 이 폴더를 저장소에 push합니다.
   ```bash
   npm install
   git init && git add . && git commit -m "Day 1: 기록 사이트 셋업"
   git branch -M main
   git remote add origin https://github.com/<아이디>/vibe-log.git
   git push -u origin main
   ```
4. 저장소 **Settings → Pages → Source**를 **GitHub Actions**로 바꿉니다.
5. 1~2분 뒤에 `https://<아이디>.github.io/vibe-log/`에서 확인합니다.

## 매일 기록하기 (1분)

```bash
npm run new -- "오늘 만든 것 제목"   # src/content/logs/YYYY-MM-DD.md 생성
# 파일의 빈칸 4개를 채운 뒤
git add . && git commit -m "Day N" && git push
```

push하면 자동으로 배포됩니다. 로컬에서 미리 보려면 `npm run dev`를 실행하세요.

### 글 머리말(frontmatter)

| 필드 | 설명 |
|---|---|
| `title` | 제목 (필수) |
| `date` | 날짜 (필수) |
| `tools` | 사용한 AI·도구 목록 |
| `tags` | 태그 (태그 페이지가 자동으로 생성됨) |
| `link` | 결과물 링크 (데모, 저장소 등) |
| `day` | N일차를 직접 지정 (비우면 날짜순으로 자동 계산) |
| `draft: true` | 사이트에 올리지 않음 |

## 구조

```
src/
  content/logs/       ← 기록 글 (마크다운)
  pages/index.astro   ← 홈: 누적·연속 기록, 12주 잔디, 글 목록
  pages/logs/         ← 글 상세 (이전·다음 글 이동)
  pages/tags/         ← 태그 목록, 태그별 글
  layouts/Base.astro  ← 공통 레이아웃·스타일 (라이트/다크 자동)
scripts/new.mjs       ← 오늘 날짜 글 생성
.github/workflows/    ← GitHub Pages 자동 배포
```
