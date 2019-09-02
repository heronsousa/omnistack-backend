const express = require('express');
const multer = require('multer');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const AuthController = require('./controllers/AuthController');
const UploadConfig = require('./config/Upload');
const authMiddleware = require('./middlewares/AuthMiddleware');

const routes = new express.Router();
const upload = multer(UploadConfig);

routes.get('/posts', PostController.listPosts);

routes.post('/register', AuthController.index);
routes.post('/auth', AuthController.auth);

routes.use(authMiddleware);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);
routes.get('/post', PostController.index);
routes.get('/myposts', PostController.listUserPosts);
routes.put('/:postId', upload.single('image'), PostController.editPost);
routes.delete('/:postId', PostController.deletePost);

module.exports = routes;