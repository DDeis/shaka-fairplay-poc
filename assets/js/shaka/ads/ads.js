export function initAds(player, video) {
  const adManager = player.getAdManager();
  // If you're using a non-UI build, this is the div you'll need to create
  // for your layout.
  const container = video.ui.getControls().getControlsContainer();
  adManager.initClientSide(container, video);

  const adsRequest = new google.ima.AdsRequest();
  // Your ad tag url should go here. We are using a sample ad tag from the
  // IMA HTML5 SDK implementation guide for this tutorial.
  adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
    'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
    'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
    'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';
  adManager.requestClientSideAds(adsRequest);
}
