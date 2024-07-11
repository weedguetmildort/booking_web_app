const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

app.listen(port, function () {
    console.log('Listening on http://localhost:' + port);
});