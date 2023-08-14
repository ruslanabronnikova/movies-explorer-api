const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnAuthorized = require('../classErrors/UnAuthorized');

const authMiddleW = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnAuthorized('Неправильные почта или пароль'));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    return next(new UnAuthorized('Неправильные почта или пароль'));
  }
  return next();
};

module.exports = authMiddleW;
