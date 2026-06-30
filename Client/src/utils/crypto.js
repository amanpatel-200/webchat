import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
export const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(
    message,
    SECRET_KEY
  ).toString();
};
export const decryptMessage = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(
    cipherText,
    SECRET_KEY
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};