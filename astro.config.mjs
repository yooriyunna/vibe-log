// @ts-check
import { defineConfig } from 'astro/config';

// ▼ 배포 전에 두 값만 바꾸세요
//   - 저장소 이름이 <아이디>.github.io 이면: site = 'https://<아이디>.github.io', base = '/'
//   - 그 외 저장소(예: vibe-log)이면:      site = 'https://<아이디>.github.io', base = '/vibe-log'
export default defineConfig({
  site: 'https://yooriyunna.github.io',
  base: '/',
  trailingSlash: 'ignore',
});
