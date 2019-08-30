const User = require('../models/UserModel');

module.exports = {
    async index(req, res){

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
    }
}