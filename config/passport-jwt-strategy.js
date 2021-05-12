const passport = require('passport');

//--------------------- JWT (JSON Web Token is of format xxxx.yyyy.zzzz | Header.Payload.Signature) -----------------------//

const JWTStrategy = require('passport-jwt').Strategy;
// also we will import a module which will help us extract the JWT from the header
const ExtratJWT = require('passport-jwt').ExtractJwt;

// ----------- we are setting up the user authentication so we need user model ------------------------------- //
const User = require('../models/user');

// options is an object literal containing options to control how the token is extracted from the request or verified. //

const options = {
    jwtFromRequest : ExtratJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codemate',
}

passport.use(new JWTStrategy(options, function(jwtPayload, done) {
    // jwtPayLoad is containing user infomation in encrypted form
    // we will find that user in database
    User.findById(jwtPayload._id, function(err, user) {

        if(err) { console.log(`Error finding user from JWT - ${err}`); return; }

        if(user){
            return done(null, user);
        }

        else{
            return done(null, false);
        }

    });
    
}));

module.exports = passport;