// Written by `npm run narration:edit`. Do not edit; change src/marketing/iot-tablet-walkthrough/iotTabletWalkthroughNarration.ts and rebuild.

import type {CaptionWord} from '../../shorts/shortsData';

export type NarrationEditClip = {
  id: string;
  at: number;
  start: number;
  end: number;
  seconds: number;
  removed: Array<{from: number; to: number; kind: string; heard: string}>;
};

export type NarrationCue = {text: string; ms: number};

export type NarrationEdit = {
  src: string;
  seconds: number;
  clips: NarrationEditClip[];
  words: CaptionWord[];
  cues: Record<string, NarrationCue[]>;
};

export const NARRATION_EDIT: NarrationEdit = {
  "src": "narration/iot-tablet-walkthrough/edit.m4a",
  "seconds": 343.5,
  "clips": [
    {
      "id": "welcome",
      "at": 0.35,
      "start": 1.775,
      "end": 11.28,
      "seconds": 8.089,
      "removed": [
        {
          "from": 9.84,
          "to": 9.95,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "first-run-tour",
      "at": 11.25,
      "start": 15.195,
      "end": 26.94,
      "seconds": 11.346,
      "removed": [
        {
          "from": 25.765,
          "to": 25.955,
          "kind": "extra",
          "heard": "an"
        }
      ]
    },
    {
      "id": "ai-intro",
      "at": 24.75,
      "start": 28.955,
      "end": 34.205,
      "seconds": 5.138,
      "removed": [
        {
          "from": 33.255,
          "to": 33.355,
          "kind": "extra",
          "heard": "d"
        }
      ]
    },
    {
      "id": "ai-manual",
      "at": 30.188,
      "start": 35.07,
      "end": 43.22,
      "seconds": 7.171,
      "removed": [
        {
          "from": 40.3,
          "to": 40.64,
          "kind": "repeat",
          "heard": "is"
        },
        {
          "from": 40.705,
          "to": 40.96,
          "kind": "repeat",
          "heard": "is"
        },
        {
          "from": 42.18,
          "to": 42.475,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "ai-help",
      "at": 37.659,
      "start": 43.225,
      "end": 49.545,
      "seconds": 5.801,
      "removed": [
        {
          "from": 45.15,
          "to": 45.505,
          "kind": "extra",
          "heard": "about"
        },
        {
          "from": 47.805,
          "to": 47.905,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "db-devices",
      "at": 46.75,
      "start": 54.78,
      "end": 64.045,
      "seconds": 9.053,
      "removed": [
        {
          "from": 58.675,
          "to": 58.875,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "db-sorting",
      "at": 56.103,
      "start": 64.46,
      "end": 76.085,
      "seconds": 9.432,
      "removed": [
        {
          "from": 70.19,
          "to": 70.4,
          "kind": "repeat",
          "heard": "and"
        },
        {
          "from": 72.59,
          "to": 72.86,
          "kind": "extra",
          "heard": "op"
        },
        {
          "from": 73.625,
          "to": 73.98,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 74.02,
          "to": 74.215,
          "kind": "extra",
          "heard": "but"
        },
        {
          "from": 74.32,
          "to": 74.52,
          "kind": "extra",
          "heard": "are"
        },
        {
          "from": 74.535,
          "to": 74.775,
          "kind": "extra",
          "heard": "are"
        }
      ]
    },
    {
      "id": "epson-add",
      "at": 69.75,
      "start": 76.87,
      "end": 78.37,
      "seconds": 1.5,
      "removed": []
    },
    {
      "id": "epson-info",
      "at": 71.55,
      "start": 79.93,
      "end": 86.44,
      "seconds": 6.51,
      "removed": []
    },
    {
      "id": "epson-webpage",
      "at": 78.36,
      "start": 86.785,
      "end": 94.935,
      "seconds": 7.104,
      "removed": [
        {
          "from": 89.02,
          "to": 89.255,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "epson-connection",
      "at": 85.764,
      "start": 95.37,
      "end": 101.47,
      "seconds": 5.481,
      "removed": [
        {
          "from": 97.27,
          "to": 97.63,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 100.21,
          "to": 100.445,
          "kind": "extra",
          "heard": "od"
        }
      ]
    },
    {
      "id": "add-ip",
      "at": 93.25,
      "start": 102.09,
      "end": 109.41,
      "seconds": 6.901,
      "removed": [
        {
          "from": 106.935,
          "to": 107.18,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 108.245,
          "to": 108.395,
          "kind": "filler",
          "heard": "Um"
        }
      ]
    },
    {
      "id": "add-saved",
      "at": 100.451,
      "start": 125.16,
      "end": 132.605,
      "seconds": 7.445,
      "removed": []
    },
    {
      "id": "term-commands",
      "at": 109.25,
      "start": 132.77,
      "end": 137.07,
      "seconds": 3.868,
      "removed": [
        {
          "from": 134.32,
          "to": 134.74,
          "kind": "extra",
          "heard": "ayoucon"
        }
      ]
    },
    {
      "id": "test-device",
      "at": 114.75,
      "start": 140.38,
      "end": 150.025,
      "seconds": 9.443,
      "removed": [
        {
          "from": 143.655,
          "to": 143.845,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "test-remote",
      "at": 124.493,
      "start": 150.38,
      "end": 153.485,
      "seconds": 2.568,
      "removed": [
        {
          "from": 152.185,
          "to": 152.445,
          "kind": "extra",
          "heard": "nd"
        },
        {
          "from": 152.5,
          "to": 152.71,
          "kind": "extra",
          "heard": "an"
        }
      ]
    },
    {
      "id": "test-switcher",
      "at": 127.361,
      "start": 153.9,
      "end": 156.605,
      "seconds": 2.453,
      "removed": [
        {
          "from": 154.34,
          "to": 154.58,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "test-terminal",
      "at": 130.222,
      "start": 157.58,
      "end": 163.855,
      "seconds": 6.083,
      "removed": [
        {
          "from": 162.26,
          "to": 162.44,
          "kind": "extra",
          "heard": "an"
        }
      ]
    },
    {
      "id": "test-webpage",
      "at": 136.605,
      "start": 164.52,
      "end": 168.47,
      "seconds": 3.95,
      "removed": []
    },
    {
      "id": "act-next",
      "at": 142.75,
      "start": 170.22,
      "end": 177.24,
      "seconds": 6.636,
      "removed": [
        {
          "from": 176.435,
          "to": 176.64,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "act-customize",
      "at": 149.686,
      "start": 177.24,
      "end": 184.435,
      "seconds": 6.276,
      "removed": [
        {
          "from": 179.355,
          "to": 179.745,
          "kind": "extra",
          "heard": "ol"
        },
        {
          "from": 181.065,
          "to": 181.37,
          "kind": "filler",
          "heard": "Um"
        }
      ]
    },
    {
      "id": "act-presets",
      "at": 156.262,
      "start": 184.79,
      "end": 186.7,
      "seconds": 1.91,
      "removed": []
    },
    {
      "id": "switch-projector",
      "at": 161.75,
      "start": 187.915,
      "end": 191.085,
      "seconds": 3.17,
      "removed": []
    },
    {
      "id": "switch-assign",
      "at": 165.22,
      "start": 192.7,
      "end": 201.21,
      "seconds": 7.484,
      "removed": [
        {
          "from": 194.75,
          "to": 195.18,
          "kind": "extra",
          "heard": "om"
        },
        {
          "from": 198.62,
          "to": 198.88,
          "kind": "repeat",
          "heard": "and"
        }
      ]
    },
    {
      "id": "switch-eui",
      "at": 173.004,
      "start": 201.71,
      "end": 205.525,
      "seconds": 3.723,
      "removed": []
    },
    {
      "id": "eui-setup",
      "at": 178.25,
      "start": 206.1,
      "end": 216.77,
      "seconds": 10.078,
      "removed": [
        {
          "from": 212.175,
          "to": 212.475,
          "kind": "filler",
          "heard": "uh"
        }
      ]
    },
    {
      "id": "eui-technician",
      "at": 188.628,
      "start": 216.77,
      "end": 222.92,
      "seconds": 3.982,
      "removed": [
        {
          "from": 218.885,
          "to": 218.975,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 219.885,
          "to": 220.275,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 220.455,
          "to": 220.735,
          "kind": "extra",
          "heard": "i"
        },
        {
          "from": 220.795,
          "to": 221.17,
          "kind": "extra",
          "heard": "s"
        },
        {
          "from": 221.19,
          "to": 221.495,
          "kind": "extra",
          "heard": "ofmy"
        }
      ]
    },
    {
      "id": "eui-volume-mute",
      "at": 192.91,
      "start": 223.37,
      "end": 228.565,
      "seconds": 4.396,
      "removed": [
        {
          "from": 223.885,
          "to": 224.32,
          "kind": "extra",
          "heard": "dom"
        }
      ]
    },
    {
      "id": "eui-power",
      "at": 197.606,
      "start": 230.135,
      "end": 231.59,
      "seconds": 1.455,
      "removed": []
    },
    {
      "id": "exit-hold",
      "at": 203.25,
      "start": 238.78,
      "end": 245.3,
      "seconds": 6.413,
      "removed": []
    },
    {
      "id": "discovery-devices",
      "at": 211.25,
      "start": 246.675,
      "end": 248.955,
      "seconds": 2.28,
      "removed": []
    },
    {
      "id": "discovery-scan",
      "at": 213.83,
      "start": 249.4,
      "end": 266.78,
      "seconds": 15.016,
      "removed": [
        {
          "from": 252.115,
          "to": 252.4,
          "kind": "extra",
          "heard": "of"
        },
        {
          "from": 255.29,
          "to": 255.705,
          "kind": "extra",
          "heard": "itit"
        },
        {
          "from": 257.81,
          "to": 258.02,
          "kind": "extra",
          "heard": "n"
        },
        {
          "from": 262.665,
          "to": 263.07,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 265.07,
          "to": 265.38,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "matrox-endpoints",
      "at": 231.25,
      "start": 267.42,
      "end": 273.955,
      "seconds": 4.794,
      "removed": [
        {
          "from": 269.26,
          "to": 269.735,
          "kind": "filler",
          "heard": "um..."
        },
        {
          "from": 270.185,
          "to": 270.34,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 271.33,
          "to": 271.695,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 271.765,
          "to": 272.06,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "matrox-ipmx",
      "at": 236.344,
      "start": 274.3,
      "end": 276.515,
      "seconds": 2.215,
      "removed": []
    },
    {
      "id": "matrox-add-these",
      "at": 238.859,
      "start": 281.865,
      "end": 286.66,
      "seconds": 3.543,
      "removed": []
    },
    {
      "id": "matrox-one-click",
      "at": 242.702,
      "start": 287.23,
      "end": 303.965,
      "seconds": 15.123,
      "removed": [
        {
          "from": 292.14,
          "to": 292.445,
          "kind": "extra",
          "heard": "bor"
        },
        {
          "from": 296.86,
          "to": 297.14,
          "kind": "extra",
          "heard": "an"
        },
        {
          "from": 301.435,
          "to": 301.68,
          "kind": "repeat",
          "heard": "ant"
        },
        {
          "from": 302.12,
          "to": 302.335,
          "kind": "extra",
          "heard": "jom"
        }
      ]
    },
    {
      "id": "matrox-test-individual",
      "at": 261.75,
      "start": 329.085,
      "end": 331.07,
      "seconds": 1.985,
      "removed": []
    },
    {
      "id": "matrox-test-switch",
      "at": 264.035,
      "start": 333.745,
      "end": 337.725,
      "seconds": 3.98,
      "removed": []
    },
    {
      "id": "matrox-switch-back",
      "at": 269.75,
      "start": 340.185,
      "end": 342.055,
      "seconds": 1.87,
      "removed": []
    },
    {
      "id": "matrox-switch-change",
      "at": 271.92,
      "start": 342.495,
      "end": 349.72,
      "seconds": 5.561,
      "removed": [
        {
          "from": 344.785,
          "to": 345.645,
          "kind": "extra",
          "heard": "ahthis"
        }
      ]
    },
    {
      "id": "matrox-switch-convertip",
      "at": 277.781,
      "start": 350.435,
      "end": 357.885,
      "seconds": 7.021,
      "removed": [
        {
          "from": 353.71,
          "to": 353.855,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 354.72,
          "to": 354.98,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "matrox-switch-audio",
      "at": 285.102,
      "start": 358.955,
      "end": 364.19,
      "seconds": 4.856,
      "removed": [
        {
          "from": 362.59,
          "to": 362.845,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "m2m-different",
      "at": 293.25,
      "start": 365.08,
      "end": 368.63,
      "seconds": 3.55,
      "removed": []
    },
    {
      "id": "m2m-press-click",
      "at": 297.1,
      "start": 369.19,
      "end": 373.685,
      "seconds": 4.158,
      "removed": []
    },
    {
      "id": "m2m-drag-drop",
      "at": 301.558,
      "start": 374.395,
      "end": 379.23,
      "seconds": 4.643,
      "removed": []
    },
    {
      "id": "m2m-send-all",
      "at": 306.501,
      "start": 379.76,
      "end": 382.435,
      "seconds": 2.418,
      "removed": [
        {
          "from": 381.24,
          "to": 381.485,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "m2m-anytime",
      "at": 309.219,
      "start": 382.67,
      "end": 389.475,
      "seconds": 5.807,
      "removed": [
        {
          "from": 384,
          "to": 384.295,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 385.38,
          "to": 385.56,
          "kind": "extra",
          "heard": "ans"
        }
      ]
    },
    {
      "id": "settings-start-over",
      "at": 317.75,
      "start": 399.535,
      "end": 403.16,
      "seconds": 3.625,
      "removed": []
    },
    {
      "id": "settings-manual",
      "at": 321.675,
      "start": 404.93,
      "end": 407.615,
      "seconds": 2.685,
      "removed": []
    },
    {
      "id": "settings-quick-start",
      "at": 324.66,
      "start": 408.835,
      "end": 414.38,
      "seconds": 4.959,
      "removed": [
        {
          "from": 409.475,
          "to": 409.575,
          "kind": "extra",
          "heard": "te"
        },
        {
          "from": 410.56,
          "to": 410.775,
          "kind": "extra",
          "heard": "tok"
        },
        {
          "from": 412.23,
          "to": 412.465,
          "kind": "extra",
          "heard": "an"
        }
      ]
    },
    {
      "id": "settings-reset",
      "at": 329.919,
      "start": 414.63,
      "end": 420.99,
      "seconds": 5.377,
      "removed": [
        {
          "from": 417.165,
          "to": 417.535,
          "kind": "extra",
          "heard": "ap"
        },
        {
          "from": 418.14,
          "to": 418.42,
          "kind": "repeat",
          "heard": "the"
        },
        {
          "from": 419.785,
          "to": 420.01,
          "kind": "extra",
          "heard": "i"
        }
      ]
    },
    {
      "id": "close-thanks",
      "at": 338.75,
      "start": 422.99,
      "end": 424.055,
      "seconds": 1.065,
      "removed": []
    }
  ],
  "words": [
    {
      "text": " Welcome",
      "startMs": 365,
      "endMs": 745,
      "timestampMs": 555,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 745,
      "endMs": 865,
      "timestampMs": 805,
      "confidence": null
    },
    {
      "text": " CTRLbot.",
      "startMs": 865,
      "endMs": 1565,
      "timestampMs": 1215,
      "confidence": null
    },
    {
      "text": " This",
      "startMs": 2243,
      "endMs": 2383,
      "timestampMs": 2313,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 2383,
      "endMs": 2563,
      "timestampMs": 2473,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 2563,
      "endMs": 2613,
      "timestampMs": 2588,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 2603,
      "endMs": 2723,
      "timestampMs": 2663,
      "confidence": null
    },
    {
      "text": " walkthrough",
      "startMs": 2723,
      "endMs": 3423,
      "timestampMs": 3073,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 3423,
      "endMs": 3563,
      "timestampMs": 3493,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 3563,
      "endMs": 3663,
      "timestampMs": 3613,
      "confidence": null
    },
    {
      "text": " CTRLbot",
      "startMs": 3663,
      "endMs": 4383,
      "timestampMs": 4023,
      "confidence": null
    },
    {
      "text": " IoT",
      "startMs": 4383,
      "endMs": 4963,
      "timestampMs": 4673,
      "confidence": null
    },
    {
      "text": " app",
      "startMs": 4963,
      "endMs": 5218,
      "timestampMs": 5091,
      "confidence": null
    },
    {
      "text": " that's",
      "startMs": 5411,
      "endMs": 5631,
      "timestampMs": 5521,
      "confidence": null
    },
    {
      "text": " available",
      "startMs": 5631,
      "endMs": 6111,
      "timestampMs": 5871,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 6111,
      "endMs": 6391,
      "timestampMs": 6251,
      "confidence": null
    },
    {
      "text": " Android,",
      "startMs": 6391,
      "endMs": 7051,
      "timestampMs": 6721,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 7149,
      "endMs": 7429,
      "timestampMs": 7289,
      "confidence": null
    },
    {
      "text": " phone,",
      "startMs": 7429,
      "endMs": 7829,
      "timestampMs": 7629,
      "confidence": null
    },
    {
      "text": " tablet,",
      "startMs": 7929,
      "endMs": 8409,
      "timestampMs": 8169,
      "confidence": null
    },
    {
      "text": " When",
      "startMs": 11255,
      "endMs": 11415,
      "timestampMs": 11335,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 11415,
      "endMs": 11465,
      "timestampMs": 11440,
      "confidence": null
    },
    {
      "text": " first",
      "startMs": 11415,
      "endMs": 11655,
      "timestampMs": 11535,
      "confidence": null
    },
    {
      "text": " open",
      "startMs": 11655,
      "endMs": 11875,
      "timestampMs": 11765,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 11875,
      "endMs": 11975,
      "timestampMs": 11925,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 11975,
      "endMs": 12175,
      "timestampMs": 12075,
      "confidence": null
    },
    {
      "text": " app,",
      "startMs": 12175,
      "endMs": 12335,
      "timestampMs": 12255,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 12335,
      "endMs": 12615,
      "timestampMs": 12475,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 12615,
      "endMs": 12775,
      "timestampMs": 12695,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 12775,
      "endMs": 12825,
      "timestampMs": 12800,
      "confidence": null
    },
    {
      "text": " nice",
      "startMs": 12775,
      "endMs": 13015,
      "timestampMs": 12895,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 13015,
      "endMs": 13175,
      "timestampMs": 13095,
      "confidence": null
    },
    {
      "text": " walkthrough.",
      "startMs": 13175,
      "endMs": 13955,
      "timestampMs": 13565,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 13955,
      "endMs": 14635,
      "timestampMs": 14295,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 15075,
      "endMs": 15320,
      "timestampMs": 15198,
      "confidence": null
    },
    {
      "text": " close",
      "startMs": 15355,
      "endMs": 15695,
      "timestampMs": 15525,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 15695,
      "endMs": 15895,
      "timestampMs": 15795,
      "confidence": null
    },
    {
      "text": " out",
      "startMs": 15895,
      "endMs": 16155,
      "timestampMs": 16025,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 16155,
      "endMs": 16315,
      "timestampMs": 16235,
      "confidence": null
    },
    {
      "text": " review",
      "startMs": 16315,
      "endMs": 16735,
      "timestampMs": 16525,
      "confidence": null
    },
    {
      "text": " it.",
      "startMs": 16735,
      "endMs": 16900,
      "timestampMs": 16818,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 17275,
      "endMs": 17495,
      "timestampMs": 17385,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 17495,
      "endMs": 17655,
      "timestampMs": 17575,
      "confidence": null
    },
    {
      "text": " ever",
      "startMs": 17655,
      "endMs": 17955,
      "timestampMs": 17805,
      "confidence": null
    },
    {
      "text": " want",
      "startMs": 17955,
      "endMs": 18095,
      "timestampMs": 18025,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 18095,
      "endMs": 18315,
      "timestampMs": 18205,
      "confidence": null
    },
    {
      "text": " get",
      "startMs": 18418,
      "endMs": 18598,
      "timestampMs": 18508,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 18598,
      "endMs": 18838,
      "timestampMs": 18718,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 18838,
      "endMs": 19018,
      "timestampMs": 18928,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 19018,
      "endMs": 19258,
      "timestampMs": 19138,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 19258,
      "endMs": 19308,
      "timestampMs": 19283,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 19258,
      "endMs": 19378,
      "timestampMs": 19318,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 19378,
      "endMs": 19683,
      "timestampMs": 19531,
      "confidence": null
    },
    {
      "text": " into",
      "startMs": 19778,
      "endMs": 20058,
      "timestampMs": 19918,
      "confidence": null
    },
    {
      "text": " settings",
      "startMs": 20058,
      "endMs": 20578,
      "timestampMs": 20318,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 20578,
      "endMs": 21083,
      "timestampMs": 20831,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 21398,
      "endMs": 21598,
      "timestampMs": 21498,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 21611,
      "endMs": 21836,
      "timestampMs": 21724,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 21836,
      "endMs": 21936,
      "timestampMs": 21886,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 21936,
      "endMs": 22016,
      "timestampMs": 21976,
      "confidence": null
    },
    {
      "text": " quick",
      "startMs": 22016,
      "endMs": 22276,
      "timestampMs": 22146,
      "confidence": null
    },
    {
      "text": " start.",
      "startMs": 22276,
      "endMs": 22576,
      "timestampMs": 22426,
      "confidence": null
    },
    {
      "text": " The",
      "startMs": 24765,
      "endMs": 24865,
      "timestampMs": 24815,
      "confidence": null
    },
    {
      "text": " first",
      "startMs": 24865,
      "endMs": 25025,
      "timestampMs": 24945,
      "confidence": null
    },
    {
      "text": " thing",
      "startMs": 25025,
      "endMs": 25145,
      "timestampMs": 25085,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 25145,
      "endMs": 25365,
      "timestampMs": 25255,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 25365,
      "endMs": 26390,
      "timestampMs": 25878,
      "confidence": null
    },
    {
      "text": " when",
      "startMs": 26405,
      "endMs": 26525,
      "timestampMs": 26465,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 26525,
      "endMs": 26705,
      "timestampMs": 26615,
      "confidence": null
    },
    {
      "text": " open",
      "startMs": 26705,
      "endMs": 26885,
      "timestampMs": 26795,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 26885,
      "endMs": 27005,
      "timestampMs": 26945,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 27005,
      "endMs": 27205,
      "timestampMs": 27105,
      "confidence": null
    },
    {
      "text": " app",
      "startMs": 27205,
      "endMs": 27425,
      "timestampMs": 27315,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 27605,
      "endMs": 27845,
      "timestampMs": 27725,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 27845,
      "endMs": 28155,
      "timestampMs": 28000,
      "confidence": null
    },
    {
      "text": " CTRLbot.ai.",
      "startMs": 28205,
      "endMs": 29848,
      "timestampMs": 29027,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 30268,
      "endMs": 30408,
      "timestampMs": 30338,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 30408,
      "endMs": 30668,
      "timestampMs": 30538,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 30668,
      "endMs": 31298,
      "timestampMs": 30983,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 31368,
      "endMs": 31648,
      "timestampMs": 31508,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 31648,
      "endMs": 31808,
      "timestampMs": 31728,
      "confidence": null
    },
    {
      "text": " help",
      "startMs": 31808,
      "endMs": 32048,
      "timestampMs": 31928,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 32048,
      "endMs": 32473,
      "timestampMs": 32261,
      "confidence": null
    },
    {
      "text": " figure",
      "startMs": 32628,
      "endMs": 32928,
      "timestampMs": 32778,
      "confidence": null
    },
    {
      "text": " out",
      "startMs": 32928,
      "endMs": 33173,
      "timestampMs": 33051,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 33173,
      "endMs": 33428,
      "timestampMs": 33301,
      "confidence": null
    },
    {
      "text": " troubleshoot",
      "startMs": 33428,
      "endMs": 33928,
      "timestampMs": 33678,
      "confidence": null
    },
    {
      "text": " things",
      "startMs": 33928,
      "endMs": 34493,
      "timestampMs": 34210,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 34528,
      "endMs": 34668,
      "timestampMs": 34598,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 34668,
      "endMs": 35228,
      "timestampMs": 34948,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 35228,
      "endMs": 35616,
      "timestampMs": 35422,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 35616,
      "endMs": 35696,
      "timestampMs": 35656,
      "confidence": null
    },
    {
      "text": " living",
      "startMs": 35696,
      "endMs": 36291,
      "timestampMs": 35994,
      "confidence": null
    },
    {
      "text": " manual.",
      "startMs": 36719,
      "endMs": 37319,
      "timestampMs": 37019,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 37714,
      "endMs": 37974,
      "timestampMs": 37844,
      "confidence": null
    },
    {
      "text": " anything,",
      "startMs": 37974,
      "endMs": 38594,
      "timestampMs": 38284,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 38614,
      "endMs": 38794,
      "timestampMs": 38704,
      "confidence": null
    },
    {
      "text": " questions",
      "startMs": 38794,
      "endMs": 39134,
      "timestampMs": 38964,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 39134,
      "endMs": 39294,
      "timestampMs": 39214,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 39294,
      "endMs": 39572,
      "timestampMs": 39433,
      "confidence": null
    },
    {
      "text": " about",
      "startMs": 39627,
      "endMs": 39847,
      "timestampMs": 39737,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 39847,
      "endMs": 39967,
      "timestampMs": 39907,
      "confidence": null
    },
    {
      "text": " application",
      "startMs": 39967,
      "endMs": 40797,
      "timestampMs": 40382,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 40867,
      "endMs": 40987,
      "timestampMs": 40927,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 40987,
      "endMs": 41147,
      "timestampMs": 41067,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 41147,
      "endMs": 41227,
      "timestampMs": 41187,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 41227,
      "endMs": 41407,
      "timestampMs": 41317,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 41407,
      "endMs": 41547,
      "timestampMs": 41477,
      "confidence": null
    },
    {
      "text": " up,",
      "startMs": 41547,
      "endMs": 41597,
      "timestampMs": 41572,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 41547,
      "endMs": 41607,
      "timestampMs": 41577,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 41607,
      "endMs": 41767,
      "timestampMs": 41687,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 42235,
      "endMs": 42475,
      "timestampMs": 42355,
      "confidence": null
    },
    {
      "text": " put",
      "startMs": 42655,
      "endMs": 42815,
      "timestampMs": 42735,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 42815,
      "endMs": 42955,
      "timestampMs": 42885,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 42955,
      "endMs": 43170,
      "timestampMs": 43062,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 43170,
      "endMs": 43450,
      "timestampMs": 43310,
      "confidence": null
    },
    {
      "text": " It",
      "startMs": 46830,
      "endMs": 46930,
      "timestampMs": 46880,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 46930,
      "endMs": 47130,
      "timestampMs": 47030,
      "confidence": null
    },
    {
      "text": " begins",
      "startMs": 47130,
      "endMs": 47490,
      "timestampMs": 47310,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 47490,
      "endMs": 47690,
      "timestampMs": 47590,
      "confidence": null
    },
    {
      "text": " adding",
      "startMs": 47690,
      "endMs": 47950,
      "timestampMs": 47820,
      "confidence": null
    },
    {
      "text": " devices,",
      "startMs": 47950,
      "endMs": 48715,
      "timestampMs": 48332,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 48970,
      "endMs": 49220,
      "timestampMs": 49095,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 49480,
      "endMs": 49580,
      "timestampMs": 49530,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 49580,
      "endMs": 49680,
      "timestampMs": 49630,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 49680,
      "endMs": 49820,
      "timestampMs": 49750,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 49820,
      "endMs": 49920,
      "timestampMs": 49870,
      "confidence": null
    },
    {
      "text": " extensive",
      "startMs": 49920,
      "endMs": 50615,
      "timestampMs": 50268,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 50633,
      "endMs": 51108,
      "timestampMs": 50870,
      "confidence": null
    },
    {
      "text": " driver",
      "startMs": 51108,
      "endMs": 51468,
      "timestampMs": 51288,
      "confidence": null
    },
    {
      "text": " library",
      "startMs": 51468,
      "endMs": 52153,
      "timestampMs": 51811,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 52528,
      "endMs": 52758,
      "timestampMs": 52643,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 52808,
      "endMs": 53433,
      "timestampMs": 53120,
      "confidence": null
    },
    {
      "text": " RS-232",
      "startMs": 53548,
      "endMs": 54613,
      "timestampMs": 54081,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 54648,
      "endMs": 55068,
      "timestampMs": 54858,
      "confidence": null
    },
    {
      "text": " IR",
      "startMs": 55068,
      "endMs": 55248,
      "timestampMs": 55158,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 55248,
      "endMs": 55428,
      "timestampMs": 55338,
      "confidence": null
    },
    {
      "text": " well.",
      "startMs": 55428,
      "endMs": 55763,
      "timestampMs": 55595,
      "confidence": null
    },
    {
      "text": " In",
      "startMs": 56113,
      "endMs": 56173,
      "timestampMs": 56143,
      "confidence": null
    },
    {
      "text": " order",
      "startMs": 56173,
      "endMs": 56353,
      "timestampMs": 56263,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 56353,
      "endMs": 56653,
      "timestampMs": 56503,
      "confidence": null
    },
    {
      "text": " use",
      "startMs": 56653,
      "endMs": 56913,
      "timestampMs": 56783,
      "confidence": null
    },
    {
      "text": " RS-232",
      "startMs": 56913,
      "endMs": 57993,
      "timestampMs": 57453,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 57993,
      "endMs": 58318,
      "timestampMs": 58156,
      "confidence": null
    },
    {
      "text": " IR,",
      "startMs": 58506,
      "endMs": 58926,
      "timestampMs": 58716,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 58926,
      "endMs": 59266,
      "timestampMs": 59096,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 59446,
      "endMs": 59666,
      "timestampMs": 59556,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 59666,
      "endMs": 59866,
      "timestampMs": 59766,
      "confidence": null
    },
    {
      "text": " use",
      "startMs": 59866,
      "endMs": 60126,
      "timestampMs": 59996,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 60126,
      "endMs": 60266,
      "timestampMs": 60196,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 60266,
      "endMs": 60386,
      "timestampMs": 60326,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 60386,
      "endMs": 60586,
      "timestampMs": 60486,
      "confidence": null
    },
    {
      "text": " endpoints",
      "startMs": 60586,
      "endMs": 61251,
      "timestampMs": 60919,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 61514,
      "endMs": 61634,
      "timestampMs": 61574,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 61634,
      "endMs": 61774,
      "timestampMs": 61704,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 61774,
      "endMs": 62104,
      "timestampMs": 61939,
      "confidence": null
    },
    {
      "text": " always",
      "startMs": 62154,
      "endMs": 62414,
      "timestampMs": 62284,
      "confidence": null
    },
    {
      "text": " sort",
      "startMs": 62414,
      "endMs": 62654,
      "timestampMs": 62534,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 62654,
      "endMs": 62854,
      "timestampMs": 62754,
      "confidence": null
    },
    {
      "text": " things",
      "startMs": 62854,
      "endMs": 63274,
      "timestampMs": 63064,
      "confidence": null
    },
    {
      "text": " out",
      "startMs": 63274,
      "endMs": 63504,
      "timestampMs": 63389,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 63622,
      "endMs": 64027,
      "timestampMs": 63824,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 64280,
      "endMs": 64420,
      "timestampMs": 64350,
      "confidence": null
    },
    {
      "text": " sorting",
      "startMs": 64420,
      "endMs": 64760,
      "timestampMs": 64590,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 64760,
      "endMs": 64990,
      "timestampMs": 64875,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 65260,
      "endMs": 65520,
      "timestampMs": 65390,
      "confidence": null
    },
    {
      "text": " Let's",
      "startMs": 69860,
      "endMs": 70080,
      "timestampMs": 69970,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 70080,
      "endMs": 70300,
      "timestampMs": 70190,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 70300,
      "endMs": 70440,
      "timestampMs": 70370,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 70440,
      "endMs": 70520,
      "timestampMs": 70480,
      "confidence": null
    },
    {
      "text": " projector.",
      "startMs": 70520,
      "endMs": 71210,
      "timestampMs": 70865,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 71560,
      "endMs": 71640,
      "timestampMs": 71600,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 71640,
      "endMs": 71720,
      "timestampMs": 71680,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 71720,
      "endMs": 71880,
      "timestampMs": 71800,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 71880,
      "endMs": 72040,
      "timestampMs": 71960,
      "confidence": null
    },
    {
      "text": " when",
      "startMs": 72040,
      "endMs": 72200,
      "timestampMs": 72120,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 72200,
      "endMs": 72300,
      "timestampMs": 72250,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 72300,
      "endMs": 72760,
      "timestampMs": 72530,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 72760,
      "endMs": 73120,
      "timestampMs": 72940,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 73120,
      "endMs": 73300,
      "timestampMs": 73210,
      "confidence": null
    },
    {
      "text": " actual",
      "startMs": 73300,
      "endMs": 73600,
      "timestampMs": 73450,
      "confidence": null
    },
    {
      "text": " projector,",
      "startMs": 73600,
      "endMs": 74250,
      "timestampMs": 73925,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 74540,
      "endMs": 74640,
      "timestampMs": 74590,
      "confidence": null
    },
    {
      "text": " opens",
      "startMs": 74640,
      "endMs": 74960,
      "timestampMs": 74800,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 74960,
      "endMs": 75100,
      "timestampMs": 75030,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 75100,
      "endMs": 75300,
      "timestampMs": 75200,
      "confidence": null
    },
    {
      "text": " nice",
      "startMs": 75300,
      "endMs": 75540,
      "timestampMs": 75420,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 75540,
      "endMs": 75780,
      "timestampMs": 75660,
      "confidence": null
    },
    {
      "text": " page",
      "startMs": 75780,
      "endMs": 76160,
      "timestampMs": 75970,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 76160,
      "endMs": 76260,
      "timestampMs": 76210,
      "confidence": null
    },
    {
      "text": " gives",
      "startMs": 76260,
      "endMs": 76400,
      "timestampMs": 76330,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 76400,
      "endMs": 76560,
      "timestampMs": 76480,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 76560,
      "endMs": 76720,
      "timestampMs": 76640,
      "confidence": null
    },
    {
      "text": " kinds",
      "startMs": 76720,
      "endMs": 76980,
      "timestampMs": 76850,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 76980,
      "endMs": 77120,
      "timestampMs": 77050,
      "confidence": null
    },
    {
      "text": " great",
      "startMs": 77120,
      "endMs": 77380,
      "timestampMs": 77250,
      "confidence": null
    },
    {
      "text": " information.",
      "startMs": 77380,
      "endMs": 78020,
      "timestampMs": 77700,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 78575,
      "endMs": 78735,
      "timestampMs": 78655,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 78735,
      "endMs": 78815,
      "timestampMs": 78775,
      "confidence": null
    },
    {
      "text": " want,",
      "startMs": 78815,
      "endMs": 79095,
      "timestampMs": 78955,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 79095,
      "endMs": 79175,
      "timestampMs": 79135,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 79175,
      "endMs": 79355,
      "timestampMs": 79265,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 79355,
      "endMs": 79495,
      "timestampMs": 79425,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 79495,
      "endMs": 79735,
      "timestampMs": 79615,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 79735,
      "endMs": 79785,
      "timestampMs": 79760,
      "confidence": null
    },
    {
      "text": " manufacturer",
      "startMs": 79735,
      "endMs": 80530,
      "timestampMs": 80133,
      "confidence": null
    },
    {
      "text": " webpage",
      "startMs": 80648,
      "endMs": 81228,
      "timestampMs": 80938,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 81228,
      "endMs": 81791,
      "timestampMs": 81510,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 81791,
      "endMs": 82171,
      "timestampMs": 81981,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 82579,
      "endMs": 82759,
      "timestampMs": 82669,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 82759,
      "endMs": 82899,
      "timestampMs": 82829,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 82899,
      "endMs": 83039,
      "timestampMs": 82969,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 83039,
      "endMs": 83299,
      "timestampMs": 83169,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 83299,
      "endMs": 83349,
      "timestampMs": 83324,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 83339,
      "endMs": 83439,
      "timestampMs": 83389,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 83439,
      "endMs": 83539,
      "timestampMs": 83489,
      "confidence": null
    },
    {
      "text": " product",
      "startMs": 83539,
      "endMs": 84019,
      "timestampMs": 83779,
      "confidence": null
    },
    {
      "text": " page",
      "startMs": 84019,
      "endMs": 84404,
      "timestampMs": 84212,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 84879,
      "endMs": 85019,
      "timestampMs": 84949,
      "confidence": null
    },
    {
      "text": " well.",
      "startMs": 85019,
      "endMs": 85424,
      "timestampMs": 85222,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 86084,
      "endMs": 86204,
      "timestampMs": 86144,
      "confidence": null
    },
    {
      "text": " down",
      "startMs": 86204,
      "endMs": 86424,
      "timestampMs": 86314,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 86424,
      "endMs": 86624,
      "timestampMs": 86524,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 86624,
      "endMs": 86764,
      "timestampMs": 86694,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 86764,
      "endMs": 86964,
      "timestampMs": 86864,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 86964,
      "endMs": 87404,
      "timestampMs": 87184,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 87672,
      "endMs": 87852,
      "timestampMs": 87762,
      "confidence": null
    },
    {
      "text": " kinds",
      "startMs": 87852,
      "endMs": 88092,
      "timestampMs": 87972,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 88092,
      "endMs": 88422,
      "timestampMs": 88257,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 88512,
      "endMs": 88692,
      "timestampMs": 88602,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 88692,
      "endMs": 88812,
      "timestampMs": 88752,
      "confidence": null
    },
    {
      "text": " information",
      "startMs": 88812,
      "endMs": 89332,
      "timestampMs": 89072,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 89332,
      "endMs": 89512,
      "timestampMs": 89422,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 89512,
      "endMs": 89652,
      "timestampMs": 89582,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 89652,
      "endMs": 89972,
      "timestampMs": 89812,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 90245,
      "endMs": 90385,
      "timestampMs": 90315,
      "confidence": null
    },
    {
      "text": " make",
      "startMs": 90385,
      "endMs": 90585,
      "timestampMs": 90485,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 90585,
      "endMs": 90685,
      "timestampMs": 90635,
      "confidence": null
    },
    {
      "text": " connection.",
      "startMs": 90685,
      "endMs": 91205,
      "timestampMs": 90945,
      "confidence": null
    },
    {
      "text": " Just",
      "startMs": 93330,
      "endMs": 93645,
      "timestampMs": 93488,
      "confidence": null
    },
    {
      "text": " hitting",
      "startMs": 93750,
      "endMs": 94110,
      "timestampMs": 93930,
      "confidence": null
    },
    {
      "text": " plus",
      "startMs": 94110,
      "endMs": 94620,
      "timestampMs": 94365,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 94870,
      "endMs": 94950,
      "timestampMs": 94910,
      "confidence": null
    },
    {
      "text": " take",
      "startMs": 94950,
      "endMs": 95130,
      "timestampMs": 95040,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 95130,
      "endMs": 95270,
      "timestampMs": 95200,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 95270,
      "endMs": 95390,
      "timestampMs": 95330,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 95390,
      "endMs": 95590,
      "timestampMs": 95490,
      "confidence": null
    },
    {
      "text": " page.",
      "startMs": 95590,
      "endMs": 96055,
      "timestampMs": 95822,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 96610,
      "endMs": 96690,
      "timestampMs": 96650,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 96690,
      "endMs": 96910,
      "timestampMs": 96800,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 96910,
      "endMs": 97010,
      "timestampMs": 96960,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 97010,
      "endMs": 97150,
      "timestampMs": 97080,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 97150,
      "endMs": 97350,
      "timestampMs": 97250,
      "confidence": null
    },
    {
      "text": " put",
      "startMs": 97350,
      "endMs": 97650,
      "timestampMs": 97500,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 97650,
      "endMs": 98035,
      "timestampMs": 97843,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 98083,
      "endMs": 98193,
      "timestampMs": 98138,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 98193,
      "endMs": 98393,
      "timestampMs": 98293,
      "confidence": null
    },
    {
      "text": " address",
      "startMs": 98393,
      "endMs": 99053,
      "timestampMs": 98723,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 99053,
      "endMs": 99371,
      "timestampMs": 99212,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 99371,
      "endMs": 99531,
      "timestampMs": 99451,
      "confidence": null
    },
    {
      "text": " projector.",
      "startMs": 99531,
      "endMs": 100111,
      "timestampMs": 99821,
      "confidence": null
    },
    {
      "text": " Pressing",
      "startMs": 100461,
      "endMs": 100941,
      "timestampMs": 100701,
      "confidence": null
    },
    {
      "text": " connect,",
      "startMs": 100941,
      "endMs": 101541,
      "timestampMs": 101241,
      "confidence": null
    },
    {
      "text": " once",
      "startMs": 101681,
      "endMs": 101821,
      "timestampMs": 101751,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 101821,
      "endMs": 101961,
      "timestampMs": 101891,
      "confidence": null
    },
    {
      "text": " connection",
      "startMs": 101961,
      "endMs": 102421,
      "timestampMs": 102191,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 102421,
      "endMs": 102581,
      "timestampMs": 102501,
      "confidence": null
    },
    {
      "text": " made,",
      "startMs": 102581,
      "endMs": 103061,
      "timestampMs": 102821,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 103061,
      "endMs": 103141,
      "timestampMs": 103101,
      "confidence": null
    },
    {
      "text": " automatically",
      "startMs": 103141,
      "endMs": 103841,
      "timestampMs": 103491,
      "confidence": null
    },
    {
      "text": " saves",
      "startMs": 103841,
      "endMs": 104321,
      "timestampMs": 104081,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 104321,
      "endMs": 104461,
      "timestampMs": 104391,
      "confidence": null
    },
    {
      "text": " connection.",
      "startMs": 104461,
      "endMs": 105001,
      "timestampMs": 104731,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 105321,
      "endMs": 105481,
      "timestampMs": 105401,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 105481,
      "endMs": 105661,
      "timestampMs": 105571,
      "confidence": null
    },
    {
      "text": " don't",
      "startMs": 105661,
      "endMs": 105876,
      "timestampMs": 105769,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 106101,
      "endMs": 106221,
      "timestampMs": 106161,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 106221,
      "endMs": 106501,
      "timestampMs": 106361,
      "confidence": null
    },
    {
      "text": " actually",
      "startMs": 106501,
      "endMs": 106821,
      "timestampMs": 106661,
      "confidence": null
    },
    {
      "text": " hit",
      "startMs": 106821,
      "endMs": 107021,
      "timestampMs": 106921,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 107021,
      "endMs": 107101,
      "timestampMs": 107061,
      "confidence": null
    },
    {
      "text": " save",
      "startMs": 107101,
      "endMs": 107361,
      "timestampMs": 107231,
      "confidence": null
    },
    {
      "text": " button.",
      "startMs": 107361,
      "endMs": 107856,
      "timestampMs": 107608,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 109270,
      "endMs": 109370,
      "timestampMs": 109320,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 109370,
      "endMs": 109450,
      "timestampMs": 109410,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 109450,
      "endMs": 109590,
      "timestampMs": 109520,
      "confidence": null
    },
    {
      "text": " want,",
      "startMs": 109590,
      "endMs": 109770,
      "timestampMs": 109680,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 109770,
      "endMs": 109890,
      "timestampMs": 109830,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 109890,
      "endMs": 110275,
      "timestampMs": 110082,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 110818,
      "endMs": 111238,
      "timestampMs": 111028,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 111598,
      "endMs": 111778,
      "timestampMs": 111688,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 111778,
      "endMs": 111858,
      "timestampMs": 111818,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 111858,
      "endMs": 112098,
      "timestampMs": 111978,
      "confidence": null
    },
    {
      "text": " commands",
      "startMs": 112098,
      "endMs": 112638,
      "timestampMs": 112368,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 112638,
      "endMs": 112973,
      "timestampMs": 112805,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 112973,
      "endMs": 113093,
      "timestampMs": 113033,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 114800,
      "endMs": 114880,
      "timestampMs": 114840,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 114880,
      "endMs": 115020,
      "timestampMs": 114950,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 115020,
      "endMs": 115220,
      "timestampMs": 115120,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 115220,
      "endMs": 115360,
      "timestampMs": 115290,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 115360,
      "endMs": 115620,
      "timestampMs": 115490,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 115620,
      "endMs": 115740,
      "timestampMs": 115680,
      "confidence": null
    },
    {
      "text": " actual",
      "startMs": 115740,
      "endMs": 116040,
      "timestampMs": 115890,
      "confidence": null
    },
    {
      "text": " device,",
      "startMs": 116040,
      "endMs": 116715,
      "timestampMs": 116378,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 116840,
      "endMs": 116920,
      "timestampMs": 116880,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 116920,
      "endMs": 117080,
      "timestampMs": 117000,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 117080,
      "endMs": 117160,
      "timestampMs": 117120,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 117160,
      "endMs": 117420,
      "timestampMs": 117290,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 117420,
      "endMs": 118005,
      "timestampMs": 117713,
      "confidence": null
    },
    {
      "text": " testing",
      "startMs": 118038,
      "endMs": 118478,
      "timestampMs": 118258,
      "confidence": null
    },
    {
      "text": " page.",
      "startMs": 118478,
      "endMs": 118758,
      "timestampMs": 118618,
      "confidence": null
    },
    {
      "text": " There's",
      "startMs": 118758,
      "endMs": 118918,
      "timestampMs": 118838,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 119168,
      "endMs": 119348,
      "timestampMs": 119258,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 119348,
      "endMs": 119428,
      "timestampMs": 119388,
      "confidence": null
    },
    {
      "text": " tech",
      "startMs": 119428,
      "endMs": 119668,
      "timestampMs": 119548,
      "confidence": null
    },
    {
      "text": " page,",
      "startMs": 119668,
      "endMs": 120048,
      "timestampMs": 119858,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 120228,
      "endMs": 120408,
      "timestampMs": 120318,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 120408,
      "endMs": 120588,
      "timestampMs": 120498,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 120588,
      "endMs": 120748,
      "timestampMs": 120668,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 120748,
      "endMs": 120828,
      "timestampMs": 120788,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 120828,
      "endMs": 121288,
      "timestampMs": 121058,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 121288,
      "endMs": 121508,
      "timestampMs": 121398,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 121508,
      "endMs": 121948,
      "timestampMs": 121728,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 121948,
      "endMs": 122258,
      "timestampMs": 122103,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 122463,
      "endMs": 122513,
      "timestampMs": 122488,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 122508,
      "endMs": 122668,
      "timestampMs": 122588,
      "confidence": null
    },
    {
      "text": " system",
      "startMs": 122668,
      "endMs": 123008,
      "timestampMs": 122838,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 123008,
      "endMs": 123168,
      "timestampMs": 123088,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 123168,
      "endMs": 123268,
      "timestampMs": 123218,
      "confidence": null
    },
    {
      "text": " listed",
      "startMs": 123268,
      "endMs": 123508,
      "timestampMs": 123388,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 123508,
      "endMs": 123728,
      "timestampMs": 123618,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 123728,
      "endMs": 124153,
      "timestampMs": 123941,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 124513,
      "endMs": 124593,
      "timestampMs": 124553,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 124593,
      "endMs": 124713,
      "timestampMs": 124653,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 124713,
      "endMs": 124813,
      "timestampMs": 124763,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 124813,
      "endMs": 124973,
      "timestampMs": 124893,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 124973,
      "endMs": 125153,
      "timestampMs": 125063,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 125153,
      "endMs": 125903,
      "timestampMs": 125528,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 125973,
      "endMs": 126268,
      "timestampMs": 126121,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 126286,
      "endMs": 126556,
      "timestampMs": 126421,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 126556,
      "endMs": 126776,
      "timestampMs": 126666,
      "confidence": null
    },
    {
      "text": " out.",
      "startMs": 126776,
      "endMs": 127021,
      "timestampMs": 126898,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 127401,
      "endMs": 127521,
      "timestampMs": 127461,
      "confidence": null
    },
    {
      "text": " here's",
      "startMs": 127521,
      "endMs": 127789,
      "timestampMs": 127655,
      "confidence": null
    },
    {
      "text": " what",
      "startMs": 127929,
      "endMs": 128109,
      "timestampMs": 128019,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 128109,
      "endMs": 128269,
      "timestampMs": 128189,
      "confidence": null
    },
    {
      "text": " looked",
      "startMs": 128269,
      "endMs": 128489,
      "timestampMs": 128379,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 128489,
      "endMs": 128709,
      "timestampMs": 128599,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 128709,
      "endMs": 128849,
      "timestampMs": 128779,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 128849,
      "endMs": 128909,
      "timestampMs": 128879,
      "confidence": null
    },
    {
      "text": " switcher,",
      "startMs": 128909,
      "endMs": 129329,
      "timestampMs": 129119,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 129329,
      "endMs": 129629,
      "timestampMs": 129479,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 130222,
      "endMs": 130302,
      "timestampMs": 130262,
      "confidence": null
    },
    {
      "text": " here's",
      "startMs": 130302,
      "endMs": 130562,
      "timestampMs": 130432,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 130562,
      "endMs": 130642,
      "timestampMs": 130602,
      "confidence": null
    },
    {
      "text": " terminal,",
      "startMs": 130642,
      "endMs": 131287,
      "timestampMs": 130964,
      "confidence": null
    },
    {
      "text": " always",
      "startMs": 131442,
      "endMs": 131762,
      "timestampMs": 131602,
      "confidence": null
    },
    {
      "text": " available",
      "startMs": 131762,
      "endMs": 132382,
      "timestampMs": 132072,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 132382,
      "endMs": 132582,
      "timestampMs": 132482,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 132582,
      "endMs": 132632,
      "timestampMs": 132607,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 132582,
      "endMs": 132702,
      "timestampMs": 132642,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 132702,
      "endMs": 132822,
      "timestampMs": 132762,
      "confidence": null
    },
    {
      "text": " always",
      "startMs": 132822,
      "endMs": 133042,
      "timestampMs": 132932,
      "confidence": null
    },
    {
      "text": " communicate",
      "startMs": 133042,
      "endMs": 133562,
      "timestampMs": 133302,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 133562,
      "endMs": 133682,
      "timestampMs": 133622,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 133682,
      "endMs": 133782,
      "timestampMs": 133732,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 133782,
      "endMs": 134362,
      "timestampMs": 134072,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 134702,
      "endMs": 134897,
      "timestampMs": 134800,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 134890,
      "endMs": 135190,
      "timestampMs": 135040,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 135190,
      "endMs": 135350,
      "timestampMs": 135270,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 135350,
      "endMs": 135450,
      "timestampMs": 135400,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 135450,
      "endMs": 135670,
      "timestampMs": 135560,
      "confidence": null
    },
    {
      "text": " commands.",
      "startMs": 135670,
      "endMs": 136190,
      "timestampMs": 135930,
      "confidence": null
    },
    {
      "text": " Also,",
      "startMs": 136655,
      "endMs": 137035,
      "timestampMs": 136845,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 137035,
      "endMs": 137135,
      "timestampMs": 137085,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 137135,
      "endMs": 137215,
      "timestampMs": 137175,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 137215,
      "endMs": 137535,
      "timestampMs": 137375,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 137535,
      "endMs": 137775,
      "timestampMs": 137655,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 137775,
      "endMs": 137825,
      "timestampMs": 137800,
      "confidence": null
    },
    {
      "text": " webpage,",
      "startMs": 137775,
      "endMs": 138415,
      "timestampMs": 138095,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 138415,
      "endMs": 138635,
      "timestampMs": 138525,
      "confidence": null
    },
    {
      "text": " take",
      "startMs": 138635,
      "endMs": 138795,
      "timestampMs": 138715,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 138795,
      "endMs": 138975,
      "timestampMs": 138885,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 138975,
      "endMs": 139115,
      "timestampMs": 139045,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 139115,
      "endMs": 139315,
      "timestampMs": 139215,
      "confidence": null
    },
    {
      "text": " webpage",
      "startMs": 139315,
      "endMs": 139995,
      "timestampMs": 139655,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 139995,
      "endMs": 140195,
      "timestampMs": 140095,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 140195,
      "endMs": 140515,
      "timestampMs": 140355,
      "confidence": null
    },
    {
      "text": " The",
      "startMs": 142750,
      "endMs": 142860,
      "timestampMs": 142805,
      "confidence": null
    },
    {
      "text": " next",
      "startMs": 142860,
      "endMs": 143040,
      "timestampMs": 142950,
      "confidence": null
    },
    {
      "text": " step",
      "startMs": 143040,
      "endMs": 143340,
      "timestampMs": 143190,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 143340,
      "endMs": 143500,
      "timestampMs": 143420,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 143500,
      "endMs": 143740,
      "timestampMs": 143620,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 143740,
      "endMs": 143820,
      "timestampMs": 143780,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 143820,
      "endMs": 144020,
      "timestampMs": 143920,
      "confidence": null
    },
    {
      "text": " setting",
      "startMs": 144020,
      "endMs": 144360,
      "timestampMs": 144190,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 144360,
      "endMs": 144620,
      "timestampMs": 144490,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 144620,
      "endMs": 144760,
      "timestampMs": 144690,
      "confidence": null
    },
    {
      "text": " activities.",
      "startMs": 144760,
      "endMs": 145525,
      "timestampMs": 145142,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 145940,
      "endMs": 146220,
      "timestampMs": 146080,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 146220,
      "endMs": 146620,
      "timestampMs": 146420,
      "confidence": null
    },
    {
      "text": " activities",
      "startMs": 146700,
      "endMs": 147330,
      "timestampMs": 147015,
      "confidence": null
    },
    {
      "text": " form",
      "startMs": 147538,
      "endMs": 147858,
      "timestampMs": 147698,
      "confidence": null
    },
    {
      "text": " themselves,",
      "startMs": 147858,
      "endMs": 148658,
      "timestampMs": 148258,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 149016,
      "endMs": 149386,
      "timestampMs": 149201,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 149686,
      "endMs": 149736,
      "timestampMs": 149711,
      "confidence": null
    },
    {
      "text": " there",
      "startMs": 149686,
      "endMs": 149896,
      "timestampMs": 149791,
      "confidence": null
    },
    {
      "text": " isn't",
      "startMs": 149896,
      "endMs": 150216,
      "timestampMs": 150056,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 150216,
      "endMs": 150336,
      "timestampMs": 150276,
      "confidence": null
    },
    {
      "text": " whole",
      "startMs": 150336,
      "endMs": 150656,
      "timestampMs": 150496,
      "confidence": null
    },
    {
      "text": " lot",
      "startMs": 150656,
      "endMs": 151016,
      "timestampMs": 150836,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 151256,
      "endMs": 151496,
      "timestampMs": 151376,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 151496,
      "endMs": 151789,
      "timestampMs": 151642,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 151914,
      "endMs": 152194,
      "timestampMs": 152054,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 152194,
      "endMs": 152354,
      "timestampMs": 152274,
      "confidence": null
    },
    {
      "text": " do,",
      "startMs": 152354,
      "endMs": 152714,
      "timestampMs": 152534,
      "confidence": null
    },
    {
      "text": " but",
      "startMs": 153087,
      "endMs": 153387,
      "timestampMs": 153237,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 153387,
      "endMs": 153567,
      "timestampMs": 153477,
      "confidence": null
    },
    {
      "text": " course",
      "startMs": 153567,
      "endMs": 153847,
      "timestampMs": 153707,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 153847,
      "endMs": 153987,
      "timestampMs": 153917,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 153987,
      "endMs": 154167,
      "timestampMs": 154077,
      "confidence": null
    },
    {
      "text": " customize",
      "startMs": 154167,
      "endMs": 154687,
      "timestampMs": 154427,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 154687,
      "endMs": 155027,
      "timestampMs": 154857,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 155027,
      "endMs": 155207,
      "timestampMs": 155117,
      "confidence": null
    },
    {
      "text": " way",
      "startMs": 155207,
      "endMs": 155387,
      "timestampMs": 155297,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 155387,
      "endMs": 155547,
      "timestampMs": 155467,
      "confidence": null
    },
    {
      "text": " want.",
      "startMs": 155547,
      "endMs": 155867,
      "timestampMs": 155707,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 156292,
      "endMs": 156412,
      "timestampMs": 156352,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 156412,
      "endMs": 156532,
      "timestampMs": 156472,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 156532,
      "endMs": 156712,
      "timestampMs": 156622,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 156712,
      "endMs": 156997,
      "timestampMs": 156855,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 157112,
      "endMs": 157272,
      "timestampMs": 157192,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 157272,
      "endMs": 157652,
      "timestampMs": 157462,
      "confidence": null
    },
    {
      "text": " presets,",
      "startMs": 157652,
      "endMs": 158092,
      "timestampMs": 157872,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 158092,
      "endMs": 158172,
      "timestampMs": 158132,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 161750,
      "endMs": 161915,
      "timestampMs": 161833,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 161915,
      "endMs": 162035,
      "timestampMs": 161975,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 162035,
      "endMs": 162215,
      "timestampMs": 162125,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 162215,
      "endMs": 162815,
      "timestampMs": 162515,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 162995,
      "endMs": 163235,
      "timestampMs": 163115,
      "confidence": null
    },
    {
      "text": " projector",
      "startMs": 163235,
      "endMs": 163735,
      "timestampMs": 163485,
      "confidence": null
    },
    {
      "text": " already",
      "startMs": 163735,
      "endMs": 164015,
      "timestampMs": 163875,
      "confidence": null
    },
    {
      "text": " turned",
      "startMs": 164015,
      "endMs": 164315,
      "timestampMs": 164165,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 164315,
      "endMs": 164365,
      "timestampMs": 164340,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 164355,
      "endMs": 164615,
      "timestampMs": 164485,
      "confidence": null
    },
    {
      "text": " off,",
      "startMs": 164615,
      "endMs": 164880,
      "timestampMs": 164748,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 165280,
      "endMs": 165380,
      "timestampMs": 165330,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 165380,
      "endMs": 165600,
      "timestampMs": 165490,
      "confidence": null
    },
    {
      "text": " assign",
      "startMs": 165600,
      "endMs": 165960,
      "timestampMs": 165780,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 165960,
      "endMs": 166080,
      "timestampMs": 166020,
      "confidence": null
    },
    {
      "text": " switcher,",
      "startMs": 166080,
      "endMs": 166680,
      "timestampMs": 166380,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 167118,
      "endMs": 167238,
      "timestampMs": 167178,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 167238,
      "endMs": 167358,
      "timestampMs": 167298,
      "confidence": null
    },
    {
      "text": " Epson",
      "startMs": 167358,
      "endMs": 167698,
      "timestampMs": 167528,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 167698,
      "endMs": 167838,
      "timestampMs": 167768,
      "confidence": null
    },
    {
      "text": " been",
      "startMs": 167838,
      "endMs": 168243,
      "timestampMs": 168041,
      "confidence": null
    },
    {
      "text": " selected",
      "startMs": 168298,
      "endMs": 168818,
      "timestampMs": 168558,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 168818,
      "endMs": 169018,
      "timestampMs": 168918,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 169018,
      "endMs": 169158,
      "timestampMs": 169088,
      "confidence": null
    },
    {
      "text": " switcher,",
      "startMs": 169158,
      "endMs": 169678,
      "timestampMs": 169418,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 170374,
      "endMs": 170474,
      "timestampMs": 170424,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 170474,
      "endMs": 170594,
      "timestampMs": 170534,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 170594,
      "endMs": 170694,
      "timestampMs": 170644,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 170694,
      "endMs": 170854,
      "timestampMs": 170774,
      "confidence": null
    },
    {
      "text": " assign",
      "startMs": 170854,
      "endMs": 171354,
      "timestampMs": 171104,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 171354,
      "endMs": 171574,
      "timestampMs": 171464,
      "confidence": null
    },
    {
      "text": " audio",
      "startMs": 171574,
      "endMs": 172094,
      "timestampMs": 171834,
      "confidence": null
    },
    {
      "text": " levels.",
      "startMs": 172094,
      "endMs": 172664,
      "timestampMs": 172379,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 173014,
      "endMs": 173114,
      "timestampMs": 173064,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 173114,
      "endMs": 173274,
      "timestampMs": 173194,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 173274,
      "endMs": 173514,
      "timestampMs": 173394,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 173514,
      "endMs": 173694,
      "timestampMs": 173604,
      "confidence": null
    },
    {
      "text": " what's",
      "startMs": 173694,
      "endMs": 173934,
      "timestampMs": 173814,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 173934,
      "endMs": 174094,
      "timestampMs": 174014,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 174094,
      "endMs": 174194,
      "timestampMs": 174144,
      "confidence": null
    },
    {
      "text": " get",
      "startMs": 174194,
      "endMs": 174454,
      "timestampMs": 174324,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 174454,
      "endMs": 174754,
      "timestampMs": 174604,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 174754,
      "endMs": 174949,
      "timestampMs": 174852,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 175102,
      "endMs": 175202,
      "timestampMs": 175152,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 175202,
      "endMs": 175442,
      "timestampMs": 175322,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 175442,
      "endMs": 175802,
      "timestampMs": 175622,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 175802,
      "endMs": 176182,
      "timestampMs": 175992,
      "confidence": null
    },
    {
      "text": " interface.",
      "startMs": 176182,
      "endMs": 176722,
      "timestampMs": 176452,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 178270,
      "endMs": 178410,
      "timestampMs": 178340,
      "confidence": null
    },
    {
      "text": " once",
      "startMs": 178410,
      "endMs": 178550,
      "timestampMs": 178480,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 178550,
      "endMs": 178710,
      "timestampMs": 178630,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 178710,
      "endMs": 178890,
      "timestampMs": 178800,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 178890,
      "endMs": 179070,
      "timestampMs": 178980,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 179070,
      "endMs": 179210,
      "timestampMs": 179140,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 179210,
      "endMs": 179510,
      "timestampMs": 179360,
      "confidence": null
    },
    {
      "text": " up,",
      "startMs": 179510,
      "endMs": 179730,
      "timestampMs": 179620,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 179730,
      "endMs": 179945,
      "timestampMs": 179838,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 180090,
      "endMs": 180330,
      "timestampMs": 180210,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 180330,
      "endMs": 180410,
      "timestampMs": 180370,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 180410,
      "endMs": 180530,
      "timestampMs": 180470,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 180530,
      "endMs": 180710,
      "timestampMs": 180620,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 180710,
      "endMs": 180950,
      "timestampMs": 180830,
      "confidence": null
    },
    {
      "text": " interface,",
      "startMs": 180950,
      "endMs": 181625,
      "timestampMs": 181288,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 182030,
      "endMs": 182170,
      "timestampMs": 182100,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 182170,
      "endMs": 182520,
      "timestampMs": 182345,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 182650,
      "endMs": 182890,
      "timestampMs": 182770,
      "confidence": null
    },
    {
      "text": " locks",
      "startMs": 182890,
      "endMs": 183270,
      "timestampMs": 183080,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 183270,
      "endMs": 183390,
      "timestampMs": 183330,
      "confidence": null
    },
    {
      "text": " down",
      "startMs": 183390,
      "endMs": 183935,
      "timestampMs": 183663,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 184178,
      "endMs": 184438,
      "timestampMs": 184308,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 184438,
      "endMs": 184618,
      "timestampMs": 184528,
      "confidence": null
    },
    {
      "text": " actual",
      "startMs": 184618,
      "endMs": 184978,
      "timestampMs": 184798,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 184978,
      "endMs": 185238,
      "timestampMs": 185108,
      "confidence": null
    },
    {
      "text": " user,",
      "startMs": 185238,
      "endMs": 185578,
      "timestampMs": 185408,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 185898,
      "endMs": 186123,
      "timestampMs": 186010,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 186598,
      "endMs": 186758,
      "timestampMs": 186678,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 186758,
      "endMs": 186898,
      "timestampMs": 186828,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 186898,
      "endMs": 187058,
      "timestampMs": 186978,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 187058,
      "endMs": 187358,
      "timestampMs": 187208,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 187358,
      "endMs": 187518,
      "timestampMs": 187438,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 187518,
      "endMs": 187698,
      "timestampMs": 187608,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 187698,
      "endMs": 187838,
      "timestampMs": 187768,
      "confidence": null
    },
    {
      "text": " technician.",
      "startMs": 187838,
      "endMs": 188328,
      "timestampMs": 188083,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 188628,
      "endMs": 188958,
      "timestampMs": 188793,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 189191,
      "endMs": 189431,
      "timestampMs": 189311,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 189431,
      "endMs": 189481,
      "timestampMs": 189456,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 189431,
      "endMs": 189811,
      "timestampMs": 189621,
      "confidence": null
    },
    {
      "text": " my",
      "startMs": 189811,
      "endMs": 190051,
      "timestampMs": 189931,
      "confidence": null
    },
    {
      "text": " TV,",
      "startMs": 190119,
      "endMs": 190764,
      "timestampMs": 190442,
      "confidence": null
    },
    {
      "text": " my",
      "startMs": 191200,
      "endMs": 191380,
      "timestampMs": 191290,
      "confidence": null
    },
    {
      "text": " projector",
      "startMs": 191380,
      "endMs": 191800,
      "timestampMs": 191590,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 191800,
      "endMs": 191880,
      "timestampMs": 191840,
      "confidence": null
    },
    {
      "text": " switching,",
      "startMs": 191880,
      "endMs": 192570,
      "timestampMs": 192225,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 193150,
      "endMs": 193420,
      "timestampMs": 193285,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 193543,
      "endMs": 193623,
      "timestampMs": 193583,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 193623,
      "endMs": 193943,
      "timestampMs": 193783,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 193943,
      "endMs": 194223,
      "timestampMs": 194083,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 194223,
      "endMs": 194343,
      "timestampMs": 194283,
      "confidence": null
    },
    {
      "text": " volume,",
      "startMs": 194343,
      "endMs": 195003,
      "timestampMs": 194673,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 196431,
      "endMs": 196531,
      "timestampMs": 196481,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 196531,
      "endMs": 196691,
      "timestampMs": 196611,
      "confidence": null
    },
    {
      "text": " mute",
      "startMs": 196691,
      "endMs": 197031,
      "timestampMs": 196861,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 197031,
      "endMs": 197266,
      "timestampMs": 197148,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 197641,
      "endMs": 197761,
      "timestampMs": 197701,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 197761,
      "endMs": 197841,
      "timestampMs": 197801,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 197841,
      "endMs": 197981,
      "timestampMs": 197911,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 197981,
      "endMs": 198241,
      "timestampMs": 198111,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 198241,
      "endMs": 198361,
      "timestampMs": 198301,
      "confidence": null
    },
    {
      "text": " system",
      "startMs": 198361,
      "endMs": 198741,
      "timestampMs": 198551,
      "confidence": null
    },
    {
      "text": " down.",
      "startMs": 198741,
      "endMs": 199021,
      "timestampMs": 198881,
      "confidence": null
    },
    {
      "text": " Anytime",
      "startMs": 203270,
      "endMs": 203650,
      "timestampMs": 203460,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 203650,
      "endMs": 203710,
      "timestampMs": 203680,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 203710,
      "endMs": 203910,
      "timestampMs": 203810,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 203910,
      "endMs": 204030,
      "timestampMs": 203970,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 204030,
      "endMs": 204230,
      "timestampMs": 204130,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 204230,
      "endMs": 204570,
      "timestampMs": 204400,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 204570,
      "endMs": 204730,
      "timestampMs": 204650,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 204730,
      "endMs": 205050,
      "timestampMs": 204890,
      "confidence": null
    },
    {
      "text": " anything,",
      "startMs": 205050,
      "endMs": 205630,
      "timestampMs": 205340,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 205810,
      "endMs": 205890,
      "timestampMs": 205850,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 205890,
      "endMs": 206030,
      "timestampMs": 205960,
      "confidence": null
    },
    {
      "text": " press",
      "startMs": 206030,
      "endMs": 206270,
      "timestampMs": 206150,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 206270,
      "endMs": 206430,
      "timestampMs": 206350,
      "confidence": null
    },
    {
      "text": " hold",
      "startMs": 206430,
      "endMs": 206770,
      "timestampMs": 206600,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 206770,
      "endMs": 206870,
      "timestampMs": 206820,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 206870,
      "endMs": 207150,
      "timestampMs": 207010,
      "confidence": null
    },
    {
      "text": " setup",
      "startMs": 207150,
      "endMs": 207450,
      "timestampMs": 207300,
      "confidence": null
    },
    {
      "text": " button,",
      "startMs": 207450,
      "endMs": 207930,
      "timestampMs": 207690,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 208403,
      "endMs": 208483,
      "timestampMs": 208443,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 208483,
      "endMs": 208643,
      "timestampMs": 208563,
      "confidence": null
    },
    {
      "text": " take",
      "startMs": 208643,
      "endMs": 208803,
      "timestampMs": 208723,
      "confidence": null
    },
    {
      "text": " me",
      "startMs": 208803,
      "endMs": 208923,
      "timestampMs": 208863,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 208923,
      "endMs": 209123,
      "timestampMs": 209023,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 209123,
      "endMs": 209343,
      "timestampMs": 209233,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 209343,
      "endMs": 209623,
      "timestampMs": 209483,
      "confidence": null
    },
    {
      "text": " Let's",
      "startMs": 211285,
      "endMs": 211405,
      "timestampMs": 211345,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 211405,
      "endMs": 211585,
      "timestampMs": 211495,
      "confidence": null
    },
    {
      "text": " ahead",
      "startMs": 211585,
      "endMs": 211825,
      "timestampMs": 211705,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 211825,
      "endMs": 212005,
      "timestampMs": 211915,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 212005,
      "endMs": 212245,
      "timestampMs": 212125,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 212245,
      "endMs": 212535,
      "timestampMs": 212390,
      "confidence": null
    },
    {
      "text": " more",
      "startMs": 212665,
      "endMs": 212845,
      "timestampMs": 212755,
      "confidence": null
    },
    {
      "text": " devices.",
      "startMs": 212845,
      "endMs": 213490,
      "timestampMs": 213168,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 213830,
      "endMs": 213960,
      "timestampMs": 213895,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 213960,
      "endMs": 214140,
      "timestampMs": 214050,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 214140,
      "endMs": 214260,
      "timestampMs": 214200,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 214260,
      "endMs": 214360,
      "timestampMs": 214310,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 214360,
      "endMs": 214500,
      "timestampMs": 214430,
      "confidence": null
    },
    {
      "text": " corner,",
      "startMs": 214500,
      "endMs": 214880,
      "timestampMs": 214690,
      "confidence": null
    },
    {
      "text": " there's",
      "startMs": 214880,
      "endMs": 215460,
      "timestampMs": 215170,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 215460,
      "endMs": 215520,
      "timestampMs": 215490,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 215520,
      "endMs": 215780,
      "timestampMs": 215650,
      "confidence": null
    },
    {
      "text": " discovery",
      "startMs": 215780,
      "endMs": 216545,
      "timestampMs": 216163,
      "confidence": null
    },
    {
      "text": " feature.",
      "startMs": 216563,
      "endMs": 216963,
      "timestampMs": 216763,
      "confidence": null
    },
    {
      "text": " Clicking",
      "startMs": 217603,
      "endMs": 217983,
      "timestampMs": 217793,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 217983,
      "endMs": 218103,
      "timestampMs": 218043,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 218103,
      "endMs": 218283,
      "timestampMs": 218193,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 218611,
      "endMs": 218811,
      "timestampMs": 218711,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 218811,
      "endMs": 218861,
      "timestampMs": 218836,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 218811,
      "endMs": 219119,
      "timestampMs": 218965,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 219384,
      "endMs": 219604,
      "timestampMs": 219494,
      "confidence": null
    },
    {
      "text": " scans",
      "startMs": 219604,
      "endMs": 220124,
      "timestampMs": 219864,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 220124,
      "endMs": 220204,
      "timestampMs": 220164,
      "confidence": null
    },
    {
      "text": " whole",
      "startMs": 220204,
      "endMs": 220424,
      "timestampMs": 220314,
      "confidence": null
    },
    {
      "text": " network",
      "startMs": 220424,
      "endMs": 220864,
      "timestampMs": 220644,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 221512,
      "endMs": 221652,
      "timestampMs": 221582,
      "confidence": null
    },
    {
      "text": " tries",
      "startMs": 221652,
      "endMs": 221972,
      "timestampMs": 221812,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 221972,
      "endMs": 222112,
      "timestampMs": 222042,
      "confidence": null
    },
    {
      "text": " find",
      "startMs": 222112,
      "endMs": 222352,
      "timestampMs": 222232,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 222352,
      "endMs": 222492,
      "timestampMs": 222422,
      "confidence": null
    },
    {
      "text": " match",
      "startMs": 222492,
      "endMs": 223072,
      "timestampMs": 222782,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 223072,
      "endMs": 223372,
      "timestampMs": 223222,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 223372,
      "endMs": 223492,
      "timestampMs": 223432,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 223492,
      "endMs": 223992,
      "timestampMs": 223742,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 223992,
      "endMs": 224132,
      "timestampMs": 224062,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 224132,
      "endMs": 224332,
      "timestampMs": 224232,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 224332,
      "endMs": 224432,
      "timestampMs": 224382,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 224432,
      "endMs": 224552,
      "timestampMs": 224492,
      "confidence": null
    },
    {
      "text": " network",
      "startMs": 224552,
      "endMs": 225032,
      "timestampMs": 224792,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 225488,
      "endMs": 225668,
      "timestampMs": 225578,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 225668,
      "endMs": 225908,
      "timestampMs": 225788,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 225908,
      "endMs": 226408,
      "timestampMs": 226158,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 226408,
      "endMs": 226703,
      "timestampMs": 226556,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 226788,
      "endMs": 226888,
      "timestampMs": 226838,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 226888,
      "endMs": 227418,
      "timestampMs": 227153,
      "confidence": null
    },
    {
      "text": " driver",
      "startMs": 227506,
      "endMs": 228036,
      "timestampMs": 227771,
      "confidence": null
    },
    {
      "text": " database.",
      "startMs": 228106,
      "endMs": 228806,
      "timestampMs": 228456,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 231390,
      "endMs": 231610,
      "timestampMs": 231500,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 231610,
      "endMs": 231985,
      "timestampMs": 231797,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 232150,
      "endMs": 232270,
      "timestampMs": 232210,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 232270,
      "endMs": 232470,
      "timestampMs": 232370,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 232470,
      "endMs": 232550,
      "timestampMs": 232510,
      "confidence": null
    },
    {
      "text": " few",
      "startMs": 232550,
      "endMs": 233090,
      "timestampMs": 232820,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 233303,
      "endMs": 233478,
      "timestampMs": 233390,
      "confidence": null
    },
    {
      "text": " Matrox",
      "startMs": 233596,
      "endMs": 234436,
      "timestampMs": 234016,
      "confidence": null
    },
    {
      "text": " endpoints,",
      "startMs": 234689,
      "endMs": 235349,
      "timestampMs": 235019,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 235709,
      "endMs": 236004,
      "timestampMs": 235857,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 236404,
      "endMs": 236524,
      "timestampMs": 236464,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 236524,
      "endMs": 237024,
      "timestampMs": 236774,
      "confidence": null
    },
    {
      "text": " use",
      "startMs": 237024,
      "endMs": 237604,
      "timestampMs": 237314,
      "confidence": null
    },
    {
      "text": " IPMX,",
      "startMs": 237684,
      "endMs": 238559,
      "timestampMs": 238121,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 238934,
      "endMs": 238994,
      "timestampMs": 238964,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 238994,
      "endMs": 239274,
      "timestampMs": 239134,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 239274,
      "endMs": 239614,
      "timestampMs": 239444,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 239614,
      "endMs": 239754,
      "timestampMs": 239684,
      "confidence": null
    },
    {
      "text": " these.",
      "startMs": 239754,
      "endMs": 240219,
      "timestampMs": 239987,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 240219,
      "endMs": 241102,
      "timestampMs": 240661,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 241102,
      "endMs": 241302,
      "timestampMs": 241202,
      "confidence": null
    },
    {
      "text": " click,",
      "startMs": 241302,
      "endMs": 241542,
      "timestampMs": 241422,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 241682,
      "endMs": 241862,
      "timestampMs": 241772,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 241862,
      "endMs": 242002,
      "timestampMs": 241932,
      "confidence": null
    },
    {
      "text": " need.",
      "startMs": 242002,
      "endMs": 242362,
      "timestampMs": 242182,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 242752,
      "endMs": 242832,
      "timestampMs": 242792,
      "confidence": null
    },
    {
      "text": " there's",
      "startMs": 242832,
      "endMs": 243052,
      "timestampMs": 242942,
      "confidence": null
    },
    {
      "text": " setup",
      "startMs": 243052,
      "endMs": 243372,
      "timestampMs": 243212,
      "confidence": null
    },
    {
      "text": " information,",
      "startMs": 243372,
      "endMs": 244322,
      "timestampMs": 243847,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 244572,
      "endMs": 244852,
      "timestampMs": 244712,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 244852,
      "endMs": 244932,
      "timestampMs": 244892,
      "confidence": null
    },
    {
      "text": " login,",
      "startMs": 244932,
      "endMs": 245692,
      "timestampMs": 245312,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 246360,
      "endMs": 246680,
      "timestampMs": 246520,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 246680,
      "endMs": 246840,
      "timestampMs": 246760,
      "confidence": null
    },
    {
      "text": " kind",
      "startMs": 246840,
      "endMs": 247080,
      "timestampMs": 246960,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 247080,
      "endMs": 247248,
      "timestampMs": 247164,
      "confidence": null
    },
    {
      "text": " certificates",
      "startMs": 247283,
      "endMs": 247963,
      "timestampMs": 247623,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 247963,
      "endMs": 248023,
      "timestampMs": 247993,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 248023,
      "endMs": 248263,
      "timestampMs": 248143,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 248263,
      "endMs": 248403,
      "timestampMs": 248333,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 248403,
      "endMs": 248663,
      "timestampMs": 248533,
      "confidence": null
    },
    {
      "text": " authorized,",
      "startMs": 248663,
      "endMs": 249288,
      "timestampMs": 248976,
      "confidence": null
    },
    {
      "text": " they'll",
      "startMs": 249483,
      "endMs": 249703,
      "timestampMs": 249593,
      "confidence": null
    },
    {
      "text": " pop",
      "startMs": 249703,
      "endMs": 250003,
      "timestampMs": 249853,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 250003,
      "endMs": 250183,
      "timestampMs": 250093,
      "confidence": null
    },
    {
      "text": " automatically",
      "startMs": 250183,
      "endMs": 250698,
      "timestampMs": 250441,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 251263,
      "endMs": 251618,
      "timestampMs": 251441,
      "confidence": null
    },
    {
      "text": " await",
      "startMs": 251991,
      "endMs": 252251,
      "timestampMs": 252121,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 252251,
      "endMs": 252451,
      "timestampMs": 252351,
      "confidence": null
    },
    {
      "text": " approval,",
      "startMs": 252451,
      "endMs": 253061,
      "timestampMs": 252756,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 253621,
      "endMs": 253976,
      "timestampMs": 253799,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 254061,
      "endMs": 254341,
      "timestampMs": 254201,
      "confidence": null
    },
    {
      "text": " let",
      "startMs": 254341,
      "endMs": 254481,
      "timestampMs": 254411,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 254481,
      "endMs": 254741,
      "timestampMs": 254611,
      "confidence": null
    },
    {
      "text": " log",
      "startMs": 254741,
      "endMs": 255181,
      "timestampMs": 254961,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 255181,
      "endMs": 255481,
      "timestampMs": 255331,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 255957,
      "endMs": 256195,
      "timestampMs": 256076,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 256290,
      "endMs": 256790,
      "timestampMs": 256540,
      "confidence": null
    },
    {
      "text": " those",
      "startMs": 256790,
      "endMs": 257150,
      "timestampMs": 256970,
      "confidence": null
    },
    {
      "text": " values.",
      "startMs": 257150,
      "endMs": 257785,
      "timestampMs": 257468,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 261775,
      "endMs": 262015,
      "timestampMs": 261895,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 262015,
      "endMs": 262255,
      "timestampMs": 262135,
      "confidence": null
    },
    {
      "text": " each",
      "startMs": 262255,
      "endMs": 262515,
      "timestampMs": 262385,
      "confidence": null
    },
    {
      "text": " individual",
      "startMs": 262515,
      "endMs": 263595,
      "timestampMs": 263055,
      "confidence": null
    },
    {
      "text": " encoder",
      "startMs": 264090,
      "endMs": 264470,
      "timestampMs": 264280,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 264470,
      "endMs": 264630,
      "timestampMs": 264550,
      "confidence": null
    },
    {
      "text": " decoder,",
      "startMs": 264630,
      "endMs": 265340,
      "timestampMs": 264985,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 265810,
      "endMs": 265990,
      "timestampMs": 265900,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 265990,
      "endMs": 266130,
      "timestampMs": 266060,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 266130,
      "endMs": 266510,
      "timestampMs": 266320,
      "confidence": null
    },
    {
      "text": " switch",
      "startMs": 266510,
      "endMs": 266850,
      "timestampMs": 266680,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 266850,
      "endMs": 266990,
      "timestampMs": 266920,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 266990,
      "endMs": 267370,
      "timestampMs": 267180,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 267370,
      "endMs": 267630,
      "timestampMs": 267500,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 267630,
      "endMs": 267975,
      "timestampMs": 267803,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 269750,
      "endMs": 269985,
      "timestampMs": 269868,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 269985,
      "endMs": 270245,
      "timestampMs": 270115,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 270245,
      "endMs": 270585,
      "timestampMs": 270415,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 270585,
      "endMs": 270765,
      "timestampMs": 270675,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 270765,
      "endMs": 270905,
      "timestampMs": 270835,
      "confidence": null
    },
    {
      "text": " activities.",
      "startMs": 270905,
      "endMs": 271580,
      "timestampMs": 271242,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 272005,
      "endMs": 272285,
      "timestampMs": 272145,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 272285,
      "endMs": 272485,
      "timestampMs": 272385,
      "confidence": null
    },
    {
      "text": " we'll",
      "startMs": 272485,
      "endMs": 272745,
      "timestampMs": 272615,
      "confidence": null
    },
    {
      "text": " want",
      "startMs": 272745,
      "endMs": 273005,
      "timestampMs": 272875,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 273005,
      "endMs": 273225,
      "timestampMs": 273115,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 273225,
      "endMs": 274150,
      "timestampMs": 273688,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 274333,
      "endMs": 274493,
      "timestampMs": 274413,
      "confidence": null
    },
    {
      "text": " switcher",
      "startMs": 274493,
      "endMs": 275123,
      "timestampMs": 274808,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 275391,
      "endMs": 275631,
      "timestampMs": 275511,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 275631,
      "endMs": 276031,
      "timestampMs": 275831,
      "confidence": null
    },
    {
      "text": " encoders",
      "startMs": 276031,
      "endMs": 276531,
      "timestampMs": 276281,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 276531,
      "endMs": 276631,
      "timestampMs": 276581,
      "confidence": null
    },
    {
      "text": " decoders.",
      "startMs": 276631,
      "endMs": 277356,
      "timestampMs": 276994,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 277816,
      "endMs": 277916,
      "timestampMs": 277866,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 277916,
      "endMs": 278036,
      "timestampMs": 277976,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 278036,
      "endMs": 278216,
      "timestampMs": 278126,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 278216,
      "endMs": 278476,
      "timestampMs": 278346,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 278476,
      "endMs": 278796,
      "timestampMs": 278636,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 278796,
      "endMs": 279571,
      "timestampMs": 279184,
      "confidence": null
    },
    {
      "text": " convert",
      "startMs": 279576,
      "endMs": 280066,
      "timestampMs": 279821,
      "confidence": null
    },
    {
      "text": " IP,",
      "startMs": 280256,
      "endMs": 280861,
      "timestampMs": 280559,
      "confidence": null
    },
    {
      "text": " Matrox",
      "startMs": 281059,
      "endMs": 281844,
      "timestampMs": 281451,
      "confidence": null
    },
    {
      "text": " encoders",
      "startMs": 281947,
      "endMs": 282427,
      "timestampMs": 282187,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 282427,
      "endMs": 282527,
      "timestampMs": 282477,
      "confidence": null
    },
    {
      "text": " decoders",
      "startMs": 282527,
      "endMs": 283182,
      "timestampMs": 282855,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 283327,
      "endMs": 283507,
      "timestampMs": 283417,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 283507,
      "endMs": 283747,
      "timestampMs": 283627,
      "confidence": null
    },
    {
      "text": " up,",
      "startMs": 283747,
      "endMs": 283967,
      "timestampMs": 283857,
      "confidence": null
    },
    {
      "text": " ready",
      "startMs": 283967,
      "endMs": 284207,
      "timestampMs": 284087,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 284207,
      "endMs": 284327,
      "timestampMs": 284267,
      "confidence": null
    },
    {
      "text": " go.",
      "startMs": 284327,
      "endMs": 284762,
      "timestampMs": 284545,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 285197,
      "endMs": 285397,
      "timestampMs": 285297,
      "confidence": null
    },
    {
      "text": " we'll",
      "startMs": 285397,
      "endMs": 285597,
      "timestampMs": 285497,
      "confidence": null
    },
    {
      "text": " leave",
      "startMs": 285597,
      "endMs": 285757,
      "timestampMs": 285677,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 285757,
      "endMs": 285937,
      "timestampMs": 285847,
      "confidence": null
    },
    {
      "text": " audio",
      "startMs": 285937,
      "endMs": 286297,
      "timestampMs": 286117,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 286297,
      "endMs": 286457,
      "timestampMs": 286377,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 286457,
      "endMs": 286717,
      "timestampMs": 286587,
      "confidence": null
    },
    {
      "text": " display",
      "startMs": 286717,
      "endMs": 287427,
      "timestampMs": 287072,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 287685,
      "endMs": 287805,
      "timestampMs": 287745,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 287805,
      "endMs": 287925,
      "timestampMs": 287865,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 287925,
      "endMs": 288545,
      "timestampMs": 288235,
      "confidence": null
    },
    {
      "text": " already",
      "startMs": 288658,
      "endMs": 288938,
      "timestampMs": 288798,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 288938,
      "endMs": 289078,
      "timestampMs": 289008,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 289078,
      "endMs": 289128,
      "timestampMs": 289103,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 289078,
      "endMs": 289128,
      "timestampMs": 289103,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 289078,
      "endMs": 289238,
      "timestampMs": 289158,
      "confidence": null
    },
    {
      "text": " display.",
      "startMs": 289518,
      "endMs": 289918,
      "timestampMs": 289718,
      "confidence": null
    },
    {
      "text": " Now,",
      "startMs": 293320,
      "endMs": 293520,
      "timestampMs": 293420,
      "confidence": null
    },
    {
      "text": " when",
      "startMs": 293520,
      "endMs": 293680,
      "timestampMs": 293600,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 293680,
      "endMs": 293800,
      "timestampMs": 293740,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 293800,
      "endMs": 294000,
      "timestampMs": 293900,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 294000,
      "endMs": 294120,
      "timestampMs": 294060,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 294120,
      "endMs": 294525,
      "timestampMs": 294323,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 294800,
      "endMs": 294880,
      "timestampMs": 294840,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 294880,
      "endMs": 295080,
      "timestampMs": 294980,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 295080,
      "endMs": 295160,
      "timestampMs": 295120,
      "confidence": null
    },
    {
      "text": " very",
      "startMs": 295160,
      "endMs": 295380,
      "timestampMs": 295270,
      "confidence": null
    },
    {
      "text": " different",
      "startMs": 295380,
      "endMs": 295660,
      "timestampMs": 295520,
      "confidence": null
    },
    {
      "text": " interface,",
      "startMs": 295660,
      "endMs": 296335,
      "timestampMs": 295998,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 296440,
      "endMs": 296760,
      "timestampMs": 296600,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 297120,
      "endMs": 297240,
      "timestampMs": 297180,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 297240,
      "endMs": 297360,
      "timestampMs": 297300,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 297360,
      "endMs": 297540,
      "timestampMs": 297450,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 297540,
      "endMs": 298030,
      "timestampMs": 297785,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 298263,
      "endMs": 298463,
      "timestampMs": 298363,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 298463,
      "endMs": 298543,
      "timestampMs": 298503,
      "confidence": null
    },
    {
      "text": " takes",
      "startMs": 298543,
      "endMs": 298803,
      "timestampMs": 298673,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 298803,
      "endMs": 299083,
      "timestampMs": 298943,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 299083,
      "endMs": 299263,
      "timestampMs": 299173,
      "confidence": null
    },
    {
      "text": " press,",
      "startMs": 299263,
      "endMs": 299853,
      "timestampMs": 299558,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 299903,
      "endMs": 300123,
      "timestampMs": 300013,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 300123,
      "endMs": 300173,
      "timestampMs": 300148,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 300123,
      "endMs": 300173,
      "timestampMs": 300148,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 300123,
      "endMs": 300283,
      "timestampMs": 300203,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 300283,
      "endMs": 300523,
      "timestampMs": 300403,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 300523,
      "endMs": 300743,
      "timestampMs": 300633,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 300743,
      "endMs": 301218,
      "timestampMs": 300981,
      "confidence": null
    },
    {
      "text": " We",
      "startMs": 301558,
      "endMs": 301693,
      "timestampMs": 301626,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 301693,
      "endMs": 301973,
      "timestampMs": 301833,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 301973,
      "endMs": 302213,
      "timestampMs": 302093,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 302213,
      "endMs": 302293,
      "timestampMs": 302253,
      "confidence": null
    },
    {
      "text": " drag",
      "startMs": 302293,
      "endMs": 302593,
      "timestampMs": 302443,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 302593,
      "endMs": 302733,
      "timestampMs": 302663,
      "confidence": null
    },
    {
      "text": " drop",
      "startMs": 302733,
      "endMs": 303073,
      "timestampMs": 302903,
      "confidence": null
    },
    {
      "text": " feature,",
      "startMs": 303073,
      "endMs": 303373,
      "timestampMs": 303223,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 303373,
      "endMs": 303693,
      "timestampMs": 303533,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 303973,
      "endMs": 304033,
      "timestampMs": 304003,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 304033,
      "endMs": 304293,
      "timestampMs": 304163,
      "confidence": null
    },
    {
      "text": " press",
      "startMs": 304293,
      "endMs": 304493,
      "timestampMs": 304393,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 304493,
      "endMs": 304653,
      "timestampMs": 304573,
      "confidence": null
    },
    {
      "text": " hold",
      "startMs": 304653,
      "endMs": 305053,
      "timestampMs": 304853,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 305281,
      "endMs": 305401,
      "timestampMs": 305341,
      "confidence": null
    },
    {
      "text": " drag",
      "startMs": 305401,
      "endMs": 305681,
      "timestampMs": 305541,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 305681,
      "endMs": 305801,
      "timestampMs": 305741,
      "confidence": null
    },
    {
      "text": " over.",
      "startMs": 305801,
      "endMs": 306071,
      "timestampMs": 305936,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 306501,
      "endMs": 306571,
      "timestampMs": 306536,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 306571,
      "endMs": 306711,
      "timestampMs": 306641,
      "confidence": null
    },
    {
      "text": " course,",
      "startMs": 306711,
      "endMs": 307186,
      "timestampMs": 306948,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 307211,
      "endMs": 307391,
      "timestampMs": 307301,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 307391,
      "endMs": 307631,
      "timestampMs": 307511,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 307631,
      "endMs": 307876,
      "timestampMs": 307754,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 308034,
      "endMs": 308254,
      "timestampMs": 308144,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 308254,
      "endMs": 308554,
      "timestampMs": 308404,
      "confidence": null
    },
    {
      "text": " all.",
      "startMs": 308554,
      "endMs": 308879,
      "timestampMs": 308717,
      "confidence": null
    },
    {
      "text": " At",
      "startMs": 309259,
      "endMs": 309359,
      "timestampMs": 309309,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 309359,
      "endMs": 309519,
      "timestampMs": 309439,
      "confidence": null
    },
    {
      "text": " time,",
      "startMs": 309519,
      "endMs": 309719,
      "timestampMs": 309619,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 309719,
      "endMs": 309819,
      "timestampMs": 309769,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 309819,
      "endMs": 310019,
      "timestampMs": 309919,
      "confidence": null
    },
    {
      "text": " select",
      "startMs": 310019,
      "endMs": 310419,
      "timestampMs": 310219,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 310612,
      "endMs": 310732,
      "timestampMs": 310672,
      "confidence": null
    },
    {
      "text": " input",
      "startMs": 310732,
      "endMs": 311227,
      "timestampMs": 310980,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 311450,
      "endMs": 311740,
      "timestampMs": 311595,
      "confidence": null
    },
    {
      "text": " press",
      "startMs": 311803,
      "endMs": 312143,
      "timestampMs": 311973,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 312143,
      "endMs": 312303,
      "timestampMs": 312223,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 312303,
      "endMs": 312563,
      "timestampMs": 312433,
      "confidence": null
    },
    {
      "text": " button,",
      "startMs": 312563,
      "endMs": 312983,
      "timestampMs": 312773,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 313023,
      "endMs": 313123,
      "timestampMs": 313073,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 313123,
      "endMs": 313223,
      "timestampMs": 313173,
      "confidence": null
    },
    {
      "text": " sends",
      "startMs": 313223,
      "endMs": 313483,
      "timestampMs": 313353,
      "confidence": null
    },
    {
      "text": " everything",
      "startMs": 313483,
      "endMs": 314003,
      "timestampMs": 313743,
      "confidence": null
    },
    {
      "text": " where",
      "startMs": 314181,
      "endMs": 314341,
      "timestampMs": 314261,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 314341,
      "endMs": 314461,
      "timestampMs": 314401,
      "confidence": null
    },
    {
      "text": " needs",
      "startMs": 314461,
      "endMs": 314621,
      "timestampMs": 314541,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 314621,
      "endMs": 314681,
      "timestampMs": 314651,
      "confidence": null
    },
    {
      "text": " go.",
      "startMs": 314681,
      "endMs": 314986,
      "timestampMs": 314833,
      "confidence": null
    },
    {
      "text": " At",
      "startMs": 317805,
      "endMs": 317925,
      "timestampMs": 317865,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 317925,
      "endMs": 318105,
      "timestampMs": 318015,
      "confidence": null
    },
    {
      "text": " time,",
      "startMs": 318105,
      "endMs": 318565,
      "timestampMs": 318335,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 318565,
      "endMs": 318685,
      "timestampMs": 318625,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 318685,
      "endMs": 318825,
      "timestampMs": 318755,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 318825,
      "endMs": 319345,
      "timestampMs": 319085,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 319425,
      "endMs": 319585,
      "timestampMs": 319505,
      "confidence": null
    },
    {
      "text": " start",
      "startMs": 319585,
      "endMs": 319965,
      "timestampMs": 319775,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 319965,
      "endMs": 320440,
      "timestampMs": 320203,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 320665,
      "endMs": 320765,
      "timestampMs": 320715,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 320765,
      "endMs": 320845,
      "timestampMs": 320805,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 320845,
      "endMs": 321105,
      "timestampMs": 320975,
      "confidence": null
    },
    {
      "text": " help",
      "startMs": 321105,
      "endMs": 321375,
      "timestampMs": 321240,
      "confidence": null
    },
    {
      "text": " full",
      "startMs": 321675,
      "endMs": 322205,
      "timestampMs": 321940,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 322235,
      "endMs": 322495,
      "timestampMs": 322365,
      "confidence": null
    },
    {
      "text": " manual,",
      "startMs": 322495,
      "endMs": 322835,
      "timestampMs": 322665,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 322835,
      "endMs": 323115,
      "timestampMs": 322975,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 323115,
      "endMs": 323255,
      "timestampMs": 323185,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 323255,
      "endMs": 323375,
      "timestampMs": 323315,
      "confidence": null
    },
    {
      "text": " found",
      "startMs": 323375,
      "endMs": 323635,
      "timestampMs": 323505,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 323635,
      "endMs": 323875,
      "timestampMs": 323755,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 323875,
      "endMs": 324320,
      "timestampMs": 324097,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 324745,
      "endMs": 325045,
      "timestampMs": 324895,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 325045,
      "endMs": 325288,
      "timestampMs": 325167,
      "confidence": null
    },
    {
      "text": " quick",
      "startMs": 325293,
      "endMs": 325513,
      "timestampMs": 325403,
      "confidence": null
    },
    {
      "text": " start,",
      "startMs": 325513,
      "endMs": 325893,
      "timestampMs": 325703,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 325893,
      "endMs": 325973,
      "timestampMs": 325933,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 325973,
      "endMs": 326073,
      "timestampMs": 326023,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 326073,
      "endMs": 326261,
      "timestampMs": 326167,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 326266,
      "endMs": 326546,
      "timestampMs": 326406,
      "confidence": null
    },
    {
      "text": " watch",
      "startMs": 326546,
      "endMs": 326786,
      "timestampMs": 326666,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 326786,
      "endMs": 326846,
      "timestampMs": 326816,
      "confidence": null
    },
    {
      "text": " quick",
      "startMs": 326846,
      "endMs": 327086,
      "timestampMs": 326966,
      "confidence": null
    },
    {
      "text": " start",
      "startMs": 327086,
      "endMs": 327346,
      "timestampMs": 327216,
      "confidence": null
    },
    {
      "text": " again,",
      "startMs": 327346,
      "endMs": 327716,
      "timestampMs": 327531,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 327899,
      "endMs": 328019,
      "timestampMs": 327959,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 328019,
      "endMs": 328509,
      "timestampMs": 328264,
      "confidence": null
    },
    {
      "text": " play",
      "startMs": 328519,
      "endMs": 328759,
      "timestampMs": 328639,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 328759,
      "endMs": 328899,
      "timestampMs": 328829,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 328899,
      "endMs": 329119,
      "timestampMs": 329009,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 329119,
      "endMs": 329579,
      "timestampMs": 329349,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 330189,
      "endMs": 330289,
      "timestampMs": 330239,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 330289,
      "endMs": 330339,
      "timestampMs": 330314,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 330329,
      "endMs": 330489,
      "timestampMs": 330409,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 330489,
      "endMs": 330689,
      "timestampMs": 330589,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 330689,
      "endMs": 330809,
      "timestampMs": 330749,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 330809,
      "endMs": 330929,
      "timestampMs": 330869,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 330929,
      "endMs": 331109,
      "timestampMs": 331019,
      "confidence": null
    },
    {
      "text": " factory",
      "startMs": 331109,
      "endMs": 331529,
      "timestampMs": 331319,
      "confidence": null
    },
    {
      "text": " reset",
      "startMs": 331529,
      "endMs": 332109,
      "timestampMs": 331819,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 332435,
      "endMs": 332575,
      "timestampMs": 332505,
      "confidence": null
    },
    {
      "text": " update",
      "startMs": 332575,
      "endMs": 332975,
      "timestampMs": 332775,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 333003,
      "endMs": 333293,
      "timestampMs": 333148,
      "confidence": null
    },
    {
      "text": " database,",
      "startMs": 333443,
      "endMs": 334198,
      "timestampMs": 333820,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 334386,
      "endMs": 334506,
      "timestampMs": 334446,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 334506,
      "endMs": 334646,
      "timestampMs": 334576,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 334646,
      "endMs": 334696,
      "timestampMs": 334671,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 334686,
      "endMs": 334886,
      "timestampMs": 334786,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 334886,
      "endMs": 335116,
      "timestampMs": 335001,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 335116,
      "endMs": 335256,
      "timestampMs": 335186,
      "confidence": null
    },
    {
      "text": " Thank",
      "startMs": 338750,
      "endMs": 338920,
      "timestampMs": 338835,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 338920,
      "endMs": 339060,
      "timestampMs": 338990,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 339060,
      "endMs": 339200,
      "timestampMs": 339130,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 339200,
      "endMs": 339360,
      "timestampMs": 339280,
      "confidence": null
    },
    {
      "text": " time.",
      "startMs": 339360,
      "endMs": 339775,
      "timestampMs": 339568,
      "confidence": null
    }
  ],
  "cues": {
    "welcome": [
      {
        "text": "Welcome",
        "ms": 365
      },
      {
        "text": "to",
        "ms": 745
      },
      {
        "text": "CTRLbot.",
        "ms": 865
      },
      {
        "text": "This",
        "ms": 2243
      },
      {
        "text": "will",
        "ms": 2383
      },
      {
        "text": "be",
        "ms": 2563
      },
      {
        "text": "a",
        "ms": 2603
      },
      {
        "text": "walkthrough",
        "ms": 2723
      },
      {
        "text": "of",
        "ms": 3423
      },
      {
        "text": "the",
        "ms": 3563
      },
      {
        "text": "CTRLbot",
        "ms": 3663
      },
      {
        "text": "IoT",
        "ms": 4383
      },
      {
        "text": "app",
        "ms": 4963
      },
      {
        "text": "that's",
        "ms": 5411
      },
      {
        "text": "available",
        "ms": 5631
      },
      {
        "text": "for",
        "ms": 6111
      },
      {
        "text": "Android,",
        "ms": 6391
      },
      {
        "text": "for",
        "ms": 7149
      },
      {
        "text": "phone,",
        "ms": 7429
      },
      {
        "text": "tablet,",
        "ms": 7929
      }
    ],
    "first-run-tour": [
      {
        "text": "When",
        "ms": 11255
      },
      {
        "text": "you",
        "ms": 11415
      },
      {
        "text": "first",
        "ms": 11415
      },
      {
        "text": "open",
        "ms": 11655
      },
      {
        "text": "up",
        "ms": 11875
      },
      {
        "text": "the",
        "ms": 11975
      },
      {
        "text": "app,",
        "ms": 12175
      },
      {
        "text": "you'll",
        "ms": 12335
      },
      {
        "text": "have",
        "ms": 12615
      },
      {
        "text": "a",
        "ms": 12775
      },
      {
        "text": "nice",
        "ms": 12775
      },
      {
        "text": "little",
        "ms": 13015
      },
      {
        "text": "walkthrough.",
        "ms": 13175
      },
      {
        "text": "You",
        "ms": 13955
      },
      {
        "text": "can",
        "ms": 15075
      },
      {
        "text": "close",
        "ms": 15355
      },
      {
        "text": "this",
        "ms": 15695
      },
      {
        "text": "out",
        "ms": 15895
      },
      {
        "text": "or",
        "ms": 16155
      },
      {
        "text": "review",
        "ms": 16315
      },
      {
        "text": "it.",
        "ms": 16735
      },
      {
        "text": "If",
        "ms": 17275
      },
      {
        "text": "you",
        "ms": 17495
      },
      {
        "text": "ever",
        "ms": 17655
      },
      {
        "text": "want",
        "ms": 17955
      },
      {
        "text": "to",
        "ms": 18095
      },
      {
        "text": "get",
        "ms": 18418
      },
      {
        "text": "back",
        "ms": 18598
      },
      {
        "text": "to",
        "ms": 18838
      },
      {
        "text": "it,",
        "ms": 19018
      },
      {
        "text": "you",
        "ms": 19258
      },
      {
        "text": "can",
        "ms": 19258
      },
      {
        "text": "go",
        "ms": 19378
      },
      {
        "text": "into",
        "ms": 19778
      },
      {
        "text": "settings",
        "ms": 20058
      },
      {
        "text": "here",
        "ms": 20578
      },
      {
        "text": "and",
        "ms": 21398
      },
      {
        "text": "click",
        "ms": 21611
      },
      {
        "text": "on",
        "ms": 21836
      },
      {
        "text": "the",
        "ms": 21936
      },
      {
        "text": "quick",
        "ms": 22016
      },
      {
        "text": "start.",
        "ms": 22276
      }
    ],
    "ai-intro": [
      {
        "text": "The",
        "ms": 24765
      },
      {
        "text": "first",
        "ms": 24865
      },
      {
        "text": "thing",
        "ms": 25025
      },
      {
        "text": "you'll",
        "ms": 25145
      },
      {
        "text": "see",
        "ms": 25365
      },
      {
        "text": "when",
        "ms": 26405
      },
      {
        "text": "you",
        "ms": 26525
      },
      {
        "text": "open",
        "ms": 26705
      },
      {
        "text": "up",
        "ms": 26885
      },
      {
        "text": "the",
        "ms": 27005
      },
      {
        "text": "app",
        "ms": 27205
      },
      {
        "text": "is",
        "ms": 27605
      },
      {
        "text": "our",
        "ms": 27845
      },
      {
        "text": "CTRLbot",
        "ms": 28205
      },
      {
        "text": ".ai.",
        "ms": 29093
      }
    ],
    "ai-manual": [
      {
        "text": "And",
        "ms": 30268
      },
      {
        "text": "this",
        "ms": 30408
      },
      {
        "text": "is",
        "ms": 30668
      },
      {
        "text": "going",
        "ms": 31368
      },
      {
        "text": "to",
        "ms": 31648
      },
      {
        "text": "help",
        "ms": 31808
      },
      {
        "text": "you",
        "ms": 32048
      },
      {
        "text": "figure",
        "ms": 32628
      },
      {
        "text": "out",
        "ms": 32928
      },
      {
        "text": "and",
        "ms": 33173
      },
      {
        "text": "troubleshoot",
        "ms": 33428
      },
      {
        "text": "things",
        "ms": 33928
      },
      {
        "text": "and",
        "ms": 34528
      },
      {
        "text": "also",
        "ms": 34668
      },
      {
        "text": "is",
        "ms": 35228
      },
      {
        "text": "a",
        "ms": 35616
      },
      {
        "text": "living",
        "ms": 35696
      },
      {
        "text": "manual.",
        "ms": 36719
      }
    ],
    "ai-help": [
      {
        "text": "So",
        "ms": 37714
      },
      {
        "text": "anything,",
        "ms": 37974
      },
      {
        "text": "any",
        "ms": 38614
      },
      {
        "text": "questions",
        "ms": 38794
      },
      {
        "text": "you",
        "ms": 39134
      },
      {
        "text": "have",
        "ms": 39294
      },
      {
        "text": "about",
        "ms": 39627
      },
      {
        "text": "the",
        "ms": 39847
      },
      {
        "text": "application",
        "ms": 39967
      },
      {
        "text": "or",
        "ms": 40867
      },
      {
        "text": "how",
        "ms": 40987
      },
      {
        "text": "to",
        "ms": 41147
      },
      {
        "text": "set",
        "ms": 41227
      },
      {
        "text": "it",
        "ms": 41407
      },
      {
        "text": "up,",
        "ms": 41547
      },
      {
        "text": "you",
        "ms": 41547
      },
      {
        "text": "can",
        "ms": 41607
      },
      {
        "text": "just",
        "ms": 42235
      },
      {
        "text": "put",
        "ms": 42655
      },
      {
        "text": "in",
        "ms": 42815
      },
      {
        "text": "right",
        "ms": 42955
      },
      {
        "text": "here.",
        "ms": 43170
      }
    ],
    "db-devices": [
      {
        "text": "It",
        "ms": 46830
      },
      {
        "text": "all",
        "ms": 46930
      },
      {
        "text": "begins",
        "ms": 47130
      },
      {
        "text": "with",
        "ms": 47490
      },
      {
        "text": "adding",
        "ms": 47690
      },
      {
        "text": "devices,",
        "ms": 47950
      },
      {
        "text": "right?",
        "ms": 48970
      },
      {
        "text": "And",
        "ms": 49480
      },
      {
        "text": "we",
        "ms": 49580
      },
      {
        "text": "have",
        "ms": 49680
      },
      {
        "text": "an",
        "ms": 49820
      },
      {
        "text": "extensive",
        "ms": 49920
      },
      {
        "text": "device",
        "ms": 50633
      },
      {
        "text": "driver",
        "ms": 51108
      },
      {
        "text": "library",
        "ms": 51468
      },
      {
        "text": "of",
        "ms": 52528
      },
      {
        "text": "IP",
        "ms": 52808
      },
      {
        "text": "RS",
        "ms": 53548
      },
      {
        "text": "-232",
        "ms": 53728
      },
      {
        "text": "and",
        "ms": 54648
      },
      {
        "text": "IR",
        "ms": 55068
      },
      {
        "text": "as",
        "ms": 55248
      },
      {
        "text": "well.",
        "ms": 55428
      }
    ],
    "db-sorting": [
      {
        "text": "In",
        "ms": 56113
      },
      {
        "text": "order",
        "ms": 56173
      },
      {
        "text": "to",
        "ms": 56353
      },
      {
        "text": "use",
        "ms": 56653
      },
      {
        "text": "RS",
        "ms": 56913
      },
      {
        "text": "-232",
        "ms": 57133
      },
      {
        "text": "or",
        "ms": 57993
      },
      {
        "text": "IR,",
        "ms": 58506
      },
      {
        "text": "you'll",
        "ms": 58926
      },
      {
        "text": "have",
        "ms": 59446
      },
      {
        "text": "to",
        "ms": 59666
      },
      {
        "text": "use",
        "ms": 59866
      },
      {
        "text": "one",
        "ms": 60126
      },
      {
        "text": "of",
        "ms": 60266
      },
      {
        "text": "our",
        "ms": 60386
      },
      {
        "text": "endpoints",
        "ms": 60586
      },
      {
        "text": "and",
        "ms": 61514
      },
      {
        "text": "you",
        "ms": 61634
      },
      {
        "text": "can",
        "ms": 61774
      },
      {
        "text": "always",
        "ms": 62154
      },
      {
        "text": "sort",
        "ms": 62414
      },
      {
        "text": "these",
        "ms": 62654
      },
      {
        "text": "things",
        "ms": 62854
      },
      {
        "text": "out",
        "ms": 63274
      },
      {
        "text": "through",
        "ms": 63622
      },
      {
        "text": "our",
        "ms": 64280
      },
      {
        "text": "sorting",
        "ms": 64420
      },
      {
        "text": "right",
        "ms": 64760
      },
      {
        "text": "here.",
        "ms": 65260
      }
    ],
    "epson-add": [
      {
        "text": "Let's",
        "ms": 69860
      },
      {
        "text": "just",
        "ms": 70080
      },
      {
        "text": "add",
        "ms": 70300
      },
      {
        "text": "a",
        "ms": 70440
      },
      {
        "text": "projector.",
        "ms": 70520
      }
    ],
    "epson-info": [
      {
        "text": "And",
        "ms": 71560
      },
      {
        "text": "you",
        "ms": 71640
      },
      {
        "text": "can",
        "ms": 71720
      },
      {
        "text": "see",
        "ms": 71880
      },
      {
        "text": "when",
        "ms": 72040
      },
      {
        "text": "I",
        "ms": 72200
      },
      {
        "text": "click",
        "ms": 72300
      },
      {
        "text": "on",
        "ms": 72760
      },
      {
        "text": "the",
        "ms": 73120
      },
      {
        "text": "actual",
        "ms": 73300
      },
      {
        "text": "projector,",
        "ms": 73600
      },
      {
        "text": "it",
        "ms": 74540
      },
      {
        "text": "opens",
        "ms": 74640
      },
      {
        "text": "up",
        "ms": 74960
      },
      {
        "text": "this",
        "ms": 75100
      },
      {
        "text": "nice",
        "ms": 75300
      },
      {
        "text": "little",
        "ms": 75540
      },
      {
        "text": "page",
        "ms": 75780
      },
      {
        "text": "and",
        "ms": 76160
      },
      {
        "text": "gives",
        "ms": 76260
      },
      {
        "text": "you",
        "ms": 76400
      },
      {
        "text": "all",
        "ms": 76560
      },
      {
        "text": "kinds",
        "ms": 76720
      },
      {
        "text": "of",
        "ms": 76980
      },
      {
        "text": "great",
        "ms": 77120
      },
      {
        "text": "information.",
        "ms": 77380
      }
    ],
    "epson-webpage": [
      {
        "text": "If",
        "ms": 78575
      },
      {
        "text": "I",
        "ms": 78735
      },
      {
        "text": "want,",
        "ms": 78815
      },
      {
        "text": "I",
        "ms": 79095
      },
      {
        "text": "can",
        "ms": 79175
      },
      {
        "text": "go",
        "ms": 79355
      },
      {
        "text": "to",
        "ms": 79495
      },
      {
        "text": "the",
        "ms": 79735
      },
      {
        "text": "manufacturer",
        "ms": 79735
      },
      {
        "text": "webpage",
        "ms": 80648
      },
      {
        "text": "right",
        "ms": 81228
      },
      {
        "text": "here,",
        "ms": 81791
      },
      {
        "text": "and",
        "ms": 82579
      },
      {
        "text": "I",
        "ms": 82759
      },
      {
        "text": "can",
        "ms": 82899
      },
      {
        "text": "also",
        "ms": 83039
      },
      {
        "text": "go",
        "ms": 83299
      },
      {
        "text": "to",
        "ms": 83339
      },
      {
        "text": "the",
        "ms": 83439
      },
      {
        "text": "product",
        "ms": 83539
      },
      {
        "text": "page",
        "ms": 84019
      },
      {
        "text": "as",
        "ms": 84879
      },
      {
        "text": "well.",
        "ms": 85019
      }
    ],
    "epson-connection": [
      {
        "text": "And",
        "ms": 86084
      },
      {
        "text": "down",
        "ms": 86204
      },
      {
        "text": "here,",
        "ms": 86424
      },
      {
        "text": "you",
        "ms": 86624
      },
      {
        "text": "can",
        "ms": 86764
      },
      {
        "text": "see",
        "ms": 86964
      },
      {
        "text": "all",
        "ms": 87672
      },
      {
        "text": "kinds",
        "ms": 87852
      },
      {
        "text": "of",
        "ms": 88092
      },
      {
        "text": "all",
        "ms": 88512
      },
      {
        "text": "the",
        "ms": 88692
      },
      {
        "text": "information",
        "ms": 88812
      },
      {
        "text": "that",
        "ms": 89332
      },
      {
        "text": "you",
        "ms": 89512
      },
      {
        "text": "need",
        "ms": 89652
      },
      {
        "text": "to",
        "ms": 90245
      },
      {
        "text": "make",
        "ms": 90385
      },
      {
        "text": "the",
        "ms": 90585
      },
      {
        "text": "connection.",
        "ms": 90685
      }
    ],
    "add-ip": [
      {
        "text": "Just",
        "ms": 93330
      },
      {
        "text": "hitting",
        "ms": 93750
      },
      {
        "text": "plus",
        "ms": 94110
      },
      {
        "text": "will",
        "ms": 94870
      },
      {
        "text": "take",
        "ms": 94950
      },
      {
        "text": "you",
        "ms": 95130
      },
      {
        "text": "to",
        "ms": 95270
      },
      {
        "text": "this",
        "ms": 95390
      },
      {
        "text": "page.",
        "ms": 95590
      },
      {
        "text": "And",
        "ms": 96610
      },
      {
        "text": "then",
        "ms": 96690
      },
      {
        "text": "we",
        "ms": 96910
      },
      {
        "text": "can",
        "ms": 97010
      },
      {
        "text": "just",
        "ms": 97150
      },
      {
        "text": "put",
        "ms": 97350
      },
      {
        "text": "in",
        "ms": 97650
      },
      {
        "text": "the",
        "ms": 98083
      },
      {
        "text": "IP",
        "ms": 98193
      },
      {
        "text": "address",
        "ms": 98393
      },
      {
        "text": "of",
        "ms": 99053
      },
      {
        "text": "our",
        "ms": 99371
      },
      {
        "text": "projector.",
        "ms": 99531
      }
    ],
    "add-saved": [
      {
        "text": "Pressing",
        "ms": 100461
      },
      {
        "text": "connect,",
        "ms": 100941
      },
      {
        "text": "once",
        "ms": 101681
      },
      {
        "text": "that",
        "ms": 101821
      },
      {
        "text": "connection",
        "ms": 101961
      },
      {
        "text": "is",
        "ms": 102421
      },
      {
        "text": "made,",
        "ms": 102581
      },
      {
        "text": "it",
        "ms": 103061
      },
      {
        "text": "automatically",
        "ms": 103141
      },
      {
        "text": "saves",
        "ms": 103841
      },
      {
        "text": "that",
        "ms": 104321
      },
      {
        "text": "connection.",
        "ms": 104461
      },
      {
        "text": "So",
        "ms": 105321
      },
      {
        "text": "you",
        "ms": 105481
      },
      {
        "text": "don't",
        "ms": 105661
      },
      {
        "text": "have",
        "ms": 106101
      },
      {
        "text": "to",
        "ms": 106221
      },
      {
        "text": "actually",
        "ms": 106501
      },
      {
        "text": "hit",
        "ms": 106821
      },
      {
        "text": "a",
        "ms": 107021
      },
      {
        "text": "save",
        "ms": 107101
      },
      {
        "text": "button.",
        "ms": 107361
      }
    ],
    "term-commands": [
      {
        "text": "And",
        "ms": 109270
      },
      {
        "text": "if",
        "ms": 109370
      },
      {
        "text": "you",
        "ms": 109450
      },
      {
        "text": "want,",
        "ms": 109590
      },
      {
        "text": "you",
        "ms": 109770
      },
      {
        "text": "can",
        "ms": 109890
      },
      {
        "text": "test",
        "ms": 110818
      },
      {
        "text": "some",
        "ms": 111598
      },
      {
        "text": "of",
        "ms": 111778
      },
      {
        "text": "these",
        "ms": 111858
      },
      {
        "text": "commands",
        "ms": 112098
      },
      {
        "text": "right",
        "ms": 112638
      },
      {
        "text": "here.",
        "ms": 112973
      }
    ],
    "test-device": [
      {
        "text": "If",
        "ms": 114800
      },
      {
        "text": "you",
        "ms": 114880
      },
      {
        "text": "need",
        "ms": 115020
      },
      {
        "text": "to",
        "ms": 115220
      },
      {
        "text": "test",
        "ms": 115360
      },
      {
        "text": "the",
        "ms": 115620
      },
      {
        "text": "actual",
        "ms": 115740
      },
      {
        "text": "device,",
        "ms": 116040
      },
      {
        "text": "we",
        "ms": 116840
      },
      {
        "text": "have",
        "ms": 116920
      },
      {
        "text": "a",
        "ms": 117080
      },
      {
        "text": "little",
        "ms": 117160
      },
      {
        "text": "device",
        "ms": 117420
      },
      {
        "text": "testing",
        "ms": 118038
      },
      {
        "text": "page.",
        "ms": 118478
      },
      {
        "text": "There's",
        "ms": 118758
      },
      {
        "text": "like",
        "ms": 119168
      },
      {
        "text": "a",
        "ms": 119348
      },
      {
        "text": "tech",
        "ms": 119428
      },
      {
        "text": "page,",
        "ms": 119668
      },
      {
        "text": "right?",
        "ms": 120228
      },
      {
        "text": "So",
        "ms": 120408
      },
      {
        "text": "all",
        "ms": 120588
      },
      {
        "text": "the",
        "ms": 120748
      },
      {
        "text": "devices",
        "ms": 120828
      },
      {
        "text": "that",
        "ms": 121288
      },
      {
        "text": "you",
        "ms": 121508
      },
      {
        "text": "add",
        "ms": 121948
      },
      {
        "text": "to",
        "ms": 122463
      },
      {
        "text": "the",
        "ms": 122508
      },
      {
        "text": "system",
        "ms": 122668
      },
      {
        "text": "will",
        "ms": 123008
      },
      {
        "text": "be",
        "ms": 123168
      },
      {
        "text": "listed",
        "ms": 123268
      },
      {
        "text": "right",
        "ms": 123508
      },
      {
        "text": "here.",
        "ms": 123728
      }
    ],
    "test-remote": [
      {
        "text": "And",
        "ms": 124513
      },
      {
        "text": "then",
        "ms": 124593
      },
      {
        "text": "you",
        "ms": 124713
      },
      {
        "text": "can",
        "ms": 124813
      },
      {
        "text": "go",
        "ms": 124973
      },
      {
        "text": "through",
        "ms": 125153
      },
      {
        "text": "and",
        "ms": 125973
      },
      {
        "text": "test",
        "ms": 126286
      },
      {
        "text": "it",
        "ms": 126556
      },
      {
        "text": "out.",
        "ms": 126776
      }
    ],
    "test-switcher": [
      {
        "text": "And",
        "ms": 127401
      },
      {
        "text": "here's",
        "ms": 127521
      },
      {
        "text": "what",
        "ms": 127929
      },
      {
        "text": "it",
        "ms": 128109
      },
      {
        "text": "looked",
        "ms": 128269
      },
      {
        "text": "like",
        "ms": 128489
      },
      {
        "text": "as",
        "ms": 128709
      },
      {
        "text": "a",
        "ms": 128849
      },
      {
        "text": "switcher,",
        "ms": 128909
      },
      {
        "text": "right?",
        "ms": 129329
      }
    ],
    "test-terminal": [
      {
        "text": "And",
        "ms": 130222
      },
      {
        "text": "here's",
        "ms": 130302
      },
      {
        "text": "a",
        "ms": 130562
      },
      {
        "text": "terminal,",
        "ms": 130642
      },
      {
        "text": "always",
        "ms": 131442
      },
      {
        "text": "available",
        "ms": 131762
      },
      {
        "text": "so",
        "ms": 132382
      },
      {
        "text": "that",
        "ms": 132582
      },
      {
        "text": "you",
        "ms": 132582
      },
      {
        "text": "can",
        "ms": 132702
      },
      {
        "text": "always",
        "ms": 132822
      },
      {
        "text": "communicate",
        "ms": 133042
      },
      {
        "text": "with",
        "ms": 133562
      },
      {
        "text": "the",
        "ms": 133682
      },
      {
        "text": "device",
        "ms": 133782
      },
      {
        "text": "and",
        "ms": 134702
      },
      {
        "text": "test",
        "ms": 134890
      },
      {
        "text": "any",
        "ms": 135190
      },
      {
        "text": "of",
        "ms": 135350
      },
      {
        "text": "these",
        "ms": 135450
      },
      {
        "text": "commands.",
        "ms": 135670
      }
    ],
    "test-webpage": [
      {
        "text": "Also,",
        "ms": 136655
      },
      {
        "text": "if",
        "ms": 137035
      },
      {
        "text": "the",
        "ms": 137135
      },
      {
        "text": "device",
        "ms": 137215
      },
      {
        "text": "has",
        "ms": 137535
      },
      {
        "text": "a",
        "ms": 137775
      },
      {
        "text": "webpage,",
        "ms": 137775
      },
      {
        "text": "it'll",
        "ms": 138415
      },
      {
        "text": "take",
        "ms": 138635
      },
      {
        "text": "you",
        "ms": 138795
      },
      {
        "text": "to",
        "ms": 138975
      },
      {
        "text": "that",
        "ms": 139115
      },
      {
        "text": "webpage",
        "ms": 139315
      },
      {
        "text": "right",
        "ms": 139995
      },
      {
        "text": "here.",
        "ms": 140195
      }
    ],
    "act-next": [
      {
        "text": "The",
        "ms": 142750
      },
      {
        "text": "next",
        "ms": 142860
      },
      {
        "text": "step",
        "ms": 143040
      },
      {
        "text": "is",
        "ms": 143340
      },
      {
        "text": "going",
        "ms": 143500
      },
      {
        "text": "to",
        "ms": 143740
      },
      {
        "text": "be",
        "ms": 143820
      },
      {
        "text": "setting",
        "ms": 144020
      },
      {
        "text": "up",
        "ms": 144360
      },
      {
        "text": "the",
        "ms": 144620
      },
      {
        "text": "activities.",
        "ms": 144760
      },
      {
        "text": "And",
        "ms": 145940
      },
      {
        "text": "these",
        "ms": 146220
      },
      {
        "text": "activities",
        "ms": 146700
      },
      {
        "text": "form",
        "ms": 147538
      },
      {
        "text": "themselves,",
        "ms": 147858
      },
      {
        "text": "right?",
        "ms": 149016
      }
    ],
    "act-customize": [
      {
        "text": "So",
        "ms": 149686
      },
      {
        "text": "there",
        "ms": 149686
      },
      {
        "text": "isn't",
        "ms": 149896
      },
      {
        "text": "a",
        "ms": 150216
      },
      {
        "text": "whole",
        "ms": 150336
      },
      {
        "text": "lot",
        "ms": 150656
      },
      {
        "text": "that",
        "ms": 151256
      },
      {
        "text": "you",
        "ms": 151496
      },
      {
        "text": "have",
        "ms": 151914
      },
      {
        "text": "to",
        "ms": 152194
      },
      {
        "text": "do,",
        "ms": 152354
      },
      {
        "text": "but",
        "ms": 153087
      },
      {
        "text": "of",
        "ms": 153387
      },
      {
        "text": "course",
        "ms": 153567
      },
      {
        "text": "you",
        "ms": 153847
      },
      {
        "text": "can",
        "ms": 153987
      },
      {
        "text": "customize",
        "ms": 154167
      },
      {
        "text": "this",
        "ms": 154687
      },
      {
        "text": "any",
        "ms": 155027
      },
      {
        "text": "way",
        "ms": 155207
      },
      {
        "text": "you",
        "ms": 155387
      },
      {
        "text": "want.",
        "ms": 155547
      }
    ],
    "act-presets": [
      {
        "text": "And",
        "ms": 156292
      },
      {
        "text": "so",
        "ms": 156412
      },
      {
        "text": "you",
        "ms": 156532
      },
      {
        "text": "have",
        "ms": 156712
      },
      {
        "text": "your",
        "ms": 157112
      },
      {
        "text": "power",
        "ms": 157272
      },
      {
        "text": "presets,",
        "ms": 157652
      },
      {
        "text": "right?",
        "ms": 158092
      }
    ],
    "switch-projector": [
      {
        "text": "You",
        "ms": 161750
      },
      {
        "text": "can",
        "ms": 161915
      },
      {
        "text": "see",
        "ms": 162035
      },
      {
        "text": "how",
        "ms": 162215
      },
      {
        "text": "our",
        "ms": 162995
      },
      {
        "text": "projector",
        "ms": 163235
      },
      {
        "text": "already",
        "ms": 163735
      },
      {
        "text": "turned",
        "ms": 164015
      },
      {
        "text": "on",
        "ms": 164315
      },
      {
        "text": "and",
        "ms": 164355
      },
      {
        "text": "off,",
        "ms": 164615
      }
    ],
    "switch-assign": [
      {
        "text": "you",
        "ms": 165280
      },
      {
        "text": "can",
        "ms": 165380
      },
      {
        "text": "assign",
        "ms": 165600
      },
      {
        "text": "a",
        "ms": 165960
      },
      {
        "text": "switcher,",
        "ms": 166080
      },
      {
        "text": "and",
        "ms": 167118
      },
      {
        "text": "the",
        "ms": 167238
      },
      {
        "text": "Epson",
        "ms": 167358
      },
      {
        "text": "has",
        "ms": 167698
      },
      {
        "text": "been",
        "ms": 167838
      },
      {
        "text": "selected",
        "ms": 168298
      },
      {
        "text": "as",
        "ms": 168818
      },
      {
        "text": "the",
        "ms": 169018
      },
      {
        "text": "switcher,",
        "ms": 169158
      },
      {
        "text": "and",
        "ms": 170374
      },
      {
        "text": "then",
        "ms": 170474
      },
      {
        "text": "you",
        "ms": 170594
      },
      {
        "text": "can",
        "ms": 170694
      },
      {
        "text": "assign",
        "ms": 170854
      },
      {
        "text": "the",
        "ms": 171354
      },
      {
        "text": "audio",
        "ms": 171574
      },
      {
        "text": "levels.",
        "ms": 172094
      }
    ],
    "switch-eui": [
      {
        "text": "And",
        "ms": 173014
      },
      {
        "text": "these",
        "ms": 173114
      },
      {
        "text": "are",
        "ms": 173274
      },
      {
        "text": "all",
        "ms": 173514
      },
      {
        "text": "what's",
        "ms": 173694
      },
      {
        "text": "going",
        "ms": 173934
      },
      {
        "text": "to",
        "ms": 174094
      },
      {
        "text": "get",
        "ms": 174194
      },
      {
        "text": "set",
        "ms": 174454
      },
      {
        "text": "up",
        "ms": 174754
      },
      {
        "text": "for",
        "ms": 175102
      },
      {
        "text": "the",
        "ms": 175202
      },
      {
        "text": "end",
        "ms": 175442
      },
      {
        "text": "user",
        "ms": 175802
      },
      {
        "text": "interface.",
        "ms": 176182
      }
    ],
    "eui-setup": [
      {
        "text": "And",
        "ms": 178270
      },
      {
        "text": "once",
        "ms": 178410
      },
      {
        "text": "you",
        "ms": 178550
      },
      {
        "text": "have",
        "ms": 178710
      },
      {
        "text": "all",
        "ms": 178890
      },
      {
        "text": "this",
        "ms": 179070
      },
      {
        "text": "set",
        "ms": 179210
      },
      {
        "text": "up,",
        "ms": 179510
      },
      {
        "text": "you",
        "ms": 179730
      },
      {
        "text": "click",
        "ms": 180090
      },
      {
        "text": "on",
        "ms": 180330
      },
      {
        "text": "the",
        "ms": 180410
      },
      {
        "text": "end",
        "ms": 180530
      },
      {
        "text": "user",
        "ms": 180710
      },
      {
        "text": "interface,",
        "ms": 180950
      },
      {
        "text": "and",
        "ms": 182030
      },
      {
        "text": "then",
        "ms": 182170
      },
      {
        "text": "this",
        "ms": 182650
      },
      {
        "text": "locks",
        "ms": 182890
      },
      {
        "text": "it",
        "ms": 183270
      },
      {
        "text": "down",
        "ms": 183390
      },
      {
        "text": "for",
        "ms": 184178
      },
      {
        "text": "the",
        "ms": 184438
      },
      {
        "text": "actual",
        "ms": 184618
      },
      {
        "text": "end",
        "ms": 184978
      },
      {
        "text": "user,",
        "ms": 185238
      },
      {
        "text": "right?",
        "ms": 185898
      },
      {
        "text": "And",
        "ms": 186598
      },
      {
        "text": "you",
        "ms": 186758
      },
      {
        "text": "can",
        "ms": 186898
      },
      {
        "text": "test",
        "ms": 187058
      },
      {
        "text": "it",
        "ms": 187358
      },
      {
        "text": "as",
        "ms": 187518
      },
      {
        "text": "the",
        "ms": 187698
      },
      {
        "text": "technician.",
        "ms": 187838
      }
    ],
    "eui-technician": [
      {
        "text": "and",
        "ms": 188628
      },
      {
        "text": "you",
        "ms": 189191
      },
      {
        "text": "can",
        "ms": 189431
      },
      {
        "text": "see",
        "ms": 189431
      },
      {
        "text": "my",
        "ms": 189811
      },
      {
        "text": "TV,",
        "ms": 190119
      },
      {
        "text": "my",
        "ms": 191200
      },
      {
        "text": "projector",
        "ms": 191380
      },
      {
        "text": "is",
        "ms": 191800
      },
      {
        "text": "switching,",
        "ms": 191880
      }
    ],
    "eui-volume-mute": [
      {
        "text": "and",
        "ms": 193150
      },
      {
        "text": "I",
        "ms": 193543
      },
      {
        "text": "can",
        "ms": 193623
      },
      {
        "text": "change",
        "ms": 193943
      },
      {
        "text": "the",
        "ms": 194223
      },
      {
        "text": "volume,",
        "ms": 194343
      },
      {
        "text": "I",
        "ms": 196431
      },
      {
        "text": "can",
        "ms": 196531
      },
      {
        "text": "mute",
        "ms": 196691
      },
      {
        "text": "it,",
        "ms": 197031
      }
    ],
    "eui-power": [
      {
        "text": "and",
        "ms": 197641
      },
      {
        "text": "I",
        "ms": 197761
      },
      {
        "text": "can",
        "ms": 197841
      },
      {
        "text": "power",
        "ms": 197981
      },
      {
        "text": "the",
        "ms": 198241
      },
      {
        "text": "system",
        "ms": 198361
      },
      {
        "text": "down.",
        "ms": 198741
      }
    ],
    "exit-hold": [
      {
        "text": "Anytime",
        "ms": 203270
      },
      {
        "text": "I",
        "ms": 203650
      },
      {
        "text": "need",
        "ms": 203710
      },
      {
        "text": "to",
        "ms": 203910
      },
      {
        "text": "go",
        "ms": 204030
      },
      {
        "text": "back",
        "ms": 204230
      },
      {
        "text": "and",
        "ms": 204570
      },
      {
        "text": "change",
        "ms": 204730
      },
      {
        "text": "anything,",
        "ms": 205050
      },
      {
        "text": "I",
        "ms": 205810
      },
      {
        "text": "just",
        "ms": 205890
      },
      {
        "text": "press",
        "ms": 206030
      },
      {
        "text": "and",
        "ms": 206270
      },
      {
        "text": "hold",
        "ms": 206430
      },
      {
        "text": "the",
        "ms": 206770
      },
      {
        "text": "little",
        "ms": 206870
      },
      {
        "text": "setup",
        "ms": 207150
      },
      {
        "text": "button,",
        "ms": 207450
      },
      {
        "text": "and",
        "ms": 208403
      },
      {
        "text": "it'll",
        "ms": 208483
      },
      {
        "text": "take",
        "ms": 208643
      },
      {
        "text": "me",
        "ms": 208803
      },
      {
        "text": "right",
        "ms": 208923
      },
      {
        "text": "back",
        "ms": 209123
      },
      {
        "text": "here.",
        "ms": 209343
      }
    ],
    "discovery-devices": [
      {
        "text": "Let's",
        "ms": 211285
      },
      {
        "text": "go",
        "ms": 211405
      },
      {
        "text": "ahead",
        "ms": 211585
      },
      {
        "text": "and",
        "ms": 211825
      },
      {
        "text": "add",
        "ms": 212005
      },
      {
        "text": "some",
        "ms": 212245
      },
      {
        "text": "more",
        "ms": 212665
      },
      {
        "text": "devices.",
        "ms": 212845
      }
    ],
    "discovery-scan": [
      {
        "text": "You",
        "ms": 213830
      },
      {
        "text": "see",
        "ms": 213960
      },
      {
        "text": "up",
        "ms": 214140
      },
      {
        "text": "in",
        "ms": 214260
      },
      {
        "text": "the",
        "ms": 214360
      },
      {
        "text": "corner,",
        "ms": 214500
      },
      {
        "text": "there's",
        "ms": 214880
      },
      {
        "text": "a",
        "ms": 215460
      },
      {
        "text": "little",
        "ms": 215520
      },
      {
        "text": "discovery",
        "ms": 215780
      },
      {
        "text": "feature.",
        "ms": 216563
      },
      {
        "text": "Clicking",
        "ms": 217603
      },
      {
        "text": "on",
        "ms": 217983
      },
      {
        "text": "it,",
        "ms": 218103
      },
      {
        "text": "you",
        "ms": 218611
      },
      {
        "text": "can",
        "ms": 218811
      },
      {
        "text": "see",
        "ms": 218811
      },
      {
        "text": "it",
        "ms": 219384
      },
      {
        "text": "scans",
        "ms": 219604
      },
      {
        "text": "a",
        "ms": 220124
      },
      {
        "text": "whole",
        "ms": 220204
      },
      {
        "text": "network",
        "ms": 220424
      },
      {
        "text": "and",
        "ms": 221512
      },
      {
        "text": "tries",
        "ms": 221652
      },
      {
        "text": "to",
        "ms": 221972
      },
      {
        "text": "find",
        "ms": 222112
      },
      {
        "text": "a",
        "ms": 222352
      },
      {
        "text": "match",
        "ms": 222492
      },
      {
        "text": "for",
        "ms": 223072
      },
      {
        "text": "the",
        "ms": 223372
      },
      {
        "text": "devices",
        "ms": 223492
      },
      {
        "text": "that",
        "ms": 223992
      },
      {
        "text": "are",
        "ms": 224132
      },
      {
        "text": "on",
        "ms": 224332
      },
      {
        "text": "the",
        "ms": 224432
      },
      {
        "text": "network",
        "ms": 224552
      },
      {
        "text": "that",
        "ms": 225488
      },
      {
        "text": "are",
        "ms": 225668
      },
      {
        "text": "also",
        "ms": 225908
      },
      {
        "text": "in",
        "ms": 226408
      },
      {
        "text": "the",
        "ms": 226788
      },
      {
        "text": "device",
        "ms": 226888
      },
      {
        "text": "driver",
        "ms": 227506
      },
      {
        "text": "database.",
        "ms": 228106
      }
    ],
    "matrox-endpoints": [
      {
        "text": "And",
        "ms": 231390
      },
      {
        "text": "so",
        "ms": 231610
      },
      {
        "text": "we",
        "ms": 232150
      },
      {
        "text": "have",
        "ms": 232270
      },
      {
        "text": "a",
        "ms": 232470
      },
      {
        "text": "few",
        "ms": 232550
      },
      {
        "text": "of",
        "ms": 233303
      },
      {
        "text": "Matrox",
        "ms": 233596
      },
      {
        "text": "endpoints,",
        "ms": 234689
      },
      {
        "text": "right?",
        "ms": 235709
      }
    ],
    "matrox-ipmx": [
      {
        "text": "And",
        "ms": 236404
      },
      {
        "text": "these",
        "ms": 236524
      },
      {
        "text": "use",
        "ms": 237024
      },
      {
        "text": "IPMX,",
        "ms": 237684
      }
    ],
    "matrox-add-these": [
      {
        "text": "So",
        "ms": 238934
      },
      {
        "text": "let's",
        "ms": 238994
      },
      {
        "text": "just",
        "ms": 239274
      },
      {
        "text": "add",
        "ms": 239614
      },
      {
        "text": "these.",
        "ms": 239754
      },
      {
        "text": "And",
        "ms": 240219
      },
      {
        "text": "one",
        "ms": 241102
      },
      {
        "text": "click,",
        "ms": 241302
      },
      {
        "text": "all",
        "ms": 241682
      },
      {
        "text": "you",
        "ms": 241862
      },
      {
        "text": "need.",
        "ms": 242002
      }
    ],
    "matrox-one-click": [
      {
        "text": "If",
        "ms": 242752
      },
      {
        "text": "there's",
        "ms": 242832
      },
      {
        "text": "setup",
        "ms": 243052
      },
      {
        "text": "information,",
        "ms": 243372
      },
      {
        "text": "like",
        "ms": 244572
      },
      {
        "text": "a",
        "ms": 244852
      },
      {
        "text": "login,",
        "ms": 244932
      },
      {
        "text": "or",
        "ms": 246360
      },
      {
        "text": "any",
        "ms": 246680
      },
      {
        "text": "kind",
        "ms": 246840
      },
      {
        "text": "of",
        "ms": 247080
      },
      {
        "text": "certificates",
        "ms": 247283
      },
      {
        "text": "that",
        "ms": 247963
      },
      {
        "text": "need",
        "ms": 248023
      },
      {
        "text": "to",
        "ms": 248263
      },
      {
        "text": "be",
        "ms": 248403
      },
      {
        "text": "authorized,",
        "ms": 248663
      },
      {
        "text": "they'll",
        "ms": 249483
      },
      {
        "text": "pop",
        "ms": 249703
      },
      {
        "text": "up",
        "ms": 250003
      },
      {
        "text": "automatically",
        "ms": 250183
      },
      {
        "text": "and",
        "ms": 251263
      },
      {
        "text": "await",
        "ms": 251991
      },
      {
        "text": "your",
        "ms": 252251
      },
      {
        "text": "approval,",
        "ms": 252451
      },
      {
        "text": "and",
        "ms": 253621
      },
      {
        "text": "it'll",
        "ms": 254061
      },
      {
        "text": "let",
        "ms": 254341
      },
      {
        "text": "you",
        "ms": 254481
      },
      {
        "text": "log",
        "ms": 254741
      },
      {
        "text": "in",
        "ms": 255181
      },
      {
        "text": "and",
        "ms": 255957
      },
      {
        "text": "change",
        "ms": 256290
      },
      {
        "text": "those",
        "ms": 256790
      },
      {
        "text": "values.",
        "ms": 257150
      }
    ],
    "matrox-test-individual": [
      {
        "text": "click",
        "ms": 261775
      },
      {
        "text": "on",
        "ms": 262015
      },
      {
        "text": "each",
        "ms": 262255
      },
      {
        "text": "individual",
        "ms": 262515
      }
    ],
    "matrox-test-switch": [
      {
        "text": "encoder",
        "ms": 264090
      },
      {
        "text": "or",
        "ms": 264470
      },
      {
        "text": "decoder,",
        "ms": 264630
      },
      {
        "text": "or",
        "ms": 265810
      },
      {
        "text": "you",
        "ms": 265990
      },
      {
        "text": "can",
        "ms": 266130
      },
      {
        "text": "switch",
        "ms": 266510
      },
      {
        "text": "and",
        "ms": 266850
      },
      {
        "text": "test",
        "ms": 266990
      },
      {
        "text": "right",
        "ms": 267370
      },
      {
        "text": "here.",
        "ms": 267630
      }
    ],
    "matrox-switch-back": [
      {
        "text": "let's",
        "ms": 269750
      },
      {
        "text": "go",
        "ms": 269985
      },
      {
        "text": "back",
        "ms": 270245
      },
      {
        "text": "over",
        "ms": 270585
      },
      {
        "text": "to",
        "ms": 270765
      },
      {
        "text": "activities.",
        "ms": 270905
      }
    ],
    "matrox-switch-change": [
      {
        "text": "So",
        "ms": 272005
      },
      {
        "text": "now",
        "ms": 272285
      },
      {
        "text": "we'll",
        "ms": 272485
      },
      {
        "text": "want",
        "ms": 272745
      },
      {
        "text": "to",
        "ms": 273005
      },
      {
        "text": "change",
        "ms": 273225
      },
      {
        "text": "the",
        "ms": 274333
      },
      {
        "text": "switcher",
        "ms": 274493
      },
      {
        "text": "over",
        "ms": 275391
      },
      {
        "text": "to",
        "ms": 275631
      },
      {
        "text": "encoders",
        "ms": 276031
      },
      {
        "text": "and",
        "ms": 276531
      },
      {
        "text": "decoders.",
        "ms": 276631
      }
    ],
    "matrox-switch-convertip": [
      {
        "text": "And",
        "ms": 277816
      },
      {
        "text": "you",
        "ms": 277916
      },
      {
        "text": "can",
        "ms": 278036
      },
      {
        "text": "see",
        "ms": 278216
      },
      {
        "text": "here",
        "ms": 278476
      },
      {
        "text": "our",
        "ms": 278796
      },
      {
        "text": "convert",
        "ms": 279576
      },
      {
        "text": "IP,",
        "ms": 280256
      },
      {
        "text": "Matrox",
        "ms": 281059
      },
      {
        "text": "encoders",
        "ms": 281947
      },
      {
        "text": "and",
        "ms": 282427
      },
      {
        "text": "decoders",
        "ms": 282527
      },
      {
        "text": "all",
        "ms": 283327
      },
      {
        "text": "set",
        "ms": 283507
      },
      {
        "text": "up,",
        "ms": 283747
      },
      {
        "text": "ready",
        "ms": 283967
      },
      {
        "text": "to",
        "ms": 284207
      },
      {
        "text": "go.",
        "ms": 284327
      }
    ],
    "matrox-switch-audio": [
      {
        "text": "And",
        "ms": 285197
      },
      {
        "text": "we'll",
        "ms": 285397
      },
      {
        "text": "leave",
        "ms": 285597
      },
      {
        "text": "the",
        "ms": 285757
      },
      {
        "text": "audio",
        "ms": 285937
      },
      {
        "text": "for",
        "ms": 286297
      },
      {
        "text": "the",
        "ms": 286457
      },
      {
        "text": "display",
        "ms": 286717
      },
      {
        "text": "and",
        "ms": 287685
      },
      {
        "text": "the",
        "ms": 287805
      },
      {
        "text": "power",
        "ms": 287925
      },
      {
        "text": "already",
        "ms": 288658
      },
      {
        "text": "set",
        "ms": 288938
      },
      {
        "text": "up",
        "ms": 289078
      },
      {
        "text": "for",
        "ms": 289078
      },
      {
        "text": "the",
        "ms": 289078
      },
      {
        "text": "display.",
        "ms": 289518
      }
    ],
    "m2m-different": [
      {
        "text": "Now,",
        "ms": 293320
      },
      {
        "text": "when",
        "ms": 293520
      },
      {
        "text": "we",
        "ms": 293680
      },
      {
        "text": "come",
        "ms": 293800
      },
      {
        "text": "in",
        "ms": 294000
      },
      {
        "text": "here,",
        "ms": 294120
      },
      {
        "text": "we",
        "ms": 294800
      },
      {
        "text": "have",
        "ms": 294880
      },
      {
        "text": "a",
        "ms": 295080
      },
      {
        "text": "very",
        "ms": 295160
      },
      {
        "text": "different",
        "ms": 295380
      },
      {
        "text": "interface,",
        "ms": 295660
      },
      {
        "text": "right?",
        "ms": 296440
      }
    ],
    "m2m-press-click": [
      {
        "text": "And",
        "ms": 297120
      },
      {
        "text": "you",
        "ms": 297240
      },
      {
        "text": "can",
        "ms": 297360
      },
      {
        "text": "see",
        "ms": 297540
      },
      {
        "text": "all",
        "ms": 298263
      },
      {
        "text": "it",
        "ms": 298463
      },
      {
        "text": "takes",
        "ms": 298543
      },
      {
        "text": "is",
        "ms": 298803
      },
      {
        "text": "one",
        "ms": 299083
      },
      {
        "text": "press,",
        "ms": 299263
      },
      {
        "text": "and",
        "ms": 299903
      },
      {
        "text": "then",
        "ms": 300123
      },
      {
        "text": "you",
        "ms": 300123
      },
      {
        "text": "can",
        "ms": 300123
      },
      {
        "text": "click",
        "ms": 300283
      },
      {
        "text": "over",
        "ms": 300523
      },
      {
        "text": "here.",
        "ms": 300743
      }
    ],
    "m2m-drag-drop": [
      {
        "text": "We",
        "ms": 301558
      },
      {
        "text": "also",
        "ms": 301693
      },
      {
        "text": "have",
        "ms": 301973
      },
      {
        "text": "a",
        "ms": 302213
      },
      {
        "text": "drag",
        "ms": 302293
      },
      {
        "text": "and",
        "ms": 302593
      },
      {
        "text": "drop",
        "ms": 302733
      },
      {
        "text": "feature,",
        "ms": 303073
      },
      {
        "text": "so",
        "ms": 303373
      },
      {
        "text": "you",
        "ms": 303973
      },
      {
        "text": "can",
        "ms": 304033
      },
      {
        "text": "press",
        "ms": 304293
      },
      {
        "text": "and",
        "ms": 304493
      },
      {
        "text": "hold",
        "ms": 304653
      },
      {
        "text": "and",
        "ms": 305281
      },
      {
        "text": "drag",
        "ms": 305401
      },
      {
        "text": "it",
        "ms": 305681
      },
      {
        "text": "over.",
        "ms": 305801
      }
    ],
    "m2m-send-all": [
      {
        "text": "And",
        "ms": 306501
      },
      {
        "text": "of",
        "ms": 306571
      },
      {
        "text": "course,",
        "ms": 306711
      },
      {
        "text": "we",
        "ms": 307211
      },
      {
        "text": "have",
        "ms": 307391
      },
      {
        "text": "our",
        "ms": 307631
      },
      {
        "text": "send",
        "ms": 308034
      },
      {
        "text": "to",
        "ms": 308254
      },
      {
        "text": "all.",
        "ms": 308554
      }
    ],
    "m2m-anytime": [
      {
        "text": "At",
        "ms": 309259
      },
      {
        "text": "any",
        "ms": 309359
      },
      {
        "text": "time,",
        "ms": 309519
      },
      {
        "text": "you",
        "ms": 309719
      },
      {
        "text": "can",
        "ms": 309819
      },
      {
        "text": "select",
        "ms": 310019
      },
      {
        "text": "an",
        "ms": 310612
      },
      {
        "text": "input",
        "ms": 310732
      },
      {
        "text": "and",
        "ms": 311450
      },
      {
        "text": "press",
        "ms": 311803
      },
      {
        "text": "this",
        "ms": 312143
      },
      {
        "text": "all",
        "ms": 312303
      },
      {
        "text": "button,",
        "ms": 312563
      },
      {
        "text": "and",
        "ms": 313023
      },
      {
        "text": "it",
        "ms": 313123
      },
      {
        "text": "sends",
        "ms": 313223
      },
      {
        "text": "everything",
        "ms": 313483
      },
      {
        "text": "where",
        "ms": 314181
      },
      {
        "text": "it",
        "ms": 314341
      },
      {
        "text": "needs",
        "ms": 314461
      },
      {
        "text": "to",
        "ms": 314621
      },
      {
        "text": "go.",
        "ms": 314681
      }
    ],
    "settings-start-over": [
      {
        "text": "At",
        "ms": 317805
      },
      {
        "text": "any",
        "ms": 317925
      },
      {
        "text": "time,",
        "ms": 318105
      },
      {
        "text": "if",
        "ms": 318565
      },
      {
        "text": "you",
        "ms": 318685
      },
      {
        "text": "need",
        "ms": 318825
      },
      {
        "text": "to",
        "ms": 319425
      },
      {
        "text": "start",
        "ms": 319585
      },
      {
        "text": "over",
        "ms": 319965
      },
      {
        "text": "or",
        "ms": 320665
      },
      {
        "text": "you",
        "ms": 320765
      },
      {
        "text": "need",
        "ms": 320845
      },
      {
        "text": "help",
        "ms": 321105
      }
    ],
    "settings-manual": [
      {
        "text": "full",
        "ms": 321675
      },
      {
        "text": "user",
        "ms": 322235
      },
      {
        "text": "manual,",
        "ms": 322495
      },
      {
        "text": "it",
        "ms": 322835
      },
      {
        "text": "can",
        "ms": 323115
      },
      {
        "text": "be",
        "ms": 323255
      },
      {
        "text": "found",
        "ms": 323375
      },
      {
        "text": "right",
        "ms": 323635
      },
      {
        "text": "here.",
        "ms": 323875
      }
    ],
    "settings-quick-start": [
      {
        "text": "And",
        "ms": 324745
      },
      {
        "text": "the",
        "ms": 325045
      },
      {
        "text": "quick",
        "ms": 325293
      },
      {
        "text": "start,",
        "ms": 325513
      },
      {
        "text": "if",
        "ms": 325893
      },
      {
        "text": "you",
        "ms": 325973
      },
      {
        "text": "need",
        "ms": 326073
      },
      {
        "text": "to",
        "ms": 326266
      },
      {
        "text": "watch",
        "ms": 326546
      },
      {
        "text": "a",
        "ms": 326786
      },
      {
        "text": "quick",
        "ms": 326846
      },
      {
        "text": "start",
        "ms": 327086
      },
      {
        "text": "again,",
        "ms": 327346
      },
      {
        "text": "you",
        "ms": 327899
      },
      {
        "text": "can",
        "ms": 328019
      },
      {
        "text": "play",
        "ms": 328519
      },
      {
        "text": "that",
        "ms": 328759
      },
      {
        "text": "right",
        "ms": 328899
      },
      {
        "text": "here.",
        "ms": 329119
      }
    ],
    "settings-reset": [
      {
        "text": "And",
        "ms": 330189
      },
      {
        "text": "if",
        "ms": 330289
      },
      {
        "text": "you",
        "ms": 330329
      },
      {
        "text": "need",
        "ms": 330489
      },
      {
        "text": "to",
        "ms": 330689
      },
      {
        "text": "do",
        "ms": 330809
      },
      {
        "text": "a",
        "ms": 330929
      },
      {
        "text": "factory",
        "ms": 331109
      },
      {
        "text": "reset",
        "ms": 331529
      },
      {
        "text": "or",
        "ms": 332435
      },
      {
        "text": "update",
        "ms": 332575
      },
      {
        "text": "the",
        "ms": 333003
      },
      {
        "text": "database,",
        "ms": 333443
      },
      {
        "text": "you",
        "ms": 334386
      },
      {
        "text": "can",
        "ms": 334506
      },
      {
        "text": "do",
        "ms": 334646
      },
      {
        "text": "that",
        "ms": 334686
      },
      {
        "text": "right",
        "ms": 334886
      },
      {
        "text": "here.",
        "ms": 335116
      }
    ],
    "close-thanks": [
      {
        "text": "Thank",
        "ms": 338750
      },
      {
        "text": "you",
        "ms": 338920
      },
      {
        "text": "for",
        "ms": 339060
      },
      {
        "text": "your",
        "ms": 339200
      },
      {
        "text": "time.",
        "ms": 339360
      }
    ]
  }
};

export const IOT_TABLET_EDIT = NARRATION_EDIT;

