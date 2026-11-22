// Vídeo 3 · "Doce mil pesos" — tiempos en segundos.
// PROVISIONALES hasta tener la voz: se recalculan con la transcripción.
import type { Word } from './timing';

export const SCENES2 = {
  hook: [0, 5.2],
  math: [5.2, 10.2],
  tip1: [10.2, 14.4],
  tip2: [14.4, 19.0],
  app: [19.0, 25.4],
  cta: [25.4, 30.6],
} as const;

export const TOTAL2 = 30.6;

export const B2 = {
  numero: 0.0,
  plantada: 2.6,
  tresVeces: 3.6,
  cuenta: 5.4,
  tres: 6.3,
  mil: 7.2,
  cuatro: 8.4,
  total: 9.2,
  arregla: 10.4,
  primero: 11.4,
  nocheAntes: 12.9,
  segundo: 14.6,
  lista: 15.6,
  hueco: 16.9,
  cancela: 17.9,
  citora: 19.9,
  recordar: 21.0,
  esperando: 22.4,
  whatsapp: 23.6,
  guarda: 25.6,
  app: 26.6,
  enlace: 27.4,
  gratis: 28.4,
};

/** Reparte las palabras de una frase entre `a` y `b` (solo mientras no haya voz) */
const phrase = (text: string, a: number, b: number, hl: string[] = []): Word[] => {
  const ws = text.split(' ');
  const step = (b - a) / ws.length;
  return ws.map((w, i) => ({ w, t: +(a + i * step).toFixed(2), hl: hl.some((h) => w.toLowerCase().includes(h)) }));
};

export const CAPTIONS2: Word[][] = [
  phrase('Doce mil pesos.', 0.0, 1.2, ['doce', 'mil', 'pesos']),
  phrase('Eso pierdes cada mes…', 1.4, 2.5, ['pierdes']),
  phrase('si te dejan plantada tres veces a la semana.', 2.5, 4.9, ['plantada', 'tres', 'veces']),
  phrase('Haz la cuenta:', 5.4, 6.2, ['cuenta']),
  phrase('tres plantones, a mil pesos cada uno…', 6.3, 8.2, ['tres', 'mil']),
  phrase('por cuatro semanas.', 8.4, 9.6, ['cuatro']),
  phrase('¿Cómo se arregla?', 10.4, 11.2, ['arregla']),
  phrase('Primero: confirma cada cita la noche antes.', 11.4, 14.0, ['confirma', 'noche', 'antes']),
  phrase('Segundo: ten una lista de espera,', 14.6, 16.6, ['lista', 'espera']),
  phrase('para llenar el hueco cuando alguien cancela.', 16.7, 18.7, ['hueco']),
  phrase('Para eso hice Citora:', 19.2, 20.8, ['citora']),
  phrase('te dice a quién recordarle la cita…', 20.9, 22.3, ['recordarle']),
  phrase('y quién está esperando un hueco,', 22.4, 23.5, ['esperando']),
  phrase('con el WhatsApp ya escrito.', 23.6, 25.1, ['whatsapp', 'escrito']),
  phrase('Guarda este vídeo.', 25.6, 26.4, ['guarda']),
  phrase('Y si quieres la app, entra al enlace de mi perfil', 26.5, 28.2, ['enlace', 'perfil']),
  phrase('y pruébala gratis.', 28.3, 29.2, ['gratis']),
];

export const AUDIO2: string | null = null; // 'voz2.mp3' cuando llegue

export const SFX2: { t: number; f: string; v?: number }[] = [];
