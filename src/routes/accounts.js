const express = require('express');
const { accounts } = require('../data');

const router = express.Router();

router.get('/savings', (_, response) => {
  response.render('account', { account: accounts.savings });
});
router.get('/checking', (_, response) => {
  response.render('account', { account: accounts.checking });
});
router.get('/credit', (_, response) => {
  response.render('account', { account: accounts.credit });
});

module.exports = router;