
export function initUI() {
  const video = document.getElementById('video');
  const ui = video['ui'];

  configureUI(ui);

  const controls = ui.getControls();
  const player = controls.getPlayer();

  controls.addEventListener('error', onUIErrorEvent);
  controls.addEventListener('caststatuschanged', onCastStatusChanged);

  return { player, ui, controls };
}

function configureUI(ui) {
  const config = {
    addBigPlayButton: true,
    overflowMenuButtons: ['captions', 'quality', 'language', 'picture_in_picture', 'loop', 'playback_rate', 'cast'],
    controlPanelElements: ['rewind', 'play_pause', 'fast_forward', 'time_and_duration', 'spacer', 'mute', 'volume', 'overflow_menu', 'fullscreen'],
    seekBarColors: {
      base: 'rgba(255, 255, 255, 0.3)',
      buffered: 'rgba(255, 255, 255, 0.54)',
      played: 'rgb(255, 255, 255)',
      adBreaks: 'rgb(255, 204, 0)',
    }
  };

  ui.configure(config);
}

function onUIErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(errorEvent.detail);
}

function onCastStatusChanged(event) {
  const newCastStatus = event['newStatus'];
  // Handle cast status change
  console.log('The new cast status is: ' + newCastStatus);
}
