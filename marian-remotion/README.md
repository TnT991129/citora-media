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

## Flujo de trabajo (desde el 13-nov-2026)

Ya no se generan voces con ElevenLabs desde aquí (sin créditos). Para cada video:

1. Claude entrega el **guion** (texto exacto a leer, con las pausas marcadas).
2. El dueño de Citora graba o genera el **audio** y lo pasa (mp3, m4a o wav; un archivo por video).
3. Claude lo guarda en `public/audio/`, sincroniza los subtítulos con `scripts/align.py`,
   monta las escenas, renderiza y normaliza a -14 LUFS.

Si la grabación cambia alguna palabra respecto al guion, hay que avisar o actualizar `textos/epXX.txt`,
porque los subtítulos salen de ese texto.

## Final de los episodios (desde el ep. 13)
Los episodios nuevos usan `outro="walk"` en `<Episode>`: desde «En fin» Marian sale de cuerpo entero,
dice la frase, se va caminando por la derecha y luego aparece el sello. Los ep. 10-12 usan el final antiguo (`"stamp"`).
En `Root.tsx`, la duración se calcula con `dur(data, "walk")`. Ejemplo: composición `Prueba-final-nuevo`.

## Regla de contenido
Citora **no procesa pagos**. Nunca mostrar «Pago recibido» o «Depósito recibido» como aviso de la app.
Los pagos en los videos van en efectivo (componente `Cash`) o fuera de la app.
