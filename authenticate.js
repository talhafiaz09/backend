var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.model');
var {JWTKey} = require('./configuration');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var JWT = require('jsonwebtoken');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
exports.getToken = function(user){
    return JWT.sign(user,JWTKey,{expiresIn:'365d'});   
};  
var options = {};   
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWTKey;
exports.jwtPassport = passport.use(
    new JWTStrategy(options,(jwt_payload,done)=>{
        console.log("JWT payload: ",jwt_payload);
        User.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err){
                return done(err,false);
            }
            else if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
    })
);
exports.verifyUser = passport.authenticate('jwt',{session:false});