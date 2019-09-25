/* eslint-disable */
const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(path.resolve('.')));

app.get(
  '*',
  (req, res) => res.sendFile(
    path.resolve(__dirname, '.', 'index.html')
  )
);

app.listen(
  process.env.PORT,
  // eslint-disable-next-line no-console
  () => console.log(`Example app listening on port ${process.env.PORT}!`)
);
