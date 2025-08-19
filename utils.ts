import nacl, { secretbox, box, randomBytes } from 'tweetnacl';
import {
  decode as decodeUTF8,
  encode as encodeUTF8,
} from "@stablelib/utf8";
import {
  decode as decodeBase64,
  encode as encodeBase64,
} from "@stablelib/base64";

const newNonce = () => randomBytes(box.nonceLength);
export const generateKeyPair = () => box.keyPair();
export const generateKey = () => encodeBase64(randomBytes(secretbox.keyLength));

export const encryptSecretKey = (json:any, key:string) => {
  const keyUint8Array = decodeBase64(key);

  const nonce = newNonce();
  const messageUint8 = encodeUTF8(JSON.stringify(json));
  const box = secretbox(messageUint8, nonce, keyUint8Array);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

export const decryptSecretKey = (messageWithNonce:string, key:string) => {
  const keyUint8Array = decodeBase64(key);
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    secretbox.nonceLength,
    messageWithNonce.length
  );

  const decrypted = secretbox.open(message, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error("Could not decrypt message");
  }

  const base64DecryptedMessage = decodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};

export const encrypt = (
  secretOrSharedKey: Uint8Array,
  json: any,
  key?: Uint8Array
) => {
  const nonce = newNonce();
  const messageUint8 = encodeUTF8(JSON.stringify(json));
  const encrypted = key
    ? box(messageUint8, nonce, key, secretOrSharedKey)
    : box.after(messageUint8, nonce, secretOrSharedKey);

  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

export const decrypt = (
  secretOrSharedKey: Uint8Array,
  messageWithNonce: string,
  key?: Uint8Array
) => {
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    box.nonceLength,
    messageWithNonce.length
  );

  const decrypted = key
    ? box.open(message, nonce, key, secretOrSharedKey)
    : box.open.after(message, nonce, secretOrSharedKey);

  if (!decrypted) {
    throw new Error('Could not decrypt message');
  }

  const base64DecryptedMessage = decodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};



export const encryptBinary = (secretOrSharedKey:any, binaryData:any, key:any) => {
  const nonce = newNonce();
  const encrypted = key
    ? nacl.box(binaryData, nonce, key, secretOrSharedKey)
    : nacl.box.after(binaryData, nonce, secretOrSharedKey);

  // Combine nonce and encrypted message
  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);

  // Encode to base64 for easier storage and transfer
  return encodeBase64(fullMessage);
};
export const decryptBinary = (secretOrSharedKey:any, encryptedMessage:any, key:any) => {
  const messageWithNonceAsUint8Array = decodeBase64(encryptedMessage);
  const nonce = messageWithNonceAsUint8Array.slice(0, nacl.box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(nacl.box.nonceLength);

  const decrypted = key
    ? nacl.box.open(message, nonce, key, secretOrSharedKey)
    : nacl.box.open.after(message, nonce, secretOrSharedKey);

  if (!decrypted) {
    throw new Error("Could not decrypt binary data");
  }

  return decrypted; // Return decrypted binary data
};
