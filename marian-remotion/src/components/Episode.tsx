import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { GROUND } from "../theme";
import { Marian } from "./Characters";
import { Audio } from "@remotion/media";
import { EpData, findAt, isTalking } from "../lib/words";
import { C } from "../theme";
import { Captions } from "./Captions";
import { EpCtx } from "./Characters";
import { CitoraStamp, Ground } from "./Bits";

export type Cam = { z?: number; x?: number; y?: number; drift?: number };
export type Scene = { at: string; dark?: boolean; cam?: Cam; ground?: boolean; el: React.ReactNode };

export const END_HOLD = 2.6; // segundos de sello al final
export const WALK = 2.0; // segundos en que Marian se va caminando (final "walk")

export type Outro = "stamp" | "walk";

/** Segundo en que aparece el sello. */
const stampTime = (data: EpData, outro: Outro) => data.words[data.words.length - 1].e + (outro === "walk" ? 0.35 + WALK : 0.4);

export const epDuration = (data: EpData, outro: Outro = "stamp") => stampTime(data, outro) + END_HOLD;

/** Final nuevo: Marian de cuerpo entero dice la frase, se gira y se va por la derecha. */
const WalkOff: React.FC<{ from: number }> = ({ from }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = f - from; // frames desde que empieza a caminar
  const walking = local >= 0;
  const x = walking ? interpolate(local, [0, WALK * fps * 0.85], [540, 1420], { extrapolateRight: "clamp", easing: Easing.in(Easing.quad) }) : 540;
  const bob = walking ? Math.abs(Math.sin(local * 0.45)) * -14 : 0;
  return (
    <AbsoluteFill>
      <Ground />
      <div style={{ position: "absolute", left: x, top: GROUND + bob, translate: "-50% -100%", rotate: walking ? "3deg" : "0deg" }}>
        <Marian eyes={walking ? "side" : "flat"} arms={walking ? "down" : "phone"} step={walking ? local * 0.45 : undefined} />
      </div>
    </AbsoluteFill>
  );
};

const Camera: React.FC<{ cam?: Cam; len: number; children: React.ReactNode }> = ({ cam = {}, len, children }) => {
  const f = useCurrentFrame();
  const z = cam.z ?? 1;
  const drift = cam.drift ?? 0.035;
  return (
    <AbsoluteFill
      style={{
        transformOrigin: `${cam.x ?? 540}px ${cam.y ?? 1150}px`,
        scale: interpolate(f, [0, len], [z, z * (1 + drift)], { extrapolateRight: "clamp" }),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const Episode: React.FC<{ data: EpData; audio: string; scenes: Scene[]; outro?: Outro }> = ({ data, audio, scenes, outro = "stamp" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const starts = React.useMemo(() => {
    let prev = -1;
    return scenes.map((s, i) => {
      const at = i === 0 ? 0 : findAt(data, s.at, prev);
      prev = at;
      return at;
    });
  }, [data, scenes]);
  const lastWord = data.words[data.words.length - 1].e;
  const stampAt = Math.round(stampTime(data, outro) * fps);
  // En el final "walk", Marian dice la frase de cuerpo entero desde «En fin» y luego se va.
  const outroAt = outro === "walk" ? Math.round(findAt(data, "En fin", lastWord - 8) * fps) : stampAt;
  const walkAt = Math.round((lastWord + 0.35) * fps);
  const cur = starts.reduce((acc, s, i) => (t >= s ? i : acc), 0);
  const dark = frame < stampAt && scenes[cur]?.dark;

  return (
    <EpCtx.Provider value={{ t, talking: isTalking(data, t), frame }}>
      <AbsoluteFill style={{ background: dark ? C.night : C.bg }}>
        {scenes.map((s, i) => {
          const from = Math.round(starts[i] * fps);
          if (from >= outroAt) return null;
          const to = Math.min(i + 1 < scenes.length ? Math.round(starts[i + 1] * fps) : stampAt, outroAt);
          return (
            <Sequence key={i} from={from} durationInFrames={Math.max(1, to - from)} layout="none">
              <AbsoluteFill style={{ background: s.dark ? C.night : C.bg }}>
                <Camera cam={s.cam} len={to - from}>
                  {s.ground !== false && <Ground dark={s.dark} />}
                  {s.el}
                </Camera>
              </AbsoluteFill>
            </Sequence>
          );
        })}
        {outro === "walk" && (
          <Sequence from={outroAt} durationInFrames={stampAt - outroAt} layout="none">
            <AbsoluteFill style={{ background: C.bg }}>
              <WalkOff from={walkAt - outroAt} />
            </AbsoluteFill>
          </Sequence>
        )}
        <Sequence from={stampAt} layout="none">
          <AbsoluteFill style={{ background: C.bg, display: "grid", placeItems: "center" }}>
            <Ground />
            <CitoraStamp />
          </AbsoluteFill>
        </Sequence>
        <Captions data={data} dark={!!dark} />
        <Audio src={staticFile(audio)} />
      </AbsoluteFill>
    </EpCtx.Provider>
  );
};
