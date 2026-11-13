"""Alinea el texto de un episodio con su audio usando los silencios (sin servicios externos).
Uso: python3 align.py audio.mp3 texto.txt salida.json"""
import sys, re, json, subprocess, math

audio, txt, out = sys.argv[1:4]
raw = open(txt, encoding="utf-8").read()
text = re.sub(r"\[(?!pause|long pause)[^\]]*\]", " ", raw)          # quita tags de estilo
text = re.sub(r"\[(pause|long pause)\]", " | ", text)                 # pausas = corte
# corta frases en . ? ! … : y en las pausas
parts = re.split(r"\s*\|\s*|(?<=[.?!…:])\s+(?=[^»])|(?<=[.?!…]»)\s+", text)
phrases = [re.sub(r"\s+", " ", p).strip() for p in parts if p and p.strip(" |")]

def silences(th, d):
    r = subprocess.run(["ffmpeg", "-i", audio, "-af", f"silencedetect=noise={th}dB:d={d}", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", r)]
    en = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r)]
    return list(zip(st, en))
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio],
                           capture_output=True, text=True).stdout)
sil = silences(-38, 0.15)
segs, t = [], 0.0
for s, e in sil:
    if s - t > 0.05: segs.append((t, s))
    t = e
if dur - t > 0.05: segs.append((t, dur))

def w(p): return max(len(p.replace(" ", "")), 1)
N, M = len(phrases), len(segs)
rate = sum(e - s for s, e in segs) / sum(w(p) for p in phrases)
INF = 1e18
cost = [[INF] * (M + 1) for _ in range(N + 1)]; back = {}
cost[0][0] = 0
for i in range(N + 1):
    for j in range(M + 1):
        if cost[i][j] >= INF: continue
        for a in range(1, 4):
            for b in range(1, 5):
                if i + a > N or j + b > M: continue
                exp = sum(w(p) for p in phrases[i:i + a]) * rate
                got = sum(e - s for s, e in segs[j:j + b])
                c = math.log(got / exp) ** 2 + 0.15 * (a - 1) + 0.05 * (b - 1)
                if cost[i][j] + c < cost[i + a][j + b]:
                    cost[i + a][j + b] = cost[i][j] + c; back[(i + a, j + b)] = (i, j)
i, j, groups = N, M, []
while (i, j) != (0, 0):
    pi, pj = back[(i, j)]; groups.append((pi, i, pj, j)); i, j = pi, pj
groups.reverse()

words = []
for pi, pe, sj, se in groups:
    ws = [x for p in phrases[pi:pe] for x in p.split(" ")]
    sg = segs[sj:se]; total = sum(e - s for s, e in sg)
    lens = [w(x) + 1.5 for x in ws]; L = sum(lens)
    def at(f):  # fracción del habla del grupo -> tiempo real
        acc = f * total
        for s, e in sg:
            if acc <= e - s: return s + acc
            acc -= e - s
        return sg[-1][1]
    c = 0
    for x, l in zip(ws, lens):
        words.append({"w": x, "s": round(at(c / L), 3), "e": round(at((c + l) / L), 3)}); c += l
json.dump({"duration": dur, "words": words, "speech": [[round(s, 3), round(e, 3)] for s, e in segs]},
          open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
print(f"{N} frases, {M} tramos de voz, {len(words)} palabras, coste {cost[N][M]:.2f}")
