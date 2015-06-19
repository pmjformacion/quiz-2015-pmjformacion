var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinámicos   (para la gestión despues del logín)
app.use(function(req, res, next) {

    // guardar path en variable 'sesion.redir' para después de login
    if(!req.path.match(/\/login|\/logout/)) {
        req.session.redir = req.path;
    }

    // Hacer visible la variable 'req.session' en las vistas.
    // se guarda en variable local del navegador para no tener
    // que estar pasando como parámetro
    res.locals.session = req.session;
    next();
});

/*
    middleware de auto-logout en app.js que guarde en cada transacción la hora 
    del reloj del sistema en una variable de la sesión a la que está asociada. 
    El middleware debe comprobar en cada transacción con una sesión activa si 
    la han transcurrido más de 2 minutos desde la transacción anterior en dicha 
    sesión, en cuyo caso destruirá la sesión.
*/
app.use( function(req,res, next) {
    // compruebo si hay sesión iniciada
    if (req.session.user) {
        // compruebo hora ultimo acceso con hora actual y si
        // supera los dos minutos cierro la seison y mando al 
        // login
        var reloj = new Date();
        var minutos = 2;
        var prevLastTime = req.session.user.lastTime;
        req.session.user.lastTime = reloj.getTime(); // se almacena en ms
        if ( (req.session.user.lastTime - prevLastTime) >= (60000 * minutos) ) {   // mayor de 2 minutos
            // supera los dos minutos
            //res.redirect("/logout");

            delete req.session.user;

        }

    }
    next();
});


app.use('/', routes);


// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Error HTTP 500\n\nInternal server error');
    err.status = 500;
    next(err);
});




// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
