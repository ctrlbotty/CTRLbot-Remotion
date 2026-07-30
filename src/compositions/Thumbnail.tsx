import {AbsoluteFill} from 'remotion';
import {CtrlbotWordmark} from '../components/Brand';
import {ProductCapture} from '../components/ProductCapture';
import {GridBackdrop} from '../components/Scene';
import {palette, typography} from '../design/theme';
import {captures} from '../media/captures';

export const Thumbnail = () => (
  <AbsoluteFill style={{background: palette.black}}>
    <GridBackdrop accent={palette.blue} intensity={1.2} />
    <div style={{position: 'absolute', left: 86, top: 72}}><CtrlbotWordmark accent={palette.blue} /></div>
    <div style={{position: 'absolute', left: 88, top: 260, width: 760}}>
      <div style={{fontFamily: typography.bold, color: palette.blue, fontSize: 20, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase'}}>Getting started</div>
      <div style={{fontFamily: typography.display, color: palette.white, fontSize: 91, lineHeight: 1.02, letterSpacing: -4, fontWeight: 900, marginTop: 24}}>Build your first CTRLbot system</div>
      <div style={{fontSize: 27, lineHeight: 1.4, color: palette.muted, marginTop: 27}}>Driver → Connection → Preset → End User Interface</div>
    </div>
    <ProductCapture capture={{source: captures.tablet.euiStill, type: 'image', device: 'tablet', label: 'Current tablet EUI'}} accent={palette.blue} animate={false} style={{position: 'absolute', right: 42, top: 205, width: 1020, height: 690}} />
    <div style={{position: 'absolute', left: 88, bottom: 64, padding: '15px 20px', borderRadius: 12, background: `${palette.blue}20`, border: `1px solid ${palette.blue}88`, color: palette.white, fontFamily: typography.bold, fontSize: 17, fontWeight: 750}}>TRAINING SERIES · 01</div>
  </AbsoluteFill>
);
