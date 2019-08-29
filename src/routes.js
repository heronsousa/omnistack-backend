const express = require('express');
const multer = require('multer');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const UserController = require('./controllers/UserController');
const UploadConfig = require('./config/Upload');

const routes = new express.Router();
const upload = multer(UploadConfig);

routes.get('/posts', PostController.index);

routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

routes.post('/register', UserController.index);

module.exports = routes;
