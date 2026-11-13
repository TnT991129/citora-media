import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C, FONT, GROUND } from "../theme";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

/** Aparece con un pequeño rebote, `delay` en frames locales de la escena. */
export const Pop: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties; from?: number }> = ({ delay = 0, children, style, from = 0.6 }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        opacity: interpolate(f, [delay, delay + 4], [0, 1], clamp),
        scale: interpolate(f, [delay, delay + 9], [from, 1], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) }),
        translate: style?.position === "relative" ? undefined : "-50% -50%",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Abs: React.FC<{ x: number; y: number; children: React.ReactNode; anchor?: "bottom" | "center" }> = ({ x, y, children, anchor = "center" }) => (
  <div style={{ position: "absolute", left: x, top: y, translate: anchor === "bottom" ? "-50% -100%" : "-50% -50%" }}>{children}</div>
);

export const Ground: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: GROUND, height: 4, background: dark ? "#2A2A33" : C.ground }} />
);

export const Pill: React.FC<{ icon?: string; text: string; color?: string; size?: number }> = ({ icon, text, color = C.ink, size = 40 }) => (
  <div
    style={{
      background: "#fff",
      border: `5px solid ${C.ink}`,
      borderRadius: 999,
      padding: `${size * 0.35}px ${size * 0.7}px`,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: size,
      color,
      whiteSpace: "nowrap",
      display: "flex",
      gap: size * 0.35,
      alignItems: "center",
    }}
  >
    {icon && <span>{icon}</span>}
    <span>{text}</span>
  </div>
);

export const Bubble: React.FC<{ text: string; tail?: "left" | "right" | "down"; size?: number; width?: number }> = ({ text, tail = "down", size = 40, width }) => (
  <div style={{ position: "relative" }}>
    <div
      style={{
        background: "#fff",
        border: `5px solid ${C.ink}`,
        borderRadius: 40,
        padding: "18px 30px",
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: size,
        color: C.ink,
        width,
        textAlign: "center",
      }}
    >
      {text}
    </div>
    <svg width={60} height={60} style={{ position: "absolute", top: "100%", marginTop: -6, left: tail === "left" ? 40 : tail === "right" ? undefined : "50%", right: tail === "right" ? 40 : undefined, translate: tail === "down" ? "-50% 0" : undefined }}>
      <path d={tail === "right" ? "M10 0 L50 50 L40 0" : "M10 0 L20 50 L50 0"} fill="#fff" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <rect x={8} y={-4} width={44} height={8} fill="#fff" />
    </svg>
  </div>
);

/** Letrero grande rojo torcido, como «SIN OTRA OPCIÓN». */
export const BigStamp: React.FC<{ text: string; color?: string; size?: number; rotate?: number }> = ({ text, color = C.red, size = 96, rotate = -4 }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        color,
        textTransform: "uppercase",
        letterSpacing: 1,
        rotate: `${rotate}deg`,
        whiteSpace: "nowrap",
        textShadow: "4px 4px 0 rgba(0,0,0,0.12)",
        scale: interpolate(f, [0, 5, 9], [2.2, 0.92, 1], clamp),
        opacity: interpolate(f, [0, 2], [0, 1], clamp),
      }}
    >
      {text}
    </div>
  );
};

export const Phone: React.FC<{ children: React.ReactNode; w?: number; h?: number; title?: string; color?: string }> = ({ children, w = 620, h = 900, title, color = C.orange }) => (
  <div style={{ width: w, height: h, background: "#fff", border: `10px solid ${C.ink}`, borderRadius: 64, overflow: "hidden", position: "relative", fontFamily: FONT, boxShadow: "0 18px 0 rgba(0,0,0,0.06)" }}>
    <div style={{ width: 150, height: 26, background: C.ink, borderRadius: 20, margin: "18px auto 0" }} />
    {title && (
      <div style={{ margin: "26px 28px 0", background: color, borderRadius: 26, padding: "20px 24px", color: "#fff", fontWeight: 800, fontSize: 38, textAlign: "center" }}>{title}</div>
    )}
    <div style={{ padding: "26px 30px" }}>{children}</div>
  </div>
);

export const Row: React.FC<{ left: string; right?: string; rightColor?: string; strike?: string; highlight?: boolean; size?: number }> = ({ left, right, rightColor = C.green, strike, highlight, size = 38 }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: `5px solid ${C.ink}`, borderRadius: 22, padding: "20px 24px", marginBottom: 18, fontWeight: 800, fontSize: size, color: C.ink, background: highlight ? "#FFF1D6" : "#fff" }}>
    <span>{left}</span>
    <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
      {strike && <span style={{ textDecoration: "line-through", color: "#999", fontSize: size * 0.8 }}>{strike}</span>}
      {right && <span style={{ color: rightColor }}>{right}</span>}
    </span>
  </div>
);

export const Btn: React.FC<{ text: string; done?: boolean; color?: string }> = ({ text, done, color = C.orange }) => (
  <div style={{ background: done ? C.green : color, border: `5px solid ${C.ink}`, borderRadius: 999, padding: "22px 0", textAlign: "center", color: "#fff", fontWeight: 900, fontSize: 42, marginTop: 20 }}>{text}</div>
);

/** Pantalla de chat estilo WhatsApp. */
export type Msg = { who?: string; text: string; me?: boolean; at?: number; audio?: string; link?: boolean };
export const Chat: React.FC<{ title: string; sub?: string; msgs: Msg[]; w?: number; h?: number; draft?: string }> = ({ title, sub, msgs, w = 660, h = 1000, draft }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: w, height: h, borderRadius: 40, overflow: "hidden", border: `8px solid ${C.ink}`, background: C.wa, fontFamily: FONT, position: "relative" }}>
      <div style={{ background: "#2B2B2B", color: "#fff", padding: "26px 30px", display: "flex", gap: 20, alignItems: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: C.orange, display: "grid", placeItems: "center", fontSize: 34 }}>💅</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 36 }}>{title}</div>
          {sub && <div style={{ fontSize: 24, opacity: 0.7 }}>{sub}</div>}
        </div>
      </div>
      <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.me ? "flex-end" : "flex-start",
              maxWidth: "82%",
              background: m.me ? C.waGreen : "#fff",
              border: `4px solid ${C.ink}`,
              borderRadius: 24,
              padding: "16px 22px",
              opacity: interpolate(f, [m.at ?? 0, (m.at ?? 0) + 3], [0, 1], clamp),
              translate: `0 ${interpolate(f, [m.at ?? 0, (m.at ?? 0) + 6], [30, 0], clamp)}px`,
            }}
          >
            {m.who && <div style={{ color: C.pinkDark, fontWeight: 800, fontSize: 24 }}>{m.who}</div>}
            {m.audio ? (
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontWeight: 800, fontSize: 34 }}>▶ <span style={{ letterSpacing: -2 }}>ılıılıılııılı</span> {m.audio}</div>
            ) : (
              <div style={{ fontWeight: 600, fontSize: 34, color: m.link ? "#1C64C8" : C.ink, textDecoration: m.link ? "underline" : undefined }}>{m.text}</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 20, right: 20, bottom: 20, background: "#fff", border: `4px solid ${C.ink}`, borderRadius: 999, padding: "16px 26px", fontSize: 30, color: draft ? C.ink : "#999", fontWeight: draft ? 600 : 400 }}>
        {draft ?? "Mensaje"}
      </div>
    </div>
  );
};

export const Notif: React.FC<{ app?: string; title: string; text: string; time?: string }> = ({ app = "Citora", title, text, time = "ahora" }) => (
  <div style={{ width: 860, background: "#fff", border: `6px solid ${C.ink}`, borderRadius: 36, padding: "24px 30px", fontFamily: FONT, boxShadow: "0 14px 0 rgba(0,0,0,0.08)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#777", fontWeight: 700 }}>
      <span>
        <span style={{ background: C.red, color: "#fff", borderRadius: 8, padding: "2px 10px", marginRight: 10 }}>✓</span>
        {app}
      </span>
      <span>{time}</span>
    </div>
    <div style={{ fontWeight: 900, fontSize: 40, marginTop: 10, color: C.ink }}>{title}</div>
    <div style={{ fontWeight: 600, fontSize: 34, marginTop: 4, color: C.ink }}>{text}</div>
  </div>
);

/** Mesa de uñas (la de 15.000). */
export const Table: React.FC<{ price?: string; marble?: boolean; shine?: boolean; w?: number }> = ({ price, marble, shine, w = 420 }) => (
  <div style={{ position: "relative", width: w, height: w * 0.55 }}>
    <svg viewBox="0 0 400 220" width={w} height={w * 0.55}>
      <path d="M40 40 L360 40 L390 70 L10 70 Z" fill={marble ? "#fff" : "#B07A4F"} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      {marble && <path d="M80 50 Q140 64 200 52 T330 58" stroke="#ccc" strokeWidth={3} fill="none" />}
      <path d="M40 70 L40 210 M360 70 L360 210 M80 70 L80 190 M320 70 L320 190" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    </svg>
    {price && (
      <div style={{ position: "absolute", top: -70, left: "50%", translate: "-50% 0" }}>
        <Pill text={price} color={C.red} size={30} />
      </div>
    )}
    {shine && <div style={{ position: "absolute", top: -40, right: 0, fontSize: 64 }}>✨</div>}
  </div>
);

export const Chair: React.FC<{ eyes?: boolean; spot?: boolean; label?: string }> = ({ eyes, spot, label }) => (
  <div style={{ position: "relative", width: 360, height: 520 }}>
    {spot && <div style={{ position: "absolute", left: -120, right: -120, top: -420, bottom: 0, background: "linear-gradient(180deg, rgba(255,240,180,0) 0%, rgba(255,240,180,0.85) 100%)", clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)" }} />}
    <svg viewBox="0 0 300 440" width={360} height={520} style={{ position: "absolute" }}>
      <rect x={70} y={20} width={160} height={200} rx={30} fill={C.pink} stroke={C.ink} strokeWidth={7} />
      <rect x={50} y={220} width={200} height={50} rx={14} fill={C.pinkDark} stroke={C.ink} strokeWidth={7} />
      <path d="M150 270 L150 380 M90 410 L150 380 L210 410" stroke={C.ink} strokeWidth={9} strokeLinecap="round" fill="none" />
      {eyes && (
        <>
          <circle cx={120} cy={110} r={9} fill={C.ink} />
          <circle cx={180} cy={110} r={9} fill={C.ink} />
        </>
      )}
    </svg>
    {label && (
      <div style={{ position: "absolute", top: 60, left: "50%", translate: "-50% 0", rotate: "-6deg", background: "#FFE66B", border: `4px solid ${C.ink}`, padding: "10px 18px", fontFamily: FONT, fontWeight: 800, fontSize: 34 }}>{label}</div>
    )}
  </div>
);

export const Fan: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 200 360" width={240} height={432}>
      <g transform={`rotate(${f * 40} 100 100)`}>
        {[0, 120, 240].map((a) => (
          <ellipse key={a} cx={100} cy={55} rx={22} ry={45} fill="#9CD3F0" stroke={C.ink} strokeWidth={5} transform={`rotate(${a} 100 100)`} />
        ))}
      </g>
      <circle cx={100} cy={100} r={90} fill="none" stroke={C.ink} strokeWidth={6} />
      <circle cx={100} cy={100} r={14} fill={C.ink} />
      <path d="M100 190 L100 330 M50 340 L150 340" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    </svg>
  );
};

export const Bulb: React.FC<{ on?: boolean }> = ({ on = true }) => (
  <svg viewBox="0 0 200 260" width={200} height={260}>
    {on && <circle cx={100} cy={95} r={95} fill="#FFF0A0" opacity={0.6} />}
    <circle cx={100} cy={95} r={60} fill={on ? "#FFE15A" : "#ddd"} stroke={C.ink} strokeWidth={6} />
    <rect x={72} y={150} width={56} height={44} rx={8} fill="#999" stroke={C.ink} strokeWidth={6} />
  </svg>
);

export const Clock: React.FC<{ time: string; size?: number }> = ({ time, size = 44 }) => <Pill icon="🕘" text={time} size={size} />;

export const Bus: React.FC<{ face?: boolean; w?: number }> = ({ face, w = 620 }) => (
  <svg viewBox="0 0 520 300" width={w} height={(w * 300) / 520}>
    <rect x={10} y={30} width={500} height={210} rx={30} fill="#3E7CC9" stroke={C.ink} strokeWidth={7} />
    {[40, 150, 260, 370].map((x) => (
      <rect key={x} x={x} y={60} width={90} height={80} rx={10} fill="#D8EEFF" stroke={C.ink} strokeWidth={5} />
    ))}
    {face && (
      <g>
        <circle cx={85} cy={110} r={26} fill="#fff" stroke={C.ink} strokeWidth={4} />
        <path d="M60 104 Q60 80 85 80 Q110 80 110 104" fill="#E7B04A" stroke={C.ink} strokeWidth={4} />
        <path d="M74 116 Q85 124 96 116" stroke={C.ink} strokeWidth={4} fill="none" />
      </g>
    )}
    <circle cx={110} cy={250} r={36} fill={C.ink} />
    <circle cx={410} cy={250} r={36} fill={C.ink} />
    <rect x={420} y={150} width={70} height={60} rx={8} fill="#FFD84A" stroke={C.ink} strokeWidth={5} />
  </svg>
);

/** Uña grande (para Pinterest / el diseño de Yamila). */
export const Nail: React.FC<{ stones?: boolean; encap?: boolean; cat?: boolean; color?: string; w?: number }> = ({ stones, encap, cat, color = "#EE8BA8", w = 260 }) => (
  <svg viewBox="0 0 200 400" width={w} height={w * 2}>
    <rect x={30} y={220} width={140} height={170} rx={40} fill="#F6D2BE" stroke={C.ink} strokeWidth={7} />
    <path d="M30 240 L30 90 Q30 10 100 10 Q170 10 170 90 L170 240 Z" fill={color} stroke={C.ink} strokeWidth={7} />
    {encap && ["M70 70 l8 8", "M120 120 l-6 10", "M80 170 l10 -4", "M140 60 l6 8"].map((d, i) => <path key={i} d={d} stroke="#FFD43B" strokeWidth={7} strokeLinecap="round" />)}
    {stones &&
      [
        [80, 160],
        [120, 160],
        [100, 190],
        [100, 135],
      ].map(([x, y], i) => <rect key={i} x={x - 12} y={y - 12} width={24} height={24} fill="#DDF4FF" stroke="#4A90C2" strokeWidth={4} transform={`rotate(45 ${x} ${y})`} />)}
    {cat && (
      <g transform="translate(62 40) scale(0.62)">
        <path d="M14 40 L22 6 L46 26 L74 26 L98 6 L106 40 Q114 96 60 100 Q6 96 14 40 Z" fill="#F5A742" stroke={C.ink} strokeWidth={5} />
        <circle cx={42} cy={56} r={13} fill="none" stroke={C.ink} strokeWidth={5} />
        <circle cx={78} cy={56} r={13} fill="none" stroke={C.ink} strokeWidth={5} />
      </g>
    )}
  </svg>
);

/** Sello final de Citora. */
export const CitoraStamp: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        scale: interpolate(f, [0, 6, 10], [2.4, 0.94, 1], clamp),
        opacity: interpolate(f, [0, 3], [0, 1], clamp),
        rotate: "-8deg",
      }}
    >
      <svg viewBox="0 0 400 400" width={620} height={620}>
        <defs>
          <path id="top" d="M42 200 A158 158 0 0 1 358 200" />
          <path id="bot" d="M40 200 A160 160 0 0 0 360 200" />
        </defs>
        <circle cx={200} cy={200} r={192} fill="none" stroke={C.red} strokeWidth={9} opacity={0.9} />
        <circle cx={200} cy={200} r={134} fill="none" stroke={C.red} strokeWidth={5} opacity={0.9} />
        <text fill={C.red} fontFamily={FONT} fontWeight={800} fontSize={22} letterSpacing={2}>
          <textPath href="#top" startOffset="50%" textAnchor="middle">
            MENOS MENSAJES · MÁS UÑAS
          </textPath>
        </text>
        <text fill={C.red} fontFamily={FONT} fontWeight={800} fontSize={19} letterSpacing={2} dominantBaseline="hanging">
          <textPath href="#bot" startOffset="50%" textAnchor="middle">
            PARA EMPRENDEDORAS CUBANAS
          </textPath>
        </text>
        <rect x={160} y={120} width={80} height={70} rx={12} fill="none" stroke={C.red} strokeWidth={8} />
        <path d="M160 142 L240 142 M178 110 L178 128 M222 110 L222 128" stroke={C.red} strokeWidth={8} strokeLinecap="round" />
        <path d="M180 166 L195 180 L222 154" stroke={C.red} strokeWidth={9} fill="none" strokeLinecap="round" />
        <text x={200} y={262} textAnchor="middle" fill={C.red} fontFamily={FONT} fontWeight={900} fontSize={66}>
          Citora
        </text>
      </svg>
    </div>
  );
};
