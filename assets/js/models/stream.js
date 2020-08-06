const drmSupportLookupTable = {
  WIDEVINE: 'com.widevine.alpha',
  PLAYREADY: 'com.microsoft.playready',
  FAIRPLAY: 'com.apple.fps.1_0',
}

const formatSupportLookupTable = {
  dash: 'mpd',
  hls: 'm3u8',
}


export class Stream {
  constructor(url) {
    this.url = url;
  }

  isSupported(support) {
    const isFormatSupported = support.manifest[formatSupportLookupTable[this.format]];
    const isDrmSupported = !this.drm || support.drm[drmSupportLookupTable[this.drm]];

    return isFormatSupported && isDrmSupported;
  }
}

export class DashStream extends Stream {
  constructor(url) {
    super(url);

    this.format = 'dash';
  }
}

export class HlsStream extends Stream {
  constructor(url) {
    super(url);

    this.format = 'hls';
  }
}

export class WidevineStream extends DashStream {
  constructor(url) {
    super(url);

    this.drm = 'WIDEVINE';
  }
}

export class PlayReadyStream extends DashStream {
  constructor(url) {
    super(url);

    this.drm = 'PLAYREADY';
  }
}

export class FairPlayStream extends HlsStream {
  constructor(url) {
    super(url);

    this.drm = 'FAIRPLAY';
  }
}
