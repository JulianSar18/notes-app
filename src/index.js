const express = require('express');
const path = require('path');
const exphbs  =  require('express-handlebars');
const methodOverride = require ('method-override');
const session = require ('express-session');
const flash = require('connect-flash');
//initilizators
const app = express();
require('dotenv').config({path: 'src/.env'});
require('./database');
//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
var hbs = exphbs.create({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
    });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method')); 
app.use(session({
    secret: 'secret-app',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
//Global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//listener
app.listen(app.get('port'), () =>{
    console.log('server running on', app.get('port'));
});