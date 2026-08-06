import sys
from PIL import Image

if len(sys.argv) >= 3:
    src = sys.argv[1]
    dst = sys.argv[2]
    Image.open(src).save(dst, "WEBP", quality=85)
