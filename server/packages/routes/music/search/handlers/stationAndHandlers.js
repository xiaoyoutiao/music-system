const netease = require("../../../../api/netease.js");
const qq = require("../../../../api/qq");

module.exports = {
  song: { netease: netease.byKeyWord, qq: qq.byKeyWord },
  lyric: { netease: netease.getLyric, qq: qq.getLyric },
  radio: { netease: netease.getRadioUrl, qq: qq.getRadioUrl },
  hasStation ({ type, station }) {
    if (this[ type ][ station ]) {
      return true;
    } else {
      return false;
    }
  },
  getHandler ({ type = "", station = "" }) {
    if (
      !this[ type ] ||
      !this[ type ][ station ] ||
      typeof this[ type ][ station ] !== "function"
    ) {
      return false;
    } else {
      return this[ type ][ station ];
    }
  }
};

// let a = {
//     stations: {
//         netease: netease.byKeyWord,
//         qq: qq.byKeyWord
//     },
//     hasStation(station) {
//         if (this.stations[station]) {
//             return true
//         } else {
//             return false
//         }
//     },
//     getHandler(station) {
//         if (this.stations[station] && typeof this.stations[station] === 'function') {
//             return this.stations[station];
//         } else {
//             return false
//         }
//     }
// }
