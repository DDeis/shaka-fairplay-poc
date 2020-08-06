/**
 * CustomData
 * Device :
 *    deviceId
 *    deviceName
 *    deviceType
 *
 * Transaction VOD:
 *    EntitlementId
 *
 * Content/channel Gui ID:
 *    contentGuiId
 *
 * Compte Client :
 *    accountId
 *    tokenSSO
 *    tokentype (castoken, castokenmobile ou nctoken dans le cas d'un compte NC)
 *
 * Type de flux:
 *    type=LIVEOTT / VOD
 */
export class License {
  constructor(args) {
    // this.description = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36';
    this.deviceId = 'byPassARTHIUS';
    this.deviceName = 'Chrome-84.0.4147.105---';
    this.deviceType = 'PC';

    // this.osName = 'Mac OS';
    // this.osVersion = '10.15.0';
    // this.persistent = false;
    // this.resolution = '3840x1600';

    this.accountId = '1-Z28KNOK';
    this.tokenSSO = 'Px11yRb9EonFroMKxGFJBdUqRcKrIfc7SciKHVkhS4/4hBVUwIOkoL7TVIahU7EtiTMJYRexsuYySNLfyiCAtju5PUEpExIlrRJZhvyW18nMkPpKCTDoqc8DvEWH60rldsc3hXa7poMt980DaJQp/dw==';
    this.tokenType = 'castoken';

    Object.assign(this, args)
  }

  toCustomData(additionalProps) {
    const props = Object.assign({}, this, additionalProps)

    return Object.entries(props)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }
}

export class VodLicense extends License {
  constructor(args) {
    super(args);

    this.type = 'VOD';
  }
}

export class LiveLicense extends License {
  constructor(args) {
    super(args);

    this.type = 'LIVEOTT';
  }
}
