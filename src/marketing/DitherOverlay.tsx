import React from 'react';

/**
 * Micro-dither grain overlay to eliminate color banding across gradients in 8-bit color
 * and H.264 video compression.
 */
export const DitherOverlay: React.FC<{opacity?: number}> = ({opacity = 0.035}) => (
  <svg
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      opacity,
      mixBlendMode: 'overlay',
      pointerEvents: 'none',
    }}
  >
    <filter id="dither-noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.8"
        numOctaves={3}
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#dither-noise)" />
  </svg>
);
