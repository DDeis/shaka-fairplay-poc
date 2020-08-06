// import { head } from "/node_modules/ramda";

export class Asset {
  constructor(args) {
    Object.assign(this, args)
  }

  getStream(support) {
    const playableStreams = this.streams.filter(stream => stream.isSupported(support))

    console.log('playableStreams', playableStreams)

    if (playableStreams.length === 0) {
      return;
    }

    return playableStreams[0]
    // return head(playableStreams);
  }

  getManifestUri(support) {
    const playableStreams = this.streams.filter(stream => stream.isSupported(support))

    if (playableStreams.length === 0) {
      console.warn('No valid stream')
      return;
    }

    const stream = playableStreams[0]

    return stream.url;
  }

}
