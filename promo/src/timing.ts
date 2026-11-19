// Todos los tiempos en segundos. Se ajustan al audio final.
export const FPS = 30;

export type Word = { w: string; t: number; hl?: boolean };

// Escenas: [inicio, fin] — ajustadas a public/voz.mp3 (25,0 s)
export const SCENES = {
  hook: [0, 5.5],
  pain: [5.5, 11.95],
  solution: [11.95, 18.8],
  agenda: [18.8, 21.95],
  cta: [21.95, 26.2],
} as const;

export const TOTAL = 26.2;

// Momentos clave (segundos absolutos, sacados de la voz)
export const BEATS = {
  manicurista: 0.4,
  peluquera: 1.38,
  lashista: 2.24,
  cuba: 2.68,
  turno: 6.9,
  libreta: 8.5,
  plantada: 10.35,
  noVino: 11.22,
  citora: 13.12,
  horarios: 15.52,
  reservan: 16.64,
  sinEscribirte: 17.76,
  telefono: 19.06,
  organizado: 21.24,
  comenta: 22.16,
  salon: 22.56,
  info: 23.7,
};

const W = (w: string, t: number, hl?: boolean): Word => ({ w, t, hl });

// Subtítulos palabra por palabra (tiempos de la voz)
export const CAPTIONS: Word[][] = [
  [W('Si', 0), W('eres', 0.24), W('manicurista,', 0.4, true), W('peluquera,', 1.38, true), W('lashista', 2.24, true), W('en', 2.68), W('Cuba…', 2.8)],
  [W('quédate,', 3.58), W('que', 4.2), W('esto', 4.34), W('te', 4.6), W('interesa.', 4.78, true)],
  [W('¿Te', 5.74), W('pasas', 5.86), W('el', 6.22), W('día', 6.36), W('contestando', 6.5), W('«¿tienes', 7.38, true), W('turno?»,', 7.6, true)],
  [W('anotando', 8.3), W('en', 8.74), W('la', 8.86), W('libreta…', 8.94, true)],
  [W('y', 9.9), W('aun', 10.38), W('así', 10.5), W('te', 10.8), W('dejan', 10.96, true), W('plantada?', 11.22, true)],
  [W('Por', 12.16), W('eso', 12.36), W('creé', 12.6), W('Citora.', 13.12, true)],
  [W('Una', 13.82), W('app', 13.96), W('donde', 14.16), W('tus', 14.38), W('clientas', 14.64), W('ven', 15.16), W('tus', 15.34), W('horarios', 15.52, true), W('libres…', 15.9, true)],
  [W('y', 16.4), W('reservan', 16.64, true), W('solas.', 17.16, true), W('Sin', 17.76), W('escribirte.', 18.0)],
  [W('Tú', 18.98), W('abres', 19.06), W('el', 19.36), W('teléfono…', 19.52)],
  [W('y', 19.92), W('tu', 20.32), W('día', 20.48), W('ya', 20.72), W('está', 21.02), W('organizado.', 21.24, true)],
  [W('Comenta', 22.16), W('«SALÓN»…', 22.56, true)],
  [W('y', 23.39), W('te', 23.46), W('paso', 23.6), W('toda', 23.88), W('la', 24.24), W('info.', 24.46, true)],
];

export const AUDIO_FILE: string | null = 'voz.mp3';

// Efectos de sonido (archivos en public/sfx). Se activan cuando haya audio.
export const SFX: { t: number; f: string; v?: number }[] = [
  { t: 5.32, f: 'whoosh', v: 0.35 },
  { t: 8.05, f: 'whoosh', v: 0.35 },
  { t: 9.85, f: 'whoosh', v: 0.35 },
  { t: 11.78, f: 'whoosh', v: 0.35 },
  { t: 18.62, f: 'whoosh', v: 0.35 },
  { t: 21.78, f: 'whoosh', v: 0.35 },
  { t: 0.35, f: 'pop', v: 0.45 },
  { t: 1.33, f: 'pop', v: 0.45 },
  { t: 2.19, f: 'pop', v: 0.45 },
  { t: 2.68, f: 'pop', v: 0.35 },
  { t: 6.7, f: 'pop', v: 0.18 },
  { t: 6.98, f: 'pop', v: 0.18 },
  { t: 7.26, f: 'pop', v: 0.18 },
  { t: 7.54, f: 'pop', v: 0.18 },
  { t: 7.82, f: 'pop', v: 0.18 },
  { t: 8.1, f: 'pop', v: 0.18 },
  { t: 8.5, f: 'tick', v: 0.25 },
  { t: 8.68, f: 'tick', v: 0.25 },
  { t: 8.86, f: 'tick', v: 0.25 },
  { t: 9.04, f: 'tick', v: 0.25 },
  { t: 9.22, f: 'tick', v: 0.25 },
  { t: 11.22, f: 'stamp', v: 0.7 },
  { t: 13.05, f: 'pop', v: 0.5 },
  { t: 15.52, f: 'tick', v: 0.2 },
  { t: 15.76, f: 'tick', v: 0.2 },
  { t: 16.0, f: 'tick', v: 0.2 },
  { t: 16.64, f: 'tick', v: 0.5 },
  { t: 17.24, f: 'success', v: 0.35 },
  { t: 17.76, f: 'pop', v: 0.45 },
  { t: 19.06, f: 'ding', v: 0.35 },
  { t: 19.5, f: 'tick', v: 0.18 },
  { t: 19.76, f: 'tick', v: 0.18 },
  { t: 20.02, f: 'tick', v: 0.18 },
  { t: 20.28, f: 'tick', v: 0.18 },
  { t: 20.54, f: 'tick', v: 0.18 },
  { t: 21.34, f: 'pop', v: 0.45 },
  { t: 22.56, f: 'tick', v: 0.4 },
  { t: 22.68, f: 'tick', v: 0.4 },
  { t: 22.8, f: 'tick', v: 0.4 },
  { t: 22.92, f: 'tick', v: 0.4 },
  { t: 23.04, f: 'tick', v: 0.4 },
  { t: 23.56, f: 'pop', v: 0.4 },
  { t: 23.7, f: 'ding', v: 0.35 },
];
