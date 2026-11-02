// The ctrlbot.io panel loops.
//
// Three ten-second media cells for the site's unit wall, and one rule the promo cuts do
// not have to keep: **frame 0 and the frame after the last one must be the same
// picture.** A `<video loop>` wraps with no dissolve and no gap, so anything still
// somewhere new at t=1 — an output holding a source it did not open on, a raised volume
// bar, a gradient that drifted one way and stopped — reads as a jump cut every ten
// seconds, forever, next to a paragraph somebody is trying to read.
//
// That is what shapes these timelines, and it is the whole difference between this
// folder and `../eui-promo-v3`. A promo beat is an arc: it opens cold, demonstrates, and
// lands somewhere it did not start, which is right for a cut watched once. A loop is a
// cycle. It ends on the state it opened with and the demonstration happens in between.
//
// Two consequences worth stating, because both look like mistakes:
//
//   - **The two switching loops open cold, and close cold.** They used to open already
//     routed, on the reasoning that a cold panel could not be returned to at t=1 without
//     inventing an interaction — "the user un-selects everything and walks away" is not a
//     thing that happens in a room. True, but opening warm buries the thing the loop is
//     there to show: the first state change became one routed source turning into
//     another, when what the block beside it claims is that picking a source puts it on
//     the screen. So they now open with nothing routed and **close on the power control**,
//     which is not an invention either — that button runs the Power Off preset, and a
//     room being released at the end of a session is the most ordinary thing that happens
//     to one. The cycle is honest again: cold, used, released, cold. The audio loop is
//     untouched; its subject is a level moving, which has no cold state to return to.
//   - **Every ramp ends flat.** Value matching alone is not enough at the seam: if the
//     volume bar is still climbing at t=1 and static at t=0, the picture matches and the
//     motion does not. Easings on the closing segment of each cycle settle to zero.
//
// The cold hold at each end is what makes the seam free rather than merely survivable:
// both sides of the wrap are the same idle panel, so the measured step is the background
// gradient and nothing else. Keep the closing ring clear of t=1 — `LoopTap` trails 0.09
// past its tap, so a power tap later than about 0.88 leaves an annotation on the seam.

import {Easing, interpolate} from 'remotion';
import {background} from '../../design/theme';

/**
 * Geometry and length, shared by all three.
 *
 * **The frame is 4:3, because that is the shape of the cell it plays in.** On ctrlbot.io
 * the loop sits in `.loop-board .unit > .media`, which is `aspect-ratio: 4/3` carrying an
 * `object-fit: cover` video — so a render wider than the cell is not letterboxed, it is
 * cut, and it is cut from the sides. The 16:10 version this replaces was 1920x1200 shown
 * through a 1600-wide window: 160px off each edge, straight through the source column on
 * the left and the power control on the right. Rendering the shape of the cell is the
 * only way the framing decided here is the framing anybody sees.
 *
 * The frame is still a whole multiple of nothing in particular and that is fine — what
 * matters is that 1200 tall leaves the 800dp surface upscaled at every point of the push.
 */
export const WEB_LOOP = {
  /** 10s at 30fps. `WEBSITE_PANEL_LOOP.duration.target`. */
  frames: 300,
  bezel: 22,
  /** 4:3 */
  width: 1600,
  height: 1200,
  /**
   * Panel screen height at the two ends of the push.
   *
   * These are height numbers that are really width numbers. The panel is aspect-matched
   * to the 1280x800 surface, so a 4:3 frame runs out of width long before it runs out of
   * height: at `panelClose` the panel is 1468 wide inside 1600 and 934 tall inside 1200 —
   * 66px of air down each side against 133 above and below. **The side margin at the
   * close end is what sets both numbers**, and it is the one that goes negative without
   * announcing itself. 980 here put the panel at 1612 in a 1600 frame, which spent the
   * end of the matrix beat — the switching, the thing the copy beside it is describing —
   * with its bezel off the edge on both sides.
   *
   * The push is shallower than it was at 16:10 (860 -> 1080, +25.6%) because the close
   * end is now bounded by the frame rather than by taste. Lowering `panelWide` to buy the
   * amplitude back is available and was tried at 730: it opens the loop on a panel that
   * reads as small in the cell, and the push is not what the loop is for.
   */
  panelWide: 780,
  panelClose: 890,
} as const;

/**
 * The square cut, for the narrow half of an alternating wall.
 *
 * The site lays these out the way GitHub Universe does: a 16:10 tile beside a 1:1 tile,
 * swapping sides each row, so the media is wide on one line and square on the next. A
 * square tile cannot be a crop of the wide render — the panel is 16:10 and cropping a
 * 16:10 frame to 1:1 takes a third of the width off, straight through the source column.
 * So it is its own composition, framed for the shape.
 *
 * **The panel is sized to survive a 16:10 crop, not just to fit 1:1.** On a phone the
 * wall stacks and every tile shows 16:10, this one included, by cropping the top and
 * bottom off the square — 225 frame pixels each. At the closest point of the push the
 * panel is 684 tall inside 1200, so it spans y 258 to 942 against a visible band of 225
 * to 975. That clearance is the constraint these two numbers are set by; raise them and
 * the phone crop starts cutting the bezel.
 */
export const WEB_LOOP_SQUARE = {
  width: 1200,
  height: 1200,
  panelWide: 550,
  panelClose: 640,
} as const;

/**
 * Matrix runs longer than the other loops. 13s at 30fps.
 *
 * It is the only loop carrying two beats of full-length copy, and at 300 frames the
 * second one — SEND TO ALL, 28 words — had 4.8s on screen against 3.2s of word-stagger
 * arrival. That is 1.6s to actually read it, which is not enough while also watching
 * the routing happen. At 390 the same beat holds 6.2s and reads at about 3.0s.
 *
 * Loops are allowed to differ. Every timeline here is a 0..1 fraction of the cycle
 * precisely so the length stays a property of the destination — nothing below needs to
 * change when this number does, and the beats in LOOP_COPY rescale with it. The rows do
 * not need to agree: each one is scroll-gated and rewound to 0 on entry.
 *
 * Anything reading a cycle position must divide by the composition's own
 * `durationInFrames`, never by `WEB_LOOP.frames`. See LoopStage.
 */
export const MATRIX_LOOP_FRAMES = 390;

/** 43s: app power-on + route + matrix + audio + the app's power-off return. */
export const FULL_LOOP_FRAMES = 1290;

/** 12s: connect over USB, drive the app from the PC, pair over Wi-Fi, stop. */
export const MIRROR_LOOP_FRAMES = 360;

/**
 * CTRLbot Mirror loop timeline, as fractions of the cycle. It opens on the Devices panel
 * with the device listed and nothing selected, and closes on the same panel after Stop.
 * The `mirror` beats in LOOP_COPY sit just ahead of the three that matter below.
 */
export const MIRROR_SELECT_AT = 0.07;
export const MIRROR_DETAILS_AT = 0.13;
/** Press on Start mirroring; the stage goes live at MIRROR_LIVE_AT. */
export const MIRROR_START_AT = 0.21;
export const MIRROR_LIVE_AT = 0.26;
/** The mirrored catalog scrolls under the pointer, then takes a tap. */
export const MIRROR_SCROLL_AT = 0.32;
export const MIRROR_TAP_AT = 0.46;
/** Wi-Fi pairing: address typed from here, code after it, Pair pressed at MIRROR_PAIR_AT. */
export const MIRROR_PAIR_TYPE_AT = 0.6;
export const MIRROR_PAIR_AT = 0.78;
/** Stop mirroring pressed; the panel is back at rest by MIRROR_REST_AT. */
export const MIRROR_STOP_AT = 0.86;
export const MIRROR_REST_AT = 0.93;

/** 12s: pick Raw TCP (Telnet), connect, send a projector power query, read the reply. */
export const TERMINATOR_LOOP_FRAMES = 360;

/**
 * CTRLbot Terminator loop timeline, as fractions of the cycle. It opens on the Scan tab
 * at rest and closes on the same tab after the pointer returns to it.
 */
export const TERMINATOR_SELECT_AT = 0.1;
/** Press on Connect; the session is live from here. */
export const TERMINATOR_CONNECT_AT = 0.22;
/** The query is typed across these two, then Send is pressed at TERMINATOR_SEND_AT. */
export const TERMINATOR_TYPE_FROM = 0.32;
export const TERMINATOR_TYPE_TO = 0.5;
export const TERMINATOR_SEND_AT = 0.56;
/** The reply lands in the Received log. */
export const TERMINATOR_REPLY_AT = 0.6;
/** Scan selected again; the tab is back at rest by TERMINATOR_REST_AT. */
export const TERMINATOR_BACK_AT = 0.86;
export const TERMINATOR_REST_AT = 0.93;

export type LoopVariant = 'wide' | 'square';

export const loopFrame = (variant: LoopVariant) =>
  variant === 'square' ? WEB_LOOP_SQUARE : WEB_LOOP;

/**
 * The push, as panel height in frame pixels.
 *
 * The whole panel scales — device, bezel and screen together — rather than a camera
 * moving inside a fixed panel. Both were available and this is the one the loop wants:
 * a camera push crops the surface, and at this size the first thing it crops is the
 * power control and the exit wrench in the two top corners, which are the controls a
 * viewer is most likely to be looking for. Scaling the panel keeps every pixel of the
 * interface on screen and still reads as moving closer to it.
 *
 * It comes back out. The obvious shape — push in, cut back to wide, repeat — puts the
 * single biggest jump in the loop exactly on the seam, which is the one place a
 * `<video loop>` cannot hide it. So the move eases back to the opening framing instead.
 *
 * And it **finishes early, at 0.97, not at 1.0.** Landing the pull-back exactly on the
 * final frame is not the same as having landed: on an ease-out the last frame is still
 * a fraction of a pixel from home, and a fraction of a pixel of panel scale moves every
 * edge in the interface at once. Measured on the route loop, which carries the largest
 * smooth gradient of the three, that alone was a seam of 3.91 against a median step of
 * 0.22 — under the gate's ceiling but eighteen times an ordinary frame, and the biggest
 * single change in the quiet part of the loop. Holding still for the last nine frames
 * costs nothing and makes the wrap exact.
 */
/**
 * Rounded to a whole pixel, and rendered supersampled.
 *
 * Everything in the panel is drawn relative to this one number, so a fractional value
 * puts every edge in the interface on a fractional boundary and the whole surface
 * resamples on every frame — which reads as the text and the cell borders crawling
 * rather than the panel moving. Rounding costs nothing: the push covers ~220px over
 * ~216 frames, so it is already about a pixel a frame and the quantisation is invisible.
 *
 * Rounding alone does not fix it, because the surface inside is still scaled by a
 * fractional factor — 1280dp into whatever the panel is wide. That is what the 2x
 * render and lanczos downscale in `npm run loop:render` are for. Measured on the square
 * matrix loop, which shows it worst because it downscales the surface furthest: mean
 * frame-to-frame change through the push fell from 2.47 to 1.71, and the file got
 * *smaller*, because most of what was being encoded was shimmer.
 */
export const loopPanelHeight = (t: number, variant: LoopVariant = 'wide'): number =>
  Math.round(interpolate(t, [0, 0.72, 0.86, 0.97], [loopFrame(variant).panelWide, loopFrame(variant).panelClose, loopFrame(variant).panelClose, loopFrame(variant).panelWide], {
    // Ease in AND out — not the house `bezier(0.16, 1, 0.3, 1)`, which every other
    // easing in this repo uses. That one is an ease-*out*: it leaves at full speed and
    // settles slowly, which is right for a thing entering a shot and wrong for the
    // first frame of a loop. It made the push start at its fastest exactly where the
    // video wraps, so the panel sat still and then lurched, ten seconds apart, forever.
    // Measured on the matrix loop, the first two frames differed fifty times more than
    // an ordinary mid-loop pair. Both ends need zero velocity here because both ends
    // are the same instant.
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

/**
 * A 0 → 1 → 0 traverse over one cycle, flat at both ends.
 *
 * Cosine rather than a ping-ponged `interpolate` because the seam needs matching
 * velocity, not just a matching value, and cos is the cheapest curve whose derivative is
 * zero at both ends. Used for anything that has to leave and come back.
 */
export const wave = (t: number) => 0.5 - 0.5 * Math.cos(2 * Math.PI * t);

/**
 * The stage glow, drifting out and back.
 *
 * Same two endpoints the promo drifts between, traversed as a cycle instead of a ramp.
 * The movement is what keeps a held panel from reading as a still — at this size it is
 * the only thing moving for seconds at a time — and it is why the loops do not need a
 * camera move they cannot afford. An aspect-matched panel cannot be pushed into.
 */
export const loopBg = (t: number) =>
  background.promo(50 - 4 * wave(t), 48 + 4 * wave(t), 140, 130);

/**
 * The copy beside each loop — which is not rendered into the video.
 *
 * It lives here anyway, and that is the point. On ctrlbot.io the words are HTML in the
 * text cell next to the media cell, so they stay selectable, indexed, responsive and
 * theme-aware; but the moment they change *at* has to agree with what the panel is
 * doing, and a timing copied by hand into another repository is a timing that drifts the
 * first time a beat is retimed here.
 *
 * `npm run loop:copy` writes this out as JSON for the site to consume, so there is one
 * definition and the site reads it rather than restating it. Same reason `destinations.ts`
 * is import-free and shared with the linter.
 *
 * `at` is a fraction of the loop, on the same 0..1 clock as every state function above.
 *
 * **The two fields are the site's block format, not a shape chosen here.** Every square
 * text block on ctrlbot.io is one 5-12 word headline in bold Archivo capitals, then a body
 * of three to four sentences — and these panels sit in that same wall, so they hold the
 * same two levels. The counts below are the format's, and a beat that breaks them will
 * look like a different kind of block sitting in the middle of the checkerboard. (Until
 * 2 November 2026 the format was a 1-3 word Audiowide title over a 5-9 word thought; the
 * headline is the two merged.)
 *
 * These carry **no accent run**, which is the one place they part company with
 * `PromoCopy`. The promo sets words in CTRLbot blue between *asterisks*; the site blocks
 * are black and white, so a marker here would only produce a colour the wall does not
 * use. Do not reintroduce it without changing the wall.
 */
export type LoopBeat = {
  /** 0..1 within the loop. The fraction the block starts arriving on. */
  at: number;
  /** One headline, 5-12 words, ALL CAPS, preserving brand casing, no punctuation. Bold Archivo. */
  headline: string;
  /**
   * Three to four sentences, sentence case. Fades in whole after the headline; no
   * accent markers. The only level of the block that is not upper case — see the block
   * spec in the site's `docs/DESIGN.md`.
   */
  body: string;
};

export const LOOP_COPY: Record<string, LoopBeat[]> = {
  app: [
    {
      at: 0,
      headline: 'ONE BUTTON STARTS THE WHOLE ROOM',
      body:
        'A simple power press starts the room and powers on all the connected devices. The ' +
        'system prepares the hardware automatically. Displays, projectors and switchers ' +
        'come up without anyone touching them.',
    },
    // 0.70 -> 0.62: the power-off tap is APP_POWER_OFF_TAP_AT = 0.68, so at 0.70 the
    // words arrived after the thing they describe. Words lead the action here, the same
    // way matrix beat two leads its own sequence.
    {
      at: 0.62,
      headline: 'ONE PRESS SHUTS THE WHOLE ROOM DOWN SAFELY',
      body:
        'Tap power to shut down the entire system safely. The room returns to standby until ' +
        'the next session. Nothing is left running overnight.',
    },
  ],
  // One beat, deliberately. A second one existed and was about the interface — no menus,
  // no modes — which is not what this loop shows. The loop shows many-to-one switching,
  // so the block says that once and holds for the whole cycle.
  route: [
    {
      at: 0,
      headline: 'MANY TO ONE SWITCHING IS THE MATRIX BLUE PILL',
      body:
        'Simply select a source and the switcher routes it to the display or projector in ' +
        'the room. Many sources feed one destination. Whatever is selected is what the room ' +
        'sees.',
    },
  ],
  // Beat two moved 0.58 -> 0.52 when the loop opened cold: Input 1 is selected at 0.60
  // and All lands at 0.74, so the words have to be up before that sequence starts.
  matrix: [
    {
      at: 0,
      headline: 'MANY TO MANY IN FULL MATRIX ROUTING MODE',
      body:
        'Pick the source on the left, then a display or displays on the right. Route a ' +
        'source to one or more destinations. Every screen in the room can show something ' +
        'different.',
    },
    {
      at: 0.52,
      headline: 'TWO PRESSES SEND ONE SOURCE TO EVERY SCREEN',
      body:
        'Simply select a source and then the All button and it is routed to all displays or ' +
        'projectors in the room. One source feeds every destination at once. It is the ' +
        'fastest way to put one presentation on every screen.',
    },
  ],
  audio: [
    {
      at: 0,
      headline: 'SLIDE THE BAR AND THE ROOM VOLUME FOLLOWS',
      body:
        'Easily change the speaker volume with the slider or the arrows. Slide the bar and ' +
        'the room level follows. Nobody has to go looking for the amplifier.',
    },
    // 0.60 -> 0.55: AUDIO_MUTE_AT is 0.62, so 0.60 gave the block 0.2s of lead — the
    // words were still arriving as the speaker cut. 0.55 also buys the beat 0.5s more
    // hold, which it needs at 20 words.
    {
      at: 0.55,
      headline: 'ONE PRESS MUTES THE ROOM AND ONE MORE BRINGS IT BACK',
      body:
        'Mute the speaker audio and then easily unmute to return to the previous level. The ' +
        'original volume is restored instantly. Nobody has to remember where the level was ' +
        'set.',
    },
  ],
  // One homepage row now carries the complete app story. The four original keys stay
  // above because `/app/` still renders and times those compositions independently.
  // These fractions preserve every source beat's current window inside 1290 frames:
  // app 0..186, route 186..486, matrix 486..876, audio 876..1176, app 1176..1290.
  full: [
    {
      at: 0,
      headline: 'ONE BUTTON STARTS THE WHOLE ROOM',
      body:
        'A simple power press starts the room and powers on all the connected devices. The ' +
        'system prepares the hardware automatically. Displays, projectors and switchers ' +
        'come up without anyone touching them.',
    },
    {
      at: 0.144186,
      headline: 'MANY TO ONE SWITCHING IS THE MATRIX BLUE PILL',
      body:
        'Simply select a source and the switcher routes it to the display or projector in ' +
        'the room. Many sources feed one destination. Whatever is selected is what the room ' +
        'sees.',
    },
    {
      at: 0.376744,
      headline: 'MANY TO MANY IN FULL MATRIX ROUTING MODE',
      body:
        'Pick the source on the left, then a display or displays on the right. Route a ' +
        'source to one or more destinations. Every screen in the room can show something ' +
        'different.',
    },
    {
      at: 0.533953,
      headline: 'TWO PRESSES SEND ONE SOURCE TO EVERY SCREEN',
      body:
        'Simply select a source and then the All button and it is routed to all displays or ' +
        'projectors in the room. One source feeds every destination at once. It is the ' +
        'fastest way to put one presentation on every screen.',
    },
    {
      at: 0.67907,
      headline: 'SLIDE THE BAR AND THE ROOM VOLUME FOLLOWS',
      body:
        'Easily change the speaker volume with the slider or the arrows. Slide the bar and ' +
        'the room level follows. Nobody has to go looking for the amplifier.',
    },
    {
      at: 0.806977,
      headline: 'ONE PRESS MUTES THE ROOM AND ONE MORE BRINGS IT BACK',
      body:
        'Mute the speaker audio and then easily unmute to return to the previous level. The ' +
        'original volume is restored instantly. Nobody has to remember where the level was ' +
        'set.',
    },
    {
      at: 0.911628,
      headline: 'ONE PRESS SHUTS THE WHOLE ROOM DOWN SAFELY',
      body:
        'Tap power to shut down the entire system safely. The room returns to standby until ' +
        'the next session. Nothing is left running overnight.',
    },
  ],
  // CTRLbot Mirror. Words lead the action: the connect block is up from the opening
  // frame (select 0.07), the control block lands before the scroll (0.32), and the Wi-Fi
  // block before the first pairing keystroke (MIRROR_PAIR_TYPE_AT = 0.60).
  // Two blocks over the loop's three actions: at 12 seconds, a block per action would give
  // each about three seconds, which is not enough to read three sentences. The first
  // covers connecting and controlling (0 to 0.56, 6.7s), the second the Wi-Fi pairing.
  mirror: [
    {
      at: 0,
      headline: 'CONNECT A TABLET AND RUN THE APP FROM YOUR PC',
      body:
        'Plug the Android device in over USB and CTRLbot Mirror lists it as ready. Start ' +
        'mirroring and the CTRLbot IoT app appears on the PC screen. Scroll the driver ' +
        'catalog and pick a driver with the mouse.',
    },
    {
      at: 0.56,
      headline: 'PAIR OVER WIRELESS AND LEAVE THE CABLE BEHIND',
      body:
        'Copy the pairing address and code from the device into Mirror and press Pair. The ' +
        'same device then connects without a cable. Stop mirroring and it stays listed, ready ' +
        'for the next session.',
    },
  ],
  // Placeholder beats only: the site copy is written elsewhere. Words lead the action:
  // beat two is up before Send at TERMINATOR_SEND_AT.
  // The command is PJLink's projector power query; claims are checked against the
  // Terminator README (Raw TCP/Telnet client, serial, SSH, Verbose CRLF). Terminator has no
  // public release yet, so nothing here says it can be downloaded.
  terminator: [
    {
      at: 0,
      headline: 'OPEN A RAW CONNECTION TO A DEVICE ON THE NETWORK',
      body:
        'Pick Raw TCP and enter the address and port the device listens on. CTRLbot ' +
        'Terminator connects and logs it, ready to send. Telnet, serial COM ports and SSH ' +
        'sit one click away in the same window.',
    },
    {
      at: 0.5,
      headline: 'SEND A COMMAND AND READ EXACTLY WHAT COMES BACK',
      body:
        'Type the command, choose the line ending and press Send. The reply lands in ' +
        'Received Data with the carriage return shown, so nothing hides in the line ending. ' +
        'It proves a device answers before it joins the room.',
    },
  ],
  // CTRLbot.AI, not the Android app — the one loop here whose subject is the website.
  // Its cycle is the product's own: a session opens on a blank page, runs, and the ✕
  // returns the page to the state it opened on. Nothing had to be invented to close it.
  //
  // Claims are checked against the approved list in
  // `../../0 - CTRLbot.ai/ctrlbot.ai/docs/about/About_CTRLbot_AI.md`. "Three real sources",
  // "no login", and "nothing is saved" are all on it verbatim.
  ai: [
    {
      at: 0,
      headline: 'IT ASKS THE RIGHT QUESTIONS BEFORE IT ANSWERS',
      body:
        'You enter a problem, bug, issue about anything tech, health or home and it asks ' +
        'before it really answers. Because the best answers come from the right questions. ' +
        'There is no account to make and nothing to set up.',
    },
    {
      at: 0.18,
      headline: 'QUICK YES AND NO QUESTIONS NARROW THE FAULT',
      body:
        'It states what it thinks is wrong, then asks fast YES and NO questions built from ' +
        'the details you gave. Answering each one costs a single click. Every answer rules ' +
        'something out before it commits.',
    },
    {
      at: 0.40,
      headline: 'EVERY CLICKABLE OPTION EXPLAINS WHAT IT MEANS',
      body:
        'One sharper question follows, and each button says what choosing it would mean for ' +
        'the diagnosis. Pass is there for when you genuinely do not know. You never have to ' +
        'guess what a choice will do.',
    },
    {
      at: 0.62,
      headline: 'ONE DIRECT ANSWER BACKED BY THREE REAL SOURCES',
      body:
        'The answer arrives with three genuine resource links and none of them are ' +
        'sponsored. It is written to be useful rather than flattering. You can check every ' +
        'claim it makes for yourself.',
    },
    {
      at: 0.85,
      headline: 'CLOSE IT AND THE WHOLE SESSION IS GONE',
      body:
        'Press the reset and everything clears back to an empty page. There is no account, ' +
        'no history, and nothing left to delete. Nothing is tied to an account.',
    },
  ],
  // One block per beat, including `close`. The `at` values are each beat's `from` over
  // `HUB_FRAMES` in `../hub-cell/hubCellData.ts` — retime the cut and these have to move
  // with it.
  //
  // **Every block is at or under four words a second of its beat.** That is the whole
  // reason the cut is 48 seconds rather than 34: the panel is read, and at five words a
  // second the blocks were turning over before they could be finished. Lengthening a body
  // here means lengthening its beat there, or it stops being readable again.
  //
  // 2 November 2026: the block spec moved to a headline and three to four sentences, and
  // every body here gained a sentence without the cut being retimed. The blocks now fade
  // in whole rather than a word at a time, which buys back the streaming time, but several
  // now run past four words a second. Retiming the cut is open work.
  //
  // `End Point` is two words, here as everywhere, because that is what the app's own sort
  // dropdown says. `RS-232` carries its hyphen for the same reason.
  hub: [
    {
      at: 0,
      headline: 'A DEVICE DATABASE OF THE MAJOR PRO AV MANUFACTURERS',
      body:
        'A huge database of most Pro AV manufacturers and their devices, with links out to ' +
        'their home and product pages. Every entry starts from the manufacturer\'s own ' +
        'documentation. Nothing in it is guessed.',
    },
    {
      at: 0.125,
      headline: 'CONTROL DRIVERS FOR THE PROJECTORS AND DISPLAYS IN THE ROOM',
      body:
        'Hundreds of devices and thousands of commands make up a database that is growing ' +
        'exponentially. Each driver is reviewed by a person before it ships in the app. New ' +
        'manufacturers arrive with every release.',
    },
    {
      at: 0.229167,
      headline: 'EACH DRIVER DOUBLES AS A CHEAT SHEET FOR THE MANUAL',
      body:
        'Every driver carries its exact description and setup instructions right in the ' +
        'interface. You no longer have to hunt for PDFs or remember specific requirements. ' +
        'It is the one page of the manual you actually needed.',
    },
    {
      at: 0.375,
      headline: 'EVERYTHING YOU NEED TO CONNECT COMES ALREADY FILLED IN',
      body:
        'The database carries the specific connection details for every model. It covers ' +
        'IP, RS-232 and IR, with the ports and parameters already filled in. You start from ' +
        'the right settings instead of a guess.',
    },
    {
      at: 0.510417,
      headline: 'THE API LISTS EVERY COMMAND THE DEVICE TAKES',
      body:
        'Every command the device answers to, with the exact payload that goes down the ' +
        'wire. Encoding and line endings come set, so nothing is hand-typed. Pick a command ' +
        'and it is ready to send.',
    },
    {
      at: 0.65625,
      // Not "THE CONNECTION": the block four beats earlier is titled CONNECTION and is
      // about what the driver *states*. This one is about the connection being *made*.
      headline: 'GIVE IT AN ADDRESS AND MAKE A LIVE CONNECTION',
      body:
        'Add the device, type the address it sits at, and connect. Protocol, port, encoding ' +
        'and line ending all come from the driver. There is nothing else to configure.',
    },
    {
      at: 0.791667,
      headline: 'SEND A COMMAND FROM THE TERMINAL AND WATCH IT LAND',
      body:
        'Send a command from the same screen and the log shows exactly what went out. A ' +
        'real device sends its feedback straight back. You can prove the driver works ' +
        'before the room goes live.',
    },
    {
      // The loop's return. It gets a block because the picture changes here — the
      // connection screen closes and the catalog is back — and a panel still describing
      // the terminal over a picture of the list reads as a bug.
      at: 0.916667,
      headline: 'THAT WAS ONE DRIVER AND HUNDREDS MORE WORK THE SAME',
      body:
        'That was one driver. Every one in the list opens the same way. Pick any device and ' +
        'the same screens are waiting.',
    },
  ],
};

/** The four sources, as every EUI surface in this repo labels them. */
export const EUI_INPUTS = [
  {label: 'Input 1'},
  {label: 'Input 2'},
  {label: 'Input 3'},
  {label: 'Input 4'},
];

/** Volume the routing loops sit at, so the audio strip is never at an odd value. */
export const RESTING_VOLUME = 0.58;

// ── app: Off -> Power On -> Many-to-One -> Power Off -> Off ───────────────────────
//
// The complete room cycle in 10s: standby welcome screen, tap power, green progress ring,
// live Many-to-One interface with Input 1 routed to Display 1, tap power off, red progress ring,
// and clean return to standby.

export const APP_WELCOME_TAP_AT = 0.10;
export const APP_POWERING_ON_START = 0.16;
export const APP_SWITCHER_START = 0.40;
export const APP_ROUTE_INPUT_AT = 0.46;
export const APP_POWER_OFF_TAP_AT = 0.68;
export const APP_POWERING_OFF_START = 0.72;
export const APP_STANDBY_START = 0.92;

export const appSelection = (t: number): number | null =>
  t >= APP_ROUTE_INPUT_AT && t < APP_POWERING_OFF_START ? 0 : null;

// ── the press ────────────────────────────────────────────────────────────────────────
//
// The app turns a control yellow while it is under a finger, then applies the change on
// release. `res/color/button_background_state.xml` and the `*_selector.xml` drawables are
// the source: `state_pressed` maps to `shape_button_yellow` (solid `pri_yellow`) for the
// source rows and to `disp_m_yellow` for the output cells.
//
// It matters here because a loop has no cursor. Without the press, a row simply *is* blue
// on one frame having been black on the last, which reads as the interface animating
// itself. The yellow is the only thing in the frame that says a person did it.
//
// The press ENDS on the frame the state lands, so it leads the change rather than
// overlapping it — press, release, routed, in that order, the way the hardware does it.

/** How long a control is held, as a cycle fraction. 9 frames at 300. */
export const PRESS_HOLD = 0.03;

/** Targets use `MATRIX_TAPS`' 1-based vocabulary: `input-1`, `output-2`, `all`. */
const pressing = (t: number, at: number) => t >= at - PRESS_HOLD && t < at;

/** The control under a finger at `t`, or null. */
export const appPressed = (t: number): string | null =>
  pressing(t, APP_ROUTE_INPUT_AT) ? 'input-1' : null;

// ── route: Many-to-One ───────────────────────────────────────────────────────────────
//
// Nothing → Input 1 → 2 → 3 → power off → nothing. The first tap is the one the loop
// exists for: an empty display panel filling, which is the claim the copy beside it
// makes. The last one releases the room and returns the panel to the state it opened on,
// so the cycle closes without either end being a routed screen.

/** The room is released here, and the panel is cold from this point to t=1. */
export const ROUTE_POWER_AT = 0.86;

export const ROUTE_TAPS = [
  {at: 0.16, input: 0},
  {at: 0.4, input: 1},
  {at: 0.64, input: 2},
] as const;

/** Index into `EUI_INPUTS`, or null for the cold state at both ends of the cycle. */
export const routeSelection = (t: number): number | null =>
  t >= ROUTE_POWER_AT ? null : t >= 0.64 ? 2 : t >= 0.4 ? 1 : t >= 0.16 ? 0 : null;

/** The source row under a finger at `t`. `ROUTE_TAPS` is 0-based; targets are not. */
export const routePressed = (t: number): string | null => {
  const tap = ROUTE_TAPS.find((x) => pressing(t, x.at));
  return tap ? `input-${tap.input + 1}` : null;
};

// ── matrix: Many-to-Many ─────────────────────────────────────────────────────────────
//
// The one thing about this surface that is not obvious from a screenshot: selecting a
// source does not route it. You select, then you choose which outputs take it. From cold
// that reads properly for the first time — the loop selects Input 3 and nothing moves,
// then gives it to two of the four outputs one at a time while the other two stay dark,
// which is the independence claim made in the open rather than asserted. Then Input 1 and
// All fills every screen at once, and the power tap returns all four to nothing.
//
// Two outputs stay empty for most of the cycle, and that is the point rather than an
// unfinished state: it is the only way a four-cell grid can show that a screen holds what
// it was given and nothing else. It also makes All worth watching, because it now fills
// four cells instead of changing two.

/** The room is released here, and every output is dark from this point to t=1. */
export const MATRIX_POWER_AT = 0.86;

export const MATRIX_TAPS = [
  {at: 0.12, target: 'input-3'},
  {at: 0.28, target: 'output-2'},
  {at: 0.44, target: 'output-4'},
  {at: 0.6, target: 'input-1'},
  {at: 0.74, target: 'all'},
] as const;

/** Input 3 (index 2) while the outputs are assigned, Input 1 (0) for All, else cold. */
export const matrixSelection = (t: number): number | null =>
  t >= MATRIX_POWER_AT ? null : t >= 0.6 ? 0 : t >= 0.12 ? 2 : null;

/** The control under a finger at `t`. `MATRIX_TAPS.target` is already the vocabulary. */
export const matrixPressed = (t: number): string | null =>
  MATRIX_TAPS.find((x) => pressing(t, x.at))?.target ?? null;

/**
 * Output 2 takes Input 3 at 0.28 and Output 4 at 0.44; All gives every one Input 1 at
 * 0.74; the power tap at 0.86 takes them all back to nothing.
 */
export const matrixOutputs = (t: number) =>
  [0, 1, 2, 3].map((index) => {
    const label = `Output ${index + 1}`;
    if (t < 0.28 || t >= MATRIX_POWER_AT) return {label, source: null};
    if (t >= 0.74) return {label, source: 'Input 1'};
    const takesInput3 = (index === 1 && t >= 0.28) || (index === 3 && t >= 0.44);
    return {label, source: takesInput3 ? 'Input 3' : null};
  });

// ── audio ────────────────────────────────────────────────────────────────────────────
//
// Up, down, muted, back. The routing underneath never changes, which is the point of the
// beat this is derived from: room volume is on the same screen as the switching, not
// behind a second remote.

export const AUDIO_MUTE_AT = 0.62;
export const AUDIO_UNMUTE_AT = 0.8;

/** The speaker control is the only thing tapped in this loop, so it is the only press. */
export const audioPressed = (t: number): string | null =>
  pressing(t, AUDIO_MUTE_AT) || pressing(t, AUDIO_UNMUTE_AT) ? 'speaker' : null;

/** The level the room was at when it was muted, and the level it comes back to. */
const AUDIO_BEFORE_MUTE = 0.34;

/**
 * 0..1. Slide up, slide down, mute to silence, unmute back to where it was.
 *
 * **Mute takes the gauge to zero and unmute restores the previous level**, which is the
 * app's behaviour and not a dramatisation of it: `RemoteViewModel` keeps a
 * `lastVolumeBeforeMute` per device for exactly this, and `getLastVolumeBeforeMute` is
 * what the level comes back from. Showing the bar hold its position through a mute would
 * be the invention.
 *
 * The drop and the recovery are fast — four frames either side of the tap — because a
 * mute is a state change, not a fade. Everything else is a slide.
 *
 * Opens and closes at `RESTING_VOLUME` with the closing ramp settling flat, so the loop
 * wraps on a still frame. See the header of this file.
 */
export const audioVolume = (t: number): number =>
  interpolate(
    t,
    [0, 0.1, 0.32, 0.42, 0.55, AUDIO_MUTE_AT, 0.655, AUDIO_UNMUTE_AT, 0.835, 0.97, 1],
    [
      RESTING_VOLUME,
      RESTING_VOLUME,
      0.86,
      0.86,
      AUDIO_BEFORE_MUTE,
      AUDIO_BEFORE_MUTE,
      0, //                      muted: the gauge goes to silence
      0, //                      and stays there until the second tap
      AUDIO_BEFORE_MUTE, //      unmuted: straight back to where it was
      RESTING_VOLUME,
      RESTING_VOLUME,
    ],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

export const audioMuted = (t: number): boolean => t >= AUDIO_MUTE_AT && t < AUDIO_UNMUTE_AT;

/** Outputs the audio loop holds behind the volume strip. Static, deliberately. */
export const AUDIO_OUTPUTS = [0, 1, 2, 3].map((index) => ({
  label: `Output ${index + 1}`,
  source: 'Input 3',
}));
