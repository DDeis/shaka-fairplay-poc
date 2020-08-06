import { onPlayerError } from "./error.js";
import { initUI } from "./ui/ui.js";
import { configureDrm } from "./drm/drm.js";
import { configureShaka } from "./config.js";

export async function initPlayer() {
  // When using the UI, the player is made automatically by the UI object.

  const { player, ui } = initUI();

  configureShaka(player);

  // Attach player and ui to the window to make it easy to access in the JS console.
  window.player = player;
  window.ui = ui;

  // Listen for error events.
  player.addEventListener('error', onPlayerErrorEvent);

  // initAds(player, video);
}

function onPlayerErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(errorEvent.detail);
}

export async function play(asset) {
  const { license } = asset;

  const support = await shaka.Player.probeSupport()

  if (license) {
    await configureDrm(support, license);
  }

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    await player.load(asset.getManifestUri(support));
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  } catch (e) {
    // onError is executed if the asynchronous load fails.
    onPlayerError(e);
  }
}
