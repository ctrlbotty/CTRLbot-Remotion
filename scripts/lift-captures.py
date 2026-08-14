"""Lift the dark neutral field of a screen capture so it survives H.264 at video scale.

    python scripts/lift-captures.py public/captures/tablet/eui-welcome.png ...

The app draws the EUI content field at #1A1A1A against black bars — a step of 26
luminance. That is legible in a full-size screenshot and gone once the frame is scaled
into a 1200px tile and encoded at CRF 23: the screen reads as one flat black rectangle
beside a paragraph. This takes the field to #2E2E2E, a step of 46, which survives.

A gamma is applied per pixel and weighted off by saturation, so:

  - pure black stays pure black      (0 ** g == 0)   the bars do not wash out
  - white stays white                (1 ** g == 1)   no clipped text
  - saturated pixels are returned byte-identical

That last rule is the reason this is a preprocess and not a render-time filter. A global
gamma would drag CTRLbot blue #008FD4 toward cyan; here the blue tap ring and the green
power icon come through unshifted.

NOT IDEMPOTENT. Running it twice double-lifts. It is applied once, to the committed
capture, and the result is what lives in git — see the note in app-ui/CapturedScreen.tsx.
Re-take a capture from the app and you must re-run this before committing it.
"""

import sys

from PIL import Image

GAMMA = 0.75
SAT_FULL = 20  # saturation at or below this: full lift
SAT_NONE = 40  # saturation at or above this: untouched

LUT = [round(255 * ((i / 255) ** GAMMA)) for i in range(256)]


def lift(path: str) -> None:
    im = Image.open(path)
    alpha = im.getchannel("A") if im.mode in ("RGBA", "LA") else None
    rgb = im.convert("RGB")
    px = rgb.load()
    width, height = rgb.size
    changed = 0

    for y in range(height):
        for x in range(width):
            r, g, b = px[x, y]
            sat = max(r, g, b) - min(r, g, b)
            if sat >= SAT_NONE:
                continue
            weight = 1.0 if sat <= SAT_FULL else (SAT_NONE - sat) / (SAT_NONE - SAT_FULL)
            lifted = (
                round(r + (LUT[r] - r) * weight),
                round(g + (LUT[g] - g) * weight),
                round(b + (LUT[b] - b) * weight),
            )
            if lifted != (r, g, b):
                px[x, y] = lifted
                changed += 1

    out = rgb
    if alpha is not None:
        out = rgb.convert("RGBA")
        out.putalpha(alpha)
    out.save(path)
    print(f"  {path}: {changed} px lifted ({100 * changed / (width * height):.1f}%)")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for target in sys.argv[1:]:
        lift(target)
