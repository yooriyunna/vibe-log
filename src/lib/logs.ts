import { getCollection, type CollectionEntry } from 'astro:content';

export type Log = CollectionEntry<'logs'> & { no: number };

/** 공개 글을 만든 순서대로 #번호를 매긴 뒤, 최신순으로 돌려줍니다. */
export async function getLogs(): Promise<Log[]> {
  const all = await getCollection('logs', ({ data }) => !data.draft);
  // 날짜순, 같은 날이면 파일 이름순 (2026-11-17.md → 2026-11-17-2.md)
  const asc = all.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf() || a.id.localeCompare(b.id));
  return asc.map((e, i) => ({ ...e, no: i + 1 })).reverse();
}

export const fmt = (d: Date) =>
  d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Seoul' });

/** 11월 17일 (화) */
export const fmtDay = (d: Date) =>
  d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short', timeZone: 'Asia/Seoul' })
    .replace(/\s*\((.)\)|\s(.)$/, ' ($1$2)');

export const ymd = (d: Date) =>
  new Date(d.getTime() + 9 * 3600e3).toISOString().slice(0, 10); // KST 기준 YYYY-MM-DD

/** 날짜(YYYY-MM-DD)별로 묶기 — 최신 날짜부터 */
export function groupByDay(logs: Log[]): { day: string; date: Date; items: Log[] }[] {
  const map = new Map<string, Log[]>();
  for (const l of logs) {
    const k = ymd(l.data.date);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(l);
  }
  return [...map].map(([day, items]) => ({ day, date: items[0].data.date, items }));
}

/** 오늘(또는 어제)까지 끊기지 않고 이어진 연속 기록 일수 */
export function streak(logs: Log[]): number {
  const days = new Set(logs.map((l) => ymd(l.data.date)));
  const cur = new Date();
  if (!days.has(ymd(cur))) cur.setDate(cur.getDate() - 1); // 오늘 아직 안 썼으면 어제부터
  let n = 0;
  while (days.has(ymd(cur))) { n++; cur.setDate(cur.getDate() - 1); }
  return n;
}

export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
