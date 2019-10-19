var CryptoJS = require('crypto-js');
var setMaxDigits = require('./rsa/Barrett').setMaxDigits;
var RSAKeyPair = require('./rsa/Barrett').RSAKeyPair;
var encryptedString = require('./rsa/Barrett').encryptedString;

function a(a) {
  var d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    c = "";
  for (d = 0; a > d; d += 1)
    e = Math.random() * b.length,
    e = Math.floor(e),
    c += b.charAt(e);
  return c
}

function b(a, b) {
  var c = CryptoJS.enc.Utf8.parse(b),
    d = CryptoJS.enc.Utf8.parse("0102030405060708"),
    e = CryptoJS.enc.Utf8.parse(a),
    f = CryptoJS.AES.encrypt(e, c, {
      iv: d,
      mode: CryptoJS.mode.CBC
    });
  return f.toString()
}



function c(a, b, c) {
  var d, e;
  return setMaxDigits(131),
    d = new RSAKeyPair(b, "", c),
    e = encryptedString(d, a)
}


function d(d, e, f, g) {
  var h = {},
    i = a(16);
  h.encText = b(d, g);
  h.encText = b(h.encText, i);
  h.encSecKey = c(i, e, f)
  return h
}
/**
 * @param {ids: [歌曲id], br: 音质}
 * 
 */
function encode_netease_data(params) {
  return d(
    JSON.stringify(params),
    '010001',
    '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7',
    '0CoJUm6Qyw8W8jud')
}

exports.encode_netease_data = encode_netease_data;