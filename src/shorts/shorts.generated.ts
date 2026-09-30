// Written by `npm run shorts -- build`. Do not edit; change src/shorts/shortsData.ts and rebuild.

import type {CaptionWord} from './shortsData';

/** Pixel size of each built beat, keyed `<short id>/<beat id>`. */
export const SHORT_MEDIA: Record<string, {width: number; height: number}> = {
  "S02/scan": {
    "width": 1460,
    "height": 1080
  },
  "S02/server": {
    "width": 1460,
    "height": 1080
  },
  "S02/terminal": {
    "width": 1460,
    "height": 1080
  },
  "S02/ssh": {
    "width": 1460,
    "height": 1080
  },
  "S03/type": {
    "width": 1020,
    "height": 850
  },
  "S03/questions": {
    "width": 1020,
    "height": 850
  },
  "S03/sources": {
    "width": 1020,
    "height": 850
  },
  "S03/themes": {
    "width": 1020,
    "height": 850
  }
};

/** Each short's narration track, cut and placed, relative to public/. */
export const SHORT_NARRATION: Record<string, string> = {
  "S02": "shorts/S02/narration.m4a",
  "S03": "shorts/S03/narration.m4a"
};

/** Each short's narration as word-timed captions, in seconds of the short. */
export const SHORT_CAPTIONS: Record<string, CaptionWord[]> = {"S02":[{"text":" It's","startMs":480,"endMs":713,"timestampMs":597,"confidence":null},{"text":" basically","startMs":713,"endMs":1488,"timestampMs":1101,"confidence":null},{"text":" a","startMs":1841,"endMs":2056,"timestampMs":1949,"confidence":null},{"text":" terminal","startMs":2084,"endMs":2604,"timestampMs":2344,"confidence":null},{"text":" app","startMs":2932,"endMs":3137,"timestampMs":3035,"confidence":null},{"text":" for","startMs":3235,"endMs":3675,"timestampMs":3455,"confidence":null},{"text":" PC","startMs":3675,"endMs":4310,"timestampMs":3993,"confidence":null},{"text":" It","startMs":4900,"endMs":4950,"timestampMs":4925,"confidence":null},{"text":" can","startMs":4950,"endMs":5150,"timestampMs":5050,"confidence":null},{"text":" scan","startMs":5150,"endMs":5490,"timestampMs":5320,"confidence":null},{"text":" your","startMs":5490,"endMs":5670,"timestampMs":5580,"confidence":null},{"text":" network.","startMs":5670,"endMs":6190,"timestampMs":5930,"confidence":null},{"text":" It","startMs":8900,"endMs":9000,"timestampMs":8950,"confidence":null},{"text":" can","startMs":9000,"endMs":9560,"timestampMs":9280,"confidence":null},{"text":" set","startMs":9560,"endMs":9780,"timestampMs":9670,"confidence":null},{"text":" up","startMs":9780,"endMs":9898,"timestampMs":9839,"confidence":null},{"text":" a","startMs":10033,"endMs":10193,"timestampMs":10113,"confidence":null},{"text":" server","startMs":10193,"endMs":10958,"timestampMs":10576,"confidence":null},{"text":" for","startMs":10973,"endMs":11153,"timestampMs":11063,"confidence":null},{"text":" testing.","startMs":11153,"endMs":11878,"timestampMs":11516,"confidence":null},{"text":" It","startMs":14810,"endMs":14930,"timestampMs":14870,"confidence":null},{"text":" can","startMs":14930,"endMs":15070,"timestampMs":15000,"confidence":null},{"text":" connect","startMs":15070,"endMs":15390,"timestampMs":15230,"confidence":null},{"text":" to","startMs":15390,"endMs":15490,"timestampMs":15440,"confidence":null},{"text":" devices","startMs":15490,"endMs":16285,"timestampMs":15888,"confidence":null},{"text":" and","startMs":16285,"endMs":16483,"timestampMs":16384,"confidence":null},{"text":" allow","startMs":16483,"endMs":17028,"timestampMs":16755,"confidence":null},{"text":" you","startMs":17026,"endMs":17326,"timestampMs":17176,"confidence":null},{"text":" to","startMs":17326,"endMs":17466,"timestampMs":17396,"confidence":null},{"text":" communicate","startMs":17466,"endMs":18126,"timestampMs":17796,"confidence":null},{"text":" with","startMs":18126,"endMs":18346,"timestampMs":18236,"confidence":null},{"text":" them","startMs":18346,"endMs":18691,"timestampMs":18518,"confidence":null},{"text":" or","startMs":20970,"endMs":21110,"timestampMs":21040,"confidence":null},{"text":" even","startMs":21110,"endMs":21350,"timestampMs":21230,"confidence":null},{"text":" set","startMs":21350,"endMs":21570,"timestampMs":21460,"confidence":null},{"text":" up","startMs":21570,"endMs":21740,"timestampMs":21655,"confidence":null},{"text":" and","startMs":21998,"endMs":22118,"timestampMs":22058,"confidence":null},{"text":" connect","startMs":22118,"endMs":22458,"timestampMs":22288,"confidence":null},{"text":" to","startMs":22458,"endMs":22838,"timestampMs":22648,"confidence":null},{"text":" an","startMs":22838,"endMs":23058,"timestampMs":22948,"confidence":null},{"text":" SSH","startMs":23058,"endMs":23718,"timestampMs":23388,"confidence":null},{"text":" host.","startMs":24021,"endMs":24406,"timestampMs":24214,"confidence":null}],"S03":[{"text":" Welcome","startMs":315,"endMs":895,"timestampMs":605,"confidence":null},{"text":" to","startMs":895,"endMs":1015,"timestampMs":955,"confidence":null},{"text":" CTRLbot.AI,","startMs":1015,"endMs":2245,"timestampMs":1630,"confidence":null},{"text":" the","startMs":2468,"endMs":2778,"timestampMs":2623,"confidence":null},{"text":" AI","startMs":2866,"endMs":3186,"timestampMs":3026,"confidence":null},{"text":" chatbot","startMs":3186,"endMs":3706,"timestampMs":3446,"confidence":null},{"text":" that","startMs":3706,"endMs":3886,"timestampMs":3796,"confidence":null},{"text":" asks","startMs":3886,"endMs":4186,"timestampMs":4036,"confidence":null},{"text":" questions","startMs":4186,"endMs":4746,"timestampMs":4466,"confidence":null},{"text":" first","startMs":4746,"endMs":5176,"timestampMs":4961,"confidence":null},{"text":" and","startMs":5459,"endMs":5619,"timestampMs":5539,"confidence":null},{"text":" assumes","startMs":5619,"endMs":6249,"timestampMs":5934,"confidence":null},{"text":" later.","startMs":6552,"endMs":6892,"timestampMs":6722,"confidence":null},{"text":" These","startMs":7935,"endMs":8235,"timestampMs":8085,"confidence":null},{"text":" answers","startMs":8235,"endMs":8575,"timestampMs":8405,"confidence":null},{"text":" then","startMs":8575,"endMs":8815,"timestampMs":8695,"confidence":null},{"text":" go","startMs":8815,"endMs":9195,"timestampMs":9005,"confidence":null},{"text":" in","startMs":9195,"endMs":9520,"timestampMs":9358,"confidence":null},{"text":" and","startMs":9635,"endMs":9890,"timestampMs":9763,"confidence":null},{"text":" make","startMs":9975,"endMs":10223,"timestampMs":10099,"confidence":null},{"text":" the","startMs":10298,"endMs":10538,"timestampMs":10418,"confidence":null},{"text":" next","startMs":10538,"endMs":10778,"timestampMs":10658,"confidence":null},{"text":" assumption","startMs":10778,"endMs":11318,"timestampMs":11048,"confidence":null},{"text":" better,","startMs":11318,"endMs":11663,"timestampMs":11490,"confidence":null},{"text":" and","startMs":14910,"endMs":15110,"timestampMs":15010,"confidence":null},{"text":" then","startMs":15110,"endMs":15310,"timestampMs":15210,"confidence":null},{"text":" it","startMs":15310,"endMs":15390,"timestampMs":15350,"confidence":null},{"text":" gives","startMs":15390,"endMs":15590,"timestampMs":15490,"confidence":null},{"text":" me","startMs":15590,"endMs":15830,"timestampMs":15710,"confidence":null},{"text":" three","startMs":15830,"endMs":16210,"timestampMs":16020,"confidence":null},{"text":" really","startMs":16210,"endMs":16510,"timestampMs":16360,"confidence":null},{"text":" good","startMs":16510,"endMs":16770,"timestampMs":16640,"confidence":null},{"text":" links.","startMs":16770,"endMs":17345,"timestampMs":17057,"confidence":null},{"text":" this","startMs":23240,"endMs":23490,"timestampMs":23365,"confidence":null},{"text":" is","startMs":23490,"endMs":23630,"timestampMs":23560,"confidence":null},{"text":" my","startMs":23630,"endMs":23850,"timestampMs":23740,"confidence":null},{"text":" favorite,","startMs":23850,"endMs":24390,"timestampMs":24120,"confidence":null},{"text":" retro","startMs":24638,"endMs":25218,"timestampMs":24928,"confidence":null},{"text":" 80s","startMs":25218,"endMs":25568,"timestampMs":25393,"confidence":null},{"text":" mode.","startMs":25568,"endMs":25903,"timestampMs":25735,"confidence":null}]};
