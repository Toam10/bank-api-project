const express = require('express');
const app = express();

const { getAllUsers, addNewUsers, deposit, credit } = require('./utils');
app.use(express.json());

app.get('/users', (req, res) => {
  try {
    res.status(200).send(getAllUsers());
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post('/users', (req, res) => {
  try {
    res.status(200).send(addNewUsers(req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
app.put('/users/deposit/:id/:amount', (req, res) => {
  try {
    res.status(200).send(deposit(req.params.id, req.params.amount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put('/users/credit/:id/:creditupdate', (req, res) => {
  try {
    res.status(200).send(credit(req.params.id, req.params.creditupdate));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
