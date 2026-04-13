/* ============================================================
   SOUNDBOARD DATA
   ============================================================
   Each entry in the `sounds` array creates one button.

   Required fields:
     name  – label shown on the button
     audio – path to your audio file  (e.g. "sounds/myfile.mp3")
              OR a full URL           (e.g. "https://example.com/sound.mp3")

   Optional fields:
     image  – URL or path to an image (shown as the button graphic)
     emoji  – fallback emoji icon shown when no image is provided (default: "🔊")
     color  – accent colour for the button's bottom bar (CSS colour string)

   To add your own sound:
     1. Drop your .mp3 / .ogg / .wav file into the  sounds/  folder.
     2. Copy one of the objects below and update name, audio, image / emoji.
   ============================================================ */

const sounds = [
  // ── Example 1 ──────────────────────────────────────────────
  {
    name:  "HO EENS EVEN",
    // Replace with your own audio file path or URL:
    audio: "sounds/hoeenseven.mp3",
    // Replace with your own image URL or local path:
    image: "https://stevivor.com/wp-content/uploads/2019/04/ace-attorney-6.webp",
    color: "#e94560"
  },
];

/* ============================================================
   SOUNDBOARD ENGINE  –  no changes needed below this line
   ============================================================ */

(function () {
  "use strict";

  // Currently playing audio element (so we can stop it on next click)
  let currentAudio = null;
  let currentBtn   = null;

  /**
   * Set grid-template-columns based on the number of sounds so that
   * smaller boards show larger, more prominent buttons.
   */
  function updateGridLayout() {
    const grid = document.getElementById("soundboard");
    const count = sounds.length;
    if (!grid || count === 0) return;

    let cols;
    if (count <= 3) {
      // 1-3 sounds: one per column so they fill a single row and stay large
      cols = count;
    } else if (count < 10) {
      // 4-9 sounds: roughly square grid (e.g. 4→2, 5-6→3, 7-9→3)
      cols = Math.ceil(Math.sqrt(count));
    } else {
      // 10+ sounds: fluid auto-fill with a sensible minimum size
      grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(160px, 1fr))";
      return;
    }

    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  }

  /**
   * Build the grid of buttons from the sounds array.
   */
  function buildBoard() {
    const grid = document.getElementById("soundboard");
    if (!grid) return;

    sounds.forEach((sound, index) => {
      const btn = document.createElement("button");
      btn.className   = "sound-btn";
      btn.title       = sound.name;
      btn.dataset.idx = index;
      btn.style.setProperty("--accent", sound.color || "#e94560");

      // Visual: image takes priority over emoji
      if (sound.image) {
        const img = document.createElement("img");
        img.className = "btn-image";
        img.src       = sound.image;
        img.alt       = sound.name;
        // Fall back to emoji if the image fails to load
        img.onerror   = () => {
          img.replaceWith(makeEmoji(sound.emoji || "🔊"));
        };
        btn.appendChild(img);
      } else {
        btn.appendChild(makeEmoji(sound.emoji || "🔊"));
      }

      // Label
      const label = document.createElement("span");
      label.className   = "btn-label";
      label.textContent = sound.name;
      btn.appendChild(label);

      btn.addEventListener("click", () => playSound(sound, btn));
      grid.appendChild(btn);
    });

    updateGridLayout();
  }

  /**
   * Create an emoji span element.
   */
  function makeEmoji(emoji) {
    const span = document.createElement("span");
    span.className   = "btn-emoji";
    span.textContent = emoji;
    return span;
  }

  /**
   * Play a sound.
   * Clicking the same button while it is playing restarts the sound.
   * Clicking a different button stops the previous one.
   */
  function playSound(sound, btn) {
    // Remember whether the same button was already playing before we stop anything
    const wasSameButton = (currentBtn === btn);

    // Stop whatever is currently playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      if (currentBtn) currentBtn.classList.remove("playing");
      currentAudio = null;
      currentBtn   = null;
    }

    // If the same button was playing, just stop it (toggle off)
    if (wasSameButton) {
      return;
    }

    const audio = new Audio(sound.audio);
    audio.volume = 1.0;

    audio.addEventListener("ended", () => {
      btn.classList.remove("playing");
      if (currentAudio === audio) {
        currentAudio = null;
        currentBtn   = null;
      }
    });

    audio.addEventListener("error", () => {
      console.warn(`[Soundboard] Could not load audio: ${sound.audio}`);
      btn.classList.remove("playing");
      if (currentAudio === audio) {
        currentAudio = null;
        currentBtn   = null;
      }
    });

    currentAudio = audio;
    currentBtn   = btn;
    btn.classList.add("playing");
    audio.play().catch(err => {
      console.warn("[Soundboard] Playback blocked:", err.message);
      btn.classList.remove("playing");
    });
  }

  // Build the board once the DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildBoard);
  } else {
    buildBoard();
  }
})();
