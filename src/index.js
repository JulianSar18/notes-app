require('dotenv').config({path: 'src/.env'})
const express = require('express');
const path = require('path');
const exphbs  =  require('express-handlebars');
const methodOverride = require ('method-override');
const session = require ('express-session');
const { extname, resolve } = require('path');

//initilizators
const app = express();
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