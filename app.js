var  express = require('express');
var  app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var Opportunity = require('./models/opportunity');
var Comment = require('./models/comment');
var seedDB = require('./seeds');

var commentRoutes = require('./routes/comments');
var opportunityRoutes = require('./routes/opportunities');
var authRoutes = require('./routes/auth');


mongoose.connect('mongodb://localhost:27017/abroad_connect');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

//Passport Config
app.use(require('express-session')({
    secret:'This is Danielle Boyles application',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
res.locals.currentUser = req.user;
next();
});

// REQUIRING ROUTES
app.use('/opportunities', opportunityRoutes);
app.use('/opportunities/:id/comments',commentRoutes);
app.use('/',authRoutes);


const port = process.env.PORT || 3000
app.listen(port, process.env.IP, function() {
console.log('server is listening on port: ' + port)
module.exports = app
});