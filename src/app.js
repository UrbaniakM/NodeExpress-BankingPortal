const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_, response) => {
  response.render('index', { title: 'Account Summary', accounts })
});

app.use('/account', accountRoutes);

app.get('/profile', (_, response) => {
  response.render('profile', { user: users[0] })
});

app.use('/services', servicesRoutes);

app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`)
})