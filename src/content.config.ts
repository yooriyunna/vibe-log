import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const logs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    day: z.number().optional(),          // N일차 (비우면 자동 계산)
    tools: z.array(z.string()).default([]), // 사용한 AI·도구
    tags: z.array(z.string()).default([]),
    link: z.string().optional(),         // 결과물 링크(데모, 저장소 등)
    draft: z.boolean().default(false),
  }),
});

export const collections = { logs };
