export function configureShaka(player) {
  player.configure({
    drm: {
      servers: {
        'com.apple.fps.1_0': 'https://ws-asgard.tv.sfr.net/rest/fairplay/v1/licence',
        'com.microsoft.playready': 'https://playready.tv.sfr.net/PlayReadyWeb/rightsmanager.asmx',
        'com.widevine.alpha': 'https://ws-backendtv.sfr.fr/asgard-drm-widevine/public/licence',
      },
      retryParameters: {
        timeout: 0,       // timeout in ms, after which we abort; 0 means never
        maxAttempts: 2,   // the maximum number of requests before we fail
        baseDelay: 1000,  // the base delay in ms between retries
        backoffFactor: 2, // the multiplicative backoff factor between retries
        fuzzFactor: 0.5,  // the fuzz factor to apply to each retry delay
      },
      // logLicenseExchange: true,
    },
    manifest: {
      retryParameters: {
        timeout: 0,       // timeout in ms, after which we abort; 0 means never
        maxAttempts: 2,   // the maximum number of requests before we fail
        baseDelay: 1000,  // the base delay in ms between retries
        backoffFactor: 2, // the multiplicative backoff factor between retries
        fuzzFactor: 0.5,  // the fuzz factor to apply to each retry delay
      },
    },
    streaming: {
      bufferingGoal: 30,  // the amount of content we try to buffer in seconds.
      rebufferingGoal: 15, // the amount of content we have to have buffered before we can play in seconds
      bufferBehind: 30,   // the amount of content we keep in buffer behind the playhead in seconds
      retryParameters: {
        timeout: 0,       // timeout in ms, after which we abort; 0 means never
        maxAttempts: 2,   // the maximum number of requests before we fail
        baseDelay: 1000,  // the base delay in ms between retries
        backoffFactor: 2, // the multiplicative backoff factor between retries
        fuzzFactor: 0.5,  // the fuzz factor to apply to each retry delay
      },
    },
  });
}
