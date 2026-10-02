// Written by `npm run narration:edit`. Do not edit; change src/marketing/terminator-walkthrough/terminatorWalkthroughNarration.ts and rebuild.

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
  "seconds": 138,
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
      "id": "scan-info",
      "at": 16.75,
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
      "at": 24.5,
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
      "at": 34.25,
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
      "at": 37.95,
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
      "at": 44.345,
      "start": 196.745,
      "end": 204.93,
      "seconds": 7.586,
      "removed": []
    },
    {
      "id": "pin",
      "at": 57.25,
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
      "at": 73.25,
      "start": 244.9,
      "end": 251.085,
      "seconds": 6.185,
      "removed": []
    },
    {
      "id": "raw-tcp",
      "at": 79.72,
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
      "at": 90.75,
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
      "at": 94,
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
      "at": 101.65,
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
      "at": 107.25,
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
      "at": 113.6,
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
      "at": 121.75,
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
      "at": 134.725,
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
      "text": " You",
      "startMs": 16770,
      "endMs": 16910,
      "timestampMs": 16840,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 16910,
      "endMs": 17110,
      "timestampMs": 17010,
      "confidence": null
    },
    {
      "text": " get",
      "startMs": 17110,
      "endMs": 17290,
      "timestampMs": 17200,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 17290,
      "endMs": 17430,
      "timestampMs": 17360,
      "confidence": null
    },
    {
      "text": " host",
      "startMs": 17430,
      "endMs": 17730,
      "timestampMs": 17580,
      "confidence": null
    },
    {
      "text": " name,",
      "startMs": 17730,
      "endMs": 18295,
      "timestampMs": 18013,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 18638,
      "endMs": 19118,
      "timestampMs": 18878,
      "confidence": null
    },
    {
      "text": " name,",
      "startMs": 19118,
      "endMs": 19693,
      "timestampMs": 19405,
      "confidence": null
    },
    {
      "text": " manufacturer,",
      "startMs": 20081,
      "endMs": 21326,
      "timestampMs": 20703,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 21779,
      "endMs": 21939,
      "timestampMs": 21859,
      "confidence": null
    },
    {
      "text": " well",
      "startMs": 21939,
      "endMs": 22419,
      "timestampMs": 22179,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 22419,
      "endMs": 22582,
      "timestampMs": 22500,
      "confidence": null
    },
    {
      "text": " Mac",
      "startMs": 22667,
      "endMs": 22967,
      "timestampMs": 22817,
      "confidence": null
    },
    {
      "text": " address.",
      "startMs": 22967,
      "endMs": 23682,
      "timestampMs": 23324,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 24640,
      "endMs": 24820,
      "timestampMs": 24730,
      "confidence": null
    },
    {
      "text": " if",
      "startMs": 24820,
      "endMs": 24920,
      "timestampMs": 24870,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 24920,
      "endMs": 25020,
      "timestampMs": 24970,
      "confidence": null
    },
    {
      "text": " scroll",
      "startMs": 25020,
      "endMs": 25400,
      "timestampMs": 25210,
      "confidence": null
    },
    {
      "text": " over,",
      "startMs": 25400,
      "endMs": 25640,
      "timestampMs": 25520,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 25640,
      "endMs": 25760,
      "timestampMs": 25700,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 25760,
      "endMs": 25940,
      "timestampMs": 25850,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 25940,
      "endMs": 26120,
      "timestampMs": 26030,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 26120,
      "endMs": 26380,
      "timestampMs": 26250,
      "confidence": null
    },
    {
      "text": " there's",
      "startMs": 26380,
      "endMs": 26680,
      "timestampMs": 26530,
      "confidence": null
    },
    {
      "text": " even",
      "startMs": 26680,
      "endMs": 26960,
      "timestampMs": 26820,
      "confidence": null
    },
    {
      "text": " links",
      "startMs": 26960,
      "endMs": 27465,
      "timestampMs": 27212,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 27573,
      "endMs": 27753,
      "timestampMs": 27663,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 27753,
      "endMs": 27913,
      "timestampMs": 27833,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 27913,
      "endMs": 28533,
      "timestampMs": 28223,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 28714,
      "endMs": 28974,
      "timestampMs": 28844,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 28974,
      "endMs": 29409,
      "timestampMs": 29191,
      "confidence": null
    },
    {
      "text": " directly",
      "startMs": 29402,
      "endMs": 29842,
      "timestampMs": 29622,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 29842,
      "endMs": 30270,
      "timestampMs": 30056,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 30270,
      "endMs": 30385,
      "timestampMs": 30327,
      "confidence": null
    },
    {
      "text": " website",
      "startMs": 30385,
      "endMs": 31050,
      "timestampMs": 30717,
      "confidence": null
    },
    {
      "text": " Now",
      "startMs": 34325,
      "endMs": 34485,
      "timestampMs": 34405,
      "confidence": null
    },
    {
      "text": " let's",
      "startMs": 34485,
      "endMs": 34705,
      "timestampMs": 34595,
      "confidence": null
    },
    {
      "text": " take",
      "startMs": 34705,
      "endMs": 34965,
      "timestampMs": 34835,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 34965,
      "endMs": 35015,
      "timestampMs": 34990,
      "confidence": null
    },
    {
      "text": " look",
      "startMs": 35005,
      "endMs": 35285,
      "timestampMs": 35145,
      "confidence": null
    },
    {
      "text": " at",
      "startMs": 35285,
      "endMs": 35860,
      "timestampMs": 35572,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 35998,
      "endMs": 36183,
      "timestampMs": 36090,
      "confidence": null
    },
    {
      "text": " TCP",
      "startMs": 36358,
      "endMs": 36818,
      "timestampMs": 36588,
      "confidence": null
    },
    {
      "text": " server,",
      "startMs": 36818,
      "endMs": 37393,
      "timestampMs": 37105,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 38010,
      "endMs": 38170,
      "timestampMs": 38090,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 38170,
      "endMs": 38330,
      "timestampMs": 38250,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 38330,
      "endMs": 38490,
      "timestampMs": 38410,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 38490,
      "endMs": 38730,
      "timestampMs": 38610,
      "confidence": null
    },
    {
      "text": " test,",
      "startMs": 38730,
      "endMs": 39160,
      "timestampMs": 38945,
      "confidence": null
    },
    {
      "text": " say,",
      "startMs": 39290,
      "endMs": 39780,
      "timestampMs": 39535,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 39888,
      "endMs": 40088,
      "timestampMs": 39988,
      "confidence": null
    },
    {
      "text": " CTRLbot",
      "startMs": 40088,
      "endMs": 40888,
      "timestampMs": 40488,
      "confidence": null
    },
    {
      "text": " IoT",
      "startMs": 40888,
      "endMs": 41286,
      "timestampMs": 41087,
      "confidence": null
    },
    {
      "text": " app",
      "startMs": 41306,
      "endMs": 41506,
      "timestampMs": 41406,
      "confidence": null
    },
    {
      "text": " from",
      "startMs": 41869,
      "endMs": 42089,
      "timestampMs": 41979,
      "confidence": null
    },
    {
      "text": " it.",
      "startMs": 42089,
      "endMs": 42229,
      "timestampMs": 42159,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 44380,
      "endMs": 44480,
      "timestampMs": 44430,
      "confidence": null
    },
    {
      "text": " now",
      "startMs": 44480,
      "endMs": 44660,
      "timestampMs": 44570,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 44660,
      "endMs": 44780,
      "timestampMs": 44720,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 44780,
      "endMs": 44980,
      "timestampMs": 44880,
      "confidence": null
    },
    {
      "text": " see",
      "startMs": 44980,
      "endMs": 45480,
      "timestampMs": 45230,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 45480,
      "endMs": 45680,
      "timestampMs": 45580,
      "confidence": null
    },
    {
      "text": " I'm",
      "startMs": 45680,
      "endMs": 45860,
      "timestampMs": 45770,
      "confidence": null
    },
    {
      "text": " actually",
      "startMs": 45860,
      "endMs": 46380,
      "timestampMs": 46120,
      "confidence": null
    },
    {
      "text": " connected",
      "startMs": 46380,
      "endMs": 46820,
      "timestampMs": 46600,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 46820,
      "endMs": 47060,
      "timestampMs": 46940,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 47060,
      "endMs": 47220,
      "timestampMs": 47140,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 47618,
      "endMs": 47718,
      "timestampMs": 47668,
      "confidence": null
    },
    {
      "text": " I",
      "startMs": 47718,
      "endMs": 47798,
      "timestampMs": 47758,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 47798,
      "endMs": 48018,
      "timestampMs": 47908,
      "confidence": null
    },
    {
      "text": " send",
      "startMs": 48018,
      "endMs": 48338,
      "timestampMs": 48178,
      "confidence": null
    },
    {
      "text": " commands",
      "startMs": 48338,
      "endMs": 49148,
      "timestampMs": 48743,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 49461,
      "endMs": 49861,
      "timestampMs": 49661,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 49861,
      "endMs": 50121,
      "timestampMs": 49991,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 50121,
      "endMs": 50321,
      "timestampMs": 50221,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 50321,
      "endMs": 50461,
      "timestampMs": 50391,
      "confidence": null
    },
    {
      "text": " they",
      "startMs": 50461,
      "endMs": 50621,
      "timestampMs": 50541,
      "confidence": null
    },
    {
      "text": " show",
      "startMs": 50621,
      "endMs": 50881,
      "timestampMs": 50751,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 50881,
      "endMs": 51036,
      "timestampMs": 50959,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 51161,
      "endMs": 51401,
      "timestampMs": 51281,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 51401,
      "endMs": 51891,
      "timestampMs": 51646,
      "confidence": null
    },
    {
      "text": " Up",
      "startMs": 57340,
      "endMs": 57500,
      "timestampMs": 57420,
      "confidence": null
    },
    {
      "text": " here,",
      "startMs": 57500,
      "endMs": 57700,
      "timestampMs": 57600,
      "confidence": null
    },
    {
      "text": " you'll",
      "startMs": 57700,
      "endMs": 57980,
      "timestampMs": 57840,
      "confidence": null
    },
    {
      "text": " notice",
      "startMs": 57980,
      "endMs": 58260,
      "timestampMs": 58120,
      "confidence": null
    },
    {
      "text": " there's",
      "startMs": 58260,
      "endMs": 58460,
      "timestampMs": 58360,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 58460,
      "endMs": 58510,
      "timestampMs": 58485,
      "confidence": null
    },
    {
      "text": " little",
      "startMs": 58460,
      "endMs": 58720,
      "timestampMs": 58590,
      "confidence": null
    },
    {
      "text": " pin.",
      "startMs": 58720,
      "endMs": 59235,
      "timestampMs": 58978,
      "confidence": null
    },
    {
      "text": " If",
      "startMs": 59260,
      "endMs": 59380,
      "timestampMs": 59320,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 59658,
      "endMs": 59798,
      "timestampMs": 59728,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 59798,
      "endMs": 59998,
      "timestampMs": 59898,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 59998,
      "endMs": 60158,
      "timestampMs": 60078,
      "confidence": null
    },
    {
      "text": " save",
      "startMs": 60158,
      "endMs": 60618,
      "timestampMs": 60388,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 60618,
      "endMs": 60798,
      "timestampMs": 60708,
      "confidence": null
    },
    {
      "text": " of",
      "startMs": 60798,
      "endMs": 60938,
      "timestampMs": 60868,
      "confidence": null
    },
    {
      "text": " these",
      "startMs": 60938,
      "endMs": 61261,
      "timestampMs": 61099,
      "confidence": null
    },
    {
      "text": " connections,",
      "startMs": 61301,
      "endMs": 61821,
      "timestampMs": 61561,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 61821,
      "endMs": 61941,
      "timestampMs": 61881,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 61941,
      "endMs": 62121,
      "timestampMs": 62031,
      "confidence": null
    },
    {
      "text": " always",
      "startMs": 62121,
      "endMs": 62421,
      "timestampMs": 62271,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 62421,
      "endMs": 62701,
      "timestampMs": 62561,
      "confidence": null
    },
    {
      "text": " pin",
      "startMs": 62701,
      "endMs": 62981,
      "timestampMs": 62841,
      "confidence": null
    },
    {
      "text": " it,",
      "startMs": 62981,
      "endMs": 63121,
      "timestampMs": 63051,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 63494,
      "endMs": 63594,
      "timestampMs": 63544,
      "confidence": null
    },
    {
      "text": " then",
      "startMs": 63594,
      "endMs": 63714,
      "timestampMs": 63654,
      "confidence": null
    },
    {
      "text": " they'll",
      "startMs": 63714,
      "endMs": 63954,
      "timestampMs": 63834,
      "confidence": null
    },
    {
      "text": " be",
      "startMs": 63954,
      "endMs": 64094,
      "timestampMs": 64024,
      "confidence": null
    },
    {
      "text": " available",
      "startMs": 64094,
      "endMs": 64574,
      "timestampMs": 64334,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 64574,
      "endMs": 64714,
      "timestampMs": 64644,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 64714,
      "endMs": 64834,
      "timestampMs": 64774,
      "confidence": null
    },
    {
      "text": " next",
      "startMs": 64834,
      "endMs": 65094,
      "timestampMs": 64964,
      "confidence": null
    },
    {
      "text": " time",
      "startMs": 65094,
      "endMs": 65584,
      "timestampMs": 65339,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 65905,
      "endMs": 66045,
      "timestampMs": 65975,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 66045,
      "endMs": 66225,
      "timestampMs": 66135,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 66225,
      "endMs": 66385,
      "timestampMs": 66305,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 66385,
      "endMs": 66690,
      "timestampMs": 66538,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 66845,
      "endMs": 67400,
      "timestampMs": 67123,
      "confidence": null
    },
    {
      "text": " various",
      "startMs": 67505,
      "endMs": 68245,
      "timestampMs": 67875,
      "confidence": null
    },
    {
      "text": " ports",
      "startMs": 68283,
      "endMs": 68703,
      "timestampMs": 68493,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 68703,
      "endMs": 68783,
      "timestampMs": 68743,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 68783,
      "endMs": 68923,
      "timestampMs": 68853,
      "confidence": null
    },
    {
      "text": " might",
      "startMs": 68923,
      "endMs": 69253,
      "timestampMs": 69088,
      "confidence": null
    },
    {
      "text": " need",
      "startMs": 69823,
      "endMs": 70043,
      "timestampMs": 69933,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 70043,
      "endMs": 70163,
      "timestampMs": 70103,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 70163,
      "endMs": 70513,
      "timestampMs": 70338,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 70513,
      "endMs": 70803,
      "timestampMs": 70658,
      "confidence": null
    },
    {
      "text": " Now",
      "startMs": 73340,
      "endMs": 73780,
      "timestampMs": 73560,
      "confidence": null
    },
    {
      "text": " we're",
      "startMs": 73780,
      "endMs": 73980,
      "timestampMs": 73880,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 73980,
      "endMs": 74140,
      "timestampMs": 74060,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 74140,
      "endMs": 74240,
      "timestampMs": 74190,
      "confidence": null
    },
    {
      "text": " go",
      "startMs": 74240,
      "endMs": 74460,
      "timestampMs": 74350,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 74460,
      "endMs": 74600,
      "timestampMs": 74530,
      "confidence": null
    },
    {
      "text": " other",
      "startMs": 74600,
      "endMs": 74800,
      "timestampMs": 74700,
      "confidence": null
    },
    {
      "text": " direction.",
      "startMs": 74800,
      "endMs": 75280,
      "timestampMs": 75040,
      "confidence": null
    },
    {
      "text": " Now",
      "startMs": 75880,
      "endMs": 76060,
      "timestampMs": 75970,
      "confidence": null
    },
    {
      "text": " we're",
      "startMs": 76060,
      "endMs": 76240,
      "timestampMs": 76150,
      "confidence": null
    },
    {
      "text": " going",
      "startMs": 76240,
      "endMs": 76520,
      "timestampMs": 76380,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 76520,
      "endMs": 76720,
      "timestampMs": 76620,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 76720,
      "endMs": 77040,
      "timestampMs": 76880,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 77040,
      "endMs": 77260,
      "timestampMs": 77150,
      "confidence": null
    },
    {
      "text": " devices",
      "startMs": 77260,
      "endMs": 77960,
      "timestampMs": 77610,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 77960,
      "endMs": 78140,
      "timestampMs": 78050,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 78140,
      "endMs": 78340,
      "timestampMs": 78240,
      "confidence": null
    },
    {
      "text": " on",
      "startMs": 78340,
      "endMs": 78610,
      "timestampMs": 78475,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 78680,
      "endMs": 78820,
      "timestampMs": 78750,
      "confidence": null
    },
    {
      "text": " network.",
      "startMs": 78820,
      "endMs": 79300,
      "timestampMs": 79060,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 80200,
      "endMs": 80340,
      "timestampMs": 80270,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 80340,
      "endMs": 80520,
      "timestampMs": 80430,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 80520,
      "endMs": 80660,
      "timestampMs": 80590,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 80660,
      "endMs": 80760,
      "timestampMs": 80710,
      "confidence": null
    },
    {
      "text": " raw",
      "startMs": 80760,
      "endMs": 81245,
      "timestampMs": 81003,
      "confidence": null
    },
    {
      "text": " TCP",
      "startMs": 81518,
      "endMs": 82158,
      "timestampMs": 81838,
      "confidence": null
    },
    {
      "text": " connection.",
      "startMs": 82158,
      "endMs": 82818,
      "timestampMs": 82488,
      "confidence": null
    },
    {
      "text": " So",
      "startMs": 83358,
      "endMs": 83618,
      "timestampMs": 83488,
      "confidence": null
    },
    {
      "text": " it's",
      "startMs": 83618,
      "endMs": 83798,
      "timestampMs": 83708,
      "confidence": null
    },
    {
      "text": " good",
      "startMs": 83798,
      "endMs": 84058,
      "timestampMs": 83928,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 84058,
      "endMs": 84518,
      "timestampMs": 84288,
      "confidence": null
    },
    {
      "text": " Telnet",
      "startMs": 84518,
      "endMs": 85223,
      "timestampMs": 84871,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 85576,
      "endMs": 86056,
      "timestampMs": 85816,
      "confidence": null
    },
    {
      "text": " any",
      "startMs": 86174,
      "endMs": 86354,
      "timestampMs": 86264,
      "confidence": null
    },
    {
      "text": " real",
      "startMs": 86354,
      "endMs": 86654,
      "timestampMs": 86504,
      "confidence": null
    },
    {
      "text": " port,",
      "startMs": 86654,
      "endMs": 87099,
      "timestampMs": 86877,
      "confidence": null
    },
    {
      "text": " TCP",
      "startMs": 87152,
      "endMs": 87455,
      "timestampMs": 87304,
      "confidence": null
    },
    {
      "text": " port.",
      "startMs": 87455,
      "endMs": 87915,
      "timestampMs": 87685,
      "confidence": null
    },
    {
      "text": " Next,",
      "startMs": 90780,
      "endMs": 90960,
      "timestampMs": 90870,
      "confidence": null
    },
    {
      "text": " I'd",
      "startMs": 90960,
      "endMs": 91120,
      "timestampMs": 91040,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 91120,
      "endMs": 91300,
      "timestampMs": 91210,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 91300,
      "endMs": 91440,
      "timestampMs": 91370,
      "confidence": null
    },
    {
      "text": " show",
      "startMs": 91440,
      "endMs": 91995,
      "timestampMs": 91718,
      "confidence": null
    },
    {
      "text": " our",
      "startMs": 92188,
      "endMs": 92368,
      "timestampMs": 92278,
      "confidence": null
    },
    {
      "text": " COM",
      "startMs": 92368,
      "endMs": 92648,
      "timestampMs": 92508,
      "confidence": null
    },
    {
      "text": " ports,",
      "startMs": 92648,
      "endMs": 92793,
      "timestampMs": 92720,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 94050,
      "endMs": 94210,
      "timestampMs": 94130,
      "confidence": null
    },
    {
      "text": " so",
      "startMs": 94210,
      "endMs": 94570,
      "timestampMs": 94390,
      "confidence": null
    },
    {
      "text": " this",
      "startMs": 94570,
      "endMs": 94730,
      "timestampMs": 94650,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 94730,
      "endMs": 94830,
      "timestampMs": 94780,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 94830,
      "endMs": 94910,
      "timestampMs": 94870,
      "confidence": null
    },
    {
      "text": " PC",
      "startMs": 94910,
      "endMs": 95610,
      "timestampMs": 95260,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 95883,
      "endMs": 96023,
      "timestampMs": 95953,
      "confidence": null
    },
    {
      "text": " you",
      "startMs": 96023,
      "endMs": 96183,
      "timestampMs": 96103,
      "confidence": null
    },
    {
      "text": " can",
      "startMs": 96183,
      "endMs": 96523,
      "timestampMs": 96353,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 96643,
      "endMs": 97103,
      "timestampMs": 96873,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 97491,
      "endMs": 97741,
      "timestampMs": 97616,
      "confidence": null
    },
    {
      "text": " serial",
      "startMs": 97831,
      "endMs": 98386,
      "timestampMs": 98109,
      "confidence": null
    },
    {
      "text": " via",
      "startMs": 98711,
      "endMs": 99071,
      "timestampMs": 98891,
      "confidence": null
    },
    {
      "text": " USB",
      "startMs": 99071,
      "endMs": 99791,
      "timestampMs": 99431,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 99831,
      "endMs": 99991,
      "timestampMs": 99911,
      "confidence": null
    },
    {
      "text": " Bluetooth.",
      "startMs": 99991,
      "endMs": 100616,
      "timestampMs": 100303,
      "confidence": null
    },
    {
      "text": " And",
      "startMs": 101745,
      "endMs": 102000,
      "timestampMs": 101873,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 102058,
      "endMs": 102198,
      "timestampMs": 102128,
      "confidence": null
    },
    {
      "text": " fully",
      "startMs": 102198,
      "endMs": 102478,
      "timestampMs": 102338,
      "confidence": null
    },
    {
      "text": " support",
      "startMs": 102478,
      "endMs": 102878,
      "timestampMs": 102678,
      "confidence": null
    },
    {
      "text": " all",
      "startMs": 102878,
      "endMs": 103058,
      "timestampMs": 102968,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 103058,
      "endMs": 103158,
      "timestampMs": 103108,
      "confidence": null
    },
    {
      "text": " parameters",
      "startMs": 103158,
      "endMs": 103778,
      "timestampMs": 103468,
      "confidence": null
    },
    {
      "text": " for",
      "startMs": 103778,
      "endMs": 103958,
      "timestampMs": 103868,
      "confidence": null
    },
    {
      "text": " most",
      "startMs": 103958,
      "endMs": 104518,
      "timestampMs": 104238,
      "confidence": null
    },
    {
      "text": " serial",
      "startMs": 104586,
      "endMs": 104886,
      "timestampMs": 104736,
      "confidence": null
    },
    {
      "text": " communication.",
      "startMs": 104886,
      "endMs": 105716,
      "timestampMs": 105301,
      "confidence": null
    },
    {
      "text": " Finally,",
      "startMs": 107285,
      "endMs": 107875,
      "timestampMs": 107580,
      "confidence": null
    },
    {
      "text": " I'd",
      "startMs": 108278,
      "endMs": 108398,
      "timestampMs": 108338,
      "confidence": null
    },
    {
      "text": " like",
      "startMs": 108398,
      "endMs": 108578,
      "timestampMs": 108488,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 108578,
      "endMs": 108698,
      "timestampMs": 108638,
      "confidence": null
    },
    {
      "text": " show",
      "startMs": 108698,
      "endMs": 109253,
      "timestampMs": 108976,
      "confidence": null
    },
    {
      "text": " that",
      "startMs": 109251,
      "endMs": 109551,
      "timestampMs": 109401,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 109551,
      "endMs": 109711,
      "timestampMs": 109631,
      "confidence": null
    },
    {
      "text": " have",
      "startMs": 109711,
      "endMs": 109931,
      "timestampMs": 109821,
      "confidence": null
    },
    {
      "text": " an",
      "startMs": 109931,
      "endMs": 110271,
      "timestampMs": 110101,
      "confidence": null
    },
    {
      "text": " SSH",
      "startMs": 110271,
      "endMs": 110626,
      "timestampMs": 110449,
      "confidence": null
    },
    {
      "text": " client",
      "startMs": 110937,
      "endMs": 111317,
      "timestampMs": 111127,
      "confidence": null
    },
    {
      "text": " as",
      "startMs": 111317,
      "endMs": 111457,
      "timestampMs": 111387,
      "confidence": null
    },
    {
      "text": " well.",
      "startMs": 111457,
      "endMs": 111777,
      "timestampMs": 111617,
      "confidence": null
    },
    {
      "text": " Let's",
      "startMs": 113600,
      "endMs": 113690,
      "timestampMs": 113645,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 113690,
      "endMs": 113888,
      "timestampMs": 113789,
      "confidence": null
    },
    {
      "text": " see,",
      "startMs": 113888,
      "endMs": 114208,
      "timestampMs": 114048,
      "confidence": null
    },
    {
      "text": " I'll",
      "startMs": 114208,
      "endMs": 114418,
      "timestampMs": 114313,
      "confidence": null
    },
    {
      "text": " type",
      "startMs": 114848,
      "endMs": 115008,
      "timestampMs": 114928,
      "confidence": null
    },
    {
      "text": " in",
      "startMs": 115008,
      "endMs": 115148,
      "timestampMs": 115078,
      "confidence": null
    },
    {
      "text": " help.",
      "startMs": 115148,
      "endMs": 115433,
      "timestampMs": 115290,
      "confidence": null
    },
    {
      "text": " Oh",
      "startMs": 116298,
      "endMs": 116438,
      "timestampMs": 116368,
      "confidence": null
    },
    {
      "text": " yes,",
      "startMs": 116438,
      "endMs": 116873,
      "timestampMs": 116655,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 117278,
      "endMs": 117438,
      "timestampMs": 117358,
      "confidence": null
    },
    {
      "text": " are",
      "startMs": 117438,
      "endMs": 117558,
      "timestampMs": 117498,
      "confidence": null
    },
    {
      "text": " connected",
      "startMs": 117558,
      "endMs": 117938,
      "timestampMs": 117748,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 117938,
      "endMs": 118138,
      "timestampMs": 118038,
      "confidence": null
    },
    {
      "text": " Luxall",
      "startMs": 118138,
      "endMs": 118798,
      "timestampMs": 118468,
      "confidence": null
    },
    {
      "text": " and",
      "startMs": 119031,
      "endMs": 119151,
      "timestampMs": 119091,
      "confidence": null
    },
    {
      "text": " everything",
      "startMs": 119151,
      "endMs": 119471,
      "timestampMs": 119311,
      "confidence": null
    },
    {
      "text": " is",
      "startMs": 119471,
      "endMs": 119551,
      "timestampMs": 119511,
      "confidence": null
    },
    {
      "text": " showing",
      "startMs": 119551,
      "endMs": 119831,
      "timestampMs": 119691,
      "confidence": null
    },
    {
      "text": " up",
      "startMs": 119831,
      "endMs": 119931,
      "timestampMs": 119881,
      "confidence": null
    },
    {
      "text": " just",
      "startMs": 119931,
      "endMs": 120156,
      "timestampMs": 120043,
      "confidence": null
    },
    {
      "text": " great.",
      "startMs": 120156,
      "endMs": 120436,
      "timestampMs": 120296,
      "confidence": null
    },
    {
      "text": " we",
      "startMs": 121750,
      "endMs": 121920,
      "timestampMs": 121835,
      "confidence": null
    },
    {
      "text": " went",
      "startMs": 121920,
      "endMs": 122120,
      "timestampMs": 122020,
      "confidence": null
    },
    {
      "text": " over",
      "startMs": 122120,
      "endMs": 122530,
      "timestampMs": 122325,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 122700,
      "endMs": 122840,
      "timestampMs": 122770,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 122840,
      "endMs": 122940,
      "timestampMs": 122890,
      "confidence": null
    },
    {
      "text": " scan,",
      "startMs": 122940,
      "endMs": 123765,
      "timestampMs": 123352,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 123920,
      "endMs": 124040,
      "timestampMs": 123980,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 124040,
      "endMs": 124140,
      "timestampMs": 124090,
      "confidence": null
    },
    {
      "text": " create",
      "startMs": 124140,
      "endMs": 124500,
      "timestampMs": 124320,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 124633,
      "endMs": 124733,
      "timestampMs": 124683,
      "confidence": null
    },
    {
      "text": " TCP",
      "startMs": 124733,
      "endMs": 125103,
      "timestampMs": 124918,
      "confidence": null
    },
    {
      "text": " server,",
      "startMs": 125333,
      "endMs": 126053,
      "timestampMs": 125693,
      "confidence": null
    },
    {
      "text": " how",
      "startMs": 126173,
      "endMs": 126293,
      "timestampMs": 126233,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 126293,
      "endMs": 126393,
      "timestampMs": 126343,
      "confidence": null
    },
    {
      "text": " connect",
      "startMs": 126393,
      "endMs": 126773,
      "timestampMs": 126583,
      "confidence": null
    },
    {
      "text": " to",
      "startMs": 126773,
      "endMs": 127113,
      "timestampMs": 126943,
      "confidence": null
    },
    {
      "text": " a",
      "startMs": 127113,
      "endMs": 127193,
      "timestampMs": 127153,
      "confidence": null
    },
    {
      "text": " device",
      "startMs": 127193,
      "endMs": 127578,
      "timestampMs": 127386,
      "confidence": null
    },
    {
      "text": " via",
      "startMs": 128056,
      "endMs": 128216,
      "timestampMs": 128136,
      "confidence": null
    },
    {
      "text": " Telnet,",
      "startMs": 128216,
      "endMs": 128781,
      "timestampMs": 128499,
      "confidence": null
    },
    {
      "text": " SSH",
      "startMs": 129279,
      "endMs": 129819,
      "timestampMs": 129549,
      "confidence": null
    },
    {
      "text": " client",
      "startMs": 129819,
      "endMs": 130359,
      "timestampMs": 130089,
      "confidence": null
    },
    {
      "text": " or",
      "startMs": 130619,
      "endMs": 130832,
      "timestampMs": 130726,
      "confidence": null
    },
    {
      "text": " through",
      "startMs": 130832,
      "endMs": 131212,
      "timestampMs": 131022,
      "confidence": null
    },
    {
      "text": " the",
      "startMs": 131212,
      "endMs": 131392,
      "timestampMs": 131302,
      "confidence": null
    },
    {
      "text": " serial",
      "startMs": 131392,
      "endMs": 131772,
      "timestampMs": 131582,
      "confidence": null
    },
    {
      "text": " com",
      "startMs": 131772,
      "endMs": 131992,
      "timestampMs": 131882,
      "confidence": null
    },
    {
      "text": " ports.",
      "startMs": 131992,
      "endMs": 132487,
      "timestampMs": 132239,
      "confidence": null
    },
    {
      "text": " Thank",
      "startMs": 134730,
      "endMs": 134990,
      "timestampMs": 134860,
      "confidence": null
    },
    {
      "text": " you.",
      "startMs": 134990,
      "endMs": 135130,
      "timestampMs": 135060,
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
    "scan-info": [
      {
        "text": "You",
        "ms": 16770
      },
      {
        "text": "can",
        "ms": 16910
      },
      {
        "text": "get",
        "ms": 17110
      },
      {
        "text": "the",
        "ms": 17290
      },
      {
        "text": "host",
        "ms": 17430
      },
      {
        "text": "name,",
        "ms": 17730
      },
      {
        "text": "device",
        "ms": 18638
      },
      {
        "text": "name,",
        "ms": 19118
      },
      {
        "text": "manufacturer,",
        "ms": 20081
      },
      {
        "text": "as",
        "ms": 21779
      },
      {
        "text": "well",
        "ms": 21939
      },
      {
        "text": "as",
        "ms": 22419
      },
      {
        "text": "Mac",
        "ms": 22667
      },
      {
        "text": "address.",
        "ms": 22967
      }
    ],
    "scan-links": [
      {
        "text": "And",
        "ms": 24640
      },
      {
        "text": "if",
        "ms": 24820
      },
      {
        "text": "you",
        "ms": 24920
      },
      {
        "text": "scroll",
        "ms": 25020
      },
      {
        "text": "over,",
        "ms": 25400
      },
      {
        "text": "you",
        "ms": 25640
      },
      {
        "text": "can",
        "ms": 25760
      },
      {
        "text": "see",
        "ms": 25940
      },
      {
        "text": "that",
        "ms": 26120
      },
      {
        "text": "there's",
        "ms": 26380
      },
      {
        "text": "even",
        "ms": 26680
      },
      {
        "text": "links",
        "ms": 26960
      },
      {
        "text": "that",
        "ms": 27573
      },
      {
        "text": "you",
        "ms": 27753
      },
      {
        "text": "can",
        "ms": 27913
      },
      {
        "text": "go",
        "ms": 28714
      },
      {
        "text": "to",
        "ms": 28974
      },
      {
        "text": "directly",
        "ms": 29402
      },
      {
        "text": "to",
        "ms": 29842
      },
      {
        "text": "the",
        "ms": 30270
      },
      {
        "text": "website",
        "ms": 30385
      }
    ],
    "server-intro": [
      {
        "text": "Now",
        "ms": 34325
      },
      {
        "text": "let's",
        "ms": 34485
      },
      {
        "text": "take",
        "ms": 34705
      },
      {
        "text": "a",
        "ms": 34965
      },
      {
        "text": "look",
        "ms": 35005
      },
      {
        "text": "at",
        "ms": 35285
      },
      {
        "text": "our",
        "ms": 35998
      },
      {
        "text": "TCP",
        "ms": 36358
      },
      {
        "text": "server,",
        "ms": 36818
      }
    ],
    "server-test": [
      {
        "text": "so",
        "ms": 38010
      },
      {
        "text": "that",
        "ms": 38170
      },
      {
        "text": "you",
        "ms": 38330
      },
      {
        "text": "can",
        "ms": 38490
      },
      {
        "text": "test,",
        "ms": 38730
      },
      {
        "text": "say,",
        "ms": 39290
      },
      {
        "text": "our",
        "ms": 39888
      },
      {
        "text": "CTRLbot",
        "ms": 40088
      },
      {
        "text": "IoT",
        "ms": 40888
      },
      {
        "text": "app",
        "ms": 41306
      },
      {
        "text": "from",
        "ms": 41869
      },
      {
        "text": "it.",
        "ms": 42089
      }
    ],
    "server-connected": [
      {
        "text": "And",
        "ms": 44380
      },
      {
        "text": "now",
        "ms": 44480
      },
      {
        "text": "you",
        "ms": 44660
      },
      {
        "text": "can",
        "ms": 44780
      },
      {
        "text": "see",
        "ms": 44980
      },
      {
        "text": "that",
        "ms": 45480
      },
      {
        "text": "I'm",
        "ms": 45680
      },
      {
        "text": "actually",
        "ms": 45860
      },
      {
        "text": "connected",
        "ms": 46380
      },
      {
        "text": "to",
        "ms": 46820
      },
      {
        "text": "it,",
        "ms": 47060
      },
      {
        "text": "and",
        "ms": 47618
      },
      {
        "text": "I",
        "ms": 47718
      },
      {
        "text": "can",
        "ms": 47798
      },
      {
        "text": "send",
        "ms": 48018
      },
      {
        "text": "commands",
        "ms": 48338
      },
      {
        "text": "over",
        "ms": 49461
      },
      {
        "text": "to",
        "ms": 49861
      },
      {
        "text": "it,",
        "ms": 50121
      },
      {
        "text": "and",
        "ms": 50321
      },
      {
        "text": "they",
        "ms": 50461
      },
      {
        "text": "show",
        "ms": 50621
      },
      {
        "text": "up",
        "ms": 50881
      },
      {
        "text": "over",
        "ms": 51161
      },
      {
        "text": "here,",
        "ms": 51401
      }
    ],
    "pin": [
      {
        "text": "Up",
        "ms": 57340
      },
      {
        "text": "here,",
        "ms": 57500
      },
      {
        "text": "you'll",
        "ms": 57700
      },
      {
        "text": "notice",
        "ms": 57980
      },
      {
        "text": "there's",
        "ms": 58260
      },
      {
        "text": "a",
        "ms": 58460
      },
      {
        "text": "little",
        "ms": 58460
      },
      {
        "text": "pin.",
        "ms": 58720
      },
      {
        "text": "If",
        "ms": 59260
      },
      {
        "text": "you",
        "ms": 59658
      },
      {
        "text": "need",
        "ms": 59798
      },
      {
        "text": "to",
        "ms": 59998
      },
      {
        "text": "save",
        "ms": 60158
      },
      {
        "text": "any",
        "ms": 60618
      },
      {
        "text": "of",
        "ms": 60798
      },
      {
        "text": "these",
        "ms": 60938
      },
      {
        "text": "connections,",
        "ms": 61301
      },
      {
        "text": "you",
        "ms": 61821
      },
      {
        "text": "can",
        "ms": 61941
      },
      {
        "text": "always",
        "ms": 62121
      },
      {
        "text": "just",
        "ms": 62421
      },
      {
        "text": "pin",
        "ms": 62701
      },
      {
        "text": "it,",
        "ms": 62981
      },
      {
        "text": "and",
        "ms": 63494
      },
      {
        "text": "then",
        "ms": 63594
      },
      {
        "text": "they'll",
        "ms": 63714
      },
      {
        "text": "be",
        "ms": 63954
      },
      {
        "text": "available",
        "ms": 64094
      },
      {
        "text": "for",
        "ms": 64574
      },
      {
        "text": "the",
        "ms": 64714
      },
      {
        "text": "next",
        "ms": 64834
      },
      {
        "text": "time",
        "ms": 65094
      },
      {
        "text": "so",
        "ms": 65905
      },
      {
        "text": "that",
        "ms": 66045
      },
      {
        "text": "you",
        "ms": 66225
      },
      {
        "text": "can",
        "ms": 66385
      },
      {
        "text": "have",
        "ms": 66845
      },
      {
        "text": "various",
        "ms": 67505
      },
      {
        "text": "ports",
        "ms": 68283
      },
      {
        "text": "that",
        "ms": 68703
      },
      {
        "text": "you",
        "ms": 68783
      },
      {
        "text": "might",
        "ms": 68923
      },
      {
        "text": "need",
        "ms": 69823
      },
      {
        "text": "to",
        "ms": 70043
      },
      {
        "text": "connect",
        "ms": 70163
      },
      {
        "text": "to",
        "ms": 70513
      }
    ],
    "other-direction": [
      {
        "text": "Now",
        "ms": 73340
      },
      {
        "text": "we're",
        "ms": 73780
      },
      {
        "text": "going",
        "ms": 73980
      },
      {
        "text": "to",
        "ms": 74140
      },
      {
        "text": "go",
        "ms": 74240
      },
      {
        "text": "the",
        "ms": 74460
      },
      {
        "text": "other",
        "ms": 74600
      },
      {
        "text": "direction.",
        "ms": 74800
      },
      {
        "text": "Now",
        "ms": 75880
      },
      {
        "text": "we're",
        "ms": 76060
      },
      {
        "text": "going",
        "ms": 76240
      },
      {
        "text": "to",
        "ms": 76520
      },
      {
        "text": "connect",
        "ms": 76720
      },
      {
        "text": "to",
        "ms": 77040
      },
      {
        "text": "devices",
        "ms": 77260
      },
      {
        "text": "that",
        "ms": 77960
      },
      {
        "text": "are",
        "ms": 78140
      },
      {
        "text": "on",
        "ms": 78340
      },
      {
        "text": "the",
        "ms": 78680
      },
      {
        "text": "network.",
        "ms": 78820
      }
    ],
    "raw-tcp": [
      {
        "text": "And",
        "ms": 80200
      },
      {
        "text": "this",
        "ms": 80340
      },
      {
        "text": "is",
        "ms": 80520
      },
      {
        "text": "a",
        "ms": 80660
      },
      {
        "text": "raw",
        "ms": 80760
      },
      {
        "text": "TCP",
        "ms": 81518
      },
      {
        "text": "connection.",
        "ms": 82158
      },
      {
        "text": "So",
        "ms": 83358
      },
      {
        "text": "it's",
        "ms": 83618
      },
      {
        "text": "good",
        "ms": 83798
      },
      {
        "text": "for",
        "ms": 84058
      },
      {
        "text": "Telnet",
        "ms": 84518
      },
      {
        "text": "or",
        "ms": 85576
      },
      {
        "text": "any",
        "ms": 86174
      },
      {
        "text": "real",
        "ms": 86354
      },
      {
        "text": "port,",
        "ms": 86654
      },
      {
        "text": "TCP",
        "ms": 87152
      },
      {
        "text": "port.",
        "ms": 87455
      }
    ],
    "com-ports": [
      {
        "text": "Next,",
        "ms": 90780
      },
      {
        "text": "I'd",
        "ms": 90960
      },
      {
        "text": "like",
        "ms": 91120
      },
      {
        "text": "to",
        "ms": 91300
      },
      {
        "text": "show",
        "ms": 91440
      },
      {
        "text": "our",
        "ms": 92188
      },
      {
        "text": "COM",
        "ms": 92368
      },
      {
        "text": "ports,",
        "ms": 92648
      }
    ],
    "usb-bluetooth": [
      {
        "text": "And",
        "ms": 94050
      },
      {
        "text": "so",
        "ms": 94210
      },
      {
        "text": "this",
        "ms": 94570
      },
      {
        "text": "is",
        "ms": 94730
      },
      {
        "text": "a",
        "ms": 94830
      },
      {
        "text": "PC",
        "ms": 94910
      },
      {
        "text": "and",
        "ms": 95883
      },
      {
        "text": "you",
        "ms": 96023
      },
      {
        "text": "can",
        "ms": 96183
      },
      {
        "text": "connect",
        "ms": 96643
      },
      {
        "text": "a",
        "ms": 97491
      },
      {
        "text": "serial",
        "ms": 97831
      },
      {
        "text": "via",
        "ms": 98711
      },
      {
        "text": "USB",
        "ms": 99071
      },
      {
        "text": "or",
        "ms": 99831
      },
      {
        "text": "Bluetooth.",
        "ms": 99991
      }
    ],
    "parameters": [
      {
        "text": "And",
        "ms": 101745
      },
      {
        "text": "we",
        "ms": 102058
      },
      {
        "text": "fully",
        "ms": 102198
      },
      {
        "text": "support",
        "ms": 102478
      },
      {
        "text": "all",
        "ms": 102878
      },
      {
        "text": "the",
        "ms": 103058
      },
      {
        "text": "parameters",
        "ms": 103158
      },
      {
        "text": "for",
        "ms": 103778
      },
      {
        "text": "most",
        "ms": 103958
      },
      {
        "text": "serial",
        "ms": 104586
      },
      {
        "text": "communication.",
        "ms": 104886
      }
    ],
    "ssh-intro": [
      {
        "text": "Finally,",
        "ms": 107285
      },
      {
        "text": "I'd",
        "ms": 108278
      },
      {
        "text": "like",
        "ms": 108398
      },
      {
        "text": "to",
        "ms": 108578
      },
      {
        "text": "show",
        "ms": 108698
      },
      {
        "text": "that",
        "ms": 109251
      },
      {
        "text": "we",
        "ms": 109551
      },
      {
        "text": "have",
        "ms": 109711
      },
      {
        "text": "an",
        "ms": 109931
      },
      {
        "text": "SSH",
        "ms": 110271
      },
      {
        "text": "client",
        "ms": 110937
      },
      {
        "text": "as",
        "ms": 111317
      },
      {
        "text": "well.",
        "ms": 111457
      }
    ],
    "ssh-help": [
      {
        "text": "Let's",
        "ms": 113600
      },
      {
        "text": "just",
        "ms": 113690
      },
      {
        "text": "see,",
        "ms": 113888
      },
      {
        "text": "I'll",
        "ms": 114208
      },
      {
        "text": "type",
        "ms": 114848
      },
      {
        "text": "in",
        "ms": 115008
      },
      {
        "text": "help.",
        "ms": 115148
      },
      {
        "text": "Oh",
        "ms": 116298
      },
      {
        "text": "yes,",
        "ms": 116438
      },
      {
        "text": "we",
        "ms": 117278
      },
      {
        "text": "are",
        "ms": 117438
      },
      {
        "text": "connected",
        "ms": 117558
      },
      {
        "text": "to",
        "ms": 117938
      },
      {
        "text": "Luxall",
        "ms": 118138
      },
      {
        "text": "and",
        "ms": 119031
      },
      {
        "text": "everything",
        "ms": 119151
      },
      {
        "text": "is",
        "ms": 119471
      },
      {
        "text": "showing",
        "ms": 119551
      },
      {
        "text": "up",
        "ms": 119831
      },
      {
        "text": "just",
        "ms": 119931
      },
      {
        "text": "great.",
        "ms": 120156
      }
    ],
    "recap": [
      {
        "text": "we",
        "ms": 121750
      },
      {
        "text": "went",
        "ms": 121920
      },
      {
        "text": "over",
        "ms": 122120
      },
      {
        "text": "how",
        "ms": 122700
      },
      {
        "text": "to",
        "ms": 122840
      },
      {
        "text": "scan,",
        "ms": 122940
      },
      {
        "text": "how",
        "ms": 123920
      },
      {
        "text": "to",
        "ms": 124040
      },
      {
        "text": "create",
        "ms": 124140
      },
      {
        "text": "a",
        "ms": 124633
      },
      {
        "text": "TCP",
        "ms": 124733
      },
      {
        "text": "server,",
        "ms": 125333
      },
      {
        "text": "how",
        "ms": 126173
      },
      {
        "text": "to",
        "ms": 126293
      },
      {
        "text": "connect",
        "ms": 126393
      },
      {
        "text": "to",
        "ms": 126773
      },
      {
        "text": "a",
        "ms": 127113
      },
      {
        "text": "device",
        "ms": 127193
      },
      {
        "text": "via",
        "ms": 128056
      },
      {
        "text": "Telnet,",
        "ms": 128216
      },
      {
        "text": "SSH",
        "ms": 129279
      },
      {
        "text": "client",
        "ms": 129819
      },
      {
        "text": "or",
        "ms": 130619
      },
      {
        "text": "through",
        "ms": 130832
      },
      {
        "text": "the",
        "ms": 131212
      },
      {
        "text": "serial",
        "ms": 131392
      },
      {
        "text": "com",
        "ms": 131772
      },
      {
        "text": "ports.",
        "ms": 131992
      }
    ],
    "thank-you": [
      {
        "text": "Thank",
        "ms": 134730
      },
      {
        "text": "you.",
        "ms": 134990
      }
    ]
  }
};

export const TERMINATOR_WALKTHROUGH_EDIT = NARRATION_EDIT;

