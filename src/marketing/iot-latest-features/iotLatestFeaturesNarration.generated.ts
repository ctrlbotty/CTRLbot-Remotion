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
  "seconds": 121,
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
      "id": "avoip-more",
      "at": 12.25,
      "start": 57.245,
      "end": 61.33,
      "seconds": 4.085,
      "removed": []
    },
    {
      "id": "avoip-brands",
      "at": 16.61,
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
      "at": 23.875,
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
      "at": 37.25,
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
      "at": 51.74,
      "start": 141.59,
      "end": 144.22,
      "seconds": 2.63,
      "removed": []
    },
    {
      "id": "disc-click",
      "at": 54.68,
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
      "at": 59.92,
      "start": 206.72,
      "end": 211.45,
      "seconds": 4.73,
      "removed": []
    },
    {
      "id": "rs-endpoint",
      "at": 65.205,
      "start": 219.175,
      "end": 223.97,
      "seconds": 3.768,
      "removed": []
    },
    {
      "id": "rs-terminal",
      "at": 69.35,
      "start": 227.685,
      "end": 230.805,
      "seconds": 3.12,
      "removed": []
    },
    {
      "id": "rs-layout",
      "at": 72.77,
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
      "at": 79.75,
      "start": 277.69,
      "end": 280.26,
      "seconds": 2.293,
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
      "at": 82.47,
      "start": 284.275,
      "end": 288.38,
      "seconds": 4.105,
      "removed": []
    },
    {
      "id": "web",
      "at": 88.25,
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
      "id": "eui-drag",
      "at": 96.715,
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
      "at": 102.76,
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
      "at": 108.25,
      "start": 396.185,
      "end": 403.86,
      "seconds": 7.675,
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
      "startMs": 12285,
      "endMs": 12405,
      "timestampMs": 12345,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 12405,
      "endMs": 12545,
      "timestampMs": 12475,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 12545,
      "endMs": 12765,
      "timestampMs": 12655,
      "confidence": null
    },
    {
      "text": " note,",
      "startMs": 12765,
      "endMs": 12985,
      "timestampMs": 12875,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 12985,
      "endMs": 13185,
      "timestampMs": 13085,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 13185,
      "endMs": 13620,
      "timestampMs": 13403,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 13725,
      "endMs": 13825,
      "timestampMs": 13775,
      "confidence": null
    },
    {
      "text": " lot",
      "startMs": 13825,
      "endMs": 14245,
      "timestampMs": 14035,
      "confidence": null
    },
    {
      "text": " more",
      "startMs": 14245,
      "endMs": 14645,
      "timestampMs": 14445,
      "confidence": null
    },
    {
      "text": " AV",
      "startMs": 14645,
      "endMs": 14905,
      "timestampMs": 14775,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 14905,
      "endMs": 15165,
      "timestampMs": 15035,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 15165,
      "endMs": 15330,
      "timestampMs": 15248,
      "confidence": null
    },
    {
      "text": " endpoints.",
      "startMs": 15645,
      "endMs": 16295,
      "timestampMs": 15970,
      "confidence": null
    },
    {
      "text": " We",
      "startMs": 16870,
      "endMs": 17030,
      "timestampMs": 16950,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 17030,
      "endMs": 17350,
      "timestampMs": 17190,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 17350,
      "endMs": 17730,
      "timestampMs": 17540,
      "confidence": null
    },
    {
      "text": " Kramer,",
      "startMs": 17730,
      "endMs": 18330,
      "timestampMs": 18030,
      "confidence": null
    },
    {
      "text": " Matrox,",
      "startMs": 18658,
      "endMs": 19318,
      "timestampMs": 18988,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 19918,
      "endMs": 20183,
      "timestampMs": 20050,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 20518,
      "endMs": 20718,
      "timestampMs": 20618,
      "confidence": null
    },
    {
      "text": " research",
      "startMs": 20718,
      "endMs": 21393,
      "timestampMs": 21056,
      "confidence": null
    },
    {
      "text": " endpoints",
      "startMs": 21501,
      "endMs": 21894,
      "timestampMs": 21697,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 22007,
      "endMs": 22227,
      "timestampMs": 22117,
      "confidence": null
    },
    {
      "text": " AV",
      "startMs": 22227,
      "endMs": 22407,
      "timestampMs": 22317,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 22407,
      "endMs": 22727,
      "timestampMs": 22567,
      "confidence": null
    },
    {
      "text": " IP.",
      "startMs": 22727,
      "endMs": 22957,
      "timestampMs": 22842,
      "confidence": null
    },
    {
      "text": " As",
      "startMs": 24290,
      "endMs": 24410,
      "timestampMs": 24350,
      "confidence": null
    },
    {
      "text": " far",
      "startMs": 24410,
      "endMs": 24870,
      "timestampMs": 24640,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 24870,
      "endMs": 25375,
      "timestampMs": 25123,
      "confidence": null
    },
    {
      "text": " endpoints",
      "startMs": 25450,
      "endMs": 25970,
      "timestampMs": 25710,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 26290,
      "endMs": 26765,
      "timestampMs": 26528,
      "confidence": null
    },
    {
      "text": " RS-232,",
      "startMs": 27118,
      "endMs": 28228,
      "timestampMs": 27673,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 28281,
      "endMs": 28661,
      "timestampMs": 28471,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 28661,
      "endMs": 28961,
      "timestampMs": 28811,
      "confidence": null
    },
    {
      "text": " RS-232,",
      "startMs": 29041,
      "endMs": 29936,
      "timestampMs": 29489,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 30109,
      "endMs": 30269,
      "timestampMs": 30189,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 30269,
      "endMs": 30854,
      "timestampMs": 30562,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 30869,
      "endMs": 31129,
      "timestampMs": 30999,
      "confidence": null
    },
    {
      "text": " IR,",
      "startMs": 31129,
      "endMs": 31609,
      "timestampMs": 31369,
      "confidence": null
    },
    {
      "text": " we've",
      "startMs": 31609,
      "endMs": 31849,
      "timestampMs": 31729,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 31849,
      "endMs": 32154,
      "timestampMs": 32002,
      "confidence": null
    },
    {
      "text": " additional",
      "startMs": 32472,
      "endMs": 33412,
      "timestampMs": 32942,
      "confidence": null
    },
    {
      "text": " models",
      "startMs": 33525,
      "endMs": 34130,
      "timestampMs": 33828,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 34130,
      "endMs": 34250,
      "timestampMs": 34190,
      "confidence": null
    },
    {
      "text": " Global",
      "startMs": 34435,
      "endMs": 34755,
      "timestampMs": 34595,
      "confidence": null
    },
    {
      "text": " Cache.",
      "startMs": 34755,
      "endMs": 35485,
      "timestampMs": 35120,
      "confidence": null
    },
    {
      "text": " We",
      "startMs": 37550,
      "endMs": 37710,
      "timestampMs": 37630,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 37710,
      "endMs": 38350,
      "timestampMs": 38030,
      "confidence": null
    },
    {
      "text": " added",
      "startMs": 38350,
      "endMs": 38790,
      "timestampMs": 38570,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 38950,
      "endMs": 39145,
      "timestampMs": 39048,
      "confidence": null
    },
    {
      "text": " Pooser,",
      "startMs": 39148,
      "endMs": 39588,
      "timestampMs": 39368,
      "confidence": null
    },
    {
      "text": " which",
      "startMs": 39728,
      "endMs": 39968,
      "timestampMs": 39848,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 39968,
      "endMs": 40188,
      "timestampMs": 40078,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 40188,
      "endMs": 40381,
      "timestampMs": 40285,
      "confidence": null
    },
    {
      "text": " industrial",
      "startMs": 40411,
      "endMs": 41216,
      "timestampMs": 40814,
      "confidence": null
    },
    {
      "text": " -type",
      "startMs": 41491,
      "endMs": 41869,
      "timestampMs": 41680,
      "confidence": null
    },
    {
      "text": " wireless",
      "startMs": 41929,
      "endMs": 42724,
      "timestampMs": 42327,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 43087,
      "endMs": 43412,
      "timestampMs": 43250,
      "confidence": null
    },
    {
      "text": " wired",
      "startMs": 43545,
      "endMs": 44160,
      "timestampMs": 43853,
      "confidence": null
    },
    {
      "text": " Ethernet",
      "startMs": 44398,
      "endMs": 44978,
      "timestampMs": 44688,
      "confidence": null
    },
    {
      "text": " portal",
      "startMs": 45376,
      "endMs": 45866,
      "timestampMs": 45621,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 46376,
      "endMs": 46636,
      "timestampMs": 46506,
      "confidence": null
    },
    {
      "text": " allows",
      "startMs": 46896,
      "endMs": 47436,
      "timestampMs": 47166,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 47436,
      "endMs": 47596,
      "timestampMs": 47516,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 47596,
      "endMs": 48116,
      "timestampMs": 47856,
      "confidence": null
    },
    {
      "text": " convert",
      "startMs": 48116,
      "endMs": 48716,
      "timestampMs": 48416,
      "confidence": null
    },
    {
      "text": " IP",
      "startMs": 48716,
      "endMs": 48944,
      "timestampMs": 48830,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 49139,
      "endMs": 49419,
      "timestampMs": 49279,
      "confidence": null
    },
    {
      "text": " RS-232",
      "startMs": 49419,
      "endMs": 50389,
      "timestampMs": 49904,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 51780,
      "endMs": 51980,
      "timestampMs": 51880,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 51980,
      "endMs": 52380,
      "timestampMs": 52180,
      "confidence": null
    },
    {
      "text": " discovery",
      "startMs": 52380,
      "endMs": 52900,
      "timestampMs": 52640,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 52900,
      "endMs": 53020,
      "timestampMs": 52960,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 53020,
      "endMs": 53180,
      "timestampMs": 53100,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 53180,
      "endMs": 53300,
      "timestampMs": 53240,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 53300,
      "endMs": 53400,
      "timestampMs": 53350,
      "confidence": null
    },
    {
      "text": " corner,",
      "startMs": 53400,
      "endMs": 53760,
      "timestampMs": 53580,
      "confidence": null
    },
    {
      "text": " right?",
      "startMs": 54100,
      "endMs": 54370,
      "timestampMs": 54235,
      "confidence": null
    },
    {
      "text": " it'll",
      "startMs": 54680,
      "endMs": 54950,
      "timestampMs": 54815,
      "confidence": null
    },
    {
      "text": " allow",
      "startMs": 54950,
      "endMs": 55250,
      "timestampMs": 55100,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 55250,
      "endMs": 55450,
      "timestampMs": 55350,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 55450,
      "endMs": 55770,
      "timestampMs": 55610,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 55770,
      "endMs": 56420,
      "timestampMs": 56095,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 56678,
      "endMs": 56898,
      "timestampMs": 56788,
      "confidence": null
    },
    {
      "text": " driver",
      "startMs": 56898,
      "endMs": 57393,
      "timestampMs": 57145,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 57621,
      "endMs": 57861,
      "timestampMs": 57741,
      "confidence": null
    },
    {
      "text": " with",
      "startMs": 57861,
      "endMs": 58141,
      "timestampMs": 58001,
      "confidence": null
    },
    {
      "text": " one",
      "startMs": 58141,
      "endMs": 58321,
      "timestampMs": 58231,
      "confidence": null
    },
    {
      "text": " click",
      "startMs": 58321,
      "endMs": 58661,
      "timestampMs": 58491,
      "confidence": null
    },
    {
      "text": " I'm",
      "startMs": 60080,
      "endMs": 60275,
      "timestampMs": 60177,
      "confidence": null
    },
    {
      "text": " gonna",
      "startMs": 60520,
      "endMs": 60780,
      "timestampMs": 60650,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 60780,
      "endMs": 61100,
      "timestampMs": 60940,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 61100,
      "endMs": 61420,
      "timestampMs": 61260,
      "confidence": null
    },
    {
      "text": " add",
      "startMs": 61420,
      "endMs": 61900,
      "timestampMs": 61660,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 61900,
      "endMs": 62120,
      "timestampMs": 62010,
      "confidence": null
    },
    {
      "text": " Acer",
      "startMs": 62280,
      "endMs": 62640,
      "timestampMs": 62460,
      "confidence": null
    },
    {
      "text": " projector,",
      "startMs": 62640,
      "endMs": 63380,
      "timestampMs": 63010,
      "confidence": null
    },
    {
      "text": " RS-232.",
      "startMs": 63560,
      "endMs": 64610,
      "timestampMs": 64085,
      "confidence": null
    },
    {
      "text": " end",
      "startMs": 65260,
      "endMs": 65420,
      "timestampMs": 65340,
      "confidence": null
    },
    {
      "text": " point",
      "startMs": 65420,
      "endMs": 65700,
      "timestampMs": 65560,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 65700,
      "endMs": 65920,
      "timestampMs": 65810,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 65920,
      "endMs": 66080,
      "timestampMs": 66000,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 66080,
      "endMs": 66475,
      "timestampMs": 66278,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 66973,
      "endMs": 67453,
      "timestampMs": 67213,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 67453,
      "endMs": 67593,
      "timestampMs": 67523,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 67593,
      "endMs": 67753,
      "timestampMs": 67673,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 67753,
      "endMs": 68073,
      "timestampMs": 67913,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 68073,
      "endMs": 68253,
      "timestampMs": 68163,
      "confidence": null
    },
    {
      "text": " it",
      "startMs": 68253,
      "endMs": 68333,
      "timestampMs": 68293,
      "confidence": null
    },
    {
      "text": " directly.",
      "startMs": 68333,
      "endMs": 68933,
      "timestampMs": 68633,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 69655,
      "endMs": 69875,
      "timestampMs": 69765,
      "confidence": null
    },
    {
      "text": " whole",
      "startMs": 69875,
      "endMs": 70445,
      "timestampMs": 70160,
      "confidence": null
    },
    {
      "text": " terminal",
      "startMs": 70535,
      "endMs": 71125,
      "timestampMs": 70830,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 71175,
      "endMs": 71375,
      "timestampMs": 71275,
      "confidence": null
    },
    {
      "text": " new",
      "startMs": 71375,
      "endMs": 71715,
      "timestampMs": 71545,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 71715,
      "endMs": 71995,
      "timestampMs": 71855,
      "confidence": null
    },
    {
      "text": " here.",
      "startMs": 71995,
      "endMs": 72430,
      "timestampMs": 72212,
      "confidence": null
    },
    {
      "text": " also",
      "startMs": 72830,
      "endMs": 73173,
      "timestampMs": 73002,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 73243,
      "endMs": 73423,
      "timestampMs": 73333,
      "confidence": null
    },
    {
      "text": " layout,",
      "startMs": 73423,
      "endMs": 73903,
      "timestampMs": 73663,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 73903,
      "endMs": 74073,
      "timestampMs": 73988,
      "confidence": null
    },
    {
      "text": " way",
      "startMs": 74226,
      "endMs": 74426,
      "timestampMs": 74326,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 74426,
      "endMs": 74566,
      "timestampMs": 74496,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 74566,
      "endMs": 74766,
      "timestampMs": 74666,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 74766,
      "endMs": 75101,
      "timestampMs": 74934,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 75104,
      "endMs": 75224,
      "timestampMs": 75164,
      "confidence": null
    },
    {
      "text": " commands",
      "startMs": 75224,
      "endMs": 76034,
      "timestampMs": 75629,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 76277,
      "endMs": 76572,
      "timestampMs": 76425,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 76805,
      "endMs": 77105,
      "timestampMs": 76955,
      "confidence": null
    },
    {
      "text": " configuration",
      "startMs": 77188,
      "endMs": 77828,
      "timestampMs": 77508,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 77828,
      "endMs": 77948,
      "timestampMs": 77888,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 77948,
      "endMs": 78153,
      "timestampMs": 78051,
      "confidence": null
    },
    {
      "text": " right.",
      "startMs": 78308,
      "endMs": 78678,
      "timestampMs": 78493,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 79750,
      "endMs": 79840,
      "timestampMs": 79795,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 79840,
      "endMs": 79980,
      "timestampMs": 79910,
      "confidence": null
    },
    {
      "text": " open",
      "startMs": 79980,
      "endMs": 80200,
      "timestampMs": 80090,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 80200,
      "endMs": 80300,
      "timestampMs": 80250,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 80300,
      "endMs": 80443,
      "timestampMs": 80372,
      "confidence": null
    },
    {
      "text": " terminal",
      "startMs": 80543,
      "endMs": 81003,
      "timestampMs": 80773,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 81003,
      "endMs": 81343,
      "timestampMs": 81173,
      "confidence": null
    },
    {
      "text": " directly,",
      "startMs": 81343,
      "endMs": 82003,
      "timestampMs": 81673,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 82485,
      "endMs": 82605,
      "timestampMs": 82545,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 82605,
      "endMs": 82705,
      "timestampMs": 82655,
      "confidence": null
    },
    {
      "text": " wanted",
      "startMs": 82705,
      "endMs": 83045,
      "timestampMs": 82875,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 83045,
      "endMs": 83585,
      "timestampMs": 83315,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 83585,
      "endMs": 83845,
      "timestampMs": 83715,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 83845,
      "endMs": 83965,
      "timestampMs": 83905,
      "confidence": null
    },
    {
      "text": " command",
      "startMs": 83965,
      "endMs": 84465,
      "timestampMs": 84215,
      "confidence": null
    },
    {
      "text": " directly,",
      "startMs": 84465,
      "endMs": 85005,
      "timestampMs": 84735,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 85005,
      "endMs": 85065,
      "timestampMs": 85035,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 85065,
      "endMs": 85245,
      "timestampMs": 85155,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 85245,
      "endMs": 85385,
      "timestampMs": 85315,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 85385,
      "endMs": 85625,
      "timestampMs": 85505,
      "confidence": null
    },
    {
      "text": " from",
      "startMs": 85625,
      "endMs": 85785,
      "timestampMs": 85705,
      "confidence": null
    },
    {
      "text": " right",
      "startMs": 85785,
      "endMs": 85965,
      "timestampMs": 85875,
      "confidence": null
    },
    {
      "text": " here",
      "startMs": 85965,
      "endMs": 86165,
      "timestampMs": 86065,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 86165,
      "endMs": 86365,
      "timestampMs": 86265,
      "confidence": null
    },
    {
      "text": " well.",
      "startMs": 86365,
      "endMs": 86575,
      "timestampMs": 86470,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 88380,
      "endMs": 88540,
      "timestampMs": 88460,
      "confidence": null
    },
    {
      "text": " additionally,",
      "startMs": 88540,
      "endMs": 89420,
      "timestampMs": 88980,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 89480,
      "endMs": 89580,
      "timestampMs": 89530,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 89580,
      "endMs": 89680,
      "timestampMs": 89630,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 89680,
      "endMs": 90240,
      "timestampMs": 89960,
      "confidence": null
    },
    {
      "text": " has",
      "startMs": 90360,
      "endMs": 90820,
      "timestampMs": 90590,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 90820,
      "endMs": 90900,
      "timestampMs": 90860,
      "confidence": null
    },
    {
      "text": " webpage,",
      "startMs": 90900,
      "endMs": 91580,
      "timestampMs": 91240,
      "confidence": null
    },
    {
      "text": " right,",
      "startMs": 91580,
      "endMs": 91920,
      "timestampMs": 91750,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 92033,
      "endMs": 92193,
      "timestampMs": 92113,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 92193,
      "endMs": 92533,
      "timestampMs": 92363,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 92533,
      "endMs": 92673,
      "timestampMs": 92603,
      "confidence": null
    },
    {
      "text": " able",
      "startMs": 92673,
      "endMs": 92833,
      "timestampMs": 92753,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 92833,
      "endMs": 93013,
      "timestampMs": 92923,
      "confidence": null
    },
    {
      "text": " access",
      "startMs": 93133,
      "endMs": 93553,
      "timestampMs": 93343,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 93553,
      "endMs": 93753,
      "timestampMs": 93653,
      "confidence": null
    },
    {
      "text": " webpage",
      "startMs": 93753,
      "endMs": 94413,
      "timestampMs": 94083,
      "confidence": null
    },
    {
      "text": " directly,",
      "startMs": 94413,
      "endMs": 94973,
      "timestampMs": 94693,
      "confidence": null
    },
    {
      "text": " Another",
      "startMs": 96770,
      "endMs": 97290,
      "timestampMs": 97030,
      "confidence": null
    },
    {
      "text": " great",
      "startMs": 97290,
      "endMs": 97550,
      "timestampMs": 97420,
      "confidence": null
    },
    {
      "text": " feature",
      "startMs": 97550,
      "endMs": 98110,
      "timestampMs": 97830,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 98230,
      "endMs": 98725,
      "timestampMs": 98478,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 98953,
      "endMs": 99248,
      "timestampMs": 99101,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 99293,
      "endMs": 99473,
      "timestampMs": 99383,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 99473,
      "endMs": 99808,
      "timestampMs": 99641,
      "confidence": null
    },
    {
      "text": " drag",
      "startMs": 100141,
      "endMs": 100501,
      "timestampMs": 100321,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 100501,
      "endMs": 100681,
      "timestampMs": 100591,
      "confidence": null
    },
    {
      "text": " drop",
      "startMs": 100681,
      "endMs": 101181,
      "timestampMs": 100931,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 101361,
      "endMs": 101501,
      "timestampMs": 101431,
      "confidence": null
    },
    {
      "text": " sources",
      "startMs": 101501,
      "endMs": 102061,
      "timestampMs": 101781,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 102061,
      "endMs": 102241,
      "timestampMs": 102151,
      "confidence": null
    },
    {
      "text": " there.",
      "startMs": 102241,
      "endMs": 102361,
      "timestampMs": 102301,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 102800,
      "endMs": 102920,
      "timestampMs": 102860,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 102920,
      "endMs": 103040,
      "timestampMs": 102980,
      "confidence": null
    },
    {
      "text": " course",
      "startMs": 103040,
      "endMs": 103320,
      "timestampMs": 103180,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 103320,
      "endMs": 103370,
      "timestampMs": 103345,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 103360,
      "endMs": 103560,
      "timestampMs": 103460,
      "confidence": null
    },
    {
      "text": " select",
      "startMs": 103560,
      "endMs": 103900,
      "timestampMs": 103730,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 104308,
      "endMs": 104388,
      "timestampMs": 104348,
      "confidence": null
    },
    {
      "text": " source",
      "startMs": 104388,
      "endMs": 104908,
      "timestampMs": 104648,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 104908,
      "endMs": 105088,
      "timestampMs": 104998,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 105088,
      "endMs": 105328,
      "timestampMs": 105208,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 105328,
      "endMs": 105508,
      "timestampMs": 105418,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 105508,
      "endMs": 105668,
      "timestampMs": 105588,
      "confidence": null
    },
    {
      "text": " by",
      "startMs": 105668,
      "endMs": 105808,
      "timestampMs": 105738,
      "confidence": null
    },
    {
      "text": " hitting",
      "startMs": 105808,
      "endMs": 106068,
      "timestampMs": 105938,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 106068,
      "endMs": 106308,
      "timestampMs": 106188,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 106308,
      "endMs": 106448,
      "timestampMs": 106378,
      "confidence": null
    },
    {
      "text": " button.",
      "startMs": 106448,
      "endMs": 106833,
      "timestampMs": 106641,
      "confidence": null
    },
    {
      "text": " Also,",
      "startMs": 108335,
      "endMs": 108835,
      "timestampMs": 108585,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 108835,
      "endMs": 109195,
      "timestampMs": 109015,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 109195,
      "endMs": 109365,
      "timestampMs": 109280,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 109515,
      "endMs": 109795,
      "timestampMs": 109655,
      "confidence": null
    },
    {
      "text": " safety",
      "startMs": 109795,
      "endMs": 110215,
      "timestampMs": 110005,
      "confidence": null
    },
    {
      "text": " feature.",
      "startMs": 110215,
      "endMs": 110695,
      "timestampMs": 110455,
      "confidence": null
    },
    {
      "text": " We",
      "startMs": 110695,
      "endMs": 110835,
      "timestampMs": 110765,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 110835,
      "endMs": 111015,
      "timestampMs": 110925,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 111015,
      "endMs": 111095,
      "timestampMs": 111055,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 111095,
      "endMs": 111515,
      "timestampMs": 111305,
      "confidence": null
    },
    {
      "text": " X",
      "startMs": 111515,
      "endMs": 111975,
      "timestampMs": 111745,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 111975,
      "endMs": 112075,
      "timestampMs": 112025,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 112075,
      "endMs": 112195,
      "timestampMs": 112135,
      "confidence": null
    },
    {
      "text": " corner.",
      "startMs": 112195,
      "endMs": 112630,
      "timestampMs": 112413,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 112895,
      "endMs": 112995,
      "timestampMs": 112945,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 112995,
      "endMs": 113075,
      "timestampMs": 113035,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 113075,
      "endMs": 113215,
      "timestampMs": 113145,
      "confidence": null
    },
    {
      "text": " want",
      "startMs": 113215,
      "endMs": 113355,
      "timestampMs": 113285,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 113355,
      "endMs": 113455,
      "timestampMs": 113405,
      "confidence": null
    },
    {
      "text": " cancel",
      "startMs": 113455,
      "endMs": 114075,
      "timestampMs": 113765,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 114075,
      "endMs": 114375,
      "timestampMs": 114225,
      "confidence": null
    },
    {
      "text": " power",
      "startMs": 114375,
      "endMs": 114755,
      "timestampMs": 114565,
      "confidence": null
    },
    {
      "text": " off,",
      "startMs": 114755,
      "endMs": 114805,
      "timestampMs": 114780,
      "confidence": null
    },
    {
      "text": " you're",
      "startMs": 114755,
      "endMs": 114855,
      "timestampMs": 114805,
      "confidence": null
    },
    {
      "text": " able",
      "startMs": 114855,
      "endMs": 114970,
      "timestampMs": 114913,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 114970,
      "endMs": 115095,
      "timestampMs": 115032,
      "confidence": null
    },
    {
      "text": " do",
      "startMs": 115095,
      "endMs": 115255,
      "timestampMs": 115175,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 115255,
      "endMs": 115475,
      "timestampMs": 115365,
      "confidence": null
    },
    {
      "text": " now.",
      "startMs": 115475,
      "endMs": 115885,
      "timestampMs": 115680,
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
    "avoip-more": [
      {
        "text": "And",
        "ms": 12285
      },
      {
        "text": "on",
        "ms": 12405
      },
      {
        "text": "that",
        "ms": 12545
      },
      {
        "text": "note,",
        "ms": 12765
      },
      {
        "text": "we",
        "ms": 12985
      },
      {
        "text": "added",
        "ms": 13185
      },
      {
        "text": "a",
        "ms": 13725
      },
      {
        "text": "lot",
        "ms": 13825
      },
      {
        "text": "more",
        "ms": 14245
      },
      {
        "text": "AV",
        "ms": 14645
      },
      {
        "text": "over",
        "ms": 14905
      },
      {
        "text": "IP",
        "ms": 15165
      },
      {
        "text": "endpoints.",
        "ms": 15645
      }
    ],
    "avoip-brands": [
      {
        "text": "We",
        "ms": 16870
      },
      {
        "text": "also",
        "ms": 17030
      },
      {
        "text": "added",
        "ms": 17350
      },
      {
        "text": "Kramer,",
        "ms": 17730
      },
      {
        "text": "Matrox,",
        "ms": 18658
      },
      {
        "text": "and",
        "ms": 19918
      },
      {
        "text": "all",
        "ms": 20518
      },
      {
        "text": "research",
        "ms": 20718
      },
      {
        "text": "endpoints",
        "ms": 21501
      },
      {
        "text": "for",
        "ms": 22007
      },
      {
        "text": "AV",
        "ms": 22227
      },
      {
        "text": "over",
        "ms": 22407
      },
      {
        "text": "IP.",
        "ms": 22727
      }
    ],
    "gc-models": [
      {
        "text": "As",
        "ms": 24290
      },
      {
        "text": "far",
        "ms": 24410
      },
      {
        "text": "as",
        "ms": 24870
      },
      {
        "text": "endpoints",
        "ms": 25450
      },
      {
        "text": "for",
        "ms": 26290
      },
      {
        "text": "RS",
        "ms": 27118
      },
      {
        "text": "-232,",
        "ms": 27298
      },
      {
        "text": "IP",
        "ms": 28281
      },
      {
        "text": "to",
        "ms": 28661
      },
      {
        "text": "RS",
        "ms": 29041
      },
      {
        "text": "-232,",
        "ms": 29181
      },
      {
        "text": "or",
        "ms": 30109
      },
      {
        "text": "IP",
        "ms": 30269
      },
      {
        "text": "to",
        "ms": 30869
      },
      {
        "text": "IR,",
        "ms": 31129
      },
      {
        "text": "we've",
        "ms": 31609
      },
      {
        "text": "added",
        "ms": 31849
      },
      {
        "text": "additional",
        "ms": 32472
      },
      {
        "text": "models",
        "ms": 33525
      },
      {
        "text": "for",
        "ms": 34130
      },
      {
        "text": "Global",
        "ms": 34435
      },
      {
        "text": "Cache.",
        "ms": 34755
      }
    ],
    "pusr": [
      {
        "text": "We",
        "ms": 37550
      },
      {
        "text": "also",
        "ms": 37710
      },
      {
        "text": "added",
        "ms": 38350
      },
      {
        "text": "a",
        "ms": 38950
      },
      {
        "text": "Pooser,",
        "ms": 39148
      },
      {
        "text": "which",
        "ms": 39728
      },
      {
        "text": "is",
        "ms": 39968
      },
      {
        "text": "an",
        "ms": 40188
      },
      {
        "text": "industrial",
        "ms": 40411
      },
      {
        "text": "-type",
        "ms": 41491
      },
      {
        "text": "wireless",
        "ms": 41929
      },
      {
        "text": "or",
        "ms": 43087
      },
      {
        "text": "wired",
        "ms": 43545
      },
      {
        "text": "Ethernet",
        "ms": 44398
      },
      {
        "text": "portal",
        "ms": 45376
      },
      {
        "text": "and",
        "ms": 46376
      },
      {
        "text": "allows",
        "ms": 46896
      },
      {
        "text": "you",
        "ms": 47436
      },
      {
        "text": "to",
        "ms": 47596
      },
      {
        "text": "convert",
        "ms": 48116
      },
      {
        "text": "IP",
        "ms": 48716
      },
      {
        "text": "to",
        "ms": 49139
      },
      {
        "text": "RS",
        "ms": 49419
      },
      {
        "text": "-232",
        "ms": 49539
      }
    ],
    "disc-corner": [
      {
        "text": "this",
        "ms": 51780
      },
      {
        "text": "device",
        "ms": 51980
      },
      {
        "text": "discovery",
        "ms": 52380
      },
      {
        "text": "up",
        "ms": 52900
      },
      {
        "text": "here",
        "ms": 53020
      },
      {
        "text": "in",
        "ms": 53180
      },
      {
        "text": "the",
        "ms": 53300
      },
      {
        "text": "corner,",
        "ms": 53400
      },
      {
        "text": "right?",
        "ms": 54100
      }
    ],
    "disc-click": [
      {
        "text": "it'll",
        "ms": 54680
      },
      {
        "text": "allow",
        "ms": 54950
      },
      {
        "text": "you",
        "ms": 55250
      },
      {
        "text": "to",
        "ms": 55450
      },
      {
        "text": "add",
        "ms": 55770
      },
      {
        "text": "that",
        "ms": 56678
      },
      {
        "text": "driver",
        "ms": 56898
      },
      {
        "text": "just",
        "ms": 57621
      },
      {
        "text": "with",
        "ms": 57861
      },
      {
        "text": "one",
        "ms": 58141
      },
      {
        "text": "click",
        "ms": 58321
      }
    ],
    "rs-acer": [
      {
        "text": "I'm",
        "ms": 60080
      },
      {
        "text": "gonna",
        "ms": 60520
      },
      {
        "text": "also",
        "ms": 60780
      },
      {
        "text": "just",
        "ms": 61100
      },
      {
        "text": "add",
        "ms": 61420
      },
      {
        "text": "an",
        "ms": 61900
      },
      {
        "text": "Acer",
        "ms": 62280
      },
      {
        "text": "projector,",
        "ms": 62640
      },
      {
        "text": "RS",
        "ms": 63560
      },
      {
        "text": "-232.",
        "ms": 63760
      }
    ],
    "rs-endpoint": [
      {
        "text": "end",
        "ms": 65260
      },
      {
        "text": "point",
        "ms": 65420
      },
      {
        "text": "right",
        "ms": 65700
      },
      {
        "text": "in",
        "ms": 65920
      },
      {
        "text": "here",
        "ms": 66080
      },
      {
        "text": "and",
        "ms": 66973
      },
      {
        "text": "we",
        "ms": 67453
      },
      {
        "text": "can",
        "ms": 67593
      },
      {
        "text": "connect",
        "ms": 67753
      },
      {
        "text": "to",
        "ms": 68073
      },
      {
        "text": "it",
        "ms": 68253
      },
      {
        "text": "directly.",
        "ms": 68333
      }
    ],
    "rs-terminal": [
      {
        "text": "this",
        "ms": 69655
      },
      {
        "text": "whole",
        "ms": 69875
      },
      {
        "text": "terminal",
        "ms": 70535
      },
      {
        "text": "is",
        "ms": 71175
      },
      {
        "text": "new",
        "ms": 71375
      },
      {
        "text": "right",
        "ms": 71715
      },
      {
        "text": "here.",
        "ms": 71995
      }
    ],
    "rs-layout": [
      {
        "text": "also",
        "ms": 72830
      },
      {
        "text": "the",
        "ms": 73243
      },
      {
        "text": "layout,",
        "ms": 73423
      },
      {
        "text": "the",
        "ms": 73903
      },
      {
        "text": "way",
        "ms": 74226
      },
      {
        "text": "that",
        "ms": 74426
      },
      {
        "text": "we",
        "ms": 74566
      },
      {
        "text": "have",
        "ms": 74766
      },
      {
        "text": "the",
        "ms": 75104
      },
      {
        "text": "commands",
        "ms": 75224
      },
      {
        "text": "and",
        "ms": 76277
      },
      {
        "text": "the",
        "ms": 76805
      },
      {
        "text": "configuration",
        "ms": 77188
      },
      {
        "text": "on",
        "ms": 77828
      },
      {
        "text": "the",
        "ms": 77948
      },
      {
        "text": "right.",
        "ms": 78308
      }
    ],
    "term-open": [
      {
        "text": "you",
        "ms": 79750
      },
      {
        "text": "can",
        "ms": 79840
      },
      {
        "text": "open",
        "ms": 79980
      },
      {
        "text": "up",
        "ms": 80200
      },
      {
        "text": "the",
        "ms": 80300
      },
      {
        "text": "terminal",
        "ms": 80543
      },
      {
        "text": "now",
        "ms": 81003
      },
      {
        "text": "directly,",
        "ms": 81343
      }
    ],
    "term-send": [
      {
        "text": "If",
        "ms": 82485
      },
      {
        "text": "I",
        "ms": 82605
      },
      {
        "text": "wanted",
        "ms": 82705
      },
      {
        "text": "to",
        "ms": 83045
      },
      {
        "text": "send",
        "ms": 83585
      },
      {
        "text": "a",
        "ms": 83845
      },
      {
        "text": "command",
        "ms": 83965
      },
      {
        "text": "directly,",
        "ms": 84465
      },
      {
        "text": "I",
        "ms": 85005
      },
      {
        "text": "can",
        "ms": 85065
      },
      {
        "text": "do",
        "ms": 85245
      },
      {
        "text": "that",
        "ms": 85385
      },
      {
        "text": "from",
        "ms": 85625
      },
      {
        "text": "right",
        "ms": 85785
      },
      {
        "text": "here",
        "ms": 85965
      },
      {
        "text": "as",
        "ms": 86165
      },
      {
        "text": "well.",
        "ms": 86365
      }
    ],
    "web": [
      {
        "text": "And",
        "ms": 88380
      },
      {
        "text": "additionally,",
        "ms": 88540
      },
      {
        "text": "if",
        "ms": 89480
      },
      {
        "text": "the",
        "ms": 89580
      },
      {
        "text": "device",
        "ms": 89680
      },
      {
        "text": "has",
        "ms": 90360
      },
      {
        "text": "a",
        "ms": 90820
      },
      {
        "text": "webpage,",
        "ms": 90900
      },
      {
        "text": "right,",
        "ms": 91580
      },
      {
        "text": "then",
        "ms": 92033
      },
      {
        "text": "you'll",
        "ms": 92193
      },
      {
        "text": "be",
        "ms": 92533
      },
      {
        "text": "able",
        "ms": 92673
      },
      {
        "text": "to",
        "ms": 92833
      },
      {
        "text": "access",
        "ms": 93133
      },
      {
        "text": "that",
        "ms": 93553
      },
      {
        "text": "webpage",
        "ms": 93753
      },
      {
        "text": "directly,",
        "ms": 94413
      }
    ],
    "eui-drag": [
      {
        "text": "Another",
        "ms": 96770
      },
      {
        "text": "great",
        "ms": 97290
      },
      {
        "text": "feature",
        "ms": 97550
      },
      {
        "text": "now",
        "ms": 98230
      },
      {
        "text": "is",
        "ms": 98953
      },
      {
        "text": "you",
        "ms": 99293
      },
      {
        "text": "can",
        "ms": 99473
      },
      {
        "text": "drag",
        "ms": 100141
      },
      {
        "text": "and",
        "ms": 100501
      },
      {
        "text": "drop",
        "ms": 100681
      },
      {
        "text": "the",
        "ms": 101361
      },
      {
        "text": "sources",
        "ms": 101501
      },
      {
        "text": "on",
        "ms": 102061
      },
      {
        "text": "there.",
        "ms": 102241
      }
    ],
    "eui-all": [
      {
        "text": "And",
        "ms": 102800
      },
      {
        "text": "of",
        "ms": 102920
      },
      {
        "text": "course",
        "ms": 103040
      },
      {
        "text": "you",
        "ms": 103320
      },
      {
        "text": "can",
        "ms": 103360
      },
      {
        "text": "select",
        "ms": 103560
      },
      {
        "text": "a",
        "ms": 104308
      },
      {
        "text": "source",
        "ms": 104388
      },
      {
        "text": "and",
        "ms": 104908
      },
      {
        "text": "send",
        "ms": 105088
      },
      {
        "text": "to",
        "ms": 105328
      },
      {
        "text": "all",
        "ms": 105508
      },
      {
        "text": "by",
        "ms": 105668
      },
      {
        "text": "hitting",
        "ms": 105808
      },
      {
        "text": "that",
        "ms": 106068
      },
      {
        "text": "all",
        "ms": 106308
      },
      {
        "text": "button.",
        "ms": 106448
      }
    ],
    "power-x": [
      {
        "text": "Also,",
        "ms": 108335
      },
      {
        "text": "just",
        "ms": 108835
      },
      {
        "text": "a",
        "ms": 109195
      },
      {
        "text": "little",
        "ms": 109515
      },
      {
        "text": "safety",
        "ms": 109795
      },
      {
        "text": "feature.",
        "ms": 110215
      },
      {
        "text": "We",
        "ms": 110695
      },
      {
        "text": "have",
        "ms": 110835
      },
      {
        "text": "a",
        "ms": 111015
      },
      {
        "text": "little",
        "ms": 111095
      },
      {
        "text": "X",
        "ms": 111515
      },
      {
        "text": "in",
        "ms": 111975
      },
      {
        "text": "the",
        "ms": 112075
      },
      {
        "text": "corner.",
        "ms": 112195
      },
      {
        "text": "So",
        "ms": 112895
      },
      {
        "text": "if",
        "ms": 112995
      },
      {
        "text": "you",
        "ms": 113075
      },
      {
        "text": "want",
        "ms": 113215
      },
      {
        "text": "to",
        "ms": 113355
      },
      {
        "text": "cancel",
        "ms": 113455
      },
      {
        "text": "or",
        "ms": 114075
      },
      {
        "text": "power",
        "ms": 114375
      },
      {
        "text": "off,",
        "ms": 114755
      },
      {
        "text": "you're",
        "ms": 114755
      },
      {
        "text": "able",
        "ms": 114855
      },
      {
        "text": "to",
        "ms": 114970
      },
      {
        "text": "do",
        "ms": 115095
      },
      {
        "text": "that",
        "ms": 115255
      },
      {
        "text": "now.",
        "ms": 115475
      }
    ]
  }
};

export const IOT_LATEST_EDIT = NARRATION_EDIT;

