import React from "react";
import { Composition } from "remotion";
import { Ep10 } from "./episodes/Ep10";
import { Ep11 } from "./episodes/Ep11";
import { Ep12, Ep12PruebaFinal } from "./episodes/Ep12";
import { Ep13 } from "./episodes/Ep13";
import { Ep14 } from "./episodes/Ep14";
import { Galeria } from "./Galeria";
import { Grupos1 } from "./episodes/Grupos1";
import { Quince15 } from "./episodes/Quince";
import { Pipa } from "./episodes/Pipa";
import { Miami } from "./episodes/Miami";
import { Datos } from "./episodes/Datos";
import { Cobrar } from "./episodes/Cobrar";
import { Fotos } from "./episodes/Fotos";
import fotos from "./data/fotos.json";
import cobrar from "./data/cobrar.json";
import datos from "./data/datos.json";
import miami from "./data/miami.json";
import pipa from "./data/pipa.json";
import quince from "./data/quince.json";
import grupos1 from "./data/grupos1.json";
import ep14 from "./data/ep14.json";
import ep13 from "./data/ep13.json";
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
    <Composition id="Marian-ep13" component={Ep13} durationInFrames={dur(ep13, "walk")} {...common} />
    <Composition id="Marian-ep14" component={Ep14} durationInFrames={dur(ep14, "walk")} {...common} />
    <Composition id="Grupos-mientras-dormia" component={Grupos1} durationInFrames={dur(grupos1, "walk")} {...common} />
    <Composition id="Marian-los-quince" component={Quince15} durationInFrames={dur(quince, "walk")} {...common} />
    <Composition id="Marian-la-pipa" component={Pipa} durationInFrames={dur(pipa, "walk")} {...common} />
    <Composition id="Marian-paquete-miami" component={Miami} durationInFrames={dur(miami, "walk")} {...common} />
    <Composition id="Marian-los-datos" component={Datos} durationInFrames={dur(datos, "walk")} {...common} />
    <Composition id="Valor-cuanto-cobrar" component={Cobrar} durationInFrames={dur(cobrar, "walk")} {...common} />
    <Composition id="Valor-fotos-que-venden" component={Fotos} durationInFrames={dur(fotos, "walk")} {...common} />
    <Composition id="Galeria" component={Galeria} durationInFrames={6} {...common} />
    <Composition id="Prueba-final-nuevo" component={Ep12PruebaFinal} durationInFrames={dur(ep12, "walk")} {...common} />
  </>
);
