/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
import crypto from 'crypto'

const lowerCaseFirstLetter = (str) => {
  if (!str) {
    return ''
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}

const replaceNonNumbericCharacters = (input, replaceCharacter) => {
  return input.replace(/[^\d.-]/g, replaceCharacter)
}

const getStringBetweenCurlyBraces = (string) => {
  const stringClone = string
  const regex = /\{([^}]+)\}/
  const result = regex.exec(stringClone)
  return result ? result[0] : string
}

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const convertStringToUnderscore = (originString) => {
  const lowerString = originString.toLowerCase()
  return lowerString.split(' ').join('_')
}

/**
 * Encode Base{radix} With Custom Radix
 * radix allow 2-36
 */
function encodeBaseRadix(encodeValue, radix) {
  if (radix < 2 || radix > 36) {
    throw new Error('Radix allow 2 - 36')
  }
  const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let HexN = '';
  let Q = Math.floor(Math.abs(encodeValue))
  if (!Q) {
    throw new Error('Parameter must be a number')
  }
  let R;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    R = Q % radix;
    HexN = validChars.charAt(R) + HexN;
    Q = (Q - R) / radix;
    if (Q === 0) break;
  }
  return ((encodeValue < 0) ? `-${HexN}` : HexN);
}

/**
 * Find All Combinations
 *
 * @param {*} arg [1,2],[3,4]
 * @Return [[1,3],[1,4],[2,3],[2,4]]
 */
function cartesian(...arg) {
  if (!arg || arg.length === 0) {
    return
  }
  const r = [];
  const max = arg.length - 1;
  function helper(arr, i) {
    for (let j = 0, l = arg[i].length; j < l; j++) {
      const a = arr.slice(0); // clone arr
      a.push(arg[i][j])
      if (i === max) {
        r.push(a);
      } else {
        helper(a, i + 1);
      }
    }
  }
  helper([], 0);
  return r;
}


/**
 * Equivalent to PHP's `hash_hmac` function.
 *
 * @param  {string} algorithm  hashing algorithm
 * @param  {*}      data       data string to be hashed
 * @param  {Buffer} secret     Secret key used to hash data, generated with `pack` method
 * @return {string}            digested hash
 */
const hashHmac = function (algorithm, data, secret) {
  const hmac = crypto.createHmac(algorithm, secret);
  hmac.update(data);

  return hmac.digest('hex');
}
/*
* @param {*} data
* @param {*} encoding
* @return {Buffer} Buffer of data encoded with `encoding` method
*/
const pack = function (data, encoding = 'hex') {
  return Buffer.from(data, encoding);
}

/**
 * Convenient function to create md5 hash from string.
 *
 * @param {*} data
 * @return {string} md5 hash
 */
const createMd5Hash = function (data) {
  return crypto
    .createHash('md5')
    .update(data)
    .digest('hex');
}

/**
 * Sort Object Alphabetically
 * @param {*} o
 */
function sortObject(o) {
  const sorted = {};
  let key;
  const a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}


function changeAlias(alias) {
  if (!alias) {
    return '';
  }
  let str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|ậ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|é/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ỏ|ổ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ự/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|\$|\\|\||”|“|"|‘|’|'|`|``|\*|\¨|\•|\♪|\ღ|\♥|\♡|\►|\●|_/g, '-');
  str = str.replace(/-+-/g, '-');
  str = str.substring(0, str.length > 50 ? 50 : str.length);
  str = str.replace(/^\-+|\-+$/g, '');
  return str;
}


const sortDescTwoObjectId = function (objectId, objectId2) {
  if (objectId > objectId2) {
    return `${objectId}_${objectId2}`
  } else {
    return `${objectId2}_${objectId}`
  }
}


const stringToBoolean = (string = '') => {
  const acceptedString = [true, false, 'true', 'false', '0', '1', 0, 1, 'yes', 'no']
  if (!acceptedString.includes(string)) {
    return undefined
  }

  switch (string.toString().toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return undefined;
  }
}

export default {
  lowerCaseFirstLetter,
  replaceNonNumbericCharacters,
  isJson,
  getStringBetweenCurlyBraces,
  convertStringToUnderscore,
  encodeBaseRadix,
  cartesian,
  hashHmac,
  createMd5Hash,
  pack,
  sortObject,
  changeAlias,
  sortDescTwoObjectId,
  stringToBoolean
}
