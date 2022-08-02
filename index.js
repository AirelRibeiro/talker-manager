const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto');
const {
  validatePersonalInfors,
  validateToken,
  validadeName,
  validateAge,
  validateTalk,
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

app.post('/login', validatePersonalInfors, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  req.token = token;
  res.status(200).json({ token });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
