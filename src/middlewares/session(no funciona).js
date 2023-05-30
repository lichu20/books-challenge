/*const db = require('../database/models');

async function usuario (req, res, next) {
    let user = false 
    if (req.cookies && req.cookies.user) {
        req.session.user = await db.User.findOne({
            where:{email: req.cookies.user}
        })

        req.session.userLogged = req.session.user
    }
    if(req.session && req.session.user){
        user = req.session.user
    }
    res.locals.user = user
    
    next();
}

module.exports = usuario*/