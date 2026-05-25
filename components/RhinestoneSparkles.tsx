"use client";

// RhinestoneSparkles
// ------------------
// Self-measuring sparkle overlay. Finds the rhinestone <img> in the DOM by
// CSS selector, tracks its rendered rectangle with ResizeObserver, and
// positions an SVG to exactly cover it. No wrapper needed in page.tsx — the
// component handles all positioning itself.
//
// Usage (anywhere in the tree, doesn't matter where):
//   <RhinestoneSparkles />              // defaults to selector ".rhinestone-img"
//   <RhinestoneSparkles selector=".my-img" />
//
// Honours prefers-reduced-motion (no sparkles when set).
//
// Stone coordinates come from /public/assets/stone-positions.json.
// Tuned values are baked into DEFAULTS — edit only those numbers to retune.

import { useEffect, useRef } from "react";
import stoneData from "@/public/assets/stone-positions.json";

type Stone = { x: number; y: number };
type StoneData = { width: number; height: number; stones: Stone[] };

const DEFAULTS = {
  spawnMs: 50,
  spawnJitter: 0.6,
  maxConcurrent: 30,
  duration: 950,
  size: 20,
  sizeVariance: 0.65,
  rayLen: 1.5,
  rayWidth: 1,
  secondary: true,
  secondaryRatio: 0.55,
  peak: 0.45,
  color: "#ffffff",
  style: "both" as "glow" | "burst" | "both",
  rays: 4,
  twinkle: true,
  blur: 0.6,
  minSpacing: 30,
  innerGlow: true,
  innerGlowRatio: 0.35,
  innerGlowOpacity: 1,
  wave: true,
  waveActive: 1000,
  waveQuiet: 600,
  waveJitter: 0.5,
};

const NS = "http://www.w3.org/2000/svg";
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]): T => arr[(Math.random() * arr.length) | 0];

function spindlePoints(length: number, halfW: number) {
  const back = -length * 0.05;
  const mid = length * 0.45;
  return `${back},0 ${mid},${halfW} ${length},0 ${mid},${-halfW}`;
}

export default function RhinestoneSparkles({
  selector = ".rhinestone-img",
}: {
  selector?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const svg = svgRef.current as SVGSVGElement;
    if (!svg) return;

    // Find the rhinestone image. Retry briefly in case it hasn't rendered yet.
    let target: HTMLElement | null = null;
    let tries = 0;
    function findTarget(): HTMLElement | null {
      const el = document.querySelector<HTMLElement>(selector);
      return el;
    }
    target = findTarget();
    if (!target) {
      const t = setInterval(() => {
        target = findTarget();
        if (target) { clearInterval(t); init(target); }
        else if (++tries > 30) clearInterval(t);
      }, 100);
      return () => clearInterval(t);
    }
    return init(target);

    function init(img: HTMLElement) {
      // Position SVG fixed-style to overlay the image's bounding rect.
      svg.style.position = "fixed";
      svg.style.pointerEvents = "none";
      svg.style.mixBlendMode = "screen";
      svg.style.zIndex = "5";
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("viewBox", `0 0 ${stoneData.width} ${stoneData.height}`);
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

      const sync = () => {
        const r = img.getBoundingClientRect();
        svg.style.left = `${r.left}px`;
        svg.style.top = `${r.top}px`;
        svg.style.width = `${r.width}px`;
        svg.style.height = `${r.height}px`;
      };
      sync();

      const ro = new ResizeObserver(sync);
      ro.observe(img);
      window.addEventListener("resize", sync);
      window.addEventListener("scroll", sync, { passive: true });

      // ─── sparkle engine ──────────────────────────────────────────────
      const data = stoneData as StoneData;
      const { stones } = data;
      const p = DEFAULTS;

      const defs = document.createElementNS(NS, "defs");
      defs.innerHTML = `
        <radialGradient id="rs-glow">
          <stop offset="0%"   stop-color="${p.color}" stop-opacity="1"/>
          <stop offset="35%"  stop-color="${p.color}" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="${p.color}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="rs-glow-inner">
          <stop offset="0%"   stop-color="${p.color}" stop-opacity="1"/>
          <stop offset="55%"  stop-color="${p.color}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${p.color}" stop-opacity="0"/>
        </radialGradient>
        <filter id="rs-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="${p.blur}"/>
        </filter>
      `;
      svg.appendChild(defs);

      type Live = {
        el: SVGGElement;
        burst?: SVGGElement;
        phase: number;
        born: number;
        dies: number;
        x: number;
        y: number;
      };
      const live: Live[] = [];

      let stopped = false;
      let raf = 0;
      let nextBirth = performance.now() + 200;
      let wavePhase: "active" | "quiet" = "active";
      let phaseEnds = performance.now() + p.waveActive;

      function spawn(now: number) {
        if (live.length >= p.maxConcurrent) return;
        let attempts = 12;
        let stone: Stone | null = null;
        while (attempts-- > 0) {
          const s = pick(stones);
          let ok = true;
          for (const l of live) {
            const dx = l.x - s.x, dy = l.y - s.y;
            if (dx * dx + dy * dy < p.minSpacing * p.minSpacing) { ok = false; break; }
          }
          if (ok) { stone = s; break; }
        }
        if (!stone) stone = pick(stones);

        const sizeMul = 1 + rnd(-p.sizeVariance, p.sizeVariance);
        const r = Math.max(4, p.size * sizeMul);

        const g = document.createElementNS(NS, "g");
        g.setAttribute("transform", `translate(${stone.x} ${stone.y})`);
        g.style.opacity = "0";

        if (p.style === "glow" || p.style === "both") {
          const outer = document.createElementNS(NS, "circle");
          outer.setAttribute("r", String(r));
          outer.setAttribute("fill", "url(#rs-glow)");
          g.appendChild(outer);
          if (p.innerGlow) {
            const inner = document.createElementNS(NS, "circle");
            inner.setAttribute("r", String(r * p.innerGlowRatio));
            inner.setAttribute("fill", "url(#rs-glow-inner)");
            inner.setAttribute("opacity", String(p.innerGlowOpacity));
            g.appendChild(inner);
          }
        }

        let burst: SVGGElement | undefined;
        const phase = p.twinkle ? rnd(-4, 4) : 0;
        if (p.style === "burst" || p.style === "both") {
          burst = document.createElementNS(NS, "g");
          burst.setAttribute("filter", "url(#rs-blur)");
          const primaryLen = r * p.rayLen;
          const primaryHW = p.rayWidth * sizeMul;
          const secLen = primaryLen * p.secondaryRatio;
          const secHW = primaryHW * 0.7;
          const primaryPts = spindlePoints(primaryLen, primaryHW);
          const secPts = spindlePoints(secLen, secHW);
          for (let i = 0; i < p.rays; i++) {
            const ang = (i / p.rays) * 360 + phase;
            const poly = document.createElementNS(NS, "polygon");
            poly.setAttribute("points", primaryPts);
            poly.setAttribute("fill", p.color);
            poly.setAttribute("transform", `rotate(${ang})`);
            burst.appendChild(poly);
          }
          if (p.secondary) {
            const offset = 360 / (p.rays * 2);
            for (let i = 0; i < p.rays; i++) {
              const ang = (i / p.rays) * 360 + offset + phase;
              const poly = document.createElementNS(NS, "polygon");
              poly.setAttribute("points", secPts);
              poly.setAttribute("fill", p.color);
              poly.setAttribute("fill-opacity", "0.85");
              poly.setAttribute("transform", `rotate(${ang})`);
              burst.appendChild(poly);
            }
          }
          g.appendChild(burst);
        }

        svg.appendChild(g);
        live.push({
          el: g, burst, phase,
          born: now,
          dies: now + p.duration * (0.85 + Math.random() * 0.3),
          x: stone.x, y: stone.y,
        });
      }

      function frame() {
        if (stopped) return;
        const now = performance.now();
        if (p.wave) {
          if (now >= phaseEnds) {
            wavePhase = wavePhase === "active" ? "quiet" : "active";
            const base = wavePhase === "active" ? p.waveActive : p.waveQuiet;
            const j = base * p.waveJitter;
            phaseEnds = now + Math.max(100, base + rnd(-j, j));
          }
        }
        const canSpawn = !p.wave || wavePhase === "active";
        if (canSpawn && now >= nextBirth) {
          spawn(now);
          const j = p.spawnMs * p.spawnJitter;
          nextBirth = now + Math.max(40, p.spawnMs + rnd(-j, j));
        } else if (!canSpawn) {
          nextBirth = Math.max(nextBirth, phaseEnds);
        }
        for (let i = live.length - 1; i >= 0; i--) {
          const s = live[i];
          const t = (now - s.born) / (s.dies - s.born);
          if (t >= 1) { s.el.remove(); live.splice(i, 1); continue; }
          const env = Math.sin(t * Math.PI);
          s.el.style.opacity = (env * p.peak).toFixed(3);
          if (p.twinkle && s.burst) {
            const rot = Math.sin(t * Math.PI * 2) * 5 + s.phase;
            const scl = 0.9 + env * 0.18;
            s.burst.setAttribute("transform", `rotate(${rot}) scale(${scl})`);
          }
        }
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);

      return () => {
        stopped = true;
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("resize", sync);
        window.removeEventListener("scroll", sync);
        while (svg.firstChild) svg.removeChild(svg.firstChild);
      };
    }
  }, [selector]);

  return <svg ref={svgRef} />;
}
