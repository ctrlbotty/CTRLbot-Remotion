import {AbsoluteFill, Img, Interactive, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {HubCell} from './HubCell';

// The web capture leads for 28.8 seconds; the existing app sequence then starts at
// its command detail and runs through connection and terminal on its original clock.
// The final dissolve settles on the exact opening catalog image before the loop wraps.
export const HubHomeCell = ({webDark}: {webDark: boolean}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  // The captured site frame is x=282..1318; its masthead ends at y=252.
  // Fill each output from that content rectangle, anchored to its top edge.
  const cropWidth = 1036;
  const cropX = 282;
  const captureScale = width / cropWidth;
  const captureStyle: React.CSSProperties = {
    position: 'absolute',
    width: 1600 * captureScale,
    height: 1200 * captureScale,
    left: -cropX * captureScale,
    top: -252 * captureScale,
  };
  const image = frame < 216 ? 'home-catalog-v1.png' : frame < 540 ? 'home-driver-v1.png' : 'home-edit-v1.png';
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      {frame < 864 && (
        <Interactive.Div name="Web Hub capture" style={{width: '100%', height: '100%', backgroundColor: '#fff', filter: webDark ? 'invert(1) hue-rotate(180deg)' : undefined}}>
          <Img src={staticFile(`web-hub/${image}`)} style={captureStyle} />
        </Interactive.Div>
      )}
      <Sequence from={12} durationInFrames={1428}>
        {frame >= 864 && <HubCell />}
      </Sequence>
      {frame >= 1380 && (
        <Interactive.Div name="Return to catalog" style={{position: 'absolute', inset: 0, backgroundColor: '#fff', filter: webDark ? 'invert(1) hue-rotate(180deg)' : undefined, opacity: interpolate(frame, [1380, 1410], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          <Img src={staticFile('web-hub/home-catalog-v1.png')} style={captureStyle} />
        </Interactive.Div>
      )}
    </AbsoluteFill>
  );
};

