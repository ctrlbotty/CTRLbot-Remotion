// The app's own iconography, exported from res/drawable by `npm run sync:tokens`.
//
// Tinted icons are drawn as a CSS mask so a single SVG can be recolored the way
// app:tint recolors a drawable in the app. Untinted icons keep the fill baked into
// the vector (ic_power is red in the source, and stays red here).

import {staticFile} from 'remotion';
import type {CSSProperties} from 'react';
import type {appDrawables} from '../design/tokens.generated';

type WithoutSvgExtension<T> = T extends `${infer Name}.svg` ? Name : never;

/**
 * Every vector drawable the sync script exported. Adding an icon to the list in
 * scripts/sync-app-tokens.mjs and re-running `npm run sync:tokens` is all it takes
 * to make it available here — the type follows the generated manifest.
 */
export type AppIconName = WithoutSvgExtension<(typeof appDrawables)[number]>;

export const AppIcon = ({
  name,
  size,
  tint,
  style,
}: {
  name: AppIconName;
  size: number;
  /** Omit to keep the vector's own fill. */
  tint?: string;
  style?: CSSProperties;
}) => {
  const url = `url(${staticFile(`app-assets/${name}.svg`)})`;

  if (!tint) {
    return (
      <div
        style={{
          width: size,
          height: size,
          backgroundImage: url,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          ...style,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: tint,
        maskImage: url,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: url,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        ...style,
      }}
    />
  );
};
