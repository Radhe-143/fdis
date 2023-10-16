import bcrypt from 'bcrypt'

function authenticate(plainText) {
  return bcrypt.compareSync(plainText, this.password)
}

function hashPassword(plainText, saltRounds = 7) {
  if (!plainText) return ''
  return bcrypt.hashSync(plainText, saltRounds);
}

function genHashPassword() {
  this.password = this.hashPassword(this.password)
}

function hashInputPassword(password) {
  return hashPassword(password)
}


function comparePassword(comparePass, dbPassword) {
  return bcrypt.compareSync(comparePass, dbPassword)
}

export default {
  authenticate,
  hashPassword,
  genHashPassword,
  hashInputPassword,
  comparePassword
}

// new wala

// import bcrypt from 'bcrypt';

// function authenticate(plainText, hashedPassword) {
//   return bcrypt.compareSync(plainText, hashedPassword);
// }

// function hashPassword(plainText, saltRounds = 7) {
//   if (!plainText) return '';
//   return bcrypt.hashSync(plainText, saltRounds);
// }

// function genHashPassword(password) {
//   return hashPassword(password);
// }

// function hashInputPassword(password) {
//   return hashPassword(password);
// }

// function comparePassword(comparePass, dbPassword) {
//   return bcrypt.compareSync(comparePass, dbPassword);
// }

// export default {
//   authenticate,
//   hashPassword,
//   genHashPassword,
//   hashInputPassword,
//   comparePassword,
// };

