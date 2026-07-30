import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {CtrlbotWordmark} from '../components/Brand';
import {Icon} from '../components/Icons';
import {ProductCapture} from '../components/ProductCapture';
import {GridBackdrop} from '../components/Scene';
import {reveal} from '../design/animation';
import {palette, typography} from '../design/theme';
import {captures} from '../media/captures';
import type {FeatureShortProps} from './schemas';

export const FEATURE_SHORT_DURATION = 360;

export const FeatureShort = ({headline, subheadline, feature, accentColor}: FeatureShortProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = spring({frame, fps, config: {damping: 16, stiffness: 105}, durationInFrames: 40});
  const appScale = spring({frame: frame - 55, fps, config: {damping: 18, stiffness: 90}, durationInFrames: 44});
  const outro = interpolate(frame, [315, 350], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: palette.black, opacity: outro}}>
      <GridBackdrop accent={accentColor} intensity={1.35} />
      <div style={{position: 'absolute', top: 72, left: 70, right: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <CtrlbotWordmark compact accent={accentColor} />
        <div style={{fontFamily: typography.brand, color: palette.muted, fontSize: 14, letterSpacing: 2}}>CTRLbot IoT</div>
      </div>
      <div style={{position: 'absolute', left: 72, right: 72, top: 270, opacity: intro, transform: `translateY(${(1 - intro) * 54}px)`}}>
        <div style={{fontFamily: typography.display, fontSize: 102, lineHeight: 1.01, letterSpacing: -5, fontWeight: 900, color: palette.white}}>{headline}</div>
        <div style={{fontSize: 31, lineHeight: 1.42, color: palette.muted, marginTop: 34}}>{subheadline}</div>
      </div>
      <div style={{position: 'absolute', top: 610, left: 70, right: 70, height: 790, overflow: 'hidden'}}>
        <ProductCapture
          capture={{source: captures.phone.eui, type: 'video', device: 'phone', label: 'Current phone EUI'}}
          accent={accentColor}
          style={{position: 'absolute', inset: 0, transform: `scale(${0.92 + appScale * 0.08})`, transformOrigin: 'center top'}}
        />
      </div>
      <div style={{position: 'absolute', left: 72, right: 72, top: 1430, display: 'grid', gap: 18}}>
        {[
          ['device', 'Configure devices'],
          ['preset', 'Automate workflows'],
          ['home', 'Hand off simple control'],
        ].map(([icon, label], index) => {
          const opacity = reveal(frame, 92 + index * 12, 18);
          return (
            <div key={label} style={{height: 96, borderRadius: 20, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 20, color: palette.white, fontFamily: typography.bold, fontSize: 25, fontWeight: 730, background: 'rgba(12,17,19,.9)', border: `1px solid ${index === 2 ? `${accentColor}99` : palette.line}`, opacity, transform: `translateX(${(1 - opacity) * 36}px)`}}>
              <div style={{width: 52, height: 52, borderRadius: 15, background: `${accentColor}24`, display: 'grid', placeItems: 'center'}}><Icon name={icon as 'device'} size={28} color={accentColor} /></div>
              {label}
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', bottom: 62, left: 72, right: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 26, borderTop: `1px solid ${palette.line}`}}>
        <div style={{color: accentColor, fontFamily: typography.bold, fontSize: 17, fontWeight: 800, letterSpacing: 2.4, textTransform: 'uppercase'}}>{feature}</div>
        <Icon name="arrow" size={29} color={accentColor} />
      </div>
    </AbsoluteFill>
  );
};
