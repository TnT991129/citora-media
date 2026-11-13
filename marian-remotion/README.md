# Marian · animación en Remotion

Episodios 10-12 de Marian. Cada episodio = voz de ElevenLabs (`public/audio`), texto (`textos/`),
tiempos de cada palabra (`src/data`, generados con `scripts/align.py` a partir de los silencios) y
una lista de escenas (`src/episodes/EpXX.tsx`) que empiezan cuando la voz dice una frase.

```bash
npm i
npx remotion studio                       # ver y editar
npx remotion render Marian-ep10 out/marian-ep10.mp4
ffmpeg -i out/marian-ep10.mp4 -c:v copy -af loudnorm=I=-14:TP=-1.5 -c:a aac out/final.mp4   # mismo volumen que los anteriores
```

Episodio nuevo: generar la voz (voz «Nicole», modelo eleven_v4), guardar el texto en `textos/`,
`python3 scripts/align.py public/audio/epXX.mp3 textos/epXX.txt src/data/epXX.json`, copiar un `EpXX.tsx` y cambiar las escenas.
