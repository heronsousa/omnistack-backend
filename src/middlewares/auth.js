const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.js');

module.exports = (req, res, next) => {
    const authHeader = req.headear.authorization;

    if(!authHeader)
        return res.status(401),send({ error: "Nenhum token encontrado" });

    const parts = authHeader.splut(' ');

    if(!parts.length === 2)
        return res.status(401),send({ error: "Token invalido" });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401),send({ error: "Token invalido" });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401),send({ error: "Token invalido" });

        req.userId = decoded.id;
        return next();
    });
}