import _ from 'lodash'
import fs from 'fs'
import moment from 'moment'

const isEmptyQueryStringConstant = ['undefined', 'null', '', undefined, null, '\'\'', '""']
/**
 * Return start of month of give date
 *
 * @param {String} date
 */
const startOfMonth = (date) => {
  if (!date) {
    return new Date(moment().startOf('m').toISOString())
  } else {
    return new Date(moment(date).startOf('m').toISOString())
  }
}

/**
 * Check folder is existed or not
 * If not exists, create new
 *
 * @param {String} path
 */
const checkFileExists = (path, fileName) => {
  const folderExists = fs.existsSync(path)
  if (!folderExists) {
    fs.mkdirSync(path)
  }

  return fs.existsSync(`${path}/${fileName}`)
}

/**
 * Get string index from array of object id
 *
 * @param  {Array}  array
 * @param  {String} id
 */
const getIndexFromArrayObjectId = (array = [], id = '') => {
  let index = -1

  // Cast to string
  id = id.toString()

  // Loop
  for (const i in array) {
    if (array[i] && array[i].toString() === id) {
      index = i
      break
    }
  }

  return index
}

/**
 * get day to yyyy-mm-dd
 */
const getDate = () => {
  const date = new Date(moment());
  const year = date.getFullYear();
  const month = +date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`
}

const getHour = () => {
  const date = new Date(moment());
  return date.getHours();
}

const getTime = () => {
  const date = new Date(moment());
  return date.getTime();
}

const empty = (value) => {
  return (
    typeof value === 'undefined' ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.length === 0)
  );
}

const getArrayIdFromArrayObject = (array = [], field = '_id') => {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < array.length; i++) {
    const element = array[i][field];
    data.push(element);
  }
  return data;
}


const clearEmptyOrNullQueryString = (qr = {}) => {
  const rs = {}
  _.forIn(qr, (value, key) => {
    if (!isEmptyQueryStringConstant.includes(value)) {
      rs[key] = value
    }
  });
  return rs
}

export default {
  startOfMonth,
  checkFileExists,
  getIndexFromArrayObjectId,
  getDate,
  getHour,
  getTime,
  empty,
  getArrayIdFromArrayObject,
  clearEmptyOrNullQueryString
}
