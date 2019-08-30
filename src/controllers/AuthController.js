const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

module.exports = {
    async index (req, res) {

        const {email} = req.body;

        try{
            if(await User.findOne({ email }))
                return res.status(400).send({ error: 'Usuário já existe' });

            const user = await User.create(req.body);
            
            return res.send(user);
        } catch(err) {
            return res.status(400).send({ error: 'Registro de usuário falhou!' })
        }
    },

    async auth (req, res) {
        
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if(!user)
            return res.status(400).send({ error: 'Usuário não encontrado' });

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Senha inválida' });

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret,{
            expiresIn: 84600
        });

        res.send({ user, token });
    }
}