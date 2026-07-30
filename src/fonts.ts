import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

if (typeof document !== 'undefined' && typeof FontFace !== 'undefined') {
  const handle = delayRender('Loading the CTRLbot Audiowide brand font');
  const audiowide = new FontFace(
    'Audiowide',
    `url(${staticFile('fonts/Audiowide-Regular.ttf')})`,
    {style: 'normal', weight: '100 900'},
  );

  audiowide.load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      continueRender(handle);
    })
    .catch((error) => cancelRender(error));
}
