// Written by `npm run narration:edit`. Do not edit; change src/marketing/iot-latest-features/iotLatestFeaturesNarration.ts and rebuild.

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
  "src": "narration/iot-latest-features/edit.m4a",
  "seconds": 136,
  "clips": [
    {
      "id": "welcome",
      "at": 0.35,
      "start": 1.285,
      "end": 14.285,
      "seconds": 10.532,
      "removed": [
        {
          "from": 6.22,
          "to": 6.74,
          "kind": "filler",
          "heard": "uh"
        },
        {
          "from": 9.48,
          "to": 9.93,
          "kind": "repeat",
          "heard": "and"
        },
        {
          "from": 11.99,
          "to": 12.46,
          "kind": "extra",
          "heard": "our"
        }
      ]
    },
    {
      "id": "net-category",
      "at": 12.25,
      "start": 39.825,
      "end": 45.62,
      "seconds": 5.283,
      "removed": [
        {
          "from": 42.455,
          "to": 42.46,
          "kind": "filler",
          "heard": "Uh,"
        },
        {
          "from": 42.48,
          "to": 42.94,
          "kind": "filler",
          "heard": "Uh,"
        }
      ]
    },
    {
      "id": "avoip-more",
      "at": 19.25,
      "start": 57.245,
      "end": 61.33,
      "seconds": 4.085,
      "removed": []
    },
    {
      "id": "avoip-brands",
      "at": 23.61,
      "start": 71.73,
      "end": 79.36,
      "seconds": 6.347,
      "removed": [
        {
          "from": 73.735,
          "to": 74.035,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 76.845,
          "to": 77.11,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 77.46,
          "to": 77.715,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 77.985,
          "to": 78.4,
          "kind": "extra",
          "heard": "m"
        }
      ]
    },
    {
      "id": "gc-models",
      "at": 30.875,
      "start": 79.975,
      "end": 95.21,
      "seconds": 11.65,
      "removed": [
        {
          "from": 82.9,
          "to": 83.41,
          "kind": "filler",
          "heard": "uh,"
        },
        {
          "from": 83.455,
          "to": 83.775,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 85.245,
          "to": 85.515,
          "kind": "extra",
          "heard": "t"
        },
        {
          "from": 85.685,
          "to": 86.05,
          "kind": "extra",
          "heard": "to"
        },
        {
          "from": 86.175,
          "to": 86.5,
          "kind": "filler",
          "heard": "um"
        },
        {
          "from": 86.62,
          "to": 86.83,
          "kind": "extra",
          "heard": "i"
        },
        {
          "from": 88.56,
          "to": 88.68,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 91.155,
          "to": 91.34,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 92.41,
          "to": 92.825,
          "kind": "extra",
          "heard": "om"
        },
        {
          "from": 92.925,
          "to": 93.145,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "pusr",
      "at": 44.25,
      "start": 97.66,
      "end": 114.38,
      "seconds": 13.179,
      "removed": [
        {
          "from": 99.555,
          "to": 99.705,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 100.965,
          "to": 101.17,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 102.67,
          "to": 103.08,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 104.01,
          "to": 104.48,
          "kind": "extra",
          "heard": "om"
        },
        {
          "from": 106.08,
          "to": 106.375,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 107.32,
          "to": 107.685,
          "kind": "filler",
          "heard": "uh"
        },
        {
          "from": 107.83,
          "to": 108.085,
          "kind": "filler",
          "heard": "Uh"
        },
        {
          "from": 111.93,
          "to": 112.205,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 112.565,
          "to": 112.895,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "disc-corner",
      "at": 58.74,
      "start": 141.59,
      "end": 144.22,
      "seconds": 2.63,
      "removed": []
    },
    {
      "id": "disc-click",
      "at": 61.68,
      "start": 164.8,
      "end": 170.25,
      "seconds": 4.121,
      "removed": [
        {
          "from": 166.86,
          "to": 167.185,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 168.15,
          "to": 168.53,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 168.765,
          "to": 169.015,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "rs-acer",
      "at": 66.92,
      "start": 206.72,
      "end": 211.45,
      "seconds": 4.73,
      "removed": []
    },
    {
      "id": "rs-endpoint",
      "at": 72.205,
      "start": 219.175,
      "end": 223.97,
      "seconds": 3.768,
      "removed": []
    },
    {
      "id": "rs-terminal",
      "at": 76.35,
      "start": 227.685,
      "end": 230.805,
      "seconds": 3.12,
      "removed": []
    },
    {
      "id": "rs-layout",
      "at": 79.77,
      "start": 231.14,
      "end": 238.77,
      "seconds": 5.948,
      "removed": [
        {
          "from": 231.555,
          "to": 231.69,
          "kind": "extra",
          "heard": "that"
        },
        {
          "from": 233.685,
          "to": 233.935,
          "kind": "extra",
          "heard": "ba"
        },
        {
          "from": 234.92,
          "to": 235.235,
          "kind": "extra",
          "heard": "a"
        },
        {
          "from": 235.88,
          "to": 236.17,
          "kind": "extra",
          "heard": "youknow"
        },
        {
          "from": 236.595,
          "to": 236.91,
          "kind": "filler",
          "heard": "uh..."
        }
      ]
    },
    {
      "id": "term-open",
      "at": 86.75,
      "start": 277.56,
      "end": 280.26,
      "seconds": 2.423,
      "removed": [
        {
          "from": 278.395,
          "to": 278.66,
          "kind": "extra",
          "heard": "temrc"
        }
      ]
    },
    {
      "id": "term-send",
      "at": 89.47,
      "start": 284.275,
      "end": 288.38,
      "seconds": 4.105,
      "removed": []
    },
    {
      "id": "web",
      "at": 95.25,
      "start": 304.33,
      "end": 311.6,
      "seconds": 6.763,
      "removed": [
        {
          "from": 308.11,
          "to": 308.23,
          "kind": "noise",
          "heard": ""
        },
        {
          "from": 308.36,
          "to": 308.605,
          "kind": "extra",
          "heard": "ah"
        }
      ]
    },
    {
      "id": "msg",
      "at": 103.75,
      "start": 341.31,
      "end": 344.45,
      "seconds": 2.621,
      "removed": [
        {
          "from": 343.095,
          "to": 343.555,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "eui-drag",
      "at": 109.215,
      "start": 372.915,
      "end": 379.51,
      "seconds": 5.706,
      "removed": [
        {
          "from": 375.035,
          "to": 375.18,
          "kind": "extra",
          "heard": "i"
        },
        {
          "from": 376.53,
          "to": 376.865,
          "kind": "extra",
          "heard": "i"
        },
        {
          "from": 377.025,
          "to": 377.16,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "eui-all",
      "at": 115.26,
      "start": 389.47,
      "end": 393.835,
      "seconds": 4.113,
      "removed": [
        {
          "from": 391.055,
          "to": 391.215,
          "kind": "extra",
          "heard": "a"
        }
      ]
    },
    {
      "id": "power-x",
      "at": 120.75,
      "start": 396.185,
      "end": 403.86,
      "seconds": 7.675,
      "removed": []
    },
    {
      "id": "power-message",
      "at": 128.7,
      "start": 407.74,
      "end": 409.82,
      "seconds": 2.08,
      "removed": []
    },
    {
      "id": "thanks",
      "at": 132.25,
      "start": 411.995,
      "end": 412.96,
      "seconds": 0.965,
      "removed": []
    }
  ],
  "words": [
    {
      "text": " Welcome",
      "startMs": 395,
      "endMs": 915,
      "timestampMs": 655,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 915,
      "endMs": 1075,
      "timestampMs": 995,
      "confidence": null
    },
    {
      "text": " CTRLbot.",
      "startMs": 1075,
      "endMs": 1765,
      "timestampMs": 1420,
      "confidence": null
    },
    {
      "text": " This",
      "startMs": 2478,
      "endMs": 2658,
      "timestampMs": 2568,
      "confidence": null
    },
    {
      "text": " will",
      "startMs": 2658,
      "endMs": 2838,
      "timestampMs": 2748,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 2838,
      "endMs": 3308,
      "timestampMs": 3073,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 3698,
      "endMs": 3938,
      "timestampMs": 3818,
      "confidence": null
    },
    {
      "text": " short",
      "startMs": 3938,
      "endMs": 4313,
      "timestampMs": 4126,
      "confidence": null
    },
    {
      "text": " walkthrough",
      "startMs": 4581,
      "endMs": 5416,
      "timestampMs": 4999,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 5501,
      "endMs": 5681,
      "timestampMs": 5591,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 5681,
      "endMs": 5821,
      "timestampMs": 5751,
      "confidence": null
    },
    {
      "text": " latest",
      "startMs": 5821,
      "endMs": 6221,
      "timestampMs": 6021,
      "confidence": null
    },
    {
      "text": " features",
      "startMs": 6221,
      "endMs": 6996,
      "timestampMs": 6609,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 7179,
      "endMs": 7339,
      "timestampMs": 7259,
      "confidence": null
    },
    {
      "text": " benefits",
      "startMs": 7339,
      "endMs": 8199,
      "timestampMs": 7769,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 8659,
      "endMs": 8999,
      "timestampMs": 8829,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 9167,
      "endMs": 9287,
      "timestampMs": 9227,
      "confidence": null
    },
    {
      "text": " CTRLbot",
      "startMs": 9287,
      "endMs": 10027,
      "timestampMs": 9657,
      "confidence": null
    },
    {
      "text": " IoT",
      "startMs": 10027,
      "endMs": 10647,
      "timestampMs": 10337,
      "confidence": null
    },
    {
      "text": " app",
      "startMs": 10647,
      "endMs": 10842,
      "timestampMs": 10745,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 12275,
      "endMs": 12395,
      "timestampMs": 12335,
      "confidence": null
    },
    {
      "text": " what",
      "startMs": 12395,
      "endMs": 12875,
      "timestampMs": 12635,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 12875,
      "endMs": 13015,
      "timestampMs": 12945,
      "confidence": null
    },
    {
      "text": " did",
      "startMs": 13015,
      "endMs": 13195,
      "timestampMs": 13105,
      "confidence": null
    },
    {
      "text": " was",
      "startMs": 13195,
      "endMs": 13395,
      "timestampMs": 13295,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 13395,
      "endMs": 13695,
      "timestampMs": 13545,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 13695,
      "endMs": 14525,
      "timestampMs": 14110,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 14983,
      "endMs": 15063,
      "timestampMs": 15023,
      "confidence": null
    },
    {
      "text": " new",
      "startMs": 15063,
      "endMs": 15243,
      "timestampMs": 15153,
      "confidence": null
    },
    {
      "text": " category",
      "startMs": 15243,
      "endMs": 15953,
      "timestampMs": 15598,
      "confidence": null
    },
    {
      "text": " called",
      "startMs": 16023,
      "endMs": 16543,
      "timestampMs": 16283,
      "confidence": null
    },
    {
      "text": " network",
      "startMs": 16703,
      "endMs": 17063,
      "timestampMs": 16883,
      "confidence": null
    },
    {
      "text": " switches.",
      "startMs": 17063,
      "endMs": 17533,
      "timestampMs": 17298,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 19285,
      "endMs": 19405,
      "timestampMs": 19345,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 19405,
      "endMs": 19545,
      "timestampMs": 19475,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 19545,
      "endMs": 19765,
      "timestampMs": 19655,
      "confidence": null
    },
    {
      "text": " note,",
      "startMs": 19765,
      "endMs": 19985,
      "timestampMs": 19875,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 19985,
      "endMs": 20185,
      "timestampMs": 20085,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 20185,
      "endMs": 20620,
      "timestampMs": 20403,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 20725,
      "endMs": 20825,
      "timestampMs": 20775,
      "confidence": null
    },
    {
      "text": " lot",
      "startMs": 20825,
      "endMs": 21245,
      "timestampMs": 21035,
      "confidence": null
    },
    {
      "text": " more",
      "startMs": 21245,
      "endMs": 21645,
      "timestampMs": 21445,
      "confidence": null
    },
    {
      "text": " AV",
      "startMs": 21645,
      "endMs": 21905,
      "timestampMs": 21775,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 21905,
      "endMs": 22165,
      "timestampMs": 22035,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 22165,
      "endMs": 22330,
      "timestampMs": 22248,
      "confidence": null
    },
    {
      "text": " endpoints.",
      "startMs": 22645,
      "endMs": 23295,
      "timestampMs": 22970,
      "confidence": null
    },
    {
      "text": " We",
      "startMs": 23870,
      "endMs": 24030,
      "timestampMs": 23950,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 24030,
      "endMs": 24350,
      "timestampMs": 24190,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 24350,
      "endMs": 24730,
      "timestampMs": 24540,
      "confidence": null
    },
    {
      "text": " Kramer,",
      "startMs": 24730,
      "endMs": 25330,
      "timestampMs": 25030,
      "confidence": null
    },
    {
      "text": " Matrox,",
      "startMs": 25658,
      "endMs": 26318,
      "timestampMs": 25988,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 26918,
      "endMs": 27183,
      "timestampMs": 27050,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 27518,
      "endMs": 27718,
      "timestampMs": 27618,
      "confidence": null
    },
    {
      "text": " research",
      "startMs": 27718,
      "endMs": 28393,
      "timestampMs": 28056,
      "confidence": null
    },
    {
      "text": " endpoints",
      "startMs": 28501,
      "endMs": 28894,
      "timestampMs": 28697,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 29007,
      "endMs": 29227,
      "timestampMs": 29117,
      "confidence": null
    },
    {
      "text": " AV",
      "startMs": 29227,
      "endMs": 29407,
      "timestampMs": 29317,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 29407,
      "endMs": 29727,
      "timestampMs": 29567,
      "confidence": null
    },
    {
      "text": " IP.",
      "startMs": 29727,
      "endMs": 29957,
      "timestampMs": 29842,
      "confidence": null
    },
    {
      "text": " As",
      "startMs": 31290,
      "endMs": 31410,
      "timestampMs": 31350,
      "confidence": null
    },
    {
      "text": " far",
      "startMs": 31410,
      "endMs": 31870,
      "timestampMs": 31640,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 31870,
      "endMs": 32375,
      "timestampMs": 32123,
      "confidence": null
    },
    {
      "text": " endpoints",
      "startMs": 32450,
      "endMs": 32970,
      "timestampMs": 32710,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 33290,
      "endMs": 33765,
      "timestampMs": 33528,
      "confidence": null
    },
    {
      "text": " RS-232,",
      "startMs": 34118,
      "endMs": 35228,
      "timestampMs": 34673,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 35281,
      "endMs": 35661,
      "timestampMs": 35471,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 35661,
      "endMs": 35961,
      "timestampMs": 35811,
      "confidence": null
    },
    {
      "text": " RS-232,",
      "startMs": 36041,
      "endMs": 36936,
      "timestampMs": 36489,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 37109,
      "endMs": 37269,
      "timestampMs": 37189,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 37269,
      "endMs": 37854,
      "timestampMs": 37562,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 37869,
      "endMs": 38129,
      "timestampMs": 37999,
      "confidence": null
    },
    {
      "text": " IR,",
      "startMs": 38129,
      "endMs": 38609,
      "timestampMs": 38369,
      "confidence": null
    },
    {
      "text": " we've",
      "startMs": 38609,
      "endMs": 38849,
      "timestampMs": 38729,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 38849,
      "endMs": 39154,
      "timestampMs": 39002,
      "confidence": null
    },
    {
      "text": " additional",
      "startMs": 39472,
      "endMs": 40412,
      "timestampMs": 39942,
      "confidence": null
    },
    {
      "text": " models",
      "startMs": 40525,
      "endMs": 41130,
      "timestampMs": 40828,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 41130,
      "endMs": 41250,
      "timestampMs": 41190,
      "confidence": null
    },
    {
      "text": " Global",
      "startMs": 41435,
      "endMs": 41755,
      "timestampMs": 41595,
      "confidence": null
    },
    {
      "text": " Cache.",
      "startMs": 41755,
      "endMs": 42485,
      "timestampMs": 42120,
      "confidence": null
    },
    {
      "text": " We",
      "startMs": 44550,
      "endMs": 44710,
      "timestampMs": 44630,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 44710,
      "endMs": 45350,
      "timestampMs": 45030,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 45350,
      "endMs": 45790,
      "timestampMs": 45570,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 45950,
      "endMs": 46145,
      "timestampMs": 46048,
      "confidence": null
    },
    {
      "text": " Pooser,",
      "startMs": 46148,
      "endMs": 46588,
      "timestampMs": 46368,
      "confidence": null
    },
    {
      "text": " which",
      "startMs": 46728,
      "endMs": 46968,
      "timestampMs": 46848,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 46968,
      "endMs": 47188,
      "timestampMs": 47078,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 47188,
      "endMs": 47381,
      "timestampMs": 47285,
      "confidence": null
    },
    {
      "text": " industrial",
      "startMs": 47411,
      "endMs": 48216,
      "timestampMs": 47814,
      "confidence": null
    },
    {
      "text": " -type",
      "startMs": 48491,
      "endMs": 48869,
      "timestampMs": 48680,
      "confidence": null
    },
    {
      "text": " wireless",
      "startMs": 48929,
      "endMs": 49724,
      "timestampMs": 49327,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 50087,
      "endMs": 50412,
      "timestampMs": 50250,
      "confidence": null
    },
    {
      "text": " wired",
      "startMs": 50545,
      "endMs": 51160,
      "timestampMs": 50853,
      "confidence": null
    },
    {
      "text": " Ethernet",
      "startMs": 51398,
      "endMs": 51978,
      "timestampMs": 51688,
      "confidence": null
    },
    {
      "text": " portal",
      "startMs": 52376,
      "endMs": 52866,
      "timestampMs": 52621,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 53376,
      "endMs": 53636,
      "timestampMs": 53506,
      "confidence": null
    },
    {
      "text": " allows",
      "startMs": 53896,
      "endMs": 54436,
      "timestampMs": 54166,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 54436,
      "endMs": 54596,
      "timestampMs": 54516,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 54596,
      "endMs": 55116,
      "timestampMs": 54856,
      "confidence": null
    },
    {
      "text": " convert",
      "startMs": 55116,
      "endMs": 55716,
      "timestampMs": 55416,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 55716,
      "endMs": 55944,
      "timestampMs": 55830,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 56139,
      "endMs": 56419,
      "timestampMs": 56279,
      "confidence": null
    },
    {
      "text": " RS-232",
      "startMs": 56419,
      "endMs": 57389,
      "timestampMs": 56904,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 58780,
      "endMs": 58980,
      "timestampMs": 58880,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 58980,
      "endMs": 59380,
      "timestampMs": 59180,
      "confidence": null
    },
    {
      "text": " discovery",
      "startMs": 59380,
      "endMs": 59900,
      "timestampMs": 59640,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 59900,
      "endMs": 60020,
      "timestampMs": 59960,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 60020,
      "endMs": 60180,
      "timestampMs": 60100,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 60180,
      "endMs": 60300,
      "timestampMs": 60240,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 60300,
      "endMs": 60400,
      "timestampMs": 60350,
      "confidence": null
    },
    {
      "text": " corner,",
      "startMs": 60400,
      "endMs": 60760,
      "timestampMs": 60580,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 61100,
      "endMs": 61370,
      "timestampMs": 61235,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 61680,
      "endMs": 61950,
      "timestampMs": 61815,
      "confidence": null
    },
    {
      "text": " allow",
      "startMs": 61950,
      "endMs": 62250,
      "timestampMs": 62100,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 62250,
      "endMs": 62450,
      "timestampMs": 62350,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 62450,
      "endMs": 62770,
      "timestampMs": 62610,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 62770,
      "endMs": 63420,
      "timestampMs": 63095,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 63678,
      "endMs": 63898,
      "timestampMs": 63788,
      "confidence": null
    },
    {
      "text": " driver",
      "startMs": 63898,
      "endMs": 64393,
      "timestampMs": 64146,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 64621,
      "endMs": 64861,
      "timestampMs": 64741,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 64861,
      "endMs": 65141,
      "timestampMs": 65001,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 65141,
      "endMs": 65321,
      "timestampMs": 65231,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 65321,
      "endMs": 65661,
      "timestampMs": 65491,
      "confidence": null
    },
    {
      "text": " I'm",
      "startMs": 67080,
      "endMs": 67275,
      "timestampMs": 67177,
      "confidence": null
    },
    {
      "text": " gonna",
      "startMs": 67520,
      "endMs": 67780,
      "timestampMs": 67650,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 67780,
      "endMs": 68100,
      "timestampMs": 67940,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 68100,
      "endMs": 68420,
      "timestampMs": 68260,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 68420,
      "endMs": 68900,
      "timestampMs": 68660,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 68900,
      "endMs": 69120,
      "timestampMs": 69010,
      "confidence": null
    },
    {
      "text": " Acer",
      "startMs": 69280,
      "endMs": 69640,
      "timestampMs": 69460,
      "confidence": null
    },
    {
      "text": " projector,",
      "startMs": 69640,
      "endMs": 70380,
      "timestampMs": 70010,
      "confidence": null
    },
    {
      "text": " RS-232.",
      "startMs": 70560,
      "endMs": 71610,
      "timestampMs": 71085,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 72260,
      "endMs": 72420,
      "timestampMs": 72340,
      "confidence": null
    },
    {
      "text": " point",
      "startMs": 72420,
      "endMs": 72700,
      "timestampMs": 72560,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 72700,
      "endMs": 72920,
      "timestampMs": 72810,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 72920,
      "endMs": 73080,
      "timestampMs": 73000,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 73080,
      "endMs": 73475,
      "timestampMs": 73278,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 73973,
      "endMs": 74453,
      "timestampMs": 74213,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 74453,
      "endMs": 74593,
      "timestampMs": 74523,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 74593,
      "endMs": 74753,
      "timestampMs": 74673,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 74753,
      "endMs": 75073,
      "timestampMs": 74913,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 75073,
      "endMs": 75253,
      "timestampMs": 75163,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 75253,
      "endMs": 75333,
      "timestampMs": 75293,
      "confidence": null
    },
    {
      "text": " directly.",
      "startMs": 75333,
      "endMs": 75933,
      "timestampMs": 75633,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 76655,
      "endMs": 76875,
      "timestampMs": 76765,
      "confidence": null
    },
    {
      "text": " whole",
      "startMs": 76875,
      "endMs": 77445,
      "timestampMs": 77160,
      "confidence": null
    },
    {
      "text": " terminal",
      "startMs": 77535,
      "endMs": 78125,
      "timestampMs": 77830,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 78175,
      "endMs": 78375,
      "timestampMs": 78275,
      "confidence": null
    },
    {
      "text": " new",
      "startMs": 78375,
      "endMs": 78715,
      "timestampMs": 78545,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 78715,
      "endMs": 78995,
      "timestampMs": 78855,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 78995,
      "endMs": 79430,
      "timestampMs": 79212,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 79830,
      "endMs": 80173,
      "timestampMs": 80002,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 80243,
      "endMs": 80423,
      "timestampMs": 80333,
      "confidence": null
    },
    {
      "text": " layout,",
      "startMs": 80423,
      "endMs": 80903,
      "timestampMs": 80663,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 80903,
      "endMs": 81073,
      "timestampMs": 80988,
      "confidence": null
    },
    {
      "text": " way",
      "startMs": 81226,
      "endMs": 81426,
      "timestampMs": 81326,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 81426,
      "endMs": 81566,
      "timestampMs": 81496,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 81566,
      "endMs": 81766,
      "timestampMs": 81666,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 81766,
      "endMs": 82101,
      "timestampMs": 81934,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 82104,
      "endMs": 82224,
      "timestampMs": 82164,
      "confidence": null
    },
    {
      "text": " commands",
      "startMs": 82224,
      "endMs": 83034,
      "timestampMs": 82629,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 83277,
      "endMs": 83572,
      "timestampMs": 83425,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 83805,
      "endMs": 84105,
      "timestampMs": 83955,
      "confidence": null
    },
    {
      "text": " configuration",
      "startMs": 84188,
      "endMs": 84828,
      "timestampMs": 84508,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 84828,
      "endMs": 84948,
      "timestampMs": 84888,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 84948,
      "endMs": 85153,
      "timestampMs": 85051,
      "confidence": null
    },
    {
      "text": " right.",
      "startMs": 85308,
      "endMs": 85678,
      "timestampMs": 85493,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 86870,
      "endMs": 86970,
      "timestampMs": 86920,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 86970,
      "endMs": 87110,
      "timestampMs": 87040,
      "confidence": null
    },
    {
      "text": " open",
      "startMs": 87110,
      "endMs": 87330,
      "timestampMs": 87220,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 87330,
      "endMs": 87430,
      "timestampMs": 87380,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 87430,
      "endMs": 87573,
      "timestampMs": 87502,
      "confidence": null
    },
    {
      "text": " terminal",
      "startMs": 87673,
      "endMs": 88133,
      "timestampMs": 87903,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 88133,
      "endMs": 88473,
      "timestampMs": 88303,
      "confidence": null
    },
    {
      "text": " directly,",
      "startMs": 88473,
      "endMs": 89133,
      "timestampMs": 88803,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 89485,
      "endMs": 89605,
      "timestampMs": 89545,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 89605,
      "endMs": 89705,
      "timestampMs": 89655,
      "confidence": null
    },
    {
      "text": " wanted",
      "startMs": 89705,
      "endMs": 90045,
      "timestampMs": 89875,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 90045,
      "endMs": 90585,
      "timestampMs": 90315,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 90585,
      "endMs": 90845,
      "timestampMs": 90715,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 90845,
      "endMs": 90965,
      "timestampMs": 90905,
      "confidence": null
    },
    {
      "text": " command",
      "startMs": 90965,
      "endMs": 91465,
      "timestampMs": 91215,
      "confidence": null
    },
    {
      "text": " directly,",
      "startMs": 91465,
      "endMs": 92005,
      "timestampMs": 91735,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 92005,
      "endMs": 92065,
      "timestampMs": 92035,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 92065,
      "endMs": 92245,
      "timestampMs": 92155,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 92245,
      "endMs": 92385,
      "timestampMs": 92315,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 92385,
      "endMs": 92625,
      "timestampMs": 92505,
      "confidence": null
    },
    {
      "text": " from",
      "startMs": 92625,
      "endMs": 92785,
      "timestampMs": 92705,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 92785,
      "endMs": 92965,
      "timestampMs": 92875,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 92965,
      "endMs": 93165,
      "timestampMs": 93065,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 93165,
      "endMs": 93365,
      "timestampMs": 93265,
      "confidence": null
    },
    {
      "text": " well.",
      "startMs": 93365,
      "endMs": 93575,
      "timestampMs": 93470,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 95380,
      "endMs": 95540,
      "timestampMs": 95460,
      "confidence": null
    },
    {
      "text": " additionally,",
      "startMs": 95540,
      "endMs": 96420,
      "timestampMs": 95980,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 96480,
      "endMs": 96580,
      "timestampMs": 96530,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 96580,
      "endMs": 96680,
      "timestampMs": 96630,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 96680,
      "endMs": 97240,
      "timestampMs": 96960,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 97360,
      "endMs": 97820,
      "timestampMs": 97590,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 97820,
      "endMs": 97900,
      "timestampMs": 97860,
      "confidence": null
    },
    {
      "text": " webpage,",
      "startMs": 97900,
      "endMs": 98580,
      "timestampMs": 98240,
      "confidence": null
    },
    {
      "text": " right,",
      "startMs": 98580,
      "endMs": 98920,
      "timestampMs": 98750,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 99033,
      "endMs": 99193,
      "timestampMs": 99113,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 99193,
      "endMs": 99533,
      "timestampMs": 99363,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 99533,
      "endMs": 99673,
      "timestampMs": 99603,
      "confidence": null
    },
    {
      "text": " able",
      "startMs": 99673,
      "endMs": 99833,
      "timestampMs": 99753,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 99833,
      "endMs": 100013,
      "timestampMs": 99923,
      "confidence": null
    },
    {
      "text": " access",
      "startMs": 100133,
      "endMs": 100553,
      "timestampMs": 100343,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 100553,
      "endMs": 100753,
      "timestampMs": 100653,
      "confidence": null
    },
    {
      "text": " webpage",
      "startMs": 100753,
      "endMs": 101413,
      "timestampMs": 101083,
      "confidence": null
    },
    {
      "text": " directly,",
      "startMs": 101413,
      "endMs": 101973,
      "timestampMs": 101693,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 103760,
      "endMs": 103880,
      "timestampMs": 103820,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 103880,
      "endMs": 104135,
      "timestampMs": 104008,
      "confidence": null
    },
    {
      "text": " basically",
      "startMs": 104353,
      "endMs": 105113,
      "timestampMs": 104733,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 105113,
      "endMs": 105463,
      "timestampMs": 105288,
      "confidence": null
    },
    {
      "text": " messages,",
      "startMs": 105621,
      "endMs": 106331,
      "timestampMs": 105976,
      "confidence": null
    },
    {
      "text": " Another",
      "startMs": 109270,
      "endMs": 109790,
      "timestampMs": 109530,
      "confidence": null
    },
    {
      "text": " great",
      "startMs": 109790,
      "endMs": 110050,
      "timestampMs": 109920,
      "confidence": null
    },
    {
      "text": " feature",
      "startMs": 110050,
      "endMs": 110610,
      "timestampMs": 110330,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 110730,
      "endMs": 111225,
      "timestampMs": 110978,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 111453,
      "endMs": 111748,
      "timestampMs": 111601,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 111793,
      "endMs": 111973,
      "timestampMs": 111883,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 111973,
      "endMs": 112308,
      "timestampMs": 112141,
      "confidence": null
    },
    {
      "text": " drag",
      "startMs": 112641,
      "endMs": 113001,
      "timestampMs": 112821,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 113001,
      "endMs": 113181,
      "timestampMs": 113091,
      "confidence": null
    },
    {
      "text": " drop",
      "startMs": 113181,
      "endMs": 113681,
      "timestampMs": 113431,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 113861,
      "endMs": 114001,
      "timestampMs": 113931,
      "confidence": null
    },
    {
      "text": " sources",
      "startMs": 114001,
      "endMs": 114561,
      "timestampMs": 114281,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 114561,
      "endMs": 114741,
      "timestampMs": 114651,
      "confidence": null
    },
    {
      "text": " there.",
      "startMs": 114741,
      "endMs": 114861,
      "timestampMs": 114801,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 115300,
      "endMs": 115420,
      "timestampMs": 115360,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 115420,
      "endMs": 115540,
      "timestampMs": 115480,
      "confidence": null
    },
    {
      "text": " course",
      "startMs": 115540,
      "endMs": 115820,
      "timestampMs": 115680,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 115820,
      "endMs": 115870,
      "timestampMs": 115845,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 115860,
      "endMs": 116060,
      "timestampMs": 115960,
      "confidence": null
    },
    {
      "text": " select",
      "startMs": 116060,
      "endMs": 116400,
      "timestampMs": 116230,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 116808,
      "endMs": 116888,
      "timestampMs": 116848,
      "confidence": null
    },
    {
      "text": " source",
      "startMs": 116888,
      "endMs": 117408,
      "timestampMs": 117148,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 117408,
      "endMs": 117588,
      "timestampMs": 117498,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 117588,
      "endMs": 117828,
      "timestampMs": 117708,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 117828,
      "endMs": 118008,
      "timestampMs": 117918,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 118008,
      "endMs": 118168,
      "timestampMs": 118088,
      "confidence": null
    },
    {
      "text": " by",
      "startMs": 118168,
      "endMs": 118308,
      "timestampMs": 118238,
      "confidence": null
    },
    {
      "text": " hitting",
      "startMs": 118308,
      "endMs": 118568,
      "timestampMs": 118438,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 118568,
      "endMs": 118808,
      "timestampMs": 118688,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 118808,
      "endMs": 118948,
      "timestampMs": 118878,
      "confidence": null
    },
    {
      "text": " button.",
      "startMs": 118948,
      "endMs": 119333,
      "timestampMs": 119141,
      "confidence": null
    },
    {
      "text": " Also,",
      "startMs": 120835,
      "endMs": 121335,
      "timestampMs": 121085,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 121335,
      "endMs": 121695,
      "timestampMs": 121515,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 121695,
      "endMs": 121865,
      "timestampMs": 121780,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 122015,
      "endMs": 122295,
      "timestampMs": 122155,
      "confidence": null
    },
    {
      "text": " safety",
      "startMs": 122295,
      "endMs": 122715,
      "timestampMs": 122505,
      "confidence": null
    },
    {
      "text": " feature.",
      "startMs": 122715,
      "endMs": 123195,
      "timestampMs": 122955,
      "confidence": null
    },
    {
      "text": " We",
      "startMs": 123195,
      "endMs": 123335,
      "timestampMs": 123265,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 123335,
      "endMs": 123515,
      "timestampMs": 123425,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 123515,
      "endMs": 123595,
      "timestampMs": 123555,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 123595,
      "endMs": 124015,
      "timestampMs": 123805,
      "confidence": null
    },
    {
      "text": " X",
      "startMs": 124015,
      "endMs": 124475,
      "timestampMs": 124245,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 124475,
      "endMs": 124575,
      "timestampMs": 124525,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 124575,
      "endMs": 124695,
      "timestampMs": 124635,
      "confidence": null
    },
    {
      "text": " corner.",
      "startMs": 124695,
      "endMs": 125130,
      "timestampMs": 124913,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 125395,
      "endMs": 125495,
      "timestampMs": 125445,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 125495,
      "endMs": 125575,
      "timestampMs": 125535,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 125575,
      "endMs": 125715,
      "timestampMs": 125645,
      "confidence": null
    },
    {
      "text": " want",
      "startMs": 125715,
      "endMs": 125855,
      "timestampMs": 125785,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 125855,
      "endMs": 125955,
      "timestampMs": 125905,
      "confidence": null
    },
    {
      "text": " cancel",
      "startMs": 125955,
      "endMs": 126575,
      "timestampMs": 126265,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 126575,
      "endMs": 126875,
      "timestampMs": 126725,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 126875,
      "endMs": 127255,
      "timestampMs": 127065,
      "confidence": null
    },
    {
      "text": " off,",
      "startMs": 127255,
      "endMs": 127305,
      "timestampMs": 127280,
      "confidence": null
    },
    {
      "text": " you're",
      "startMs": 127255,
      "endMs": 127355,
      "timestampMs": 127305,
      "confidence": null
    },
    {
      "text": " able",
      "startMs": 127355,
      "endMs": 127470,
      "timestampMs": 127413,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 127470,
      "endMs": 127595,
      "timestampMs": 127532,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 127595,
      "endMs": 127755,
      "timestampMs": 127675,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 127755,
      "endMs": 127975,
      "timestampMs": 127865,
      "confidence": null
    },
    {
      "text": " now.",
      "startMs": 127975,
      "endMs": 128385,
      "timestampMs": 128180,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 128700,
      "endMs": 128930,
      "timestampMs": 128815,
      "confidence": null
    },
    {
      "text": " there's",
      "startMs": 128930,
      "endMs": 129030,
      "timestampMs": 128980,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 129030,
      "endMs": 129325,
      "timestampMs": 129178,
      "confidence": null
    },
    {
      "text": " hello",
      "startMs": 129510,
      "endMs": 129890,
      "timestampMs": 129700,
      "confidence": null
    },
    {
      "text": " world",
      "startMs": 129890,
      "endMs": 130350,
      "timestampMs": 130120,
      "confidence": null
    },
    {
      "text": " message.",
      "startMs": 130350,
      "endMs": 130540,
      "timestampMs": 130445,
      "confidence": null
    },
    {
      "text": " thanks",
      "startMs": 132255,
      "endMs": 132495,
      "timestampMs": 132375,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 132495,
      "endMs": 132575,
      "timestampMs": 132535,
      "confidence": null
    },
    {
      "text": " joining",
      "startMs": 132575,
      "endMs": 132895,
      "timestampMs": 132735,
      "confidence": null
    },
    {
      "text": " me.",
      "startMs": 132895,
      "endMs": 133175,
      "timestampMs": 133035,
      "confidence": null
    }
  ],
  "cues": {
    "welcome": [
      {
        "text": "Welcome",
        "ms": 395
      },
      {
        "text": "to",
        "ms": 915
      },
      {
        "text": "CTRLbot.",
        "ms": 1075
      },
      {
        "text": "This",
        "ms": 2478
      },
      {
        "text": "will",
        "ms": 2658
      },
      {
        "text": "be",
        "ms": 2838
      },
      {
        "text": "a",
        "ms": 3698
      },
      {
        "text": "short",
        "ms": 3938
      },
      {
        "text": "walkthrough",
        "ms": 4581
      },
      {
        "text": "of",
        "ms": 5501
      },
      {
        "text": "the",
        "ms": 5681
      },
      {
        "text": "latest",
        "ms": 5821
      },
      {
        "text": "features",
        "ms": 6221
      },
      {
        "text": "and",
        "ms": 7179
      },
      {
        "text": "benefits",
        "ms": 7339
      },
      {
        "text": "of",
        "ms": 8659
      },
      {
        "text": "the",
        "ms": 9167
      },
      {
        "text": "CTRLbot",
        "ms": 9287
      },
      {
        "text": "IoT",
        "ms": 10027
      },
      {
        "text": "app",
        "ms": 10647
      }
    ],
    "net-category": [
      {
        "text": "And",
        "ms": 12275
      },
      {
        "text": "what",
        "ms": 12395
      },
      {
        "text": "we",
        "ms": 12875
      },
      {
        "text": "did",
        "ms": 13015
      },
      {
        "text": "was",
        "ms": 13195
      },
      {
        "text": "we",
        "ms": 13395
      },
      {
        "text": "added",
        "ms": 13695
      },
      {
        "text": "a",
        "ms": 14983
      },
      {
        "text": "new",
        "ms": 15063
      },
      {
        "text": "category",
        "ms": 15243
      },
      {
        "text": "called",
        "ms": 16023
      },
      {
        "text": "network",
        "ms": 16703
      },
      {
        "text": "switches.",
        "ms": 17063
      }
    ],
    "avoip-more": [
      {
        "text": "And",
        "ms": 19285
      },
      {
        "text": "on",
        "ms": 19405
      },
      {
        "text": "that",
        "ms": 19545
      },
      {
        "text": "note,",
        "ms": 19765
      },
      {
        "text": "we",
        "ms": 19985
      },
      {
        "text": "added",
        "ms": 20185
      },
      {
        "text": "a",
        "ms": 20725
      },
      {
        "text": "lot",
        "ms": 20825
      },
      {
        "text": "more",
        "ms": 21245
      },
      {
        "text": "AV",
        "ms": 21645
      },
      {
        "text": "over",
        "ms": 21905
      },
      {
        "text": "IP",
        "ms": 22165
      },
      {
        "text": "endpoints.",
        "ms": 22645
      }
    ],
    "avoip-brands": [
      {
        "text": "We",
        "ms": 23870
      },
      {
        "text": "also",
        "ms": 24030
      },
      {
        "text": "added",
        "ms": 24350
      },
      {
        "text": "Kramer,",
        "ms": 24730
      },
      {
        "text": "Matrox,",
        "ms": 25658
      },
      {
        "text": "and",
        "ms": 26918
      },
      {
        "text": "all",
        "ms": 27518
      },
      {
        "text": "research",
        "ms": 27718
      },
      {
        "text": "endpoints",
        "ms": 28501
      },
      {
        "text": "for",
        "ms": 29007
      },
      {
        "text": "AV",
        "ms": 29227
      },
      {
        "text": "over",
        "ms": 29407
      },
      {
        "text": "IP.",
        "ms": 29727
      }
    ],
    "gc-models": [
      {
        "text": "As",
        "ms": 31290
      },
      {
        "text": "far",
        "ms": 31410
      },
      {
        "text": "as",
        "ms": 31870
      },
      {
        "text": "endpoints",
        "ms": 32450
      },
      {
        "text": "for",
        "ms": 33290
      },
      {
        "text": "RS",
        "ms": 34118
      },
      {
        "text": "-232,",
        "ms": 34298
      },
      {
        "text": "IP",
        "ms": 35281
      },
      {
        "text": "to",
        "ms": 35661
      },
      {
        "text": "RS",
        "ms": 36041
      },
      {
        "text": "-232,",
        "ms": 36181
      },
      {
        "text": "or",
        "ms": 37109
      },
      {
        "text": "IP",
        "ms": 37269
      },
      {
        "text": "to",
        "ms": 37869
      },
      {
        "text": "IR,",
        "ms": 38129
      },
      {
        "text": "we've",
        "ms": 38609
      },
      {
        "text": "added",
        "ms": 38849
      },
      {
        "text": "additional",
        "ms": 39472
      },
      {
        "text": "models",
        "ms": 40525
      },
      {
        "text": "for",
        "ms": 41130
      },
      {
        "text": "Global",
        "ms": 41435
      },
      {
        "text": "Cache.",
        "ms": 41755
      }
    ],
    "pusr": [
      {
        "text": "We",
        "ms": 44550
      },
      {
        "text": "also",
        "ms": 44710
      },
      {
        "text": "added",
        "ms": 45350
      },
      {
        "text": "a",
        "ms": 45950
      },
      {
        "text": "Pooser,",
        "ms": 46148
      },
      {
        "text": "which",
        "ms": 46728
      },
      {
        "text": "is",
        "ms": 46968
      },
      {
        "text": "an",
        "ms": 47188
      },
      {
        "text": "industrial",
        "ms": 47411
      },
      {
        "text": "-type",
        "ms": 48491
      },
      {
        "text": "wireless",
        "ms": 48929
      },
      {
        "text": "or",
        "ms": 50087
      },
      {
        "text": "wired",
        "ms": 50545
      },
      {
        "text": "Ethernet",
        "ms": 51398
      },
      {
        "text": "portal",
        "ms": 52376
      },
      {
        "text": "and",
        "ms": 53376
      },
      {
        "text": "allows",
        "ms": 53896
      },
      {
        "text": "you",
        "ms": 54436
      },
      {
        "text": "to",
        "ms": 54596
      },
      {
        "text": "convert",
        "ms": 55116
      },
      {
        "text": "IP",
        "ms": 55716
      },
      {
        "text": "to",
        "ms": 56139
      },
      {
        "text": "RS",
        "ms": 56419
      },
      {
        "text": "-232",
        "ms": 56539
      }
    ],
    "disc-corner": [
      {
        "text": "this",
        "ms": 58780
      },
      {
        "text": "device",
        "ms": 58980
      },
      {
        "text": "discovery",
        "ms": 59380
      },
      {
        "text": "up",
        "ms": 59900
      },
      {
        "text": "here",
        "ms": 60020
      },
      {
        "text": "in",
        "ms": 60180
      },
      {
        "text": "the",
        "ms": 60300
      },
      {
        "text": "corner,",
        "ms": 60400
      },
      {
        "text": "right?",
        "ms": 61100
      }
    ],
    "disc-click": [
      {
        "text": "it'll",
        "ms": 61680
      },
      {
        "text": "allow",
        "ms": 61950
      },
      {
        "text": "you",
        "ms": 62250
      },
      {
        "text": "to",
        "ms": 62450
      },
      {
        "text": "add",
        "ms": 62770
      },
      {
        "text": "that",
        "ms": 63678
      },
      {
        "text": "driver",
        "ms": 63898
      },
      {
        "text": "just",
        "ms": 64621
      },
      {
        "text": "with",
        "ms": 64861
      },
      {
        "text": "one",
        "ms": 65141
      },
      {
        "text": "click",
        "ms": 65321
      }
    ],
    "rs-acer": [
      {
        "text": "I'm",
        "ms": 67080
      },
      {
        "text": "gonna",
        "ms": 67520
      },
      {
        "text": "also",
        "ms": 67780
      },
      {
        "text": "just",
        "ms": 68100
      },
      {
        "text": "add",
        "ms": 68420
      },
      {
        "text": "an",
        "ms": 68900
      },
      {
        "text": "Acer",
        "ms": 69280
      },
      {
        "text": "projector,",
        "ms": 69640
      },
      {
        "text": "RS",
        "ms": 70560
      },
      {
        "text": "-232.",
        "ms": 70760
      }
    ],
    "rs-endpoint": [
      {
        "text": "end",
        "ms": 72260
      },
      {
        "text": "point",
        "ms": 72420
      },
      {
        "text": "right",
        "ms": 72700
      },
      {
        "text": "in",
        "ms": 72920
      },
      {
        "text": "here",
        "ms": 73080
      },
      {
        "text": "and",
        "ms": 73973
      },
      {
        "text": "we",
        "ms": 74453
      },
      {
        "text": "can",
        "ms": 74593
      },
      {
        "text": "connect",
        "ms": 74753
      },
      {
        "text": "to",
        "ms": 75073
      },
      {
        "text": "it",
        "ms": 75253
      },
      {
        "text": "directly.",
        "ms": 75333
      }
    ],
    "rs-terminal": [
      {
        "text": "this",
        "ms": 76655
      },
      {
        "text": "whole",
        "ms": 76875
      },
      {
        "text": "terminal",
        "ms": 77535
      },
      {
        "text": "is",
        "ms": 78175
      },
      {
        "text": "new",
        "ms": 78375
      },
      {
        "text": "right",
        "ms": 78715
      },
      {
        "text": "here.",
        "ms": 78995
      }
    ],
    "rs-layout": [
      {
        "text": "also",
        "ms": 79830
      },
      {
        "text": "the",
        "ms": 80243
      },
      {
        "text": "layout,",
        "ms": 80423
      },
      {
        "text": "the",
        "ms": 80903
      },
      {
        "text": "way",
        "ms": 81226
      },
      {
        "text": "that",
        "ms": 81426
      },
      {
        "text": "we",
        "ms": 81566
      },
      {
        "text": "have",
        "ms": 81766
      },
      {
        "text": "the",
        "ms": 82104
      },
      {
        "text": "commands",
        "ms": 82224
      },
      {
        "text": "and",
        "ms": 83277
      },
      {
        "text": "the",
        "ms": 83805
      },
      {
        "text": "configuration",
        "ms": 84188
      },
      {
        "text": "on",
        "ms": 84828
      },
      {
        "text": "the",
        "ms": 84948
      },
      {
        "text": "right.",
        "ms": 85308
      }
    ],
    "term-open": [
      {
        "text": "you",
        "ms": 86870
      },
      {
        "text": "can",
        "ms": 86970
      },
      {
        "text": "open",
        "ms": 87110
      },
      {
        "text": "up",
        "ms": 87330
      },
      {
        "text": "the",
        "ms": 87430
      },
      {
        "text": "terminal",
        "ms": 87673
      },
      {
        "text": "now",
        "ms": 88133
      },
      {
        "text": "directly,",
        "ms": 88473
      }
    ],
    "term-send": [
      {
        "text": "If",
        "ms": 89485
      },
      {
        "text": "I",
        "ms": 89605
      },
      {
        "text": "wanted",
        "ms": 89705
      },
      {
        "text": "to",
        "ms": 90045
      },
      {
        "text": "send",
        "ms": 90585
      },
      {
        "text": "a",
        "ms": 90845
      },
      {
        "text": "command",
        "ms": 90965
      },
      {
        "text": "directly,",
        "ms": 91465
      },
      {
        "text": "I",
        "ms": 92005
      },
      {
        "text": "can",
        "ms": 92065
      },
      {
        "text": "do",
        "ms": 92245
      },
      {
        "text": "that",
        "ms": 92385
      },
      {
        "text": "from",
        "ms": 92625
      },
      {
        "text": "right",
        "ms": 92785
      },
      {
        "text": "here",
        "ms": 92965
      },
      {
        "text": "as",
        "ms": 93165
      },
      {
        "text": "well.",
        "ms": 93365
      }
    ],
    "web": [
      {
        "text": "And",
        "ms": 95380
      },
      {
        "text": "additionally,",
        "ms": 95540
      },
      {
        "text": "if",
        "ms": 96480
      },
      {
        "text": "the",
        "ms": 96580
      },
      {
        "text": "device",
        "ms": 96680
      },
      {
        "text": "has",
        "ms": 97360
      },
      {
        "text": "a",
        "ms": 97820
      },
      {
        "text": "webpage,",
        "ms": 97900
      },
      {
        "text": "right,",
        "ms": 98580
      },
      {
        "text": "then",
        "ms": 99033
      },
      {
        "text": "you'll",
        "ms": 99193
      },
      {
        "text": "be",
        "ms": 99533
      },
      {
        "text": "able",
        "ms": 99673
      },
      {
        "text": "to",
        "ms": 99833
      },
      {
        "text": "access",
        "ms": 100133
      },
      {
        "text": "that",
        "ms": 100553
      },
      {
        "text": "webpage",
        "ms": 100753
      },
      {
        "text": "directly,",
        "ms": 101413
      }
    ],
    "msg": [
      {
        "text": "you",
        "ms": 103760
      },
      {
        "text": "can",
        "ms": 103880
      },
      {
        "text": "basically",
        "ms": 104353
      },
      {
        "text": "add",
        "ms": 105113
      },
      {
        "text": "messages,",
        "ms": 105621
      }
    ],
    "eui-drag": [
      {
        "text": "Another",
        "ms": 109270
      },
      {
        "text": "great",
        "ms": 109790
      },
      {
        "text": "feature",
        "ms": 110050
      },
      {
        "text": "now",
        "ms": 110730
      },
      {
        "text": "is",
        "ms": 111453
      },
      {
        "text": "you",
        "ms": 111793
      },
      {
        "text": "can",
        "ms": 111973
      },
      {
        "text": "drag",
        "ms": 112641
      },
      {
        "text": "and",
        "ms": 113001
      },
      {
        "text": "drop",
        "ms": 113181
      },
      {
        "text": "the",
        "ms": 113861
      },
      {
        "text": "sources",
        "ms": 114001
      },
      {
        "text": "on",
        "ms": 114561
      },
      {
        "text": "there.",
        "ms": 114741
      }
    ],
    "eui-all": [
      {
        "text": "And",
        "ms": 115300
      },
      {
        "text": "of",
        "ms": 115420
      },
      {
        "text": "course",
        "ms": 115540
      },
      {
        "text": "you",
        "ms": 115820
      },
      {
        "text": "can",
        "ms": 115860
      },
      {
        "text": "select",
        "ms": 116060
      },
      {
        "text": "a",
        "ms": 116808
      },
      {
        "text": "source",
        "ms": 116888
      },
      {
        "text": "and",
        "ms": 117408
      },
      {
        "text": "send",
        "ms": 117588
      },
      {
        "text": "to",
        "ms": 117828
      },
      {
        "text": "all",
        "ms": 118008
      },
      {
        "text": "by",
        "ms": 118168
      },
      {
        "text": "hitting",
        "ms": 118308
      },
      {
        "text": "that",
        "ms": 118568
      },
      {
        "text": "all",
        "ms": 118808
      },
      {
        "text": "button.",
        "ms": 118948
      }
    ],
    "power-x": [
      {
        "text": "Also,",
        "ms": 120835
      },
      {
        "text": "just",
        "ms": 121335
      },
      {
        "text": "a",
        "ms": 121695
      },
      {
        "text": "little",
        "ms": 122015
      },
      {
        "text": "safety",
        "ms": 122295
      },
      {
        "text": "feature.",
        "ms": 122715
      },
      {
        "text": "We",
        "ms": 123195
      },
      {
        "text": "have",
        "ms": 123335
      },
      {
        "text": "a",
        "ms": 123515
      },
      {
        "text": "little",
        "ms": 123595
      },
      {
        "text": "X",
        "ms": 124015
      },
      {
        "text": "in",
        "ms": 124475
      },
      {
        "text": "the",
        "ms": 124575
      },
      {
        "text": "corner.",
        "ms": 124695
      },
      {
        "text": "So",
        "ms": 125395
      },
      {
        "text": "if",
        "ms": 125495
      },
      {
        "text": "you",
        "ms": 125575
      },
      {
        "text": "want",
        "ms": 125715
      },
      {
        "text": "to",
        "ms": 125855
      },
      {
        "text": "cancel",
        "ms": 125955
      },
      {
        "text": "or",
        "ms": 126575
      },
      {
        "text": "power",
        "ms": 126875
      },
      {
        "text": "off,",
        "ms": 127255
      },
      {
        "text": "you're",
        "ms": 127255
      },
      {
        "text": "able",
        "ms": 127355
      },
      {
        "text": "to",
        "ms": 127470
      },
      {
        "text": "do",
        "ms": 127595
      },
      {
        "text": "that",
        "ms": 127755
      },
      {
        "text": "now.",
        "ms": 127975
      }
    ],
    "power-message": [
      {
        "text": "And",
        "ms": 128700
      },
      {
        "text": "there's",
        "ms": 128930
      },
      {
        "text": "our",
        "ms": 129030
      },
      {
        "text": "hello",
        "ms": 129510
      },
      {
        "text": "world",
        "ms": 129890
      },
      {
        "text": "message.",
        "ms": 130350
      }
    ],
    "thanks": [
      {
        "text": "thanks",
        "ms": 132255
      },
      {
        "text": "for",
        "ms": 132495
      },
      {
        "text": "joining",
        "ms": 132575
      },
      {
        "text": "me.",
        "ms": 132895
      }
    ]
  }
};

export const IOT_LATEST_EDIT = NARRATION_EDIT;

