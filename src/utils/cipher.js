import crypto from 'crypto'
import config from '../configs'

function isMd5Hash(value) {
  return config.regex.password.test(value.toLowerCase())
}

const genMd5Hash = (value) => {
  return crypto.createHmac('md5', value);
}

const decryptMd5 = (value) => {
  return crypto.decryptMd5(value)
}

const encryptAES = (text, algorithm, password, inputEncoding, outputEncoding) => {
  const cipher = crypto.createCipher(algorithm, password)
  let crypted = cipher.update(text, inputEncoding, outputEncoding)
  crypted = `${crypted}${cipher.final(outputEncoding)}`
  return crypted
}

const decryptAES = (text, algorithm, password, inputEncoding, outputEncoding) => {
  const decipher = crypto.createDecipher(algorithm, password)
  let decrypted = decipher.update(text, outputEncoding, inputEncoding)
  decrypted = `${decrypted}${decipher.final(inputEncoding)}`
  return decrypted
}

const encryptAdvantageAES = (text, algorithm, password, secondPassword, inputEncoding, outputEncoding) => {
  const firstCrypted = encryptAES(text, algorithm, password, inputEncoding, outputEncoding)
  const secondCrypted = encryptAES(firstCrypted, algorithm, secondPassword, inputEncoding, outputEncoding)
  return secondCrypted
}

const decryptAdvantageAES = (text, algorithm, password, secondPassword, inputEncoding, outputEncoding) => {
  const secondDecrypted = decryptAES(text, algorithm, secondPassword, inputEncoding, outputEncoding)
  const firstDecrypted = decryptAES(secondDecrypted, algorithm, password, inputEncoding, outputEncoding)
  return firstDecrypted
}

export default {
  isMd5Hash,
  genMd5Hash,
  decryptMd5,
  encryptAdvantageAES,
  decryptAdvantageAES
}
