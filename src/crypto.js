import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_CRYPTO_SECRET;

export const encryptData = (data) => {
	const ciphertext = CryptoJS.AES.encrypt(
		JSON.stringify(data),
		SECRET_KEY
	).toString();

	return ciphertext;
};

export const decryptData = (ciphertext) => {
	try {
		const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
		const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		return decryptedData;
	} catch {
		return null;
	}
};
