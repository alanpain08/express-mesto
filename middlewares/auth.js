const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization); // извлечение токена
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret'); // верификация токена
  } catch (err) {
    return handleAuthError(err);
  }

  req.user = payload; // запись пейлоуда в объект запроса

  next();
};
