module.exports = class SongHistory {
  constructor({ songName, alia, resouceUrl, albumUrl, platform, lyric }) {
    /**歌曲名 [String]*/
    this.songName = songName;
    /**歌曲别名 [String]*/
    this.alia = alia;
    /**资源地址 [String]*/
    this.resouceUrl = resouceUrl;
    /**专辑图片 [String]*/
    this.albumUrl = albumUrl;
    /** 平台名 */
    this.platform = platform;
    /** 歌词 [Array]*/
    this.lyric = lyric;
  }
  /**返回JSON格式对象 */
  getJSON() {
    let _that = this;
    let json = {};
    Object.keys(this).forEach(element => {
      if (typeof _that[element] !== "function") {
        json[element] = _that[element];
      }
    });
    return json;
  }
};
