const express = require('express');
const app = express();
const cors = require('cors');

const {
  getAllUsers,
  addNewUsers,
  deposit,
  credit,
  withdraw,
  getOneUser,
  transfer,
} = require('./utils');
app.use(express.json());
app.use(cors());

app.get('/users/', (req, res) => {
  try {
    res.status(200).send(getAllUsers());
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get('/users/:id', (req, res) => {
  try {
    res.status(200).send(getOneUser(req.params.id));
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
app.put('/users/withdraw/:id/:money', (req, res) => {
  try {
    res.status(200).send(withdraw(req.params.id, req.params.money));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put('/users/transfer/:id/:reciver/:money', (req, res) => {
  try {
    res
      .status(200)
      .send(transfer(req.params.id, req.params.reciver, req.params.money));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// move to routes all the app.method 
// functions to controllers
// paths is to long use router / app .use(path, route);
