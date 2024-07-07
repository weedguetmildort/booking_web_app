const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// const db = createConnection({
//     host:'localhost',
//     user: 'root',
//     password: '',
//     database: ''
// });

app.listen(port, () => {
    console.log('server listening on port ' + port);
});

app.get('/', (req, res) => {
    res.send('GET request to the homepage');
});