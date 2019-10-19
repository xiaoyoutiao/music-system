const encode = require('./encode');
/**
 * @param {ids: [歌曲id], br: 音质}
 * 
 */
let result = encode.encode_netease_data({
  "id": "296897",
  "lv": 1
})
console.log(result);