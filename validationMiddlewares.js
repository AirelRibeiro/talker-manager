// Proposta de validação encontrada no https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript

function isValidDate(date) {
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) return false;

    const parts = date.split("/");
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);
    const monthForDay = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthForDay[1] = 29;
    };
    if(year < 1000 || year > 3000 || month === 0 || month > 12) return false;
    return day > 0 && day <= monthForDay[month - 1];
};

function validatePersonalInfors(req, res, next) {
  const { email, password } = req.body;
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const error = { status: 400 }
  if(!email) {
    error.message = 'O campo "email" é obrigatório';
    return next(error);
  }
  if(!reg.test(email)) {
    error.message = 'O "email" deve ter o formato "email@email.com"';
    return next(error);
  }
  if(!password) {
    error.message = 'O campo "password" é obrigatório';
    return next(error);
  }
  if(password.length < 6) {
    error.message = 'O "password" deve ter pelo menos 6 caracteres';
    return next(error);
  }
  next();
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const error = {
        status: 401,
        message: 'Token inválido!'
      }
    if (!authorization) {
      error.message = 'Token não encontrado';
      return next(error);
    }
    if(authorization.length < 16) return next(error);
    next(); 
}

function validadeName(req, res, next) {
  const { name } = req.body;
  const error = { status: 400 };
  if (!name) {
    error.message = 'O campo "name" é obrigatório';
    return next(error);
  }
  if(name.length < 3) {
    error.message = 'O campo "name" deve ter pelo menos 3 caracteres';
    return next(error);
  }
  req.talkeForAdd = { name };
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  const error = { status: 400 };
  if (!age) {
    error.message = 'O campo "age" é obrigatório';
    return next(error);
  }
  if(age < 18) {
    error.message = 'A pessoa palestrante deve ser maior de idade';
    return next(error);
  }
  req.talkerForAdd = {...req.talkerForAdd, age};
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  const error = { status: 400, message: 'O campo "talk" é obrigatório' };
  
  if(!talk) return next(error);
  
  const { watchedAt, rate } = talk;
  
  if(!watchedAt) {
    error.message = 'O campo "watchedAt" é obrigatório';
    return next(error);
  }
  if(!isValidDate(watchedAt)) {
    error.message = 'O campo "watchedAt"  deve ter o formato "dd/mm/aaaa"';
    return next(error);
  }
  if(!rate) {
    error.message = 'O campo "rate" é obrigatório';
    return next(error);
  }
  if(rate < 1 || rate > 5) {
    error.message = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return next(error);
  }
  req.talkerForAdd = {...req.talkerForAdd, talk};
  next();
}


module.exports = {
  validatePersonalInfors,
  validateToken,
  validadeName,
  validateAge,
  validateTalk,
}
