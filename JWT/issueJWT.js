const base64url = require('base64url'); // creates a url accepted encoded signature
const crypto = require('crypto');
const fs = require('fs');

// we need a signature function and define the algorithm we are going to use to sign it
// not the algorithm should match the one defined in the header.
// in our headerObj we have alg as RS256


// function to verify our signed key
const verifyFunction = crypto.createVerify('RSA-SHA256');


const headerObj = {
    "alg": "RS256",
    "typ": "JWT"
  }

const payloadObj = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1516239022
}

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);
// 1. Encode the data to base64Url to make it acceptable
// *** Encoding our data
const base64UrlHeader = base64url(headerObjString)
const base64UrlPayload = base64url(payloadObjString);

// first we need to create some hash using the base64url
// next we have to sign it using our public key.
//console.log(base64UrlHeader);
//console.log(base64UrlPayload);

// use our signature funtion to sign our base64url encoded header and payload
// in the write, we are passing in the information which we want to sign
// note that this information can be gotten back by doing the reverse of base64.

// 2. set up our signin
// we can now create a signature function
const signatureFunction = crypto.createSign('RSA-SHA256');
// *** hashing is done here (hasing the header and the payload)
signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload);
signatureFunction.end();


// 3. Sign using our PrivateKey
// *** both hashing and signing are done using the sign method.
const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf-8');
// the signatureFunction.sign will encrypt our payload and header which was passing in in the write function
// *** signing is done here
const signatureBase64 = signatureFunction.sign(PRIV_KEY, 'base64');
const signatureBase64Url = base64url.fromBase64(signatureBase64);
// console.log(signatureBase64Url);



// const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ';

const JWT = base64UrlHeader + '.' + base64UrlPayload + '.' + signatureBase64Url;
// Get our data back. 
const jwtparts = JWT.split('.');
console.log(jwtparts)

const headerInBase64UrlFormat = jwtparts[0];
const payloadInBase64UrlFormat = jwtparts[1];
const signatureInBase64UrlFormat = jwtparts[2];


// we have to verify the payload
verifyFunction.write(headerInBase64UrlFormat + '.' + payloadInBase64UrlFormat);
verifyFunction.end();

const jwtSignatureBased64 = base64url.toBase64(signatureInBase64UrlFormat);

const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf-8');

const signatureIsValid = verifyFunction.verify(PUB_KEY, jwtSignatureBased64, 'base64');

console.log(signatureIsValid)
