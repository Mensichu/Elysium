
import express from 'express'
import config from './config'
//Sesiones
import session from 'express-session';
const flash = require('connect-flash');
//Fin Sesiones
const passport = require('passport');


const {engine} = require('express-handlebars');
const morgan = require('morgan');

import routes from './routes/routes';
import autoRoutes from  './routes/auto.routes';
import placaRoutes from './routes/placa.routes';
import colorRoutes from './routes/color.routes';
import clientRoutes from './routes/client.routes';
import registroPCRoutes from './routes/registroPC.routes';
import proveedorRoutes from './routes/proveedor.routes';



const app = express();
const path = require('path');
//passport
require('./aSequelize/database/database');
require('./passport/local-auth');

//settings
app.set('port', process.env.PORT || config.port);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs')

app.use(morgan('dev'));

//middleware
app.use(express.json());//Para que reciba datos Json
//Importa la informacion en el body (req.body)
app.use(express.urlencoded({extended: false}));//reciba desde from en html
//passport middleware
//Sesiones: debe ser antes de inicializar passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
//Debe ir antes que passport y despues de session
app.use(flash());
//Fin Sesiones
app.use(passport.initialize());
app.use(passport.session());

//Middleware flash
app.use((req,res,next)=>{
    //Si no devuelve mensaje solo devuelve null
    app.locals.signupMessage=  req.flash('signupMessage')
    app.locals.signinMessage=  req.flash('signinMessage')
    next();
});

// Routes

app.use(autoRoutes);
app.use(placaRoutes);
app.use(colorRoutes);
app.use(clientRoutes);
app.use(registroPCRoutes);
app.use(proveedorRoutes);
app.use(routes);

// Public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));





    
export default app;
