const db = require('../database/models');

function session (req, res, next) {
    //cookie
    if(req.session.user && req.session.user.categoryId == 1){
        next();
    }else{
        res.redirect("/");
    }
    
}

module.exports = session