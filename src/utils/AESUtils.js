const CryptoJS = require('crypto-js');

//十六位十六进制数作为密钥
const key = CryptoJS.enc.Utf8.parse("b360af4a03b30d28");

//解密方法
function Decrypt(word) {
    let decrypt = CryptoJS.AES.decrypt(word, key, { mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密方法
function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

export {
    Decrypt,
    Encrypt
}
