import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, Easing } from 'remotion';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import { AUDIO_FILE, CAPTIONS, FPS, SCENES, SFX } from './timing';
import { Bg, C, FONT_BODY, Grain, ramp, s2f } from './ui';
import { Agenda, Cta, Hook, Pain, Solution } from './scenes';

const T = 0.22; // duración de la transición (s)

/** Envuelve una escena: entra desde abajo con desenfoque, sale hacia arriba */
const SceneWrap: React.FC<{ from: number; to: number; light?: boolean; first?: boolean; last?: boolean; children: React.ReactNode }> = ({ from, to, light, first, last, children }) => {
  const frame = useCurrentFrame(); // local a la Sequence
  const t = frame / FPS + from - (first ? 0 : T);
  const inP = first ? 1 : ramp(t, from - T, from + T * 0.6, 0, 1, Easing.out(Easing.cubic));
  const outP = last ? 0 : ramp(t, to - T * 0.6, to + T, 0, 1, Easing.in(Easing.cubic));
  const y = (1 - inP) * 260 - outP * 260;
  const blur = (1 - inP) * 40 + outP * 40;
  const zoom = 1 + ramp(t, from, to, 0, 0.035, Easing.linear);
  return (
    <AbsoluteFill style={{ opacity: Math.min(inP * 1.6, 1 - outP * 0.9) }}>
      <Bg light={light} />
      <AbsoluteFill style={{ transform: `translateY(${y}px) scale(${zoom})`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined }}>
        <TimeShift offset={from - (first ? 0 : T)}>{children}</TimeShift>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Las escenas usan tiempo absoluto: recolocamos el frame local */
const TimeShift: React.FC<{ offset: number; children: React.ReactNode }> = ({ offset, children }) => (
  <Sequence from={-s2f(offset)} layout="none">{children}</Sequence>
);

const isLightAt = (t: number) => (t >= SCENES.pain[0] && t < SCENES.pain[1]) || (t >= SCENES.agenda[0] && t < SCENES.agenda[1]);

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  let idx = -1;
  CAPTIONS.forEach((c, i) => { if (t >= c[0].t - 0.05) idx = i; });
  if (idx < 0) return null;
  const chunk = CAPTIONS[idx];
  const light = isLightAt(t);
  return (
    <div style={{
      position: 'absolute', left: 96, right: 140, top: 1355, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 52, lineHeight: 1.22,
      color: light ? C.textDark : C.cream, letterSpacing: '-0.01em',
    }}>
      {chunk.map((w, i) => {
        const p = ramp(t, w.t - 0.04, w.t + 0.12);
        return (
          <span key={i} style={{ display: 'inline-block', marginRight: 14, opacity: 0.15 + 0.85 * p, transform: `translateY(${(1 - p) * 10}px)`, color: w.hl ? C.coral : undefined }}>{w.w}</span>
        );
      })}
    </div>
  );
};

export const Promo: React.FC = () => {
  const order = [
    { k: 'hook', C: Hook, light: false },
    { k: 'pain', C: Pain, light: true },
    { k: 'solution', C: Solution, light: false },
    { k: 'agenda', C: Agenda, light: true },
    { k: 'cta', C: Cta, light: false },
  ] as const;
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      {order.map((s, i) => {
        const [from, to] = SCENES[s.k];
        const first = i === 0, last = i === order.length - 1;
        const start = first ? 0 : from - T;
        const end = last ? to : to + T;
        return (
          <Sequence key={s.k} from={s2f(start)} durationInFrames={s2f(end - start)}>
            <SceneWrap from={from} to={to} light={s.light} first={first} last={last}><s.C /></SceneWrap>
          </Sequence>
        );
      })}
      <Captions />
      <Grain />
      {AUDIO_FILE && <Audio src={staticFile(AUDIO_FILE)} />}
      {SFX.map((x, i) => (
        <Sequence key={i} from={s2f(x.t)} layout="none"><Audio src={staticFile(`sfx/${x.f}.wav`)} volume={x.v ?? 0.5} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};
