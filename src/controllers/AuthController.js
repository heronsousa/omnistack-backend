const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports = {
    async index (req, res) {

        const {email} = req.body;

        try{
            if(await User.findOne({ email }))
                return res.status(400).send({ error: 'Usuário já existe' });

            const user = await User.create(req.body);

            user.password = undefined;
            
            return res.send(user);
        } catch(err) {
            return res.status(400).send({ error: 'Registro de usuário falhou!' })
        }
    },

    async auth (req, res) {
        const { email, password } = req.body;

        const  user = await User.findOne({ email }).select('+password');

        if(!user)
            return res.status(400).send({ error: 'Usuário não encontrado' });

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Senha inválida' });

        res.send({ user });
    }
}