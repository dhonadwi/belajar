// function ndecript(dekripnya) {
//   const ciphering = "AES-128-CTR";
//   const decryption_iv = '1234567891011121';
//   const options = 0;

//   // Store the decryption key 
//   const decryption_key = "odonslank";

//   // Use openssl_decrypt() function to decrypt the data 
//   const decryption = openssl_decrypt(
//     dekripnya,
//     ciphering,
//     decryption_key,
//     options,
//     decryption_iv
//   );
//   return decryption;
// };

function ndecript(encrypted_json_string) {

  // var obj_json = JSON.parse(encrypted_json_string);
  var obj_json = JSON.parse(encrypted_json_string);

  var encrypted = obj_json.ciphertext;
  var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
  var iv = CryptoJS.enc.Hex.parse(obj_json.iv);

  var key = CryptoJS.PBKDF2('odonslank', salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });


  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });

  return decrypted.toString(CryptoJS.enc.Utf8);
}



export { ndecript };