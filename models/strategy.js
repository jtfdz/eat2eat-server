let passport = require('passport')
let localStrategy = require('passport-local').Strategy;
let usuario = require('../models/usuario')

module.exports = new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async function(username, password, done){
    try{
        const user = await usuario.getUserByUsername(username);
        if(!user){
            return done(null, false);
        }
        const isMatch = await usuario.comparePassword(password, user.password_usuario);
        if(isMatch) return done(null, user);
        else return done(null, false)
    }catch(err){
        return done(err)
    }
})