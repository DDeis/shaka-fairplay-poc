/* global shaka */
import { initPlayer, play } from './shaka/player.js';
import { Asset } from './models/asset.js';
import { LiveLicense } from './models/license.js';
import { FairPlayStream, WidevineStream, PlayReadyStream } from './models/stream.js';

shaka.log.setLevel(shaka.log.Level.V2);

const asset = new Asset({
  license: new LiveLicense(),
  streams: [
    new FairPlayStream('https://ncdn-live.pfd.sfr.net/shls/LIVE$TF1/index.m3u8?start=LIVE&end=END&device=hls_sfr'),
    new WidevineStream('https://ncdn-live.pfd.sfr.net/sdash/LIVE$TF1/index.mpd/Manifest?start=LIVE&end=END&device=dash_dyn_wide_sd'),
    new PlayReadyStream('https://ncdn-live.pfd.sfr.net/sdash/LIVE$TF1/index.mpd/Manifest?start=LIVE&end=END&device=dash_pr')
  ],
});

async function initApp() {
  await initPlayer();

  play(asset);
}


// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
document.addEventListener('shaka-ui-loaded', initApp);

// Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
// to load (e.g. due to lack of browser support).
document.addEventListener('shaka-ui-load-failed', initFailed);

function initFailed(errorEvent) {
  // Handle the failure to load; errorEvent.detail.reasonCode has a
  // shaka.ui.FailReasonCode describing why.
  console.error('Unable to load the UI library!', errorEvent);
}

