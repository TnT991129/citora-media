// Todos los tiempos en segundos. Se ajustan al audio final.
export const FPS = 30;

export type Word = { w: string; t: number; hl?: boolean };

// Escenas: [inicio, fin]
export const SCENES = {
  hook: [0, 4.2],
  pain: [4.2, 10.6],
  solution: [10.6, 16.6],
  agenda: [16.6, 20.0],
  cta: [20.0, 24.5],
} as const;

export const TOTAL = 24.5;

// Momentos clave dentro de cada escena (segundos absolutos)
export const BEATS = {
  manicurista: 0.55,
  peluquera: 1.15,
  lashista: 1.85,
  cuba: 2.5,
  turno: 5.3,
  libreta: 7.3,
  plantada: 9.0,
  citora: 11.6,
  horarios: 13.0,
  reservan: 14.3,
  sinEscribirte: 15.4,
  telefono: 17.0,
  organizado: 18.4,
  comenta: 20.4,
  salon: 21.0,
  info: 22.4,
};

// Subtítulos palabra por palabra (hl = resaltada en color)
export const CAPTIONS: Word[][] = [
  [
    { w: 'Si', t: 0.1 }, { w: 'eres', t: 0.3 }, { w: 'manicurista,', t: 0.55, hl: true },
    { w: 'peluquera,', t: 1.15, hl: true }, { w: 'lashista', t: 1.85, hl: true },
    { w: 'en', t: 2.35 }, { w: 'Cuba…', t: 2.5 },
  ],
  [
    { w: 'quédate,', t: 3.0 }, { w: 'que', t: 3.4 }, { w: 'esto', t: 3.55 },
    { w: 'te', t: 3.75 }, { w: 'interesa.', t: 3.85, hl: true },
  ],
  [
    { w: '¿Te', t: 4.4 }, { w: 'pasas', t: 4.55 }, { w: 'el', t: 4.8 }, { w: 'día', t: 4.9 },
    { w: 'contestando', t: 5.05 }, { w: '«¿tienes', t: 5.6, hl: true }, { w: 'turno?»,', t: 5.9, hl: true },
  ],
  [
    { w: 'anotando', t: 6.9 }, { w: 'en', t: 7.2 }, { w: 'la', t: 7.3 }, { w: 'libreta…', t: 7.4, hl: true },
  ],
  [
    { w: 'y', t: 8.5 }, { w: 'aun', t: 8.65 }, { w: 'así', t: 8.8 }, { w: 'te', t: 9.0 },
    { w: 'dejan', t: 9.15, hl: true }, { w: 'plantada?', t: 9.4, hl: true },
  ],
  [
    { w: 'Por', t: 10.8 }, { w: 'eso', t: 11.0 }, { w: 'creé', t: 11.2 }, { w: 'Citora.', t: 11.6, hl: true },
  ],
  [
    { w: 'Una', t: 12.3 }, { w: 'app', t: 12.45 }, { w: 'donde', t: 12.6 }, { w: 'tus', t: 12.8 },
    { w: 'clientas', t: 12.9 }, { w: 'ven', t: 13.2 }, { w: 'tus', t: 13.35 }, { w: 'horarios', t: 13.45, hl: true },
    { w: 'libres…', t: 13.8, hl: true },
  ],
  [
    { w: 'y', t: 14.2 }, { w: 'reservan', t: 14.3, hl: true }, { w: 'solas.', t: 14.7, hl: true },
    { w: 'Sin', t: 15.3 }, { w: 'escribirte.', t: 15.5 },
  ],
  [
    { w: 'Tú', t: 16.8 }, { w: 'abres', t: 17.0 }, { w: 'el', t: 17.25 }, { w: 'teléfono…', t: 17.35 },
  ],
  [
    { w: 'y', t: 18.1 }, { w: 'tu', t: 18.2 }, { w: 'día', t: 18.35 }, { w: 'ya', t: 18.55 }, { w: 'está', t: 18.7 },
    { w: 'organizado.', t: 18.9, hl: true },
  ],
  [
    { w: 'Comenta', t: 20.3 }, { w: '«SALÓN»…', t: 20.9, hl: true },
  ],
  [
    { w: 'y', t: 21.9 }, { w: 'te', t: 22.0 }, { w: 'paso', t: 22.15 }, { w: 'toda', t: 22.35 },
    { w: 'la', t: 22.55 }, { w: 'info.', t: 22.65, hl: true },
  ],
];

export const AUDIO_FILE: string | null = null; // p. ej. 'voz.mp3' en /public

// Efectos de sonido (archivos en public/sfx). Se activan cuando haya audio.
export const SFX: { t: number; f: string; v?: number }[] = [];
