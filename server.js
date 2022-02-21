const express = require('express');
const path = require('path');
const app = express();
const favicon = require('serve-favicon')
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('app'));

app.use(favicon(path.join(__dirname,'app','rocket.png')));

app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname+'app'));
});

app.listen(port, () => {
    console.log("Server is running on port: ", port);
});