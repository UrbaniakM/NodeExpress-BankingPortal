const fs = require('fs');
const path = require('path');
const express = require('express');
const { response, request } = require('express');
const { parse } = require('path');

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
});
app.get('/savings', (_, response) => {
  response.render('account', { account: accounts.savings });
});
app.get('/checking', (_, response) => {
  response.render('account', { account: accounts.checking });
});
app.get('/credit', (_, response) => {
  response.render('account', { account: accounts.credit });
});
app.get('/profile', (_, response) => {
  response.render('profile', { user: users[0] })
});

app.get('/transfer', (_, response) => {
  response.render('transfer')
});
app.post('/transfer', (request, response) => {
  const parsedAmount = Number.parseInt(request.body.amount);
  accounts[request.body.from].balance -= parsedAmount;
  accounts[request.body.to].balance += parsedAmount;

  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, { encoding: 'utf-8' });
  
  response.render('transfer', { message: 'Transfer Completed' })
});

app.get('/payment', (_, response) => {
  response.render('payment', { account: accounts.credit });
});
app.post('/payment', (request, response)  => {
  const parsedAmount = Number.parseInt(request.body.amount);
  accounts.credit.balance -= parsedAmount
  accounts.credit.available += parsedAmount

  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, { encoding: 'utf-8' });

  response.render('payment', { message: 'Payment Successful', account: accounts.credit })
});

app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`)
})