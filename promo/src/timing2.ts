// Vídeo 3 · "Doce mil pesos" — tiempos en segundos.
// PROVISIONALES hasta tener la voz: se recalculan con la transcripción.
import type { Word } from './timing';

export const SCENES2 = {
  hook: [0, 6.2],
  math: [6.2, 11.5],
  tip1: [11.5, 16.0],
  tip2: [16.0, 20.5],
  app: [20.5, 27.7],
  cta: [27.7, 34.4],
} as const;

export const TOTAL2 = 34.4;

// Tiempos sacados de public/voz2.mp3 (33,2 s)
export const B2 = {
  numero: 0.0,
  plantada: 4.14,
  tresVeces: 4.6,
  cuenta: 6.42,
  tres: 7.4,
  mil: 8.54,
  cuatro: 10.24,
  total: 10.95,
  arregla: 11.68,
  primero: 12.83,
  nocheAntes: 14.96,
  segundo: 16.13,
  lista: 17.32,
  hueco: 18.86,
  cancela: 19.74,
  citora: 21.38,
  recordar: 23.0,
  esperando: 25.0,
  whatsapp: 26.34,
  guarda: 27.86,
  app: 29.2,
  enlace: 30.72,
  gratis: 32.48,
};

/** Reparte las palabras de una frase entre `a` y `b` (solo mientras no haya voz) */
const phrase = (text: string, a: number, b: number, hl: string[] = []): Word[] => {
  const ws = text.split(' ');
  const step = (b - a) / ws.length;
  return ws.map((w, i) => ({ w, t: +(a + i * step).toFixed(2), hl: hl.some((h) => w.toLowerCase().includes(h)) }));
};

export const CAPTIONS2: Word[][] = [
  [{ w: 'Doce', t: 0.0, hl: true }, { w: 'mil', t: 0.38, hl: true }, { w: 'pesos.', t: 0.68, hl: true }],
  [{ w: 'Eso', t: 1.82 }, { w: 'pierdes', t: 2.0, hl: true }, { w: 'cada', t: 2.42 }, { w: 'mes…', t: 2.78 }],
  [{ w: 'si', t: 3.59 }, { w: 'te', t: 3.74 }, { w: 'dejan', t: 3.86 }, { w: 'plantada', t: 4.14, hl: true }, { w: 'tres', t: 4.6, hl: true }, { w: 'veces', t: 4.96, hl: true }, { w: 'a', t: 5.3 }, { w: 'la', t: 5.48 }, { w: 'semana.', t: 5.56 }],
  [{ w: 'Haz', t: 6.42 }, { w: 'la', t: 6.56 }, { w: 'cuenta:', t: 6.7, hl: true }],
  [{ w: 'tres', t: 7.4, hl: true }, { w: 'plantones,', t: 7.56 }, { w: 'a', t: 8.16 }, { w: 'mil', t: 8.54, hl: true }, { w: 'pesos', t: 8.84 }, { w: 'cada', t: 9.16 }, { w: 'uno…', t: 9.44 }],
  [{ w: 'por', t: 10.12 }, { w: 'cuatro', t: 10.24, hl: true }, { w: 'semanas.', t: 10.62 }],
  [{ w: '¿Cómo', t: 11.68 }, { w: 'se', t: 11.8 }, { w: 'arregla?', t: 11.96, hl: true }],
  [{ w: 'Primero:', t: 12.83 }, { w: 'confirma', t: 13.53, hl: true }, { w: 'cada', t: 14.02 }, { w: 'cita', t: 14.36 }, { w: 'la', t: 14.8 }, { w: 'noche', t: 14.96, hl: true }, { w: 'antes.', t: 15.16, hl: true }],
  [{ w: 'Segundo:', t: 16.13 }, { w: 'ten', t: 17.0 }, { w: 'una', t: 17.1 }, { w: 'lista', t: 17.32, hl: true }, { w: 'de', t: 17.58 }, { w: 'espera,', t: 17.74, hl: true }],
  [{ w: 'para', t: 18.04 }, { w: 'llenar', t: 18.42 }, { w: 'el', t: 18.74 }, { w: 'hueco', t: 18.86, hl: true }, { w: 'cuando', t: 19.16 }, { w: 'alguien', t: 19.44 }, { w: 'cancela.', t: 19.74 }],
  [{ w: 'Para', t: 20.68 }, { w: 'eso', t: 20.82 }, { w: 'hice', t: 21.12 }, { w: 'Citora:', t: 21.38, hl: true }],
  [{ w: 'te', t: 22.26 }, { w: 'dice', t: 22.34 }, { w: 'a', t: 22.6 }, { w: 'quién', t: 22.8 }, { w: 'recordarle', t: 23.0, hl: true }, { w: 'la', t: 23.62 }, { w: 'cita…', t: 23.78 }],
  [{ w: 'y', t: 24.14 }, { w: 'quién', t: 24.48 }, { w: 'está', t: 24.76 }, { w: 'esperando', t: 25.0, hl: true }, { w: 'un', t: 25.32 }, { w: 'hueco,', t: 25.58, hl: true }],
  [{ w: 'con', t: 25.94 }, { w: 'el', t: 26.22 }, { w: 'WhatsApp', t: 26.34, hl: true }, { w: 'ya', t: 26.72 }, { w: 'escrito.', t: 27.02, hl: true }],
  [{ w: 'Guarda', t: 27.86, hl: true }, { w: 'este', t: 28.26 }, { w: 'vídeo.', t: 28.38 }],
  [{ w: 'Y', t: 29.15 }, { w: 'si', t: 29.22 }, { w: 'quieres', t: 29.32 }, { w: 'la', t: 29.58 }, { w: 'app,', t: 29.82 }],
  [{ w: 'entra', t: 30.27 }, { w: 'al', t: 30.5 }, { w: 'enlace', t: 30.72, hl: true }, { w: 'de', t: 30.98 }, { w: 'mi', t: 31.18 }, { w: 'perfil', t: 31.28, hl: true }],
  [{ w: 'y', t: 31.76 }, { w: 'pruébala', t: 32.02 }, { w: 'gratis.', t: 32.48, hl: true }],
];

export const AUDIO2: string | null = 'voz2.mp3';

export const SFX2: { t: number; f: string; v?: number }[] = [
  { t: 6.08, f: 'whoosh', v: 0.35 },
  { t: 11.38, f: 'whoosh', v: 0.35 },
  { t: 15.88, f: 'whoosh', v: 0.35 },
  { t: 20.38, f: 'whoosh', v: 0.35 },
  { t: 27.58, f: 'whoosh', v: 0.35 },
  { t: 0.0, f: 'stamp', v: 0.55 },
  { t: 1.8, f: 'pop', v: 0.3 },
  { t: 4.29, f: 'tick', v: 0.35 },
  { t: 4.54, f: 'tick', v: 0.35 },
  { t: 4.79, f: 'tick', v: 0.35 },
  { t: 4.6, f: 'pop', v: 0.45 },
  { t: 7.3, f: 'tick', v: 0.3 },
  { t: 8.44, f: 'tick', v: 0.3 },
  { t: 10.14, f: 'tick', v: 0.3 },
  { t: 10.95, f: 'stamp', v: 0.6 },
  { t: 12.73, f: 'pop', v: 0.4 },
  { t: 14.66, f: 'pop', v: 0.4 },
  { t: 15.56, f: 'ding', v: 0.35 },
  { t: 15.6, f: 'pop', v: 0.3 },
  { t: 17.32, f: 'tick', v: 0.22 },
  { t: 17.52, f: 'tick', v: 0.22 },
  { t: 17.72, f: 'tick', v: 0.22 },
  { t: 18.84, f: 'pop', v: 0.45 },
  { t: 19.84, f: 'success', v: 0.35 },
  { t: 21.28, f: 'pop', v: 0.5 },
  { t: 23.0, f: 'tick', v: 0.22 },
  { t: 23.2, f: 'tick', v: 0.22 },
  { t: 23.4, f: 'tick', v: 0.22 },
  { t: 24.9, f: 'pop', v: 0.3 },
  { t: 26.34, f: 'tick', v: 0.5 },
  { t: 26.64, f: 'ding', v: 0.35 },
  { t: 27.86, f: 'pop', v: 0.5 },
  { t: 28.31, f: 'tick', v: 0.4 },
  { t: 29.2, f: 'pop', v: 0.3 },
  { t: 30.62, f: 'pop', v: 0.35 },
  { t: 31.17, f: 'tick', v: 0.5 },
  { t: 32.48, f: 'success', v: 0.35 },
];
