const reverseString = (str) => {
  const arrayOfString = str.split('')
  const stringToArray = arrayOfString.reverse()
  return stringToArray.join('')
}

const encode5t = (str) => {
  for (let i = 0; i < 5; i += 1) {
    str = reverseString(Buffer.from(str).toString('base64'))
  }
  return str
}

const decode5t = (str) => {
  for (let i = 0; i < 5; i += 1) {
    str = Buffer.from(reverseString(str), 'base64').toString('ascii')
  }
  return str
}

const base64Encode = (str) => {
  return Buffer.from(str).toString('base64')
}

const base64Decode = (str) => {
  return Buffer.from(str, 'base64').toString('ascii')
}

const regexTime = () => {
  return /^(00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23):[0-5][0-9]$/
}

const regexDay = () => {
  return /(\d{4})-(\d{2})-(\d{2})/
}

export {
  reverseString,
  encode5t,
  decode5t,
  base64Encode,
  base64Decode,
  regexTime,
  regexDay
}
