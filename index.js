const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto');
const {
  validateToken,
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./validationMiddlewares');
const errorMiddleware = require('./errorMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await fs.readFile('./talker.json');
  const talkers = await JSON.parse(data);
  if (talkers.length < 1) return res.status(200).json([]);
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFile('./talker.json');
  const talkers = await JSON.parse(data);
  const talker = talkers.find((t) => t.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  req.token = token;
  res.status(200).json({ token });
});

app.use(validateToken);

app.use(validateName);
app.use(validateAge);
app.use(validateTalk);
app.use(validateWatchedAt);
app.use(validateRate);

app.post('/talker', async (req, res) => {
  const { name, age, talk } = req.body;
  
  const data = await fs.readFile('./talker.json');
  const talkers = await JSON.parse(data);
  const talker = { id: talkers.length + 1, name, age, talk };
  talkers.push(talker);
  fs.writeFile('./talker.json', JSON.stringify(talkers, null, '\t'));
  return res.status(201).json(talker);
});

app.put('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const data = await fs.readFile('./talker.json');
  const talkers = await JSON.parse(data);
  let talker = {};
  const newTalkers = talkers.map((t) => {
    if (Number(id) === t.id) {
      talker = { id: t.id, name, age, talk };
      return { id: t.id, name, age, talk };
    }
    return t;
  });

  fs.writeFile('./talker.json', JSON.stringify(newTalkers, null, '\t'));
  return res.status(200).json(talker);
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
