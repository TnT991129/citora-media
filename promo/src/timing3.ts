// Vídeo 4 · "3 señales de que tu salón pierde clientas" — tiempos en segundos.
// PROVISIONALES hasta tener la voz: se recalculan con la transcripción.
import type { Word } from './timing';

export const SCENES3 = {
  hook: [0, 4.2],
  s1: [4.2, 8.8],
  s2: [8.8, 13.2],
  s3: [13.2, 16.8],
  sol: [16.8, 24.0],
  cta: [24.0, 30.0],
} as const;

export const TOTAL3 = 30.0;

export const B3 = {
  tres: 0.6,
  perdiendo: 2.6,
  uno: 4.4,
  turno: 5.6,
  unas: 7.4,
  dos: 9.0,
  libreta: 10.4,
  letra: 11.9,
  tresB: 13.4,
  huecos: 14.4,
  nadie: 15.6,
  citora: 17.2,
  horas: 18.4,
  solas: 19.6,
  publicas: 20.8,
  estado: 22.2,
  cuantas: 24.2,
  comentarios: 25.6,
  gratis: 27.0,
  perfil: 28.2,
};

const phrase = (text: string, a: number, b: number, hl: string[] = []): Word[] => {
  const ws = text.split(' ');
  const step = (b - a) / ws.length;
  return ws.map((w, i) => ({ w, t: +(a + i * step).toFixed(2), hl: hl.some((h) => w.toLowerCase().includes(h)) }));
};

export const CAPTIONS3: Word[][] = [
  phrase('Si te pasa una de estas tres cosas…', 0.0, 1.9, ['tres']),
  phrase('tu salón está perdiendo clientas.', 2.0, 3.9, ['perdiendo', 'clientas']),
  phrase('Uno: contestas «¿tienes turno?»', 4.4, 6.3, ['tienes', 'turno']),
  phrase('más veces de las que haces uñas.', 6.4, 8.4, ['uñas']),
  phrase('Dos: tu agenda es una libreta…', 9.0, 11.0, ['libreta']),
  phrase('y a veces ni tú entiendes tu letra.', 11.1, 12.9, ['letra']),
  phrase('Tres: tienes huecos libres…', 13.4, 15.0, ['huecos', 'libres']),
  phrase('y nadie se entera.', 15.2, 16.5, ['nadie']),
  phrase('Con Citora, tus clientas ven tus horas libres', 17.0, 19.4, ['citora', 'horas', 'libres']),
  phrase('y reservan solas.', 19.5, 20.6, ['solas']),
  phrase('Y tú publicas tus huecos en el estado,', 20.7, 22.6, ['publicas', 'huecos', 'estado']),
  phrase('con un toque.', 22.7, 23.6, ['toque']),
  phrase('¿Cuántas te pasan a ti?', 24.1, 25.4, ['cuántas']),
  phrase('Dímelo en los comentarios.', 25.5, 26.8, ['comentarios']),
  phrase('Y pruébala gratis: el enlace está en mi perfil.', 26.9, 29.4, ['gratis', 'enlace', 'perfil']),
];

export const AUDIO3: string | null = null; // 'voz3.mp3' cuando llegue

export const SFX3: { t: number; f: string; v?: number }[] = [];
