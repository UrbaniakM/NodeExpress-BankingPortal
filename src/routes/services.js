const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (_, response) => {
  response.render('transfer')
});
router.post('/transfer', (request, response) => {
  const parsedAmount = Number.parseInt(request.body.amount);
  accounts[request.body.from].balance -= parsedAmount;
  accounts[request.body.to].balance += parsedAmount;

  writeJSON();
  
  response.render('transfer', { message: 'Transfer Completed' })
});

router.get('/payment', (_, response) => {
  response.render('payment', { account: accounts.credit });
});
router.post('/payment', (request, response)  => {
  const parsedAmount = Number.parseInt(request.body.amount);
  accounts.credit.balance -= parsedAmount
  accounts.credit.available += parsedAmount

  writeJSON();

  response.render('payment', { message: 'Payment Successful', account: accounts.credit })
});

module.exports = router;