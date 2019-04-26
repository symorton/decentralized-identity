var didAuth = require('@decentralized-identity/did-auth-jose');
var request = require('request');

const ionRegistrationUrl = 'https://beta.ion.microsoft.com/api/1.0/register';
const kid = '#key-1';

async function register () {
  const privKey = await didAuth.EcPrivateKey.generatePrivateKey(kid);
  const publicKeyJwk = privKey.getPublicKey();
  publicKeyJwk.defaultSignAlgorithm = 'ES256K';

  const publicKey = {
    id: publicKeyJwk.kid,
    type: 'Secp256k1VerificationKey2018',
    publicKeyJwk: publicKeyJwk
  };

  const body = {
    '@context': 'https://w3id.org/did/v1',
    publicKey: [publicKey]
  };

  const header = {
    alg: publicKeyJwk.defaultSignAlgorithm,
    kid: publicKeyJwk.kid,
    operation:'create',
    proofOfWork:'{}'
  };

  const cryptoFactory = new didAuth.CryptoFactory([new didAuth.Secp256k1CryptoSuite()]);

  const jwsToken = new didAuth.JwsToken(body, cryptoFactory);
  const signedBody = await jwsToken.signAsFlattenedJson(privKey, {header});
  const signedBodyString = JSON.stringify(signedBody);
  console.log(signedBodyString);

  request.post(ionRegistrationUrl, {
    json: signedBody
  }, (error, res, body) => {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }
    console.log('Response:');
    console.log(body);
    console.log(`Register Identifier ID: ${body.id}`);
  });
}

register();