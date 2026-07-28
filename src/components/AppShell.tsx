import type {CSSProperties, ReactNode} from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {pulse, reveal} from '../design/animation';
import {palette, shadow, typography} from '../design/theme';
import {CtrlbotMark, CtrlbotWordmark} from './Brand';
import {Icon, type IconName, StatusDot} from './Icons';

export type AppScreen = 'drivers' | 'connection' | 'presets' | 'switching' | 'eui';

const controlStyle: CSSProperties = {
  height: 48,
  borderRadius: 9,
  background: palette.panelRaised,
  border: `1px solid ${palette.line}`,
  color: palette.white,
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
};

const navItems: {screen: AppScreen | 'settings'; label: string; icon: IconName}[] = [
  {screen: 'drivers', label: 'Device', icon: 'device'},
  {screen: 'connection', label: 'Connect', icon: 'connection'},
  {screen: 'presets', label: 'Activities', icon: 'activity'},
  {screen: 'settings', label: 'Settings', icon: 'settings'},
];

const activeFor = (active: AppScreen, item: AppScreen | 'settings') =>
  active === item || (active === 'switching' && item === 'presets');

const Sidebar = ({active, accent}: {active: AppScreen; accent: string}) => (
  <div
    style={{
      width: 230,
      flex: '0 0 230px',
      padding: '25px 18px 22px',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #101517 0%, #090C0E 100%)',
      borderRight: `1px solid ${palette.line}`,
    }}
  >
    <CtrlbotWordmark compact accent={accent} style={{padding: '0 10px 25px'}} />
    <div style={{display: 'grid', gap: 8}}>
      {navItems.map((item) => {
        const selected = activeFor(active, item.screen);
        return (
          <div
            key={item.screen}
            style={{
              height: 54,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '0 15px',
              fontSize: 17,
              fontWeight: selected ? 750 : 540,
              color: selected ? palette.white : palette.muted,
              background: selected ? `${accent}1F` : 'transparent',
              border: selected ? `1px solid ${accent}66` : '1px solid transparent',
              boxShadow: selected ? `inset 3px 0 0 ${accent}` : undefined,
            }}
          >
            <Icon name={item.icon} size={23} color={selected ? accent : palette.muted} />
            {item.label}
          </div>
        );
      })}
    </div>
    <div style={{flex: 1}} />
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${active === 'eui' ? accent : palette.line}`,
        background: active === 'eui' ? `${accent}1E` : palette.panel,
        padding: '18px 12px',
        display: 'grid',
        placeItems: 'center',
        gap: 10,
        color: accent,
      }}
    >
      <Icon name="home" size={36} color={accent} />
      <div style={{fontSize: 12, fontWeight: 800, letterSpacing: 1.4, textAlign: 'center'}}>
        END USER INTERFACE
      </div>
    </div>
  </div>
);

const Header = ({title, status}: {title: string; status?: string}) => (
  <div
    style={{
      height: 66,
      borderBottom: `1px solid ${palette.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 27px',
      background: 'rgba(10,14,16,.94)',
    }}
  >
    <div style={{fontSize: 19, color: palette.white, fontWeight: 750}}>{title}</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, color: palette.muted, fontSize: 14}}>
      {status ? <StatusDot active /> : null}
      {status ?? 'Local project'}
    </div>
  </div>
);

const Pill = ({
  children,
  selected = false,
  accent = palette.blue,
}: {
  children: ReactNode;
  selected?: boolean;
  accent?: string;
}) => (
  <div
    style={{
      minHeight: 38,
      padding: '0 15px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 9,
      color: selected ? palette.white : palette.muted,
      background: selected ? `${accent}28` : palette.panelRaised,
      border: `1px solid ${selected ? `${accent}99` : palette.line}`,
      fontSize: 13,
      fontWeight: selected ? 760 : 580,
    }}
  >
    {children}
  </div>
);

const Field = ({label, value, mono = false}: {label: string; value: string; mono?: boolean}) => (
  <div style={{display: 'grid', gap: 7}}>
    <div style={{fontSize: 12, color: palette.muted, textTransform: 'uppercase', letterSpacing: 1.2}}>
      {label}
    </div>
    <div style={{...controlStyle, fontFamily: mono ? typography.mono : typography.body, fontSize: 15}}>
      {value}
    </div>
  </div>
);

const DriversScreen = ({accent}: {accent: string}) => {
  const frame = useCurrentFrame();
  const drivers = [
    {maker: 'EPSON', type: 'Projectors', protocol: 'TCP / RS-232'},
    {maker: 'SAMSUNG', type: 'Displays', protocol: 'TCP'},
    {maker: 'EXTRON', type: 'Switchers', protocol: 'SSH / TCP'},
    {maker: 'QSC', type: 'Audio DSP', protocol: 'TCP'},
  ];

  return (
    <div style={{height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr'}}>
      <Header title="Device Drivers" status="Catalog ready" />
      <div style={{padding: 26, display: 'grid', gridTemplateRows: '52px 1fr', gap: 18, minHeight: 0}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12}}>
          <div style={{...controlStyle, color: palette.muted}}>
            <Icon name="search" size={19} color={palette.muted} />
            <span style={{marginLeft: 11}}>Search drivers...</span>
          </div>
          <Pill selected accent={accent}>IP / RS-232</Pill>
          <Pill>Manufacturer A–Z</Pill>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '44% 1fr', gap: 20, minHeight: 0}}>
          <div style={{display: 'grid', gap: 10, alignContent: 'start'}}>
            {drivers.map((driver, index) => {
              const selected = index === 0;
              const opacity = reveal(frame, 5 + index * 5, 12);
              return (
                <div
                  key={driver.maker}
                  style={{
                    minHeight: 83,
                    borderRadius: 13,
                    border: `1px solid ${selected ? `${accent}AA` : palette.line}`,
                    background: selected ? `${accent}19` : palette.panel,
                    padding: '15px 17px',
                    display: 'grid',
                    gridTemplateColumns: '46px 1fr auto',
                    alignItems: 'center',
                    gap: 14,
                    opacity,
                    transform: `translateX(${(1 - opacity) * -18}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 11,
                      display: 'grid',
                      placeItems: 'center',
                      background: selected ? `${accent}30` : palette.panelRaised,
                    }}
                  >
                    <Icon name={driver.type.includes('Switcher') ? 'switching' : driver.type.includes('Audio') ? 'audio' : 'display'} size={22} color={selected ? accent : palette.muted} />
                  </div>
                  <div>
                    <div style={{fontSize: 15, color: palette.white, fontWeight: 760}}>{driver.maker}</div>
                    <div style={{fontSize: 13, color: palette.muted, marginTop: 5}}>{driver.type}</div>
                  </div>
                  <div style={{fontFamily: typography.mono, fontSize: 11, color: selected ? accent : palette.muted}}>
                    {driver.protocol}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              minHeight: 0,
              borderRadius: 16,
              background: palette.panel,
              border: `1px solid ${palette.line}`,
              overflow: 'hidden',
            }}
          >
            <div style={{padding: '23px 24px', borderBottom: `1px solid ${palette.line}`}}>
              <div style={{display: 'flex', justifyContent: 'space-between', gap: 16}}>
                <div>
                  <div style={{fontSize: 13, color: accent, letterSpacing: 1.3}}>EPSON · PROJECTOR</div>
                  <div style={{fontSize: 24, color: palette.white, fontWeight: 800, marginTop: 7}}>ESC/VP21 Control</div>
                </div>
                <Pill selected accent={accent}>Create connection</Pill>
              </div>
              <div style={{display: 'flex', gap: 8, marginTop: 18}}>
                {['TCP', 'RS-232', 'ASCII', 'Power', 'Inputs'].map((tag) => <Pill key={tag}>{tag}</Pill>)}
              </div>
            </div>
            <div style={{padding: 24}}>
              <div style={{fontSize: 13, color: palette.muted, marginBottom: 13, textTransform: 'uppercase', letterSpacing: 1.2}}>Available commands</div>
              <div style={{display: 'grid', gap: 9}}>
                {[
                  ['Power On', 'PWR ON'],
                  ['Power Off', 'PWR OFF'],
                  ['HDMI 1', 'SOURCE 30'],
                  ['Volume Up', 'VOL INC'],
                ].map(([label, command]) => (
                  <div key={label} style={{height: 46, borderRadius: 9, background: palette.ink, border: `1px solid ${palette.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px'}}>
                    <span style={{fontSize: 14, color: palette.white}}>{label}</span>
                    <span style={{fontFamily: typography.mono, fontSize: 12, color: accent}}>{command}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConnectionScreen = ({accent}: {accent: string}) => {
  const frame = useCurrentFrame();
  const connectProgress = interpolate(frame, [22, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ready = frame >= 48;

  return (
    <div style={{height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr'}}>
      <Header title="Configure Connection" status={ready ? 'Device online' : 'Local project'} />
      <div style={{padding: 27, display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 22, minHeight: 0}}>
        <div style={{borderRadius: 16, border: `1px solid ${palette.line}`, background: palette.panel, padding: 25}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
            <div>
              <div style={{fontSize: 13, color: accent, letterSpacing: 1.4}}>EPSON · ESC/VP21</div>
              <div style={{fontSize: 24, color: palette.white, fontWeight: 800, marginTop: 6}}>Conference Room Projector</div>
            </div>
            <Icon name="display" size={38} color={accent} />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 17}}>
            <Field label="Device label" value="Boardroom Projector" />
            <Field label="Room" value="Conference Room A" />
            <Field label="IP address" value="192.168.10.42" mono />
            <Field label="Port" value="3629" mono />
            <Field label="Protocol" value="TCP" />
            <Field label="Authentication" value="Not required" />
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 25}}>
            <Pill>Cancel</Pill>
            <div style={{...controlStyle, background: accent, borderColor: accent, fontWeight: 800, minWidth: 148, justifyContent: 'center'}}>
              {ready ? 'Save connection' : 'Test connection'}
            </div>
          </div>
        </div>
        <div style={{borderRadius: 16, border: `1px solid ${palette.line}`, background: '#080B0D', overflow: 'hidden', display: 'grid', gridTemplateRows: '55px 1fr auto'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 11, padding: '0 18px', borderBottom: `1px solid ${palette.line}`}}>
            <Icon name="terminal" size={19} color={accent} />
            <span style={{color: palette.white, fontSize: 14, fontWeight: 730}}>Connection test</span>
          </div>
          <div style={{fontFamily: typography.mono, fontSize: 13, lineHeight: 1.75, color: palette.muted, padding: 20}}>
            <div><span style={{color: accent}}>$</span> open tcp://192.168.10.42:3629</div>
            {frame > 15 ? <div>Resolving device route...</div> : null}
            {frame > 24 ? <div>Opening TCP socket...</div> : null}
            {frame > 36 ? <div>Sending <span style={{color: palette.white}}>PWR?</span></div> : null}
            {frame > 47 ? <div style={{color: palette.green}}>PWR=00 · response received</div> : null}
            {frame > 52 ? <div style={{color: palette.white}}>Connection verified.</div> : null}
          </div>
          <div style={{padding: 18, borderTop: `1px solid ${palette.line}`}}>
            <div style={{height: 7, background: palette.panelRaised, borderRadius: 99, overflow: 'hidden'}}>
              <div style={{width: `${connectProgress * 100}%`, height: '100%', background: ready ? palette.green : accent}} />
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, color: ready ? palette.green : palette.muted, fontSize: 12, marginTop: 11}}>
              <StatusDot active={ready} /> {ready ? 'Secure local reference saved' : 'Testing device response'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityTabs = ({selected, accent}: {selected: 'Presets' | 'Switching' | 'Audio'; accent: string}) => (
  <div style={{height: 54, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, padding: 6, background: '#080B0D', borderBottom: `1px solid ${palette.line}`}}>
    {(['Presets', 'Switching', 'Audio'] as const).map((tab) => (
      <div key={tab} style={{display: 'grid', placeItems: 'center', color: tab === selected ? palette.white : palette.muted, background: tab === selected ? `${accent}26` : palette.panel, border: `1px solid ${tab === selected ? `${accent}88` : palette.line}`, borderRadius: 9, fontSize: 14, fontWeight: tab === selected ? 760 : 540}}>
        {tab}
      </div>
    ))}
  </div>
);

const PresetsScreen = ({accent}: {accent: string}) => {
  const frame = useCurrentFrame();
  const steps = [
    {device: 'Boardroom Projector', action: 'Power On', time: '0:00'},
    {device: 'System', action: 'Delay 8 seconds', time: '0:01'},
    {device: 'Matrix Switcher', action: 'Route Laptop → Display 1', time: '0:09'},
    {device: 'Audio DSP', action: 'Set room volume to 42%', time: '0:10'},
  ];

  return (
    <div style={{height: '100%', display: 'grid', gridTemplateRows: 'auto auto 1fr'}}>
      <Header title="Activities" status="3 presets ready" />
      <ActivityTabs selected="Presets" accent={accent} />
      <div style={{padding: 24, display: 'grid', gridTemplateColumns: '38% 1fr', gap: 20, minHeight: 0}}>
        <div style={{display: 'grid', gridTemplateRows: 'auto 1fr', gap: 14}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontSize: 18, fontWeight: 780, color: palette.white}}>Power & room presets</div>
            <Pill selected accent={accent}>+ New preset</Pill>
          </div>
          <div style={{display: 'grid', gap: 11, alignContent: 'start'}}>
            {[
              ['System Power On', '4 steps', 'power'],
              ['System Power Off', '5 steps', 'power'],
              ['Presentation Mode', '4 steps', 'preset'],
            ].map(([name, count, icon], index) => (
              <div key={name} style={{height: 82, borderRadius: 13, display: 'grid', gridTemplateColumns: '48px 1fr auto', alignItems: 'center', gap: 13, padding: '0 15px', background: index === 2 ? `${accent}1B` : palette.panel, border: `1px solid ${index === 2 ? `${accent}99` : palette.line}`}}>
                <div style={{width: 45, height: 45, borderRadius: 12, display: 'grid', placeItems: 'center', background: index === 2 ? `${accent}2C` : palette.panelRaised}}>
                  <Icon name={icon as IconName} size={23} color={index === 2 ? accent : palette.muted} />
                </div>
                <div>
                  <div style={{color: palette.white, fontSize: 15, fontWeight: 720}}>{name}</div>
                  <div style={{color: palette.muted, fontSize: 12, marginTop: 5}}>{count}</div>
                </div>
                <Icon name="play" size={23} color={index === 2 ? accent : palette.muted} />
              </div>
            ))}
          </div>
        </div>
        <div style={{borderRadius: 16, background: palette.panel, border: `1px solid ${palette.line}`, padding: 22, minHeight: 0}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
            <div>
              <div style={{fontSize: 12, color: accent, letterSpacing: 1.4}}>PRESET BUILDER</div>
              <div style={{fontSize: 22, color: palette.white, fontWeight: 800, marginTop: 6}}>Presentation Mode</div>
            </div>
            <div style={{display: 'flex', gap: 8}}><Pill>Test</Pill><Pill selected accent={accent}>Save</Pill></div>
          </div>
          <div style={{position: 'relative', display: 'grid', gap: 10}}>
            <div style={{position: 'absolute', top: 24, bottom: 24, left: 20, width: 2, background: palette.line}} />
            {steps.map((step, index) => {
              const opacity = reveal(frame, 7 + index * 7, 15);
              return (
                <div key={step.action} style={{height: 66, display: 'grid', gridTemplateColumns: '42px 1fr auto', alignItems: 'center', position: 'relative', borderRadius: 11, background: palette.ink, border: `1px solid ${palette.line}`, padding: '0 15px 0 0', opacity, transform: `translateX(${(1 - opacity) * 18}px)`}}>
                  <div style={{width: 42, height: 42, display: 'grid', placeItems: 'center', zIndex: 2}}>
                    <div style={{width: 20, height: 20, borderRadius: 99, background: index === steps.length - 1 ? accent : palette.panelRaised, border: `2px solid ${index === steps.length - 1 ? accent : palette.lineBright}`, boxShadow: index === steps.length - 1 ? `0 0 15px ${accent}` : undefined}} />
                  </div>
                  <div>
                    <div style={{fontSize: 14, color: palette.white, fontWeight: 690}}>{step.action}</div>
                    <div style={{fontSize: 11, color: palette.muted, marginTop: 4}}>{step.device}</div>
                  </div>
                  <div style={{fontFamily: typography.mono, color: accent, fontSize: 12}}>{step.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const SwitchingScreen = ({accent}: {accent: string}) => {
  const frame = useCurrentFrame();
  const sourceLabels = ['Laptop', 'Teams PC', 'Signage', 'Wireless'];
  const outputs = ['Display 1', 'Display 2', 'Display 3', 'Projector'];
  const route = Math.min(3, Math.floor(frame / 32));

  return (
    <div style={{height: '100%', display: 'grid', gridTemplateRows: 'auto auto 1fr'}}>
      <Header title="Activities" status="Matrix online" />
      <ActivityTabs selected="Switching" accent={accent} />
      <div style={{padding: 25, minHeight: 0}}>
        <div style={{height: '100%', borderRadius: 17, background: palette.panel, border: `1px solid ${palette.line}`, padding: 24, display: 'grid', gridTemplateRows: 'auto 1fr', gap: 22}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>
              <div style={{fontSize: 12, color: accent, letterSpacing: 1.3}}>MANY-TO-MANY</div>
              <div style={{fontSize: 23, fontWeight: 800, color: palette.white, marginTop: 6}}>Video Routing Matrix</div>
            </div>
            <div style={{display: 'flex', gap: 9}}><Pill>Inputs 4</Pill><Pill>Outputs 4</Pill><Pill selected accent={accent}>Live routing</Pill></div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '220px 1fr', gap: 17, minHeight: 0}}>
            <div style={{display: 'grid', gridTemplateRows: '50px repeat(4,1fr)', gap: 8}}>
              <div />
              {outputs.map((output, outputIndex) => (
                <div key={output} style={{borderRadius: 11, border: `1px solid ${route === outputIndex ? `${accent}AA` : palette.line}`, background: route === outputIndex ? `${accent}1E` : palette.ink, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', color: palette.white, fontSize: 14, fontWeight: 680}}>
                  <Icon name="display" size={20} color={route === outputIndex ? accent : palette.muted} />
                  {output}
                </div>
              ))}
            </div>
            <div style={{display: 'grid', gridTemplateRows: '50px 1fr', gap: 8}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8}}>
                {sourceLabels.map((source, sourceIndex) => (
                  <div key={source} style={{display: 'grid', placeItems: 'center', borderRadius: 10, background: sourceIndex === 0 ? `${accent}1E` : palette.ink, border: `1px solid ${sourceIndex === 0 ? `${accent}88` : palette.line}`, color: sourceIndex === 0 ? palette.white : palette.muted, fontSize: 13, fontWeight: 680}}>{source}</div>
                ))}
              </div>
              <div style={{display: 'grid', gridTemplateRows: 'repeat(4,1fr)', gridTemplateColumns: 'repeat(4,1fr)', gap: 8}}>
                {outputs.flatMap((output, outputIndex) => sourceLabels.map((source, sourceIndex) => {
                  const selected = sourceIndex === 0 && outputIndex <= route;
                  return (
                    <div key={`${output}-${source}`} style={{borderRadius: 10, border: `1px solid ${selected ? accent : palette.line}`, background: selected ? `linear-gradient(145deg, ${accent}44, ${accent}17)` : palette.ink, display: 'grid', placeItems: 'center', color: selected ? palette.white : palette.mutedDark, boxShadow: selected ? `inset 0 0 24px ${accent}25, 0 0 15px ${accent}18` : undefined}}>
                      {selected ? <Icon name="check" size={23} color={accent} strokeWidth={2.5} /> : <span style={{width: 7, height: 7, borderRadius: 99, background: palette.line}} />}
                    </div>
                  );
                }))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EuiScreen = ({accent, staticPreview = false}: {accent: string; staticPreview?: boolean}) => {
  const frame = useCurrentFrame();
  const displayFrame = staticPreview ? 100 : frame;
  const selectedOutput = Math.min(3, Math.floor(displayFrame / 38));
  const slider = interpolate(displayFrame, [0, 115], [45, 68], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <div style={{height: '100%', background: 'radial-gradient(circle at 70% 44%, #798086 0%, #303438 34%, #151719 73%)', display: 'grid', gridTemplateRows: '76px 1fr 88px'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', background: 'rgba(0,0,0,.78)', borderBottom: '1px solid rgba(255,255,255,.2)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 13}}>
          <div style={{width: 45, height: 45, display: 'grid', placeItems: 'center', borderRadius: 12, background: 'rgba(255,255,255,.08)'}}><Icon name="settings" size={26} color={palette.white} /></div>
          <div style={{fontSize: 13, color: palette.muted, letterSpacing: 1.3}}>PRESS & HOLD TO EXIT SETUP</div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Pill>Presets</Pill><Pill selected accent={accent}>AV Switch</Pill>
          <Icon name="display" size={28} color={accent} />
          <Icon name="settings" size={27} color={palette.white} />
          <Icon name="power" size={31} color={palette.red} />
        </div>
      </div>
      <div style={{padding: '28px 35px', display: 'grid', gridTemplateColumns: '310px 1fr', gap: 26, minHeight: 0}}>
        <div style={{background: 'rgba(9,12,14,.82)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 18, padding: 20}}>
          <div style={{fontSize: 12, color: accent, letterSpacing: 1.5}}>SELECT A SOURCE</div>
          <div style={{fontSize: 24, color: palette.white, fontWeight: 800, marginTop: 7}}>Room inputs</div>
          <div style={{display: 'grid', gap: 11, marginTop: 22}}>
            {['Presentation Laptop', 'Teams Room PC', 'Wireless Share', 'Digital Signage'].map((source, index) => (
              <div key={source} style={{height: 65, borderRadius: 13, background: index === 0 ? `${accent}35` : 'rgba(0,0,0,.32)', border: `1px solid ${index === 0 ? accent : 'rgba(255,255,255,.15)'}`, display: 'flex', alignItems: 'center', gap: 13, padding: '0 15px', color: palette.white, fontSize: 14, fontWeight: 680}}>
                <Icon name={index === 1 ? 'terminal' : 'display'} size={22} color={index === 0 ? accent : palette.muted} />{source}
              </div>
            ))}
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18}}>
          {['Main Display', 'Confidence Monitor', 'Lobby Display', 'Projector'].map((output, index) => {
            const selected = index <= selectedOutput;
            return (
              <div key={output} style={{borderRadius: 19, background: selected ? `linear-gradient(145deg, ${accent}55, rgba(4,7,8,.72))` : 'rgba(4,7,8,.66)', border: `2px solid ${selected ? accent : 'rgba(255,255,255,.18)'}`, boxShadow: selected ? `0 0 30px ${accent}40, inset 0 0 30px rgba(0,0,0,.28)` : undefined, display: 'grid', gridTemplateRows: '1fr auto', padding: 18, opacity: reveal(displayFrame, 4 + index * 7, 14)}}>
                <div style={{display: 'grid', placeItems: 'center'}}>
                  <div style={{width: '78%', aspectRatio: '16/9', borderRadius: 9, border: `3px solid ${selected ? palette.white : palette.mutedDark}`, background: selected ? `radial-gradient(circle at 50% 40%, ${accent}88, #111)` : '#111', display: 'grid', placeItems: 'center'}}>
                    <CtrlbotMark size={74} accent={selected ? accent : palette.mutedDark} color={selected ? palette.white : palette.mutedDark} />
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: palette.white, fontSize: 16, fontWeight: 730}}>
                  {output}<span style={{fontSize: 11, color: selected ? accent : palette.muted}}>{selected ? 'LAPTOP' : 'STANDBY'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '88px 1fr 88px', alignItems: 'center', gap: 20, padding: '0 28px', background: 'rgba(0,0,0,.82)', borderTop: '1px solid rgba(255,255,255,.2)'}}>
        <Icon name="audio" size={42} color={palette.white} />
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <span style={{fontSize: 13, color: palette.muted}}>VOL</span>
          <div style={{height: 12, flex: 1, borderRadius: 99, background: palette.panelRaised, overflow: 'visible', position: 'relative'}}>
            <div style={{width: `${slider}%`, height: '100%', borderRadius: 99, background: accent}} />
            <div style={{position: 'absolute', left: `calc(${slider}% - 11px)`, top: -6, width: 24, height: 24, borderRadius: 99, background: palette.white, border: `5px solid ${accent}`, boxShadow: `0 0 18px ${accent}`}} />
          </div>
          <span style={{width: 36, color: palette.white, fontFamily: typography.mono}}>{Math.round(slider)}</span>
        </div>
        <Icon name="mic" size={39} color={palette.white} />
      </div>
    </div>
  );
};

export const AppShell = ({
  screen,
  accent = palette.blue,
  scale = 1,
  animate = true,
  style,
}: {
  screen: AppScreen;
  accent?: string;
  scale?: number;
  animate?: boolean;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = animate
    ? spring({frame, fps, config: {damping: 18, stiffness: 95}, durationInFrames: 36})
    : 1;
  const glow = pulse(frame, 80, 0.5);

  const content = screen === 'drivers' ? <DriversScreen accent={accent} />
    : screen === 'connection' ? <ConnectionScreen accent={accent} />
      : screen === 'presets' ? <PresetsScreen accent={accent} />
        : screen === 'switching' ? <SwitchingScreen accent={accent} />
          : <EuiScreen accent={accent} staticPreview={!animate} />;

  return (
    <div
      style={{
        width: 1420,
        height: 790,
        borderRadius: 24,
        overflow: 'hidden',
        display: 'flex',
        background: palette.ink,
        border: '1px solid rgba(255,255,255,.15)',
        boxShadow: `${shadow.panel}, 0 0 ${40 + glow * 30}px ${accent}25`,
        transform: `scale(${scale * (0.965 + intro * 0.035)}) translateY(${(1 - intro) * 24}px)`,
        opacity: intro,
        ...style,
      }}
    >
      {screen === 'eui' ? null : <Sidebar active={screen} accent={accent} />}
      <div style={{flex: 1, minWidth: 0}}>{content}</div>
    </div>
  );
};

export const AppCalloutTarget = ({
  x,
  y,
  accent = palette.blue,
  label,
}: {
  x: number;
  y: number;
  accent?: string;
  label?: string;
}) => {
  const frame = useCurrentFrame();
  const ring = 0.85 + pulse(frame, 28, 0.2) * 0.25;
  return (
    <div style={{position: 'absolute', left: x, top: y, zIndex: 20}}>
      <div style={{width: 38, height: 38, borderRadius: 99, border: `3px solid ${accent}`, transform: `scale(${ring})`, boxShadow: `0 0 0 8px ${accent}20, 0 0 24px ${accent}`}} />
      {label ? <div style={{position: 'absolute', left: 50, top: -3, whiteSpace: 'nowrap', borderRadius: 10, padding: '10px 13px', color: palette.white, fontSize: 14, fontWeight: 700, background: 'rgba(5,8,9,.92)', border: `1px solid ${accent}88`}}>{label}</div> : null}
    </div>
  );
};
