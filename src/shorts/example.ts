// A short built entirely from live screens, registered as `Template-Short-Live`.
//
// Not a release. It exists so the template can be seen working on live surfaces, and as
// the entry to copy into shortsData.ts when a new short starts: change the product, the
// words and the surfaces, add a narration edit from an ingested recording, build.

import type {ShortSpec} from './shortsData';

export const SHORT_EXAMPLE: ShortSpec = {
  id: 'X01',
  product: 'CTRLbot Terminator',
  format: 'vertical',
  title: 'SCAN. SERVE. CONNECT.',
  idea: 'A *terminal* for every device on your network.',
  signoff: 'Test any device from your PC.',
  beats: [
    {
      id: 'scan',
      seconds: 6,
      source: {surface: 'terminator/scan'},
      evidence: 'Scan network is pressed and the device table fills, one row at a time',
    },
    {
      id: 'server',
      seconds: 6,
      source: {surface: 'terminator/server'},
      evidence: 'Listen, a client connects, hello world arrives and a reply goes back',
    },
    {
      id: 'raw-tcp',
      seconds: 6,
      source: {surface: 'terminator/raw-tcp'},
      evidence: 'Connect to the display, power on is typed and sent, display on comes back',
    },
    {
      id: 'ssh',
      seconds: 6,
      source: {surface: 'terminator/ssh'},
      evidence: 'Connect to the switch, help is typed and its command list scrolls in',
    },
  ],
  publish: {
    title: 'Template: a short on live screens',
    description: 'Not for release.',
    tags: ['template'],
  },
};
