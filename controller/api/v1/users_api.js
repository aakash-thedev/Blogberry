const User = require('../../../models/user');
// jwt is library we installed to encrypt the secretKey
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res) {

    // when we will get email and password from user
    // we will generate the JWT 
    try{
        let user = await User.findOne({email : req.body.email});

        if(!user){
            return res.json(422, {
                message: "User Not Found"
            });
        }

        if(user.password != req.body.password){
            return res.json(422, {
                message: "password not matched"
            });
        }

        return res.json(200, {
            message: "Logged in successfully | Here's your token",
            data: {
                token : jwt.sign(user.toJSON(), 'codemate', {expiresIn: '1000000'})
            }
        });
    }
    catch(err) {
        console.log('***********error- ',err);
        return res.json(500, {
            message : "Internal Server Error"
        });
    }
}