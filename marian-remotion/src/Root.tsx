import React from "react";
import { Composition } from "remotion";
import { Ep10 } from "./episodes/Ep10";
import { Ep11 } from "./episodes/Ep11";
import { Ep12, Ep12PruebaFinal } from "./episodes/Ep12";
import ep10 from "./data/ep10.json";
import ep11 from "./data/ep11.json";
import ep12 from "./data/ep12.json";
import { epDuration } from "./components/Episode";
import { EpData } from "./lib/words";

const FPS = 30;
const dur = (d: unknown, outro: "stamp" | "walk" = "stamp") => Math.ceil(epDuration(d as EpData, outro) * FPS);
const common = { fps: FPS, width: 1080, height: 1920 };

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Marian-ep10" component={Ep10} durationInFrames={dur(ep10)} {...common} />
    <Composition id="Marian-ep11" component={Ep11} durationInFrames={dur(ep11)} {...common} />
    <Composition id="Marian-ep12" component={Ep12} durationInFrames={dur(ep12)} {...common} />
    <Composition id="Prueba-final-nuevo" component={Ep12PruebaFinal} durationInFrames={dur(ep12, "walk")} {...common} />
  </>
);
