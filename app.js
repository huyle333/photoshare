var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var multer = require('multer');
var uuid = require('node-uuid');

var initPassport = require('./config/passport.js');
initPassport(passport);

var routes = require('./routes/index')(passport);
var user = require('./routes/user')(passport);
var album = require('./routes/album')(passport);
var picture = require('./routes/pictures')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({ secret: "test123test123test123",
                          resave: true,
                          saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(multer({ dest: './uploads/',
    rename: uuid.v4(),
onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting...');
},
onFileUploadComplete: function(file) {
    console.log(file.fieldname + ' uploaded to ' + file.path);
    done = true;
}
}));

app.use(flash());

app.use('/', routes);
app.use('/user', user);
app.use('/album', album);
app.use('/pic', picture);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
