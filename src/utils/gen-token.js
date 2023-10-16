import tokenGenerator from './token-generator';
import config from '../configs';

const genTokenObject = (id, email, version) => {
  const result = {};
  result.accessToken = tokenGenerator.generate({ id, email, _v: version }, { expiresIn: config.accessTokenLifeTime });
  result.refreshToken = tokenGenerator.generate({ id, email, _v: version }, { expiresIn: config.refreshTokenLifeTime });
  return result
}

const genAdminTokenObject = (id, username, version) => {
  const result = {};
  result.accessToken = tokenGenerator.generate({ id, username, _v: version }, { expiresIn: config.accessTokenLifeTime });
  result.refreshToken = tokenGenerator.generate({ id, username, _v: version }, { expiresIn: config.refreshTokenLifeTime });
  return result
}

module.exports = {
  genTokenObject,
  genAdminTokenObject
}
