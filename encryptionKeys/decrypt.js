const crypto = require('crypto');


// this is for data encryption
function decryptWithPrivateKey(privateKey, encryptedMessage) {
    // return the value of the decrypt message
    return crypto.privateDecrypt(privateKey, encryptedMessage);
}

// this is for identity verification
function decryptWithPublicKey(publicKey, encryptedMessage) {
    // return the value of the decrypt message
    return crypto.publicDecrypt(publicKey, encryptedMessage);
}

module.exports.decryptWithPrivateKey = decryptWithPrivateKey;
module.exports.decryptWithPublicKey = decryptWithPublicKey;