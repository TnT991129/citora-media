export type Word = { w: string; s: number; e: number };
export type EpData = { duration: number; words: Word[]; speech: [number, number][] };

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ ]/g, "");

/** Segundo en que empieza `phrase`, buscando a partir de `after` segundos. */
export const findAt = (data: EpData, phrase: string, after = -1): number => {
  const target = norm(phrase).split(" ").filter(Boolean);
  const ws = data.words.map((x) => norm(x.w));
  for (let i = 0; i < ws.length; i++) {
    if (data.words[i].s <= after) continue;
    let ok = true;
    for (let k = 0; k < target.length; k++) {
      if (ws[i + k] !== target[k]) {
        ok = false;
        break;
      }
    }
    if (ok) return data.words[i].s;
  }
  throw new Error(`No encuentro "${phrase}" después de ${after}s`);
};

export const isTalking = (data: EpData, t: number) =>
  data.words.some((x) => t >= x.s && t <= x.e - 0.04);
