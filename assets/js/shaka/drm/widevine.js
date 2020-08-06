export function configureWidevineDrm(license) {
  console.log('DRM - Configuring Widevine');

  wrappingLicenseRequest(license);
}

function wrappingLicenseRequest(license) {
  console.log('Widevine - Configuring License Wrapping');

  player.getNetworkingEngine().registerRequestFilter(licenseRequestFilter(license));
}

function licenseRequestFilter(license) {
  return (type, request) => {
    // Only add headers to license requests:
    if (type !== shaka.net.NetworkingEngine.RequestType.LICENSE) {
      return;
    }

    const customdata = license.toCustomData();

    // This is the specific header name and value the server wants:
    request.headers['customdata'] = customdata;
  };
}
