const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://heron:Part8416@cluster0-60xck.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));
// app.use(express.json());

server.listen(process.env.PORT || 3333)
