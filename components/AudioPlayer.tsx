"use client";

export default function AudioPlayer() {
  return (
    <>
      <audio id="wedding-music" loop>
        <source src="/assets/wedding-song.mp3" type="audio/mpeg" />
      </audio>

      <button
        id="music-toggle"
        aria-label="Toggle music"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "transparent",
          color: "#09144C",
          opacity: 0.5,
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
          zIndex: 99999,
          padding: "4px",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
        onMouseLeave={(e) => e.currentTarget.style.opacity = "0.5"}
      >
        ▶
      </button>

      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          const audio = document.getElementById('wedding-music');
          const btn = document.getElementById('music-toggle');
          let isPlaying = false;

          window.addEventListener('load', function() {
            setTimeout(function() {
              audio.play().then(function() {
                isPlaying = true;
                btn.textContent = '⏸';
              }).catch(function(e) {
                console.log('Autoplay blocked:', e);
              });
            }, 500);
          });

          btn.addEventListener('click', function() {
            if (isPlaying) {
              audio.pause();
              btn.textContent = '▶';
              isPlaying = false;
            } else {
              audio.play();
              btn.textContent = '⏸';
              isPlaying = true;
            }
          });
        })();
      `}} />

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 550px) {
          #music-toggle {
            color: #F7F1E2 !important;
          }
        }
      `}} />
    </>
  );
}
