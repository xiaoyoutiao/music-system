const OTHER = 'xiaoyoutiao_';
var crypto = require('crypto');

module.exports = (data) => {
    var md5 = crypto.createHash("md5");
    if (typeof data !== 'string') {
        throw TypeError('argument must string');
    }
    md5.update(OTHER + data);
    var result = md5.digest('hex');
    var UpperResult = result.toUpperCase(); //32位大写 
    return UpperResult;
}