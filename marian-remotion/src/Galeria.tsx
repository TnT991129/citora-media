import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SetBg, SetName } from "./components/Sets";
import { EpCtx } from "./components/Characters";
import { M, P } from "./episodes/common";
import { C } from "./theme";

// Galería para revisar escenarios y personajes (no es un episodio).
const frames: { set: SetName; el: React.ReactNode }[] = [
  { set: "salon", el: (<><M x={330} /><P x={790} hair="#2E2E2E" dress="#F28C8C" style="curly" pattern="dots" earrings /></>) },
  { set: "street", el: (<><P x={260} outfit="shirt" dress="#7FB8A4" pants="#3E4A61" style="cap" hair="#E86A5C" mustache prop="cone" /><M x={560} arms="down" /><P x={860} hair="#B8B8B8" dress="#9B7FD4" style="bun" old glasses pattern="flowers" prop="bag" /></>) },
  { set: "beach", el: (<><P x={250} hair="#E7B04A" dress="#7EC8E3" style="ponytail" prop="beer" /><P x={540} outfit="shirt" dress={C.red} pants="#F2C14E" style="short" hair="#2E2E2E" prop="whistle" /><P x={820} hair="#5A3A2A" dress="#F2A7BE" style="braids" pattern="stripes" wide /></>) },
  { set: "sunset", el: (<><M x={540} eyes="flat" /></>) },
  { set: "home", el: (<><M x={540} /><P x={850} outfit="shirt" dress="#9CC0E8" style="bald" hair="#5A3A2A" old glasses mustache prop="coffee" /></>) },
  { set: "night", el: (<><M x={540} eyes="wide" speaking={false} /></>) },
];

export const Galeria: React.FC = () => {
  const f = useCurrentFrame();
  const it = frames[Math.min(f, frames.length - 1)];
  return (
    <EpCtx.Provider value={{ t: 0, talking: false, frame: f }}>
      <AbsoluteFill style={{ background: C.bg }}>
        <SetBg set={it.set} />
        {it.el}
      </AbsoluteFill>
    </EpCtx.Provider>
  );
};
