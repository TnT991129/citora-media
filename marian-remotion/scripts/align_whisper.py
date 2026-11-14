"""Tiempos de cada palabra con faster-whisper, conservando la ortografía del guion.
Uso: python3 -I align_whisper.py audio.mp3 texto.txt salida.json
Requiere: pip install faster-whisper "av>=14,<16" (el modelo 'small' se descarga de Hugging Face la primera vez).
Sustituye a align.py (silencios), que queda como plan B sin internet."""
import os, sys, re, json, difflib, subprocess, unicodedata

os.environ.setdefault("HF_HUB_DISABLE_XET", "1")  # descarga clásica: el servidor Xet no está permitido en el entorno
from faster_whisper import WhisperModel

audio, txt, out = sys.argv[1:4]
raw = open(txt, encoding="utf-8").read()
text = re.sub(r"\[[^\]]*\]", " ", raw)  # quita [tags] y [pause]
words = text.split()

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    return re.sub(r"[^a-z0-9ñ]", "", "".join(c for c in w if unicodedata.category(c) != "Mn"))

model = WhisperModel("small", device="cpu", compute_type="int8")
segs, _ = model.transcribe(audio, language="es", word_timestamps=True, initial_prompt=" ".join(words[:60]))
heard = [w for s in segs for w in s.words]

# Empareja las palabras del guion con las oídas; las que no casan se interpolan.
a, b = [norm(w) for w in words], [norm(w.word) for w in heard]
times = [None] * len(words)
for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
    for k in range(blk.size):
        h = heard[blk.b + k]
        times[blk.a + k] = (h.start, h.end)
known = [i for i, t in enumerate(times) if t]
for i, t in enumerate(times):
    if t:
        continue
    prev = max((k for k in known if k < i), default=None)
    nxt = min((k for k in known if k > i), default=None)
    s0 = times[prev][1] if prev is not None else 0.0
    s1 = times[nxt][0] if nxt is not None else s0 + 0.4
    gap = [k for k in range(prev + 1 if prev is not None else 0, nxt if nxt is not None else len(words))]
    step = (s1 - s0) / max(len(gap), 1)
    j = gap.index(i)
    times[i] = (s0 + j * step, s0 + (j + 1) * step)

dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio],
                           capture_output=True, text=True).stdout)
data = {
    "duration": dur,
    "words": [{"w": w, "s": round(t[0], 3), "e": round(t[1], 3)} for w, t in zip(words, times)],
    "speech": [[round(h.start, 3), round(h.end, 3)] for h in heard],
}
json.dump(data, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
print(f"{len(words)} palabras del guion, {len(known)} encontradas por whisper ({100 * len(known) // len(words)} %)")
