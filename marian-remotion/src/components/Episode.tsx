import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { EpData, findAt, isTalking } from "../lib/words";
import { C } from "../theme";
import { Captions } from "./Captions";
import { EpCtx } from "./Characters";
import { CitoraStamp, Ground } from "./Bits";

export type Cam = { z?: number; x?: number; y?: number; drift?: number };
export type Scene = { at: string; dark?: boolean; cam?: Cam; ground?: boolean; el: React.ReactNode };

export const END_HOLD = 2.6; // segundos de sello al final

export const epDuration = (data: EpData) => data.words[data.words.length - 1].e + 0.4 + END_HOLD;

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

export const Episode: React.FC<{ data: EpData; audio: string; scenes: Scene[] }> = ({ data, audio, scenes }) => {
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
  const stampAt = Math.round((lastWord + 0.4) * fps);
  const cur = starts.reduce((acc, s, i) => (t >= s ? i : acc), 0);
  const dark = frame < stampAt && scenes[cur]?.dark;

  return (
    <EpCtx.Provider value={{ t, talking: isTalking(data, t), frame }}>
      <AbsoluteFill style={{ background: dark ? C.night : C.bg }}>
        {scenes.map((s, i) => {
          const from = Math.round(starts[i] * fps);
          const to = i + 1 < scenes.length ? Math.round(starts[i + 1] * fps) : stampAt;
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
