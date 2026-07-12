"use client";

export default function AudioPlayer() {
  return (
    <>
      <audio id="wedding-music" loop>
        <source src="/assets/wedding-song.mp3" type="audio/mpeg" />
      </audio>

      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        gap: "8px",
        zIndex: 99999,
      }}>
        <span
          id="music-prompt"
          style={{
            fontSize: "11px",
            color: "#09144C",
            opacity: 0.5,
            fontFamily: "var(--font-work-sans)",
            transition: "opacity 0.3s ease",
            whiteSpace: "nowrap",
          }}
        >
          Play →
        </span>

        <button
          id="music-toggle"
          aria-label="Toggle music"
          style={{
            background: "transparent",
            color: "#09144C",
            opacity: 0.5,
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            padding: "4px",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "0.5"}
        >
          ▶
        </button>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          const audio = document.getElementById('wedding-music');
          const btn = document.getElementById('music-toggle');
          let isPlaying = false;

          function setPlaying(playing) {
            isPlaying = playing;
            btn.textContent = playing ? '⏸' : '▶';
            if ('mediaSession' in navigator) {
              navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
            }
          }

          btn.addEventListener('click', function() {
            // Hide the "Play →" prompt on first click
            var prompt = document.getElementById('music-prompt');
            if (prompt) {
              prompt.style.opacity = '0';
              setTimeout(function() { prompt.style.display = 'none'; }, 300);
            }

            if (isPlaying) {
              audio.pause();
              setPlaying(false);
            } else {
              audio.play();
              setPlaying(true);
            }
          });

          if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: 'Annie & Nico',
              artist: 'anco.fyi',
              artwork: [{ src: '/assets/LOGO Website.png', sizes: '899x899', type: 'image/png' }],
            });
            navigator.mediaSession.setActionHandler('play', function() {
              audio.play();
              setPlaying(true);
            });
            navigator.mediaSession.setActionHandler('pause', function() {
              audio.pause();
              setPlaying(false);
            });
          }
        })();
      `}} />

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 600px) {
          #music-toggle {
            color: #F7F1E2 !important;
          }
          #music-prompt {
            color: #F7F1E2 !important;
          }
        }
      `}} />
    </>
  );
}
