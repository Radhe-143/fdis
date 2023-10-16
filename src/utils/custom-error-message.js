/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n'
import moment from 'moment'

export default function customizeErrorMessage() {
  return (errors) => {
    errors.map((err) => {
      switch (err.type) {
        case 'string.min':
          err.message = i18n.__('paramsError.stringMin', err.context.key, err.context.limit);
          break;
        case 'string.max':
          err.message = i18n.__('paramsError.stringMax', err.context.key, err.context.limit);
          break;
        case 'number.base':
          err.message = i18n.__('paramsError.number', err.context.key);
          break;
        case 'number.min':
          err.message = i18n.__('paramsError.numberMin', err.context.key, err.context.limit);
          break;
        case 'number.max':
          err.message = i18n.__('paramsError.numberMax', err.context.key, err.context.limit);
          break;
        case 'any.empty':
          err.message = i18n.__('paramsError.anyEmpty', err.context.key);
          break;
        case 'any.required':
          err.message = i18n.__('paramsError.anyRequired', err.context.key);
          break;
        case 'string.regex.base':
          err.message = i18n.__('paramsError.stringRegexBase', err.context.key);
          break;
        case 'array.includesRequiredUnknowns':
          err.message = `${err.context.unknownMisses}*MIN_LENGTH_ARRAY_VALIDATE`;
          break;
        case 'array.min':
          err.message = i18n.__('paramsError.arrayMin', err.context.key, err.context.limit);
          break;
        case 'array.unique':
          err.message = i18n.__('paramsError.arrayUnique', err.context.lable);
          break;
        case 'array.includesOne':
          err.message = 'ITEM_NOT_IN_ARRAY';
          break;
        case 'date.min':
          err.message = i18n.__('paramsError.numberMin', i18n.__(`common.${err.context.key}`), moment(err.context.limit).format('MM/DD/YYYY H mm A').toString());
          break;
        case 'date.max':
          err.message = i18n.__('paramsError.numberMax', i18n.__(`common.${err.context.key}`), moment(err.context.limit).format('MM/DD/YYYY H mm A').toString());
          break;
        case 'object.missing':
          err.message = 'VALIDATION_REQUIRED_ERROR';
          break;
        default:
          break;
      }
      return err;
    });
    return errors
  }
}
