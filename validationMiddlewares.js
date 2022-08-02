const isValidDate = require('./dateValidation');

function validateEmail(req, res, next) {
  const { email } = req.body;
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const error = { status: 400 };
  if (!email) {
    error.message = 'O campo "email" é obrigatório';
    return next(error);
  }
  if (!reg.test(email)) {
    error.message = 'O "email" deve ter o formato "email@email.com"';
    return next(error);
  }
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  const error = { status: 400 };
  if (!password) {
    error.message = 'O campo "password" é obrigatório';
    return next(error);
  }
  if (password.length < 6) {
    error.message = 'O "password" deve ter pelo menos 6 caracteres';
    return next(error);
  }
  next();
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const error = {
        status: 401,
        message: 'Token inválido',
      };
    if (!authorization) {
      error.message = 'Token não encontrado';
      return next(error);
    }
    if (authorization.length !== 16) return next(error);
    next(); 
}

function validateName(req, res, next) {
  const { name } = req.body;
  const error = { status: 400 };
  if (!name) {
    error.message = 'O campo "name" é obrigatório';
    return next(error);
  }
  if (name.length < 3) {
    error.message = 'O "name" deve ter pelo menos 3 caracteres';
    return next(error);
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  const error = { status: 400 };
  if (!age) {
    error.message = 'O campo "age" é obrigatório';
    return next(error);
  }
  if (Number(age) < 18) {
    error.message = 'A pessoa palestrante deve ser maior de idade';
    return next(error);
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  const error = { status: 400, message: 'O campo "talk" é obrigatório' };
  if (!talk) return next(error);
  next();
}

function validateWatchedAt(req, res, next) {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const error = { status: 400 };
  
  if (!watchedAt) {
    error.message = 'O campo "watchedAt" é obrigatório';
    return next(error);
  }
  if (!isValidDate(watchedAt)) {
    error.message = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
    return next(error);
  }
  next();
}

function validateRate(req, res, next) {
  const { talk } = req.body;
  const { rate } = talk;
  const error = { status: 400 };

  if (Number(rate) < 1 || Number(rate) > 5) {
    error.message = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return next(error);
  }
  
  if (!rate) {
    error.message = 'O campo "rate" é obrigatório';
    return next(error);
  }
  next();
}

module.exports = {
  validateToken,
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};
