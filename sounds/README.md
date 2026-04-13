# sounds/

Drop your audio files here. Supported formats: `.mp3`, `.ogg`, `.wav`

## Expected file names (matching `script.js` defaults)

| File name          | Button label    |
|--------------------|-----------------|
| `airhorn.mp3`      | Air Horn        |
| `applause.mp3`     | Applause        |
| `bruh.mp3`         | Bruh            |
| `fail.mp3`         | Fail            |
| `wasted.mp3`       | GTA Wasted      |
| `sadtrombone.mp3`  | Sad Trombone    |
| `mlghit.mp3`       | MLG Hit         |
| `oof.mp3`          | Oof             |
| `vineboom.mp3`     | Vine Boom       |
| `windowsxp.mp3`    | Windows XP      |
| `mchurt.mp3`       | Minecraft Hurt  |
| `crickets.mp3`     | Crickets        |

## Customizing sounds & images

Open **`script.js`** and edit the `sounds` array at the top of the file.
Each entry supports:

```js
{
  name:  "My Sound",       // label on the button
  audio: "sounds/my.mp3", // path or URL to audio file
  image: "img/myimg.png", // (optional) image shown on the button
  emoji: "🎵",             // (optional) fallback emoji when no image
  color: "#ff4757"        // (optional) accent colour
}
```
