/**
 * Fixed film-grain layer. Pure CSS (see `.grain` in globals.css) so it needs no
 * JS, survives reduced-motion, and softens banding across the aurora gradients.
 */
export function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}
