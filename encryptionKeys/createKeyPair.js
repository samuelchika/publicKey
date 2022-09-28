const crypto = require('crypto');
const fs = require('fs');

// we need to generate a key pair
// we will generate a public and a private key 
// we use our function which will have an object with public and private key
// we use the fs module to write them into our folder.

function generateKeyPair() {
    // generates and object where the key is stored as privateKey and publicKey
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });

    // the above variable will create an object with the private and public key, we need to write them into a file to make it useful

    // write the public key into a file  with name id_rsa_pub.pem
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);

    // write the private key into a file with the name id_rsa_priv.pem
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
}

generateKeyPair();