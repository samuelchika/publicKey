const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

// get our public key
const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8');

// get the private key
const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf-8');

//call the function to encrypt and pass the message
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, "This is a secrete message");

// decrypt the message using the private key
const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage)

// lets see our encrypted shit
console.log(encryptedMessage.toString());
console.log(decryptedMessage.toString());

