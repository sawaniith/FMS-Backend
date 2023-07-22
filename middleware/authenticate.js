const Partner = require('../model/partnerSchema');
const jwt = require('jsonwebtoken');

const Authenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootPartner = await Partner.findOne({_id: verifyToken._id, "tokens.token":token});

        if(!rootPartner){
            throw new Error('User Not Found');
        }
        req.token = token;
        req.rootPartner = rootPartner;
        // req.partnerId = rootPartner._id;
        next();  

    } catch (err) {
        res.status(401).send('unauthorized');
        console.log(err);
    }
}

module.exports = Authenticate;