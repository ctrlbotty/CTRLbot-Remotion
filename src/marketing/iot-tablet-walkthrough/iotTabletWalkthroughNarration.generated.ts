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
  "seconds": 330,
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
      "id": "ai-intro",
      "at": 11.25,
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
      "at": 16.688,
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
      "at": 24.159,
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
      "at": 33.25,
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
      "at": 42.603,
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
      "at": 56.25,
      "start": 76.87,
      "end": 78.37,
      "seconds": 1.5,
      "removed": []
    },
    {
      "id": "epson-info",
      "at": 58.05,
      "start": 79.93,
      "end": 86.44,
      "seconds": 6.51,
      "removed": []
    },
    {
      "id": "epson-webpage",
      "at": 64.86,
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
      "at": 72.264,
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
      "at": 79.75,
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
      "at": 86.951,
      "start": 125.16,
      "end": 132.605,
      "seconds": 7.445,
      "removed": []
    },
    {
      "id": "term-commands",
      "at": 95.75,
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
      "at": 101.25,
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
      "at": 110.993,
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
      "at": 113.861,
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
      "at": 116.722,
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
      "at": 123.105,
      "start": 164.52,
      "end": 168.47,
      "seconds": 3.95,
      "removed": []
    },
    {
      "id": "act-next",
      "at": 129.25,
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
      "at": 136.186,
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
      "at": 142.762,
      "start": 184.79,
      "end": 186.7,
      "seconds": 1.91,
      "removed": []
    },
    {
      "id": "switch-projector",
      "at": 148.25,
      "start": 187.915,
      "end": 191.085,
      "seconds": 3.17,
      "removed": []
    },
    {
      "id": "switch-assign",
      "at": 151.72,
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
      "at": 159.504,
      "start": 201.71,
      "end": 205.525,
      "seconds": 3.723,
      "removed": []
    },
    {
      "id": "eui-setup",
      "at": 164.75,
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
      "at": 175.128,
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
      "at": 179.41,
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
      "at": 184.106,
      "start": 230.135,
      "end": 231.59,
      "seconds": 1.455,
      "removed": []
    },
    {
      "id": "exit-hold",
      "at": 189.75,
      "start": 238.78,
      "end": 245.3,
      "seconds": 6.413,
      "removed": []
    },
    {
      "id": "discovery-devices",
      "at": 197.75,
      "start": 246.675,
      "end": 248.955,
      "seconds": 2.28,
      "removed": []
    },
    {
      "id": "discovery-scan",
      "at": 200.33,
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
      "at": 217.75,
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
      "at": 222.844,
      "start": 274.3,
      "end": 276.515,
      "seconds": 2.215,
      "removed": []
    },
    {
      "id": "matrox-add-these",
      "at": 225.359,
      "start": 281.865,
      "end": 286.66,
      "seconds": 3.543,
      "removed": []
    },
    {
      "id": "matrox-one-click",
      "at": 229.202,
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
      "at": 248.25,
      "start": 329.085,
      "end": 331.07,
      "seconds": 1.985,
      "removed": []
    },
    {
      "id": "matrox-test-switch",
      "at": 250.535,
      "start": 333.745,
      "end": 337.725,
      "seconds": 3.98,
      "removed": []
    },
    {
      "id": "matrox-switch-back",
      "at": 256.25,
      "start": 340.185,
      "end": 342.055,
      "seconds": 1.87,
      "removed": []
    },
    {
      "id": "matrox-switch-change",
      "at": 258.42,
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
      "at": 264.281,
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
      "at": 271.602,
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
      "at": 279.75,
      "start": 365.08,
      "end": 368.63,
      "seconds": 3.55,
      "removed": []
    },
    {
      "id": "m2m-press-click",
      "at": 283.6,
      "start": 369.19,
      "end": 373.685,
      "seconds": 4.158,
      "removed": []
    },
    {
      "id": "m2m-drag-drop",
      "at": 288.058,
      "start": 374.395,
      "end": 379.23,
      "seconds": 4.643,
      "removed": []
    },
    {
      "id": "m2m-send-all",
      "at": 293.001,
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
      "at": 295.719,
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
      "at": 304.25,
      "start": 399.535,
      "end": 403.16,
      "seconds": 3.625,
      "removed": []
    },
    {
      "id": "settings-manual",
      "at": 308.175,
      "start": 404.93,
      "end": 407.615,
      "seconds": 2.685,
      "removed": []
    },
    {
      "id": "settings-quick-start",
      "at": 311.16,
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
      "at": 316.419,
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
      "text": " The",
      "startMs": 11265,
      "endMs": 11365,
      "timestampMs": 11315,
      "confidence": null
    },
    {
      "text": " first",
      "startMs": 11365,
      "endMs": 11525,
      "timestampMs": 11445,
      "confidence": null
    },
    {
      "text": " thing",
      "startMs": 11525,
      "endMs": 11645,
      "timestampMs": 11585,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 11645,
      "endMs": 11865,
      "timestampMs": 11755,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 11865,
      "endMs": 12890,
      "timestampMs": 12378,
      "confidence": null
    },
    {
      "text": " when",
      "startMs": 12905,
      "endMs": 13025,
      "timestampMs": 12965,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 13025,
      "endMs": 13205,
      "timestampMs": 13115,
      "confidence": null
    },
    {
      "text": " open",
      "startMs": 13205,
      "endMs": 13385,
      "timestampMs": 13295,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 13385,
      "endMs": 13505,
      "timestampMs": 13445,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 13505,
      "endMs": 13705,
      "timestampMs": 13605,
      "confidence": null
    },
    {
      "text": " app",
      "startMs": 13705,
      "endMs": 13925,
      "timestampMs": 13815,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 14105,
      "endMs": 14345,
      "timestampMs": 14225,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 14345,
      "endMs": 14655,
      "timestampMs": 14500,
      "confidence": null
    },
    {
      "text": " CTRLbot.ai.",
      "startMs": 14705,
      "endMs": 16348,
      "timestampMs": 15527,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 16768,
      "endMs": 16908,
      "timestampMs": 16838,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 16908,
      "endMs": 17168,
      "timestampMs": 17038,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 17168,
      "endMs": 17798,
      "timestampMs": 17483,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 17868,
      "endMs": 18148,
      "timestampMs": 18008,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 18148,
      "endMs": 18308,
      "timestampMs": 18228,
      "confidence": null
    },
    {
      "text": " help",
      "startMs": 18308,
      "endMs": 18548,
      "timestampMs": 18428,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 18548,
      "endMs": 18973,
      "timestampMs": 18760,
      "confidence": null
    },
    {
      "text": " figure",
      "startMs": 19128,
      "endMs": 19428,
      "timestampMs": 19278,
      "confidence": null
    },
    {
      "text": " out",
      "startMs": 19428,
      "endMs": 19673,
      "timestampMs": 19551,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 19673,
      "endMs": 19928,
      "timestampMs": 19801,
      "confidence": null
    },
    {
      "text": " troubleshoot",
      "startMs": 19928,
      "endMs": 20428,
      "timestampMs": 20178,
      "confidence": null
    },
    {
      "text": " things",
      "startMs": 20428,
      "endMs": 20993,
      "timestampMs": 20711,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 21028,
      "endMs": 21168,
      "timestampMs": 21098,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 21168,
      "endMs": 21728,
      "timestampMs": 21448,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 21728,
      "endMs": 22116,
      "timestampMs": 21922,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 22116,
      "endMs": 22196,
      "timestampMs": 22156,
      "confidence": null
    },
    {
      "text": " living",
      "startMs": 22196,
      "endMs": 22791,
      "timestampMs": 22493,
      "confidence": null
    },
    {
      "text": " manual.",
      "startMs": 23219,
      "endMs": 23819,
      "timestampMs": 23519,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 24214,
      "endMs": 24474,
      "timestampMs": 24344,
      "confidence": null
    },
    {
      "text": " anything,",
      "startMs": 24474,
      "endMs": 25094,
      "timestampMs": 24784,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 25114,
      "endMs": 25294,
      "timestampMs": 25204,
      "confidence": null
    },
    {
      "text": " questions",
      "startMs": 25294,
      "endMs": 25634,
      "timestampMs": 25464,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 25634,
      "endMs": 25794,
      "timestampMs": 25714,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 25794,
      "endMs": 26072,
      "timestampMs": 25933,
      "confidence": null
    },
    {
      "text": " about",
      "startMs": 26127,
      "endMs": 26347,
      "timestampMs": 26237,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 26347,
      "endMs": 26467,
      "timestampMs": 26407,
      "confidence": null
    },
    {
      "text": " application",
      "startMs": 26467,
      "endMs": 27297,
      "timestampMs": 26882,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 27367,
      "endMs": 27487,
      "timestampMs": 27427,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 27487,
      "endMs": 27647,
      "timestampMs": 27567,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 27647,
      "endMs": 27727,
      "timestampMs": 27687,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 27727,
      "endMs": 27907,
      "timestampMs": 27817,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 27907,
      "endMs": 28047,
      "timestampMs": 27977,
      "confidence": null
    },
    {
      "text": " up,",
      "startMs": 28047,
      "endMs": 28097,
      "timestampMs": 28072,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 28047,
      "endMs": 28107,
      "timestampMs": 28077,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 28107,
      "endMs": 28267,
      "timestampMs": 28187,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 28735,
      "endMs": 28975,
      "timestampMs": 28855,
      "confidence": null
    },
    {
      "text": " put",
      "startMs": 29155,
      "endMs": 29315,
      "timestampMs": 29235,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 29315,
      "endMs": 29455,
      "timestampMs": 29385,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 29455,
      "endMs": 29670,
      "timestampMs": 29562,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 29670,
      "endMs": 29950,
      "timestampMs": 29810,
      "confidence": null
    },
    {
      "text": " It",
      "startMs": 33330,
      "endMs": 33430,
      "timestampMs": 33380,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 33430,
      "endMs": 33630,
      "timestampMs": 33530,
      "confidence": null
    },
    {
      "text": " begins",
      "startMs": 33630,
      "endMs": 33990,
      "timestampMs": 33810,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 33990,
      "endMs": 34190,
      "timestampMs": 34090,
      "confidence": null
    },
    {
      "text": " adding",
      "startMs": 34190,
      "endMs": 34450,
      "timestampMs": 34320,
      "confidence": null
    },
    {
      "text": " devices,",
      "startMs": 34450,
      "endMs": 35215,
      "timestampMs": 34832,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 35470,
      "endMs": 35720,
      "timestampMs": 35595,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 35980,
      "endMs": 36080,
      "timestampMs": 36030,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 36080,
      "endMs": 36180,
      "timestampMs": 36130,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 36180,
      "endMs": 36320,
      "timestampMs": 36250,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 36320,
      "endMs": 36420,
      "timestampMs": 36370,
      "confidence": null
    },
    {
      "text": " extensive",
      "startMs": 36420,
      "endMs": 37115,
      "timestampMs": 36768,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 37133,
      "endMs": 37608,
      "timestampMs": 37370,
      "confidence": null
    },
    {
      "text": " driver",
      "startMs": 37608,
      "endMs": 37968,
      "timestampMs": 37788,
      "confidence": null
    },
    {
      "text": " library",
      "startMs": 37968,
      "endMs": 38653,
      "timestampMs": 38311,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 39028,
      "endMs": 39258,
      "timestampMs": 39143,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 39308,
      "endMs": 39933,
      "timestampMs": 39620,
      "confidence": null
    },
    {
      "text": " RS-232",
      "startMs": 40048,
      "endMs": 41113,
      "timestampMs": 40581,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 41148,
      "endMs": 41568,
      "timestampMs": 41358,
      "confidence": null
    },
    {
      "text": " IR",
      "startMs": 41568,
      "endMs": 41748,
      "timestampMs": 41658,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 41748,
      "endMs": 41928,
      "timestampMs": 41838,
      "confidence": null
    },
    {
      "text": " well.",
      "startMs": 41928,
      "endMs": 42263,
      "timestampMs": 42095,
      "confidence": null
    },
    {
      "text": " In",
      "startMs": 42613,
      "endMs": 42673,
      "timestampMs": 42643,
      "confidence": null
    },
    {
      "text": " order",
      "startMs": 42673,
      "endMs": 42853,
      "timestampMs": 42763,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 42853,
      "endMs": 43153,
      "timestampMs": 43003,
      "confidence": null
    },
    {
      "text": " use",
      "startMs": 43153,
      "endMs": 43413,
      "timestampMs": 43283,
      "confidence": null
    },
    {
      "text": " RS-232",
      "startMs": 43413,
      "endMs": 44493,
      "timestampMs": 43953,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 44493,
      "endMs": 44818,
      "timestampMs": 44656,
      "confidence": null
    },
    {
      "text": " IR,",
      "startMs": 45006,
      "endMs": 45426,
      "timestampMs": 45216,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 45426,
      "endMs": 45766,
      "timestampMs": 45596,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 45946,
      "endMs": 46166,
      "timestampMs": 46056,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 46166,
      "endMs": 46366,
      "timestampMs": 46266,
      "confidence": null
    },
    {
      "text": " use",
      "startMs": 46366,
      "endMs": 46626,
      "timestampMs": 46496,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 46626,
      "endMs": 46766,
      "timestampMs": 46696,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 46766,
      "endMs": 46886,
      "timestampMs": 46826,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 46886,
      "endMs": 47086,
      "timestampMs": 46986,
      "confidence": null
    },
    {
      "text": " endpoints",
      "startMs": 47086,
      "endMs": 47751,
      "timestampMs": 47419,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 48014,
      "endMs": 48134,
      "timestampMs": 48074,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 48134,
      "endMs": 48274,
      "timestampMs": 48204,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 48274,
      "endMs": 48604,
      "timestampMs": 48439,
      "confidence": null
    },
    {
      "text": " always",
      "startMs": 48654,
      "endMs": 48914,
      "timestampMs": 48784,
      "confidence": null
    },
    {
      "text": " sort",
      "startMs": 48914,
      "endMs": 49154,
      "timestampMs": 49034,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 49154,
      "endMs": 49354,
      "timestampMs": 49254,
      "confidence": null
    },
    {
      "text": " things",
      "startMs": 49354,
      "endMs": 49774,
      "timestampMs": 49564,
      "confidence": null
    },
    {
      "text": " out",
      "startMs": 49774,
      "endMs": 50004,
      "timestampMs": 49889,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 50122,
      "endMs": 50527,
      "timestampMs": 50324,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 50780,
      "endMs": 50920,
      "timestampMs": 50850,
      "confidence": null
    },
    {
      "text": " sorting",
      "startMs": 50920,
      "endMs": 51260,
      "timestampMs": 51090,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 51260,
      "endMs": 51490,
      "timestampMs": 51375,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 51760,
      "endMs": 52020,
      "timestampMs": 51890,
      "confidence": null
    },
    {
      "text": " Let's",
      "startMs": 56360,
      "endMs": 56580,
      "timestampMs": 56470,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 56580,
      "endMs": 56800,
      "timestampMs": 56690,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 56800,
      "endMs": 56940,
      "timestampMs": 56870,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 56940,
      "endMs": 57020,
      "timestampMs": 56980,
      "confidence": null
    },
    {
      "text": " projector.",
      "startMs": 57020,
      "endMs": 57710,
      "timestampMs": 57365,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 58060,
      "endMs": 58140,
      "timestampMs": 58100,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 58140,
      "endMs": 58220,
      "timestampMs": 58180,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 58220,
      "endMs": 58380,
      "timestampMs": 58300,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 58380,
      "endMs": 58540,
      "timestampMs": 58460,
      "confidence": null
    },
    {
      "text": " when",
      "startMs": 58540,
      "endMs": 58700,
      "timestampMs": 58620,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 58700,
      "endMs": 58800,
      "timestampMs": 58750,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 58800,
      "endMs": 59260,
      "timestampMs": 59030,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 59260,
      "endMs": 59620,
      "timestampMs": 59440,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 59620,
      "endMs": 59800,
      "timestampMs": 59710,
      "confidence": null
    },
    {
      "text": " actual",
      "startMs": 59800,
      "endMs": 60100,
      "timestampMs": 59950,
      "confidence": null
    },
    {
      "text": " projector,",
      "startMs": 60100,
      "endMs": 60750,
      "timestampMs": 60425,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 61040,
      "endMs": 61140,
      "timestampMs": 61090,
      "confidence": null
    },
    {
      "text": " opens",
      "startMs": 61140,
      "endMs": 61460,
      "timestampMs": 61300,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 61460,
      "endMs": 61600,
      "timestampMs": 61530,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 61600,
      "endMs": 61800,
      "timestampMs": 61700,
      "confidence": null
    },
    {
      "text": " nice",
      "startMs": 61800,
      "endMs": 62040,
      "timestampMs": 61920,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 62040,
      "endMs": 62280,
      "timestampMs": 62160,
      "confidence": null
    },
    {
      "text": " page",
      "startMs": 62280,
      "endMs": 62660,
      "timestampMs": 62470,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 62660,
      "endMs": 62760,
      "timestampMs": 62710,
      "confidence": null
    },
    {
      "text": " gives",
      "startMs": 62760,
      "endMs": 62900,
      "timestampMs": 62830,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 62900,
      "endMs": 63060,
      "timestampMs": 62980,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 63060,
      "endMs": 63220,
      "timestampMs": 63140,
      "confidence": null
    },
    {
      "text": " kinds",
      "startMs": 63220,
      "endMs": 63480,
      "timestampMs": 63350,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 63480,
      "endMs": 63620,
      "timestampMs": 63550,
      "confidence": null
    },
    {
      "text": " great",
      "startMs": 63620,
      "endMs": 63880,
      "timestampMs": 63750,
      "confidence": null
    },
    {
      "text": " information.",
      "startMs": 63880,
      "endMs": 64520,
      "timestampMs": 64200,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 65075,
      "endMs": 65235,
      "timestampMs": 65155,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 65235,
      "endMs": 65315,
      "timestampMs": 65275,
      "confidence": null
    },
    {
      "text": " want,",
      "startMs": 65315,
      "endMs": 65595,
      "timestampMs": 65455,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 65595,
      "endMs": 65675,
      "timestampMs": 65635,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 65675,
      "endMs": 65855,
      "timestampMs": 65765,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 65855,
      "endMs": 65995,
      "timestampMs": 65925,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 65995,
      "endMs": 66235,
      "timestampMs": 66115,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 66235,
      "endMs": 66285,
      "timestampMs": 66260,
      "confidence": null
    },
    {
      "text": " manufacturer",
      "startMs": 66235,
      "endMs": 67030,
      "timestampMs": 66633,
      "confidence": null
    },
    {
      "text": " webpage",
      "startMs": 67148,
      "endMs": 67728,
      "timestampMs": 67438,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 67728,
      "endMs": 68291,
      "timestampMs": 68010,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 68291,
      "endMs": 68671,
      "timestampMs": 68481,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 69079,
      "endMs": 69259,
      "timestampMs": 69169,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 69259,
      "endMs": 69399,
      "timestampMs": 69329,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 69399,
      "endMs": 69539,
      "timestampMs": 69469,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 69539,
      "endMs": 69799,
      "timestampMs": 69669,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 69799,
      "endMs": 69849,
      "timestampMs": 69824,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 69839,
      "endMs": 69939,
      "timestampMs": 69889,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 69939,
      "endMs": 70039,
      "timestampMs": 69989,
      "confidence": null
    },
    {
      "text": " product",
      "startMs": 70039,
      "endMs": 70519,
      "timestampMs": 70279,
      "confidence": null
    },
    {
      "text": " page",
      "startMs": 70519,
      "endMs": 70904,
      "timestampMs": 70712,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 71379,
      "endMs": 71519,
      "timestampMs": 71449,
      "confidence": null
    },
    {
      "text": " well.",
      "startMs": 71519,
      "endMs": 71924,
      "timestampMs": 71722,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 72584,
      "endMs": 72704,
      "timestampMs": 72644,
      "confidence": null
    },
    {
      "text": " down",
      "startMs": 72704,
      "endMs": 72924,
      "timestampMs": 72814,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 72924,
      "endMs": 73124,
      "timestampMs": 73024,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 73124,
      "endMs": 73264,
      "timestampMs": 73194,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 73264,
      "endMs": 73464,
      "timestampMs": 73364,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 73464,
      "endMs": 73904,
      "timestampMs": 73684,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 74172,
      "endMs": 74352,
      "timestampMs": 74262,
      "confidence": null
    },
    {
      "text": " kinds",
      "startMs": 74352,
      "endMs": 74592,
      "timestampMs": 74472,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 74592,
      "endMs": 74922,
      "timestampMs": 74757,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 75012,
      "endMs": 75192,
      "timestampMs": 75102,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 75192,
      "endMs": 75312,
      "timestampMs": 75252,
      "confidence": null
    },
    {
      "text": " information",
      "startMs": 75312,
      "endMs": 75832,
      "timestampMs": 75572,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 75832,
      "endMs": 76012,
      "timestampMs": 75922,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 76012,
      "endMs": 76152,
      "timestampMs": 76082,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 76152,
      "endMs": 76472,
      "timestampMs": 76312,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 76745,
      "endMs": 76885,
      "timestampMs": 76815,
      "confidence": null
    },
    {
      "text": " make",
      "startMs": 76885,
      "endMs": 77085,
      "timestampMs": 76985,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 77085,
      "endMs": 77185,
      "timestampMs": 77135,
      "confidence": null
    },
    {
      "text": " connection.",
      "startMs": 77185,
      "endMs": 77705,
      "timestampMs": 77445,
      "confidence": null
    },
    {
      "text": " Just",
      "startMs": 79830,
      "endMs": 80145,
      "timestampMs": 79988,
      "confidence": null
    },
    {
      "text": " hitting",
      "startMs": 80250,
      "endMs": 80610,
      "timestampMs": 80430,
      "confidence": null
    },
    {
      "text": " plus",
      "startMs": 80610,
      "endMs": 81120,
      "timestampMs": 80865,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 81370,
      "endMs": 81450,
      "timestampMs": 81410,
      "confidence": null
    },
    {
      "text": " take",
      "startMs": 81450,
      "endMs": 81630,
      "timestampMs": 81540,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 81630,
      "endMs": 81770,
      "timestampMs": 81700,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 81770,
      "endMs": 81890,
      "timestampMs": 81830,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 81890,
      "endMs": 82090,
      "timestampMs": 81990,
      "confidence": null
    },
    {
      "text": " page.",
      "startMs": 82090,
      "endMs": 82555,
      "timestampMs": 82322,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 83110,
      "endMs": 83190,
      "timestampMs": 83150,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 83190,
      "endMs": 83410,
      "timestampMs": 83300,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 83410,
      "endMs": 83510,
      "timestampMs": 83460,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 83510,
      "endMs": 83650,
      "timestampMs": 83580,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 83650,
      "endMs": 83850,
      "timestampMs": 83750,
      "confidence": null
    },
    {
      "text": " put",
      "startMs": 83850,
      "endMs": 84150,
      "timestampMs": 84000,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 84150,
      "endMs": 84535,
      "timestampMs": 84343,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 84583,
      "endMs": 84693,
      "timestampMs": 84638,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 84693,
      "endMs": 84893,
      "timestampMs": 84793,
      "confidence": null
    },
    {
      "text": " address",
      "startMs": 84893,
      "endMs": 85553,
      "timestampMs": 85223,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 85553,
      "endMs": 85871,
      "timestampMs": 85712,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 85871,
      "endMs": 86031,
      "timestampMs": 85951,
      "confidence": null
    },
    {
      "text": " projector.",
      "startMs": 86031,
      "endMs": 86611,
      "timestampMs": 86321,
      "confidence": null
    },
    {
      "text": " Pressing",
      "startMs": 86961,
      "endMs": 87441,
      "timestampMs": 87201,
      "confidence": null
    },
    {
      "text": " connect,",
      "startMs": 87441,
      "endMs": 88041,
      "timestampMs": 87741,
      "confidence": null
    },
    {
      "text": " once",
      "startMs": 88181,
      "endMs": 88321,
      "timestampMs": 88251,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 88321,
      "endMs": 88461,
      "timestampMs": 88391,
      "confidence": null
    },
    {
      "text": " connection",
      "startMs": 88461,
      "endMs": 88921,
      "timestampMs": 88691,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 88921,
      "endMs": 89081,
      "timestampMs": 89001,
      "confidence": null
    },
    {
      "text": " made,",
      "startMs": 89081,
      "endMs": 89561,
      "timestampMs": 89321,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 89561,
      "endMs": 89641,
      "timestampMs": 89601,
      "confidence": null
    },
    {
      "text": " automatically",
      "startMs": 89641,
      "endMs": 90341,
      "timestampMs": 89991,
      "confidence": null
    },
    {
      "text": " saves",
      "startMs": 90341,
      "endMs": 90821,
      "timestampMs": 90581,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 90821,
      "endMs": 90961,
      "timestampMs": 90891,
      "confidence": null
    },
    {
      "text": " connection.",
      "startMs": 90961,
      "endMs": 91501,
      "timestampMs": 91231,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 91821,
      "endMs": 91981,
      "timestampMs": 91901,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 91981,
      "endMs": 92161,
      "timestampMs": 92071,
      "confidence": null
    },
    {
      "text": " don't",
      "startMs": 92161,
      "endMs": 92376,
      "timestampMs": 92269,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 92601,
      "endMs": 92721,
      "timestampMs": 92661,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 92721,
      "endMs": 93001,
      "timestampMs": 92861,
      "confidence": null
    },
    {
      "text": " actually",
      "startMs": 93001,
      "endMs": 93321,
      "timestampMs": 93161,
      "confidence": null
    },
    {
      "text": " hit",
      "startMs": 93321,
      "endMs": 93521,
      "timestampMs": 93421,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 93521,
      "endMs": 93601,
      "timestampMs": 93561,
      "confidence": null
    },
    {
      "text": " save",
      "startMs": 93601,
      "endMs": 93861,
      "timestampMs": 93731,
      "confidence": null
    },
    {
      "text": " button.",
      "startMs": 93861,
      "endMs": 94356,
      "timestampMs": 94108,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 95770,
      "endMs": 95870,
      "timestampMs": 95820,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 95870,
      "endMs": 95950,
      "timestampMs": 95910,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 95950,
      "endMs": 96090,
      "timestampMs": 96020,
      "confidence": null
    },
    {
      "text": " want,",
      "startMs": 96090,
      "endMs": 96270,
      "timestampMs": 96180,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 96270,
      "endMs": 96390,
      "timestampMs": 96330,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 96390,
      "endMs": 96775,
      "timestampMs": 96582,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 97318,
      "endMs": 97738,
      "timestampMs": 97528,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 98098,
      "endMs": 98278,
      "timestampMs": 98188,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 98278,
      "endMs": 98358,
      "timestampMs": 98318,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 98358,
      "endMs": 98598,
      "timestampMs": 98478,
      "confidence": null
    },
    {
      "text": " commands",
      "startMs": 98598,
      "endMs": 99138,
      "timestampMs": 98868,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 99138,
      "endMs": 99473,
      "timestampMs": 99305,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 99473,
      "endMs": 99593,
      "timestampMs": 99533,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 101300,
      "endMs": 101380,
      "timestampMs": 101340,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 101380,
      "endMs": 101520,
      "timestampMs": 101450,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 101520,
      "endMs": 101720,
      "timestampMs": 101620,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 101720,
      "endMs": 101860,
      "timestampMs": 101790,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 101860,
      "endMs": 102120,
      "timestampMs": 101990,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 102120,
      "endMs": 102240,
      "timestampMs": 102180,
      "confidence": null
    },
    {
      "text": " actual",
      "startMs": 102240,
      "endMs": 102540,
      "timestampMs": 102390,
      "confidence": null
    },
    {
      "text": " device,",
      "startMs": 102540,
      "endMs": 103215,
      "timestampMs": 102878,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 103340,
      "endMs": 103420,
      "timestampMs": 103380,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 103420,
      "endMs": 103580,
      "timestampMs": 103500,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 103580,
      "endMs": 103660,
      "timestampMs": 103620,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 103660,
      "endMs": 103920,
      "timestampMs": 103790,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 103920,
      "endMs": 104505,
      "timestampMs": 104213,
      "confidence": null
    },
    {
      "text": " testing",
      "startMs": 104538,
      "endMs": 104978,
      "timestampMs": 104758,
      "confidence": null
    },
    {
      "text": " page.",
      "startMs": 104978,
      "endMs": 105258,
      "timestampMs": 105118,
      "confidence": null
    },
    {
      "text": " There's",
      "startMs": 105258,
      "endMs": 105418,
      "timestampMs": 105338,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 105668,
      "endMs": 105848,
      "timestampMs": 105758,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 105848,
      "endMs": 105928,
      "timestampMs": 105888,
      "confidence": null
    },
    {
      "text": " tech",
      "startMs": 105928,
      "endMs": 106168,
      "timestampMs": 106048,
      "confidence": null
    },
    {
      "text": " page,",
      "startMs": 106168,
      "endMs": 106548,
      "timestampMs": 106358,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 106728,
      "endMs": 106908,
      "timestampMs": 106818,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 106908,
      "endMs": 107088,
      "timestampMs": 106998,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 107088,
      "endMs": 107248,
      "timestampMs": 107168,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 107248,
      "endMs": 107328,
      "timestampMs": 107288,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 107328,
      "endMs": 107788,
      "timestampMs": 107558,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 107788,
      "endMs": 108008,
      "timestampMs": 107898,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 108008,
      "endMs": 108448,
      "timestampMs": 108228,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 108448,
      "endMs": 108758,
      "timestampMs": 108603,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 108963,
      "endMs": 109013,
      "timestampMs": 108988,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 109008,
      "endMs": 109168,
      "timestampMs": 109088,
      "confidence": null
    },
    {
      "text": " system",
      "startMs": 109168,
      "endMs": 109508,
      "timestampMs": 109338,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 109508,
      "endMs": 109668,
      "timestampMs": 109588,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 109668,
      "endMs": 109768,
      "timestampMs": 109718,
      "confidence": null
    },
    {
      "text": " listed",
      "startMs": 109768,
      "endMs": 110008,
      "timestampMs": 109888,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 110008,
      "endMs": 110228,
      "timestampMs": 110118,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 110228,
      "endMs": 110653,
      "timestampMs": 110441,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 111013,
      "endMs": 111093,
      "timestampMs": 111053,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 111093,
      "endMs": 111213,
      "timestampMs": 111153,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 111213,
      "endMs": 111313,
      "timestampMs": 111263,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 111313,
      "endMs": 111473,
      "timestampMs": 111393,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 111473,
      "endMs": 111653,
      "timestampMs": 111563,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 111653,
      "endMs": 112403,
      "timestampMs": 112028,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 112473,
      "endMs": 112768,
      "timestampMs": 112621,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 112786,
      "endMs": 113056,
      "timestampMs": 112921,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 113056,
      "endMs": 113276,
      "timestampMs": 113166,
      "confidence": null
    },
    {
      "text": " out.",
      "startMs": 113276,
      "endMs": 113521,
      "timestampMs": 113398,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 113901,
      "endMs": 114021,
      "timestampMs": 113961,
      "confidence": null
    },
    {
      "text": " here's",
      "startMs": 114021,
      "endMs": 114289,
      "timestampMs": 114155,
      "confidence": null
    },
    {
      "text": " what",
      "startMs": 114429,
      "endMs": 114609,
      "timestampMs": 114519,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 114609,
      "endMs": 114769,
      "timestampMs": 114689,
      "confidence": null
    },
    {
      "text": " looked",
      "startMs": 114769,
      "endMs": 114989,
      "timestampMs": 114879,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 114989,
      "endMs": 115209,
      "timestampMs": 115099,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 115209,
      "endMs": 115349,
      "timestampMs": 115279,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 115349,
      "endMs": 115409,
      "timestampMs": 115379,
      "confidence": null
    },
    {
      "text": " switcher,",
      "startMs": 115409,
      "endMs": 115829,
      "timestampMs": 115619,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 115829,
      "endMs": 116129,
      "timestampMs": 115979,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 116722,
      "endMs": 116802,
      "timestampMs": 116762,
      "confidence": null
    },
    {
      "text": " here's",
      "startMs": 116802,
      "endMs": 117062,
      "timestampMs": 116932,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 117062,
      "endMs": 117142,
      "timestampMs": 117102,
      "confidence": null
    },
    {
      "text": " terminal,",
      "startMs": 117142,
      "endMs": 117787,
      "timestampMs": 117464,
      "confidence": null
    },
    {
      "text": " always",
      "startMs": 117942,
      "endMs": 118262,
      "timestampMs": 118102,
      "confidence": null
    },
    {
      "text": " available",
      "startMs": 118262,
      "endMs": 118882,
      "timestampMs": 118572,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 118882,
      "endMs": 119082,
      "timestampMs": 118982,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 119082,
      "endMs": 119132,
      "timestampMs": 119107,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 119082,
      "endMs": 119202,
      "timestampMs": 119142,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 119202,
      "endMs": 119322,
      "timestampMs": 119262,
      "confidence": null
    },
    {
      "text": " always",
      "startMs": 119322,
      "endMs": 119542,
      "timestampMs": 119432,
      "confidence": null
    },
    {
      "text": " communicate",
      "startMs": 119542,
      "endMs": 120062,
      "timestampMs": 119802,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 120062,
      "endMs": 120182,
      "timestampMs": 120122,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 120182,
      "endMs": 120282,
      "timestampMs": 120232,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 120282,
      "endMs": 120862,
      "timestampMs": 120572,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 121202,
      "endMs": 121397,
      "timestampMs": 121299,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 121390,
      "endMs": 121690,
      "timestampMs": 121540,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 121690,
      "endMs": 121850,
      "timestampMs": 121770,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 121850,
      "endMs": 121950,
      "timestampMs": 121900,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 121950,
      "endMs": 122170,
      "timestampMs": 122060,
      "confidence": null
    },
    {
      "text": " commands.",
      "startMs": 122170,
      "endMs": 122690,
      "timestampMs": 122430,
      "confidence": null
    },
    {
      "text": " Also,",
      "startMs": 123155,
      "endMs": 123535,
      "timestampMs": 123345,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 123535,
      "endMs": 123635,
      "timestampMs": 123585,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 123635,
      "endMs": 123715,
      "timestampMs": 123675,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 123715,
      "endMs": 124035,
      "timestampMs": 123875,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 124035,
      "endMs": 124275,
      "timestampMs": 124155,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 124275,
      "endMs": 124325,
      "timestampMs": 124300,
      "confidence": null
    },
    {
      "text": " webpage,",
      "startMs": 124275,
      "endMs": 124915,
      "timestampMs": 124595,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 124915,
      "endMs": 125135,
      "timestampMs": 125025,
      "confidence": null
    },
    {
      "text": " take",
      "startMs": 125135,
      "endMs": 125295,
      "timestampMs": 125215,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 125295,
      "endMs": 125475,
      "timestampMs": 125385,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 125475,
      "endMs": 125615,
      "timestampMs": 125545,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 125615,
      "endMs": 125815,
      "timestampMs": 125715,
      "confidence": null
    },
    {
      "text": " webpage",
      "startMs": 125815,
      "endMs": 126495,
      "timestampMs": 126155,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 126495,
      "endMs": 126695,
      "timestampMs": 126595,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 126695,
      "endMs": 127015,
      "timestampMs": 126855,
      "confidence": null
    },
    {
      "text": " The",
      "startMs": 129250,
      "endMs": 129360,
      "timestampMs": 129305,
      "confidence": null
    },
    {
      "text": " next",
      "startMs": 129360,
      "endMs": 129540,
      "timestampMs": 129450,
      "confidence": null
    },
    {
      "text": " step",
      "startMs": 129540,
      "endMs": 129840,
      "timestampMs": 129690,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 129840,
      "endMs": 130000,
      "timestampMs": 129920,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 130000,
      "endMs": 130240,
      "timestampMs": 130120,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 130240,
      "endMs": 130320,
      "timestampMs": 130280,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 130320,
      "endMs": 130520,
      "timestampMs": 130420,
      "confidence": null
    },
    {
      "text": " setting",
      "startMs": 130520,
      "endMs": 130860,
      "timestampMs": 130690,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 130860,
      "endMs": 131120,
      "timestampMs": 130990,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 131120,
      "endMs": 131260,
      "timestampMs": 131190,
      "confidence": null
    },
    {
      "text": " activities.",
      "startMs": 131260,
      "endMs": 132025,
      "timestampMs": 131642,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 132440,
      "endMs": 132720,
      "timestampMs": 132580,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 132720,
      "endMs": 133120,
      "timestampMs": 132920,
      "confidence": null
    },
    {
      "text": " activities",
      "startMs": 133200,
      "endMs": 133830,
      "timestampMs": 133515,
      "confidence": null
    },
    {
      "text": " form",
      "startMs": 134038,
      "endMs": 134358,
      "timestampMs": 134198,
      "confidence": null
    },
    {
      "text": " themselves,",
      "startMs": 134358,
      "endMs": 135158,
      "timestampMs": 134758,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 135516,
      "endMs": 135886,
      "timestampMs": 135701,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 136186,
      "endMs": 136236,
      "timestampMs": 136211,
      "confidence": null
    },
    {
      "text": " there",
      "startMs": 136186,
      "endMs": 136396,
      "timestampMs": 136291,
      "confidence": null
    },
    {
      "text": " isn't",
      "startMs": 136396,
      "endMs": 136716,
      "timestampMs": 136556,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 136716,
      "endMs": 136836,
      "timestampMs": 136776,
      "confidence": null
    },
    {
      "text": " whole",
      "startMs": 136836,
      "endMs": 137156,
      "timestampMs": 136996,
      "confidence": null
    },
    {
      "text": " lot",
      "startMs": 137156,
      "endMs": 137516,
      "timestampMs": 137336,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 137756,
      "endMs": 137996,
      "timestampMs": 137876,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 137996,
      "endMs": 138289,
      "timestampMs": 138142,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 138414,
      "endMs": 138694,
      "timestampMs": 138554,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 138694,
      "endMs": 138854,
      "timestampMs": 138774,
      "confidence": null
    },
    {
      "text": " do,",
      "startMs": 138854,
      "endMs": 139214,
      "timestampMs": 139034,
      "confidence": null
    },
    {
      "text": " but",
      "startMs": 139587,
      "endMs": 139887,
      "timestampMs": 139737,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 139887,
      "endMs": 140067,
      "timestampMs": 139977,
      "confidence": null
    },
    {
      "text": " course",
      "startMs": 140067,
      "endMs": 140347,
      "timestampMs": 140207,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 140347,
      "endMs": 140487,
      "timestampMs": 140417,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 140487,
      "endMs": 140667,
      "timestampMs": 140577,
      "confidence": null
    },
    {
      "text": " customize",
      "startMs": 140667,
      "endMs": 141187,
      "timestampMs": 140927,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 141187,
      "endMs": 141527,
      "timestampMs": 141357,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 141527,
      "endMs": 141707,
      "timestampMs": 141617,
      "confidence": null
    },
    {
      "text": " way",
      "startMs": 141707,
      "endMs": 141887,
      "timestampMs": 141797,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 141887,
      "endMs": 142047,
      "timestampMs": 141967,
      "confidence": null
    },
    {
      "text": " want.",
      "startMs": 142047,
      "endMs": 142367,
      "timestampMs": 142207,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 142792,
      "endMs": 142912,
      "timestampMs": 142852,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 142912,
      "endMs": 143032,
      "timestampMs": 142972,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 143032,
      "endMs": 143212,
      "timestampMs": 143122,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 143212,
      "endMs": 143497,
      "timestampMs": 143355,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 143612,
      "endMs": 143772,
      "timestampMs": 143692,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 143772,
      "endMs": 144152,
      "timestampMs": 143962,
      "confidence": null
    },
    {
      "text": " presets,",
      "startMs": 144152,
      "endMs": 144592,
      "timestampMs": 144372,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 144592,
      "endMs": 144672,
      "timestampMs": 144632,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 148250,
      "endMs": 148415,
      "timestampMs": 148333,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 148415,
      "endMs": 148535,
      "timestampMs": 148475,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 148535,
      "endMs": 148715,
      "timestampMs": 148625,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 148715,
      "endMs": 149315,
      "timestampMs": 149015,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 149495,
      "endMs": 149735,
      "timestampMs": 149615,
      "confidence": null
    },
    {
      "text": " projector",
      "startMs": 149735,
      "endMs": 150235,
      "timestampMs": 149985,
      "confidence": null
    },
    {
      "text": " already",
      "startMs": 150235,
      "endMs": 150515,
      "timestampMs": 150375,
      "confidence": null
    },
    {
      "text": " turned",
      "startMs": 150515,
      "endMs": 150815,
      "timestampMs": 150665,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 150815,
      "endMs": 150865,
      "timestampMs": 150840,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 150855,
      "endMs": 151115,
      "timestampMs": 150985,
      "confidence": null
    },
    {
      "text": " off,",
      "startMs": 151115,
      "endMs": 151380,
      "timestampMs": 151248,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 151780,
      "endMs": 151880,
      "timestampMs": 151830,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 151880,
      "endMs": 152100,
      "timestampMs": 151990,
      "confidence": null
    },
    {
      "text": " assign",
      "startMs": 152100,
      "endMs": 152460,
      "timestampMs": 152280,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 152460,
      "endMs": 152580,
      "timestampMs": 152520,
      "confidence": null
    },
    {
      "text": " switcher,",
      "startMs": 152580,
      "endMs": 153180,
      "timestampMs": 152880,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 153618,
      "endMs": 153738,
      "timestampMs": 153678,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 153738,
      "endMs": 153858,
      "timestampMs": 153798,
      "confidence": null
    },
    {
      "text": " Epson",
      "startMs": 153858,
      "endMs": 154198,
      "timestampMs": 154028,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 154198,
      "endMs": 154338,
      "timestampMs": 154268,
      "confidence": null
    },
    {
      "text": " been",
      "startMs": 154338,
      "endMs": 154743,
      "timestampMs": 154541,
      "confidence": null
    },
    {
      "text": " selected",
      "startMs": 154798,
      "endMs": 155318,
      "timestampMs": 155058,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 155318,
      "endMs": 155518,
      "timestampMs": 155418,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 155518,
      "endMs": 155658,
      "timestampMs": 155588,
      "confidence": null
    },
    {
      "text": " switcher,",
      "startMs": 155658,
      "endMs": 156178,
      "timestampMs": 155918,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 156874,
      "endMs": 156974,
      "timestampMs": 156924,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 156974,
      "endMs": 157094,
      "timestampMs": 157034,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 157094,
      "endMs": 157194,
      "timestampMs": 157144,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 157194,
      "endMs": 157354,
      "timestampMs": 157274,
      "confidence": null
    },
    {
      "text": " assign",
      "startMs": 157354,
      "endMs": 157854,
      "timestampMs": 157604,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 157854,
      "endMs": 158074,
      "timestampMs": 157964,
      "confidence": null
    },
    {
      "text": " audio",
      "startMs": 158074,
      "endMs": 158594,
      "timestampMs": 158334,
      "confidence": null
    },
    {
      "text": " levels.",
      "startMs": 158594,
      "endMs": 159164,
      "timestampMs": 158879,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 159514,
      "endMs": 159614,
      "timestampMs": 159564,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 159614,
      "endMs": 159774,
      "timestampMs": 159694,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 159774,
      "endMs": 160014,
      "timestampMs": 159894,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 160014,
      "endMs": 160194,
      "timestampMs": 160104,
      "confidence": null
    },
    {
      "text": " what's",
      "startMs": 160194,
      "endMs": 160434,
      "timestampMs": 160314,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 160434,
      "endMs": 160594,
      "timestampMs": 160514,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 160594,
      "endMs": 160694,
      "timestampMs": 160644,
      "confidence": null
    },
    {
      "text": " get",
      "startMs": 160694,
      "endMs": 160954,
      "timestampMs": 160824,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 160954,
      "endMs": 161254,
      "timestampMs": 161104,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 161254,
      "endMs": 161449,
      "timestampMs": 161352,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 161602,
      "endMs": 161702,
      "timestampMs": 161652,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 161702,
      "endMs": 161942,
      "timestampMs": 161822,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 161942,
      "endMs": 162302,
      "timestampMs": 162122,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 162302,
      "endMs": 162682,
      "timestampMs": 162492,
      "confidence": null
    },
    {
      "text": " interface.",
      "startMs": 162682,
      "endMs": 163222,
      "timestampMs": 162952,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 164770,
      "endMs": 164910,
      "timestampMs": 164840,
      "confidence": null
    },
    {
      "text": " once",
      "startMs": 164910,
      "endMs": 165050,
      "timestampMs": 164980,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 165050,
      "endMs": 165210,
      "timestampMs": 165130,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 165210,
      "endMs": 165390,
      "timestampMs": 165300,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 165390,
      "endMs": 165570,
      "timestampMs": 165480,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 165570,
      "endMs": 165710,
      "timestampMs": 165640,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 165710,
      "endMs": 166010,
      "timestampMs": 165860,
      "confidence": null
    },
    {
      "text": " up,",
      "startMs": 166010,
      "endMs": 166230,
      "timestampMs": 166120,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 166230,
      "endMs": 166445,
      "timestampMs": 166338,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 166590,
      "endMs": 166830,
      "timestampMs": 166710,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 166830,
      "endMs": 166910,
      "timestampMs": 166870,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 166910,
      "endMs": 167030,
      "timestampMs": 166970,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 167030,
      "endMs": 167210,
      "timestampMs": 167120,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 167210,
      "endMs": 167450,
      "timestampMs": 167330,
      "confidence": null
    },
    {
      "text": " interface,",
      "startMs": 167450,
      "endMs": 168125,
      "timestampMs": 167788,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 168530,
      "endMs": 168670,
      "timestampMs": 168600,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 168670,
      "endMs": 169020,
      "timestampMs": 168845,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 169150,
      "endMs": 169390,
      "timestampMs": 169270,
      "confidence": null
    },
    {
      "text": " locks",
      "startMs": 169390,
      "endMs": 169770,
      "timestampMs": 169580,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 169770,
      "endMs": 169890,
      "timestampMs": 169830,
      "confidence": null
    },
    {
      "text": " down",
      "startMs": 169890,
      "endMs": 170435,
      "timestampMs": 170163,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 170678,
      "endMs": 170938,
      "timestampMs": 170808,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 170938,
      "endMs": 171118,
      "timestampMs": 171028,
      "confidence": null
    },
    {
      "text": " actual",
      "startMs": 171118,
      "endMs": 171478,
      "timestampMs": 171298,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 171478,
      "endMs": 171738,
      "timestampMs": 171608,
      "confidence": null
    },
    {
      "text": " user,",
      "startMs": 171738,
      "endMs": 172078,
      "timestampMs": 171908,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 172398,
      "endMs": 172623,
      "timestampMs": 172510,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 173098,
      "endMs": 173258,
      "timestampMs": 173178,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 173258,
      "endMs": 173398,
      "timestampMs": 173328,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 173398,
      "endMs": 173558,
      "timestampMs": 173478,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 173558,
      "endMs": 173858,
      "timestampMs": 173708,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 173858,
      "endMs": 174018,
      "timestampMs": 173938,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 174018,
      "endMs": 174198,
      "timestampMs": 174108,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 174198,
      "endMs": 174338,
      "timestampMs": 174268,
      "confidence": null
    },
    {
      "text": " technician.",
      "startMs": 174338,
      "endMs": 174828,
      "timestampMs": 174583,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 175128,
      "endMs": 175458,
      "timestampMs": 175293,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 175691,
      "endMs": 175931,
      "timestampMs": 175811,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 175931,
      "endMs": 175981,
      "timestampMs": 175956,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 175931,
      "endMs": 176311,
      "timestampMs": 176121,
      "confidence": null
    },
    {
      "text": " my",
      "startMs": 176311,
      "endMs": 176551,
      "timestampMs": 176431,
      "confidence": null
    },
    {
      "text": " TV,",
      "startMs": 176619,
      "endMs": 177264,
      "timestampMs": 176942,
      "confidence": null
    },
    {
      "text": " my",
      "startMs": 177700,
      "endMs": 177880,
      "timestampMs": 177790,
      "confidence": null
    },
    {
      "text": " projector",
      "startMs": 177880,
      "endMs": 178300,
      "timestampMs": 178090,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 178300,
      "endMs": 178380,
      "timestampMs": 178340,
      "confidence": null
    },
    {
      "text": " switching,",
      "startMs": 178380,
      "endMs": 179070,
      "timestampMs": 178725,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 179650,
      "endMs": 179920,
      "timestampMs": 179785,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 180043,
      "endMs": 180123,
      "timestampMs": 180083,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 180123,
      "endMs": 180443,
      "timestampMs": 180283,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 180443,
      "endMs": 180723,
      "timestampMs": 180583,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 180723,
      "endMs": 180843,
      "timestampMs": 180783,
      "confidence": null
    },
    {
      "text": " volume,",
      "startMs": 180843,
      "endMs": 181503,
      "timestampMs": 181173,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 182931,
      "endMs": 183031,
      "timestampMs": 182981,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 183031,
      "endMs": 183191,
      "timestampMs": 183111,
      "confidence": null
    },
    {
      "text": " mute",
      "startMs": 183191,
      "endMs": 183531,
      "timestampMs": 183361,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 183531,
      "endMs": 183766,
      "timestampMs": 183648,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 184141,
      "endMs": 184261,
      "timestampMs": 184201,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 184261,
      "endMs": 184341,
      "timestampMs": 184301,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 184341,
      "endMs": 184481,
      "timestampMs": 184411,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 184481,
      "endMs": 184741,
      "timestampMs": 184611,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 184741,
      "endMs": 184861,
      "timestampMs": 184801,
      "confidence": null
    },
    {
      "text": " system",
      "startMs": 184861,
      "endMs": 185241,
      "timestampMs": 185051,
      "confidence": null
    },
    {
      "text": " down.",
      "startMs": 185241,
      "endMs": 185521,
      "timestampMs": 185381,
      "confidence": null
    },
    {
      "text": " Anytime",
      "startMs": 189770,
      "endMs": 190150,
      "timestampMs": 189960,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 190150,
      "endMs": 190210,
      "timestampMs": 190180,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 190210,
      "endMs": 190410,
      "timestampMs": 190310,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 190410,
      "endMs": 190530,
      "timestampMs": 190470,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 190530,
      "endMs": 190730,
      "timestampMs": 190630,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 190730,
      "endMs": 191070,
      "timestampMs": 190900,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 191070,
      "endMs": 191230,
      "timestampMs": 191150,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 191230,
      "endMs": 191550,
      "timestampMs": 191390,
      "confidence": null
    },
    {
      "text": " anything,",
      "startMs": 191550,
      "endMs": 192130,
      "timestampMs": 191840,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 192310,
      "endMs": 192390,
      "timestampMs": 192350,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 192390,
      "endMs": 192530,
      "timestampMs": 192460,
      "confidence": null
    },
    {
      "text": " press",
      "startMs": 192530,
      "endMs": 192770,
      "timestampMs": 192650,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 192770,
      "endMs": 192930,
      "timestampMs": 192850,
      "confidence": null
    },
    {
      "text": " hold",
      "startMs": 192930,
      "endMs": 193270,
      "timestampMs": 193100,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 193270,
      "endMs": 193370,
      "timestampMs": 193320,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 193370,
      "endMs": 193650,
      "timestampMs": 193510,
      "confidence": null
    },
    {
      "text": " setup",
      "startMs": 193650,
      "endMs": 193950,
      "timestampMs": 193800,
      "confidence": null
    },
    {
      "text": " button,",
      "startMs": 193950,
      "endMs": 194430,
      "timestampMs": 194190,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 194903,
      "endMs": 194983,
      "timestampMs": 194943,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 194983,
      "endMs": 195143,
      "timestampMs": 195063,
      "confidence": null
    },
    {
      "text": " take",
      "startMs": 195143,
      "endMs": 195303,
      "timestampMs": 195223,
      "confidence": null
    },
    {
      "text": " me",
      "startMs": 195303,
      "endMs": 195423,
      "timestampMs": 195363,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 195423,
      "endMs": 195623,
      "timestampMs": 195523,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 195623,
      "endMs": 195843,
      "timestampMs": 195733,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 195843,
      "endMs": 196123,
      "timestampMs": 195983,
      "confidence": null
    },
    {
      "text": " Let's",
      "startMs": 197785,
      "endMs": 197905,
      "timestampMs": 197845,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 197905,
      "endMs": 198085,
      "timestampMs": 197995,
      "confidence": null
    },
    {
      "text": " ahead",
      "startMs": 198085,
      "endMs": 198325,
      "timestampMs": 198205,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 198325,
      "endMs": 198505,
      "timestampMs": 198415,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 198505,
      "endMs": 198745,
      "timestampMs": 198625,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 198745,
      "endMs": 199035,
      "timestampMs": 198890,
      "confidence": null
    },
    {
      "text": " more",
      "startMs": 199165,
      "endMs": 199345,
      "timestampMs": 199255,
      "confidence": null
    },
    {
      "text": " devices.",
      "startMs": 199345,
      "endMs": 199990,
      "timestampMs": 199668,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 200330,
      "endMs": 200460,
      "timestampMs": 200395,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 200460,
      "endMs": 200640,
      "timestampMs": 200550,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 200640,
      "endMs": 200760,
      "timestampMs": 200700,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 200760,
      "endMs": 200860,
      "timestampMs": 200810,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 200860,
      "endMs": 201000,
      "timestampMs": 200930,
      "confidence": null
    },
    {
      "text": " corner,",
      "startMs": 201000,
      "endMs": 201380,
      "timestampMs": 201190,
      "confidence": null
    },
    {
      "text": " there's",
      "startMs": 201380,
      "endMs": 201960,
      "timestampMs": 201670,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 201960,
      "endMs": 202020,
      "timestampMs": 201990,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 202020,
      "endMs": 202280,
      "timestampMs": 202150,
      "confidence": null
    },
    {
      "text": " discovery",
      "startMs": 202280,
      "endMs": 203045,
      "timestampMs": 202663,
      "confidence": null
    },
    {
      "text": " feature.",
      "startMs": 203063,
      "endMs": 203463,
      "timestampMs": 203263,
      "confidence": null
    },
    {
      "text": " Clicking",
      "startMs": 204103,
      "endMs": 204483,
      "timestampMs": 204293,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 204483,
      "endMs": 204603,
      "timestampMs": 204543,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 204603,
      "endMs": 204783,
      "timestampMs": 204693,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 205111,
      "endMs": 205311,
      "timestampMs": 205211,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 205311,
      "endMs": 205361,
      "timestampMs": 205336,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 205311,
      "endMs": 205619,
      "timestampMs": 205465,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 205884,
      "endMs": 206104,
      "timestampMs": 205994,
      "confidence": null
    },
    {
      "text": " scans",
      "startMs": 206104,
      "endMs": 206624,
      "timestampMs": 206364,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 206624,
      "endMs": 206704,
      "timestampMs": 206664,
      "confidence": null
    },
    {
      "text": " whole",
      "startMs": 206704,
      "endMs": 206924,
      "timestampMs": 206814,
      "confidence": null
    },
    {
      "text": " network",
      "startMs": 206924,
      "endMs": 207364,
      "timestampMs": 207144,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 208012,
      "endMs": 208152,
      "timestampMs": 208082,
      "confidence": null
    },
    {
      "text": " tries",
      "startMs": 208152,
      "endMs": 208472,
      "timestampMs": 208312,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 208472,
      "endMs": 208612,
      "timestampMs": 208542,
      "confidence": null
    },
    {
      "text": " find",
      "startMs": 208612,
      "endMs": 208852,
      "timestampMs": 208732,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 208852,
      "endMs": 208992,
      "timestampMs": 208922,
      "confidence": null
    },
    {
      "text": " match",
      "startMs": 208992,
      "endMs": 209572,
      "timestampMs": 209282,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 209572,
      "endMs": 209872,
      "timestampMs": 209722,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 209872,
      "endMs": 209992,
      "timestampMs": 209932,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 209992,
      "endMs": 210492,
      "timestampMs": 210242,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 210492,
      "endMs": 210632,
      "timestampMs": 210562,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 210632,
      "endMs": 210832,
      "timestampMs": 210732,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 210832,
      "endMs": 210932,
      "timestampMs": 210882,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 210932,
      "endMs": 211052,
      "timestampMs": 210992,
      "confidence": null
    },
    {
      "text": " network",
      "startMs": 211052,
      "endMs": 211532,
      "timestampMs": 211292,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 211988,
      "endMs": 212168,
      "timestampMs": 212078,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 212168,
      "endMs": 212408,
      "timestampMs": 212288,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 212408,
      "endMs": 212908,
      "timestampMs": 212658,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 212908,
      "endMs": 213203,
      "timestampMs": 213056,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 213288,
      "endMs": 213388,
      "timestampMs": 213338,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 213388,
      "endMs": 213918,
      "timestampMs": 213653,
      "confidence": null
    },
    {
      "text": " driver",
      "startMs": 214006,
      "endMs": 214536,
      "timestampMs": 214271,
      "confidence": null
    },
    {
      "text": " database.",
      "startMs": 214606,
      "endMs": 215306,
      "timestampMs": 214956,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 217890,
      "endMs": 218110,
      "timestampMs": 218000,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 218110,
      "endMs": 218485,
      "timestampMs": 218297,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 218650,
      "endMs": 218770,
      "timestampMs": 218710,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 218770,
      "endMs": 218970,
      "timestampMs": 218870,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 218970,
      "endMs": 219050,
      "timestampMs": 219010,
      "confidence": null
    },
    {
      "text": " few",
      "startMs": 219050,
      "endMs": 219590,
      "timestampMs": 219320,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 219803,
      "endMs": 219978,
      "timestampMs": 219890,
      "confidence": null
    },
    {
      "text": " Matrox",
      "startMs": 220096,
      "endMs": 220936,
      "timestampMs": 220516,
      "confidence": null
    },
    {
      "text": " endpoints,",
      "startMs": 221189,
      "endMs": 221849,
      "timestampMs": 221519,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 222209,
      "endMs": 222504,
      "timestampMs": 222357,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 222904,
      "endMs": 223024,
      "timestampMs": 222964,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 223024,
      "endMs": 223524,
      "timestampMs": 223274,
      "confidence": null
    },
    {
      "text": " use",
      "startMs": 223524,
      "endMs": 224104,
      "timestampMs": 223814,
      "confidence": null
    },
    {
      "text": " IPMX,",
      "startMs": 224184,
      "endMs": 225059,
      "timestampMs": 224621,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 225434,
      "endMs": 225494,
      "timestampMs": 225464,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 225494,
      "endMs": 225774,
      "timestampMs": 225634,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 225774,
      "endMs": 226114,
      "timestampMs": 225944,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 226114,
      "endMs": 226254,
      "timestampMs": 226184,
      "confidence": null
    },
    {
      "text": " these.",
      "startMs": 226254,
      "endMs": 226719,
      "timestampMs": 226487,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 226719,
      "endMs": 227602,
      "timestampMs": 227161,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 227602,
      "endMs": 227802,
      "timestampMs": 227702,
      "confidence": null
    },
    {
      "text": " click,",
      "startMs": 227802,
      "endMs": 228042,
      "timestampMs": 227922,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 228182,
      "endMs": 228362,
      "timestampMs": 228272,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 228362,
      "endMs": 228502,
      "timestampMs": 228432,
      "confidence": null
    },
    {
      "text": " need.",
      "startMs": 228502,
      "endMs": 228862,
      "timestampMs": 228682,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 229252,
      "endMs": 229332,
      "timestampMs": 229292,
      "confidence": null
    },
    {
      "text": " there's",
      "startMs": 229332,
      "endMs": 229552,
      "timestampMs": 229442,
      "confidence": null
    },
    {
      "text": " setup",
      "startMs": 229552,
      "endMs": 229872,
      "timestampMs": 229712,
      "confidence": null
    },
    {
      "text": " information,",
      "startMs": 229872,
      "endMs": 230822,
      "timestampMs": 230347,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 231072,
      "endMs": 231352,
      "timestampMs": 231212,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 231352,
      "endMs": 231432,
      "timestampMs": 231392,
      "confidence": null
    },
    {
      "text": " login,",
      "startMs": 231432,
      "endMs": 232192,
      "timestampMs": 231812,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 232860,
      "endMs": 233180,
      "timestampMs": 233020,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 233180,
      "endMs": 233340,
      "timestampMs": 233260,
      "confidence": null
    },
    {
      "text": " kind",
      "startMs": 233340,
      "endMs": 233580,
      "timestampMs": 233460,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 233580,
      "endMs": 233748,
      "timestampMs": 233664,
      "confidence": null
    },
    {
      "text": " certificates",
      "startMs": 233783,
      "endMs": 234463,
      "timestampMs": 234123,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 234463,
      "endMs": 234523,
      "timestampMs": 234493,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 234523,
      "endMs": 234763,
      "timestampMs": 234643,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 234763,
      "endMs": 234903,
      "timestampMs": 234833,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 234903,
      "endMs": 235163,
      "timestampMs": 235033,
      "confidence": null
    },
    {
      "text": " authorized,",
      "startMs": 235163,
      "endMs": 235788,
      "timestampMs": 235476,
      "confidence": null
    },
    {
      "text": " they'll",
      "startMs": 235983,
      "endMs": 236203,
      "timestampMs": 236093,
      "confidence": null
    },
    {
      "text": " pop",
      "startMs": 236203,
      "endMs": 236503,
      "timestampMs": 236353,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 236503,
      "endMs": 236683,
      "timestampMs": 236593,
      "confidence": null
    },
    {
      "text": " automatically",
      "startMs": 236683,
      "endMs": 237198,
      "timestampMs": 236941,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 237763,
      "endMs": 238118,
      "timestampMs": 237941,
      "confidence": null
    },
    {
      "text": " await",
      "startMs": 238491,
      "endMs": 238751,
      "timestampMs": 238621,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 238751,
      "endMs": 238951,
      "timestampMs": 238851,
      "confidence": null
    },
    {
      "text": " approval,",
      "startMs": 238951,
      "endMs": 239561,
      "timestampMs": 239256,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 240121,
      "endMs": 240476,
      "timestampMs": 240299,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 240561,
      "endMs": 240841,
      "timestampMs": 240701,
      "confidence": null
    },
    {
      "text": " let",
      "startMs": 240841,
      "endMs": 240981,
      "timestampMs": 240911,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 240981,
      "endMs": 241241,
      "timestampMs": 241111,
      "confidence": null
    },
    {
      "text": " log",
      "startMs": 241241,
      "endMs": 241681,
      "timestampMs": 241461,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 241681,
      "endMs": 241981,
      "timestampMs": 241831,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 242457,
      "endMs": 242695,
      "timestampMs": 242576,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 242790,
      "endMs": 243290,
      "timestampMs": 243040,
      "confidence": null
    },
    {
      "text": " those",
      "startMs": 243290,
      "endMs": 243650,
      "timestampMs": 243470,
      "confidence": null
    },
    {
      "text": " values.",
      "startMs": 243650,
      "endMs": 244285,
      "timestampMs": 243968,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 248275,
      "endMs": 248515,
      "timestampMs": 248395,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 248515,
      "endMs": 248755,
      "timestampMs": 248635,
      "confidence": null
    },
    {
      "text": " each",
      "startMs": 248755,
      "endMs": 249015,
      "timestampMs": 248885,
      "confidence": null
    },
    {
      "text": " individual",
      "startMs": 249015,
      "endMs": 250095,
      "timestampMs": 249555,
      "confidence": null
    },
    {
      "text": " encoder",
      "startMs": 250590,
      "endMs": 250970,
      "timestampMs": 250780,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 250970,
      "endMs": 251130,
      "timestampMs": 251050,
      "confidence": null
    },
    {
      "text": " decoder,",
      "startMs": 251130,
      "endMs": 251840,
      "timestampMs": 251485,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 252310,
      "endMs": 252490,
      "timestampMs": 252400,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 252490,
      "endMs": 252630,
      "timestampMs": 252560,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 252630,
      "endMs": 253010,
      "timestampMs": 252820,
      "confidence": null
    },
    {
      "text": " switch",
      "startMs": 253010,
      "endMs": 253350,
      "timestampMs": 253180,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 253350,
      "endMs": 253490,
      "timestampMs": 253420,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 253490,
      "endMs": 253870,
      "timestampMs": 253680,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 253870,
      "endMs": 254130,
      "timestampMs": 254000,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 254130,
      "endMs": 254475,
      "timestampMs": 254302,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 256250,
      "endMs": 256485,
      "timestampMs": 256368,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 256485,
      "endMs": 256745,
      "timestampMs": 256615,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 256745,
      "endMs": 257085,
      "timestampMs": 256915,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 257085,
      "endMs": 257265,
      "timestampMs": 257175,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 257265,
      "endMs": 257405,
      "timestampMs": 257335,
      "confidence": null
    },
    {
      "text": " activities.",
      "startMs": 257405,
      "endMs": 258080,
      "timestampMs": 257742,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 258505,
      "endMs": 258785,
      "timestampMs": 258645,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 258785,
      "endMs": 258985,
      "timestampMs": 258885,
      "confidence": null
    },
    {
      "text": " we'll",
      "startMs": 258985,
      "endMs": 259245,
      "timestampMs": 259115,
      "confidence": null
    },
    {
      "text": " want",
      "startMs": 259245,
      "endMs": 259505,
      "timestampMs": 259375,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 259505,
      "endMs": 259725,
      "timestampMs": 259615,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 259725,
      "endMs": 260650,
      "timestampMs": 260188,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 260833,
      "endMs": 260993,
      "timestampMs": 260913,
      "confidence": null
    },
    {
      "text": " switcher",
      "startMs": 260993,
      "endMs": 261623,
      "timestampMs": 261308,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 261891,
      "endMs": 262131,
      "timestampMs": 262011,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 262131,
      "endMs": 262531,
      "timestampMs": 262331,
      "confidence": null
    },
    {
      "text": " encoders",
      "startMs": 262531,
      "endMs": 263031,
      "timestampMs": 262781,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 263031,
      "endMs": 263131,
      "timestampMs": 263081,
      "confidence": null
    },
    {
      "text": " decoders.",
      "startMs": 263131,
      "endMs": 263856,
      "timestampMs": 263494,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 264316,
      "endMs": 264416,
      "timestampMs": 264366,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 264416,
      "endMs": 264536,
      "timestampMs": 264476,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 264536,
      "endMs": 264716,
      "timestampMs": 264626,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 264716,
      "endMs": 264976,
      "timestampMs": 264846,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 264976,
      "endMs": 265296,
      "timestampMs": 265136,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 265296,
      "endMs": 266071,
      "timestampMs": 265684,
      "confidence": null
    },
    {
      "text": " convert",
      "startMs": 266076,
      "endMs": 266566,
      "timestampMs": 266321,
      "confidence": null
    },
    {
      "text": " IP,",
      "startMs": 266756,
      "endMs": 267361,
      "timestampMs": 267059,
      "confidence": null
    },
    {
      "text": " Matrox",
      "startMs": 267559,
      "endMs": 268344,
      "timestampMs": 267951,
      "confidence": null
    },
    {
      "text": " encoders",
      "startMs": 268447,
      "endMs": 268927,
      "timestampMs": 268687,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 268927,
      "endMs": 269027,
      "timestampMs": 268977,
      "confidence": null
    },
    {
      "text": " decoders",
      "startMs": 269027,
      "endMs": 269682,
      "timestampMs": 269355,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 269827,
      "endMs": 270007,
      "timestampMs": 269917,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 270007,
      "endMs": 270247,
      "timestampMs": 270127,
      "confidence": null
    },
    {
      "text": " up,",
      "startMs": 270247,
      "endMs": 270467,
      "timestampMs": 270357,
      "confidence": null
    },
    {
      "text": " ready",
      "startMs": 270467,
      "endMs": 270707,
      "timestampMs": 270587,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 270707,
      "endMs": 270827,
      "timestampMs": 270767,
      "confidence": null
    },
    {
      "text": " go.",
      "startMs": 270827,
      "endMs": 271262,
      "timestampMs": 271045,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 271697,
      "endMs": 271897,
      "timestampMs": 271797,
      "confidence": null
    },
    {
      "text": " we'll",
      "startMs": 271897,
      "endMs": 272097,
      "timestampMs": 271997,
      "confidence": null
    },
    {
      "text": " leave",
      "startMs": 272097,
      "endMs": 272257,
      "timestampMs": 272177,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 272257,
      "endMs": 272437,
      "timestampMs": 272347,
      "confidence": null
    },
    {
      "text": " audio",
      "startMs": 272437,
      "endMs": 272797,
      "timestampMs": 272617,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 272797,
      "endMs": 272957,
      "timestampMs": 272877,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 272957,
      "endMs": 273217,
      "timestampMs": 273087,
      "confidence": null
    },
    {
      "text": " display",
      "startMs": 273217,
      "endMs": 273927,
      "timestampMs": 273572,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 274185,
      "endMs": 274305,
      "timestampMs": 274245,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 274305,
      "endMs": 274425,
      "timestampMs": 274365,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 274425,
      "endMs": 275045,
      "timestampMs": 274735,
      "confidence": null
    },
    {
      "text": " already",
      "startMs": 275158,
      "endMs": 275438,
      "timestampMs": 275298,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 275438,
      "endMs": 275578,
      "timestampMs": 275508,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 275578,
      "endMs": 275628,
      "timestampMs": 275603,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 275578,
      "endMs": 275628,
      "timestampMs": 275603,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 275578,
      "endMs": 275738,
      "timestampMs": 275658,
      "confidence": null
    },
    {
      "text": " display.",
      "startMs": 276018,
      "endMs": 276418,
      "timestampMs": 276218,
      "confidence": null
    },
    {
      "text": " Now,",
      "startMs": 279820,
      "endMs": 280020,
      "timestampMs": 279920,
      "confidence": null
    },
    {
      "text": " when",
      "startMs": 280020,
      "endMs": 280180,
      "timestampMs": 280100,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 280180,
      "endMs": 280300,
      "timestampMs": 280240,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 280300,
      "endMs": 280500,
      "timestampMs": 280400,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 280500,
      "endMs": 280620,
      "timestampMs": 280560,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 280620,
      "endMs": 281025,
      "timestampMs": 280823,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 281300,
      "endMs": 281380,
      "timestampMs": 281340,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 281380,
      "endMs": 281580,
      "timestampMs": 281480,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 281580,
      "endMs": 281660,
      "timestampMs": 281620,
      "confidence": null
    },
    {
      "text": " very",
      "startMs": 281660,
      "endMs": 281880,
      "timestampMs": 281770,
      "confidence": null
    },
    {
      "text": " different",
      "startMs": 281880,
      "endMs": 282160,
      "timestampMs": 282020,
      "confidence": null
    },
    {
      "text": " interface,",
      "startMs": 282160,
      "endMs": 282835,
      "timestampMs": 282498,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 282940,
      "endMs": 283260,
      "timestampMs": 283100,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 283620,
      "endMs": 283740,
      "timestampMs": 283680,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 283740,
      "endMs": 283860,
      "timestampMs": 283800,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 283860,
      "endMs": 284040,
      "timestampMs": 283950,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 284040,
      "endMs": 284530,
      "timestampMs": 284285,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 284763,
      "endMs": 284963,
      "timestampMs": 284863,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 284963,
      "endMs": 285043,
      "timestampMs": 285003,
      "confidence": null
    },
    {
      "text": " takes",
      "startMs": 285043,
      "endMs": 285303,
      "timestampMs": 285173,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 285303,
      "endMs": 285583,
      "timestampMs": 285443,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 285583,
      "endMs": 285763,
      "timestampMs": 285673,
      "confidence": null
    },
    {
      "text": " press,",
      "startMs": 285763,
      "endMs": 286353,
      "timestampMs": 286058,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 286403,
      "endMs": 286623,
      "timestampMs": 286513,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 286623,
      "endMs": 286673,
      "timestampMs": 286648,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 286623,
      "endMs": 286673,
      "timestampMs": 286648,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 286623,
      "endMs": 286783,
      "timestampMs": 286703,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 286783,
      "endMs": 287023,
      "timestampMs": 286903,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 287023,
      "endMs": 287243,
      "timestampMs": 287133,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 287243,
      "endMs": 287718,
      "timestampMs": 287481,
      "confidence": null
    },
    {
      "text": " We",
      "startMs": 288058,
      "endMs": 288193,
      "timestampMs": 288126,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 288193,
      "endMs": 288473,
      "timestampMs": 288333,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 288473,
      "endMs": 288713,
      "timestampMs": 288593,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 288713,
      "endMs": 288793,
      "timestampMs": 288753,
      "confidence": null
    },
    {
      "text": " drag",
      "startMs": 288793,
      "endMs": 289093,
      "timestampMs": 288943,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 289093,
      "endMs": 289233,
      "timestampMs": 289163,
      "confidence": null
    },
    {
      "text": " drop",
      "startMs": 289233,
      "endMs": 289573,
      "timestampMs": 289403,
      "confidence": null
    },
    {
      "text": " feature,",
      "startMs": 289573,
      "endMs": 289873,
      "timestampMs": 289723,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 289873,
      "endMs": 290193,
      "timestampMs": 290033,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 290473,
      "endMs": 290533,
      "timestampMs": 290503,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 290533,
      "endMs": 290793,
      "timestampMs": 290663,
      "confidence": null
    },
    {
      "text": " press",
      "startMs": 290793,
      "endMs": 290993,
      "timestampMs": 290893,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 290993,
      "endMs": 291153,
      "timestampMs": 291073,
      "confidence": null
    },
    {
      "text": " hold",
      "startMs": 291153,
      "endMs": 291553,
      "timestampMs": 291353,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 291781,
      "endMs": 291901,
      "timestampMs": 291841,
      "confidence": null
    },
    {
      "text": " drag",
      "startMs": 291901,
      "endMs": 292181,
      "timestampMs": 292041,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 292181,
      "endMs": 292301,
      "timestampMs": 292241,
      "confidence": null
    },
    {
      "text": " over.",
      "startMs": 292301,
      "endMs": 292571,
      "timestampMs": 292436,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 293001,
      "endMs": 293071,
      "timestampMs": 293036,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 293071,
      "endMs": 293211,
      "timestampMs": 293141,
      "confidence": null
    },
    {
      "text": " course,",
      "startMs": 293211,
      "endMs": 293686,
      "timestampMs": 293448,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 293711,
      "endMs": 293891,
      "timestampMs": 293801,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 293891,
      "endMs": 294131,
      "timestampMs": 294011,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 294131,
      "endMs": 294376,
      "timestampMs": 294254,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 294534,
      "endMs": 294754,
      "timestampMs": 294644,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 294754,
      "endMs": 295054,
      "timestampMs": 294904,
      "confidence": null
    },
    {
      "text": " all.",
      "startMs": 295054,
      "endMs": 295379,
      "timestampMs": 295217,
      "confidence": null
    },
    {
      "text": " At",
      "startMs": 295759,
      "endMs": 295859,
      "timestampMs": 295809,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 295859,
      "endMs": 296019,
      "timestampMs": 295939,
      "confidence": null
    },
    {
      "text": " time,",
      "startMs": 296019,
      "endMs": 296219,
      "timestampMs": 296119,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 296219,
      "endMs": 296319,
      "timestampMs": 296269,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 296319,
      "endMs": 296519,
      "timestampMs": 296419,
      "confidence": null
    },
    {
      "text": " select",
      "startMs": 296519,
      "endMs": 296919,
      "timestampMs": 296719,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 297112,
      "endMs": 297232,
      "timestampMs": 297172,
      "confidence": null
    },
    {
      "text": " input",
      "startMs": 297232,
      "endMs": 297727,
      "timestampMs": 297480,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 297950,
      "endMs": 298240,
      "timestampMs": 298095,
      "confidence": null
    },
    {
      "text": " press",
      "startMs": 298303,
      "endMs": 298643,
      "timestampMs": 298473,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 298643,
      "endMs": 298803,
      "timestampMs": 298723,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 298803,
      "endMs": 299063,
      "timestampMs": 298933,
      "confidence": null
    },
    {
      "text": " button,",
      "startMs": 299063,
      "endMs": 299483,
      "timestampMs": 299273,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 299523,
      "endMs": 299623,
      "timestampMs": 299573,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 299623,
      "endMs": 299723,
      "timestampMs": 299673,
      "confidence": null
    },
    {
      "text": " sends",
      "startMs": 299723,
      "endMs": 299983,
      "timestampMs": 299853,
      "confidence": null
    },
    {
      "text": " everything",
      "startMs": 299983,
      "endMs": 300503,
      "timestampMs": 300243,
      "confidence": null
    },
    {
      "text": " where",
      "startMs": 300681,
      "endMs": 300841,
      "timestampMs": 300761,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 300841,
      "endMs": 300961,
      "timestampMs": 300901,
      "confidence": null
    },
    {
      "text": " needs",
      "startMs": 300961,
      "endMs": 301121,
      "timestampMs": 301041,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 301121,
      "endMs": 301181,
      "timestampMs": 301151,
      "confidence": null
    },
    {
      "text": " go.",
      "startMs": 301181,
      "endMs": 301486,
      "timestampMs": 301333,
      "confidence": null
    },
    {
      "text": " At",
      "startMs": 304305,
      "endMs": 304425,
      "timestampMs": 304365,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 304425,
      "endMs": 304605,
      "timestampMs": 304515,
      "confidence": null
    },
    {
      "text": " time,",
      "startMs": 304605,
      "endMs": 305065,
      "timestampMs": 304835,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 305065,
      "endMs": 305185,
      "timestampMs": 305125,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 305185,
      "endMs": 305325,
      "timestampMs": 305255,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 305325,
      "endMs": 305845,
      "timestampMs": 305585,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 305925,
      "endMs": 306085,
      "timestampMs": 306005,
      "confidence": null
    },
    {
      "text": " start",
      "startMs": 306085,
      "endMs": 306465,
      "timestampMs": 306275,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 306465,
      "endMs": 306940,
      "timestampMs": 306703,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 307165,
      "endMs": 307265,
      "timestampMs": 307215,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 307265,
      "endMs": 307345,
      "timestampMs": 307305,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 307345,
      "endMs": 307605,
      "timestampMs": 307475,
      "confidence": null
    },
    {
      "text": " help",
      "startMs": 307605,
      "endMs": 307875,
      "timestampMs": 307740,
      "confidence": null
    },
    {
      "text": " full",
      "startMs": 308175,
      "endMs": 308705,
      "timestampMs": 308440,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 308735,
      "endMs": 308995,
      "timestampMs": 308865,
      "confidence": null
    },
    {
      "text": " manual,",
      "startMs": 308995,
      "endMs": 309335,
      "timestampMs": 309165,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 309335,
      "endMs": 309615,
      "timestampMs": 309475,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 309615,
      "endMs": 309755,
      "timestampMs": 309685,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 309755,
      "endMs": 309875,
      "timestampMs": 309815,
      "confidence": null
    },
    {
      "text": " found",
      "startMs": 309875,
      "endMs": 310135,
      "timestampMs": 310005,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 310135,
      "endMs": 310375,
      "timestampMs": 310255,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 310375,
      "endMs": 310820,
      "timestampMs": 310597,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 311245,
      "endMs": 311545,
      "timestampMs": 311395,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 311545,
      "endMs": 311788,
      "timestampMs": 311667,
      "confidence": null
    },
    {
      "text": " quick",
      "startMs": 311793,
      "endMs": 312013,
      "timestampMs": 311903,
      "confidence": null
    },
    {
      "text": " start,",
      "startMs": 312013,
      "endMs": 312393,
      "timestampMs": 312203,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 312393,
      "endMs": 312473,
      "timestampMs": 312433,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 312473,
      "endMs": 312573,
      "timestampMs": 312523,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 312573,
      "endMs": 312761,
      "timestampMs": 312667,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 312766,
      "endMs": 313046,
      "timestampMs": 312906,
      "confidence": null
    },
    {
      "text": " watch",
      "startMs": 313046,
      "endMs": 313286,
      "timestampMs": 313166,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 313286,
      "endMs": 313346,
      "timestampMs": 313316,
      "confidence": null
    },
    {
      "text": " quick",
      "startMs": 313346,
      "endMs": 313586,
      "timestampMs": 313466,
      "confidence": null
    },
    {
      "text": " start",
      "startMs": 313586,
      "endMs": 313846,
      "timestampMs": 313716,
      "confidence": null
    },
    {
      "text": " again,",
      "startMs": 313846,
      "endMs": 314216,
      "timestampMs": 314031,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 314399,
      "endMs": 314519,
      "timestampMs": 314459,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 314519,
      "endMs": 315009,
      "timestampMs": 314764,
      "confidence": null
    },
    {
      "text": " play",
      "startMs": 315019,
      "endMs": 315259,
      "timestampMs": 315139,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 315259,
      "endMs": 315399,
      "timestampMs": 315329,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 315399,
      "endMs": 315619,
      "timestampMs": 315509,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 315619,
      "endMs": 316079,
      "timestampMs": 315849,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 316689,
      "endMs": 316789,
      "timestampMs": 316739,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 316789,
      "endMs": 316839,
      "timestampMs": 316814,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 316829,
      "endMs": 316989,
      "timestampMs": 316909,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 316989,
      "endMs": 317189,
      "timestampMs": 317089,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 317189,
      "endMs": 317309,
      "timestampMs": 317249,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 317309,
      "endMs": 317429,
      "timestampMs": 317369,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 317429,
      "endMs": 317609,
      "timestampMs": 317519,
      "confidence": null
    },
    {
      "text": " factory",
      "startMs": 317609,
      "endMs": 318029,
      "timestampMs": 317819,
      "confidence": null
    },
    {
      "text": " reset",
      "startMs": 318029,
      "endMs": 318609,
      "timestampMs": 318319,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 318935,
      "endMs": 319075,
      "timestampMs": 319005,
      "confidence": null
    },
    {
      "text": " update",
      "startMs": 319075,
      "endMs": 319475,
      "timestampMs": 319275,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 319503,
      "endMs": 319793,
      "timestampMs": 319648,
      "confidence": null
    },
    {
      "text": " database,",
      "startMs": 319943,
      "endMs": 320698,
      "timestampMs": 320320,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 320886,
      "endMs": 321006,
      "timestampMs": 320946,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 321006,
      "endMs": 321146,
      "timestampMs": 321076,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 321146,
      "endMs": 321196,
      "timestampMs": 321171,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 321186,
      "endMs": 321386,
      "timestampMs": 321286,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 321386,
      "endMs": 321616,
      "timestampMs": 321501,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 321616,
      "endMs": 321756,
      "timestampMs": 321686,
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
    "ai-intro": [
      {
        "text": "The",
        "ms": 11265
      },
      {
        "text": "first",
        "ms": 11365
      },
      {
        "text": "thing",
        "ms": 11525
      },
      {
        "text": "you'll",
        "ms": 11645
      },
      {
        "text": "see",
        "ms": 11865
      },
      {
        "text": "when",
        "ms": 12905
      },
      {
        "text": "you",
        "ms": 13025
      },
      {
        "text": "open",
        "ms": 13205
      },
      {
        "text": "up",
        "ms": 13385
      },
      {
        "text": "the",
        "ms": 13505
      },
      {
        "text": "app",
        "ms": 13705
      },
      {
        "text": "is",
        "ms": 14105
      },
      {
        "text": "our",
        "ms": 14345
      },
      {
        "text": "CTRLbot",
        "ms": 14705
      },
      {
        "text": ".ai.",
        "ms": 15593
      }
    ],
    "ai-manual": [
      {
        "text": "And",
        "ms": 16768
      },
      {
        "text": "this",
        "ms": 16908
      },
      {
        "text": "is",
        "ms": 17168
      },
      {
        "text": "going",
        "ms": 17868
      },
      {
        "text": "to",
        "ms": 18148
      },
      {
        "text": "help",
        "ms": 18308
      },
      {
        "text": "you",
        "ms": 18548
      },
      {
        "text": "figure",
        "ms": 19128
      },
      {
        "text": "out",
        "ms": 19428
      },
      {
        "text": "and",
        "ms": 19673
      },
      {
        "text": "troubleshoot",
        "ms": 19928
      },
      {
        "text": "things",
        "ms": 20428
      },
      {
        "text": "and",
        "ms": 21028
      },
      {
        "text": "also",
        "ms": 21168
      },
      {
        "text": "is",
        "ms": 21728
      },
      {
        "text": "a",
        "ms": 22116
      },
      {
        "text": "living",
        "ms": 22196
      },
      {
        "text": "manual.",
        "ms": 23219
      }
    ],
    "ai-help": [
      {
        "text": "So",
        "ms": 24214
      },
      {
        "text": "anything,",
        "ms": 24474
      },
      {
        "text": "any",
        "ms": 25114
      },
      {
        "text": "questions",
        "ms": 25294
      },
      {
        "text": "you",
        "ms": 25634
      },
      {
        "text": "have",
        "ms": 25794
      },
      {
        "text": "about",
        "ms": 26127
      },
      {
        "text": "the",
        "ms": 26347
      },
      {
        "text": "application",
        "ms": 26467
      },
      {
        "text": "or",
        "ms": 27367
      },
      {
        "text": "how",
        "ms": 27487
      },
      {
        "text": "to",
        "ms": 27647
      },
      {
        "text": "set",
        "ms": 27727
      },
      {
        "text": "it",
        "ms": 27907
      },
      {
        "text": "up,",
        "ms": 28047
      },
      {
        "text": "you",
        "ms": 28047
      },
      {
        "text": "can",
        "ms": 28107
      },
      {
        "text": "just",
        "ms": 28735
      },
      {
        "text": "put",
        "ms": 29155
      },
      {
        "text": "in",
        "ms": 29315
      },
      {
        "text": "right",
        "ms": 29455
      },
      {
        "text": "here.",
        "ms": 29670
      }
    ],
    "db-devices": [
      {
        "text": "It",
        "ms": 33330
      },
      {
        "text": "all",
        "ms": 33430
      },
      {
        "text": "begins",
        "ms": 33630
      },
      {
        "text": "with",
        "ms": 33990
      },
      {
        "text": "adding",
        "ms": 34190
      },
      {
        "text": "devices,",
        "ms": 34450
      },
      {
        "text": "right?",
        "ms": 35470
      },
      {
        "text": "And",
        "ms": 35980
      },
      {
        "text": "we",
        "ms": 36080
      },
      {
        "text": "have",
        "ms": 36180
      },
      {
        "text": "an",
        "ms": 36320
      },
      {
        "text": "extensive",
        "ms": 36420
      },
      {
        "text": "device",
        "ms": 37133
      },
      {
        "text": "driver",
        "ms": 37608
      },
      {
        "text": "library",
        "ms": 37968
      },
      {
        "text": "of",
        "ms": 39028
      },
      {
        "text": "IP",
        "ms": 39308
      },
      {
        "text": "RS",
        "ms": 40048
      },
      {
        "text": "-232",
        "ms": 40228
      },
      {
        "text": "and",
        "ms": 41148
      },
      {
        "text": "IR",
        "ms": 41568
      },
      {
        "text": "as",
        "ms": 41748
      },
      {
        "text": "well.",
        "ms": 41928
      }
    ],
    "db-sorting": [
      {
        "text": "In",
        "ms": 42613
      },
      {
        "text": "order",
        "ms": 42673
      },
      {
        "text": "to",
        "ms": 42853
      },
      {
        "text": "use",
        "ms": 43153
      },
      {
        "text": "RS",
        "ms": 43413
      },
      {
        "text": "-232",
        "ms": 43633
      },
      {
        "text": "or",
        "ms": 44493
      },
      {
        "text": "IR,",
        "ms": 45006
      },
      {
        "text": "you'll",
        "ms": 45426
      },
      {
        "text": "have",
        "ms": 45946
      },
      {
        "text": "to",
        "ms": 46166
      },
      {
        "text": "use",
        "ms": 46366
      },
      {
        "text": "one",
        "ms": 46626
      },
      {
        "text": "of",
        "ms": 46766
      },
      {
        "text": "our",
        "ms": 46886
      },
      {
        "text": "endpoints",
        "ms": 47086
      },
      {
        "text": "and",
        "ms": 48014
      },
      {
        "text": "you",
        "ms": 48134
      },
      {
        "text": "can",
        "ms": 48274
      },
      {
        "text": "always",
        "ms": 48654
      },
      {
        "text": "sort",
        "ms": 48914
      },
      {
        "text": "these",
        "ms": 49154
      },
      {
        "text": "things",
        "ms": 49354
      },
      {
        "text": "out",
        "ms": 49774
      },
      {
        "text": "through",
        "ms": 50122
      },
      {
        "text": "our",
        "ms": 50780
      },
      {
        "text": "sorting",
        "ms": 50920
      },
      {
        "text": "right",
        "ms": 51260
      },
      {
        "text": "here.",
        "ms": 51760
      }
    ],
    "epson-add": [
      {
        "text": "Let's",
        "ms": 56360
      },
      {
        "text": "just",
        "ms": 56580
      },
      {
        "text": "add",
        "ms": 56800
      },
      {
        "text": "a",
        "ms": 56940
      },
      {
        "text": "projector.",
        "ms": 57020
      }
    ],
    "epson-info": [
      {
        "text": "And",
        "ms": 58060
      },
      {
        "text": "you",
        "ms": 58140
      },
      {
        "text": "can",
        "ms": 58220
      },
      {
        "text": "see",
        "ms": 58380
      },
      {
        "text": "when",
        "ms": 58540
      },
      {
        "text": "I",
        "ms": 58700
      },
      {
        "text": "click",
        "ms": 58800
      },
      {
        "text": "on",
        "ms": 59260
      },
      {
        "text": "the",
        "ms": 59620
      },
      {
        "text": "actual",
        "ms": 59800
      },
      {
        "text": "projector,",
        "ms": 60100
      },
      {
        "text": "it",
        "ms": 61040
      },
      {
        "text": "opens",
        "ms": 61140
      },
      {
        "text": "up",
        "ms": 61460
      },
      {
        "text": "this",
        "ms": 61600
      },
      {
        "text": "nice",
        "ms": 61800
      },
      {
        "text": "little",
        "ms": 62040
      },
      {
        "text": "page",
        "ms": 62280
      },
      {
        "text": "and",
        "ms": 62660
      },
      {
        "text": "gives",
        "ms": 62760
      },
      {
        "text": "you",
        "ms": 62900
      },
      {
        "text": "all",
        "ms": 63060
      },
      {
        "text": "kinds",
        "ms": 63220
      },
      {
        "text": "of",
        "ms": 63480
      },
      {
        "text": "great",
        "ms": 63620
      },
      {
        "text": "information.",
        "ms": 63880
      }
    ],
    "epson-webpage": [
      {
        "text": "If",
        "ms": 65075
      },
      {
        "text": "I",
        "ms": 65235
      },
      {
        "text": "want,",
        "ms": 65315
      },
      {
        "text": "I",
        "ms": 65595
      },
      {
        "text": "can",
        "ms": 65675
      },
      {
        "text": "go",
        "ms": 65855
      },
      {
        "text": "to",
        "ms": 65995
      },
      {
        "text": "the",
        "ms": 66235
      },
      {
        "text": "manufacturer",
        "ms": 66235
      },
      {
        "text": "webpage",
        "ms": 67148
      },
      {
        "text": "right",
        "ms": 67728
      },
      {
        "text": "here,",
        "ms": 68291
      },
      {
        "text": "and",
        "ms": 69079
      },
      {
        "text": "I",
        "ms": 69259
      },
      {
        "text": "can",
        "ms": 69399
      },
      {
        "text": "also",
        "ms": 69539
      },
      {
        "text": "go",
        "ms": 69799
      },
      {
        "text": "to",
        "ms": 69839
      },
      {
        "text": "the",
        "ms": 69939
      },
      {
        "text": "product",
        "ms": 70039
      },
      {
        "text": "page",
        "ms": 70519
      },
      {
        "text": "as",
        "ms": 71379
      },
      {
        "text": "well.",
        "ms": 71519
      }
    ],
    "epson-connection": [
      {
        "text": "And",
        "ms": 72584
      },
      {
        "text": "down",
        "ms": 72704
      },
      {
        "text": "here,",
        "ms": 72924
      },
      {
        "text": "you",
        "ms": 73124
      },
      {
        "text": "can",
        "ms": 73264
      },
      {
        "text": "see",
        "ms": 73464
      },
      {
        "text": "all",
        "ms": 74172
      },
      {
        "text": "kinds",
        "ms": 74352
      },
      {
        "text": "of",
        "ms": 74592
      },
      {
        "text": "all",
        "ms": 75012
      },
      {
        "text": "the",
        "ms": 75192
      },
      {
        "text": "information",
        "ms": 75312
      },
      {
        "text": "that",
        "ms": 75832
      },
      {
        "text": "you",
        "ms": 76012
      },
      {
        "text": "need",
        "ms": 76152
      },
      {
        "text": "to",
        "ms": 76745
      },
      {
        "text": "make",
        "ms": 76885
      },
      {
        "text": "the",
        "ms": 77085
      },
      {
        "text": "connection.",
        "ms": 77185
      }
    ],
    "add-ip": [
      {
        "text": "Just",
        "ms": 79830
      },
      {
        "text": "hitting",
        "ms": 80250
      },
      {
        "text": "plus",
        "ms": 80610
      },
      {
        "text": "will",
        "ms": 81370
      },
      {
        "text": "take",
        "ms": 81450
      },
      {
        "text": "you",
        "ms": 81630
      },
      {
        "text": "to",
        "ms": 81770
      },
      {
        "text": "this",
        "ms": 81890
      },
      {
        "text": "page.",
        "ms": 82090
      },
      {
        "text": "And",
        "ms": 83110
      },
      {
        "text": "then",
        "ms": 83190
      },
      {
        "text": "we",
        "ms": 83410
      },
      {
        "text": "can",
        "ms": 83510
      },
      {
        "text": "just",
        "ms": 83650
      },
      {
        "text": "put",
        "ms": 83850
      },
      {
        "text": "in",
        "ms": 84150
      },
      {
        "text": "the",
        "ms": 84583
      },
      {
        "text": "IP",
        "ms": 84693
      },
      {
        "text": "address",
        "ms": 84893
      },
      {
        "text": "of",
        "ms": 85553
      },
      {
        "text": "our",
        "ms": 85871
      },
      {
        "text": "projector.",
        "ms": 86031
      }
    ],
    "add-saved": [
      {
        "text": "Pressing",
        "ms": 86961
      },
      {
        "text": "connect,",
        "ms": 87441
      },
      {
        "text": "once",
        "ms": 88181
      },
      {
        "text": "that",
        "ms": 88321
      },
      {
        "text": "connection",
        "ms": 88461
      },
      {
        "text": "is",
        "ms": 88921
      },
      {
        "text": "made,",
        "ms": 89081
      },
      {
        "text": "it",
        "ms": 89561
      },
      {
        "text": "automatically",
        "ms": 89641
      },
      {
        "text": "saves",
        "ms": 90341
      },
      {
        "text": "that",
        "ms": 90821
      },
      {
        "text": "connection.",
        "ms": 90961
      },
      {
        "text": "So",
        "ms": 91821
      },
      {
        "text": "you",
        "ms": 91981
      },
      {
        "text": "don't",
        "ms": 92161
      },
      {
        "text": "have",
        "ms": 92601
      },
      {
        "text": "to",
        "ms": 92721
      },
      {
        "text": "actually",
        "ms": 93001
      },
      {
        "text": "hit",
        "ms": 93321
      },
      {
        "text": "a",
        "ms": 93521
      },
      {
        "text": "save",
        "ms": 93601
      },
      {
        "text": "button.",
        "ms": 93861
      }
    ],
    "term-commands": [
      {
        "text": "And",
        "ms": 95770
      },
      {
        "text": "if",
        "ms": 95870
      },
      {
        "text": "you",
        "ms": 95950
      },
      {
        "text": "want,",
        "ms": 96090
      },
      {
        "text": "you",
        "ms": 96270
      },
      {
        "text": "can",
        "ms": 96390
      },
      {
        "text": "test",
        "ms": 97318
      },
      {
        "text": "some",
        "ms": 98098
      },
      {
        "text": "of",
        "ms": 98278
      },
      {
        "text": "these",
        "ms": 98358
      },
      {
        "text": "commands",
        "ms": 98598
      },
      {
        "text": "right",
        "ms": 99138
      },
      {
        "text": "here.",
        "ms": 99473
      }
    ],
    "test-device": [
      {
        "text": "If",
        "ms": 101300
      },
      {
        "text": "you",
        "ms": 101380
      },
      {
        "text": "need",
        "ms": 101520
      },
      {
        "text": "to",
        "ms": 101720
      },
      {
        "text": "test",
        "ms": 101860
      },
      {
        "text": "the",
        "ms": 102120
      },
      {
        "text": "actual",
        "ms": 102240
      },
      {
        "text": "device,",
        "ms": 102540
      },
      {
        "text": "we",
        "ms": 103340
      },
      {
        "text": "have",
        "ms": 103420
      },
      {
        "text": "a",
        "ms": 103580
      },
      {
        "text": "little",
        "ms": 103660
      },
      {
        "text": "device",
        "ms": 103920
      },
      {
        "text": "testing",
        "ms": 104538
      },
      {
        "text": "page.",
        "ms": 104978
      },
      {
        "text": "There's",
        "ms": 105258
      },
      {
        "text": "like",
        "ms": 105668
      },
      {
        "text": "a",
        "ms": 105848
      },
      {
        "text": "tech",
        "ms": 105928
      },
      {
        "text": "page,",
        "ms": 106168
      },
      {
        "text": "right?",
        "ms": 106728
      },
      {
        "text": "So",
        "ms": 106908
      },
      {
        "text": "all",
        "ms": 107088
      },
      {
        "text": "the",
        "ms": 107248
      },
      {
        "text": "devices",
        "ms": 107328
      },
      {
        "text": "that",
        "ms": 107788
      },
      {
        "text": "you",
        "ms": 108008
      },
      {
        "text": "add",
        "ms": 108448
      },
      {
        "text": "to",
        "ms": 108963
      },
      {
        "text": "the",
        "ms": 109008
      },
      {
        "text": "system",
        "ms": 109168
      },
      {
        "text": "will",
        "ms": 109508
      },
      {
        "text": "be",
        "ms": 109668
      },
      {
        "text": "listed",
        "ms": 109768
      },
      {
        "text": "right",
        "ms": 110008
      },
      {
        "text": "here.",
        "ms": 110228
      }
    ],
    "test-remote": [
      {
        "text": "And",
        "ms": 111013
      },
      {
        "text": "then",
        "ms": 111093
      },
      {
        "text": "you",
        "ms": 111213
      },
      {
        "text": "can",
        "ms": 111313
      },
      {
        "text": "go",
        "ms": 111473
      },
      {
        "text": "through",
        "ms": 111653
      },
      {
        "text": "and",
        "ms": 112473
      },
      {
        "text": "test",
        "ms": 112786
      },
      {
        "text": "it",
        "ms": 113056
      },
      {
        "text": "out.",
        "ms": 113276
      }
    ],
    "test-switcher": [
      {
        "text": "And",
        "ms": 113901
      },
      {
        "text": "here's",
        "ms": 114021
      },
      {
        "text": "what",
        "ms": 114429
      },
      {
        "text": "it",
        "ms": 114609
      },
      {
        "text": "looked",
        "ms": 114769
      },
      {
        "text": "like",
        "ms": 114989
      },
      {
        "text": "as",
        "ms": 115209
      },
      {
        "text": "a",
        "ms": 115349
      },
      {
        "text": "switcher,",
        "ms": 115409
      },
      {
        "text": "right?",
        "ms": 115829
      }
    ],
    "test-terminal": [
      {
        "text": "And",
        "ms": 116722
      },
      {
        "text": "here's",
        "ms": 116802
      },
      {
        "text": "a",
        "ms": 117062
      },
      {
        "text": "terminal,",
        "ms": 117142
      },
      {
        "text": "always",
        "ms": 117942
      },
      {
        "text": "available",
        "ms": 118262
      },
      {
        "text": "so",
        "ms": 118882
      },
      {
        "text": "that",
        "ms": 119082
      },
      {
        "text": "you",
        "ms": 119082
      },
      {
        "text": "can",
        "ms": 119202
      },
      {
        "text": "always",
        "ms": 119322
      },
      {
        "text": "communicate",
        "ms": 119542
      },
      {
        "text": "with",
        "ms": 120062
      },
      {
        "text": "the",
        "ms": 120182
      },
      {
        "text": "device",
        "ms": 120282
      },
      {
        "text": "and",
        "ms": 121202
      },
      {
        "text": "test",
        "ms": 121390
      },
      {
        "text": "any",
        "ms": 121690
      },
      {
        "text": "of",
        "ms": 121850
      },
      {
        "text": "these",
        "ms": 121950
      },
      {
        "text": "commands.",
        "ms": 122170
      }
    ],
    "test-webpage": [
      {
        "text": "Also,",
        "ms": 123155
      },
      {
        "text": "if",
        "ms": 123535
      },
      {
        "text": "the",
        "ms": 123635
      },
      {
        "text": "device",
        "ms": 123715
      },
      {
        "text": "has",
        "ms": 124035
      },
      {
        "text": "a",
        "ms": 124275
      },
      {
        "text": "webpage,",
        "ms": 124275
      },
      {
        "text": "it'll",
        "ms": 124915
      },
      {
        "text": "take",
        "ms": 125135
      },
      {
        "text": "you",
        "ms": 125295
      },
      {
        "text": "to",
        "ms": 125475
      },
      {
        "text": "that",
        "ms": 125615
      },
      {
        "text": "webpage",
        "ms": 125815
      },
      {
        "text": "right",
        "ms": 126495
      },
      {
        "text": "here.",
        "ms": 126695
      }
    ],
    "act-next": [
      {
        "text": "The",
        "ms": 129250
      },
      {
        "text": "next",
        "ms": 129360
      },
      {
        "text": "step",
        "ms": 129540
      },
      {
        "text": "is",
        "ms": 129840
      },
      {
        "text": "going",
        "ms": 130000
      },
      {
        "text": "to",
        "ms": 130240
      },
      {
        "text": "be",
        "ms": 130320
      },
      {
        "text": "setting",
        "ms": 130520
      },
      {
        "text": "up",
        "ms": 130860
      },
      {
        "text": "the",
        "ms": 131120
      },
      {
        "text": "activities.",
        "ms": 131260
      },
      {
        "text": "And",
        "ms": 132440
      },
      {
        "text": "these",
        "ms": 132720
      },
      {
        "text": "activities",
        "ms": 133200
      },
      {
        "text": "form",
        "ms": 134038
      },
      {
        "text": "themselves,",
        "ms": 134358
      },
      {
        "text": "right?",
        "ms": 135516
      }
    ],
    "act-customize": [
      {
        "text": "So",
        "ms": 136186
      },
      {
        "text": "there",
        "ms": 136186
      },
      {
        "text": "isn't",
        "ms": 136396
      },
      {
        "text": "a",
        "ms": 136716
      },
      {
        "text": "whole",
        "ms": 136836
      },
      {
        "text": "lot",
        "ms": 137156
      },
      {
        "text": "that",
        "ms": 137756
      },
      {
        "text": "you",
        "ms": 137996
      },
      {
        "text": "have",
        "ms": 138414
      },
      {
        "text": "to",
        "ms": 138694
      },
      {
        "text": "do,",
        "ms": 138854
      },
      {
        "text": "but",
        "ms": 139587
      },
      {
        "text": "of",
        "ms": 139887
      },
      {
        "text": "course",
        "ms": 140067
      },
      {
        "text": "you",
        "ms": 140347
      },
      {
        "text": "can",
        "ms": 140487
      },
      {
        "text": "customize",
        "ms": 140667
      },
      {
        "text": "this",
        "ms": 141187
      },
      {
        "text": "any",
        "ms": 141527
      },
      {
        "text": "way",
        "ms": 141707
      },
      {
        "text": "you",
        "ms": 141887
      },
      {
        "text": "want.",
        "ms": 142047
      }
    ],
    "act-presets": [
      {
        "text": "And",
        "ms": 142792
      },
      {
        "text": "so",
        "ms": 142912
      },
      {
        "text": "you",
        "ms": 143032
      },
      {
        "text": "have",
        "ms": 143212
      },
      {
        "text": "your",
        "ms": 143612
      },
      {
        "text": "power",
        "ms": 143772
      },
      {
        "text": "presets,",
        "ms": 144152
      },
      {
        "text": "right?",
        "ms": 144592
      }
    ],
    "switch-projector": [
      {
        "text": "You",
        "ms": 148250
      },
      {
        "text": "can",
        "ms": 148415
      },
      {
        "text": "see",
        "ms": 148535
      },
      {
        "text": "how",
        "ms": 148715
      },
      {
        "text": "our",
        "ms": 149495
      },
      {
        "text": "projector",
        "ms": 149735
      },
      {
        "text": "already",
        "ms": 150235
      },
      {
        "text": "turned",
        "ms": 150515
      },
      {
        "text": "on",
        "ms": 150815
      },
      {
        "text": "and",
        "ms": 150855
      },
      {
        "text": "off,",
        "ms": 151115
      }
    ],
    "switch-assign": [
      {
        "text": "you",
        "ms": 151780
      },
      {
        "text": "can",
        "ms": 151880
      },
      {
        "text": "assign",
        "ms": 152100
      },
      {
        "text": "a",
        "ms": 152460
      },
      {
        "text": "switcher,",
        "ms": 152580
      },
      {
        "text": "and",
        "ms": 153618
      },
      {
        "text": "the",
        "ms": 153738
      },
      {
        "text": "Epson",
        "ms": 153858
      },
      {
        "text": "has",
        "ms": 154198
      },
      {
        "text": "been",
        "ms": 154338
      },
      {
        "text": "selected",
        "ms": 154798
      },
      {
        "text": "as",
        "ms": 155318
      },
      {
        "text": "the",
        "ms": 155518
      },
      {
        "text": "switcher,",
        "ms": 155658
      },
      {
        "text": "and",
        "ms": 156874
      },
      {
        "text": "then",
        "ms": 156974
      },
      {
        "text": "you",
        "ms": 157094
      },
      {
        "text": "can",
        "ms": 157194
      },
      {
        "text": "assign",
        "ms": 157354
      },
      {
        "text": "the",
        "ms": 157854
      },
      {
        "text": "audio",
        "ms": 158074
      },
      {
        "text": "levels.",
        "ms": 158594
      }
    ],
    "switch-eui": [
      {
        "text": "And",
        "ms": 159514
      },
      {
        "text": "these",
        "ms": 159614
      },
      {
        "text": "are",
        "ms": 159774
      },
      {
        "text": "all",
        "ms": 160014
      },
      {
        "text": "what's",
        "ms": 160194
      },
      {
        "text": "going",
        "ms": 160434
      },
      {
        "text": "to",
        "ms": 160594
      },
      {
        "text": "get",
        "ms": 160694
      },
      {
        "text": "set",
        "ms": 160954
      },
      {
        "text": "up",
        "ms": 161254
      },
      {
        "text": "for",
        "ms": 161602
      },
      {
        "text": "the",
        "ms": 161702
      },
      {
        "text": "end",
        "ms": 161942
      },
      {
        "text": "user",
        "ms": 162302
      },
      {
        "text": "interface.",
        "ms": 162682
      }
    ],
    "eui-setup": [
      {
        "text": "And",
        "ms": 164770
      },
      {
        "text": "once",
        "ms": 164910
      },
      {
        "text": "you",
        "ms": 165050
      },
      {
        "text": "have",
        "ms": 165210
      },
      {
        "text": "all",
        "ms": 165390
      },
      {
        "text": "this",
        "ms": 165570
      },
      {
        "text": "set",
        "ms": 165710
      },
      {
        "text": "up,",
        "ms": 166010
      },
      {
        "text": "you",
        "ms": 166230
      },
      {
        "text": "click",
        "ms": 166590
      },
      {
        "text": "on",
        "ms": 166830
      },
      {
        "text": "the",
        "ms": 166910
      },
      {
        "text": "end",
        "ms": 167030
      },
      {
        "text": "user",
        "ms": 167210
      },
      {
        "text": "interface,",
        "ms": 167450
      },
      {
        "text": "and",
        "ms": 168530
      },
      {
        "text": "then",
        "ms": 168670
      },
      {
        "text": "this",
        "ms": 169150
      },
      {
        "text": "locks",
        "ms": 169390
      },
      {
        "text": "it",
        "ms": 169770
      },
      {
        "text": "down",
        "ms": 169890
      },
      {
        "text": "for",
        "ms": 170678
      },
      {
        "text": "the",
        "ms": 170938
      },
      {
        "text": "actual",
        "ms": 171118
      },
      {
        "text": "end",
        "ms": 171478
      },
      {
        "text": "user,",
        "ms": 171738
      },
      {
        "text": "right?",
        "ms": 172398
      },
      {
        "text": "And",
        "ms": 173098
      },
      {
        "text": "you",
        "ms": 173258
      },
      {
        "text": "can",
        "ms": 173398
      },
      {
        "text": "test",
        "ms": 173558
      },
      {
        "text": "it",
        "ms": 173858
      },
      {
        "text": "as",
        "ms": 174018
      },
      {
        "text": "the",
        "ms": 174198
      },
      {
        "text": "technician.",
        "ms": 174338
      }
    ],
    "eui-technician": [
      {
        "text": "and",
        "ms": 175128
      },
      {
        "text": "you",
        "ms": 175691
      },
      {
        "text": "can",
        "ms": 175931
      },
      {
        "text": "see",
        "ms": 175931
      },
      {
        "text": "my",
        "ms": 176311
      },
      {
        "text": "TV,",
        "ms": 176619
      },
      {
        "text": "my",
        "ms": 177700
      },
      {
        "text": "projector",
        "ms": 177880
      },
      {
        "text": "is",
        "ms": 178300
      },
      {
        "text": "switching,",
        "ms": 178380
      }
    ],
    "eui-volume-mute": [
      {
        "text": "and",
        "ms": 179650
      },
      {
        "text": "I",
        "ms": 180043
      },
      {
        "text": "can",
        "ms": 180123
      },
      {
        "text": "change",
        "ms": 180443
      },
      {
        "text": "the",
        "ms": 180723
      },
      {
        "text": "volume,",
        "ms": 180843
      },
      {
        "text": "I",
        "ms": 182931
      },
      {
        "text": "can",
        "ms": 183031
      },
      {
        "text": "mute",
        "ms": 183191
      },
      {
        "text": "it,",
        "ms": 183531
      }
    ],
    "eui-power": [
      {
        "text": "and",
        "ms": 184141
      },
      {
        "text": "I",
        "ms": 184261
      },
      {
        "text": "can",
        "ms": 184341
      },
      {
        "text": "power",
        "ms": 184481
      },
      {
        "text": "the",
        "ms": 184741
      },
      {
        "text": "system",
        "ms": 184861
      },
      {
        "text": "down.",
        "ms": 185241
      }
    ],
    "exit-hold": [
      {
        "text": "Anytime",
        "ms": 189770
      },
      {
        "text": "I",
        "ms": 190150
      },
      {
        "text": "need",
        "ms": 190210
      },
      {
        "text": "to",
        "ms": 190410
      },
      {
        "text": "go",
        "ms": 190530
      },
      {
        "text": "back",
        "ms": 190730
      },
      {
        "text": "and",
        "ms": 191070
      },
      {
        "text": "change",
        "ms": 191230
      },
      {
        "text": "anything,",
        "ms": 191550
      },
      {
        "text": "I",
        "ms": 192310
      },
      {
        "text": "just",
        "ms": 192390
      },
      {
        "text": "press",
        "ms": 192530
      },
      {
        "text": "and",
        "ms": 192770
      },
      {
        "text": "hold",
        "ms": 192930
      },
      {
        "text": "the",
        "ms": 193270
      },
      {
        "text": "little",
        "ms": 193370
      },
      {
        "text": "setup",
        "ms": 193650
      },
      {
        "text": "button,",
        "ms": 193950
      },
      {
        "text": "and",
        "ms": 194903
      },
      {
        "text": "it'll",
        "ms": 194983
      },
      {
        "text": "take",
        "ms": 195143
      },
      {
        "text": "me",
        "ms": 195303
      },
      {
        "text": "right",
        "ms": 195423
      },
      {
        "text": "back",
        "ms": 195623
      },
      {
        "text": "here.",
        "ms": 195843
      }
    ],
    "discovery-devices": [
      {
        "text": "Let's",
        "ms": 197785
      },
      {
        "text": "go",
        "ms": 197905
      },
      {
        "text": "ahead",
        "ms": 198085
      },
      {
        "text": "and",
        "ms": 198325
      },
      {
        "text": "add",
        "ms": 198505
      },
      {
        "text": "some",
        "ms": 198745
      },
      {
        "text": "more",
        "ms": 199165
      },
      {
        "text": "devices.",
        "ms": 199345
      }
    ],
    "discovery-scan": [
      {
        "text": "You",
        "ms": 200330
      },
      {
        "text": "see",
        "ms": 200460
      },
      {
        "text": "up",
        "ms": 200640
      },
      {
        "text": "in",
        "ms": 200760
      },
      {
        "text": "the",
        "ms": 200860
      },
      {
        "text": "corner,",
        "ms": 201000
      },
      {
        "text": "there's",
        "ms": 201380
      },
      {
        "text": "a",
        "ms": 201960
      },
      {
        "text": "little",
        "ms": 202020
      },
      {
        "text": "discovery",
        "ms": 202280
      },
      {
        "text": "feature.",
        "ms": 203063
      },
      {
        "text": "Clicking",
        "ms": 204103
      },
      {
        "text": "on",
        "ms": 204483
      },
      {
        "text": "it,",
        "ms": 204603
      },
      {
        "text": "you",
        "ms": 205111
      },
      {
        "text": "can",
        "ms": 205311
      },
      {
        "text": "see",
        "ms": 205311
      },
      {
        "text": "it",
        "ms": 205884
      },
      {
        "text": "scans",
        "ms": 206104
      },
      {
        "text": "a",
        "ms": 206624
      },
      {
        "text": "whole",
        "ms": 206704
      },
      {
        "text": "network",
        "ms": 206924
      },
      {
        "text": "and",
        "ms": 208012
      },
      {
        "text": "tries",
        "ms": 208152
      },
      {
        "text": "to",
        "ms": 208472
      },
      {
        "text": "find",
        "ms": 208612
      },
      {
        "text": "a",
        "ms": 208852
      },
      {
        "text": "match",
        "ms": 208992
      },
      {
        "text": "for",
        "ms": 209572
      },
      {
        "text": "the",
        "ms": 209872
      },
      {
        "text": "devices",
        "ms": 209992
      },
      {
        "text": "that",
        "ms": 210492
      },
      {
        "text": "are",
        "ms": 210632
      },
      {
        "text": "on",
        "ms": 210832
      },
      {
        "text": "the",
        "ms": 210932
      },
      {
        "text": "network",
        "ms": 211052
      },
      {
        "text": "that",
        "ms": 211988
      },
      {
        "text": "are",
        "ms": 212168
      },
      {
        "text": "also",
        "ms": 212408
      },
      {
        "text": "in",
        "ms": 212908
      },
      {
        "text": "the",
        "ms": 213288
      },
      {
        "text": "device",
        "ms": 213388
      },
      {
        "text": "driver",
        "ms": 214006
      },
      {
        "text": "database.",
        "ms": 214606
      }
    ],
    "matrox-endpoints": [
      {
        "text": "And",
        "ms": 217890
      },
      {
        "text": "so",
        "ms": 218110
      },
      {
        "text": "we",
        "ms": 218650
      },
      {
        "text": "have",
        "ms": 218770
      },
      {
        "text": "a",
        "ms": 218970
      },
      {
        "text": "few",
        "ms": 219050
      },
      {
        "text": "of",
        "ms": 219803
      },
      {
        "text": "Matrox",
        "ms": 220096
      },
      {
        "text": "endpoints,",
        "ms": 221189
      },
      {
        "text": "right?",
        "ms": 222209
      }
    ],
    "matrox-ipmx": [
      {
        "text": "And",
        "ms": 222904
      },
      {
        "text": "these",
        "ms": 223024
      },
      {
        "text": "use",
        "ms": 223524
      },
      {
        "text": "IPMX,",
        "ms": 224184
      }
    ],
    "matrox-add-these": [
      {
        "text": "So",
        "ms": 225434
      },
      {
        "text": "let's",
        "ms": 225494
      },
      {
        "text": "just",
        "ms": 225774
      },
      {
        "text": "add",
        "ms": 226114
      },
      {
        "text": "these.",
        "ms": 226254
      },
      {
        "text": "And",
        "ms": 226719
      },
      {
        "text": "one",
        "ms": 227602
      },
      {
        "text": "click,",
        "ms": 227802
      },
      {
        "text": "all",
        "ms": 228182
      },
      {
        "text": "you",
        "ms": 228362
      },
      {
        "text": "need.",
        "ms": 228502
      }
    ],
    "matrox-one-click": [
      {
        "text": "If",
        "ms": 229252
      },
      {
        "text": "there's",
        "ms": 229332
      },
      {
        "text": "setup",
        "ms": 229552
      },
      {
        "text": "information,",
        "ms": 229872
      },
      {
        "text": "like",
        "ms": 231072
      },
      {
        "text": "a",
        "ms": 231352
      },
      {
        "text": "login,",
        "ms": 231432
      },
      {
        "text": "or",
        "ms": 232860
      },
      {
        "text": "any",
        "ms": 233180
      },
      {
        "text": "kind",
        "ms": 233340
      },
      {
        "text": "of",
        "ms": 233580
      },
      {
        "text": "certificates",
        "ms": 233783
      },
      {
        "text": "that",
        "ms": 234463
      },
      {
        "text": "need",
        "ms": 234523
      },
      {
        "text": "to",
        "ms": 234763
      },
      {
        "text": "be",
        "ms": 234903
      },
      {
        "text": "authorized,",
        "ms": 235163
      },
      {
        "text": "they'll",
        "ms": 235983
      },
      {
        "text": "pop",
        "ms": 236203
      },
      {
        "text": "up",
        "ms": 236503
      },
      {
        "text": "automatically",
        "ms": 236683
      },
      {
        "text": "and",
        "ms": 237763
      },
      {
        "text": "await",
        "ms": 238491
      },
      {
        "text": "your",
        "ms": 238751
      },
      {
        "text": "approval,",
        "ms": 238951
      },
      {
        "text": "and",
        "ms": 240121
      },
      {
        "text": "it'll",
        "ms": 240561
      },
      {
        "text": "let",
        "ms": 240841
      },
      {
        "text": "you",
        "ms": 240981
      },
      {
        "text": "log",
        "ms": 241241
      },
      {
        "text": "in",
        "ms": 241681
      },
      {
        "text": "and",
        "ms": 242457
      },
      {
        "text": "change",
        "ms": 242790
      },
      {
        "text": "those",
        "ms": 243290
      },
      {
        "text": "values.",
        "ms": 243650
      }
    ],
    "matrox-test-individual": [
      {
        "text": "click",
        "ms": 248275
      },
      {
        "text": "on",
        "ms": 248515
      },
      {
        "text": "each",
        "ms": 248755
      },
      {
        "text": "individual",
        "ms": 249015
      }
    ],
    "matrox-test-switch": [
      {
        "text": "encoder",
        "ms": 250590
      },
      {
        "text": "or",
        "ms": 250970
      },
      {
        "text": "decoder,",
        "ms": 251130
      },
      {
        "text": "or",
        "ms": 252310
      },
      {
        "text": "you",
        "ms": 252490
      },
      {
        "text": "can",
        "ms": 252630
      },
      {
        "text": "switch",
        "ms": 253010
      },
      {
        "text": "and",
        "ms": 253350
      },
      {
        "text": "test",
        "ms": 253490
      },
      {
        "text": "right",
        "ms": 253870
      },
      {
        "text": "here.",
        "ms": 254130
      }
    ],
    "matrox-switch-back": [
      {
        "text": "let's",
        "ms": 256250
      },
      {
        "text": "go",
        "ms": 256485
      },
      {
        "text": "back",
        "ms": 256745
      },
      {
        "text": "over",
        "ms": 257085
      },
      {
        "text": "to",
        "ms": 257265
      },
      {
        "text": "activities.",
        "ms": 257405
      }
    ],
    "matrox-switch-change": [
      {
        "text": "So",
        "ms": 258505
      },
      {
        "text": "now",
        "ms": 258785
      },
      {
        "text": "we'll",
        "ms": 258985
      },
      {
        "text": "want",
        "ms": 259245
      },
      {
        "text": "to",
        "ms": 259505
      },
      {
        "text": "change",
        "ms": 259725
      },
      {
        "text": "the",
        "ms": 260833
      },
      {
        "text": "switcher",
        "ms": 260993
      },
      {
        "text": "over",
        "ms": 261891
      },
      {
        "text": "to",
        "ms": 262131
      },
      {
        "text": "encoders",
        "ms": 262531
      },
      {
        "text": "and",
        "ms": 263031
      },
      {
        "text": "decoders.",
        "ms": 263131
      }
    ],
    "matrox-switch-convertip": [
      {
        "text": "And",
        "ms": 264316
      },
      {
        "text": "you",
        "ms": 264416
      },
      {
        "text": "can",
        "ms": 264536
      },
      {
        "text": "see",
        "ms": 264716
      },
      {
        "text": "here",
        "ms": 264976
      },
      {
        "text": "our",
        "ms": 265296
      },
      {
        "text": "convert",
        "ms": 266076
      },
      {
        "text": "IP,",
        "ms": 266756
      },
      {
        "text": "Matrox",
        "ms": 267559
      },
      {
        "text": "encoders",
        "ms": 268447
      },
      {
        "text": "and",
        "ms": 268927
      },
      {
        "text": "decoders",
        "ms": 269027
      },
      {
        "text": "all",
        "ms": 269827
      },
      {
        "text": "set",
        "ms": 270007
      },
      {
        "text": "up,",
        "ms": 270247
      },
      {
        "text": "ready",
        "ms": 270467
      },
      {
        "text": "to",
        "ms": 270707
      },
      {
        "text": "go.",
        "ms": 270827
      }
    ],
    "matrox-switch-audio": [
      {
        "text": "And",
        "ms": 271697
      },
      {
        "text": "we'll",
        "ms": 271897
      },
      {
        "text": "leave",
        "ms": 272097
      },
      {
        "text": "the",
        "ms": 272257
      },
      {
        "text": "audio",
        "ms": 272437
      },
      {
        "text": "for",
        "ms": 272797
      },
      {
        "text": "the",
        "ms": 272957
      },
      {
        "text": "display",
        "ms": 273217
      },
      {
        "text": "and",
        "ms": 274185
      },
      {
        "text": "the",
        "ms": 274305
      },
      {
        "text": "power",
        "ms": 274425
      },
      {
        "text": "already",
        "ms": 275158
      },
      {
        "text": "set",
        "ms": 275438
      },
      {
        "text": "up",
        "ms": 275578
      },
      {
        "text": "for",
        "ms": 275578
      },
      {
        "text": "the",
        "ms": 275578
      },
      {
        "text": "display.",
        "ms": 276018
      }
    ],
    "m2m-different": [
      {
        "text": "Now,",
        "ms": 279820
      },
      {
        "text": "when",
        "ms": 280020
      },
      {
        "text": "we",
        "ms": 280180
      },
      {
        "text": "come",
        "ms": 280300
      },
      {
        "text": "in",
        "ms": 280500
      },
      {
        "text": "here,",
        "ms": 280620
      },
      {
        "text": "we",
        "ms": 281300
      },
      {
        "text": "have",
        "ms": 281380
      },
      {
        "text": "a",
        "ms": 281580
      },
      {
        "text": "very",
        "ms": 281660
      },
      {
        "text": "different",
        "ms": 281880
      },
      {
        "text": "interface,",
        "ms": 282160
      },
      {
        "text": "right?",
        "ms": 282940
      }
    ],
    "m2m-press-click": [
      {
        "text": "And",
        "ms": 283620
      },
      {
        "text": "you",
        "ms": 283740
      },
      {
        "text": "can",
        "ms": 283860
      },
      {
        "text": "see",
        "ms": 284040
      },
      {
        "text": "all",
        "ms": 284763
      },
      {
        "text": "it",
        "ms": 284963
      },
      {
        "text": "takes",
        "ms": 285043
      },
      {
        "text": "is",
        "ms": 285303
      },
      {
        "text": "one",
        "ms": 285583
      },
      {
        "text": "press,",
        "ms": 285763
      },
      {
        "text": "and",
        "ms": 286403
      },
      {
        "text": "then",
        "ms": 286623
      },
      {
        "text": "you",
        "ms": 286623
      },
      {
        "text": "can",
        "ms": 286623
      },
      {
        "text": "click",
        "ms": 286783
      },
      {
        "text": "over",
        "ms": 287023
      },
      {
        "text": "here.",
        "ms": 287243
      }
    ],
    "m2m-drag-drop": [
      {
        "text": "We",
        "ms": 288058
      },
      {
        "text": "also",
        "ms": 288193
      },
      {
        "text": "have",
        "ms": 288473
      },
      {
        "text": "a",
        "ms": 288713
      },
      {
        "text": "drag",
        "ms": 288793
      },
      {
        "text": "and",
        "ms": 289093
      },
      {
        "text": "drop",
        "ms": 289233
      },
      {
        "text": "feature,",
        "ms": 289573
      },
      {
        "text": "so",
        "ms": 289873
      },
      {
        "text": "you",
        "ms": 290473
      },
      {
        "text": "can",
        "ms": 290533
      },
      {
        "text": "press",
        "ms": 290793
      },
      {
        "text": "and",
        "ms": 290993
      },
      {
        "text": "hold",
        "ms": 291153
      },
      {
        "text": "and",
        "ms": 291781
      },
      {
        "text": "drag",
        "ms": 291901
      },
      {
        "text": "it",
        "ms": 292181
      },
      {
        "text": "over.",
        "ms": 292301
      }
    ],
    "m2m-send-all": [
      {
        "text": "And",
        "ms": 293001
      },
      {
        "text": "of",
        "ms": 293071
      },
      {
        "text": "course,",
        "ms": 293211
      },
      {
        "text": "we",
        "ms": 293711
      },
      {
        "text": "have",
        "ms": 293891
      },
      {
        "text": "our",
        "ms": 294131
      },
      {
        "text": "send",
        "ms": 294534
      },
      {
        "text": "to",
        "ms": 294754
      },
      {
        "text": "all.",
        "ms": 295054
      }
    ],
    "m2m-anytime": [
      {
        "text": "At",
        "ms": 295759
      },
      {
        "text": "any",
        "ms": 295859
      },
      {
        "text": "time,",
        "ms": 296019
      },
      {
        "text": "you",
        "ms": 296219
      },
      {
        "text": "can",
        "ms": 296319
      },
      {
        "text": "select",
        "ms": 296519
      },
      {
        "text": "an",
        "ms": 297112
      },
      {
        "text": "input",
        "ms": 297232
      },
      {
        "text": "and",
        "ms": 297950
      },
      {
        "text": "press",
        "ms": 298303
      },
      {
        "text": "this",
        "ms": 298643
      },
      {
        "text": "all",
        "ms": 298803
      },
      {
        "text": "button,",
        "ms": 299063
      },
      {
        "text": "and",
        "ms": 299523
      },
      {
        "text": "it",
        "ms": 299623
      },
      {
        "text": "sends",
        "ms": 299723
      },
      {
        "text": "everything",
        "ms": 299983
      },
      {
        "text": "where",
        "ms": 300681
      },
      {
        "text": "it",
        "ms": 300841
      },
      {
        "text": "needs",
        "ms": 300961
      },
      {
        "text": "to",
        "ms": 301121
      },
      {
        "text": "go.",
        "ms": 301181
      }
    ],
    "settings-start-over": [
      {
        "text": "At",
        "ms": 304305
      },
      {
        "text": "any",
        "ms": 304425
      },
      {
        "text": "time,",
        "ms": 304605
      },
      {
        "text": "if",
        "ms": 305065
      },
      {
        "text": "you",
        "ms": 305185
      },
      {
        "text": "need",
        "ms": 305325
      },
      {
        "text": "to",
        "ms": 305925
      },
      {
        "text": "start",
        "ms": 306085
      },
      {
        "text": "over",
        "ms": 306465
      },
      {
        "text": "or",
        "ms": 307165
      },
      {
        "text": "you",
        "ms": 307265
      },
      {
        "text": "need",
        "ms": 307345
      },
      {
        "text": "help",
        "ms": 307605
      }
    ],
    "settings-manual": [
      {
        "text": "full",
        "ms": 308175
      },
      {
        "text": "user",
        "ms": 308735
      },
      {
        "text": "manual,",
        "ms": 308995
      },
      {
        "text": "it",
        "ms": 309335
      },
      {
        "text": "can",
        "ms": 309615
      },
      {
        "text": "be",
        "ms": 309755
      },
      {
        "text": "found",
        "ms": 309875
      },
      {
        "text": "right",
        "ms": 310135
      },
      {
        "text": "here.",
        "ms": 310375
      }
    ],
    "settings-quick-start": [
      {
        "text": "And",
        "ms": 311245
      },
      {
        "text": "the",
        "ms": 311545
      },
      {
        "text": "quick",
        "ms": 311793
      },
      {
        "text": "start,",
        "ms": 312013
      },
      {
        "text": "if",
        "ms": 312393
      },
      {
        "text": "you",
        "ms": 312473
      },
      {
        "text": "need",
        "ms": 312573
      },
      {
        "text": "to",
        "ms": 312766
      },
      {
        "text": "watch",
        "ms": 313046
      },
      {
        "text": "a",
        "ms": 313286
      },
      {
        "text": "quick",
        "ms": 313346
      },
      {
        "text": "start",
        "ms": 313586
      },
      {
        "text": "again,",
        "ms": 313846
      },
      {
        "text": "you",
        "ms": 314399
      },
      {
        "text": "can",
        "ms": 314519
      },
      {
        "text": "play",
        "ms": 315019
      },
      {
        "text": "that",
        "ms": 315259
      },
      {
        "text": "right",
        "ms": 315399
      },
      {
        "text": "here.",
        "ms": 315619
      }
    ],
    "settings-reset": [
      {
        "text": "And",
        "ms": 316689
      },
      {
        "text": "if",
        "ms": 316789
      },
      {
        "text": "you",
        "ms": 316829
      },
      {
        "text": "need",
        "ms": 316989
      },
      {
        "text": "to",
        "ms": 317189
      },
      {
        "text": "do",
        "ms": 317309
      },
      {
        "text": "a",
        "ms": 317429
      },
      {
        "text": "factory",
        "ms": 317609
      },
      {
        "text": "reset",
        "ms": 318029
      },
      {
        "text": "or",
        "ms": 318935
      },
      {
        "text": "update",
        "ms": 319075
      },
      {
        "text": "the",
        "ms": 319503
      },
      {
        "text": "database,",
        "ms": 319943
      },
      {
        "text": "you",
        "ms": 320886
      },
      {
        "text": "can",
        "ms": 321006
      },
      {
        "text": "do",
        "ms": 321146
      },
      {
        "text": "that",
        "ms": 321186
      },
      {
        "text": "right",
        "ms": 321386
      },
      {
        "text": "here.",
        "ms": 321616
      }
    ]
  }
};

export const IOT_TABLET_EDIT = NARRATION_EDIT;

