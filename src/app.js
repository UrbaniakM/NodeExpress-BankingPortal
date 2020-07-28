const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), { encoding: 'utf-8' });
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), { encoding: 'utf-8' });

const accounts = JSON.parse(accountData);
const users = JSON.parse(userData);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_, response) => {
  response.render('index', { title: 'Account Summary', accounts })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`)
})