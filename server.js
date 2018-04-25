const express = require('express');
const userRouter = require('./routes/user.router');
const vitalsignRouter = require('./routes/vitalsign.router');
const tipRouter = require('./routes/tip.router');
const symptomRouter = require('./routes/symptom.router');
const diseaseRouter = require('./routes/disease.router');
const gameRouter = require('./routes/game.router');

const bodyParser = require('body-parser');

const session = require('express-session');
const expressValidator = require('express-validator');

const flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const cookieParser = require('cookie-parser');
const path = require('path')


// ********************************* todo: passport!!! ****************************************************************************/

const mongoose = require('mongoose');


const env = process.env.DEPLOY || "dev";
const conf=require('./config/'+env+".json"); 

let port = "";
let dburl = "";

let serverDescription = ""; 
if(process.env.heroku_deploy_mark){
    dburl = process.env["dburl"];
    port = process.env.PORT;
    console.log("use heroku env for dburl");
    serverDescription = "heroku production"
}else{
    console.log("use cred.json ")
    const cred = require('./config/cred.json');
    port = conf.port || 8081;
    /** if running local in school, cannot use mlab, have to use local mongodb */
    dburl = cred.dburl;  /**  !!! dburl2 - local, where mlab is banned (Centennial College) */
    serverDescription = "local dev";
}
const app = express(); 

mongoose.Promise = global.Promise;
let dbDescription = (dburl.startsWith("mongodb://localhost:")) ? "local db" : "mlab";
mongoose.connect(dburl).then(()=>{
    console.log('[OK] MongoDB is connected to ' + dbDescription );
}).catch((err)=>{
    console.log('[err] MongoDB failed to connect to ' + dbDescription + "; due to: " + err)
});

// app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Express Validator, after bodyparser
app.use(expressValidator());

app.use(cookieParser());
// express session
app.use(session({ secret:'secret4lab3', saveUninitialized: false, resave:false }));

// static 
app.use(express.static(path.join(__dirname, 'dist')));

// passport init
app.use(passport.initialize());
app.use(passport.session());


// connect flash
app.use(flash());

// global vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



// set headers so that client have accesses to api

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get("/", (req, res)=>{
    if(process.env.heroku_deploy_mark){
        var _path = path.join(__dirname + 'index.html'); /** this is to use static page, which is Anguar 4 build */
        console.log({"root":"heroku mode"});
        res.sendFile(_path)
    }else{
        console.log({"root":"local mode"});
        res.json({"root":"local mode"})
    }
})

app.use("/api/user", userRouter); /** userRouter */
app.use("/api/vitalsign", vitalsignRouter); /** vitalsignRouter */
app.use("/api/tip", tipRouter); /** tipRouter */
app.use("/api/symptom", symptomRouter); /** symptonRouter */
app.use("/api/disease", diseaseRouter); /** diseaseRouter */
app.use("/api/game", gameRouter); /** gameRouter */


app.listen(port, ()=>{
    console.log ("App is running at: " + port + "; db: " + dbDescription + "; server: " + serverDescription);
});