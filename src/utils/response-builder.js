/* eslint-disable no-underscore-dangle */
import i18n from 'i18n'

function build(success = true, data, meta = {}) {
  let errorMessage = ''
  try {
    errorMessage = i18n.__(meta.message, meta.value)
  } catch (e) {
    errorMessage = meta.message
  }
  return {
    success,
    serverCode: meta.code ? parseInt(meta.code, 10) : undefined,
    message: errorMessage,
    data: data || undefined
  }
}
export default {
  build
}
