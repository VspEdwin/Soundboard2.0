# Soundboard 2.0

A browser-based soundboard — click a button to play a sound.  
Every button can show a custom **image** (or emoji fallback) and plays a **local or remote audio file**.

## Quick start

1. Open `index.html` in your browser (or serve it with any static file server).
2. Drop your audio files (`.mp3`, `.ogg`, `.wav`) into the `sounds/` folder.
3. Edit the `sounds` array at the top of `script.js` to wire up your files.

## Adding a sound

```js
// in script.js → const sounds = [ ... ]
{
  name:  "My Sound",
  audio: "sounds/mysound.mp3", // or a full URL
  image: "https://example.com/myimage.png", // optional – shows an image on the button
  emoji: "🎵",                 // fallback emoji when no image is set
  color: "#ff4757"             // accent colour for the button
},
```

## File structure

```
Soundboard2.0/
├── index.html     ← page structure
├── style.css      ← dark-theme styles
├── script.js      ← sounds data + playback engine
└── sounds/
    ├── README.md  ← instructions
    ├── airhorn.mp3
    └── …          ← your audio files
```
