/**
 * Bits of geometry the Fantasy Chateau elevations share.
 *
 * Both drawings trace the same building's ornament — the volute on every
 * roofline crest, the same stucco — so the shapes live here rather than being
 * copied between the two components.
 */

/** A volute, drawn as a real spiral rather than an arc that looks like one. */
export function spiral(cx: number, cy: number, turns: number, outer: number, inner: number): string {
  const steps = 44;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const r = outer + (inner - outer) * t;
    d += `${i ? 'L' : 'M'}${(cx + Math.cos(angle) * r).toFixed(1)},${(cy + Math.sin(angle) * r).toFixed(1)}`;
  }
  return d;
}

/** Deterministic pseudo-randomness, so a drawing is identical every build. */
export function jitter(i: number, seed: number): number {
  const n = Math.sin((i + 1) * 12.9898 + seed * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/** Stucco and trim, sampled from the hotel's own exterior photography. */
export const WALL_LIGHT = '#f1ddd6';
export const WALL_DARK = '#e3c6bd';
export const TRIM = '#fdf8f0';
export const TRIM_LINE = '#d8bdae';
