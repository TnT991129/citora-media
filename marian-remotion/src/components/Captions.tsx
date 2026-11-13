import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { EpData } from "../lib/words";
import { C, FONT } from "../theme";

/** Agrupa en trozos de 1-3 palabras, cortando tras puntuación. */
const chunk = (data: EpData) => {
  const out: number[][] = [];
  let cur: number[] = [];
  data.words.forEach((w, i) => {
    cur.push(i);
    const end = /[.?!…:,»]$/.test(w.w);
    const gap = data.words[i + 1] ? data.words[i + 1].s - w.e > 0.35 : true;
    if (end || gap || cur.length >= 3) {
      out.push(cur);
      cur = [];
    }
  });
  if (cur.length) out.push(cur);
  return out;
};

export const Captions: React.FC<{ data: EpData; dark?: boolean }> = ({ data, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const chunks = React.useMemo(() => chunk(data), [data]);
  const idx = chunks.findIndex((c, k) => {
    const start = data.words[c[0]].s;
    const next = chunks[k + 1] ? data.words[chunks[k + 1][0]].s : data.duration;
    return t >= start && t < next;
  });
  if (idx < 0) return null;
  const c = chunks[idx];
  const lastEnd = data.words[c[c.length - 1]].e;
  if (t > lastEnd + 0.9) return null;
  const spoken = c.filter((i) => data.words[i].s <= t);
  const current = spoken[spoken.length - 1];
  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 60,
        right: 60,
        textAlign: "center",
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 66,
        lineHeight: 1.15,
        letterSpacing: -0.5,
      }}
    >
      {dark ? (
        <span
          style={{
            background: "#E4DFD4",
            borderRadius: 40,
            padding: "10px 36px",
          }}
        >
          {spoken.map((i) => (
            <span key={i} style={{ color: i === current ? C.orange : C.ink }}>
              {data.words[i].w}{" "}
            </span>
          ))}
        </span>
      ) : (
        spoken.map((i) => (
          <span key={i} style={{ color: i === current ? C.orange : C.ink }}>
            {data.words[i].w}{" "}
          </span>
        ))
      )}
    </div>
  );
};
