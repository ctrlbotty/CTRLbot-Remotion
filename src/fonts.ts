// Fonts, loaded so renders block until the faces are ready.
//
// Montserrat and Audiowide are copied out of the app's res/font by
// `npm run sync:tokens`, so the video uses the exact files the app ships rather
// than a web lookalike. Space Mono has no app equivalent and comes from Google
// Fonts, matching ctrlbot.io.
//
// Montserrat carries all readable copy. Audiowide is headlines and the wordmark.
// Space Mono is small uppercase labels.

import {loadFont} from '@remotion/fonts';
import {loadFont as loadSpaceMono} from '@remotion/google-fonts/SpaceMono';
import {staticFile} from 'remotion';

loadSpaceMono('normal', {weights: ['400', '700'], subsets: ['latin']});

export const fontsReady = Promise.all([
  loadFont({
    family: 'Montserrat',
    url: staticFile('fonts/Montserrat-Thin.ttf'),
    weight: '100',
  }),
  loadFont({
    family: 'Montserrat',
    url: staticFile('fonts/Montserrat-Light.ttf'),
    weight: '300',
  }),
  loadFont({
    family: 'Montserrat',
    url: staticFile('fonts/Montserrat-Regular.ttf'),
    weight: '400',
  }),
  loadFont({
    family: 'Montserrat',
    url: staticFile('fonts/Montserrat-Bold.ttf'),
    weight: '700',
  }),
  loadFont({
    family: 'Montserrat',
    url: staticFile('fonts/Montserrat-Italic.ttf'),
    weight: '400',
    style: 'italic',
  }),
  loadFont({
    family: 'Audiowide',
    url: staticFile('fonts/Audiowide-Regular.ttf'),
    weight: '400',
  }),
]);
