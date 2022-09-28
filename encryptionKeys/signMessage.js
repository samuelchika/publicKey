const crypto = require('crypto');

const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');
const { send } = require('process');

const myData = {
    firstname: "Samuel",
    lastname: "Chika",
    socialSecurityNum: 'We dont do that here' 
};

// we need to compress the data into a hash
// this is because the data is big
// to store to hash, we make use of the SHA256
const hash = crypto.createHash('sha256');
// the above algorithm helps us to create has
// lets convert our json text to string
const myDataString = JSON.stringify(myData);

// set the value of the hash object
hash.update(myDataString) // this take only strings and not json
// Hash data in hexadecimal format
const hashedData = hash.digest('hex');

// we now have to sign the hashed message using our private key.
const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf-8');

const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);
// we not actually signing the whole object - myData, we are basically signing the hashed value.

/**
 * A signedMessage, is a message encrypted with the private key of the sender.
 * The message is just encrypted and sent, the signature on it is that the only way to verify its true identity is to use its public key to dencrypt it.
 * 
 * we now encrypt the hash of a message
 * we encrypt the hash to retain the authenticity of the device
 * the hash if exposed, can be replaced which makes the information integrity doubtable.
 * send the hash and the original message to our client
 * the client uses our public key to dencrypt the hash.
 * use our sent algorithm to rehash the original value
 * compare the newly generated hash with the decrypted hash
 * if it matches, we can continue.
 * The file is authentic
 */

// Happy Days, we have signed the hashed information.
// we are sending the use some bits of information unless they can't verify if 
// - The data was modified
// - if the data was actually signed.

// the recevier will need things like:
// - Which hash function we used (Header)
// - The original data (Payload)
// - The hashed value generated (signedMessage)

const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: myData,
    signedAndEncryptedData: signedMessage
}

module.exports.packageOfDataToSend = packageOfDataToSend;