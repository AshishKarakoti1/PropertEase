
async function isValidUser(req,res,next) {
    const {email , user_email} = req.body;
    if(email != user_email){
        return res.json({success:false , message:"please use a valid email id"});
    } else {
        next();
    }
}

module.exports = isValidUser;