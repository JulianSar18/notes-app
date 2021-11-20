const express = require('express');
const path = require('path');
const exphbs =  require('express-handlebars');
const methodOverride = require ('method-override');
const session = require ('express-session');

//initilizators
const app = express();
require('./database')

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
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