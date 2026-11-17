// 오늘 날짜(KST)로 새 기록 파일을 만듭니다.
// 사용법: npm run new -- "오늘 만든 것 제목"
import { existsSync, writeFileSync } from 'node:fs';

const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
const title = process.argv.slice(2).join(' ') || '제목을 입력하세요';
// 같은 날 두 번째 글이면 2026-11-18-2.md 처럼 번호를 붙여요
let file = `src/content/logs/${today}.md`;
for (let n = 2; existsSync(file); n++) file = `src/content/logs/${today}-${n}.md`;

writeFileSync(file, `---
title: ${title}
date: ${today}
tools: [Claude]
tags: []
link:
# cover: ./images/${today}-cover.png   ← 대표 스크린샷 (images 폴더에 넣고 주석 해제)
---

## 오늘 만든 것


## 프롬프트·과정


## 막힌 점


## 다음에 해볼 것

`);
console.log(`만들었어요: ${file}`);
