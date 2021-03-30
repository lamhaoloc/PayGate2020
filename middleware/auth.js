const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    
    const userid = req.header('user-id');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        console.log(decoded);
        if(decoded.id==userid){
            next();
        }
        else{
            res.status(400).send("Unauthorized");
        }
    }
    catch(ex){
        res.status(400).send('Invalid token.');
    }
}

function getAuthCode(id){
    const jwtKey = config.get('jwtPrivateKey');
    const token = jwt.sign({id:id},jwtKey);
    return token;
}

const authMiddleware = {
    auth: auth,
    getAuthCode: getAuthCode
}
module.exports = authMiddleware;