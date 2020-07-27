const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`)
})