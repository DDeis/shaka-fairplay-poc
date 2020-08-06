import { configureFairPlayDrm } from "./fairplay.js";
import { configureWidevineDrm } from "./widevine.js";
import { configurePlayReadyDrm } from "./playready.js";

export async function configureDrm(support, license) {
  if (support.drm['com.apple.fps.1_0']) {
    return await configureFairPlayDrm(license);
  }

  if (support.drm['com.widevine.alpha']) {
    return configureWidevineDrm(license);
  }

  if (support.drm['com.widevine.alpha']) {
    return configurePlayReadyDrm(license);
  }
}





