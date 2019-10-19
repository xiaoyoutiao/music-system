const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const content = 'xiaoyoutiao@12345678';
// const 
const fs = require('fs');
const publicKey = fs.readFileSync('./key/public.key.pem');
const privateKey = fs.readFileSync('./key/private.key.pem');

const key = new NodeRSA({
    b: 512
});

var pubKey = new NodeRSA(publicKey);
var prikey = new NodeRSA(privateKey);

let encryptData = pubKey.encrypt(content).toString('base64')

console.log(
    `
============公钥================
${publicKey}
================================
`
);
console.log(
    `
============加密数据================
${encryptData}
================================
`
);

let decryptData = prikey.decrypt(encryptData);
console.log(decryptData.toString('utf8'));
