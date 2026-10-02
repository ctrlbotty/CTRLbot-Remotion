// Written by `npm run narration:edit`. Do not edit; change src/marketing/iot-phone-walkthrough/iotPhoneWalkthroughNarration.ts and rebuild.

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
  "src": "narration/iot-phone-walkthrough/edit.m4a",
  "seconds": 336,
  "clips": [
    {
      "id": "welcome",
      "at": 0.25,
      "start": 1.615,
      "end": 10.05,
      "seconds": 7.866,
      "removed": [
        {
          "from": 6.455,
          "to": 6.685,
          "kind": "extra",
          "heard": "ee"
        }
      ]
    },
    {
      "id": "first-run-intro",
      "at": 11.25,
      "start": 12.82,
      "end": 20.485,
      "seconds": 7.506,
      "removed": [
        {
          "from": 16.25,
          "to": 16.35,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "first-run-tour",
      "at": 18.96,
      "start": 21.64,
      "end": 28.015,
      "seconds": 5.811,
      "removed": [
        {
          "from": 23.19,
          "to": 23.355,
          "kind": "extra",
          "heard": "at"
        }
      ]
    },
    {
      "id": "ai-intro",
      "at": 27.75,
      "start": 31.08,
      "end": 34.31,
      "seconds": 3.093,
      "removed": []
    },
    {
      "id": "ai-troubleshooter",
      "at": 31.05,
      "start": 34.31,
      "end": 39.235,
      "seconds": 4.128,
      "removed": [
        {
          "from": 36.33,
          "to": 36.825,
          "kind": "extra",
          "heard": "ah"
        },
        {
          "from": 36.875,
          "to": 37.115,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "ai-help",
      "at": 35.38,
      "start": 39.3,
      "end": 46.655,
      "seconds": 6.659,
      "removed": [
        {
          "from": 42.77,
          "to": 43.07,
          "kind": "repeat",
          "heard": "and"
        },
        {
          "from": 45.13,
          "to": 45.235,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "db-intro",
      "at": 46.25,
      "start": 48.62,
      "end": 52.665,
      "seconds": 3.728,
      "removed": [
        {
          "from": 50.995,
          "to": 51.3,
          "kind": "extra",
          "heard": "drya"
        }
      ]
    },
    {
      "id": "db-extensive",
      "at": 50.18,
      "start": 53.395,
      "end": 55.49,
      "seconds": 2.095,
      "removed": []
    },
    {
      "id": "db-commands",
      "at": 52.48,
      "start": 57.595,
      "end": 61.72,
      "seconds": 4.125,
      "removed": []
    },
    {
      "id": "db-endpoints",
      "at": 56.81,
      "start": 62.02,
      "end": 67.135,
      "seconds": 4.798,
      "removed": []
    },
    {
      "id": "db-sit-network",
      "at": 61.81,
      "start": 68.97,
      "end": 76.67,
      "seconds": 7.011,
      "removed": [
        {
          "from": 72.86,
          "to": 73.2,
          "kind": "extra",
          "heard": "e"
        },
        {
          "from": 73.595,
          "to": 73.92,
          "kind": "extra",
          "heard": "oneof"
        }
      ]
    },
    {
      "id": "epson-select",
      "at": 71.25,
      "start": 78.42,
      "end": 81.12,
      "seconds": 2.7,
      "removed": []
    },
    {
      "id": "epson-specs",
      "at": 74.16,
      "start": 83.35,
      "end": 88.65,
      "seconds": 5.173,
      "removed": [
        {
          "from": 87.02,
          "to": 87.135,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "epson-product-page",
      "at": 79.54,
      "start": 89.09,
      "end": 94,
      "seconds": 4.91,
      "removed": []
    },
    {
      "id": "add-ip",
      "at": 86.25,
      "start": 101.76,
      "end": 107.32,
      "seconds": 4.414,
      "removed": [
        {
          "from": 102.205,
          "to": 102.445,
          "kind": "extra",
          "heard": "at"
        },
        {
          "from": 102.905,
          "to": 103.155,
          "kind": "extra",
          "heard": "plu"
        },
        {
          "from": 103.245,
          "to": 103.395,
          "kind": "extra",
          "heard": "plot"
        }
      ]
    },
    {
      "id": "add-saved",
      "at": 90.87,
      "start": 113.225,
      "end": 116.16,
      "seconds": 2.935,
      "removed": []
    },
    {
      "id": "term-testing",
      "at": 95.75,
      "start": 117.015,
      "end": 124.105,
      "seconds": 7.09,
      "removed": []
    },
    {
      "id": "term-message",
      "at": 103.04,
      "start": 124.15,
      "end": 130.64,
      "seconds": 6.218,
      "removed": [
        {
          "from": 125.52,
          "to": 125.78,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "test-saves",
      "at": 111.255,
      "start": 135.385,
      "end": 138.67,
      "seconds": 2.788,
      "removed": [
        {
          "from": 137.275,
          "to": 137.76,
          "kind": "repeat",
          "heard": "save"
        }
      ]
    },
    {
      "id": "test-remote",
      "at": 114.25,
      "start": 138.65,
      "end": 143.61,
      "seconds": 4.261,
      "removed": [
        {
          "from": 141.62,
          "to": 141.835,
          "kind": "repeat",
          "heard": "do"
        }
      ]
    },
    {
      "id": "test-webpage",
      "at": 118.72,
      "start": 144.47,
      "end": 154.62,
      "seconds": 9.172,
      "removed": [
        {
          "from": 146.845,
          "to": 147.2,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "act-intro",
      "at": 131.25,
      "start": 161.175,
      "end": 162.985,
      "seconds": 1.81,
      "removed": []
    },
    {
      "id": "act-setup",
      "at": 133.26,
      "start": 163.84,
      "end": 172.545,
      "seconds": 6.851,
      "removed": [
        {
          "from": 167.615,
          "to": 167.955,
          "kind": "filler",
          "heard": "uh"
        },
        {
          "from": 168.055,
          "to": 168.23,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 168.305,
          "to": 168.48,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 170.6,
          "to": 171.04,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 171.125,
          "to": 171.395,
          "kind": "extra",
          "heard": "un"
        }
      ]
    },
    {
      "id": "act-power-on",
      "at": 140.32,
      "start": 173.705,
      "end": 182.68,
      "seconds": 8.311,
      "removed": [
        {
          "from": 181.29,
          "to": 181.62,
          "kind": "filler",
          "heard": "um"
        },
        {
          "from": 181.845,
          "to": 182.155,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "switch-audio-setup",
      "at": 152.25,
      "start": 184.07,
      "end": 192.49,
      "seconds": 7.571,
      "removed": [
        {
          "from": 188.365,
          "to": 188.935,
          "kind": "extra",
          "heard": "thatthat"
        }
      ]
    },
    {
      "id": "switch-audio-eui",
      "at": 160.03,
      "start": 193.89,
      "end": 199.995,
      "seconds": 5.749,
      "removed": [
        {
          "from": 197.14,
          "to": 197.255,
          "kind": "extra",
          "heard": "if"
        }
      ]
    },
    {
      "id": "eui-control",
      "at": 169.75,
      "start": 201.95,
      "end": 204.735,
      "seconds": 2.393,
      "removed": []
    },
    {
      "id": "eui-screen",
      "at": 172.35,
      "start": 204.97,
      "end": 218.99,
      "seconds": 12.415,
      "removed": [
        {
          "from": 207.45,
          "to": 207.925,
          "kind": "extra",
          "heard": "use"
        },
        {
          "from": 217.94,
          "to": 218.16,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "eui-power",
      "at": 185.59,
      "start": 220.18,
      "end": 226.345,
      "seconds": 5.536,
      "removed": []
    },
    {
      "id": "exit-hold",
      "at": 195.25,
      "start": 230.395,
      "end": 239.105,
      "seconds": 7.309,
      "removed": [
        {
          "from": 238.215,
          "to": 238.34,
          "kind": "extra",
          "heard": "o"
        }
      ]
    },
    {
      "id": "discovery-intro",
      "at": 205.25,
      "start": 242.16,
      "end": 248.01,
      "seconds": 5.209,
      "removed": [
        {
          "from": 244.605,
          "to": 244.97,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 246.76,
          "to": 246.93,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "discovery-scan",
      "at": 210.66,
      "start": 249.43,
      "end": 261.205,
      "seconds": 9.885,
      "removed": [
        {
          "from": 255.555,
          "to": 256.065,
          "kind": "repeat",
          "heard": "a"
        },
        {
          "from": 257.88,
          "to": 258.19,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 259.445,
          "to": 259.645,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "matrox-add-intro",
      "at": 224.75,
      "start": 262.87,
      "end": 271.03,
      "seconds": 7.161,
      "removed": [
        {
          "from": 265.66,
          "to": 265.835,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 268.83,
          "to": 269.145,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 269.315,
          "to": 269.54,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "matrox-add-saving",
      "at": 232.12,
      "start": 285.86,
      "end": 304.205,
      "seconds": 17.163,
      "removed": [
        {
          "from": 294.085,
          "to": 294.22,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 296.54,
          "to": 296.8,
          "kind": "extra",
          "heard": "as"
        },
        {
          "from": 297.77,
          "to": 298.22,
          "kind": "repeat",
          "heard": "or"
        },
        {
          "from": 303.81,
          "to": 303.91,
          "kind": "noise",
          "heard": ""
        }
      ]
    },
    {
      "id": "matrox-test-menu",
      "at": 253.25,
      "start": 310.65,
      "end": 314.21,
      "seconds": 3.328,
      "removed": [
        {
          "from": 311.875,
          "to": 312.095,
          "kind": "repeat",
          "heard": "we"
        }
      ]
    },
    {
      "id": "matrox-test-switcher",
      "at": 256.78,
      "start": 317.29,
      "end": 326.75,
      "seconds": 8.908,
      "removed": [
        {
          "from": 322.315,
          "to": 322.33,
          "kind": "filler",
          "heard": "uh,"
        },
        {
          "from": 322.355,
          "to": 322.685,
          "kind": "filler",
          "heard": "uh,"
        }
      ]
    },
    {
      "id": "matrox-test-single",
      "at": 265.89,
      "start": 327.68,
      "end": 331.925,
      "seconds": 3.978,
      "removed": [
        {
          "from": 328.715,
          "to": 328.97,
          "kind": "repeat",
          "heard": "to"
        }
      ]
    },
    {
      "id": "matrox-switch-menu",
      "at": 271.75,
      "start": 333.56,
      "end": 341.815,
      "seconds": 6.702,
      "removed": [
        {
          "from": 338.215,
          "to": 338.58,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "matrox-switch-setup",
      "at": 278.66,
      "start": 343.26,
      "end": 346.995,
      "seconds": 3.643,
      "removed": []
    },
    {
      "id": "matrox-switch-labels",
      "at": 282.51,
      "start": 346.975,
      "end": 350.485,
      "seconds": 3.51,
      "removed": []
    },
    {
      "id": "m2m-intro",
      "at": 288.75,
      "start": 352.04,
      "end": 353.64,
      "seconds": 1.6,
      "removed": []
    },
    {
      "id": "m2m-displays",
      "at": 290.55,
      "start": 354.475,
      "end": 361.475,
      "seconds": 5.889,
      "removed": [
        {
          "from": 358.105,
          "to": 358.435,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 360.345,
          "to": 360.905,
          "kind": "repeat",
          "heard": "tomany"
        }
      ]
    },
    {
      "id": "m2m-drag",
      "at": 296.64,
      "start": 362.525,
      "end": 368.22,
      "seconds": 4.809,
      "removed": [
        {
          "from": 362.855,
          "to": 363.225,
          "kind": "repeat",
          "heard": "ican"
        }
      ]
    },
    {
      "id": "m2m-drop",
      "at": 301.65,
      "start": 372.91,
      "end": 376.6,
      "seconds": 3.086,
      "removed": []
    },
    {
      "id": "m2m-all",
      "at": 304.94,
      "start": 378.075,
      "end": 384.59,
      "seconds": 6.378,
      "removed": []
    },
    {
      "id": "settings-setup",
      "at": 315.25,
      "start": 390.93,
      "end": 395.215,
      "seconds": 4.285,
      "removed": []
    },
    {
      "id": "settings-support",
      "at": 319.65,
      "start": 396.36,
      "end": 406.255,
      "seconds": 9.723,
      "removed": []
    },
    {
      "id": "close-thanks",
      "at": 330.75,
      "start": 409.33,
      "end": 410.475,
      "seconds": 1.145,
      "removed": []
    },
    {
      "id": "close-hope",
      "at": 332.1,
      "start": 411.46,
      "end": 412.895,
      "seconds": 1.435,
      "removed": []
    }
  ],
  "words": [
    {
      "text": " Welcome",
      "startMs": 265,
      "endMs": 725,
      "timestampMs": 495,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 725,
      "endMs": 845,
      "timestampMs": 785,
      "confidence": null
    },
    {
      "text": " CTRLbot.",
      "startMs": 845,
      "endMs": 1405,
      "timestampMs": 1125,
      "confidence": null
    },
    {
      "text": " This",
      "startMs": 2158,
      "endMs": 2298,
      "timestampMs": 2228,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 2298,
      "endMs": 2418,
      "timestampMs": 2358,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 2418,
      "endMs": 2468,
      "timestampMs": 2443,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 2458,
      "endMs": 2638,
      "timestampMs": 2548,
      "confidence": null
    },
    {
      "text": " walkthrough",
      "startMs": 2638,
      "endMs": 3478,
      "timestampMs": 3058,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 3478,
      "endMs": 3698,
      "timestampMs": 3588,
      "confidence": null
    },
    {
      "text": " CTRLbot",
      "startMs": 3698,
      "endMs": 4358,
      "timestampMs": 4028,
      "confidence": null
    },
    {
      "text": " IoT,",
      "startMs": 4358,
      "endMs": 4751,
      "timestampMs": 4555,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 4756,
      "endMs": 5036,
      "timestampMs": 4896,
      "confidence": null
    },
    {
      "text": " Android",
      "startMs": 5036,
      "endMs": 5591,
      "timestampMs": 5314,
      "confidence": null
    },
    {
      "text": " app",
      "startMs": 5776,
      "endMs": 5956,
      "timestampMs": 5866,
      "confidence": null
    },
    {
      "text": " available",
      "startMs": 6356,
      "endMs": 6796,
      "timestampMs": 6576,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 6796,
      "endMs": 6996,
      "timestampMs": 6896,
      "confidence": null
    },
    {
      "text": " phone",
      "startMs": 6996,
      "endMs": 7336,
      "timestampMs": 7166,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 7336,
      "endMs": 7456,
      "timestampMs": 7396,
      "confidence": null
    },
    {
      "text": " tablets.",
      "startMs": 7456,
      "endMs": 8076,
      "timestampMs": 7766,
      "confidence": null
    },
    {
      "text": " When",
      "startMs": 11250,
      "endMs": 11400,
      "timestampMs": 11325,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 11400,
      "endMs": 11450,
      "timestampMs": 11425,
      "confidence": null
    },
    {
      "text": " first",
      "startMs": 11400,
      "endMs": 11660,
      "timestampMs": 11530,
      "confidence": null
    },
    {
      "text": " open",
      "startMs": 11660,
      "endMs": 11880,
      "timestampMs": 11770,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 11880,
      "endMs": 12040,
      "timestampMs": 11960,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 12040,
      "endMs": 12280,
      "timestampMs": 12160,
      "confidence": null
    },
    {
      "text": " app,",
      "startMs": 12280,
      "endMs": 12460,
      "timestampMs": 12370,
      "confidence": null
    },
    {
      "text": " you're",
      "startMs": 12460,
      "endMs": 12780,
      "timestampMs": 12620,
      "confidence": null
    },
    {
      "text": " presented",
      "startMs": 12780,
      "endMs": 13220,
      "timestampMs": 13000,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 13220,
      "endMs": 13420,
      "timestampMs": 13320,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 13420,
      "endMs": 13560,
      "timestampMs": 13490,
      "confidence": null
    },
    {
      "text": " short",
      "startMs": 13560,
      "endMs": 13860,
      "timestampMs": 13710,
      "confidence": null
    },
    {
      "text": " walkthrough",
      "startMs": 13860,
      "endMs": 14630,
      "timestampMs": 14245,
      "confidence": null
    },
    {
      "text": " that'll",
      "startMs": 14988,
      "endMs": 15248,
      "timestampMs": 15118,
      "confidence": null
    },
    {
      "text": " help",
      "startMs": 15248,
      "endMs": 15428,
      "timestampMs": 15338,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 15428,
      "endMs": 15588,
      "timestampMs": 15508,
      "confidence": null
    },
    {
      "text": " navigate",
      "startMs": 15588,
      "endMs": 16208,
      "timestampMs": 15898,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 16208,
      "endMs": 16428,
      "timestampMs": 16318,
      "confidence": null
    },
    {
      "text": " application",
      "startMs": 16428,
      "endMs": 17303,
      "timestampMs": 16865,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 17601,
      "endMs": 17761,
      "timestampMs": 17681,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 17761,
      "endMs": 17941,
      "timestampMs": 17851,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 17941,
      "endMs": 18041,
      "timestampMs": 17991,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 18041,
      "endMs": 18121,
      "timestampMs": 18081,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 18121,
      "endMs": 18281,
      "timestampMs": 18201,
      "confidence": null
    },
    {
      "text": " control.",
      "startMs": 18281,
      "endMs": 18716,
      "timestampMs": 18499,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 18990,
      "endMs": 19050,
      "timestampMs": 19020,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 19050,
      "endMs": 20175,
      "timestampMs": 19613,
      "confidence": null
    },
    {
      "text": " X",
      "startMs": 20175,
      "endMs": 20225,
      "timestampMs": 20200,
      "confidence": null
    },
    {
      "text": " out",
      "startMs": 19410,
      "endMs": 19550,
      "timestampMs": 19480,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 19550,
      "endMs": 19650,
      "timestampMs": 19600,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 19650,
      "endMs": 20175,
      "timestampMs": 19913,
      "confidence": null
    },
    {
      "text": " anytime,",
      "startMs": 20533,
      "endMs": 21373,
      "timestampMs": 20953,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 21946,
      "endMs": 22266,
      "timestampMs": 22106,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 22266,
      "endMs": 22386,
      "timestampMs": 22326,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 22386,
      "endMs": 22506,
      "timestampMs": 22446,
      "confidence": null
    },
    {
      "text": " get",
      "startMs": 22506,
      "endMs": 22646,
      "timestampMs": 22576,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 22646,
      "endMs": 22906,
      "timestampMs": 22776,
      "confidence": null
    },
    {
      "text": " into",
      "startMs": 22906,
      "endMs": 23166,
      "timestampMs": 23036,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 23166,
      "endMs": 23266,
      "timestampMs": 23216,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 23266,
      "endMs": 23526,
      "timestampMs": 23396,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 23526,
      "endMs": 23666,
      "timestampMs": 23596,
      "confidence": null
    },
    {
      "text": " setup",
      "startMs": 23666,
      "endMs": 23986,
      "timestampMs": 23826,
      "confidence": null
    },
    {
      "text": " page",
      "startMs": 23986,
      "endMs": 24436,
      "timestampMs": 24211,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 24666,
      "endMs": 24771,
      "timestampMs": 24719,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 24771,
      "endMs": 24821,
      "timestampMs": 24796,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 24771,
      "endMs": 24821,
      "timestampMs": 24796,
      "confidence": null
    },
    {
      "text": " to.",
      "startMs": 24771,
      "endMs": 24821,
      "timestampMs": 24796,
      "confidence": null
    },
    {
      "text": " The",
      "startMs": 27750,
      "endMs": 27860,
      "timestampMs": 27805,
      "confidence": null
    },
    {
      "text": " first",
      "startMs": 27860,
      "endMs": 28100,
      "timestampMs": 27980,
      "confidence": null
    },
    {
      "text": " thing",
      "startMs": 28100,
      "endMs": 28300,
      "timestampMs": 28200,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 28300,
      "endMs": 28440,
      "timestampMs": 28370,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 28440,
      "endMs": 28820,
      "timestampMs": 28630,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 28820,
      "endMs": 28960,
      "timestampMs": 28890,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 28960,
      "endMs": 29100,
      "timestampMs": 29030,
      "confidence": null
    },
    {
      "text": " CTRLbot",
      "startMs": 29100,
      "endMs": 30300,
      "timestampMs": 29700,
      "confidence": null
    },
    {
      "text": " AI.",
      "startMs": 30693,
      "endMs": 30843,
      "timestampMs": 30768,
      "confidence": null
    },
    {
      "text": " This",
      "startMs": 31050,
      "endMs": 31240,
      "timestampMs": 31145,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 31240,
      "endMs": 31360,
      "timestampMs": 31300,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 31360,
      "endMs": 31440,
      "timestampMs": 31400,
      "confidence": null
    },
    {
      "text": " walking,",
      "startMs": 31440,
      "endMs": 31880,
      "timestampMs": 31660,
      "confidence": null
    },
    {
      "text": " talking",
      "startMs": 31880,
      "endMs": 32680,
      "timestampMs": 32280,
      "confidence": null
    },
    {
      "text": " manual",
      "startMs": 33103,
      "endMs": 33673,
      "timestampMs": 33388,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 34003,
      "endMs": 34308,
      "timestampMs": 34156,
      "confidence": null
    },
    {
      "text": " troubleshooter.",
      "startMs": 34443,
      "endMs": 35138,
      "timestampMs": 34790,
      "confidence": null
    },
    {
      "text": " It'll",
      "startMs": 35480,
      "endMs": 35780,
      "timestampMs": 35630,
      "confidence": null
    },
    {
      "text": " help",
      "startMs": 35780,
      "endMs": 35960,
      "timestampMs": 35870,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 35960,
      "endMs": 36500,
      "timestampMs": 36230,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 36820,
      "endMs": 37105,
      "timestampMs": 36963,
      "confidence": null
    },
    {
      "text": " setting",
      "startMs": 37378,
      "endMs": 37658,
      "timestampMs": 37518,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 37658,
      "endMs": 37818,
      "timestampMs": 37738,
      "confidence": null
    },
    {
      "text": " control",
      "startMs": 37818,
      "endMs": 38418,
      "timestampMs": 38118,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 38716,
      "endMs": 38941,
      "timestampMs": 38828,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 39076,
      "endMs": 39316,
      "timestampMs": 39196,
      "confidence": null
    },
    {
      "text": " issues",
      "startMs": 39316,
      "endMs": 39776,
      "timestampMs": 39546,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 39776,
      "endMs": 39956,
      "timestampMs": 39866,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 39956,
      "endMs": 40276,
      "timestampMs": 40116,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 40396,
      "endMs": 40496,
      "timestampMs": 40446,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 40496,
      "endMs": 40636,
      "timestampMs": 40566,
      "confidence": null
    },
    {
      "text": " room",
      "startMs": 41004,
      "endMs": 41284,
      "timestampMs": 41144,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 41284,
      "endMs": 41424,
      "timestampMs": 41354,
      "confidence": null
    },
    {
      "text": " operation.",
      "startMs": 41424,
      "endMs": 42024,
      "timestampMs": 41724,
      "confidence": null
    },
    {
      "text": " It",
      "startMs": 46290,
      "endMs": 46390,
      "timestampMs": 46340,
      "confidence": null
    },
    {
      "text": " really",
      "startMs": 46390,
      "endMs": 46630,
      "timestampMs": 46510,
      "confidence": null
    },
    {
      "text": " begins",
      "startMs": 46630,
      "endMs": 47340,
      "timestampMs": 46985,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 47430,
      "endMs": 47720,
      "timestampMs": 47575,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 47810,
      "endMs": 47950,
      "timestampMs": 47880,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 47950,
      "endMs": 48625,
      "timestampMs": 48288,
      "confidence": null
    },
    {
      "text": " driver",
      "startMs": 48753,
      "endMs": 49213,
      "timestampMs": 48983,
      "confidence": null
    },
    {
      "text": " database.",
      "startMs": 49213,
      "endMs": 49938,
      "timestampMs": 49576,
      "confidence": null
    },
    {
      "text": " We",
      "startMs": 50685,
      "endMs": 50805,
      "timestampMs": 50745,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 50805,
      "endMs": 50925,
      "timestampMs": 50865,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 50925,
      "endMs": 51025,
      "timestampMs": 50975,
      "confidence": null
    },
    {
      "text": " extensive",
      "startMs": 51025,
      "endMs": 51665,
      "timestampMs": 51345,
      "confidence": null
    },
    {
      "text": " database",
      "startMs": 51665,
      "endMs": 52275,
      "timestampMs": 51970,
      "confidence": null
    },
    {
      "text": " thousands",
      "startMs": 52485,
      "endMs": 53045,
      "timestampMs": 52765,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 53045,
      "endMs": 53165,
      "timestampMs": 53105,
      "confidence": null
    },
    {
      "text": " commands,",
      "startMs": 53165,
      "endMs": 53785,
      "timestampMs": 53475,
      "confidence": null
    },
    {
      "text": " control",
      "startMs": 54105,
      "endMs": 54840,
      "timestampMs": 54473,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 55225,
      "endMs": 55705,
      "timestampMs": 55465,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 55705,
      "endMs": 56005,
      "timestampMs": 55855,
      "confidence": null
    },
    {
      "text": " IP,",
      "startMs": 56005,
      "endMs": 56565,
      "timestampMs": 56285,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 56990,
      "endMs": 57210,
      "timestampMs": 57100,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 57210,
      "endMs": 57430,
      "timestampMs": 57320,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 57430,
      "endMs": 57650,
      "timestampMs": 57540,
      "confidence": null
    },
    {
      "text": " endpoint,",
      "startMs": 57650,
      "endMs": 58290,
      "timestampMs": 57970,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 58290,
      "endMs": 58430,
      "timestampMs": 58360,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 58430,
      "endMs": 58690,
      "timestampMs": 58560,
      "confidence": null
    },
    {
      "text": " control",
      "startMs": 58690,
      "endMs": 59130,
      "timestampMs": 58910,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 59130,
      "endMs": 59180,
      "timestampMs": 59155,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 59130,
      "endMs": 59450,
      "timestampMs": 59290,
      "confidence": null
    },
    {
      "text": " RS-232",
      "startMs": 59450,
      "endMs": 60580,
      "timestampMs": 60015,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 60873,
      "endMs": 61293,
      "timestampMs": 61083,
      "confidence": null
    },
    {
      "text": " IR.",
      "startMs": 61293,
      "endMs": 61568,
      "timestampMs": 61431,
      "confidence": null
    },
    {
      "text": " Endpoints",
      "startMs": 61890,
      "endMs": 62645,
      "timestampMs": 62268,
      "confidence": null
    },
    {
      "text": " sit",
      "startMs": 62930,
      "endMs": 63170,
      "timestampMs": 63050,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 63170,
      "endMs": 63250,
      "timestampMs": 63210,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 63250,
      "endMs": 63370,
      "timestampMs": 63310,
      "confidence": null
    },
    {
      "text": " network",
      "startMs": 63370,
      "endMs": 63850,
      "timestampMs": 63610,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 64170,
      "endMs": 64290,
      "timestampMs": 64230,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 64290,
      "endMs": 64450,
      "timestampMs": 64370,
      "confidence": null
    },
    {
      "text": " they",
      "startMs": 64450,
      "endMs": 64630,
      "timestampMs": 64540,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 64630,
      "endMs": 64830,
      "timestampMs": 64730,
      "confidence": null
    },
    {
      "text": " convert",
      "startMs": 64830,
      "endMs": 65450,
      "timestampMs": 65140,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 65450,
      "endMs": 65688,
      "timestampMs": 65569,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 65758,
      "endMs": 66071,
      "timestampMs": 65915,
      "confidence": null
    },
    {
      "text": " something",
      "startMs": 66241,
      "endMs": 66641,
      "timestampMs": 66441,
      "confidence": null
    },
    {
      "text": " else",
      "startMs": 66641,
      "endMs": 66841,
      "timestampMs": 66741,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 66841,
      "endMs": 67121,
      "timestampMs": 66981,
      "confidence": null
    },
    {
      "text": " serial",
      "startMs": 67121,
      "endMs": 67721,
      "timestampMs": 67421,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 68021,
      "endMs": 68401,
      "timestampMs": 68211,
      "confidence": null
    },
    {
      "text": " infrared.",
      "startMs": 68401,
      "endMs": 68781,
      "timestampMs": 68591,
      "confidence": null
    },
    {
      "text": " Let's",
      "startMs": 71250,
      "endMs": 71540,
      "timestampMs": 71395,
      "confidence": null
    },
    {
      "text": " start",
      "startMs": 71540,
      "endMs": 71780,
      "timestampMs": 71660,
      "confidence": null
    },
    {
      "text": " by",
      "startMs": 71780,
      "endMs": 72020,
      "timestampMs": 71900,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 72020,
      "endMs": 72260,
      "timestampMs": 72140,
      "confidence": null
    },
    {
      "text": " adding",
      "startMs": 72260,
      "endMs": 72580,
      "timestampMs": 72420,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 72580,
      "endMs": 72700,
      "timestampMs": 72640,
      "confidence": null
    },
    {
      "text": " simple",
      "startMs": 72700,
      "endMs": 73240,
      "timestampMs": 72970,
      "confidence": null
    },
    {
      "text": " projector.",
      "startMs": 73240,
      "endMs": 73910,
      "timestampMs": 73575,
      "confidence": null
    },
    {
      "text": " When",
      "startMs": 74160,
      "endMs": 74290,
      "timestampMs": 74225,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 74290,
      "endMs": 74390,
      "timestampMs": 74340,
      "confidence": null
    },
    {
      "text": " select",
      "startMs": 74390,
      "endMs": 74790,
      "timestampMs": 74590,
      "confidence": null
    },
    {
      "text": " Epson,",
      "startMs": 74790,
      "endMs": 75330,
      "timestampMs": 75060,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 75330,
      "endMs": 75470,
      "timestampMs": 75400,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 75470,
      "endMs": 75630,
      "timestampMs": 75550,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 75630,
      "endMs": 75830,
      "timestampMs": 75730,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 75830,
      "endMs": 75930,
      "timestampMs": 75880,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 75930,
      "endMs": 76110,
      "timestampMs": 76020,
      "confidence": null
    },
    {
      "text": " lots",
      "startMs": 76110,
      "endMs": 76270,
      "timestampMs": 76190,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 76270,
      "endMs": 76410,
      "timestampMs": 76340,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 76410,
      "endMs": 76790,
      "timestampMs": 76600,
      "confidence": null
    },
    {
      "text": " information,",
      "startMs": 76790,
      "endMs": 77675,
      "timestampMs": 77233,
      "confidence": null
    },
    {
      "text": " specs,",
      "startMs": 77843,
      "endMs": 78283,
      "timestampMs": 78063,
      "confidence": null
    },
    {
      "text": " setup,",
      "startMs": 78283,
      "endMs": 78703,
      "timestampMs": 78493,
      "confidence": null
    },
    {
      "text": " support.",
      "startMs": 78703,
      "endMs": 79293,
      "timestampMs": 78998,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 79540,
      "endMs": 79610,
      "timestampMs": 79575,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 79610,
      "endMs": 79730,
      "timestampMs": 79670,
      "confidence": null
    },
    {
      "text": " want",
      "startMs": 79730,
      "endMs": 79890,
      "timestampMs": 79810,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 79890,
      "endMs": 79970,
      "timestampMs": 79930,
      "confidence": null
    },
    {
      "text": " look",
      "startMs": 79970,
      "endMs": 80230,
      "timestampMs": 80100,
      "confidence": null
    },
    {
      "text": " at",
      "startMs": 80230,
      "endMs": 80390,
      "timestampMs": 80310,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 80390,
      "endMs": 80550,
      "timestampMs": 80470,
      "confidence": null
    },
    {
      "text": " product",
      "startMs": 80550,
      "endMs": 80890,
      "timestampMs": 80720,
      "confidence": null
    },
    {
      "text": " page",
      "startMs": 80890,
      "endMs": 81455,
      "timestampMs": 81173,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 81530,
      "endMs": 81750,
      "timestampMs": 81640,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 81750,
      "endMs": 81890,
      "timestampMs": 81820,
      "confidence": null
    },
    {
      "text": " manufacturer",
      "startMs": 81890,
      "endMs": 82570,
      "timestampMs": 82230,
      "confidence": null
    },
    {
      "text": " page,",
      "startMs": 82570,
      "endMs": 83090,
      "timestampMs": 82830,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 83290,
      "endMs": 83490,
      "timestampMs": 83390,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 83490,
      "endMs": 83730,
      "timestampMs": 83610,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 83730,
      "endMs": 83830,
      "timestampMs": 83780,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 83830,
      "endMs": 84030,
      "timestampMs": 83930,
      "confidence": null
    },
    {
      "text": " link",
      "startMs": 84030,
      "endMs": 84340,
      "timestampMs": 84185,
      "confidence": null
    },
    {
      "text": " Simply",
      "startMs": 86320,
      "endMs": 86683,
      "timestampMs": 86502,
      "confidence": null
    },
    {
      "text": " press",
      "startMs": 86768,
      "endMs": 87008,
      "timestampMs": 86888,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 87008,
      "endMs": 87131,
      "timestampMs": 87070,
      "confidence": null
    },
    {
      "text": " plus",
      "startMs": 87166,
      "endMs": 87486,
      "timestampMs": 87326,
      "confidence": null
    },
    {
      "text": " button",
      "startMs": 87486,
      "endMs": 87846,
      "timestampMs": 87666,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 87846,
      "endMs": 88066,
      "timestampMs": 87956,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 88066,
      "endMs": 88286,
      "timestampMs": 88176,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 88286,
      "endMs": 88406,
      "timestampMs": 88346,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 88406,
      "endMs": 89011,
      "timestampMs": 88709,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 89234,
      "endMs": 89314,
      "timestampMs": 89274,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 89314,
      "endMs": 89514,
      "timestampMs": 89414,
      "confidence": null
    },
    {
      "text": " enter",
      "startMs": 89514,
      "endMs": 89874,
      "timestampMs": 89694,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 89874,
      "endMs": 90014,
      "timestampMs": 89944,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 90014,
      "endMs": 90094,
      "timestampMs": 90054,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 90094,
      "endMs": 90214,
      "timestampMs": 90154,
      "confidence": null
    },
    {
      "text": " address.",
      "startMs": 90214,
      "endMs": 90664,
      "timestampMs": 90439,
      "confidence": null
    },
    {
      "text": " Once",
      "startMs": 90955,
      "endMs": 91095,
      "timestampMs": 91025,
      "confidence": null
    },
    {
      "text": " I'm",
      "startMs": 91095,
      "endMs": 91235,
      "timestampMs": 91165,
      "confidence": null
    },
    {
      "text": " connected,",
      "startMs": 91235,
      "endMs": 91835,
      "timestampMs": 91535,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 91835,
      "endMs": 91955,
      "timestampMs": 91895,
      "confidence": null
    },
    {
      "text": " automatically",
      "startMs": 91955,
      "endMs": 92575,
      "timestampMs": 92265,
      "confidence": null
    },
    {
      "text": " saves",
      "startMs": 92575,
      "endMs": 92915,
      "timestampMs": 92745,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 92915,
      "endMs": 93115,
      "timestampMs": 93015,
      "confidence": null
    },
    {
      "text": " connection.",
      "startMs": 93115,
      "endMs": 93765,
      "timestampMs": 93440,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 95785,
      "endMs": 95865,
      "timestampMs": 95825,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 95865,
      "endMs": 96065,
      "timestampMs": 95965,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 96065,
      "endMs": 96265,
      "timestampMs": 96165,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 96265,
      "endMs": 96445,
      "timestampMs": 96355,
      "confidence": null
    },
    {
      "text": " testing",
      "startMs": 96445,
      "endMs": 96905,
      "timestampMs": 96675,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 96905,
      "endMs": 97475,
      "timestampMs": 97190,
      "confidence": null
    },
    {
      "text": " by",
      "startMs": 97535,
      "endMs": 97890,
      "timestampMs": 97713,
      "confidence": null
    },
    {
      "text": " selecting",
      "startMs": 98045,
      "endMs": 98465,
      "timestampMs": 98255,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 98465,
      "endMs": 98645,
      "timestampMs": 98555,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 98645,
      "endMs": 98745,
      "timestampMs": 98695,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 98745,
      "endMs": 98805,
      "timestampMs": 98775,
      "confidence": null
    },
    {
      "text": " buttons",
      "startMs": 98805,
      "endMs": 99430,
      "timestampMs": 99117,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 99430,
      "endMs": 99725,
      "timestampMs": 99577,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 99725,
      "endMs": 99845,
      "timestampMs": 99785,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 99845,
      "endMs": 100045,
      "timestampMs": 99945,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 100045,
      "endMs": 100665,
      "timestampMs": 100355,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 100665,
      "endMs": 100865,
      "timestampMs": 100765,
      "confidence": null
    },
    {
      "text": " terminal",
      "startMs": 100865,
      "endMs": 101325,
      "timestampMs": 101095,
      "confidence": null
    },
    {
      "text": " shows",
      "startMs": 101325,
      "endMs": 101705,
      "timestampMs": 101515,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 101705,
      "endMs": 101905,
      "timestampMs": 101805,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 101905,
      "endMs": 102105,
      "timestampMs": 102005,
      "confidence": null
    },
    {
      "text": " there.",
      "startMs": 102105,
      "endMs": 102590,
      "timestampMs": 102348,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 103040,
      "endMs": 103100,
      "timestampMs": 103070,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 103100,
      "endMs": 103180,
      "timestampMs": 103140,
      "confidence": null
    },
    {
      "text": " needed",
      "startMs": 103180,
      "endMs": 103420,
      "timestampMs": 103300,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 103420,
      "endMs": 103560,
      "timestampMs": 103490,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 103560,
      "endMs": 103820,
      "timestampMs": 103690,
      "confidence": null
    },
    {
      "text": " something",
      "startMs": 103820,
      "endMs": 104410,
      "timestampMs": 104115,
      "confidence": null
    },
    {
      "text": " directly",
      "startMs": 104488,
      "endMs": 104908,
      "timestampMs": 104698,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 104908,
      "endMs": 105108,
      "timestampMs": 105008,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 105108,
      "endMs": 105308,
      "timestampMs": 105208,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 105608,
      "endMs": 105708,
      "timestampMs": 105658,
      "confidence": null
    },
    {
      "text": " would",
      "startMs": 105708,
      "endMs": 105788,
      "timestampMs": 105748,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 105788,
      "endMs": 105928,
      "timestampMs": 105858,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 105928,
      "endMs": 106188,
      "timestampMs": 106058,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 106188,
      "endMs": 106308,
      "timestampMs": 106248,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 106308,
      "endMs": 106778,
      "timestampMs": 106543,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 106908,
      "endMs": 107048,
      "timestampMs": 106978,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 107048,
      "endMs": 107128,
      "timestampMs": 107088,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 107128,
      "endMs": 107308,
      "timestampMs": 107218,
      "confidence": null
    },
    {
      "text": " put",
      "startMs": 107308,
      "endMs": 107568,
      "timestampMs": 107438,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 107568,
      "endMs": 107843,
      "timestampMs": 107705,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 108848,
      "endMs": 108908,
      "timestampMs": 108878,
      "confidence": null
    },
    {
      "text": " message.",
      "startMs": 108908,
      "endMs": 109258,
      "timestampMs": 109083,
      "confidence": null
    },
    {
      "text": " Xing",
      "startMs": 111360,
      "endMs": 111740,
      "timestampMs": 111550,
      "confidence": null
    },
    {
      "text": " out",
      "startMs": 111740,
      "endMs": 112000,
      "timestampMs": 111870,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 112400,
      "endMs": 112580,
      "timestampMs": 112490,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 112580,
      "endMs": 113133,
      "timestampMs": 112857,
      "confidence": null
    },
    {
      "text": " saves",
      "startMs": 113183,
      "endMs": 113443,
      "timestampMs": 113313,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 113443,
      "endMs": 113603,
      "timestampMs": 113523,
      "confidence": null
    },
    {
      "text": " connection.",
      "startMs": 113603,
      "endMs": 114043,
      "timestampMs": 113823,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 114250,
      "endMs": 114470,
      "timestampMs": 114360,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 114653,
      "endMs": 114773,
      "timestampMs": 114713,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 114773,
      "endMs": 114873,
      "timestampMs": 114823,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 114873,
      "endMs": 115053,
      "timestampMs": 114963,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 115053,
      "endMs": 115293,
      "timestampMs": 115173,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 115293,
      "endMs": 115638,
      "timestampMs": 115465,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 115873,
      "endMs": 116633,
      "timestampMs": 116253,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 116871,
      "endMs": 117051,
      "timestampMs": 116961,
      "confidence": null
    },
    {
      "text": " more",
      "startMs": 117051,
      "endMs": 117251,
      "timestampMs": 117151,
      "confidence": null
    },
    {
      "text": " testing",
      "startMs": 117251,
      "endMs": 117926,
      "timestampMs": 117588,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 118111,
      "endMs": 118271,
      "timestampMs": 118191,
      "confidence": null
    },
    {
      "text": " it.",
      "startMs": 118271,
      "endMs": 118471,
      "timestampMs": 118371,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 118720,
      "endMs": 118840,
      "timestampMs": 118780,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 118840,
      "endMs": 119080,
      "timestampMs": 118960,
      "confidence": null
    },
    {
      "text": " use",
      "startMs": 119080,
      "endMs": 119240,
      "timestampMs": 119160,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 119240,
      "endMs": 119340,
      "timestampMs": 119290,
      "confidence": null
    },
    {
      "text": " buttons.",
      "startMs": 119340,
      "endMs": 119945,
      "timestampMs": 119643,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 120500,
      "endMs": 120600,
      "timestampMs": 120550,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 120600,
      "endMs": 121005,
      "timestampMs": 120803,
      "confidence": null
    },
    {
      "text": " test",
      "startMs": 121093,
      "endMs": 121333,
      "timestampMs": 121213,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 121333,
      "endMs": 121433,
      "timestampMs": 121383,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 121433,
      "endMs": 121593,
      "timestampMs": 121513,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 121593,
      "endMs": 121673,
      "timestampMs": 121633,
      "confidence": null
    },
    {
      "text": " switcher.",
      "startMs": 121673,
      "endMs": 122218,
      "timestampMs": 121946,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 123211,
      "endMs": 123331,
      "timestampMs": 123271,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 123331,
      "endMs": 123471,
      "timestampMs": 123401,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 123471,
      "endMs": 123651,
      "timestampMs": 123561,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 123651,
      "endMs": 123811,
      "timestampMs": 123731,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 123811,
      "endMs": 123931,
      "timestampMs": 123871,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 123931,
      "endMs": 124051,
      "timestampMs": 123991,
      "confidence": null
    },
    {
      "text": " terminal",
      "startMs": 124051,
      "endMs": 124636,
      "timestampMs": 124343,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 125202,
      "endMs": 125282,
      "timestampMs": 125242,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 125282,
      "endMs": 125382,
      "timestampMs": 125332,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 125382,
      "endMs": 125562,
      "timestampMs": 125472,
      "confidence": null
    },
    {
      "text": " access",
      "startMs": 125562,
      "endMs": 126022,
      "timestampMs": 125792,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 126022,
      "endMs": 126242,
      "timestampMs": 126132,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 126242,
      "endMs": 126642,
      "timestampMs": 126442,
      "confidence": null
    },
    {
      "text": " webpage",
      "startMs": 126642,
      "endMs": 127102,
      "timestampMs": 126872,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 127102,
      "endMs": 127222,
      "timestampMs": 127162,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 127222,
      "endMs": 127302,
      "timestampMs": 127262,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 127302,
      "endMs": 127727,
      "timestampMs": 127515,
      "confidence": null
    },
    {
      "text": " one.",
      "startMs": 127727,
      "endMs": 127852,
      "timestampMs": 127790,
      "confidence": null
    },
    {
      "text": " Next,",
      "startMs": 131285,
      "endMs": 131585,
      "timestampMs": 131435,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 131585,
      "endMs": 131805,
      "timestampMs": 131695,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 131805,
      "endMs": 131985,
      "timestampMs": 131895,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 131985,
      "endMs": 132205,
      "timestampMs": 132095,
      "confidence": null
    },
    {
      "text": " activities.",
      "startMs": 132205,
      "endMs": 132965,
      "timestampMs": 132585,
      "confidence": null
    },
    {
      "text": " Activities",
      "startMs": 133330,
      "endMs": 133870,
      "timestampMs": 133600,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 133870,
      "endMs": 133990,
      "timestampMs": 133930,
      "confidence": null
    },
    {
      "text": " where",
      "startMs": 133990,
      "endMs": 134190,
      "timestampMs": 134090,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 134190,
      "endMs": 134350,
      "timestampMs": 134270,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 134350,
      "endMs": 134630,
      "timestampMs": 134490,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 134630,
      "endMs": 134805,
      "timestampMs": 134717,
      "confidence": null
    },
    {
      "text": " what",
      "startMs": 135010,
      "endMs": 135310,
      "timestampMs": 135160,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 135310,
      "endMs": 135570,
      "timestampMs": 135440,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 135570,
      "endMs": 135750,
      "timestampMs": 135660,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 135750,
      "endMs": 136030,
      "timestampMs": 135890,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 136030,
      "endMs": 136250,
      "timestampMs": 136140,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 136250,
      "endMs": 136745,
      "timestampMs": 136498,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 136998,
      "endMs": 137178,
      "timestampMs": 137088,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 137178,
      "endMs": 137258,
      "timestampMs": 137218,
      "confidence": null
    },
    {
      "text": " final",
      "startMs": 137258,
      "endMs": 138018,
      "timestampMs": 137638,
      "confidence": null
    },
    {
      "text": " unified",
      "startMs": 138018,
      "endMs": 138788,
      "timestampMs": 138403,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 139096,
      "endMs": 139396,
      "timestampMs": 139246,
      "confidence": null
    },
    {
      "text": " interface.",
      "startMs": 139396,
      "endMs": 140071,
      "timestampMs": 139734,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 140365,
      "endMs": 140655,
      "timestampMs": 140510,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 140725,
      "endMs": 140945,
      "timestampMs": 140835,
      "confidence": null
    },
    {
      "text": " builds",
      "startMs": 140945,
      "endMs": 141305,
      "timestampMs": 141125,
      "confidence": null
    },
    {
      "text": " itself.",
      "startMs": 141305,
      "endMs": 141845,
      "timestampMs": 141575,
      "confidence": null
    },
    {
      "text": " You",
      "startMs": 141905,
      "endMs": 142045,
      "timestampMs": 141975,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 142045,
      "endMs": 142405,
      "timestampMs": 142225,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 142425,
      "endMs": 142705,
      "timestampMs": 142565,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 142705,
      "endMs": 142885,
      "timestampMs": 142795,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 142885,
      "endMs": 143025,
      "timestampMs": 142955,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 143025,
      "endMs": 143165,
      "timestampMs": 143095,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 143165,
      "endMs": 143385,
      "timestampMs": 143275,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 143385,
      "endMs": 143725,
      "timestampMs": 143555,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 143725,
      "endMs": 144060,
      "timestampMs": 143892,
      "confidence": null
    },
    {
      "text": " Power",
      "startMs": 144145,
      "endMs": 144585,
      "timestampMs": 144365,
      "confidence": null
    },
    {
      "text": " On",
      "startMs": 144585,
      "endMs": 144665,
      "timestampMs": 144625,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 144665,
      "endMs": 144845,
      "timestampMs": 144755,
      "confidence": null
    },
    {
      "text": " already",
      "startMs": 144845,
      "endMs": 145165,
      "timestampMs": 145005,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 145165,
      "endMs": 145525,
      "timestampMs": 145345,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 145525,
      "endMs": 145765,
      "timestampMs": 145645,
      "confidence": null
    },
    {
      "text": " Epson",
      "startMs": 145765,
      "endMs": 146145,
      "timestampMs": 145955,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 146145,
      "endMs": 146445,
      "timestampMs": 146295,
      "confidence": null
    },
    {
      "text": " light",
      "startMs": 146445,
      "endMs": 146745,
      "timestampMs": 146595,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 146985,
      "endMs": 147445,
      "timestampMs": 147215,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 147445,
      "endMs": 147730,
      "timestampMs": 147587,
      "confidence": null
    },
    {
      "text": " command.",
      "startMs": 148121,
      "endMs": 148591,
      "timestampMs": 148356,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 152330,
      "endMs": 152470,
      "timestampMs": 152400,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 152470,
      "endMs": 152590,
      "timestampMs": 152530,
      "confidence": null
    },
    {
      "text": " same",
      "startMs": 152590,
      "endMs": 152770,
      "timestampMs": 152680,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 152770,
      "endMs": 152950,
      "timestampMs": 152860,
      "confidence": null
    },
    {
      "text": " switcher,",
      "startMs": 152950,
      "endMs": 153385,
      "timestampMs": 153168,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 153590,
      "endMs": 153690,
      "timestampMs": 153640,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 153690,
      "endMs": 153910,
      "timestampMs": 153800,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 154090,
      "endMs": 154210,
      "timestampMs": 154150,
      "confidence": null
    },
    {
      "text": " haven't",
      "startMs": 154210,
      "endMs": 154490,
      "timestampMs": 154350,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 154490,
      "endMs": 154790,
      "timestampMs": 154640,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 154790,
      "endMs": 154970,
      "timestampMs": 154880,
      "confidence": null
    },
    {
      "text": " other",
      "startMs": 154970,
      "endMs": 155190,
      "timestampMs": 155080,
      "confidence": null
    },
    {
      "text": " switchers,",
      "startMs": 155190,
      "endMs": 155785,
      "timestampMs": 155488,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 155970,
      "endMs": 156310,
      "timestampMs": 156140,
      "confidence": null
    },
    {
      "text": " use",
      "startMs": 156310,
      "endMs": 156533,
      "timestampMs": 156422,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 156608,
      "endMs": 156968,
      "timestampMs": 156788,
      "confidence": null
    },
    {
      "text": " Epson",
      "startMs": 156968,
      "endMs": 157488,
      "timestampMs": 157228,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 157488,
      "endMs": 157708,
      "timestampMs": 157598,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 157708,
      "endMs": 157848,
      "timestampMs": 157778,
      "confidence": null
    },
    {
      "text": " switcher",
      "startMs": 157848,
      "endMs": 158358,
      "timestampMs": 158103,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 158621,
      "endMs": 158741,
      "timestampMs": 158681,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 158741,
      "endMs": 158861,
      "timestampMs": 158801,
      "confidence": null
    },
    {
      "text": " same",
      "startMs": 158861,
      "endMs": 159161,
      "timestampMs": 159011,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 159161,
      "endMs": 159421,
      "timestampMs": 159291,
      "confidence": null
    },
    {
      "text": " audio,",
      "startMs": 159421,
      "endMs": 159781,
      "timestampMs": 159601,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 160055,
      "endMs": 160170,
      "timestampMs": 160113,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 160170,
      "endMs": 160330,
      "timestampMs": 160250,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 160330,
      "endMs": 160530,
      "timestampMs": 160430,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 160530,
      "endMs": 160610,
      "timestampMs": 160570,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 160610,
      "endMs": 160770,
      "timestampMs": 160690,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 160770,
      "endMs": 160950,
      "timestampMs": 160860,
      "confidence": null
    },
    {
      "text": " customization,",
      "startMs": 160950,
      "endMs": 161750,
      "timestampMs": 161350,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 161750,
      "endMs": 161870,
      "timestampMs": 161810,
      "confidence": null
    },
    {
      "text": " can,",
      "startMs": 161870,
      "endMs": 162350,
      "timestampMs": 162110,
      "confidence": null
    },
    {
      "text": " but",
      "startMs": 162668,
      "endMs": 162788,
      "timestampMs": 162728,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 162788,
      "endMs": 162928,
      "timestampMs": 162858,
      "confidence": null
    },
    {
      "text": " not,",
      "startMs": 162928,
      "endMs": 163206,
      "timestampMs": 163067,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 163206,
      "endMs": 163321,
      "timestampMs": 163264,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 163321,
      "endMs": 163371,
      "timestampMs": 163346,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 163321,
      "endMs": 163521,
      "timestampMs": 163421,
      "confidence": null
    },
    {
      "text": " straight",
      "startMs": 163521,
      "endMs": 164041,
      "timestampMs": 163781,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 164041,
      "endMs": 164526,
      "timestampMs": 164284,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 164574,
      "endMs": 164754,
      "timestampMs": 164664,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 164754,
      "endMs": 164994,
      "timestampMs": 164874,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 164994,
      "endMs": 165334,
      "timestampMs": 165164,
      "confidence": null
    },
    {
      "text": " interface.",
      "startMs": 165334,
      "endMs": 165779,
      "timestampMs": 165557,
      "confidence": null
    },
    {
      "text": " This",
      "startMs": 169770,
      "endMs": 169990,
      "timestampMs": 169880,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 169990,
      "endMs": 170130,
      "timestampMs": 170060,
      "confidence": null
    },
    {
      "text": " where",
      "startMs": 170130,
      "endMs": 170680,
      "timestampMs": 170405,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 170938,
      "endMs": 171193,
      "timestampMs": 171066,
      "confidence": null
    },
    {
      "text": " control",
      "startMs": 171278,
      "endMs": 171778,
      "timestampMs": 171528,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 171778,
      "endMs": 171828,
      "timestampMs": 171803,
      "confidence": null
    },
    {
      "text": " room.",
      "startMs": 171778,
      "endMs": 172063,
      "timestampMs": 171921,
      "confidence": null
    },
    {
      "text": " The",
      "startMs": 172410,
      "endMs": 172470,
      "timestampMs": 172440,
      "confidence": null
    },
    {
      "text": " person",
      "startMs": 172470,
      "endMs": 172730,
      "timestampMs": 172600,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 172730,
      "endMs": 172910,
      "timestampMs": 172820,
      "confidence": null
    },
    {
      "text": " walks",
      "startMs": 172910,
      "endMs": 173410,
      "timestampMs": 173160,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 173410,
      "endMs": 173750,
      "timestampMs": 173580,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 173830,
      "endMs": 174090,
      "timestampMs": 173960,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 174090,
      "endMs": 174190,
      "timestampMs": 174140,
      "confidence": null
    },
    {
      "text": " door",
      "startMs": 174190,
      "endMs": 174670,
      "timestampMs": 174430,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 174670,
      "endMs": 174818,
      "timestampMs": 174744,
      "confidence": null
    },
    {
      "text": " needs",
      "startMs": 174943,
      "endMs": 175203,
      "timestampMs": 175073,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 175203,
      "endMs": 175383,
      "timestampMs": 175293,
      "confidence": null
    },
    {
      "text": " use",
      "startMs": 175383,
      "endMs": 175583,
      "timestampMs": 175483,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 175583,
      "endMs": 175703,
      "timestampMs": 175643,
      "confidence": null
    },
    {
      "text": " space",
      "startMs": 175703,
      "endMs": 176328,
      "timestampMs": 176015,
      "confidence": null
    },
    {
      "text": " sees",
      "startMs": 176783,
      "endMs": 177143,
      "timestampMs": 176963,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 177143,
      "endMs": 177283,
      "timestampMs": 177213,
      "confidence": null
    },
    {
      "text": " interface",
      "startMs": 177283,
      "endMs": 178103,
      "timestampMs": 177693,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 178436,
      "endMs": 178696,
      "timestampMs": 178566,
      "confidence": null
    },
    {
      "text": " they",
      "startMs": 178696,
      "endMs": 178856,
      "timestampMs": 178776,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 178856,
      "endMs": 179016,
      "timestampMs": 178936,
      "confidence": null
    },
    {
      "text": " turn",
      "startMs": 179016,
      "endMs": 179256,
      "timestampMs": 179136,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 179256,
      "endMs": 179516,
      "timestampMs": 179386,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 179516,
      "endMs": 179831,
      "timestampMs": 179674,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 180094,
      "endMs": 180214,
      "timestampMs": 180154,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 180214,
      "endMs": 180334,
      "timestampMs": 180274,
      "confidence": null
    },
    {
      "text": " they",
      "startMs": 180334,
      "endMs": 180454,
      "timestampMs": 180394,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 180454,
      "endMs": 180674,
      "timestampMs": 180564,
      "confidence": null
    },
    {
      "text": " select",
      "startMs": 180674,
      "endMs": 181094,
      "timestampMs": 180884,
      "confidence": null
    },
    {
      "text": " sources",
      "startMs": 181537,
      "endMs": 182197,
      "timestampMs": 181867,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 182197,
      "endMs": 182317,
      "timestampMs": 182257,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 182317,
      "endMs": 182677,
      "timestampMs": 182497,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 182677,
      "endMs": 182797,
      "timestampMs": 182737,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 182797,
      "endMs": 183077,
      "timestampMs": 182937,
      "confidence": null
    },
    {
      "text": " Epson",
      "startMs": 183277,
      "endMs": 183907,
      "timestampMs": 183592,
      "confidence": null
    },
    {
      "text": " projector",
      "startMs": 183935,
      "endMs": 184505,
      "timestampMs": 184220,
      "confidence": null
    },
    {
      "text": " screen.",
      "startMs": 184505,
      "endMs": 184765,
      "timestampMs": 184635,
      "confidence": null
    },
    {
      "text": " They",
      "startMs": 185590,
      "endMs": 185680,
      "timestampMs": 185635,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 185680,
      "endMs": 185995,
      "timestampMs": 185838,
      "confidence": null
    },
    {
      "text": " manipulate",
      "startMs": 186180,
      "endMs": 186800,
      "timestampMs": 186490,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 187440,
      "endMs": 187620,
      "timestampMs": 187530,
      "confidence": null
    },
    {
      "text": " audio",
      "startMs": 187620,
      "endMs": 188215,
      "timestampMs": 187918,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 188891,
      "endMs": 189011,
      "timestampMs": 188951,
      "confidence": null
    },
    {
      "text": " they",
      "startMs": 189011,
      "endMs": 189071,
      "timestampMs": 189041,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 189071,
      "endMs": 189291,
      "timestampMs": 189181,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 189291,
      "endMs": 189671,
      "timestampMs": 189481,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 189671,
      "endMs": 189721,
      "timestampMs": 189696,
      "confidence": null
    },
    {
      "text": " room",
      "startMs": 189671,
      "endMs": 190081,
      "timestampMs": 189876,
      "confidence": null
    },
    {
      "text": " off",
      "startMs": 190191,
      "endMs": 190431,
      "timestampMs": 190311,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 190791,
      "endMs": 191021,
      "timestampMs": 190906,
      "confidence": null
    },
    {
      "text": " on.",
      "startMs": 191021,
      "endMs": 191126,
      "timestampMs": 191074,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 195305,
      "endMs": 195385,
      "timestampMs": 195345,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 195385,
      "endMs": 195505,
      "timestampMs": 195445,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 195505,
      "endMs": 195705,
      "timestampMs": 195605,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 195705,
      "endMs": 195825,
      "timestampMs": 195765,
      "confidence": null
    },
    {
      "text": " make",
      "startMs": 195825,
      "endMs": 196045,
      "timestampMs": 195935,
      "confidence": null
    },
    {
      "text": " changes",
      "startMs": 196045,
      "endMs": 196730,
      "timestampMs": 196388,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 197253,
      "endMs": 197473,
      "timestampMs": 197363,
      "confidence": null
    },
    {
      "text": " press",
      "startMs": 197473,
      "endMs": 197753,
      "timestampMs": 197613,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 197753,
      "endMs": 197893,
      "timestampMs": 197823,
      "confidence": null
    },
    {
      "text": " hold",
      "startMs": 197893,
      "endMs": 198113,
      "timestampMs": 198003,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 198113,
      "endMs": 198233,
      "timestampMs": 198173,
      "confidence": null
    },
    {
      "text": " setup",
      "startMs": 198233,
      "endMs": 198613,
      "timestampMs": 198423,
      "confidence": null
    },
    {
      "text": " button",
      "startMs": 198613,
      "endMs": 198923,
      "timestampMs": 198768,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 199401,
      "endMs": 199501,
      "timestampMs": 199451,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 199501,
      "endMs": 199661,
      "timestampMs": 199581,
      "confidence": null
    },
    {
      "text": " take",
      "startMs": 199661,
      "endMs": 199821,
      "timestampMs": 199741,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 199821,
      "endMs": 200021,
      "timestampMs": 199921,
      "confidence": null
    },
    {
      "text": " back",
      "startMs": 200021,
      "endMs": 200401,
      "timestampMs": 200211,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 200501,
      "endMs": 201001,
      "timestampMs": 200751,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 201001,
      "endMs": 201201,
      "timestampMs": 201101,
      "confidence": null
    },
    {
      "text": " setup",
      "startMs": 201201,
      "endMs": 201571,
      "timestampMs": 201386,
      "confidence": null
    },
    {
      "text": " menus.",
      "startMs": 201904,
      "endMs": 202429,
      "timestampMs": 202166,
      "confidence": null
    },
    {
      "text": " I'd",
      "startMs": 205250,
      "endMs": 205300,
      "timestampMs": 205275,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 205250,
      "endMs": 205410,
      "timestampMs": 205330,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 205410,
      "endMs": 205530,
      "timestampMs": 205470,
      "confidence": null
    },
    {
      "text": " show",
      "startMs": 205530,
      "endMs": 205710,
      "timestampMs": 205620,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 205710,
      "endMs": 206450,
      "timestampMs": 206080,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 206450,
      "endMs": 206570,
      "timestampMs": 206510,
      "confidence": null
    },
    {
      "text": " new",
      "startMs": 206570,
      "endMs": 207510,
      "timestampMs": 207040,
      "confidence": null
    },
    {
      "text": " feature",
      "startMs": 207773,
      "endMs": 208388,
      "timestampMs": 208081,
      "confidence": null
    },
    {
      "text": " it's",
      "startMs": 208911,
      "endMs": 209131,
      "timestampMs": 209021,
      "confidence": null
    },
    {
      "text": " called",
      "startMs": 209131,
      "endMs": 209389,
      "timestampMs": 209260,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 209389,
      "endMs": 209729,
      "timestampMs": 209559,
      "confidence": null
    },
    {
      "text": " discovery.",
      "startMs": 209729,
      "endMs": 210419,
      "timestampMs": 210074,
      "confidence": null
    },
    {
      "text": " Basically",
      "startMs": 210670,
      "endMs": 211170,
      "timestampMs": 210920,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 211170,
      "endMs": 211220,
      "timestampMs": 211195,
      "confidence": null
    },
    {
      "text": " goes",
      "startMs": 211170,
      "endMs": 211470,
      "timestampMs": 211320,
      "confidence": null
    },
    {
      "text": " out",
      "startMs": 211470,
      "endMs": 211815,
      "timestampMs": 211642,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 211850,
      "endMs": 211990,
      "timestampMs": 211920,
      "confidence": null
    },
    {
      "text": " scans",
      "startMs": 211990,
      "endMs": 212510,
      "timestampMs": 212250,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 212510,
      "endMs": 212610,
      "timestampMs": 212560,
      "confidence": null
    },
    {
      "text": " network",
      "startMs": 212610,
      "endMs": 213100,
      "timestampMs": 212855,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 213273,
      "endMs": 213513,
      "timestampMs": 213393,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 213513,
      "endMs": 213753,
      "timestampMs": 213633,
      "confidence": null
    },
    {
      "text": " attached",
      "startMs": 213753,
      "endMs": 214193,
      "timestampMs": 213973,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 214193,
      "endMs": 215013,
      "timestampMs": 214603,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 215213,
      "endMs": 215313,
      "timestampMs": 215263,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 215313,
      "endMs": 215473,
      "timestampMs": 215393,
      "confidence": null
    },
    {
      "text": " tries",
      "startMs": 215473,
      "endMs": 215773,
      "timestampMs": 215623,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 215773,
      "endMs": 215933,
      "timestampMs": 215853,
      "confidence": null
    },
    {
      "text": " make",
      "startMs": 215933,
      "endMs": 216388,
      "timestampMs": 216160,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 216771,
      "endMs": 216931,
      "timestampMs": 216851,
      "confidence": null
    },
    {
      "text": " connection",
      "startMs": 216931,
      "endMs": 217681,
      "timestampMs": 217306,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 217919,
      "endMs": 218279,
      "timestampMs": 218099,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 218279,
      "endMs": 218499,
      "timestampMs": 218389,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 218499,
      "endMs": 219109,
      "timestampMs": 218804,
      "confidence": null
    },
    {
      "text": " driver",
      "startMs": 219147,
      "endMs": 219702,
      "timestampMs": 219425,
      "confidence": null
    },
    {
      "text": " library.",
      "startMs": 219970,
      "endMs": 220505,
      "timestampMs": 220237,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 224810,
      "endMs": 224990,
      "timestampMs": 224900,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 224990,
      "endMs": 225210,
      "timestampMs": 225100,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 225210,
      "endMs": 225370,
      "timestampMs": 225290,
      "confidence": null
    },
    {
      "text": " ahead",
      "startMs": 225370,
      "endMs": 225690,
      "timestampMs": 225530,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 225690,
      "endMs": 225870,
      "timestampMs": 225780,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 225870,
      "endMs": 226130,
      "timestampMs": 226000,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 226130,
      "endMs": 226545,
      "timestampMs": 226338,
      "confidence": null
    },
    {
      "text": " endpoints",
      "startMs": 226610,
      "endMs": 227255,
      "timestampMs": 226933,
      "confidence": null
    },
    {
      "text": " from",
      "startMs": 227538,
      "endMs": 227698,
      "timestampMs": 227618,
      "confidence": null
    },
    {
      "text": " Matrox.",
      "startMs": 227698,
      "endMs": 228428,
      "timestampMs": 228063,
      "confidence": null
    },
    {
      "text": " These",
      "startMs": 228778,
      "endMs": 229018,
      "timestampMs": 228898,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 229018,
      "endMs": 229283,
      "timestampMs": 229151,
      "confidence": null
    },
    {
      "text": " IPMX",
      "startMs": 229358,
      "endMs": 230043,
      "timestampMs": 229701,
      "confidence": null
    },
    {
      "text": " encoders",
      "startMs": 230511,
      "endMs": 231031,
      "timestampMs": 230771,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 231031,
      "endMs": 231151,
      "timestampMs": 231091,
      "confidence": null
    },
    {
      "text": " decoders,",
      "startMs": 231151,
      "endMs": 231871,
      "timestampMs": 231511,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 232190,
      "endMs": 232330,
      "timestampMs": 232260,
      "confidence": null
    },
    {
      "text": " what's",
      "startMs": 232330,
      "endMs": 232510,
      "timestampMs": 232420,
      "confidence": null
    },
    {
      "text": " happening",
      "startMs": 232510,
      "endMs": 232890,
      "timestampMs": 232700,
      "confidence": null
    },
    {
      "text": " behind",
      "startMs": 232890,
      "endMs": 233210,
      "timestampMs": 233050,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 233210,
      "endMs": 233370,
      "timestampMs": 233290,
      "confidence": null
    },
    {
      "text": " scenes",
      "startMs": 233370,
      "endMs": 233975,
      "timestampMs": 233672,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 234273,
      "endMs": 234413,
      "timestampMs": 234343,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 234413,
      "endMs": 234673,
      "timestampMs": 234543,
      "confidence": null
    },
    {
      "text": " it's",
      "startMs": 234673,
      "endMs": 234853,
      "timestampMs": 234763,
      "confidence": null
    },
    {
      "text": " actually",
      "startMs": 234853,
      "endMs": 235438,
      "timestampMs": 235145,
      "confidence": null
    },
    {
      "text": " making",
      "startMs": 235573,
      "endMs": 235873,
      "timestampMs": 235723,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 235873,
      "endMs": 235993,
      "timestampMs": 235933,
      "confidence": null
    },
    {
      "text": " connection,",
      "startMs": 235993,
      "endMs": 236693,
      "timestampMs": 236343,
      "confidence": null
    },
    {
      "text": " verifying",
      "startMs": 236833,
      "endMs": 237553,
      "timestampMs": 237193,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 237553,
      "endMs": 237723,
      "timestampMs": 237638,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 237723,
      "endMs": 237993,
      "timestampMs": 237858,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 237993,
      "endMs": 238213,
      "timestampMs": 238103,
      "confidence": null
    },
    {
      "text": " adding",
      "startMs": 238213,
      "endMs": 238593,
      "timestampMs": 238403,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 238593,
      "endMs": 238733,
      "timestampMs": 238663,
      "confidence": null
    },
    {
      "text": " saving",
      "startMs": 238733,
      "endMs": 239243,
      "timestampMs": 238988,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 239243,
      "endMs": 239473,
      "timestampMs": 239358,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 239473,
      "endMs": 239773,
      "timestampMs": 239623,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 240306,
      "endMs": 240446,
      "timestampMs": 240376,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 240446,
      "endMs": 240546,
      "timestampMs": 240496,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 240546,
      "endMs": 240686,
      "timestampMs": 240616,
      "confidence": null
    },
    {
      "text": " needed",
      "startMs": 240686,
      "endMs": 241026,
      "timestampMs": 240856,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 241026,
      "endMs": 241866,
      "timestampMs": 241446,
      "confidence": null
    },
    {
      "text": " approve",
      "startMs": 241866,
      "endMs": 242226,
      "timestampMs": 242046,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 242226,
      "endMs": 242524,
      "timestampMs": 242375,
      "confidence": null
    },
    {
      "text": " certs",
      "startMs": 242594,
      "endMs": 243214,
      "timestampMs": 242904,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 243612,
      "endMs": 243897,
      "timestampMs": 243754,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 244012,
      "endMs": 244807,
      "timestampMs": 244409,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 245092,
      "endMs": 245272,
      "timestampMs": 245182,
      "confidence": null
    },
    {
      "text": " login",
      "startMs": 245272,
      "endMs": 245692,
      "timestampMs": 245482,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 245692,
      "endMs": 245872,
      "timestampMs": 245782,
      "confidence": null
    },
    {
      "text": " password,",
      "startMs": 245872,
      "endMs": 246592,
      "timestampMs": 246232,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 246812,
      "endMs": 247012,
      "timestampMs": 246912,
      "confidence": null
    },
    {
      "text": " pop",
      "startMs": 247012,
      "endMs": 247352,
      "timestampMs": 247182,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 247352,
      "endMs": 247532,
      "timestampMs": 247442,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 247840,
      "endMs": 247940,
      "timestampMs": 247890,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 247940,
      "endMs": 248060,
      "timestampMs": 248000,
      "confidence": null
    },
    {
      "text": " prompt",
      "startMs": 248060,
      "endMs": 248380,
      "timestampMs": 248220,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 248380,
      "endMs": 248480,
      "timestampMs": 248430,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 248480,
      "endMs": 248640,
      "timestampMs": 248560,
      "confidence": null
    },
    {
      "text": " those",
      "startMs": 248640,
      "endMs": 248840,
      "timestampMs": 248740,
      "confidence": null
    },
    {
      "text": " things.",
      "startMs": 248840,
      "endMs": 249243,
      "timestampMs": 249041,
      "confidence": null
    },
    {
      "text": " Now",
      "startMs": 253250,
      "endMs": 253390,
      "timestampMs": 253320,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 253390,
      "endMs": 253530,
      "timestampMs": 253460,
      "confidence": null
    },
    {
      "text": " we've",
      "startMs": 253530,
      "endMs": 253770,
      "timestampMs": 253650,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 253770,
      "endMs": 253930,
      "timestampMs": 253850,
      "confidence": null
    },
    {
      "text": " them,",
      "startMs": 253930,
      "endMs": 254385,
      "timestampMs": 254158,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 254385,
      "endMs": 254558,
      "timestampMs": 254472,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 254558,
      "endMs": 254918,
      "timestampMs": 254738,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 254918,
      "endMs": 255138,
      "timestampMs": 255028,
      "confidence": null
    },
    {
      "text": " into",
      "startMs": 255138,
      "endMs": 255498,
      "timestampMs": 255318,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 255498,
      "endMs": 255618,
      "timestampMs": 255558,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 255618,
      "endMs": 255998,
      "timestampMs": 255808,
      "confidence": null
    },
    {
      "text": " menu",
      "startMs": 255998,
      "endMs": 256538,
      "timestampMs": 256268,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 257200,
      "endMs": 257300,
      "timestampMs": 257250,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 257300,
      "endMs": 257480,
      "timestampMs": 257390,
      "confidence": null
    },
    {
      "text": " want",
      "startMs": 257480,
      "endMs": 257760,
      "timestampMs": 257620,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 257760,
      "endMs": 258200,
      "timestampMs": 257980,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 258200,
      "endMs": 258340,
      "timestampMs": 258270,
      "confidence": null
    },
    {
      "text": " some",
      "startMs": 258340,
      "endMs": 258540,
      "timestampMs": 258440,
      "confidence": null
    },
    {
      "text": " testing,",
      "startMs": 258540,
      "endMs": 259155,
      "timestampMs": 258848,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 259155,
      "endMs": 259620,
      "timestampMs": 259388,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 259620,
      "endMs": 259940,
      "timestampMs": 259780,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 259940,
      "endMs": 260100,
      "timestampMs": 260020,
      "confidence": null
    },
    {
      "text": " select",
      "startMs": 260100,
      "endMs": 260600,
      "timestampMs": 260350,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 260600,
      "endMs": 260800,
      "timestampMs": 260700,
      "confidence": null
    },
    {
      "text": " whole",
      "startMs": 260800,
      "endMs": 261390,
      "timestampMs": 261095,
      "confidence": null
    },
    {
      "text": " Matrox,",
      "startMs": 261668,
      "endMs": 262448,
      "timestampMs": 262058,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 262668,
      "endMs": 262973,
      "timestampMs": 262821,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 263628,
      "endMs": 263728,
      "timestampMs": 263678,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 263728,
      "endMs": 264008,
      "timestampMs": 263868,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 264008,
      "endMs": 264248,
      "timestampMs": 264128,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 264248,
      "endMs": 264428,
      "timestampMs": 264338,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 264428,
      "endMs": 264548,
      "timestampMs": 264488,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 264548,
      "endMs": 264668,
      "timestampMs": 264608,
      "confidence": null
    },
    {
      "text": " whole",
      "startMs": 264668,
      "endMs": 264888,
      "timestampMs": 264778,
      "confidence": null
    },
    {
      "text": " switcher",
      "startMs": 264888,
      "endMs": 265308,
      "timestampMs": 265098,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 265308,
      "endMs": 265648,
      "timestampMs": 265478,
      "confidence": null
    },
    {
      "text": " At",
      "startMs": 265890,
      "endMs": 265940,
      "timestampMs": 265915,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 265920,
      "endMs": 266140,
      "timestampMs": 266030,
      "confidence": null
    },
    {
      "text": " point",
      "startMs": 266140,
      "endMs": 266380,
      "timestampMs": 266260,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 266380,
      "endMs": 266580,
      "timestampMs": 266480,
      "confidence": null
    },
    {
      "text": " wanted",
      "startMs": 266580,
      "endMs": 266913,
      "timestampMs": 266746,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 266953,
      "endMs": 267093,
      "timestampMs": 267023,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 267093,
      "endMs": 267293,
      "timestampMs": 267193,
      "confidence": null
    },
    {
      "text": " into",
      "startMs": 267293,
      "endMs": 267613,
      "timestampMs": 267453,
      "confidence": null
    },
    {
      "text": " each",
      "startMs": 267613,
      "endMs": 267833,
      "timestampMs": 267723,
      "confidence": null
    },
    {
      "text": " individual",
      "startMs": 267833,
      "endMs": 268433,
      "timestampMs": 268133,
      "confidence": null
    },
    {
      "text": " one,",
      "startMs": 268433,
      "endMs": 268553,
      "timestampMs": 268493,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 268553,
      "endMs": 268713,
      "timestampMs": 268633,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 268713,
      "endMs": 268953,
      "timestampMs": 268833,
      "confidence": null
    },
    {
      "text": " select",
      "startMs": 268953,
      "endMs": 269173,
      "timestampMs": 269063,
      "confidence": null
    },
    {
      "text": " them",
      "startMs": 269173,
      "endMs": 269353,
      "timestampMs": 269263,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 269353,
      "endMs": 269573,
      "timestampMs": 269463,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 269573,
      "endMs": 269828,
      "timestampMs": 269700,
      "confidence": null
    },
    {
      "text": " Again,",
      "startMs": 271830,
      "endMs": 272070,
      "timestampMs": 271950,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 272070,
      "endMs": 272170,
      "timestampMs": 272120,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 272170,
      "endMs": 272350,
      "timestampMs": 272260,
      "confidence": null
    },
    {
      "text": " come",
      "startMs": 272350,
      "endMs": 272570,
      "timestampMs": 272460,
      "confidence": null
    },
    {
      "text": " into",
      "startMs": 272570,
      "endMs": 272870,
      "timestampMs": 272720,
      "confidence": null
    },
    {
      "text": " activities",
      "startMs": 272870,
      "endMs": 273670,
      "timestampMs": 273270,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 274246,
      "endMs": 274526,
      "timestampMs": 274386,
      "confidence": null
    },
    {
      "text": " we'll",
      "startMs": 274526,
      "endMs": 274766,
      "timestampMs": 274646,
      "confidence": null
    },
    {
      "text": " want",
      "startMs": 274766,
      "endMs": 275026,
      "timestampMs": 274896,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 275026,
      "endMs": 275226,
      "timestampMs": 275126,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 275226,
      "endMs": 275681,
      "timestampMs": 275453,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 275789,
      "endMs": 275909,
      "timestampMs": 275849,
      "confidence": null
    },
    {
      "text": " switcher",
      "startMs": 275909,
      "endMs": 276569,
      "timestampMs": 276239,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 276817,
      "endMs": 276977,
      "timestampMs": 276897,
      "confidence": null
    },
    {
      "text": " encoders",
      "startMs": 276977,
      "endMs": 277617,
      "timestampMs": 277297,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 277617,
      "endMs": 277697,
      "timestampMs": 277657,
      "confidence": null
    },
    {
      "text": " decoders.",
      "startMs": 277697,
      "endMs": 278372,
      "timestampMs": 278035,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 278680,
      "endMs": 278800,
      "timestampMs": 278740,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 278800,
      "endMs": 278960,
      "timestampMs": 278880,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 278960,
      "endMs": 279100,
      "timestampMs": 279030,
      "confidence": null
    },
    {
      "text": " are,",
      "startMs": 279100,
      "endMs": 279280,
      "timestampMs": 279190,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 279280,
      "endMs": 279400,
      "timestampMs": 279340,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 279400,
      "endMs": 279835,
      "timestampMs": 279618,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 280108,
      "endMs": 280308,
      "timestampMs": 280208,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 280308,
      "endMs": 280358,
      "timestampMs": 280333,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 280308,
      "endMs": 280468,
      "timestampMs": 280388,
      "confidence": null
    },
    {
      "text": " encoders",
      "startMs": 280468,
      "endMs": 280888,
      "timestampMs": 280678,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 280888,
      "endMs": 280988,
      "timestampMs": 280938,
      "confidence": null
    },
    {
      "text": " decoders",
      "startMs": 280988,
      "endMs": 281568,
      "timestampMs": 281278,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 281568,
      "endMs": 281728,
      "timestampMs": 281648,
      "confidence": null
    },
    {
      "text": " set",
      "startMs": 281728,
      "endMs": 281988,
      "timestampMs": 281858,
      "confidence": null
    },
    {
      "text": " up.",
      "startMs": 281988,
      "endMs": 282303,
      "timestampMs": 282146,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 282510,
      "endMs": 282560,
      "timestampMs": 282535,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 282555,
      "endMs": 282655,
      "timestampMs": 282605,
      "confidence": null
    },
    {
      "text": " wanted",
      "startMs": 282655,
      "endMs": 282895,
      "timestampMs": 282775,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 282895,
      "endMs": 282995,
      "timestampMs": 282945,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 282995,
      "endMs": 283255,
      "timestampMs": 283125,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 283255,
      "endMs": 283475,
      "timestampMs": 283365,
      "confidence": null
    },
    {
      "text": " icon",
      "startMs": 283475,
      "endMs": 284070,
      "timestampMs": 283773,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 284355,
      "endMs": 284405,
      "timestampMs": 284380,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 284395,
      "endMs": 284535,
      "timestampMs": 284465,
      "confidence": null
    },
    {
      "text": " label,",
      "startMs": 284535,
      "endMs": 285015,
      "timestampMs": 284775,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 285015,
      "endMs": 285075,
      "timestampMs": 285045,
      "confidence": null
    },
    {
      "text": " would",
      "startMs": 285075,
      "endMs": 285235,
      "timestampMs": 285155,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 285235,
      "endMs": 285355,
      "timestampMs": 285295,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 285355,
      "endMs": 285555,
      "timestampMs": 285455,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 285555,
      "endMs": 285980,
      "timestampMs": 285767,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 285980,
      "endMs": 286030,
      "timestampMs": 286005,
      "confidence": null
    },
    {
      "text": " Let's",
      "startMs": 288750,
      "endMs": 288810,
      "timestampMs": 288780,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 288810,
      "endMs": 288950,
      "timestampMs": 288880,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 288950,
      "endMs": 289030,
      "timestampMs": 288990,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 289030,
      "endMs": 289150,
      "timestampMs": 289090,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 289150,
      "endMs": 289310,
      "timestampMs": 289230,
      "confidence": null
    },
    {
      "text": " user",
      "startMs": 289310,
      "endMs": 289530,
      "timestampMs": 289420,
      "confidence": null
    },
    {
      "text": " interface.",
      "startMs": 289530,
      "endMs": 290185,
      "timestampMs": 289857,
      "confidence": null
    },
    {
      "text": " Oh,",
      "startMs": 290550,
      "endMs": 290615,
      "timestampMs": 290583,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 290615,
      "endMs": 290755,
      "timestampMs": 290685,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 290755,
      "endMs": 290805,
      "timestampMs": 290780,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 290755,
      "endMs": 290955,
      "timestampMs": 290855,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 290955,
      "endMs": 291155,
      "timestampMs": 291055,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 291155,
      "endMs": 291315,
      "timestampMs": 291235,
      "confidence": null
    },
    {
      "text": " interface",
      "startMs": 291315,
      "endMs": 291795,
      "timestampMs": 291555,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 291795,
      "endMs": 291915,
      "timestampMs": 291855,
      "confidence": null
    },
    {
      "text": " changed",
      "startMs": 291915,
      "endMs": 292770,
      "timestampMs": 292343,
      "confidence": null
    },
    {
      "text": " from",
      "startMs": 292975,
      "endMs": 293315,
      "timestampMs": 293145,
      "confidence": null
    },
    {
      "text": " many",
      "startMs": 293495,
      "endMs": 294070,
      "timestampMs": 293783,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 294168,
      "endMs": 294533,
      "timestampMs": 294351,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 294533,
      "endMs": 294873,
      "timestampMs": 294703,
      "confidence": null
    },
    {
      "text": " output",
      "startMs": 295211,
      "endMs": 295676,
      "timestampMs": 295444,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 295676,
      "endMs": 295869,
      "timestampMs": 295773,
      "confidence": null
    },
    {
      "text": " many",
      "startMs": 295869,
      "endMs": 295919,
      "timestampMs": 295894,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 295869,
      "endMs": 296044,
      "timestampMs": 295957,
      "confidence": null
    },
    {
      "text": " many.",
      "startMs": 296044,
      "endMs": 296399,
      "timestampMs": 296222,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 296755,
      "endMs": 296958,
      "timestampMs": 296857,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 296993,
      "endMs": 297093,
      "timestampMs": 297043,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 297093,
      "endMs": 297433,
      "timestampMs": 297263,
      "confidence": null
    },
    {
      "text": " change",
      "startMs": 297716,
      "endMs": 298076,
      "timestampMs": 297896,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 298076,
      "endMs": 298356,
      "timestampMs": 298216,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 298356,
      "endMs": 298496,
      "timestampMs": 298426,
      "confidence": null
    },
    {
      "text": " by",
      "startMs": 298496,
      "endMs": 298696,
      "timestampMs": 298596,
      "confidence": null
    },
    {
      "text": " selecting",
      "startMs": 298696,
      "endMs": 299096,
      "timestampMs": 298896,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 299096,
      "endMs": 299176,
      "timestampMs": 299136,
      "confidence": null
    },
    {
      "text": " source",
      "startMs": 299176,
      "endMs": 299711,
      "timestampMs": 299444,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 300069,
      "endMs": 300169,
      "timestampMs": 300119,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 300169,
      "endMs": 300369,
      "timestampMs": 300269,
      "confidence": null
    },
    {
      "text": " selecting",
      "startMs": 300369,
      "endMs": 300789,
      "timestampMs": 300579,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 300789,
      "endMs": 300869,
      "timestampMs": 300829,
      "confidence": null
    },
    {
      "text": " display.",
      "startMs": 300869,
      "endMs": 301409,
      "timestampMs": 301139,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 301650,
      "endMs": 301700,
      "timestampMs": 301675,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 301690,
      "endMs": 301850,
      "timestampMs": 301770,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 301850,
      "endMs": 302150,
      "timestampMs": 302000,
      "confidence": null
    },
    {
      "text": " drag",
      "startMs": 302150,
      "endMs": 302510,
      "timestampMs": 302330,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 302510,
      "endMs": 302610,
      "timestampMs": 302560,
      "confidence": null
    },
    {
      "text": " drop",
      "startMs": 302610,
      "endMs": 302910,
      "timestampMs": 302760,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 302910,
      "endMs": 303375,
      "timestampMs": 303142,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 303966,
      "endMs": 304126,
      "timestampMs": 304046,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 304126,
      "endMs": 304326,
      "timestampMs": 304226,
      "confidence": null
    },
    {
      "text": " that.",
      "startMs": 304326,
      "endMs": 304696,
      "timestampMs": 304511,
      "confidence": null
    },
    {
      "text": " Also,",
      "startMs": 305015,
      "endMs": 305415,
      "timestampMs": 305215,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 305415,
      "endMs": 305515,
      "timestampMs": 305465,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 305515,
      "endMs": 305695,
      "timestampMs": 305605,
      "confidence": null
    },
    {
      "text": " select",
      "startMs": 305695,
      "endMs": 306370,
      "timestampMs": 306033,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 306638,
      "endMs": 306758,
      "timestampMs": 306698,
      "confidence": null
    },
    {
      "text": " source",
      "startMs": 306758,
      "endMs": 307273,
      "timestampMs": 307016,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 307398,
      "endMs": 307518,
      "timestampMs": 307458,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 307518,
      "endMs": 307698,
      "timestampMs": 307608,
      "confidence": null
    },
    {
      "text": " hit",
      "startMs": 307698,
      "endMs": 307858,
      "timestampMs": 307778,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 307858,
      "endMs": 308158,
      "timestampMs": 308008,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 308158,
      "endMs": 308338,
      "timestampMs": 308248,
      "confidence": null
    },
    {
      "text": " button,",
      "startMs": 308338,
      "endMs": 308753,
      "timestampMs": 308546,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 309018,
      "endMs": 309278,
      "timestampMs": 309148,
      "confidence": null
    },
    {
      "text": " navigate",
      "startMs": 309278,
      "endMs": 309818,
      "timestampMs": 309548,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 309818,
      "endMs": 310098,
      "timestampMs": 309958,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 310098,
      "endMs": 310318,
      "timestampMs": 310208,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 310318,
      "endMs": 310498,
      "timestampMs": 310408,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 310498,
      "endMs": 310618,
      "timestampMs": 310558,
      "confidence": null
    },
    {
      "text": " displays.",
      "startMs": 310618,
      "endMs": 311278,
      "timestampMs": 310948,
      "confidence": null
    },
    {
      "text": " again,",
      "startMs": 315250,
      "endMs": 315560,
      "timestampMs": 315405,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 315560,
      "endMs": 315700,
      "timestampMs": 315630,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 315700,
      "endMs": 315800,
      "timestampMs": 315750,
      "confidence": null
    },
    {
      "text": " want",
      "startMs": 315800,
      "endMs": 315940,
      "timestampMs": 315870,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 315940,
      "endMs": 316040,
      "timestampMs": 315990,
      "confidence": null
    },
    {
      "text": " make",
      "startMs": 316040,
      "endMs": 316260,
      "timestampMs": 316150,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 316260,
      "endMs": 316480,
      "timestampMs": 316370,
      "confidence": null
    },
    {
      "text": " changes,",
      "startMs": 316480,
      "endMs": 317180,
      "timestampMs": 316830,
      "confidence": null
    },
    {
      "text": " I'll",
      "startMs": 317520,
      "endMs": 317640,
      "timestampMs": 317580,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 317640,
      "endMs": 317915,
      "timestampMs": 317778,
      "confidence": null
    },
    {
      "text": " press",
      "startMs": 317960,
      "endMs": 318520,
      "timestampMs": 318240,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 318520,
      "endMs": 318680,
      "timestampMs": 318600,
      "confidence": null
    },
    {
      "text": " Setup",
      "startMs": 318680,
      "endMs": 319040,
      "timestampMs": 318860,
      "confidence": null
    },
    {
      "text": " button.",
      "startMs": 319040,
      "endMs": 319460,
      "timestampMs": 319250,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 319650,
      "endMs": 319750,
      "timestampMs": 319700,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 319750,
      "endMs": 319910,
      "timestampMs": 319830,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 319910,
      "endMs": 320010,
      "timestampMs": 319960,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 320010,
      "endMs": 320110,
      "timestampMs": 320060,
      "confidence": null
    },
    {
      "text": " wanted",
      "startMs": 320110,
      "endMs": 320450,
      "timestampMs": 320280,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 320450,
      "endMs": 320610,
      "timestampMs": 320530,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 320610,
      "endMs": 320890,
      "timestampMs": 320750,
      "confidence": null
    },
    {
      "text": " anything",
      "startMs": 320890,
      "endMs": 321450,
      "timestampMs": 321170,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 321450,
      "endMs": 321780,
      "timestampMs": 321615,
      "confidence": null
    },
    {
      "text": " look",
      "startMs": 321968,
      "endMs": 322148,
      "timestampMs": 322058,
      "confidence": null
    },
    {
      "text": " at",
      "startMs": 322148,
      "endMs": 322248,
      "timestampMs": 322198,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 322248,
      "endMs": 322508,
      "timestampMs": 322378,
      "confidence": null
    },
    {
      "text": " User",
      "startMs": 322508,
      "endMs": 322788,
      "timestampMs": 322648,
      "confidence": null
    },
    {
      "text": " Manual,",
      "startMs": 322788,
      "endMs": 323558,
      "timestampMs": 323173,
      "confidence": null
    },
    {
      "text": " review",
      "startMs": 323948,
      "endMs": 324288,
      "timestampMs": 324118,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 324288,
      "endMs": 324468,
      "timestampMs": 324378,
      "confidence": null
    },
    {
      "text": " Quick",
      "startMs": 324468,
      "endMs": 324728,
      "timestampMs": 324598,
      "confidence": null
    },
    {
      "text": " Start,",
      "startMs": 324728,
      "endMs": 325258,
      "timestampMs": 324993,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 325468,
      "endMs": 325568,
      "timestampMs": 325518,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 325568,
      "endMs": 325708,
      "timestampMs": 325638,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 325708,
      "endMs": 325788,
      "timestampMs": 325748,
      "confidence": null
    },
    {
      "text": " complete",
      "startMs": 325788,
      "endMs": 326208,
      "timestampMs": 325998,
      "confidence": null
    },
    {
      "text": " factory",
      "startMs": 326208,
      "endMs": 326628,
      "timestampMs": 326418,
      "confidence": null
    },
    {
      "text": " reset,",
      "startMs": 326628,
      "endMs": 327218,
      "timestampMs": 326923,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 327218,
      "endMs": 327468,
      "timestampMs": 327343,
      "confidence": null
    },
    {
      "text": " would",
      "startMs": 327468,
      "endMs": 327648,
      "timestampMs": 327558,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 327648,
      "endMs": 327808,
      "timestampMs": 327728,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 327808,
      "endMs": 328088,
      "timestampMs": 327948,
      "confidence": null
    },
    {
      "text": " from",
      "startMs": 328088,
      "endMs": 328408,
      "timestampMs": 328248,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 328408,
      "endMs": 328548,
      "timestampMs": 328478,
      "confidence": null
    },
    {
      "text": " Settings",
      "startMs": 328548,
      "endMs": 328978,
      "timestampMs": 328763,
      "confidence": null
    },
    {
      "text": " page.",
      "startMs": 329088,
      "endMs": 329288,
      "timestampMs": 329188,
      "confidence": null
    },
    {
      "text": " Thank",
      "startMs": 330750,
      "endMs": 330930,
      "timestampMs": 330840,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 330930,
      "endMs": 331110,
      "timestampMs": 331020,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 331110,
      "endMs": 331310,
      "timestampMs": 331210,
      "confidence": null
    },
    {
      "text": " your",
      "startMs": 331310,
      "endMs": 331510,
      "timestampMs": 331410,
      "confidence": null
    },
    {
      "text": " time.",
      "startMs": 331510,
      "endMs": 331855,
      "timestampMs": 331683,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 332170,
      "endMs": 332290,
      "timestampMs": 332230,
      "confidence": null
    },
    {
      "text": " hope",
      "startMs": 332290,
      "endMs": 332470,
      "timestampMs": 332380,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 332470,
      "endMs": 332650,
      "timestampMs": 332560,
      "confidence": null
    },
    {
      "text": " was",
      "startMs": 332650,
      "endMs": 332830,
      "timestampMs": 332740,
      "confidence": null
    },
    {
      "text": " informative.",
      "startMs": 332830,
      "endMs": 333495,
      "timestampMs": 333163,
      "confidence": null
    }
  ],
  "cues": {
    "welcome": [
      {
        "text": "Welcome",
        "ms": 265
      },
      {
        "text": "to",
        "ms": 725
      },
      {
        "text": "CTRLbot.",
        "ms": 845
      },
      {
        "text": "This",
        "ms": 2158
      },
      {
        "text": "will",
        "ms": 2298
      },
      {
        "text": "be",
        "ms": 2418
      },
      {
        "text": "a",
        "ms": 2458
      },
      {
        "text": "walkthrough",
        "ms": 2638
      },
      {
        "text": "of",
        "ms": 3478
      },
      {
        "text": "CTRLbot",
        "ms": 3698
      },
      {
        "text": "IoT,",
        "ms": 4358
      },
      {
        "text": "the",
        "ms": 4756
      },
      {
        "text": "Android",
        "ms": 5036
      },
      {
        "text": "app",
        "ms": 5776
      },
      {
        "text": "available",
        "ms": 6356
      },
      {
        "text": "for",
        "ms": 6796
      },
      {
        "text": "phone",
        "ms": 6996
      },
      {
        "text": "and",
        "ms": 7336
      },
      {
        "text": "tablets.",
        "ms": 7456
      }
    ],
    "first-run-intro": [
      {
        "text": "When",
        "ms": 11250
      },
      {
        "text": "you",
        "ms": 11400
      },
      {
        "text": "first",
        "ms": 11400
      },
      {
        "text": "open",
        "ms": 11660
      },
      {
        "text": "up",
        "ms": 11880
      },
      {
        "text": "the",
        "ms": 12040
      },
      {
        "text": "app,",
        "ms": 12280
      },
      {
        "text": "you're",
        "ms": 12460
      },
      {
        "text": "presented",
        "ms": 12780
      },
      {
        "text": "with",
        "ms": 13220
      },
      {
        "text": "a",
        "ms": 13420
      },
      {
        "text": "short",
        "ms": 13560
      },
      {
        "text": "walkthrough",
        "ms": 13860
      },
      {
        "text": "that'll",
        "ms": 14988
      },
      {
        "text": "help",
        "ms": 15248
      },
      {
        "text": "you",
        "ms": 15428
      },
      {
        "text": "navigate",
        "ms": 15588
      },
      {
        "text": "the",
        "ms": 16208
      },
      {
        "text": "application",
        "ms": 16428
      },
      {
        "text": "and",
        "ms": 17601
      },
      {
        "text": "set",
        "ms": 17761
      },
      {
        "text": "it",
        "ms": 17941
      },
      {
        "text": "up",
        "ms": 18041
      },
      {
        "text": "for",
        "ms": 18121
      },
      {
        "text": "control.",
        "ms": 18281
      }
    ],
    "first-run-tour": [
      {
        "text": "You",
        "ms": 18990
      },
      {
        "text": "can",
        "ms": 19050
      },
      {
        "text": "X",
        "ms": 20175
      },
      {
        "text": "out",
        "ms": 19410
      },
      {
        "text": "of",
        "ms": 19550
      },
      {
        "text": "this",
        "ms": 19650
      },
      {
        "text": "anytime,",
        "ms": 20533
      },
      {
        "text": "and",
        "ms": 21946
      },
      {
        "text": "you",
        "ms": 22266
      },
      {
        "text": "can",
        "ms": 22386
      },
      {
        "text": "get",
        "ms": 22506
      },
      {
        "text": "back",
        "ms": 22646
      },
      {
        "text": "into",
        "ms": 22906
      },
      {
        "text": "it",
        "ms": 23166
      },
      {
        "text": "through",
        "ms": 23266
      },
      {
        "text": "the",
        "ms": 23526
      },
      {
        "text": "setup",
        "ms": 23666
      },
      {
        "text": "page",
        "ms": 23986
      },
      {
        "text": "if",
        "ms": 24666
      },
      {
        "text": "you",
        "ms": 24771
      },
      {
        "text": "need",
        "ms": 24771
      },
      {
        "text": "to.",
        "ms": 24771
      }
    ],
    "ai-intro": [
      {
        "text": "The",
        "ms": 27750
      },
      {
        "text": "first",
        "ms": 27860
      },
      {
        "text": "thing",
        "ms": 28100
      },
      {
        "text": "you",
        "ms": 28300
      },
      {
        "text": "see",
        "ms": 28440
      },
      {
        "text": "is",
        "ms": 28820
      },
      {
        "text": "our",
        "ms": 28960
      },
      {
        "text": "CTRLbot",
        "ms": 29100
      },
      {
        "text": "AI.",
        "ms": 30693
      }
    ],
    "ai-troubleshooter": [
      {
        "text": "This",
        "ms": 31050
      },
      {
        "text": "is",
        "ms": 31240
      },
      {
        "text": "a",
        "ms": 31360
      },
      {
        "text": "walking,",
        "ms": 31440
      },
      {
        "text": "talking",
        "ms": 31880
      },
      {
        "text": "manual",
        "ms": 33103
      },
      {
        "text": "and",
        "ms": 34003
      },
      {
        "text": "troubleshooter.",
        "ms": 34443
      }
    ],
    "ai-help": [
      {
        "text": "It'll",
        "ms": 35480
      },
      {
        "text": "help",
        "ms": 35780
      },
      {
        "text": "you",
        "ms": 35960
      },
      {
        "text": "with",
        "ms": 36820
      },
      {
        "text": "setting",
        "ms": 37378
      },
      {
        "text": "up",
        "ms": 37658
      },
      {
        "text": "control",
        "ms": 37818
      },
      {
        "text": "and",
        "ms": 38716
      },
      {
        "text": "any",
        "ms": 39076
      },
      {
        "text": "issues",
        "ms": 39316
      },
      {
        "text": "you",
        "ms": 39776
      },
      {
        "text": "have",
        "ms": 39956
      },
      {
        "text": "with",
        "ms": 40396
      },
      {
        "text": "the",
        "ms": 40496
      },
      {
        "text": "room",
        "ms": 41004
      },
      {
        "text": "and",
        "ms": 41284
      },
      {
        "text": "operation.",
        "ms": 41424
      }
    ],
    "db-intro": [
      {
        "text": "It",
        "ms": 46290
      },
      {
        "text": "really",
        "ms": 46390
      },
      {
        "text": "begins",
        "ms": 46630
      },
      {
        "text": "with",
        "ms": 47430
      },
      {
        "text": "our",
        "ms": 47810
      },
      {
        "text": "device",
        "ms": 47950
      },
      {
        "text": "driver",
        "ms": 48753
      },
      {
        "text": "database.",
        "ms": 49213
      }
    ],
    "db-extensive": [
      {
        "text": "We",
        "ms": 50685
      },
      {
        "text": "have",
        "ms": 50805
      },
      {
        "text": "an",
        "ms": 50925
      },
      {
        "text": "extensive",
        "ms": 51025
      },
      {
        "text": "database",
        "ms": 51665
      }
    ],
    "db-commands": [
      {
        "text": "thousands",
        "ms": 52485
      },
      {
        "text": "of",
        "ms": 53045
      },
      {
        "text": "commands,",
        "ms": 53165
      },
      {
        "text": "control",
        "ms": 54105
      },
      {
        "text": "devices",
        "ms": 55225
      },
      {
        "text": "through",
        "ms": 55705
      },
      {
        "text": "IP,",
        "ms": 56005
      }
    ],
    "db-endpoints": [
      {
        "text": "or",
        "ms": 56990
      },
      {
        "text": "with",
        "ms": 57210
      },
      {
        "text": "an",
        "ms": 57430
      },
      {
        "text": "endpoint,",
        "ms": 57650
      },
      {
        "text": "you",
        "ms": 58290
      },
      {
        "text": "can",
        "ms": 58430
      },
      {
        "text": "control",
        "ms": 58690
      },
      {
        "text": "it",
        "ms": 59130
      },
      {
        "text": "with",
        "ms": 59130
      },
      {
        "text": "RS",
        "ms": 59450
      },
      {
        "text": "-232",
        "ms": 59650
      },
      {
        "text": "or",
        "ms": 60873
      },
      {
        "text": "IR.",
        "ms": 61293
      }
    ],
    "db-sit-network": [
      {
        "text": "Endpoints",
        "ms": 61890
      },
      {
        "text": "sit",
        "ms": 62930
      },
      {
        "text": "on",
        "ms": 63170
      },
      {
        "text": "the",
        "ms": 63250
      },
      {
        "text": "network",
        "ms": 63370
      },
      {
        "text": "and",
        "ms": 64170
      },
      {
        "text": "then",
        "ms": 64290
      },
      {
        "text": "they",
        "ms": 64450
      },
      {
        "text": "can",
        "ms": 64630
      },
      {
        "text": "convert",
        "ms": 64830
      },
      {
        "text": "IP",
        "ms": 65450
      },
      {
        "text": "to",
        "ms": 65758
      },
      {
        "text": "something",
        "ms": 66241
      },
      {
        "text": "else",
        "ms": 66641
      },
      {
        "text": "like",
        "ms": 66841
      },
      {
        "text": "serial",
        "ms": 67121
      },
      {
        "text": "or",
        "ms": 68021
      },
      {
        "text": "infrared.",
        "ms": 68401
      }
    ],
    "epson-select": [
      {
        "text": "Let's",
        "ms": 71250
      },
      {
        "text": "start",
        "ms": 71540
      },
      {
        "text": "by",
        "ms": 71780
      },
      {
        "text": "just",
        "ms": 72020
      },
      {
        "text": "adding",
        "ms": 72260
      },
      {
        "text": "a",
        "ms": 72580
      },
      {
        "text": "simple",
        "ms": 72700
      },
      {
        "text": "projector.",
        "ms": 73240
      }
    ],
    "epson-specs": [
      {
        "text": "When",
        "ms": 74160
      },
      {
        "text": "I",
        "ms": 74290
      },
      {
        "text": "select",
        "ms": 74390
      },
      {
        "text": "Epson,",
        "ms": 74790
      },
      {
        "text": "you",
        "ms": 75330
      },
      {
        "text": "can",
        "ms": 75470
      },
      {
        "text": "see",
        "ms": 75630
      },
      {
        "text": "it",
        "ms": 75830
      },
      {
        "text": "has",
        "ms": 75930
      },
      {
        "text": "lots",
        "ms": 76110
      },
      {
        "text": "of",
        "ms": 76270
      },
      {
        "text": "device",
        "ms": 76410
      },
      {
        "text": "information,",
        "ms": 76790
      },
      {
        "text": "specs,",
        "ms": 77843
      },
      {
        "text": "setup,",
        "ms": 78283
      },
      {
        "text": "support.",
        "ms": 78703
      }
    ],
    "epson-product-page": [
      {
        "text": "If",
        "ms": 79540
      },
      {
        "text": "you",
        "ms": 79610
      },
      {
        "text": "want",
        "ms": 79730
      },
      {
        "text": "to",
        "ms": 79890
      },
      {
        "text": "look",
        "ms": 79970
      },
      {
        "text": "at",
        "ms": 80230
      },
      {
        "text": "the",
        "ms": 80390
      },
      {
        "text": "product",
        "ms": 80550
      },
      {
        "text": "page",
        "ms": 80890
      },
      {
        "text": "or",
        "ms": 81530
      },
      {
        "text": "the",
        "ms": 81750
      },
      {
        "text": "manufacturer",
        "ms": 81890
      },
      {
        "text": "page,",
        "ms": 82570
      },
      {
        "text": "just",
        "ms": 83290
      },
      {
        "text": "click",
        "ms": 83490
      },
      {
        "text": "on",
        "ms": 83730
      },
      {
        "text": "this",
        "ms": 83830
      },
      {
        "text": "link",
        "ms": 84030
      }
    ],
    "add-ip": [
      {
        "text": "Simply",
        "ms": 86320
      },
      {
        "text": "press",
        "ms": 86768
      },
      {
        "text": "the",
        "ms": 87008
      },
      {
        "text": "plus",
        "ms": 87166
      },
      {
        "text": "button",
        "ms": 87486
      },
      {
        "text": "to",
        "ms": 87846
      },
      {
        "text": "add",
        "ms": 88066
      },
      {
        "text": "the",
        "ms": 88286
      },
      {
        "text": "device",
        "ms": 88406
      },
      {
        "text": "and",
        "ms": 89234
      },
      {
        "text": "then",
        "ms": 89314
      },
      {
        "text": "enter",
        "ms": 89514
      },
      {
        "text": "in",
        "ms": 89874
      },
      {
        "text": "the",
        "ms": 90014
      },
      {
        "text": "IP",
        "ms": 90094
      },
      {
        "text": "address.",
        "ms": 90214
      }
    ],
    "add-saved": [
      {
        "text": "Once",
        "ms": 90955
      },
      {
        "text": "I'm",
        "ms": 91095
      },
      {
        "text": "connected,",
        "ms": 91235
      },
      {
        "text": "it",
        "ms": 91835
      },
      {
        "text": "automatically",
        "ms": 91955
      },
      {
        "text": "saves",
        "ms": 92575
      },
      {
        "text": "this",
        "ms": 92915
      },
      {
        "text": "connection.",
        "ms": 93115
      }
    ],
    "term-testing": [
      {
        "text": "I",
        "ms": 95785
      },
      {
        "text": "can",
        "ms": 95865
      },
      {
        "text": "do",
        "ms": 96065
      },
      {
        "text": "some",
        "ms": 96265
      },
      {
        "text": "testing",
        "ms": 96445
      },
      {
        "text": "here",
        "ms": 96905
      },
      {
        "text": "by",
        "ms": 97535
      },
      {
        "text": "selecting",
        "ms": 98045
      },
      {
        "text": "some",
        "ms": 98465
      },
      {
        "text": "of",
        "ms": 98645
      },
      {
        "text": "these",
        "ms": 98745
      },
      {
        "text": "buttons",
        "ms": 98805
      },
      {
        "text": "And",
        "ms": 99430
      },
      {
        "text": "you",
        "ms": 99725
      },
      {
        "text": "can",
        "ms": 99845
      },
      {
        "text": "see",
        "ms": 100045
      },
      {
        "text": "the",
        "ms": 100665
      },
      {
        "text": "terminal",
        "ms": 100865
      },
      {
        "text": "shows",
        "ms": 101325
      },
      {
        "text": "that",
        "ms": 101705
      },
      {
        "text": "right",
        "ms": 101905
      },
      {
        "text": "there.",
        "ms": 102105
      }
    ],
    "term-message": [
      {
        "text": "If",
        "ms": 103040
      },
      {
        "text": "I",
        "ms": 103100
      },
      {
        "text": "needed",
        "ms": 103180
      },
      {
        "text": "to",
        "ms": 103420
      },
      {
        "text": "send",
        "ms": 103560
      },
      {
        "text": "something",
        "ms": 103820
      },
      {
        "text": "directly",
        "ms": 104488
      },
      {
        "text": "to",
        "ms": 104908
      },
      {
        "text": "it,",
        "ms": 105108
      },
      {
        "text": "I",
        "ms": 105608
      },
      {
        "text": "would",
        "ms": 105708
      },
      {
        "text": "just",
        "ms": 105788
      },
      {
        "text": "click",
        "ms": 105928
      },
      {
        "text": "on",
        "ms": 106188
      },
      {
        "text": "this",
        "ms": 106308
      },
      {
        "text": "and",
        "ms": 106908
      },
      {
        "text": "I",
        "ms": 107048
      },
      {
        "text": "can",
        "ms": 107128
      },
      {
        "text": "put",
        "ms": 107308
      },
      {
        "text": "in",
        "ms": 107568
      },
      {
        "text": "a",
        "ms": 108848
      },
      {
        "text": "message.",
        "ms": 108908
      }
    ],
    "test-saves": [
      {
        "text": "Xing",
        "ms": 111360
      },
      {
        "text": "out",
        "ms": 111740
      },
      {
        "text": "of",
        "ms": 112400
      },
      {
        "text": "this",
        "ms": 112580
      },
      {
        "text": "saves",
        "ms": 113183
      },
      {
        "text": "that",
        "ms": 113443
      },
      {
        "text": "connection.",
        "ms": 113603
      }
    ],
    "test-remote": [
      {
        "text": "And",
        "ms": 114250
      },
      {
        "text": "then",
        "ms": 114653
      },
      {
        "text": "you",
        "ms": 114773
      },
      {
        "text": "can",
        "ms": 114873
      },
      {
        "text": "come",
        "ms": 115053
      },
      {
        "text": "in",
        "ms": 115293
      },
      {
        "text": "and",
        "ms": 115873
      },
      {
        "text": "do",
        "ms": 116871
      },
      {
        "text": "more",
        "ms": 117051
      },
      {
        "text": "testing",
        "ms": 117251
      },
      {
        "text": "of",
        "ms": 118111
      },
      {
        "text": "it.",
        "ms": 118271
      }
    ],
    "test-webpage": [
      {
        "text": "You",
        "ms": 118720
      },
      {
        "text": "can",
        "ms": 118840
      },
      {
        "text": "use",
        "ms": 119080
      },
      {
        "text": "the",
        "ms": 119240
      },
      {
        "text": "buttons.",
        "ms": 119340
      },
      {
        "text": "You",
        "ms": 120500
      },
      {
        "text": "can",
        "ms": 120600
      },
      {
        "text": "test",
        "ms": 121093
      },
      {
        "text": "it",
        "ms": 121333
      },
      {
        "text": "as",
        "ms": 121433
      },
      {
        "text": "a",
        "ms": 121593
      },
      {
        "text": "switcher.",
        "ms": 121673
      },
      {
        "text": "You",
        "ms": 123211
      },
      {
        "text": "can",
        "ms": 123331
      },
      {
        "text": "go",
        "ms": 123471
      },
      {
        "text": "back",
        "ms": 123651
      },
      {
        "text": "to",
        "ms": 123811
      },
      {
        "text": "the",
        "ms": 123931
      },
      {
        "text": "terminal",
        "ms": 124051
      },
      {
        "text": "or",
        "ms": 125202
      },
      {
        "text": "you",
        "ms": 125282
      },
      {
        "text": "can",
        "ms": 125382
      },
      {
        "text": "access",
        "ms": 125562
      },
      {
        "text": "the",
        "ms": 126022
      },
      {
        "text": "device",
        "ms": 126242
      },
      {
        "text": "webpage",
        "ms": 126642
      },
      {
        "text": "if",
        "ms": 127102
      },
      {
        "text": "it",
        "ms": 127222
      },
      {
        "text": "has",
        "ms": 127302
      },
      {
        "text": "one.",
        "ms": 127727
      }
    ],
    "act-intro": [
      {
        "text": "Next,",
        "ms": 131285
      },
      {
        "text": "let's",
        "ms": 131585
      },
      {
        "text": "go",
        "ms": 131805
      },
      {
        "text": "to",
        "ms": 131985
      },
      {
        "text": "activities.",
        "ms": 132205
      }
    ],
    "act-setup": [
      {
        "text": "Activities",
        "ms": 133330
      },
      {
        "text": "are",
        "ms": 133870
      },
      {
        "text": "where",
        "ms": 133990
      },
      {
        "text": "you",
        "ms": 134190
      },
      {
        "text": "set",
        "ms": 134350
      },
      {
        "text": "up",
        "ms": 134630
      },
      {
        "text": "what",
        "ms": 135010
      },
      {
        "text": "the",
        "ms": 135310
      },
      {
        "text": "end",
        "ms": 135570
      },
      {
        "text": "user",
        "ms": 135750
      },
      {
        "text": "will",
        "ms": 136030
      },
      {
        "text": "see",
        "ms": 136250
      },
      {
        "text": "in",
        "ms": 136998
      },
      {
        "text": "the",
        "ms": 137178
      },
      {
        "text": "final",
        "ms": 137258
      },
      {
        "text": "unified",
        "ms": 138018
      },
      {
        "text": "user",
        "ms": 139096
      },
      {
        "text": "interface.",
        "ms": 139396
      }
    ],
    "act-power-on": [
      {
        "text": "And",
        "ms": 140365
      },
      {
        "text": "this",
        "ms": 140725
      },
      {
        "text": "builds",
        "ms": 140945
      },
      {
        "text": "itself.",
        "ms": 141305
      },
      {
        "text": "You",
        "ms": 141905
      },
      {
        "text": "can",
        "ms": 142045
      },
      {
        "text": "come",
        "ms": 142425
      },
      {
        "text": "in",
        "ms": 142705
      },
      {
        "text": "and",
        "ms": 142885
      },
      {
        "text": "you",
        "ms": 143025
      },
      {
        "text": "can",
        "ms": 143165
      },
      {
        "text": "see",
        "ms": 143385
      },
      {
        "text": "that",
        "ms": 143725
      },
      {
        "text": "Power",
        "ms": 144145
      },
      {
        "text": "On",
        "ms": 144585
      },
      {
        "text": "and",
        "ms": 144665
      },
      {
        "text": "already",
        "ms": 144845
      },
      {
        "text": "has",
        "ms": 145165
      },
      {
        "text": "the",
        "ms": 145525
      },
      {
        "text": "Epson",
        "ms": 145765
      },
      {
        "text": "power",
        "ms": 146145
      },
      {
        "text": "light",
        "ms": 146445
      },
      {
        "text": "power",
        "ms": 146985
      },
      {
        "text": "on",
        "ms": 147445
      },
      {
        "text": "command.",
        "ms": 148121
      }
    ],
    "switch-audio-setup": [
      {
        "text": "And",
        "ms": 152330
      },
      {
        "text": "the",
        "ms": 152470
      },
      {
        "text": "same",
        "ms": 152590
      },
      {
        "text": "with",
        "ms": 152770
      },
      {
        "text": "switcher,",
        "ms": 152950
      },
      {
        "text": "right?",
        "ms": 153590
      },
      {
        "text": "If",
        "ms": 153690
      },
      {
        "text": "you",
        "ms": 154090
      },
      {
        "text": "haven't",
        "ms": 154210
      },
      {
        "text": "added",
        "ms": 154490
      },
      {
        "text": "any",
        "ms": 154790
      },
      {
        "text": "other",
        "ms": 154970
      },
      {
        "text": "switchers,",
        "ms": 155190
      },
      {
        "text": "it'll",
        "ms": 155970
      },
      {
        "text": "use",
        "ms": 156310
      },
      {
        "text": "that",
        "ms": 156608
      },
      {
        "text": "Epson",
        "ms": 156968
      },
      {
        "text": "as",
        "ms": 157488
      },
      {
        "text": "the",
        "ms": 157708
      },
      {
        "text": "switcher",
        "ms": 157848
      },
      {
        "text": "and",
        "ms": 158621
      },
      {
        "text": "the",
        "ms": 158741
      },
      {
        "text": "same",
        "ms": 158861
      },
      {
        "text": "for",
        "ms": 159161
      },
      {
        "text": "audio,",
        "ms": 159421
      }
    ],
    "switch-audio-eui": [
      {
        "text": "If",
        "ms": 160055
      },
      {
        "text": "you",
        "ms": 160170
      },
      {
        "text": "need",
        "ms": 160330
      },
      {
        "text": "to",
        "ms": 160530
      },
      {
        "text": "do",
        "ms": 160610
      },
      {
        "text": "any",
        "ms": 160770
      },
      {
        "text": "customization,",
        "ms": 160950
      },
      {
        "text": "you",
        "ms": 161750
      },
      {
        "text": "can,",
        "ms": 161870
      },
      {
        "text": "but",
        "ms": 162668
      },
      {
        "text": "if",
        "ms": 162788
      },
      {
        "text": "not,",
        "ms": 162928
      },
      {
        "text": "you",
        "ms": 163206
      },
      {
        "text": "can",
        "ms": 163321
      },
      {
        "text": "go",
        "ms": 163321
      },
      {
        "text": "straight",
        "ms": 163521
      },
      {
        "text": "to",
        "ms": 164041
      },
      {
        "text": "the",
        "ms": 164574
      },
      {
        "text": "end",
        "ms": 164754
      },
      {
        "text": "user",
        "ms": 164994
      },
      {
        "text": "interface.",
        "ms": 165334
      }
    ],
    "eui-control": [
      {
        "text": "This",
        "ms": 169770
      },
      {
        "text": "is",
        "ms": 169990
      },
      {
        "text": "where",
        "ms": 170130
      },
      {
        "text": "you",
        "ms": 170938
      },
      {
        "text": "control",
        "ms": 171278
      },
      {
        "text": "the",
        "ms": 171778
      },
      {
        "text": "room.",
        "ms": 171778
      }
    ],
    "eui-screen": [
      {
        "text": "The",
        "ms": 172410
      },
      {
        "text": "person",
        "ms": 172470
      },
      {
        "text": "that",
        "ms": 172730
      },
      {
        "text": "walks",
        "ms": 172910
      },
      {
        "text": "in",
        "ms": 173410
      },
      {
        "text": "through",
        "ms": 173830
      },
      {
        "text": "the",
        "ms": 174090
      },
      {
        "text": "door",
        "ms": 174190
      },
      {
        "text": "and",
        "ms": 174670
      },
      {
        "text": "needs",
        "ms": 174943
      },
      {
        "text": "to",
        "ms": 175203
      },
      {
        "text": "use",
        "ms": 175383
      },
      {
        "text": "this",
        "ms": 175583
      },
      {
        "text": "space",
        "ms": 175703
      },
      {
        "text": "sees",
        "ms": 176783
      },
      {
        "text": "this",
        "ms": 177143
      },
      {
        "text": "interface",
        "ms": 177283
      },
      {
        "text": "and",
        "ms": 178436
      },
      {
        "text": "they",
        "ms": 178696
      },
      {
        "text": "can",
        "ms": 178856
      },
      {
        "text": "turn",
        "ms": 179016
      },
      {
        "text": "it",
        "ms": 179256
      },
      {
        "text": "on",
        "ms": 179516
      },
      {
        "text": "and",
        "ms": 180094
      },
      {
        "text": "then",
        "ms": 180214
      },
      {
        "text": "they",
        "ms": 180334
      },
      {
        "text": "can",
        "ms": 180454
      },
      {
        "text": "select",
        "ms": 180674
      },
      {
        "text": "sources",
        "ms": 181537
      },
      {
        "text": "to",
        "ms": 182197
      },
      {
        "text": "send",
        "ms": 182317
      },
      {
        "text": "to",
        "ms": 182677
      },
      {
        "text": "that",
        "ms": 182797
      },
      {
        "text": "Epson",
        "ms": 183277
      },
      {
        "text": "projector",
        "ms": 183935
      },
      {
        "text": "screen.",
        "ms": 184505
      }
    ],
    "eui-power": [
      {
        "text": "They",
        "ms": 185590
      },
      {
        "text": "can",
        "ms": 185680
      },
      {
        "text": "manipulate",
        "ms": 186180
      },
      {
        "text": "the",
        "ms": 187440
      },
      {
        "text": "audio",
        "ms": 187620
      },
      {
        "text": "and",
        "ms": 188891
      },
      {
        "text": "they",
        "ms": 189011
      },
      {
        "text": "can",
        "ms": 189071
      },
      {
        "text": "power",
        "ms": 189291
      },
      {
        "text": "the",
        "ms": 189671
      },
      {
        "text": "room",
        "ms": 189671
      },
      {
        "text": "off",
        "ms": 190191
      },
      {
        "text": "or",
        "ms": 190791
      },
      {
        "text": "on.",
        "ms": 191021
      }
    ],
    "exit-hold": [
      {
        "text": "If",
        "ms": 195305
      },
      {
        "text": "you",
        "ms": 195385
      },
      {
        "text": "need",
        "ms": 195505
      },
      {
        "text": "to",
        "ms": 195705
      },
      {
        "text": "make",
        "ms": 195825
      },
      {
        "text": "changes",
        "ms": 196045
      },
      {
        "text": "just",
        "ms": 197253
      },
      {
        "text": "press",
        "ms": 197473
      },
      {
        "text": "and",
        "ms": 197753
      },
      {
        "text": "hold",
        "ms": 197893
      },
      {
        "text": "the",
        "ms": 198113
      },
      {
        "text": "setup",
        "ms": 198233
      },
      {
        "text": "button",
        "ms": 198613
      },
      {
        "text": "and",
        "ms": 199401
      },
      {
        "text": "it'll",
        "ms": 199501
      },
      {
        "text": "take",
        "ms": 199661
      },
      {
        "text": "you",
        "ms": 199821
      },
      {
        "text": "back",
        "ms": 200021
      },
      {
        "text": "to",
        "ms": 200501
      },
      {
        "text": "these",
        "ms": 201001
      },
      {
        "text": "setup",
        "ms": 201201
      },
      {
        "text": "menus.",
        "ms": 201904
      }
    ],
    "discovery-intro": [
      {
        "text": "I'd",
        "ms": 205250
      },
      {
        "text": "like",
        "ms": 205250
      },
      {
        "text": "to",
        "ms": 205410
      },
      {
        "text": "show",
        "ms": 205530
      },
      {
        "text": "you",
        "ms": 205710
      },
      {
        "text": "a",
        "ms": 206450
      },
      {
        "text": "new",
        "ms": 206570
      },
      {
        "text": "feature",
        "ms": 207773
      },
      {
        "text": "it's",
        "ms": 208911
      },
      {
        "text": "called",
        "ms": 209131
      },
      {
        "text": "device",
        "ms": 209389
      },
      {
        "text": "discovery.",
        "ms": 209729
      }
    ],
    "discovery-scan": [
      {
        "text": "Basically",
        "ms": 210670
      },
      {
        "text": "it",
        "ms": 211170
      },
      {
        "text": "goes",
        "ms": 211170
      },
      {
        "text": "out",
        "ms": 211470
      },
      {
        "text": "and",
        "ms": 211850
      },
      {
        "text": "scans",
        "ms": 211990
      },
      {
        "text": "the",
        "ms": 212510
      },
      {
        "text": "network",
        "ms": 212610
      },
      {
        "text": "for",
        "ms": 213273
      },
      {
        "text": "any",
        "ms": 213513
      },
      {
        "text": "attached",
        "ms": 213753
      },
      {
        "text": "devices",
        "ms": 214193
      },
      {
        "text": "and",
        "ms": 215213
      },
      {
        "text": "then",
        "ms": 215313
      },
      {
        "text": "tries",
        "ms": 215473
      },
      {
        "text": "to",
        "ms": 215773
      },
      {
        "text": "make",
        "ms": 215933
      },
      {
        "text": "a",
        "ms": 216771
      },
      {
        "text": "connection",
        "ms": 216931
      },
      {
        "text": "to",
        "ms": 217919
      },
      {
        "text": "the",
        "ms": 218279
      },
      {
        "text": "device",
        "ms": 218499
      },
      {
        "text": "driver",
        "ms": 219147
      },
      {
        "text": "library.",
        "ms": 219970
      }
    ],
    "matrox-add-intro": [
      {
        "text": "So",
        "ms": 224810
      },
      {
        "text": "let's",
        "ms": 224990
      },
      {
        "text": "go",
        "ms": 225210
      },
      {
        "text": "ahead",
        "ms": 225370
      },
      {
        "text": "and",
        "ms": 225690
      },
      {
        "text": "add",
        "ms": 225870
      },
      {
        "text": "some",
        "ms": 226130
      },
      {
        "text": "endpoints",
        "ms": 226610
      },
      {
        "text": "from",
        "ms": 227538
      },
      {
        "text": "Matrox.",
        "ms": 227698
      },
      {
        "text": "These",
        "ms": 228778
      },
      {
        "text": "are",
        "ms": 229018
      },
      {
        "text": "IPMX",
        "ms": 229358
      },
      {
        "text": "encoders",
        "ms": 230511
      },
      {
        "text": "and",
        "ms": 231031
      },
      {
        "text": "decoders,",
        "ms": 231151
      }
    ],
    "matrox-add-saving": [
      {
        "text": "And",
        "ms": 232190
      },
      {
        "text": "what's",
        "ms": 232330
      },
      {
        "text": "happening",
        "ms": 232510
      },
      {
        "text": "behind",
        "ms": 232890
      },
      {
        "text": "the",
        "ms": 233210
      },
      {
        "text": "scenes",
        "ms": 233370
      },
      {
        "text": "is",
        "ms": 234273
      },
      {
        "text": "that",
        "ms": 234413
      },
      {
        "text": "it's",
        "ms": 234673
      },
      {
        "text": "actually",
        "ms": 234853
      },
      {
        "text": "making",
        "ms": 235573
      },
      {
        "text": "the",
        "ms": 235873
      },
      {
        "text": "connection,",
        "ms": 235993
      },
      {
        "text": "verifying",
        "ms": 236833
      },
      {
        "text": "it,",
        "ms": 237553
      },
      {
        "text": "and",
        "ms": 237723
      },
      {
        "text": "then",
        "ms": 237993
      },
      {
        "text": "adding",
        "ms": 238213
      },
      {
        "text": "and",
        "ms": 238593
      },
      {
        "text": "saving",
        "ms": 238733
      },
      {
        "text": "it,",
        "ms": 239243
      },
      {
        "text": "right?",
        "ms": 239473
      },
      {
        "text": "And",
        "ms": 240306
      },
      {
        "text": "if",
        "ms": 240446
      },
      {
        "text": "you",
        "ms": 240546
      },
      {
        "text": "needed",
        "ms": 240686
      },
      {
        "text": "to",
        "ms": 241026
      },
      {
        "text": "approve",
        "ms": 241866
      },
      {
        "text": "any",
        "ms": 242226
      },
      {
        "text": "certs",
        "ms": 242594
      },
      {
        "text": "or",
        "ms": 243612
      },
      {
        "text": "have",
        "ms": 244012
      },
      {
        "text": "a",
        "ms": 245092
      },
      {
        "text": "login",
        "ms": 245272
      },
      {
        "text": "and",
        "ms": 245692
      },
      {
        "text": "password,",
        "ms": 245872
      },
      {
        "text": "it'll",
        "ms": 246812
      },
      {
        "text": "pop",
        "ms": 247012
      },
      {
        "text": "up",
        "ms": 247352
      },
      {
        "text": "and",
        "ms": 247840
      },
      {
        "text": "it'll",
        "ms": 247940
      },
      {
        "text": "prompt",
        "ms": 248060
      },
      {
        "text": "you",
        "ms": 248380
      },
      {
        "text": "for",
        "ms": 248480
      },
      {
        "text": "those",
        "ms": 248640
      },
      {
        "text": "things.",
        "ms": 248840
      }
    ],
    "matrox-test-menu": [
      {
        "text": "Now",
        "ms": 253250
      },
      {
        "text": "that",
        "ms": 253390
      },
      {
        "text": "we've",
        "ms": 253530
      },
      {
        "text": "added",
        "ms": 253770
      },
      {
        "text": "them,",
        "ms": 253930
      },
      {
        "text": "we",
        "ms": 254385
      },
      {
        "text": "can",
        "ms": 254558
      },
      {
        "text": "come",
        "ms": 254918
      },
      {
        "text": "into",
        "ms": 255138
      },
      {
        "text": "the",
        "ms": 255498
      },
      {
        "text": "connect",
        "ms": 255618
      },
      {
        "text": "menu",
        "ms": 255998
      }
    ],
    "matrox-test-switcher": [
      {
        "text": "if",
        "ms": 257200
      },
      {
        "text": "we",
        "ms": 257300
      },
      {
        "text": "want",
        "ms": 257480
      },
      {
        "text": "to",
        "ms": 257760
      },
      {
        "text": "do",
        "ms": 258200
      },
      {
        "text": "some",
        "ms": 258340
      },
      {
        "text": "testing,",
        "ms": 258540
      },
      {
        "text": "we",
        "ms": 259155
      },
      {
        "text": "can",
        "ms": 259620
      },
      {
        "text": "just",
        "ms": 259940
      },
      {
        "text": "select",
        "ms": 260100
      },
      {
        "text": "the",
        "ms": 260600
      },
      {
        "text": "whole",
        "ms": 260800
      },
      {
        "text": "Matrox,",
        "ms": 261668
      },
      {
        "text": "right?",
        "ms": 262668
      },
      {
        "text": "And",
        "ms": 263628
      },
      {
        "text": "then",
        "ms": 263728
      },
      {
        "text": "you",
        "ms": 264008
      },
      {
        "text": "will",
        "ms": 264248
      },
      {
        "text": "have",
        "ms": 264428
      },
      {
        "text": "the",
        "ms": 264548
      },
      {
        "text": "whole",
        "ms": 264668
      },
      {
        "text": "switcher",
        "ms": 264888
      },
      {
        "text": "here.",
        "ms": 265308
      }
    ],
    "matrox-test-single": [
      {
        "text": "At",
        "ms": 265890
      },
      {
        "text": "any",
        "ms": 265920
      },
      {
        "text": "point",
        "ms": 266140
      },
      {
        "text": "you",
        "ms": 266380
      },
      {
        "text": "wanted",
        "ms": 266580
      },
      {
        "text": "to",
        "ms": 266953
      },
      {
        "text": "go",
        "ms": 267093
      },
      {
        "text": "into",
        "ms": 267293
      },
      {
        "text": "each",
        "ms": 267613
      },
      {
        "text": "individual",
        "ms": 267833
      },
      {
        "text": "one,",
        "ms": 268433
      },
      {
        "text": "you",
        "ms": 268553
      },
      {
        "text": "just",
        "ms": 268713
      },
      {
        "text": "select",
        "ms": 268953
      },
      {
        "text": "them",
        "ms": 269173
      },
      {
        "text": "right",
        "ms": 269353
      },
      {
        "text": "here.",
        "ms": 269573
      }
    ],
    "matrox-switch-menu": [
      {
        "text": "Again,",
        "ms": 271830
      },
      {
        "text": "we",
        "ms": 272070
      },
      {
        "text": "can",
        "ms": 272170
      },
      {
        "text": "come",
        "ms": 272350
      },
      {
        "text": "into",
        "ms": 272570
      },
      {
        "text": "activities",
        "ms": 272870
      },
      {
        "text": "and",
        "ms": 274246
      },
      {
        "text": "we'll",
        "ms": 274526
      },
      {
        "text": "want",
        "ms": 274766
      },
      {
        "text": "to",
        "ms": 275026
      },
      {
        "text": "set",
        "ms": 275226
      },
      {
        "text": "the",
        "ms": 275789
      },
      {
        "text": "switcher",
        "ms": 275909
      },
      {
        "text": "to",
        "ms": 276817
      },
      {
        "text": "encoders",
        "ms": 276977
      },
      {
        "text": "and",
        "ms": 277617
      },
      {
        "text": "decoders.",
        "ms": 277697
      }
    ],
    "matrox-switch-setup": [
      {
        "text": "And",
        "ms": 278680
      },
      {
        "text": "here",
        "ms": 278800
      },
      {
        "text": "we",
        "ms": 278960
      },
      {
        "text": "are,",
        "ms": 279100
      },
      {
        "text": "we",
        "ms": 279280
      },
      {
        "text": "have",
        "ms": 279400
      },
      {
        "text": "all",
        "ms": 280108
      },
      {
        "text": "of",
        "ms": 280308
      },
      {
        "text": "our",
        "ms": 280308
      },
      {
        "text": "encoders",
        "ms": 280468
      },
      {
        "text": "and",
        "ms": 280888
      },
      {
        "text": "decoders",
        "ms": 280988
      },
      {
        "text": "all",
        "ms": 281568
      },
      {
        "text": "set",
        "ms": 281728
      },
      {
        "text": "up.",
        "ms": 281988
      }
    ],
    "matrox-switch-labels": [
      {
        "text": "If",
        "ms": 282510
      },
      {
        "text": "I",
        "ms": 282555
      },
      {
        "text": "wanted",
        "ms": 282655
      },
      {
        "text": "to",
        "ms": 282895
      },
      {
        "text": "change",
        "ms": 282995
      },
      {
        "text": "the",
        "ms": 283255
      },
      {
        "text": "icon",
        "ms": 283475
      },
      {
        "text": "or",
        "ms": 284355
      },
      {
        "text": "the",
        "ms": 284395
      },
      {
        "text": "label,",
        "ms": 284535
      },
      {
        "text": "I",
        "ms": 285015
      },
      {
        "text": "would",
        "ms": 285075
      },
      {
        "text": "do",
        "ms": 285235
      },
      {
        "text": "that",
        "ms": 285355
      },
      {
        "text": "right",
        "ms": 285555
      },
      {
        "text": "here.",
        "ms": 285980
      }
    ],
    "m2m-intro": [
      {
        "text": "Let's",
        "ms": 288750
      },
      {
        "text": "go",
        "ms": 288810
      },
      {
        "text": "to",
        "ms": 288950
      },
      {
        "text": "the",
        "ms": 289030
      },
      {
        "text": "end",
        "ms": 289150
      },
      {
        "text": "user",
        "ms": 289310
      },
      {
        "text": "interface.",
        "ms": 289530
      }
    ],
    "m2m-displays": [
      {
        "text": "Oh,",
        "ms": 290550
      },
      {
        "text": "you",
        "ms": 290615
      },
      {
        "text": "can",
        "ms": 290755
      },
      {
        "text": "see",
        "ms": 290755
      },
      {
        "text": "now",
        "ms": 290955
      },
      {
        "text": "our",
        "ms": 291155
      },
      {
        "text": "interface",
        "ms": 291315
      },
      {
        "text": "has",
        "ms": 291795
      },
      {
        "text": "changed",
        "ms": 291915
      },
      {
        "text": "from",
        "ms": 292975
      },
      {
        "text": "many",
        "ms": 293495
      },
      {
        "text": "to",
        "ms": 294168
      },
      {
        "text": "one",
        "ms": 294533
      },
      {
        "text": "output",
        "ms": 295211
      },
      {
        "text": "to",
        "ms": 295676
      },
      {
        "text": "many",
        "ms": 295869
      },
      {
        "text": "to",
        "ms": 295869
      },
      {
        "text": "many.",
        "ms": 296044
      }
    ],
    "m2m-drag": [
      {
        "text": "And",
        "ms": 296755
      },
      {
        "text": "I",
        "ms": 296993
      },
      {
        "text": "can",
        "ms": 297093
      },
      {
        "text": "change",
        "ms": 297716
      },
      {
        "text": "these",
        "ms": 298076
      },
      {
        "text": "just",
        "ms": 298356
      },
      {
        "text": "by",
        "ms": 298496
      },
      {
        "text": "selecting",
        "ms": 298696
      },
      {
        "text": "a",
        "ms": 299096
      },
      {
        "text": "source",
        "ms": 299176
      },
      {
        "text": "and",
        "ms": 300069
      },
      {
        "text": "then",
        "ms": 300169
      },
      {
        "text": "selecting",
        "ms": 300369
      },
      {
        "text": "a",
        "ms": 300789
      },
      {
        "text": "display.",
        "ms": 300869
      }
    ],
    "m2m-drop": [
      {
        "text": "I",
        "ms": 301650
      },
      {
        "text": "can",
        "ms": 301690
      },
      {
        "text": "also",
        "ms": 301850
      },
      {
        "text": "drag",
        "ms": 302150
      },
      {
        "text": "and",
        "ms": 302510
      },
      {
        "text": "drop",
        "ms": 302610
      },
      {
        "text": "these",
        "ms": 302910
      },
      {
        "text": "in",
        "ms": 303966
      },
      {
        "text": "like",
        "ms": 304126
      },
      {
        "text": "that.",
        "ms": 304326
      }
    ],
    "m2m-all": [
      {
        "text": "Also,",
        "ms": 305015
      },
      {
        "text": "if",
        "ms": 305415
      },
      {
        "text": "you",
        "ms": 305515
      },
      {
        "text": "select",
        "ms": 305695
      },
      {
        "text": "a",
        "ms": 306638
      },
      {
        "text": "source",
        "ms": 306758
      },
      {
        "text": "and",
        "ms": 307398
      },
      {
        "text": "then",
        "ms": 307518
      },
      {
        "text": "hit",
        "ms": 307698
      },
      {
        "text": "this",
        "ms": 307858
      },
      {
        "text": "all",
        "ms": 308158
      },
      {
        "text": "button,",
        "ms": 308338
      },
      {
        "text": "it'll",
        "ms": 309018
      },
      {
        "text": "navigate",
        "ms": 309278
      },
      {
        "text": "that",
        "ms": 309818
      },
      {
        "text": "to",
        "ms": 310098
      },
      {
        "text": "all",
        "ms": 310318
      },
      {
        "text": "the",
        "ms": 310498
      },
      {
        "text": "displays.",
        "ms": 310618
      }
    ],
    "settings-setup": [
      {
        "text": "again,",
        "ms": 315250
      },
      {
        "text": "if",
        "ms": 315560
      },
      {
        "text": "I",
        "ms": 315700
      },
      {
        "text": "want",
        "ms": 315800
      },
      {
        "text": "to",
        "ms": 315940
      },
      {
        "text": "make",
        "ms": 316040
      },
      {
        "text": "any",
        "ms": 316260
      },
      {
        "text": "changes,",
        "ms": 316480
      },
      {
        "text": "I'll",
        "ms": 317520
      },
      {
        "text": "just",
        "ms": 317640
      },
      {
        "text": "press",
        "ms": 317960
      },
      {
        "text": "the",
        "ms": 318520
      },
      {
        "text": "Setup",
        "ms": 318680
      },
      {
        "text": "button.",
        "ms": 319040
      }
    ],
    "settings-support": [
      {
        "text": "And",
        "ms": 319650
      },
      {
        "text": "then",
        "ms": 319750
      },
      {
        "text": "if",
        "ms": 319910
      },
      {
        "text": "I",
        "ms": 320010
      },
      {
        "text": "wanted",
        "ms": 320110
      },
      {
        "text": "to",
        "ms": 320450
      },
      {
        "text": "do",
        "ms": 320610
      },
      {
        "text": "anything",
        "ms": 320890
      },
      {
        "text": "like",
        "ms": 321450
      },
      {
        "text": "look",
        "ms": 321968
      },
      {
        "text": "at",
        "ms": 322148
      },
      {
        "text": "the",
        "ms": 322248
      },
      {
        "text": "User",
        "ms": 322508
      },
      {
        "text": "Manual,",
        "ms": 322788
      },
      {
        "text": "review",
        "ms": 323948
      },
      {
        "text": "the",
        "ms": 324288
      },
      {
        "text": "Quick",
        "ms": 324468
      },
      {
        "text": "Start,",
        "ms": 324728
      },
      {
        "text": "or",
        "ms": 325468
      },
      {
        "text": "do",
        "ms": 325568
      },
      {
        "text": "a",
        "ms": 325708
      },
      {
        "text": "complete",
        "ms": 325788
      },
      {
        "text": "factory",
        "ms": 326208
      },
      {
        "text": "reset,",
        "ms": 326628
      },
      {
        "text": "I",
        "ms": 327218
      },
      {
        "text": "would",
        "ms": 327468
      },
      {
        "text": "do",
        "ms": 327648
      },
      {
        "text": "that",
        "ms": 327808
      },
      {
        "text": "from",
        "ms": 328088
      },
      {
        "text": "the",
        "ms": 328408
      },
      {
        "text": "Settings",
        "ms": 328548
      },
      {
        "text": "page.",
        "ms": 329088
      }
    ],
    "close-thanks": [
      {
        "text": "Thank",
        "ms": 330750
      },
      {
        "text": "you",
        "ms": 330930
      },
      {
        "text": "for",
        "ms": 331110
      },
      {
        "text": "your",
        "ms": 331310
      },
      {
        "text": "time.",
        "ms": 331510
      }
    ],
    "close-hope": [
      {
        "text": "I",
        "ms": 332170
      },
      {
        "text": "hope",
        "ms": 332290
      },
      {
        "text": "this",
        "ms": 332470
      },
      {
        "text": "was",
        "ms": 332650
      },
      {
        "text": "informative.",
        "ms": 332830
      }
    ]
  }
};

export const IOT_PHONE_EDIT = NARRATION_EDIT;

