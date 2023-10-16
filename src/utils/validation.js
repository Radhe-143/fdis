import config from '../configs'


const isEmail = (email) => {
  return config.regex.email.test(email)
}

// Export
export default {
  isEmail
}
