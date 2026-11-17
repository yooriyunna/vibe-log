// 오늘 날짜(KST)로 새 기록 파일을 만듭니다.
// 사용법: npm run new -- "오늘 만든 것 제목"
import { existsSync, writeFileSync } from 'node:fs';

const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
const title = process.argv.slice(2).join(' ') || '제목을 입력하세요';
const file = `src/content/logs/${today}.md`;

if (existsSync(file)) {
  console.log(`이미 있어요: ${file}`);
  process.exit(0);
}

writeFileSync(file, `---
title: ${title}
date: ${today}
tools: [Claude]
tags: []
link:
---

## 오늘 만든 것


## 프롬프트·과정


## 막힌 점


## 다음에 해볼 것

`);
console.log(`만들었어요: ${file}`);
