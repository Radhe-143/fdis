const randomCode = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const genCodePhone = () => {
  return randomCode(999999, 100000);
}


const genEmailVerifyCode = () => {
  return randomCode(9999, 1000);
}


module.exports = {
  randomCode,
  genCodePhone,
  genEmailVerifyCode
}
