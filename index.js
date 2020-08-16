var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var logger = require('morgan');
var mainRouter = require('./routes/main');
let usuario = require('./models/usuario');
var cors = require('cors');
var app = express();
const config = require('./models/config');
var pgSession = require('connect-pg-simple')(session)
var pool = require('./models/pool').getPool()

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(cors({
  // 'allowedHeaders': ['Content-Type','Access-Control-Allow-Origin'],
   origin: true,
//    origin: [
//   'capacitor://localhost',
//   'ionic://localhost',
//   'http://localhost',
//   'http://localhost:8080',
//   'http://localhost:8100'
// ],
   methods: 'GET,POST,PUT,DELETE,OPTIONS',
  //preflightContinue: true,
  // 'optionsSuccessStatus': 205,
  credentials: true
}));

app.use(logger('dev')); //  formato_ Concise output colored by response status for development use.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.enable('trust proxy'); 

app.use(session({
store: new pgSession({ pool : pool, tableName: config.tabla_sesiones}),
secret: 'fajoq0i9420enmoviles3wki09tgd', 
name: 'random_session',
resave: true,
saveUninitialized: true,
 proxy: true,
cookie: { 
  secure: false, 
  sameSite: false,
  // httpOnly: false,
  maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
 }, 
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(require('./models/strategy'));

passport.serializeUser(function(user, done){
    done(null, {id_usuario: user.id_usuario})
})

passport.deserializeUser(function(serializedUser,done){ 
    usuario.getUserById(serializedUser.id_usuario).then((user) => {
        done(null, user);
    })
})

app.use('/', mainRouter);


module.exports = app;