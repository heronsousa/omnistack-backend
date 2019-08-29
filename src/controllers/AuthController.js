const User = require('../models/UserModel');

module.exports = {
    async index(req, res){
        try{
            const user = await User.create(req.body);
            return res.send({ user });
        } catch(err) {
            return res.status(400).send({ error: 'Registro de usuário falhou!' })
        }
    }
}