let contentId;

export async function configureFairPlayDrm(license) {
  console.log('DRM - Configuring FairPlay');

  // Server Certificate
  await configureFairPlayCertificate();

  // Content ID
  configureFairPlayContentID();

  // License Wrapping
  configureFairPlayLicenseWrapping(license);
}


async function configureFairPlayCertificate() {
  console.log('FairPlay - Fetching Certificate')

  const req = await fetch('assets/certificates/fairplay.cer');
  const cert = await req.arrayBuffer();

  player.configure('drm.advanced.com\\.apple\\.fps\\.1_0.serverCertificate',
    new Uint8Array(cert));
}

function configureFairPlayContentID() {
  console.log('FairPlay - Configuring initDataTransform')

  player.configure('drm.initDataTransform', initDataTransform);
}

function initDataTransform(initData, initDataType, drmInfo) {
    if (initDataType != 'skd') {
      return initData;
    }

    // 'initData' is a buffer containing an 'skd://' URL as a UTF-8 string.
    // const skdUri = shaka.util.StringUtils.fromBytesAutoDetect(initData);

    const cert = player.drmInfo().serverCertificate;
    contentId = shaka.util.FairPlayUtils.defaultGetContentId(initData);

    return shaka.util.FairPlayUtils.initDataTransform(initData, contentId, cert);
}

function configureFairPlayLicenseWrapping(license) {
  console.log('FairPlay - Configuring License Wrapping');

  console.log('FairPlay - Wrapping License Request');
  player.getNetworkingEngine().registerRequestFilter(licenseRequestFilter(license));

  console.log('FairPlay - Wrapping License Response');
  player.getNetworkingEngine().registerResponseFilter(licenseResponseFilter);
}


function licenseRequestFilter(license) {
  return (type, request) => {
    if (type != shaka.net.NetworkingEngine.RequestType.LICENSE) {
      return;
    }

    const customData = license.toCustomData({ contentGuiId: contentId });

    const originalPayload = new Uint8Array(request.body);
    const base64Payload = shaka.util.Uint8ArrayUtils.toStandardBase64(originalPayload); // SPC

    const json = {
      customData,
      challengeValue: base64Payload
    };
    const wrappedJson = JSON.stringify(json);

    request.headers['Content-Type'] = 'application/json';
    // Convert the JSON string back into an ArrayBuffer to replace the request body.
    request.body = shaka.util.StringUtils.toUTF8(wrappedJson);
  };
}

function licenseResponseFilter(type, response) {
    if (type != shaka.net.NetworkingEngine.RequestType.LICENSE) {
      return;
    }

    let responseText = shaka.util.StringUtils.fromUTF8(response.data);
    // Trim whitespace.
    responseText = responseText.trim();

    // Look for <ckc> wrapper and remove it.
    if (responseText.substr(0, 5) === '<ckc>' &&
      responseText.substr(-6) === '</ckc>') {
      responseText = responseText.slice(5, -6);
    }

    // Decode the base64-encoded data into the format the browser expects.
    response.data = shaka.util.Uint8ArrayUtils.fromBase64(responseText).buffer;
}

