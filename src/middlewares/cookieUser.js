
const { cookie } = require("express-validator");
let db = require("../database/models");

async function userMiddleware(req, res, next) {
    res.locals.isLogged = false;

    if(req.cookies.userEmail){
        let emailInCookie = req.cookies.userEmail
        let userFromCookie = await db.User.findOne({ where: { email: emailInCookie } })
        if(userFromCookie) {
            req.session.user = userFromCookie
        }
    }
    
    if (req.session.user) {
        res.locals.isLogged = true;

        res.locals.user = req.session.user
    }
    next();
}

module.exports = userMiddleware;