const crypto = require('crypto');
const fs = require('fs');
const decrypt = require('./decrypt');

// this is the data we reveived from the sender
const receivedData = require('./signMessage').packageOfDataToSend;

// we need the public key of the sender

// we create a hash with the algorithm defined.
// we set the hash algorithm we want to use to create a hash
const hash = crypto.createHash(receivedData.algorithm);
// import the user public key
const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8');
// we can decrypt the message
const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, receivedData.signedAndEncryptedData);

const decryptedMessageHex = decryptedMessage.toString();
// we take a hash of the originalData and compare with the decryptedMessage(Hash)

// generate a hash from the original data
const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData)); // passing the message to hash as plainText
const hashOfOriginalHex = hash.digest('hex');

if (hashOfOriginalHex === decryptedMessageHex) {
    console.log("Success! Data is not tampered with on transit");
} else {
    console.log("Data integritiy has been compromised.");
}

