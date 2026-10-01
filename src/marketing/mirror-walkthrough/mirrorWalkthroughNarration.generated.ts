// Written by `npm run narration:edit`. Do not edit; change src/marketing/mirror-walkthrough/mirrorWalkthroughNarration.ts and rebuild.

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
  "src": "narration/mirror-walkthrough/edit.m4a",
  "seconds": 136,
  "clips": [
    {
      "id": "welcome",
      "at": 0.35,
      "start": 0.775,
      "end": 9.15,
      "seconds": 8.298,
      "removed": []
    },
    {
      "id": "mirror-what",
      "at": 8.95,
      "start": 11.6,
      "end": 16.445,
      "seconds": 4.588,
      "removed": [
        {
          "from": 14.515,
          "to": 14.68,
          "kind": "extra",
          "heard": "on"
        }
      ]
    },
    {
      "id": "install-adb",
      "at": 16.935,
      "start": 30.085,
      "end": 43.915,
      "seconds": 13.108,
      "removed": [
        {
          "from": 37.035,
          "to": 37.465,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 37.485,
          "to": 37.745,
          "kind": "repeat",
          "heard": "that"
        }
      ]
    },
    {
      "id": "usb-debugging",
      "at": 32.25,
      "start": 190.785,
      "end": 196.53,
      "seconds": 5.206,
      "removed": [
        {
          "from": 192.135,
          "to": 192.545,
          "kind": "filler",
          "heard": "uh,"
        },
        {
          "from": 193.88,
          "to": 193.985,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "authorize",
      "at": 40.25,
      "start": 93.19,
      "end": 99,
      "seconds": 5.613,
      "removed": [
        {
          "from": 96.84,
          "to": 97.025,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "ready",
      "at": 46.16,
      "start": 99.29,
      "end": 106.315,
      "seconds": 6.746,
      "removed": []
    },
    {
      "id": "pick-frame",
      "at": 54.75,
      "start": 118.515,
      "end": 126.415,
      "seconds": 6.705,
      "removed": [
        {
          "from": 118.825,
          "to": 118.985,
          "kind": "repeat",
          "heard": "pick"
        },
        {
          "from": 121.235,
          "to": 121.505,
          "kind": "extra",
          "heard": "ah"
        },
        {
          "from": 122.77,
          "to": 122.875,
          "kind": "extra",
          "heard": "but"
        },
        {
          "from": 124.18,
          "to": 124.53,
          "kind": "repeat",
          "heard": "ah"
        }
      ]
    },
    {
      "id": "padding",
      "at": 61.76,
      "start": 130.525,
      "end": 135.215,
      "seconds": 4.503,
      "removed": [
        {
          "from": 134.51,
          "to": 134.685,
          "kind": "extra",
          "heard": "in"
        }
      ]
    },
    {
      "id": "copy-paste",
      "at": 69.75,
      "start": 224.695,
      "end": 237.7,
      "seconds": 11.394,
      "removed": [
        {
          "from": 226.65,
          "to": 227.04,
          "kind": "filler",
          "heard": "um"
        },
        {
          "from": 227.32,
          "to": 227.495,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 234.215,
          "to": 234.62,
          "kind": "extra",
          "heard": "ah"
        },
        {
          "from": 236.56,
          "to": 236.855,
          "kind": "repeat",
          "heard": "from"
        }
      ]
    },
    {
      "id": "screenshot",
      "at": 84.235,
      "start": 311.335,
      "end": 317.12,
      "seconds": 4.146,
      "removed": [
        {
          "from": 313.105,
          "to": 313.315,
          "kind": "extra",
          "heard": "i"
        },
        {
          "from": 313.96,
          "to": 314.045,
          "kind": "extra",
          "heard": "it"
        },
        {
          "from": 314.105,
          "to": 314.625,
          "kind": "extra",
          "heard": "thethe"
        },
        {
          "from": 314.705,
          "to": 314.95,
          "kind": "extra",
          "heard": "thes"
        },
        {
          "from": 315,
          "to": 315.305,
          "kind": "extra",
          "heard": "creen"
        }
      ]
    },
    {
      "id": "record-video",
      "at": 88.665,
      "start": 330.215,
      "end": 335.335,
      "seconds": 4.104,
      "removed": [
        {
          "from": 332.175,
          "to": 332.515,
          "kind": "repeat",
          "heard": "and"
        },
        {
          "from": 332.925,
          "to": 333.335,
          "kind": "extra",
          "heard": "ta"
        },
        {
          "from": 334.245,
          "to": 334.475,
          "kind": "extra",
          "heard": "at"
        }
      ]
    },
    {
      "id": "record-voice",
      "at": 93.1,
      "start": 342.9,
      "end": 344.725,
      "seconds": 1.825,
      "removed": []
    },
    {
      "id": "apps",
      "at": 98.25,
      "start": 388.71,
      "end": 401.73,
      "seconds": 11.09,
      "removed": [
        {
          "from": 392.835,
          "to": 393.115,
          "kind": "repeat",
          "heard": "and"
        },
        {
          "from": 394.355,
          "to": 394.66,
          "kind": "extra",
          "heard": "great"
        },
        {
          "from": 394.865,
          "to": 395.36,
          "kind": "filler",
          "heard": "uh"
        },
        {
          "from": 395.585,
          "to": 395.765,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 397.925,
          "to": 398.155,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "files-copy",
      "at": 112.25,
      "start": 454.51,
      "end": 459.02,
      "seconds": 4.51,
      "removed": []
    },
    {
      "id": "shell-logs",
      "at": 119.25,
      "start": 473.245,
      "end": 479.575,
      "seconds": 5.409,
      "removed": [
        {
          "from": 475.535,
          "to": 475.985,
          "kind": "extra",
          "heard": "ah"
        },
        {
          "from": 477.36,
          "to": 477.635,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "setup-again",
      "at": 127.25,
      "start": 494.65,
      "end": 497.61,
      "seconds": 2.793,
      "removed": [
        {
          "from": 496.02,
          "to": 496.175,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "thank-you",
      "at": 131.75,
      "start": 501.415,
      "end": 503.08,
      "seconds": 1.665,
      "removed": []
    }
  ],
  "words": [
    {
      "text": " Welcome",
      "startMs": 365,
      "endMs": 1025,
      "timestampMs": 695,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 1025,
      "endMs": 1185,
      "timestampMs": 1105,
      "confidence": null
    },
    {
      "text": " CTRLbot.",
      "startMs": 1185,
      "endMs": 1865,
      "timestampMs": 1525,
      "confidence": null
    },
    {
      "text": " This",
      "startMs": 3165,
      "endMs": 3215,
      "timestampMs": 3190,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 3205,
      "endMs": 3385,
      "timestampMs": 3295,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 3385,
      "endMs": 3485,
      "timestampMs": 3435,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 3485,
      "endMs": 3565,
      "timestampMs": 3525,
      "confidence": null
    },
    {
      "text": " walkthrough",
      "startMs": 3565,
      "endMs": 4525,
      "timestampMs": 4045,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 4525,
      "endMs": 4785,
      "timestampMs": 4655,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 4928,
      "endMs": 5048,
      "timestampMs": 4988,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 5048,
      "endMs": 5148,
      "timestampMs": 5098,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 5148,
      "endMs": 5588,
      "timestampMs": 5368,
      "confidence": null
    },
    {
      "text": " utilities",
      "startMs": 5768,
      "endMs": 6468,
      "timestampMs": 6118,
      "confidence": null
    },
    {
      "text": " called",
      "startMs": 6468,
      "endMs": 6843,
      "timestampMs": 6655,
      "confidence": null
    },
    {
      "text": " CTRLbot",
      "startMs": 7168,
      "endMs": 7948,
      "timestampMs": 7558,
      "confidence": null
    },
    {
      "text": " Mirror,",
      "startMs": 7948,
      "endMs": 8518,
      "timestampMs": 8233,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 9020,
      "endMs": 9140,
      "timestampMs": 9080,
      "confidence": null
    },
    {
      "text": " way",
      "startMs": 9140,
      "endMs": 9680,
      "timestampMs": 9410,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 9940,
      "endMs": 10140,
      "timestampMs": 10040,
      "confidence": null
    },
    {
      "text": " mirror",
      "startMs": 10140,
      "endMs": 10720,
      "timestampMs": 10430,
      "confidence": null
    },
    {
      "text": " what",
      "startMs": 10720,
      "endMs": 10920,
      "timestampMs": 10820,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 10920,
      "endMs": 11260,
      "timestampMs": 11090,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 11260,
      "endMs": 11440,
      "timestampMs": 11350,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 11440,
      "endMs": 11690,
      "timestampMs": 11565,
      "confidence": null
    },
    {
      "text": " Android",
      "startMs": 11923,
      "endMs": 12418,
      "timestampMs": 12170,
      "confidence": null
    },
    {
      "text": " phone",
      "startMs": 12623,
      "endMs": 12963,
      "timestampMs": 12793,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 13063,
      "endMs": 13203,
      "timestampMs": 13133,
      "confidence": null
    },
    {
      "text": " tablet.",
      "startMs": 13203,
      "endMs": 13508,
      "timestampMs": 13355,
      "confidence": null
    },
    {
      "text": " but",
      "startMs": 17080,
      "endMs": 17320,
      "timestampMs": 17200,
      "confidence": null
    },
    {
      "text": " what",
      "startMs": 17480,
      "endMs": 17900,
      "timestampMs": 17690,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 17900,
      "endMs": 18040,
      "timestampMs": 17970,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 18040,
      "endMs": 18240,
      "timestampMs": 18140,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 18240,
      "endMs": 18380,
      "timestampMs": 18310,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 18380,
      "endMs": 18500,
      "timestampMs": 18440,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 18500,
      "endMs": 18760,
      "timestampMs": 18630,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 18760,
      "endMs": 18840,
      "timestampMs": 18800,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 18840,
      "endMs": 18980,
      "timestampMs": 18910,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 18980,
      "endMs": 19120,
      "timestampMs": 19050,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 19120,
      "endMs": 19420,
      "timestampMs": 19270,
      "confidence": null
    },
    {
      "text": " install",
      "startMs": 19420,
      "endMs": 19905,
      "timestampMs": 19663,
      "confidence": null
    },
    {
      "text": " ADB.",
      "startMs": 19980,
      "endMs": 20660,
      "timestampMs": 20320,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 20660,
      "endMs": 20760,
      "timestampMs": 20710,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 20760,
      "endMs": 21000,
      "timestampMs": 20880,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 21000,
      "endMs": 21160,
      "timestampMs": 21080,
      "confidence": null
    },
    {
      "text": " tools",
      "startMs": 21160,
      "endMs": 21770,
      "timestampMs": 21465,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 22510,
      "endMs": 22830,
      "timestampMs": 22670,
      "confidence": null
    },
    {
      "text": " Android",
      "startMs": 22830,
      "endMs": 23570,
      "timestampMs": 23200,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 23948,
      "endMs": 24188,
      "timestampMs": 24068,
      "confidence": null
    },
    {
      "text": " help",
      "startMs": 24188,
      "endMs": 24468,
      "timestampMs": 24328,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 24468,
      "endMs": 24873,
      "timestampMs": 24671,
      "confidence": null
    },
    {
      "text": " not",
      "startMs": 24968,
      "endMs": 25168,
      "timestampMs": 25068,
      "confidence": null
    },
    {
      "text": " only",
      "startMs": 25168,
      "endMs": 25508,
      "timestampMs": 25338,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 25508,
      "endMs": 25868,
      "timestampMs": 25688,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 25908,
      "endMs": 26308,
      "timestampMs": 26108,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 26308,
      "endMs": 26488,
      "timestampMs": 26398,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 26488,
      "endMs": 26688,
      "timestampMs": 26588,
      "confidence": null
    },
    {
      "text": " device,",
      "startMs": 26688,
      "endMs": 27318,
      "timestampMs": 27003,
      "confidence": null
    },
    {
      "text": " but",
      "startMs": 27548,
      "endMs": 27668,
      "timestampMs": 27608,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 27668,
      "endMs": 28028,
      "timestampMs": 27848,
      "confidence": null
    },
    {
      "text": " manage",
      "startMs": 28028,
      "endMs": 28728,
      "timestampMs": 28378,
      "confidence": null
    },
    {
      "text": " applications",
      "startMs": 28728,
      "endMs": 29648,
      "timestampMs": 29188,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 29648,
      "endMs": 29848,
      "timestampMs": 29748,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 29848,
      "endMs": 30008,
      "timestampMs": 29928,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 32275,
      "endMs": 32395,
      "timestampMs": 32335,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 32395,
      "endMs": 32555,
      "timestampMs": 32475,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 32555,
      "endMs": 32635,
      "timestampMs": 32595,
      "confidence": null
    },
    {
      "text": " where",
      "startMs": 32635,
      "endMs": 32795,
      "timestampMs": 32715,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 32795,
      "endMs": 32875,
      "timestampMs": 32835,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 32875,
      "endMs": 33115,
      "timestampMs": 32995,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 33115,
      "endMs": 33395,
      "timestampMs": 33255,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 33395,
      "endMs": 33555,
      "timestampMs": 33475,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 33673,
      "endMs": 33953,
      "timestampMs": 33813,
      "confidence": null
    },
    {
      "text": " make",
      "startMs": 33953,
      "endMs": 34213,
      "timestampMs": 34083,
      "confidence": null
    },
    {
      "text": " sure",
      "startMs": 34213,
      "endMs": 34593,
      "timestampMs": 34403,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 34593,
      "endMs": 34858,
      "timestampMs": 34726,
      "confidence": null
    },
    {
      "text": " USB",
      "startMs": 35856,
      "endMs": 36196,
      "timestampMs": 36026,
      "confidence": null
    },
    {
      "text": " debugging",
      "startMs": 36196,
      "endMs": 36736,
      "timestampMs": 36466,
      "confidence": null
    },
    {
      "text": " mode",
      "startMs": 36736,
      "endMs": 36996,
      "timestampMs": 36866,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 36996,
      "endMs": 37236,
      "timestampMs": 37116,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 37236,
      "endMs": 37451,
      "timestampMs": 37343,
      "confidence": null
    },
    {
      "text": " In",
      "startMs": 40250,
      "endMs": 40360,
      "timestampMs": 40305,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 40360,
      "endMs": 40520,
      "timestampMs": 40440,
      "confidence": null
    },
    {
      "text": " initial",
      "startMs": 40660,
      "endMs": 41060,
      "timestampMs": 40860,
      "confidence": null
    },
    {
      "text": " time,",
      "startMs": 41060,
      "endMs": 41495,
      "timestampMs": 41278,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 41800,
      "endMs": 42040,
      "timestampMs": 41920,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 42040,
      "endMs": 42260,
      "timestampMs": 42150,
      "confidence": null
    },
    {
      "text": " asked",
      "startMs": 42260,
      "endMs": 42500,
      "timestampMs": 42380,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 42500,
      "endMs": 42780,
      "timestampMs": 42640,
      "confidence": null
    },
    {
      "text": " authorize",
      "startMs": 42780,
      "endMs": 43655,
      "timestampMs": 43218,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 43903,
      "endMs": 44123,
      "timestampMs": 44013,
      "confidence": null
    },
    {
      "text": " connection",
      "startMs": 44123,
      "endMs": 44728,
      "timestampMs": 44426,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 44843,
      "endMs": 44963,
      "timestampMs": 44903,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 44963,
      "endMs": 45143,
      "timestampMs": 45053,
      "confidence": null
    },
    {
      "text": " device.",
      "startMs": 45143,
      "endMs": 45823,
      "timestampMs": 45483,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 46190,
      "endMs": 46410,
      "timestampMs": 46300,
      "confidence": null
    },
    {
      "text": " once",
      "startMs": 46410,
      "endMs": 46570,
      "timestampMs": 46490,
      "confidence": null
    },
    {
      "text": " that's",
      "startMs": 46570,
      "endMs": 46890,
      "timestampMs": 46730,
      "confidence": null
    },
    {
      "text": " authorized,",
      "startMs": 46890,
      "endMs": 47310,
      "timestampMs": 47100,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 47310,
      "endMs": 47530,
      "timestampMs": 47420,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 47530,
      "endMs": 47890,
      "timestampMs": 47710,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 47890,
      "endMs": 48090,
      "timestampMs": 47990,
      "confidence": null
    },
    {
      "text": " it's",
      "startMs": 48090,
      "endMs": 48230,
      "timestampMs": 48160,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 48230,
      "endMs": 48590,
      "timestampMs": 48410,
      "confidence": null
    },
    {
      "text": " green",
      "startMs": 48590,
      "endMs": 48930,
      "timestampMs": 48760,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 48930,
      "endMs": 49070,
      "timestampMs": 49000,
      "confidence": null
    },
    {
      "text": " ready,",
      "startMs": 49070,
      "endMs": 49550,
      "timestampMs": 49310,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 50268,
      "endMs": 50408,
      "timestampMs": 50338,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 50408,
      "endMs": 50528,
      "timestampMs": 50468,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 50528,
      "endMs": 50688,
      "timestampMs": 50608,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 50688,
      "endMs": 50888,
      "timestampMs": 50788,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 50888,
      "endMs": 51248,
      "timestampMs": 51068,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 51248,
      "endMs": 51428,
      "timestampMs": 51338,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 51428,
      "endMs": 51593,
      "timestampMs": 51511,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 51871,
      "endMs": 52031,
      "timestampMs": 51951,
      "confidence": null
    },
    {
      "text": " start",
      "startMs": 52031,
      "endMs": 52331,
      "timestampMs": 52181,
      "confidence": null
    },
    {
      "text": " mirroring,",
      "startMs": 52331,
      "endMs": 52876,
      "timestampMs": 52604,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 54785,
      "endMs": 55045,
      "timestampMs": 54915,
      "confidence": null
    },
    {
      "text": " pick",
      "startMs": 55113,
      "endMs": 55333,
      "timestampMs": 55223,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 55333,
      "endMs": 55453,
      "timestampMs": 55393,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 55453,
      "endMs": 55533,
      "timestampMs": 55493,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 55533,
      "endMs": 55733,
      "timestampMs": 55633,
      "confidence": null
    },
    {
      "text": " other",
      "startMs": 55733,
      "endMs": 56093,
      "timestampMs": 55913,
      "confidence": null
    },
    {
      "text": " ones",
      "startMs": 56093,
      "endMs": 56393,
      "timestampMs": 56243,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 56393,
      "endMs": 56863,
      "timestampMs": 56628,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 57201,
      "endMs": 57381,
      "timestampMs": 57291,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 57381,
      "endMs": 57721,
      "timestampMs": 57551,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 57721,
      "endMs": 58221,
      "timestampMs": 57971,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 58221,
      "endMs": 58389,
      "timestampMs": 58305,
      "confidence": null
    },
    {
      "text": " something",
      "startMs": 58484,
      "endMs": 59064,
      "timestampMs": 58774,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 59144,
      "endMs": 59264,
      "timestampMs": 59204,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 59264,
      "endMs": 59870,
      "timestampMs": 59567,
      "confidence": null
    },
    {
      "text": " bit",
      "startMs": 59870,
      "endMs": 60090,
      "timestampMs": 59980,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 60230,
      "endMs": 60350,
      "timestampMs": 60290,
      "confidence": null
    },
    {
      "text": " better",
      "startMs": 60350,
      "endMs": 60760,
      "timestampMs": 60555,
      "confidence": null
    },
    {
      "text": " fit",
      "startMs": 60850,
      "endMs": 60950,
      "timestampMs": 60900,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 60950,
      "endMs": 61190,
      "timestampMs": 61070,
      "confidence": null
    },
    {
      "text": " it.",
      "startMs": 61190,
      "endMs": 61370,
      "timestampMs": 61280,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 61775,
      "endMs": 61875,
      "timestampMs": 61825,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 61875,
      "endMs": 61975,
      "timestampMs": 61925,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 61975,
      "endMs": 62135,
      "timestampMs": 62055,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 62135,
      "endMs": 62455,
      "timestampMs": 62295,
      "confidence": null
    },
    {
      "text": " other",
      "startMs": 62455,
      "endMs": 62755,
      "timestampMs": 62605,
      "confidence": null
    },
    {
      "text": " options",
      "startMs": 62755,
      "endMs": 63155,
      "timestampMs": 62955,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 63155,
      "endMs": 63515,
      "timestampMs": 63335,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 63515,
      "endMs": 63815,
      "timestampMs": 63665,
      "confidence": null
    },
    {
      "text": " padding",
      "startMs": 63815,
      "endMs": 64645,
      "timestampMs": 64230,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 64975,
      "endMs": 65135,
      "timestampMs": 65055,
      "confidence": null
    },
    {
      "text": " shadow",
      "startMs": 65135,
      "endMs": 65595,
      "timestampMs": 65365,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 65595,
      "endMs": 65733,
      "timestampMs": 65664,
      "confidence": null
    },
    {
      "text": " such.",
      "startMs": 65788,
      "endMs": 66223,
      "timestampMs": 66006,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 69815,
      "endMs": 69915,
      "timestampMs": 69865,
      "confidence": null
    },
    {
      "text": " allows",
      "startMs": 69915,
      "endMs": 70495,
      "timestampMs": 70205,
      "confidence": null
    },
    {
      "text": " us",
      "startMs": 70495,
      "endMs": 70760,
      "timestampMs": 70628,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 71075,
      "endMs": 71615,
      "timestampMs": 71345,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 71768,
      "endMs": 71928,
      "timestampMs": 71848,
      "confidence": null
    },
    {
      "text": " able",
      "startMs": 71928,
      "endMs": 72128,
      "timestampMs": 72028,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 72128,
      "endMs": 72268,
      "timestampMs": 72198,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 72268,
      "endMs": 72943,
      "timestampMs": 72606,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 73008,
      "endMs": 73308,
      "timestampMs": 73158,
      "confidence": null
    },
    {
      "text": " copying",
      "startMs": 73308,
      "endMs": 73788,
      "timestampMs": 73548,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 73788,
      "endMs": 73838,
      "timestampMs": 73813,
      "confidence": null
    },
    {
      "text": " pasting",
      "startMs": 73788,
      "endMs": 74603,
      "timestampMs": 74196,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 74848,
      "endMs": 74948,
      "timestampMs": 74898,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 74948,
      "endMs": 75088,
      "timestampMs": 75018,
      "confidence": null
    },
    {
      "text": " configurations",
      "startMs": 75088,
      "endMs": 75948,
      "timestampMs": 75518,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 75948,
      "endMs": 76128,
      "timestampMs": 76038,
      "confidence": null
    },
    {
      "text": " maybe",
      "startMs": 76128,
      "endMs": 76593,
      "timestampMs": 76361,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 76848,
      "endMs": 76948,
      "timestampMs": 76898,
      "confidence": null
    },
    {
      "text": " wouldn't",
      "startMs": 76948,
      "endMs": 77168,
      "timestampMs": 77058,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 77168,
      "endMs": 77268,
      "timestampMs": 77218,
      "confidence": null
    },
    {
      "text": " able",
      "startMs": 77268,
      "endMs": 77448,
      "timestampMs": 77358,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 77448,
      "endMs": 77568,
      "timestampMs": 77508,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 77568,
      "endMs": 78113,
      "timestampMs": 77841,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 78451,
      "endMs": 78591,
      "timestampMs": 78521,
      "confidence": null
    },
    {
      "text": " it's",
      "startMs": 78591,
      "endMs": 78891,
      "timestampMs": 78741,
      "confidence": null
    },
    {
      "text": " cumbersome",
      "startMs": 78891,
      "endMs": 79391,
      "timestampMs": 79141,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 79391,
      "endMs": 79511,
      "timestampMs": 79451,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 79511,
      "endMs": 79911,
      "timestampMs": 79711,
      "confidence": null
    },
    {
      "text": " straight",
      "startMs": 79991,
      "endMs": 80299,
      "timestampMs": 80145,
      "confidence": null
    },
    {
      "text": " from",
      "startMs": 80344,
      "endMs": 80504,
      "timestampMs": 80424,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 80504,
      "endMs": 80644,
      "timestampMs": 80574,
      "confidence": null
    },
    {
      "text": " panel.",
      "startMs": 80644,
      "endMs": 81104,
      "timestampMs": 80874,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 84260,
      "endMs": 84480,
      "timestampMs": 84370,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 84480,
      "endMs": 84680,
      "timestampMs": 84580,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 84680,
      "endMs": 84880,
      "timestampMs": 84780,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 84880,
      "endMs": 85020,
      "timestampMs": 84950,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 85020,
      "endMs": 85540,
      "timestampMs": 85280,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 85540,
      "endMs": 85640,
      "timestampMs": 85590,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 85640,
      "endMs": 85993,
      "timestampMs": 85816,
      "confidence": null
    },
    {
      "text": " hit",
      "startMs": 86018,
      "endMs": 86258,
      "timestampMs": 86138,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 87001,
      "endMs": 87101,
      "timestampMs": 87051,
      "confidence": null
    },
    {
      "text": " screenshot",
      "startMs": 87101,
      "endMs": 87761,
      "timestampMs": 87431,
      "confidence": null
    },
    {
      "text": " button,",
      "startMs": 87761,
      "endMs": 88131,
      "timestampMs": 87946,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 88890,
      "endMs": 89130,
      "timestampMs": 89010,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 89130,
      "endMs": 89370,
      "timestampMs": 89250,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 89370,
      "endMs": 89790,
      "timestampMs": 89580,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 89790,
      "endMs": 90090,
      "timestampMs": 89940,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 90090,
      "endMs": 90325,
      "timestampMs": 90208,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 90738,
      "endMs": 90968,
      "timestampMs": 90853,
      "confidence": null
    },
    {
      "text": " record",
      "startMs": 91096,
      "endMs": 91636,
      "timestampMs": 91366,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 91636,
      "endMs": 91796,
      "timestampMs": 91716,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 91974,
      "endMs": 92154,
      "timestampMs": 92064,
      "confidence": null
    },
    {
      "text": " video,",
      "startMs": 92154,
      "endMs": 92729,
      "timestampMs": 92442,
      "confidence": null
    },
    {
      "text": " it's",
      "startMs": 93100,
      "endMs": 93270,
      "timestampMs": 93185,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 93270,
      "endMs": 93550,
      "timestampMs": 93410,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 93550,
      "endMs": 93630,
      "timestampMs": 93590,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 93630,
      "endMs": 93730,
      "timestampMs": 93680,
      "confidence": null
    },
    {
      "text": " record",
      "startMs": 93730,
      "endMs": 94110,
      "timestampMs": 93920,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 94110,
      "endMs": 94350,
      "timestampMs": 94230,
      "confidence": null
    },
    {
      "text": " voice.",
      "startMs": 94350,
      "endMs": 94885,
      "timestampMs": 94618,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 98250,
      "endMs": 98360,
      "timestampMs": 98305,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 98360,
      "endMs": 98660,
      "timestampMs": 98510,
      "confidence": null
    },
    {
      "text": " access",
      "startMs": 98660,
      "endMs": 98980,
      "timestampMs": 98820,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 98980,
      "endMs": 99260,
      "timestampMs": 99120,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 99260,
      "endMs": 99420,
      "timestampMs": 99340,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 99420,
      "endMs": 99600,
      "timestampMs": 99510,
      "confidence": null
    },
    {
      "text": " apps",
      "startMs": 99740,
      "endMs": 100190,
      "timestampMs": 99965,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 100520,
      "endMs": 100680,
      "timestampMs": 100600,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 100680,
      "endMs": 100940,
      "timestampMs": 100810,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 100940,
      "endMs": 101080,
      "timestampMs": 101010,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 101080,
      "endMs": 101300,
      "timestampMs": 101190,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 101300,
      "endMs": 101995,
      "timestampMs": 101648,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 102358,
      "endMs": 102498,
      "timestampMs": 102428,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 102498,
      "endMs": 102738,
      "timestampMs": 102618,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 102738,
      "endMs": 102938,
      "timestampMs": 102838,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 102938,
      "endMs": 103098,
      "timestampMs": 103018,
      "confidence": null
    },
    {
      "text": " really",
      "startMs": 103098,
      "endMs": 103508,
      "timestampMs": 103303,
      "confidence": null
    },
    {
      "text": " great",
      "startMs": 103729,
      "endMs": 104029,
      "timestampMs": 103879,
      "confidence": null
    },
    {
      "text": " feature",
      "startMs": 104029,
      "endMs": 104469,
      "timestampMs": 104249,
      "confidence": null
    },
    {
      "text": " because",
      "startMs": 104469,
      "endMs": 104749,
      "timestampMs": 104609,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 104749,
      "endMs": 104889,
      "timestampMs": 104819,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 104889,
      "endMs": 105069,
      "timestampMs": 104979,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 105069,
      "endMs": 105529,
      "timestampMs": 105299,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 105529,
      "endMs": 105809,
      "timestampMs": 105669,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 106027,
      "endMs": 106187,
      "timestampMs": 106107,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 106187,
      "endMs": 106347,
      "timestampMs": 106267,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 106347,
      "endMs": 106587,
      "timestampMs": 106467,
      "confidence": null
    },
    {
      "text": " delete,",
      "startMs": 106587,
      "endMs": 107107,
      "timestampMs": 106847,
      "confidence": null
    },
    {
      "text": " remove",
      "startMs": 107510,
      "endMs": 107930,
      "timestampMs": 107720,
      "confidence": null
    },
    {
      "text": " stuff",
      "startMs": 107930,
      "endMs": 108340,
      "timestampMs": 108135,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 108630,
      "endMs": 108810,
      "timestampMs": 108720,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 108810,
      "endMs": 109300,
      "timestampMs": 109055,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 112250,
      "endMs": 112370,
      "timestampMs": 112310,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 112370,
      "endMs": 112530,
      "timestampMs": 112450,
      "confidence": null
    },
    {
      "text": " wanted",
      "startMs": 112530,
      "endMs": 112710,
      "timestampMs": 112620,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 112710,
      "endMs": 112810,
      "timestampMs": 112760,
      "confidence": null
    },
    {
      "text": " look",
      "startMs": 112810,
      "endMs": 113030,
      "timestampMs": 112920,
      "confidence": null
    },
    {
      "text": " at",
      "startMs": 113030,
      "endMs": 113110,
      "timestampMs": 113070,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 113110,
      "endMs": 113530,
      "timestampMs": 113320,
      "confidence": null
    },
    {
      "text": " images,",
      "startMs": 113530,
      "endMs": 114255,
      "timestampMs": 113893,
      "confidence": null
    },
    {
      "text": " you'd",
      "startMs": 114270,
      "endMs": 114450,
      "timestampMs": 114360,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 114450,
      "endMs": 114530,
      "timestampMs": 114490,
      "confidence": null
    },
    {
      "text": " able",
      "startMs": 114530,
      "endMs": 114650,
      "timestampMs": 114590,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 114650,
      "endMs": 114790,
      "timestampMs": 114720,
      "confidence": null
    },
    {
      "text": " copy",
      "startMs": 114790,
      "endMs": 115170,
      "timestampMs": 114980,
      "confidence": null
    },
    {
      "text": " stuff",
      "startMs": 115170,
      "endMs": 115570,
      "timestampMs": 115370,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 115570,
      "endMs": 115990,
      "timestampMs": 115780,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 115990,
      "endMs": 116290,
      "timestampMs": 116140,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 116290,
      "endMs": 116720,
      "timestampMs": 116505,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 119345,
      "endMs": 119445,
      "timestampMs": 119395,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 119445,
      "endMs": 119705,
      "timestampMs": 119575,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 119705,
      "endMs": 120130,
      "timestampMs": 119917,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 120245,
      "endMs": 120345,
      "timestampMs": 120295,
      "confidence": null
    },
    {
      "text": " shell,",
      "startMs": 120345,
      "endMs": 120950,
      "timestampMs": 120647,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 121411,
      "endMs": 121531,
      "timestampMs": 121471,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 121531,
      "endMs": 121671,
      "timestampMs": 121601,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 121671,
      "endMs": 121811,
      "timestampMs": 121741,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 121811,
      "endMs": 121971,
      "timestampMs": 121891,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 121971,
      "endMs": 122211,
      "timestampMs": 122091,
      "confidence": null
    },
    {
      "text": " look",
      "startMs": 122211,
      "endMs": 122451,
      "timestampMs": 122331,
      "confidence": null
    },
    {
      "text": " at",
      "startMs": 122451,
      "endMs": 122611,
      "timestampMs": 122531,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 122744,
      "endMs": 122884,
      "timestampMs": 122814,
      "confidence": null
    },
    {
      "text": " logs",
      "startMs": 122884,
      "endMs": 123404,
      "timestampMs": 123144,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 123404,
      "endMs": 123564,
      "timestampMs": 123484,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 123564,
      "endMs": 123664,
      "timestampMs": 123614,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 123664,
      "endMs": 124024,
      "timestampMs": 123844,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 124024,
      "endMs": 124124,
      "timestampMs": 124074,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 124124,
      "endMs": 124324,
      "timestampMs": 124224,
      "confidence": null
    },
    {
      "text": " want.",
      "startMs": 124324,
      "endMs": 124644,
      "timestampMs": 124484,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 127250,
      "endMs": 127440,
      "timestampMs": 127345,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 127440,
      "endMs": 127560,
      "timestampMs": 127500,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 127560,
      "endMs": 127700,
      "timestampMs": 127630,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 127700,
      "endMs": 127840,
      "timestampMs": 127770,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 127840,
      "endMs": 127940,
      "timestampMs": 127890,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 127940,
      "endMs": 128140,
      "timestampMs": 128040,
      "confidence": null
    },
    {
      "text": " setup",
      "startMs": 128140,
      "endMs": 128560,
      "timestampMs": 128350,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 128653,
      "endMs": 128733,
      "timestampMs": 128693,
      "confidence": null
    },
    {
      "text": " you're",
      "startMs": 128733,
      "endMs": 128933,
      "timestampMs": 128833,
      "confidence": null
    },
    {
      "text": " ever",
      "startMs": 128933,
      "endMs": 129053,
      "timestampMs": 128993,
      "confidence": null
    },
    {
      "text": " having",
      "startMs": 129053,
      "endMs": 129358,
      "timestampMs": 129206,
      "confidence": null
    },
    {
      "text": " problems.",
      "startMs": 129358,
      "endMs": 129763,
      "timestampMs": 129560,
      "confidence": null
    },
    {
      "text": " Thank",
      "startMs": 131750,
      "endMs": 131965,
      "timestampMs": 131858,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 131965,
      "endMs": 132185,
      "timestampMs": 132075,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 132185,
      "endMs": 132685,
      "timestampMs": 132435,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 132685,
      "endMs": 132905,
      "timestampMs": 132795,
      "confidence": null
    },
    {
      "text": " time",
      "startMs": 132905,
      "endMs": 133375,
      "timestampMs": 133140,
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
        "ms": 1025
      },
      {
        "text": "CTRLbot.",
        "ms": 1185
      },
      {
        "text": "This",
        "ms": 3165
      },
      {
        "text": "will",
        "ms": 3205
      },
      {
        "text": "be",
        "ms": 3385
      },
      {
        "text": "a",
        "ms": 3485
      },
      {
        "text": "walkthrough",
        "ms": 3565
      },
      {
        "text": "of",
        "ms": 4525
      },
      {
        "text": "one",
        "ms": 4928
      },
      {
        "text": "of",
        "ms": 5048
      },
      {
        "text": "our",
        "ms": 5148
      },
      {
        "text": "utilities",
        "ms": 5768
      },
      {
        "text": "called",
        "ms": 6468
      },
      {
        "text": "CTRLbot",
        "ms": 7168
      },
      {
        "text": "Mirror,",
        "ms": 7948
      }
    ],
    "mirror-what": [
      {
        "text": "a",
        "ms": 9020
      },
      {
        "text": "way",
        "ms": 9140
      },
      {
        "text": "to",
        "ms": 9940
      },
      {
        "text": "mirror",
        "ms": 10140
      },
      {
        "text": "what",
        "ms": 10720
      },
      {
        "text": "is",
        "ms": 10920
      },
      {
        "text": "on",
        "ms": 11260
      },
      {
        "text": "your",
        "ms": 11440
      },
      {
        "text": "Android",
        "ms": 11923
      },
      {
        "text": "phone",
        "ms": 12623
      },
      {
        "text": "or",
        "ms": 13063
      },
      {
        "text": "tablet.",
        "ms": 13203
      }
    ],
    "install-adb": [
      {
        "text": "but",
        "ms": 17080
      },
      {
        "text": "what",
        "ms": 17480
      },
      {
        "text": "we",
        "ms": 17900
      },
      {
        "text": "also",
        "ms": 18040
      },
      {
        "text": "have",
        "ms": 18240
      },
      {
        "text": "to",
        "ms": 18380
      },
      {
        "text": "do",
        "ms": 18500
      },
      {
        "text": "is",
        "ms": 18760
      },
      {
        "text": "we",
        "ms": 18840
      },
      {
        "text": "have",
        "ms": 18980
      },
      {
        "text": "to",
        "ms": 19120
      },
      {
        "text": "install",
        "ms": 19420
      },
      {
        "text": "ADB.",
        "ms": 19980
      },
      {
        "text": "And",
        "ms": 20660
      },
      {
        "text": "these",
        "ms": 20760
      },
      {
        "text": "are",
        "ms": 21000
      },
      {
        "text": "tools",
        "ms": 21160
      },
      {
        "text": "for",
        "ms": 22510
      },
      {
        "text": "Android",
        "ms": 22830
      },
      {
        "text": "that",
        "ms": 23948
      },
      {
        "text": "help",
        "ms": 24188
      },
      {
        "text": "you",
        "ms": 24468
      },
      {
        "text": "not",
        "ms": 24968
      },
      {
        "text": "only",
        "ms": 25168
      },
      {
        "text": "to",
        "ms": 25508
      },
      {
        "text": "connect",
        "ms": 25908
      },
      {
        "text": "to",
        "ms": 26308
      },
      {
        "text": "your",
        "ms": 26488
      },
      {
        "text": "device,",
        "ms": 26688
      },
      {
        "text": "but",
        "ms": 27548
      },
      {
        "text": "also",
        "ms": 27668
      },
      {
        "text": "manage",
        "ms": 28028
      },
      {
        "text": "applications",
        "ms": 28728
      },
      {
        "text": "on",
        "ms": 29648
      },
      {
        "text": "it",
        "ms": 29848
      }
    ],
    "usb-debugging": [
      {
        "text": "And",
        "ms": 32275
      },
      {
        "text": "this",
        "ms": 32395
      },
      {
        "text": "is",
        "ms": 32555
      },
      {
        "text": "where",
        "ms": 32635
      },
      {
        "text": "you",
        "ms": 32795
      },
      {
        "text": "can",
        "ms": 32875
      },
      {
        "text": "set",
        "ms": 33115
      },
      {
        "text": "up",
        "ms": 33395
      },
      {
        "text": "and",
        "ms": 33673
      },
      {
        "text": "make",
        "ms": 33953
      },
      {
        "text": "sure",
        "ms": 34213
      },
      {
        "text": "that",
        "ms": 34593
      },
      {
        "text": "USB",
        "ms": 35856
      },
      {
        "text": "debugging",
        "ms": 36196
      },
      {
        "text": "mode",
        "ms": 36736
      },
      {
        "text": "is",
        "ms": 36996
      },
      {
        "text": "on",
        "ms": 37236
      }
    ],
    "authorize": [
      {
        "text": "In",
        "ms": 40250
      },
      {
        "text": "the",
        "ms": 40360
      },
      {
        "text": "initial",
        "ms": 40660
      },
      {
        "text": "time,",
        "ms": 41060
      },
      {
        "text": "you'll",
        "ms": 41800
      },
      {
        "text": "be",
        "ms": 42040
      },
      {
        "text": "asked",
        "ms": 42260
      },
      {
        "text": "to",
        "ms": 42500
      },
      {
        "text": "authorize",
        "ms": 42780
      },
      {
        "text": "that",
        "ms": 43903
      },
      {
        "text": "connection",
        "ms": 44123
      },
      {
        "text": "on",
        "ms": 44843
      },
      {
        "text": "your",
        "ms": 44963
      },
      {
        "text": "device.",
        "ms": 45143
      }
    ],
    "ready": [
      {
        "text": "And",
        "ms": 46190
      },
      {
        "text": "once",
        "ms": 46410
      },
      {
        "text": "that's",
        "ms": 46570
      },
      {
        "text": "authorized,",
        "ms": 46890
      },
      {
        "text": "you'll",
        "ms": 47310
      },
      {
        "text": "see",
        "ms": 47530
      },
      {
        "text": "that",
        "ms": 47890
      },
      {
        "text": "it's",
        "ms": 48090
      },
      {
        "text": "now",
        "ms": 48230
      },
      {
        "text": "green",
        "ms": 48590
      },
      {
        "text": "and",
        "ms": 48930
      },
      {
        "text": "ready,",
        "ms": 49070
      },
      {
        "text": "and",
        "ms": 50268
      },
      {
        "text": "we",
        "ms": 50408
      },
      {
        "text": "can",
        "ms": 50528
      },
      {
        "text": "just",
        "ms": 50688
      },
      {
        "text": "click",
        "ms": 50888
      },
      {
        "text": "on",
        "ms": 51248
      },
      {
        "text": "it",
        "ms": 51428
      },
      {
        "text": "and",
        "ms": 51871
      },
      {
        "text": "start",
        "ms": 52031
      },
      {
        "text": "mirroring,",
        "ms": 52331
      }
    ],
    "pick-frame": [
      {
        "text": "let's",
        "ms": 54785
      },
      {
        "text": "pick",
        "ms": 55113
      },
      {
        "text": "one",
        "ms": 55333
      },
      {
        "text": "of",
        "ms": 55453
      },
      {
        "text": "these",
        "ms": 55533
      },
      {
        "text": "other",
        "ms": 55733
      },
      {
        "text": "ones",
        "ms": 56093
      },
      {
        "text": "here",
        "ms": 56393
      },
      {
        "text": "so",
        "ms": 57201
      },
      {
        "text": "that",
        "ms": 57381
      },
      {
        "text": "we",
        "ms": 57721
      },
      {
        "text": "have",
        "ms": 58221
      },
      {
        "text": "something",
        "ms": 58484
      },
      {
        "text": "a",
        "ms": 59144
      },
      {
        "text": "little",
        "ms": 59264
      },
      {
        "text": "bit",
        "ms": 59870
      },
      {
        "text": "a",
        "ms": 60230
      },
      {
        "text": "better",
        "ms": 60350
      },
      {
        "text": "fit",
        "ms": 60850
      },
      {
        "text": "for",
        "ms": 60950
      },
      {
        "text": "it.",
        "ms": 61190
      }
    ],
    "padding": [
      {
        "text": "And",
        "ms": 61775
      },
      {
        "text": "you",
        "ms": 61875
      },
      {
        "text": "can",
        "ms": 61975
      },
      {
        "text": "change",
        "ms": 62135
      },
      {
        "text": "other",
        "ms": 62455
      },
      {
        "text": "options",
        "ms": 62755
      },
      {
        "text": "here",
        "ms": 63155
      },
      {
        "text": "like",
        "ms": 63515
      },
      {
        "text": "padding",
        "ms": 63815
      },
      {
        "text": "and",
        "ms": 64975
      },
      {
        "text": "shadow",
        "ms": 65135
      },
      {
        "text": "and",
        "ms": 65595
      },
      {
        "text": "such.",
        "ms": 65788
      }
    ],
    "copy-paste": [
      {
        "text": "it",
        "ms": 69815
      },
      {
        "text": "allows",
        "ms": 69915
      },
      {
        "text": "us",
        "ms": 70495
      },
      {
        "text": "to",
        "ms": 71075
      },
      {
        "text": "be",
        "ms": 71768
      },
      {
        "text": "able",
        "ms": 71928
      },
      {
        "text": "to",
        "ms": 72128
      },
      {
        "text": "do",
        "ms": 72268
      },
      {
        "text": "some",
        "ms": 73008
      },
      {
        "text": "copying",
        "ms": 73308
      },
      {
        "text": "and",
        "ms": 73788
      },
      {
        "text": "pasting",
        "ms": 73788
      },
      {
        "text": "or",
        "ms": 74848
      },
      {
        "text": "some",
        "ms": 74948
      },
      {
        "text": "configurations",
        "ms": 75088
      },
      {
        "text": "that",
        "ms": 75948
      },
      {
        "text": "maybe",
        "ms": 76128
      },
      {
        "text": "you",
        "ms": 76848
      },
      {
        "text": "wouldn't",
        "ms": 76948
      },
      {
        "text": "be",
        "ms": 77168
      },
      {
        "text": "able",
        "ms": 77268
      },
      {
        "text": "to",
        "ms": 77448
      },
      {
        "text": "do",
        "ms": 77568
      },
      {
        "text": "or",
        "ms": 78451
      },
      {
        "text": "it's",
        "ms": 78591
      },
      {
        "text": "cumbersome",
        "ms": 78891
      },
      {
        "text": "to",
        "ms": 79391
      },
      {
        "text": "do",
        "ms": 79511
      },
      {
        "text": "straight",
        "ms": 79991
      },
      {
        "text": "from",
        "ms": 80344
      },
      {
        "text": "the",
        "ms": 80504
      },
      {
        "text": "panel.",
        "ms": 80644
      }
    ],
    "screenshot": [
      {
        "text": "You",
        "ms": 84260
      },
      {
        "text": "can",
        "ms": 84480
      },
      {
        "text": "come",
        "ms": 84680
      },
      {
        "text": "in",
        "ms": 84880
      },
      {
        "text": "here",
        "ms": 85020
      },
      {
        "text": "and",
        "ms": 85540
      },
      {
        "text": "just",
        "ms": 85640
      },
      {
        "text": "hit",
        "ms": 86018
      },
      {
        "text": "the",
        "ms": 87001
      },
      {
        "text": "screenshot",
        "ms": 87101
      },
      {
        "text": "button,",
        "ms": 87761
      }
    ],
    "record-video": [
      {
        "text": "You",
        "ms": 88890
      },
      {
        "text": "can",
        "ms": 89130
      },
      {
        "text": "also",
        "ms": 89370
      },
      {
        "text": "come",
        "ms": 89790
      },
      {
        "text": "in",
        "ms": 90090
      },
      {
        "text": "and",
        "ms": 90738
      },
      {
        "text": "record",
        "ms": 91096
      },
      {
        "text": "it",
        "ms": 91636
      },
      {
        "text": "as",
        "ms": 91974
      },
      {
        "text": "video,",
        "ms": 92154
      }
    ],
    "record-voice": [
      {
        "text": "it's",
        "ms": 93100
      },
      {
        "text": "also",
        "ms": 93270
      },
      {
        "text": "going",
        "ms": 93550
      },
      {
        "text": "to",
        "ms": 93630
      },
      {
        "text": "record",
        "ms": 93730
      },
      {
        "text": "your",
        "ms": 94110
      },
      {
        "text": "voice.",
        "ms": 94350
      }
    ],
    "apps": [
      {
        "text": "you",
        "ms": 98250
      },
      {
        "text": "have",
        "ms": 98360
      },
      {
        "text": "access",
        "ms": 98660
      },
      {
        "text": "to",
        "ms": 98980
      },
      {
        "text": "all",
        "ms": 99260
      },
      {
        "text": "the",
        "ms": 99420
      },
      {
        "text": "apps",
        "ms": 99740
      },
      {
        "text": "that",
        "ms": 100520
      },
      {
        "text": "are",
        "ms": 100680
      },
      {
        "text": "on",
        "ms": 100940
      },
      {
        "text": "this",
        "ms": 101080
      },
      {
        "text": "device",
        "ms": 101300
      },
      {
        "text": "and",
        "ms": 102358
      },
      {
        "text": "this",
        "ms": 102498
      },
      {
        "text": "is",
        "ms": 102738
      },
      {
        "text": "a",
        "ms": 102938
      },
      {
        "text": "really",
        "ms": 103098
      },
      {
        "text": "great",
        "ms": 103729
      },
      {
        "text": "feature",
        "ms": 104029
      },
      {
        "text": "because",
        "ms": 104469
      },
      {
        "text": "you",
        "ms": 104749
      },
      {
        "text": "can",
        "ms": 104889
      },
      {
        "text": "come",
        "ms": 105069
      },
      {
        "text": "in",
        "ms": 105529
      },
      {
        "text": "and",
        "ms": 106027
      },
      {
        "text": "you",
        "ms": 106187
      },
      {
        "text": "can",
        "ms": 106347
      },
      {
        "text": "delete,",
        "ms": 106587
      },
      {
        "text": "remove",
        "ms": 107510
      },
      {
        "text": "stuff",
        "ms": 107930
      },
      {
        "text": "in",
        "ms": 108630
      },
      {
        "text": "here",
        "ms": 108810
      }
    ],
    "files-copy": [
      {
        "text": "If",
        "ms": 112250
      },
      {
        "text": "you",
        "ms": 112370
      },
      {
        "text": "wanted",
        "ms": 112530
      },
      {
        "text": "to",
        "ms": 112710
      },
      {
        "text": "look",
        "ms": 112810
      },
      {
        "text": "at",
        "ms": 113030
      },
      {
        "text": "your",
        "ms": 113110
      },
      {
        "text": "images,",
        "ms": 113530
      },
      {
        "text": "you'd",
        "ms": 114270
      },
      {
        "text": "be",
        "ms": 114450
      },
      {
        "text": "able",
        "ms": 114530
      },
      {
        "text": "to",
        "ms": 114650
      },
      {
        "text": "copy",
        "ms": 114790
      },
      {
        "text": "stuff",
        "ms": 115170
      },
      {
        "text": "over",
        "ms": 115570
      },
      {
        "text": "right",
        "ms": 115990
      },
      {
        "text": "here.",
        "ms": 116290
      }
    ],
    "shell-logs": [
      {
        "text": "we",
        "ms": 119345
      },
      {
        "text": "have",
        "ms": 119445
      },
      {
        "text": "also",
        "ms": 119705
      },
      {
        "text": "a",
        "ms": 120245
      },
      {
        "text": "shell,",
        "ms": 120345
      },
      {
        "text": "and",
        "ms": 121411
      },
      {
        "text": "then",
        "ms": 121531
      },
      {
        "text": "you",
        "ms": 121671
      },
      {
        "text": "can",
        "ms": 121811
      },
      {
        "text": "also",
        "ms": 121971
      },
      {
        "text": "look",
        "ms": 122211
      },
      {
        "text": "at",
        "ms": 122451
      },
      {
        "text": "the",
        "ms": 122744
      },
      {
        "text": "logs",
        "ms": 122884
      },
      {
        "text": "for",
        "ms": 123404
      },
      {
        "text": "the",
        "ms": 123564
      },
      {
        "text": "device",
        "ms": 123664
      },
      {
        "text": "if",
        "ms": 124024
      },
      {
        "text": "you",
        "ms": 124124
      },
      {
        "text": "want.",
        "ms": 124324
      }
    ],
    "setup-again": [
      {
        "text": "you",
        "ms": 127250
      },
      {
        "text": "can",
        "ms": 127440
      },
      {
        "text": "come",
        "ms": 127560
      },
      {
        "text": "back",
        "ms": 127700
      },
      {
        "text": "to",
        "ms": 127840
      },
      {
        "text": "this",
        "ms": 127940
      },
      {
        "text": "setup",
        "ms": 128140
      },
      {
        "text": "if",
        "ms": 128653
      },
      {
        "text": "you're",
        "ms": 128733
      },
      {
        "text": "ever",
        "ms": 128933
      },
      {
        "text": "having",
        "ms": 129053
      },
      {
        "text": "problems.",
        "ms": 129358
      }
    ],
    "thank-you": [
      {
        "text": "Thank",
        "ms": 131750
      },
      {
        "text": "you",
        "ms": 131965
      },
      {
        "text": "for",
        "ms": 132185
      },
      {
        "text": "your",
        "ms": 132685
      },
      {
        "text": "time",
        "ms": 132905
      }
    ]
  }
};

export const MIRROR_WALKTHROUGH_EDIT = NARRATION_EDIT;

