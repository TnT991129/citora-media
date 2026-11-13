import React from "react";
import { Abs } from "../components/Bits";
import { Marian, Person } from "../components/Characters";
import { C, GROUND } from "../theme";
import { Cam } from "../components/Episode";

type MP = React.ComponentProps<typeof Marian>;
type PP = React.ComponentProps<typeof Person>;

/** Marian de cuerpo entero sobre el suelo. */
export const M: React.FC<MP & { x?: number }> = ({ x = 540, ...p }) => (
  <Abs x={x} y={GROUND} anchor="bottom">
    <Marian {...p} />
  </Abs>
);

export const P: React.FC<PP & { x?: number }> = ({ x = 760, ...p }) => (
  <Abs x={x} y={GROUND} anchor="bottom">
    <Person {...p} />
  </Abs>
);

export const Yamila: React.FC<Omit<PP, "hair" | "dress" | "style" | "scissors"> & { x?: number }> = (p) => (
  <P hair="#7A4A2E" dress={C.lilac} style="bob" scissors {...p} />
);
export const Daylin: React.FC<Omit<PP, "hair" | "dress" | "style"> & { x?: number }> = (p) => <P hair="#E7B04A" dress="#9FD39A" style="long" {...p} />;
export const Tardona: React.FC<Omit<PP, "hair" | "dress" | "style"> & { x?: number }> = (p) => <P hair="#2E2E2E" dress="#8EC8F0" style="bun" {...p} />;

/** Cámaras habituales (Marian centrada, 760 px de alto). */
export const HEAD: Cam = { z: 2.1, x: 540, y: 1045, drift: 0.04 };
export const CLOSE: Cam = { z: 1.45, x: 540, y: 1100, drift: 0.03 };
export const XHEAD: Cam = { z: 2.8, x: 540, y: 1045, drift: 0.05 };
