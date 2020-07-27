const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_, response) => {
  response.render('index', { title: 'Index' })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`)
})