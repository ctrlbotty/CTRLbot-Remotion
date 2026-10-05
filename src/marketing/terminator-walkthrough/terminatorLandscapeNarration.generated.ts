// Written by `npm run narration:edit`. Do not edit; change src/marketing/terminator-walkthrough/terminatorLandscapeNarration.ts and rebuild.

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
  "src": "narration/terminator-walkthrough/edit.m4a",
  "seconds": 166,
  "clips": [
    {
      "id": "welcome",
      "at": 0.35,
      "start": 0.625,
      "end": 10.11,
      "seconds": 9.328,
      "removed": []
    },
    {
      "id": "terminal-app",
      "at": 9.8,
      "start": 13.2,
      "end": 19.285,
      "seconds": 4.26,
      "removed": [
        {
          "from": 13.575,
          "to": 13.85,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 15.135,
          "to": 15.565,
          "kind": "repeat",
          "heard": "a"
        },
        {
          "from": 15.94,
          "to": 16.085,
          "kind": "extra",
          "heard": "i"
        },
        {
          "from": 16.805,
          "to": 16.835,
          "kind": "filler",
          "heard": "Uh,"
        },
        {
          "from": 16.915,
          "to": 17.365,
          "kind": "filler",
          "heard": "Uh,"
        },
        {
          "from": 17.82,
          "to": 17.94,
          "kind": "filler",
          "heard": "P"
        }
      ]
    },
    {
      "id": "overview",
      "at": 16.25,
      "start": 23.84,
      "end": 54.44,
      "seconds": 23.412,
      "removed": [
        {
          "from": 25.73,
          "to": 26.13,
          "kind": "extra",
          "heard": "on"
        },
        {
          "from": 27.3,
          "to": 27.755,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 30.4,
          "to": 30.8,
          "kind": "extra",
          "heard": "and"
        },
        {
          "from": 32.505,
          "to": 32.78,
          "kind": "repeat",
          "heard": "an"
        },
        {
          "from": 32.825,
          "to": 33.13,
          "kind": "repeat",
          "heard": "an"
        },
        {
          "from": 33.735,
          "to": 34.04,
          "kind": "repeat",
          "heard": "ta"
        },
        {
          "from": 35.775,
          "to": 35.9,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 36.075,
          "to": 36.65,
          "kind": "extra",
          "heard": "awent"
        },
        {
          "from": 36.695,
          "to": 36.925,
          "kind": "extra",
          "heard": "wnt"
        },
        {
          "from": 36.985,
          "to": 37.44,
          "kind": "repeat",
          "heard": "through"
        },
        {
          "from": 39.28,
          "to": 39.715,
          "kind": "filler",
          "heard": "um"
        },
        {
          "from": 40.885,
          "to": 41.075,
          "kind": "extra",
          "heard": "an"
        },
        {
          "from": 43.065,
          "to": 43.435,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 45.305,
          "to": 45.71,
          "kind": "extra",
          "heard": "to"
        },
        {
          "from": 50.225,
          "to": 50.745,
          "kind": "extra",
          "heard": "h"
        },
        {
          "from": 52.77,
          "to": 53.08,
          "kind": "filler",
          "heard": "uh"
        },
        {
          "from": 53.235,
          "to": 53.615,
          "kind": "filler",
          "heard": "Um..."
        },
        {
          "from": 53.71,
          "to": 53.855,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "begin-scan",
      "at": 40,
      "start": 55.29,
      "end": 58.315,
      "seconds": 2.768,
      "removed": []
    },
    {
      "id": "scan-info",
      "at": 44.75,
      "start": 85.97,
      "end": 93.525,
      "seconds": 6.972,
      "removed": [
        {
          "from": 87.86,
          "to": 88.04,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 89.44,
          "to": 89.545,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 92.165,
          "to": 92.385,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "scan-links",
      "at": 52.5,
      "start": 93.98,
      "end": 102.825,
      "seconds": 6.59,
      "removed": [
        {
          "from": 97.01,
          "to": 97.205,
          "kind": "extra",
          "heard": "tat"
        },
        {
          "from": 98.27,
          "to": 98.57,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 98.995,
          "to": 99.415,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 99.54,
          "to": 99.87,
          "kind": "extra",
          "heard": "goat"
        },
        {
          "from": 100.595,
          "to": 100.855,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 101.74,
          "to": 102.005,
          "kind": "repeat",
          "heard": "the"
        }
      ]
    },
    {
      "id": "server-intro",
      "at": 62.25,
      "start": 128.705,
      "end": 132.195,
      "seconds": 3.183,
      "removed": [
        {
          "from": 130.35,
          "to": 130.645,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "server-test",
      "at": 65.95,
      "start": 143.48,
      "end": 148.905,
      "seconds": 4.314,
      "removed": [
        {
          "from": 145.31,
          "to": 145.64,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 147.17,
          "to": 147.38,
          "kind": "extra",
          "heard": "e"
        },
        {
          "from": 148.235,
          "to": 148.465,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "server-connected",
      "at": 72.345,
      "start": 196.745,
      "end": 204.93,
      "seconds": 7.586,
      "removed": []
    },
    {
      "id": "pin",
      "at": 85.25,
      "start": 223.97,
      "end": 239.055,
      "seconds": 13.568,
      "removed": [
        {
          "from": 228.275,
          "to": 228.48,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 233.41,
          "to": 233.89,
          "kind": "extra",
          "heard": "ay"
        },
        {
          "from": 236.275,
          "to": 236.485,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "other-direction",
      "at": 101.25,
      "start": 244.9,
      "end": 251.085,
      "seconds": 6.185,
      "removed": []
    },
    {
      "id": "raw-tcp",
      "at": 107.72,
      "start": 320.22,
      "end": 330.28,
      "seconds": 8.255,
      "removed": [
        {
          "from": 322.025,
          "to": 322.135,
          "kind": "extra",
          "heard": "ba"
        },
        {
          "from": 326.24,
          "to": 326.775,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 326.855,
          "to": 327.14,
          "kind": "repeat",
          "heard": "or"
        },
        {
          "from": 327.75,
          "to": 328.02,
          "kind": "repeat",
          "heard": "any"
        },
        {
          "from": 329.11,
          "to": 329.345,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 329.605,
          "to": 329.705,
          "kind": "extra",
          "heard": "i"
        }
      ]
    },
    {
      "id": "com-ports",
      "at": 118.75,
      "start": 335.17,
      "end": 337.915,
      "seconds": 2.513,
      "removed": [
        {
          "from": 336.525,
          "to": 336.745,
          "kind": "extra",
          "heard": "or"
        }
      ]
    },
    {
      "id": "usb-bluetooth",
      "at": 122,
      "start": 338.89,
      "end": 346.095,
      "seconds": 6.686,
      "removed": [
        {
          "from": 340.645,
          "to": 341.02,
          "kind": "repeat",
          "heard": "and"
        },
        {
          "from": 342.4,
          "to": 342.52,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "parameters",
      "at": 129.65,
      "start": 398.875,
      "end": 403.46,
      "seconds": 4.106,
      "removed": [
        {
          "from": 401.915,
          "to": 402.255,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "ssh-intro",
      "at": 135.25,
      "start": 443.215,
      "end": 448.83,
      "seconds": 4.567,
      "removed": [
        {
          "from": 444.195,
          "to": 444.57,
          "kind": "extra",
          "heard": "ah"
        },
        {
          "from": 445.61,
          "to": 445.885,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 447.27,
          "to": 447.445,
          "kind": "extra",
          "heard": "e"
        },
        {
          "from": 447.75,
          "to": 447.925,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "ssh-help",
      "at": 141.6,
      "start": 483.72,
      "end": 490.845,
      "seconds": 6.836,
      "removed": [
        {
          "from": 483.955,
          "to": 484.045,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "recap",
      "at": 149.75,
      "start": 498.69,
      "end": 510.925,
      "seconds": 10.777,
      "removed": [
        {
          "from": 501.47,
          "to": 501.725,
          "kind": "repeat",
          "heard": "a"
        },
        {
          "from": 505.05,
          "to": 505.39,
          "kind": "extra",
          "heard": "te"
        },
        {
          "from": 506.965,
          "to": 507.275,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 507.34,
          "to": 507.45,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 509.015,
          "to": 509.23,
          "kind": "extra",
          "heard": "or"
        }
      ]
    },
    {
      "id": "thank-you",
      "at": 162.725,
      "start": 511.725,
      "end": 512.155,
      "seconds": 0.43,
      "removed": []
    }
  ],
  "words": [
    {
      "text": " Welcome",
      "startMs": 375,
      "endMs": 875,
      "timestampMs": 625,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 875,
      "endMs": 1055,
      "timestampMs": 965,
      "confidence": null
    },
    {
      "text": " CTRLbot.",
      "startMs": 1055,
      "endMs": 1755,
      "timestampMs": 1405,
      "confidence": null
    },
    {
      "text": " This",
      "startMs": 2415,
      "endMs": 2575,
      "timestampMs": 2495,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 2575,
      "endMs": 2775,
      "timestampMs": 2675,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 2775,
      "endMs": 2975,
      "timestampMs": 2875,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 2975,
      "endMs": 3095,
      "timestampMs": 3035,
      "confidence": null
    },
    {
      "text": " short",
      "startMs": 3095,
      "endMs": 3490,
      "timestampMs": 3293,
      "confidence": null
    },
    {
      "text": " walkthrough",
      "startMs": 3698,
      "endMs": 4538,
      "timestampMs": 4118,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 4538,
      "endMs": 4878,
      "timestampMs": 4708,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 4878,
      "endMs": 5118,
      "timestampMs": 4998,
      "confidence": null
    },
    {
      "text": " latest",
      "startMs": 5118,
      "endMs": 5638,
      "timestampMs": 5378,
      "confidence": null
    },
    {
      "text": " utility",
      "startMs": 5638,
      "endMs": 6313,
      "timestampMs": 5976,
      "confidence": null
    },
    {
      "text": " called",
      "startMs": 6558,
      "endMs": 7018,
      "timestampMs": 6788,
      "confidence": null
    },
    {
      "text": " CTRLbot",
      "startMs": 7258,
      "endMs": 8038,
      "timestampMs": 7648,
      "confidence": null
    },
    {
      "text": " Terminator.",
      "startMs": 8178,
      "endMs": 9638,
      "timestampMs": 8908,
      "confidence": null
    },
    {
      "text": " It's",
      "startMs": 9930,
      "endMs": 10163,
      "timestampMs": 10047,
      "confidence": null
    },
    {
      "text": " basically",
      "startMs": 10163,
      "endMs": 10938,
      "timestampMs": 10551,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 11391,
      "endMs": 11606,
      "timestampMs": 11499,
      "confidence": null
    },
    {
      "text": " terminal",
      "startMs": 11634,
      "endMs": 12154,
      "timestampMs": 11894,
      "confidence": null
    },
    {
      "text": " app",
      "startMs": 12542,
      "endMs": 12747,
      "timestampMs": 12644,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 12945,
      "endMs": 13385,
      "timestampMs": 13165,
      "confidence": null
    },
    {
      "text": " PC",
      "startMs": 13385,
      "endMs": 14020,
      "timestampMs": 13703,
      "confidence": null
    },
    {
      "text": " It",
      "startMs": 16250,
      "endMs": 16300,
      "timestampMs": 16275,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 16300,
      "endMs": 16500,
      "timestampMs": 16400,
      "confidence": null
    },
    {
      "text": " scan",
      "startMs": 16500,
      "endMs": 16840,
      "timestampMs": 16670,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 16840,
      "endMs": 17020,
      "timestampMs": 16930,
      "confidence": null
    },
    {
      "text": " network.",
      "startMs": 17020,
      "endMs": 17540,
      "timestampMs": 17280,
      "confidence": null
    },
    {
      "text": " It",
      "startMs": 18288,
      "endMs": 18388,
      "timestampMs": 18338,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 18388,
      "endMs": 18948,
      "timestampMs": 18668,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 18948,
      "endMs": 19168,
      "timestampMs": 19058,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 19168,
      "endMs": 19286,
      "timestampMs": 19227,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 19421,
      "endMs": 19581,
      "timestampMs": 19501,
      "confidence": null
    },
    {
      "text": " server",
      "startMs": 19581,
      "endMs": 20346,
      "timestampMs": 19964,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 20361,
      "endMs": 20541,
      "timestampMs": 20451,
      "confidence": null
    },
    {
      "text": " testing.",
      "startMs": 20541,
      "endMs": 21266,
      "timestampMs": 20904,
      "confidence": null
    },
    {
      "text": " It",
      "startMs": 21989,
      "endMs": 22109,
      "timestampMs": 22049,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 22109,
      "endMs": 22249,
      "timestampMs": 22179,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 22249,
      "endMs": 22569,
      "timestampMs": 22409,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 22569,
      "endMs": 22669,
      "timestampMs": 22619,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 22669,
      "endMs": 23464,
      "timestampMs": 23066,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 23464,
      "endMs": 23672,
      "timestampMs": 23568,
      "confidence": null
    },
    {
      "text": " allow",
      "startMs": 23672,
      "endMs": 24217,
      "timestampMs": 23944,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 24215,
      "endMs": 24515,
      "timestampMs": 24365,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 24515,
      "endMs": 24655,
      "timestampMs": 24585,
      "confidence": null
    },
    {
      "text": " communicate",
      "startMs": 24655,
      "endMs": 25315,
      "timestampMs": 24985,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 25315,
      "endMs": 25535,
      "timestampMs": 25425,
      "confidence": null
    },
    {
      "text": " them",
      "startMs": 25535,
      "endMs": 25880,
      "timestampMs": 25708,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 26011,
      "endMs": 26271,
      "timestampMs": 26141,
      "confidence": null
    },
    {
      "text": " their",
      "startMs": 26271,
      "endMs": 26491,
      "timestampMs": 26381,
      "confidence": null
    },
    {
      "text": " APIs.",
      "startMs": 26491,
      "endMs": 27346,
      "timestampMs": 26919,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 28484,
      "endMs": 28644,
      "timestampMs": 28564,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 28644,
      "endMs": 28939,
      "timestampMs": 28792,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 29022,
      "endMs": 29382,
      "timestampMs": 29202,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 29382,
      "endMs": 29722,
      "timestampMs": 29552,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 29722,
      "endMs": 29842,
      "timestampMs": 29782,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 29842,
      "endMs": 30627,
      "timestampMs": 30234,
      "confidence": null
    },
    {
      "text": " using",
      "startMs": 31120,
      "endMs": 31740,
      "timestampMs": 31430,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 31740,
      "endMs": 32020,
      "timestampMs": 31880,
      "confidence": null
    },
    {
      "text": " USB",
      "startMs": 32020,
      "endMs": 32795,
      "timestampMs": 32407,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 33123,
      "endMs": 33468,
      "timestampMs": 33295,
      "confidence": null
    },
    {
      "text": " serial",
      "startMs": 33683,
      "endMs": 34143,
      "timestampMs": 33913,
      "confidence": null
    },
    {
      "text": " ports",
      "startMs": 34143,
      "endMs": 34603,
      "timestampMs": 34373,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 34603,
      "endMs": 34703,
      "timestampMs": 34653,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 34703,
      "endMs": 34923,
      "timestampMs": 34813,
      "confidence": null
    },
    {
      "text": " PC,",
      "startMs": 34923,
      "endMs": 35718,
      "timestampMs": 35320,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 36101,
      "endMs": 36241,
      "timestampMs": 36171,
      "confidence": null
    },
    {
      "text": " even",
      "startMs": 36241,
      "endMs": 36481,
      "timestampMs": 36361,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 36481,
      "endMs": 36701,
      "timestampMs": 36591,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 36701,
      "endMs": 36871,
      "timestampMs": 36786,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 37129,
      "endMs": 37249,
      "timestampMs": 37189,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 37249,
      "endMs": 37589,
      "timestampMs": 37419,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 37589,
      "endMs": 37969,
      "timestampMs": 37779,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 37969,
      "endMs": 38189,
      "timestampMs": 38079,
      "confidence": null
    },
    {
      "text": " SSH",
      "startMs": 38189,
      "endMs": 38849,
      "timestampMs": 38519,
      "confidence": null
    },
    {
      "text": " host.",
      "startMs": 39152,
      "endMs": 39537,
      "timestampMs": 39345,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 40040,
      "endMs": 40140,
      "timestampMs": 40090,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 40140,
      "endMs": 40360,
      "timestampMs": 40250,
      "confidence": null
    },
    {
      "text": " begin.",
      "startMs": 40360,
      "endMs": 40560,
      "timestampMs": 40460,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 40560,
      "endMs": 40770,
      "timestampMs": 40665,
      "confidence": null
    },
    {
      "text": " we'll",
      "startMs": 41038,
      "endMs": 41203,
      "timestampMs": 41121,
      "confidence": null
    },
    {
      "text": " start",
      "startMs": 41203,
      "endMs": 41483,
      "timestampMs": 41343,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 41483,
      "endMs": 42083,
      "timestampMs": 41783,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 42083,
      "endMs": 42243,
      "timestampMs": 42163,
      "confidence": null
    },
    {
      "text": " scan,",
      "startMs": 42243,
      "endMs": 42728,
      "timestampMs": 42486,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 44770,
      "endMs": 44910,
      "timestampMs": 44840,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 44910,
      "endMs": 45110,
      "timestampMs": 45010,
      "confidence": null
    },
    {
      "text": " get",
      "startMs": 45110,
      "endMs": 45290,
      "timestampMs": 45200,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 45290,
      "endMs": 45430,
      "timestampMs": 45360,
      "confidence": null
    },
    {
      "text": " host",
      "startMs": 45430,
      "endMs": 45730,
      "timestampMs": 45580,
      "confidence": null
    },
    {
      "text": " name,",
      "startMs": 45730,
      "endMs": 46295,
      "timestampMs": 46013,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 46638,
      "endMs": 47118,
      "timestampMs": 46878,
      "confidence": null
    },
    {
      "text": " name,",
      "startMs": 47118,
      "endMs": 47693,
      "timestampMs": 47406,
      "confidence": null
    },
    {
      "text": " manufacturer,",
      "startMs": 48081,
      "endMs": 49326,
      "timestampMs": 48703,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 49779,
      "endMs": 49939,
      "timestampMs": 49859,
      "confidence": null
    },
    {
      "text": " well",
      "startMs": 49939,
      "endMs": 50419,
      "timestampMs": 50179,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 50419,
      "endMs": 50582,
      "timestampMs": 50500,
      "confidence": null
    },
    {
      "text": " Mac",
      "startMs": 50667,
      "endMs": 50967,
      "timestampMs": 50817,
      "confidence": null
    },
    {
      "text": " address.",
      "startMs": 50967,
      "endMs": 51682,
      "timestampMs": 51324,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 52640,
      "endMs": 52820,
      "timestampMs": 52730,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 52820,
      "endMs": 52920,
      "timestampMs": 52870,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 52920,
      "endMs": 53020,
      "timestampMs": 52970,
      "confidence": null
    },
    {
      "text": " scroll",
      "startMs": 53020,
      "endMs": 53400,
      "timestampMs": 53210,
      "confidence": null
    },
    {
      "text": " over,",
      "startMs": 53400,
      "endMs": 53640,
      "timestampMs": 53520,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 53640,
      "endMs": 53760,
      "timestampMs": 53700,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 53760,
      "endMs": 53940,
      "timestampMs": 53850,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 53940,
      "endMs": 54120,
      "timestampMs": 54030,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 54120,
      "endMs": 54380,
      "timestampMs": 54250,
      "confidence": null
    },
    {
      "text": " there's",
      "startMs": 54380,
      "endMs": 54680,
      "timestampMs": 54530,
      "confidence": null
    },
    {
      "text": " even",
      "startMs": 54680,
      "endMs": 54960,
      "timestampMs": 54820,
      "confidence": null
    },
    {
      "text": " links",
      "startMs": 54960,
      "endMs": 55465,
      "timestampMs": 55212,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 55573,
      "endMs": 55753,
      "timestampMs": 55663,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 55753,
      "endMs": 55913,
      "timestampMs": 55833,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 55913,
      "endMs": 56533,
      "timestampMs": 56223,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 56714,
      "endMs": 56974,
      "timestampMs": 56844,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 56974,
      "endMs": 57409,
      "timestampMs": 57191,
      "confidence": null
    },
    {
      "text": " directly",
      "startMs": 57402,
      "endMs": 57842,
      "timestampMs": 57622,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 57842,
      "endMs": 58270,
      "timestampMs": 58056,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 58270,
      "endMs": 58385,
      "timestampMs": 58327,
      "confidence": null
    },
    {
      "text": " website",
      "startMs": 58385,
      "endMs": 59050,
      "timestampMs": 58717,
      "confidence": null
    },
    {
      "text": " Now",
      "startMs": 62325,
      "endMs": 62485,
      "timestampMs": 62405,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 62485,
      "endMs": 62705,
      "timestampMs": 62595,
      "confidence": null
    },
    {
      "text": " take",
      "startMs": 62705,
      "endMs": 62965,
      "timestampMs": 62835,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 62965,
      "endMs": 63015,
      "timestampMs": 62990,
      "confidence": null
    },
    {
      "text": " look",
      "startMs": 63005,
      "endMs": 63285,
      "timestampMs": 63145,
      "confidence": null
    },
    {
      "text": " at",
      "startMs": 63285,
      "endMs": 63860,
      "timestampMs": 63572,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 63998,
      "endMs": 64183,
      "timestampMs": 64090,
      "confidence": null
    },
    {
      "text": " TCP",
      "startMs": 64358,
      "endMs": 64818,
      "timestampMs": 64588,
      "confidence": null
    },
    {
      "text": " server,",
      "startMs": 64818,
      "endMs": 65393,
      "timestampMs": 65105,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 66010,
      "endMs": 66170,
      "timestampMs": 66090,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 66170,
      "endMs": 66330,
      "timestampMs": 66250,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 66330,
      "endMs": 66490,
      "timestampMs": 66410,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 66490,
      "endMs": 66730,
      "timestampMs": 66610,
      "confidence": null
    },
    {
      "text": " test,",
      "startMs": 66730,
      "endMs": 67160,
      "timestampMs": 66945,
      "confidence": null
    },
    {
      "text": " say,",
      "startMs": 67290,
      "endMs": 67780,
      "timestampMs": 67535,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 67888,
      "endMs": 68088,
      "timestampMs": 67988,
      "confidence": null
    },
    {
      "text": " CTRLbot",
      "startMs": 68088,
      "endMs": 68888,
      "timestampMs": 68488,
      "confidence": null
    },
    {
      "text": " IoT",
      "startMs": 68888,
      "endMs": 69286,
      "timestampMs": 69087,
      "confidence": null
    },
    {
      "text": " app",
      "startMs": 69306,
      "endMs": 69506,
      "timestampMs": 69406,
      "confidence": null
    },
    {
      "text": " from",
      "startMs": 69869,
      "endMs": 70089,
      "timestampMs": 69979,
      "confidence": null
    },
    {
      "text": " it.",
      "startMs": 70089,
      "endMs": 70229,
      "timestampMs": 70159,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 72380,
      "endMs": 72480,
      "timestampMs": 72430,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 72480,
      "endMs": 72660,
      "timestampMs": 72570,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 72660,
      "endMs": 72780,
      "timestampMs": 72720,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 72780,
      "endMs": 72980,
      "timestampMs": 72880,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 72980,
      "endMs": 73480,
      "timestampMs": 73230,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 73480,
      "endMs": 73680,
      "timestampMs": 73580,
      "confidence": null
    },
    {
      "text": " I'm",
      "startMs": 73680,
      "endMs": 73860,
      "timestampMs": 73770,
      "confidence": null
    },
    {
      "text": " actually",
      "startMs": 73860,
      "endMs": 74380,
      "timestampMs": 74120,
      "confidence": null
    },
    {
      "text": " connected",
      "startMs": 74380,
      "endMs": 74820,
      "timestampMs": 74600,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 74820,
      "endMs": 75060,
      "timestampMs": 74940,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 75060,
      "endMs": 75220,
      "timestampMs": 75140,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 75618,
      "endMs": 75718,
      "timestampMs": 75668,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 75718,
      "endMs": 75798,
      "timestampMs": 75758,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 75798,
      "endMs": 76018,
      "timestampMs": 75908,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 76018,
      "endMs": 76338,
      "timestampMs": 76178,
      "confidence": null
    },
    {
      "text": " commands",
      "startMs": 76338,
      "endMs": 77148,
      "timestampMs": 76743,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 77461,
      "endMs": 77861,
      "timestampMs": 77661,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 77861,
      "endMs": 78121,
      "timestampMs": 77991,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 78121,
      "endMs": 78321,
      "timestampMs": 78221,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 78321,
      "endMs": 78461,
      "timestampMs": 78391,
      "confidence": null
    },
    {
      "text": " they",
      "startMs": 78461,
      "endMs": 78621,
      "timestampMs": 78541,
      "confidence": null
    },
    {
      "text": " show",
      "startMs": 78621,
      "endMs": 78881,
      "timestampMs": 78751,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 78881,
      "endMs": 79036,
      "timestampMs": 78959,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 79161,
      "endMs": 79401,
      "timestampMs": 79281,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 79401,
      "endMs": 79891,
      "timestampMs": 79646,
      "confidence": null
    },
    {
      "text": " Up",
      "startMs": 85340,
      "endMs": 85500,
      "timestampMs": 85420,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 85500,
      "endMs": 85700,
      "timestampMs": 85600,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 85700,
      "endMs": 85980,
      "timestampMs": 85840,
      "confidence": null
    },
    {
      "text": " notice",
      "startMs": 85980,
      "endMs": 86260,
      "timestampMs": 86120,
      "confidence": null
    },
    {
      "text": " there's",
      "startMs": 86260,
      "endMs": 86460,
      "timestampMs": 86360,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 86460,
      "endMs": 86510,
      "timestampMs": 86485,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 86460,
      "endMs": 86720,
      "timestampMs": 86590,
      "confidence": null
    },
    {
      "text": " pin.",
      "startMs": 86720,
      "endMs": 87235,
      "timestampMs": 86978,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 87260,
      "endMs": 87380,
      "timestampMs": 87320,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 87658,
      "endMs": 87798,
      "timestampMs": 87728,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 87798,
      "endMs": 87998,
      "timestampMs": 87898,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 87998,
      "endMs": 88158,
      "timestampMs": 88078,
      "confidence": null
    },
    {
      "text": " save",
      "startMs": 88158,
      "endMs": 88618,
      "timestampMs": 88388,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 88618,
      "endMs": 88798,
      "timestampMs": 88708,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 88798,
      "endMs": 88938,
      "timestampMs": 88868,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 88938,
      "endMs": 89261,
      "timestampMs": 89099,
      "confidence": null
    },
    {
      "text": " connections,",
      "startMs": 89301,
      "endMs": 89821,
      "timestampMs": 89561,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 89821,
      "endMs": 89941,
      "timestampMs": 89881,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 89941,
      "endMs": 90121,
      "timestampMs": 90031,
      "confidence": null
    },
    {
      "text": " always",
      "startMs": 90121,
      "endMs": 90421,
      "timestampMs": 90271,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 90421,
      "endMs": 90701,
      "timestampMs": 90561,
      "confidence": null
    },
    {
      "text": " pin",
      "startMs": 90701,
      "endMs": 90981,
      "timestampMs": 90841,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 90981,
      "endMs": 91121,
      "timestampMs": 91051,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 91494,
      "endMs": 91594,
      "timestampMs": 91544,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 91594,
      "endMs": 91714,
      "timestampMs": 91654,
      "confidence": null
    },
    {
      "text": " they'll",
      "startMs": 91714,
      "endMs": 91954,
      "timestampMs": 91834,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 91954,
      "endMs": 92094,
      "timestampMs": 92024,
      "confidence": null
    },
    {
      "text": " available",
      "startMs": 92094,
      "endMs": 92574,
      "timestampMs": 92334,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 92574,
      "endMs": 92714,
      "timestampMs": 92644,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 92714,
      "endMs": 92834,
      "timestampMs": 92774,
      "confidence": null
    },
    {
      "text": " next",
      "startMs": 92834,
      "endMs": 93094,
      "timestampMs": 92964,
      "confidence": null
    },
    {
      "text": " time",
      "startMs": 93094,
      "endMs": 93584,
      "timestampMs": 93339,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 93905,
      "endMs": 94045,
      "timestampMs": 93975,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 94045,
      "endMs": 94225,
      "timestampMs": 94135,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 94225,
      "endMs": 94385,
      "timestampMs": 94305,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 94385,
      "endMs": 94690,
      "timestampMs": 94538,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 94845,
      "endMs": 95400,
      "timestampMs": 95123,
      "confidence": null
    },
    {
      "text": " various",
      "startMs": 95505,
      "endMs": 96245,
      "timestampMs": 95875,
      "confidence": null
    },
    {
      "text": " ports",
      "startMs": 96283,
      "endMs": 96703,
      "timestampMs": 96493,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 96703,
      "endMs": 96783,
      "timestampMs": 96743,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 96783,
      "endMs": 96923,
      "timestampMs": 96853,
      "confidence": null
    },
    {
      "text": " might",
      "startMs": 96923,
      "endMs": 97253,
      "timestampMs": 97088,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 97823,
      "endMs": 98043,
      "timestampMs": 97933,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 98043,
      "endMs": 98163,
      "timestampMs": 98103,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 98163,
      "endMs": 98513,
      "timestampMs": 98338,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 98513,
      "endMs": 98803,
      "timestampMs": 98658,
      "confidence": null
    },
    {
      "text": " Now",
      "startMs": 101340,
      "endMs": 101780,
      "timestampMs": 101560,
      "confidence": null
    },
    {
      "text": " we're",
      "startMs": 101780,
      "endMs": 101980,
      "timestampMs": 101880,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 101980,
      "endMs": 102140,
      "timestampMs": 102060,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 102140,
      "endMs": 102240,
      "timestampMs": 102190,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 102240,
      "endMs": 102460,
      "timestampMs": 102350,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 102460,
      "endMs": 102600,
      "timestampMs": 102530,
      "confidence": null
    },
    {
      "text": " other",
      "startMs": 102600,
      "endMs": 102800,
      "timestampMs": 102700,
      "confidence": null
    },
    {
      "text": " direction.",
      "startMs": 102800,
      "endMs": 103280,
      "timestampMs": 103040,
      "confidence": null
    },
    {
      "text": " Now",
      "startMs": 103880,
      "endMs": 104060,
      "timestampMs": 103970,
      "confidence": null
    },
    {
      "text": " we're",
      "startMs": 104060,
      "endMs": 104240,
      "timestampMs": 104150,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 104240,
      "endMs": 104520,
      "timestampMs": 104380,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 104520,
      "endMs": 104720,
      "timestampMs": 104620,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 104720,
      "endMs": 105040,
      "timestampMs": 104880,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 105040,
      "endMs": 105260,
      "timestampMs": 105150,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 105260,
      "endMs": 105960,
      "timestampMs": 105610,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 105960,
      "endMs": 106140,
      "timestampMs": 106050,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 106140,
      "endMs": 106340,
      "timestampMs": 106240,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 106340,
      "endMs": 106610,
      "timestampMs": 106475,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 106680,
      "endMs": 106820,
      "timestampMs": 106750,
      "confidence": null
    },
    {
      "text": " network.",
      "startMs": 106820,
      "endMs": 107300,
      "timestampMs": 107060,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 108200,
      "endMs": 108340,
      "timestampMs": 108270,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 108340,
      "endMs": 108520,
      "timestampMs": 108430,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 108520,
      "endMs": 108660,
      "timestampMs": 108590,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 108660,
      "endMs": 108760,
      "timestampMs": 108710,
      "confidence": null
    },
    {
      "text": " raw",
      "startMs": 108760,
      "endMs": 109245,
      "timestampMs": 109003,
      "confidence": null
    },
    {
      "text": " TCP",
      "startMs": 109518,
      "endMs": 110158,
      "timestampMs": 109838,
      "confidence": null
    },
    {
      "text": " connection.",
      "startMs": 110158,
      "endMs": 110818,
      "timestampMs": 110488,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 111358,
      "endMs": 111618,
      "timestampMs": 111488,
      "confidence": null
    },
    {
      "text": " it's",
      "startMs": 111618,
      "endMs": 111798,
      "timestampMs": 111708,
      "confidence": null
    },
    {
      "text": " good",
      "startMs": 111798,
      "endMs": 112058,
      "timestampMs": 111928,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 112058,
      "endMs": 112518,
      "timestampMs": 112288,
      "confidence": null
    },
    {
      "text": " Telnet",
      "startMs": 112518,
      "endMs": 113223,
      "timestampMs": 112871,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 113576,
      "endMs": 114056,
      "timestampMs": 113816,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 114174,
      "endMs": 114354,
      "timestampMs": 114264,
      "confidence": null
    },
    {
      "text": " real",
      "startMs": 114354,
      "endMs": 114654,
      "timestampMs": 114504,
      "confidence": null
    },
    {
      "text": " port,",
      "startMs": 114654,
      "endMs": 115099,
      "timestampMs": 114877,
      "confidence": null
    },
    {
      "text": " TCP",
      "startMs": 115152,
      "endMs": 115455,
      "timestampMs": 115304,
      "confidence": null
    },
    {
      "text": " port.",
      "startMs": 115455,
      "endMs": 115915,
      "timestampMs": 115685,
      "confidence": null
    },
    {
      "text": " Next,",
      "startMs": 118780,
      "endMs": 118960,
      "timestampMs": 118870,
      "confidence": null
    },
    {
      "text": " I'd",
      "startMs": 118960,
      "endMs": 119120,
      "timestampMs": 119040,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 119120,
      "endMs": 119300,
      "timestampMs": 119210,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 119300,
      "endMs": 119440,
      "timestampMs": 119370,
      "confidence": null
    },
    {
      "text": " show",
      "startMs": 119440,
      "endMs": 119995,
      "timestampMs": 119718,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 120188,
      "endMs": 120368,
      "timestampMs": 120278,
      "confidence": null
    },
    {
      "text": " COM",
      "startMs": 120368,
      "endMs": 120648,
      "timestampMs": 120508,
      "confidence": null
    },
    {
      "text": " ports,",
      "startMs": 120648,
      "endMs": 120793,
      "timestampMs": 120720,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 122050,
      "endMs": 122210,
      "timestampMs": 122130,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 122210,
      "endMs": 122570,
      "timestampMs": 122390,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 122570,
      "endMs": 122730,
      "timestampMs": 122650,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 122730,
      "endMs": 122830,
      "timestampMs": 122780,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 122830,
      "endMs": 122910,
      "timestampMs": 122870,
      "confidence": null
    },
    {
      "text": " PC",
      "startMs": 122910,
      "endMs": 123610,
      "timestampMs": 123260,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 123883,
      "endMs": 124023,
      "timestampMs": 123953,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 124023,
      "endMs": 124183,
      "timestampMs": 124103,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 124183,
      "endMs": 124523,
      "timestampMs": 124353,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 124643,
      "endMs": 125103,
      "timestampMs": 124873,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 125491,
      "endMs": 125741,
      "timestampMs": 125616,
      "confidence": null
    },
    {
      "text": " serial",
      "startMs": 125831,
      "endMs": 126386,
      "timestampMs": 126109,
      "confidence": null
    },
    {
      "text": " via",
      "startMs": 126711,
      "endMs": 127071,
      "timestampMs": 126891,
      "confidence": null
    },
    {
      "text": " USB",
      "startMs": 127071,
      "endMs": 127791,
      "timestampMs": 127431,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 127831,
      "endMs": 127991,
      "timestampMs": 127911,
      "confidence": null
    },
    {
      "text": " Bluetooth.",
      "startMs": 127991,
      "endMs": 128616,
      "timestampMs": 128303,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 129745,
      "endMs": 130000,
      "timestampMs": 129873,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 130058,
      "endMs": 130198,
      "timestampMs": 130128,
      "confidence": null
    },
    {
      "text": " fully",
      "startMs": 130198,
      "endMs": 130478,
      "timestampMs": 130338,
      "confidence": null
    },
    {
      "text": " support",
      "startMs": 130478,
      "endMs": 130878,
      "timestampMs": 130678,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 130878,
      "endMs": 131058,
      "timestampMs": 130968,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 131058,
      "endMs": 131158,
      "timestampMs": 131108,
      "confidence": null
    },
    {
      "text": " parameters",
      "startMs": 131158,
      "endMs": 131778,
      "timestampMs": 131468,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 131778,
      "endMs": 131958,
      "timestampMs": 131868,
      "confidence": null
    },
    {
      "text": " most",
      "startMs": 131958,
      "endMs": 132518,
      "timestampMs": 132238,
      "confidence": null
    },
    {
      "text": " serial",
      "startMs": 132586,
      "endMs": 132886,
      "timestampMs": 132736,
      "confidence": null
    },
    {
      "text": " communication.",
      "startMs": 132886,
      "endMs": 133716,
      "timestampMs": 133301,
      "confidence": null
    },
    {
      "text": " Finally,",
      "startMs": 135285,
      "endMs": 135875,
      "timestampMs": 135580,
      "confidence": null
    },
    {
      "text": " I'd",
      "startMs": 136278,
      "endMs": 136398,
      "timestampMs": 136338,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 136398,
      "endMs": 136578,
      "timestampMs": 136488,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 136578,
      "endMs": 136698,
      "timestampMs": 136638,
      "confidence": null
    },
    {
      "text": " show",
      "startMs": 136698,
      "endMs": 137253,
      "timestampMs": 136976,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 137251,
      "endMs": 137551,
      "timestampMs": 137401,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 137551,
      "endMs": 137711,
      "timestampMs": 137631,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 137711,
      "endMs": 137931,
      "timestampMs": 137821,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 137931,
      "endMs": 138271,
      "timestampMs": 138101,
      "confidence": null
    },
    {
      "text": " SSH",
      "startMs": 138271,
      "endMs": 138626,
      "timestampMs": 138449,
      "confidence": null
    },
    {
      "text": " client",
      "startMs": 138937,
      "endMs": 139317,
      "timestampMs": 139127,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 139317,
      "endMs": 139457,
      "timestampMs": 139387,
      "confidence": null
    },
    {
      "text": " well.",
      "startMs": 139457,
      "endMs": 139777,
      "timestampMs": 139617,
      "confidence": null
    },
    {
      "text": " Let's",
      "startMs": 141600,
      "endMs": 141690,
      "timestampMs": 141645,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 141690,
      "endMs": 141888,
      "timestampMs": 141789,
      "confidence": null
    },
    {
      "text": " see,",
      "startMs": 141888,
      "endMs": 142208,
      "timestampMs": 142048,
      "confidence": null
    },
    {
      "text": " I'll",
      "startMs": 142208,
      "endMs": 142418,
      "timestampMs": 142313,
      "confidence": null
    },
    {
      "text": " type",
      "startMs": 142848,
      "endMs": 143008,
      "timestampMs": 142928,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 143008,
      "endMs": 143148,
      "timestampMs": 143078,
      "confidence": null
    },
    {
      "text": " help.",
      "startMs": 143148,
      "endMs": 143433,
      "timestampMs": 143290,
      "confidence": null
    },
    {
      "text": " Oh",
      "startMs": 144298,
      "endMs": 144438,
      "timestampMs": 144368,
      "confidence": null
    },
    {
      "text": " yes,",
      "startMs": 144438,
      "endMs": 144873,
      "timestampMs": 144655,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 145278,
      "endMs": 145438,
      "timestampMs": 145358,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 145438,
      "endMs": 145558,
      "timestampMs": 145498,
      "confidence": null
    },
    {
      "text": " connected",
      "startMs": 145558,
      "endMs": 145938,
      "timestampMs": 145748,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 145938,
      "endMs": 146138,
      "timestampMs": 146038,
      "confidence": null
    },
    {
      "text": " Luxall",
      "startMs": 146138,
      "endMs": 146798,
      "timestampMs": 146468,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 147031,
      "endMs": 147151,
      "timestampMs": 147091,
      "confidence": null
    },
    {
      "text": " everything",
      "startMs": 147151,
      "endMs": 147471,
      "timestampMs": 147311,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 147471,
      "endMs": 147551,
      "timestampMs": 147511,
      "confidence": null
    },
    {
      "text": " showing",
      "startMs": 147551,
      "endMs": 147831,
      "timestampMs": 147691,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 147831,
      "endMs": 147931,
      "timestampMs": 147881,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 147931,
      "endMs": 148156,
      "timestampMs": 148043,
      "confidence": null
    },
    {
      "text": " great.",
      "startMs": 148156,
      "endMs": 148436,
      "timestampMs": 148296,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 149750,
      "endMs": 149920,
      "timestampMs": 149835,
      "confidence": null
    },
    {
      "text": " went",
      "startMs": 149920,
      "endMs": 150120,
      "timestampMs": 150020,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 150120,
      "endMs": 150530,
      "timestampMs": 150325,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 150700,
      "endMs": 150840,
      "timestampMs": 150770,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 150840,
      "endMs": 150940,
      "timestampMs": 150890,
      "confidence": null
    },
    {
      "text": " scan,",
      "startMs": 150940,
      "endMs": 151765,
      "timestampMs": 151353,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 151920,
      "endMs": 152040,
      "timestampMs": 151980,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 152040,
      "endMs": 152140,
      "timestampMs": 152090,
      "confidence": null
    },
    {
      "text": " create",
      "startMs": 152140,
      "endMs": 152500,
      "timestampMs": 152320,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 152633,
      "endMs": 152733,
      "timestampMs": 152683,
      "confidence": null
    },
    {
      "text": " TCP",
      "startMs": 152733,
      "endMs": 153103,
      "timestampMs": 152918,
      "confidence": null
    },
    {
      "text": " server,",
      "startMs": 153333,
      "endMs": 154053,
      "timestampMs": 153693,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 154173,
      "endMs": 154293,
      "timestampMs": 154233,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 154293,
      "endMs": 154393,
      "timestampMs": 154343,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 154393,
      "endMs": 154773,
      "timestampMs": 154583,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 154773,
      "endMs": 155113,
      "timestampMs": 154943,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 155113,
      "endMs": 155193,
      "timestampMs": 155153,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 155193,
      "endMs": 155578,
      "timestampMs": 155386,
      "confidence": null
    },
    {
      "text": " via",
      "startMs": 156056,
      "endMs": 156216,
      "timestampMs": 156136,
      "confidence": null
    },
    {
      "text": " Telnet,",
      "startMs": 156216,
      "endMs": 156781,
      "timestampMs": 156499,
      "confidence": null
    },
    {
      "text": " SSH",
      "startMs": 157279,
      "endMs": 157819,
      "timestampMs": 157549,
      "confidence": null
    },
    {
      "text": " client",
      "startMs": 157819,
      "endMs": 158359,
      "timestampMs": 158089,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 158619,
      "endMs": 158832,
      "timestampMs": 158726,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 158832,
      "endMs": 159212,
      "timestampMs": 159022,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 159212,
      "endMs": 159392,
      "timestampMs": 159302,
      "confidence": null
    },
    {
      "text": " serial",
      "startMs": 159392,
      "endMs": 159772,
      "timestampMs": 159582,
      "confidence": null
    },
    {
      "text": " com",
      "startMs": 159772,
      "endMs": 159992,
      "timestampMs": 159882,
      "confidence": null
    },
    {
      "text": " ports.",
      "startMs": 159992,
      "endMs": 160487,
      "timestampMs": 160239,
      "confidence": null
    },
    {
      "text": " Thank",
      "startMs": 162730,
      "endMs": 162990,
      "timestampMs": 162860,
      "confidence": null
    },
    {
      "text": " you.",
      "startMs": 162990,
      "endMs": 163130,
      "timestampMs": 163060,
      "confidence": null
    }
  ],
  "cues": {
    "welcome": [
      {
        "text": "Welcome",
        "ms": 375
      },
      {
        "text": "to",
        "ms": 875
      },
      {
        "text": "CTRLbot.",
        "ms": 1055
      },
      {
        "text": "This",
        "ms": 2415
      },
      {
        "text": "will",
        "ms": 2575
      },
      {
        "text": "be",
        "ms": 2775
      },
      {
        "text": "a",
        "ms": 2975
      },
      {
        "text": "short",
        "ms": 3095
      },
      {
        "text": "walkthrough",
        "ms": 3698
      },
      {
        "text": "of",
        "ms": 4538
      },
      {
        "text": "our",
        "ms": 4878
      },
      {
        "text": "latest",
        "ms": 5118
      },
      {
        "text": "utility",
        "ms": 5638
      },
      {
        "text": "called",
        "ms": 6558
      },
      {
        "text": "CTRLbot",
        "ms": 7258
      },
      {
        "text": "Terminator.",
        "ms": 8178
      }
    ],
    "terminal-app": [
      {
        "text": "It's",
        "ms": 9930
      },
      {
        "text": "basically",
        "ms": 10163
      },
      {
        "text": "a",
        "ms": 11391
      },
      {
        "text": "terminal",
        "ms": 11634
      },
      {
        "text": "app",
        "ms": 12542
      },
      {
        "text": "for",
        "ms": 12945
      },
      {
        "text": "PC",
        "ms": 13385
      }
    ],
    "overview": [
      {
        "text": "It",
        "ms": 16250
      },
      {
        "text": "can",
        "ms": 16300
      },
      {
        "text": "scan",
        "ms": 16500
      },
      {
        "text": "your",
        "ms": 16840
      },
      {
        "text": "network.",
        "ms": 17020
      },
      {
        "text": "It",
        "ms": 18288
      },
      {
        "text": "can",
        "ms": 18388
      },
      {
        "text": "set",
        "ms": 18948
      },
      {
        "text": "up",
        "ms": 19168
      },
      {
        "text": "a",
        "ms": 19421
      },
      {
        "text": "server",
        "ms": 19581
      },
      {
        "text": "for",
        "ms": 20361
      },
      {
        "text": "testing.",
        "ms": 20541
      },
      {
        "text": "It",
        "ms": 21989
      },
      {
        "text": "can",
        "ms": 22109
      },
      {
        "text": "connect",
        "ms": 22249
      },
      {
        "text": "to",
        "ms": 22569
      },
      {
        "text": "devices",
        "ms": 22669
      },
      {
        "text": "and",
        "ms": 23464
      },
      {
        "text": "allow",
        "ms": 23672
      },
      {
        "text": "you",
        "ms": 24215
      },
      {
        "text": "to",
        "ms": 24515
      },
      {
        "text": "communicate",
        "ms": 24655
      },
      {
        "text": "with",
        "ms": 25315
      },
      {
        "text": "them",
        "ms": 25535
      },
      {
        "text": "through",
        "ms": 26011
      },
      {
        "text": "their",
        "ms": 26271
      },
      {
        "text": "APIs.",
        "ms": 26491
      },
      {
        "text": "You",
        "ms": 28484
      },
      {
        "text": "can",
        "ms": 28644
      },
      {
        "text": "also",
        "ms": 29022
      },
      {
        "text": "connect",
        "ms": 29382
      },
      {
        "text": "to",
        "ms": 29722
      },
      {
        "text": "devices",
        "ms": 29842
      },
      {
        "text": "using",
        "ms": 31120
      },
      {
        "text": "the",
        "ms": 31740
      },
      {
        "text": "USB",
        "ms": 32020
      },
      {
        "text": "to",
        "ms": 33123
      },
      {
        "text": "serial",
        "ms": 33683
      },
      {
        "text": "ports",
        "ms": 34143
      },
      {
        "text": "on",
        "ms": 34603
      },
      {
        "text": "your",
        "ms": 34703
      },
      {
        "text": "PC,",
        "ms": 34923
      },
      {
        "text": "or",
        "ms": 36101
      },
      {
        "text": "even",
        "ms": 36241
      },
      {
        "text": "set",
        "ms": 36481
      },
      {
        "text": "up",
        "ms": 36701
      },
      {
        "text": "and",
        "ms": 37129
      },
      {
        "text": "connect",
        "ms": 37249
      },
      {
        "text": "to",
        "ms": 37589
      },
      {
        "text": "an",
        "ms": 37969
      },
      {
        "text": "SSH",
        "ms": 38189
      },
      {
        "text": "host.",
        "ms": 39152
      }
    ],
    "begin-scan": [
      {
        "text": "So",
        "ms": 40040
      },
      {
        "text": "let's",
        "ms": 40140
      },
      {
        "text": "begin.",
        "ms": 40360
      },
      {
        "text": "And",
        "ms": 40560
      },
      {
        "text": "we'll",
        "ms": 41038
      },
      {
        "text": "start",
        "ms": 41203
      },
      {
        "text": "with",
        "ms": 41483
      },
      {
        "text": "the",
        "ms": 42083
      },
      {
        "text": "scan,",
        "ms": 42243
      }
    ],
    "scan-info": [
      {
        "text": "You",
        "ms": 44770
      },
      {
        "text": "can",
        "ms": 44910
      },
      {
        "text": "get",
        "ms": 45110
      },
      {
        "text": "the",
        "ms": 45290
      },
      {
        "text": "host",
        "ms": 45430
      },
      {
        "text": "name,",
        "ms": 45730
      },
      {
        "text": "device",
        "ms": 46638
      },
      {
        "text": "name,",
        "ms": 47118
      },
      {
        "text": "manufacturer,",
        "ms": 48081
      },
      {
        "text": "as",
        "ms": 49779
      },
      {
        "text": "well",
        "ms": 49939
      },
      {
        "text": "as",
        "ms": 50419
      },
      {
        "text": "Mac",
        "ms": 50667
      },
      {
        "text": "address.",
        "ms": 50967
      }
    ],
    "scan-links": [
      {
        "text": "And",
        "ms": 52640
      },
      {
        "text": "if",
        "ms": 52820
      },
      {
        "text": "you",
        "ms": 52920
      },
      {
        "text": "scroll",
        "ms": 53020
      },
      {
        "text": "over,",
        "ms": 53400
      },
      {
        "text": "you",
        "ms": 53640
      },
      {
        "text": "can",
        "ms": 53760
      },
      {
        "text": "see",
        "ms": 53940
      },
      {
        "text": "that",
        "ms": 54120
      },
      {
        "text": "there's",
        "ms": 54380
      },
      {
        "text": "even",
        "ms": 54680
      },
      {
        "text": "links",
        "ms": 54960
      },
      {
        "text": "that",
        "ms": 55573
      },
      {
        "text": "you",
        "ms": 55753
      },
      {
        "text": "can",
        "ms": 55913
      },
      {
        "text": "go",
        "ms": 56714
      },
      {
        "text": "to",
        "ms": 56974
      },
      {
        "text": "directly",
        "ms": 57402
      },
      {
        "text": "to",
        "ms": 57842
      },
      {
        "text": "the",
        "ms": 58270
      },
      {
        "text": "website",
        "ms": 58385
      }
    ],
    "server-intro": [
      {
        "text": "Now",
        "ms": 62325
      },
      {
        "text": "let's",
        "ms": 62485
      },
      {
        "text": "take",
        "ms": 62705
      },
      {
        "text": "a",
        "ms": 62965
      },
      {
        "text": "look",
        "ms": 63005
      },
      {
        "text": "at",
        "ms": 63285
      },
      {
        "text": "our",
        "ms": 63998
      },
      {
        "text": "TCP",
        "ms": 64358
      },
      {
        "text": "server,",
        "ms": 64818
      }
    ],
    "server-test": [
      {
        "text": "so",
        "ms": 66010
      },
      {
        "text": "that",
        "ms": 66170
      },
      {
        "text": "you",
        "ms": 66330
      },
      {
        "text": "can",
        "ms": 66490
      },
      {
        "text": "test,",
        "ms": 66730
      },
      {
        "text": "say,",
        "ms": 67290
      },
      {
        "text": "our",
        "ms": 67888
      },
      {
        "text": "CTRLbot",
        "ms": 68088
      },
      {
        "text": "IoT",
        "ms": 68888
      },
      {
        "text": "app",
        "ms": 69306
      },
      {
        "text": "from",
        "ms": 69869
      },
      {
        "text": "it.",
        "ms": 70089
      }
    ],
    "server-connected": [
      {
        "text": "And",
        "ms": 72380
      },
      {
        "text": "now",
        "ms": 72480
      },
      {
        "text": "you",
        "ms": 72660
      },
      {
        "text": "can",
        "ms": 72780
      },
      {
        "text": "see",
        "ms": 72980
      },
      {
        "text": "that",
        "ms": 73480
      },
      {
        "text": "I'm",
        "ms": 73680
      },
      {
        "text": "actually",
        "ms": 73860
      },
      {
        "text": "connected",
        "ms": 74380
      },
      {
        "text": "to",
        "ms": 74820
      },
      {
        "text": "it,",
        "ms": 75060
      },
      {
        "text": "and",
        "ms": 75618
      },
      {
        "text": "I",
        "ms": 75718
      },
      {
        "text": "can",
        "ms": 75798
      },
      {
        "text": "send",
        "ms": 76018
      },
      {
        "text": "commands",
        "ms": 76338
      },
      {
        "text": "over",
        "ms": 77461
      },
      {
        "text": "to",
        "ms": 77861
      },
      {
        "text": "it,",
        "ms": 78121
      },
      {
        "text": "and",
        "ms": 78321
      },
      {
        "text": "they",
        "ms": 78461
      },
      {
        "text": "show",
        "ms": 78621
      },
      {
        "text": "up",
        "ms": 78881
      },
      {
        "text": "over",
        "ms": 79161
      },
      {
        "text": "here,",
        "ms": 79401
      }
    ],
    "pin": [
      {
        "text": "Up",
        "ms": 85340
      },
      {
        "text": "here,",
        "ms": 85500
      },
      {
        "text": "you'll",
        "ms": 85700
      },
      {
        "text": "notice",
        "ms": 85980
      },
      {
        "text": "there's",
        "ms": 86260
      },
      {
        "text": "a",
        "ms": 86460
      },
      {
        "text": "little",
        "ms": 86460
      },
      {
        "text": "pin.",
        "ms": 86720
      },
      {
        "text": "If",
        "ms": 87260
      },
      {
        "text": "you",
        "ms": 87658
      },
      {
        "text": "need",
        "ms": 87798
      },
      {
        "text": "to",
        "ms": 87998
      },
      {
        "text": "save",
        "ms": 88158
      },
      {
        "text": "any",
        "ms": 88618
      },
      {
        "text": "of",
        "ms": 88798
      },
      {
        "text": "these",
        "ms": 88938
      },
      {
        "text": "connections,",
        "ms": 89301
      },
      {
        "text": "you",
        "ms": 89821
      },
      {
        "text": "can",
        "ms": 89941
      },
      {
        "text": "always",
        "ms": 90121
      },
      {
        "text": "just",
        "ms": 90421
      },
      {
        "text": "pin",
        "ms": 90701
      },
      {
        "text": "it,",
        "ms": 90981
      },
      {
        "text": "and",
        "ms": 91494
      },
      {
        "text": "then",
        "ms": 91594
      },
      {
        "text": "they'll",
        "ms": 91714
      },
      {
        "text": "be",
        "ms": 91954
      },
      {
        "text": "available",
        "ms": 92094
      },
      {
        "text": "for",
        "ms": 92574
      },
      {
        "text": "the",
        "ms": 92714
      },
      {
        "text": "next",
        "ms": 92834
      },
      {
        "text": "time",
        "ms": 93094
      },
      {
        "text": "so",
        "ms": 93905
      },
      {
        "text": "that",
        "ms": 94045
      },
      {
        "text": "you",
        "ms": 94225
      },
      {
        "text": "can",
        "ms": 94385
      },
      {
        "text": "have",
        "ms": 94845
      },
      {
        "text": "various",
        "ms": 95505
      },
      {
        "text": "ports",
        "ms": 96283
      },
      {
        "text": "that",
        "ms": 96703
      },
      {
        "text": "you",
        "ms": 96783
      },
      {
        "text": "might",
        "ms": 96923
      },
      {
        "text": "need",
        "ms": 97823
      },
      {
        "text": "to",
        "ms": 98043
      },
      {
        "text": "connect",
        "ms": 98163
      },
      {
        "text": "to",
        "ms": 98513
      }
    ],
    "other-direction": [
      {
        "text": "Now",
        "ms": 101340
      },
      {
        "text": "we're",
        "ms": 101780
      },
      {
        "text": "going",
        "ms": 101980
      },
      {
        "text": "to",
        "ms": 102140
      },
      {
        "text": "go",
        "ms": 102240
      },
      {
        "text": "the",
        "ms": 102460
      },
      {
        "text": "other",
        "ms": 102600
      },
      {
        "text": "direction.",
        "ms": 102800
      },
      {
        "text": "Now",
        "ms": 103880
      },
      {
        "text": "we're",
        "ms": 104060
      },
      {
        "text": "going",
        "ms": 104240
      },
      {
        "text": "to",
        "ms": 104520
      },
      {
        "text": "connect",
        "ms": 104720
      },
      {
        "text": "to",
        "ms": 105040
      },
      {
        "text": "devices",
        "ms": 105260
      },
      {
        "text": "that",
        "ms": 105960
      },
      {
        "text": "are",
        "ms": 106140
      },
      {
        "text": "on",
        "ms": 106340
      },
      {
        "text": "the",
        "ms": 106680
      },
      {
        "text": "network.",
        "ms": 106820
      }
    ],
    "raw-tcp": [
      {
        "text": "And",
        "ms": 108200
      },
      {
        "text": "this",
        "ms": 108340
      },
      {
        "text": "is",
        "ms": 108520
      },
      {
        "text": "a",
        "ms": 108660
      },
      {
        "text": "raw",
        "ms": 108760
      },
      {
        "text": "TCP",
        "ms": 109518
      },
      {
        "text": "connection.",
        "ms": 110158
      },
      {
        "text": "So",
        "ms": 111358
      },
      {
        "text": "it's",
        "ms": 111618
      },
      {
        "text": "good",
        "ms": 111798
      },
      {
        "text": "for",
        "ms": 112058
      },
      {
        "text": "Telnet",
        "ms": 112518
      },
      {
        "text": "or",
        "ms": 113576
      },
      {
        "text": "any",
        "ms": 114174
      },
      {
        "text": "real",
        "ms": 114354
      },
      {
        "text": "port,",
        "ms": 114654
      },
      {
        "text": "TCP",
        "ms": 115152
      },
      {
        "text": "port.",
        "ms": 115455
      }
    ],
    "com-ports": [
      {
        "text": "Next,",
        "ms": 118780
      },
      {
        "text": "I'd",
        "ms": 118960
      },
      {
        "text": "like",
        "ms": 119120
      },
      {
        "text": "to",
        "ms": 119300
      },
      {
        "text": "show",
        "ms": 119440
      },
      {
        "text": "our",
        "ms": 120188
      },
      {
        "text": "COM",
        "ms": 120368
      },
      {
        "text": "ports,",
        "ms": 120648
      }
    ],
    "usb-bluetooth": [
      {
        "text": "And",
        "ms": 122050
      },
      {
        "text": "so",
        "ms": 122210
      },
      {
        "text": "this",
        "ms": 122570
      },
      {
        "text": "is",
        "ms": 122730
      },
      {
        "text": "a",
        "ms": 122830
      },
      {
        "text": "PC",
        "ms": 122910
      },
      {
        "text": "and",
        "ms": 123883
      },
      {
        "text": "you",
        "ms": 124023
      },
      {
        "text": "can",
        "ms": 124183
      },
      {
        "text": "connect",
        "ms": 124643
      },
      {
        "text": "a",
        "ms": 125491
      },
      {
        "text": "serial",
        "ms": 125831
      },
      {
        "text": "via",
        "ms": 126711
      },
      {
        "text": "USB",
        "ms": 127071
      },
      {
        "text": "or",
        "ms": 127831
      },
      {
        "text": "Bluetooth.",
        "ms": 127991
      }
    ],
    "parameters": [
      {
        "text": "And",
        "ms": 129745
      },
      {
        "text": "we",
        "ms": 130058
      },
      {
        "text": "fully",
        "ms": 130198
      },
      {
        "text": "support",
        "ms": 130478
      },
      {
        "text": "all",
        "ms": 130878
      },
      {
        "text": "the",
        "ms": 131058
      },
      {
        "text": "parameters",
        "ms": 131158
      },
      {
        "text": "for",
        "ms": 131778
      },
      {
        "text": "most",
        "ms": 131958
      },
      {
        "text": "serial",
        "ms": 132586
      },
      {
        "text": "communication.",
        "ms": 132886
      }
    ],
    "ssh-intro": [
      {
        "text": "Finally,",
        "ms": 135285
      },
      {
        "text": "I'd",
        "ms": 136278
      },
      {
        "text": "like",
        "ms": 136398
      },
      {
        "text": "to",
        "ms": 136578
      },
      {
        "text": "show",
        "ms": 136698
      },
      {
        "text": "that",
        "ms": 137251
      },
      {
        "text": "we",
        "ms": 137551
      },
      {
        "text": "have",
        "ms": 137711
      },
      {
        "text": "an",
        "ms": 137931
      },
      {
        "text": "SSH",
        "ms": 138271
      },
      {
        "text": "client",
        "ms": 138937
      },
      {
        "text": "as",
        "ms": 139317
      },
      {
        "text": "well.",
        "ms": 139457
      }
    ],
    "ssh-help": [
      {
        "text": "Let's",
        "ms": 141600
      },
      {
        "text": "just",
        "ms": 141690
      },
      {
        "text": "see,",
        "ms": 141888
      },
      {
        "text": "I'll",
        "ms": 142208
      },
      {
        "text": "type",
        "ms": 142848
      },
      {
        "text": "in",
        "ms": 143008
      },
      {
        "text": "help.",
        "ms": 143148
      },
      {
        "text": "Oh",
        "ms": 144298
      },
      {
        "text": "yes,",
        "ms": 144438
      },
      {
        "text": "we",
        "ms": 145278
      },
      {
        "text": "are",
        "ms": 145438
      },
      {
        "text": "connected",
        "ms": 145558
      },
      {
        "text": "to",
        "ms": 145938
      },
      {
        "text": "Luxall",
        "ms": 146138
      },
      {
        "text": "and",
        "ms": 147031
      },
      {
        "text": "everything",
        "ms": 147151
      },
      {
        "text": "is",
        "ms": 147471
      },
      {
        "text": "showing",
        "ms": 147551
      },
      {
        "text": "up",
        "ms": 147831
      },
      {
        "text": "just",
        "ms": 147931
      },
      {
        "text": "great.",
        "ms": 148156
      }
    ],
    "recap": [
      {
        "text": "we",
        "ms": 149750
      },
      {
        "text": "went",
        "ms": 149920
      },
      {
        "text": "over",
        "ms": 150120
      },
      {
        "text": "how",
        "ms": 150700
      },
      {
        "text": "to",
        "ms": 150840
      },
      {
        "text": "scan,",
        "ms": 150940
      },
      {
        "text": "how",
        "ms": 151920
      },
      {
        "text": "to",
        "ms": 152040
      },
      {
        "text": "create",
        "ms": 152140
      },
      {
        "text": "a",
        "ms": 152633
      },
      {
        "text": "TCP",
        "ms": 152733
      },
      {
        "text": "server,",
        "ms": 153333
      },
      {
        "text": "how",
        "ms": 154173
      },
      {
        "text": "to",
        "ms": 154293
      },
      {
        "text": "connect",
        "ms": 154393
      },
      {
        "text": "to",
        "ms": 154773
      },
      {
        "text": "a",
        "ms": 155113
      },
      {
        "text": "device",
        "ms": 155193
      },
      {
        "text": "via",
        "ms": 156056
      },
      {
        "text": "Telnet,",
        "ms": 156216
      },
      {
        "text": "SSH",
        "ms": 157279
      },
      {
        "text": "client",
        "ms": 157819
      },
      {
        "text": "or",
        "ms": 158619
      },
      {
        "text": "through",
        "ms": 158832
      },
      {
        "text": "the",
        "ms": 159212
      },
      {
        "text": "serial",
        "ms": 159392
      },
      {
        "text": "com",
        "ms": 159772
      },
      {
        "text": "ports.",
        "ms": 159992
      }
    ],
    "thank-you": [
      {
        "text": "Thank",
        "ms": 162730
      },
      {
        "text": "you.",
        "ms": 162990
      }
    ]
  }
};

export const TERMINATOR_LANDSCAPE_EDIT = NARRATION_EDIT;

