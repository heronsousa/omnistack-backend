const Post = require('../models/PostModel');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {

  async index(req, res) {
    res.send({ ok: true, user: req.userId });
  },


  async listUserPosts(req, res){
    try{
      const allPosts = await Post.find().sort('-createdAt');

      function filterByUser(post){
        if(post.user == req.userId)
          return true;
      }

      posts = allPosts.filter(filterByUser);

      return res.json(posts);
    } catch {
      return res.status(400).send({ error: "Erro ao listar posts" });
    }
  },


  async listPosts(req, res) {
    try{
      const posts = await Post.find().sort('-createdAt');

      return res.json(posts);
    } catch {
      return res.status(400).send({ error: "Erro ao listar posts" });
    }
  },


  async store(req, res) {
    try{
      const { author, place, description, hashtags } = req.body;
      const { filename: image } = req.file;
      const user = req.userId;
  
      const [name] = image.split('.');
      const fileName = `${name}.jpg`;
  
      await sharp(req.file.path)
        .resize(500)
        .jpeg({quality: 70})
        .toFile(
          path.resolve(req.file.destination, 'resized', fileName)
        )
  
      fs.unlinkSync(req.file.path);
  
      const post = await Post.create({
        author,
        place,
        description,
        hashtags,
        image: fileName,
        user,
      });
  
      req.io.emit('post', post);
  
      return res.json(post);
    } catch {
      return res.status(400).send({ error: "Erro ao criar post" });
    }
  },


  async editPost(req, res){
    try{

      const { author, place, description, hashtags } = req.body;
      const { filename: image } = req.file;
      const user = req.userId;
  
      const [name] = image.split('.');
      const fileName = `${name}.jpg`;
  
      await sharp(req.file.path)
        .resize(500)
        .jpeg({quality: 70})
        .toFile(
          path.resolve(req.file.destination, 'resized', fileName)
        )
  
      fs.unlinkSync(req.file.path);
  
      post = await Post.findByIdAndUpdate(
        req.params.postId,
        {author,
        place,
        description,
        hashtags,
        image: fileName},
        {new: true}
        );
  
      req.io.emit('post', post);
  
      return res.status(200).send({ post });
    } catch {
      return res.status(400).send({ error: "Erro ao editar post" });
    }
  },

  
  async deletePost(req, res){
    try{
      const posts = await Post.findByIdAndRemove(req.params.postId);

      return res.send();
    } catch {
      return res.status(400).send({ error: "Erro ao deletar post" });
    }
  },
};