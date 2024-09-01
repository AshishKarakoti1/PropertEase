const users = require('../db');

async function isValidUser(req,res,next) {
    const {email} = req.body;
    const idx = users.findIndex(user => user.email == email);
    if(idx == -1){
        return res.json({success:false , message:"you are not a registered user"});
    } else {
        next();
    }
}

module.exports = isValidUser;