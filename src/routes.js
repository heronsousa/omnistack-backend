const express = require('express');
const multer = require('multer');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const AuthController = require('./controllers/AuthController');
const ProjectController = require('./controllers/ProjectController');
const UploadConfig = require('./config/Upload');
const authMiddleware = require('./middlewares/auth');

const routes = new express.Router();
const upload = multer(UploadConfig);

routes.get('/posts', PostController.index);

routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

routes.post('/register', AuthController.index);
routes.post('/auth', AuthController.auth);

routes.use(authMiddleware);
routes.get('/project', ProjectController.index);

module.exports = routes;
