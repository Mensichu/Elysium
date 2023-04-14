
import express from 'express'
import config from './config'
import Toastify from 'toastify-js';

const {engine} = require('express-handlebars');
const morgan = require('morgan');

import productsRoutes from './routes/routes';
import autoRoutes from './routes/auto.routes';


const app = express();
const path = require('path');


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



//middleware

app.use(express.json());//Para que reciba datos Json
app.use(express.urlencoded({extended: false}));//reciba desde from en html


app.use(productsRoutes);
app.use(autoRoutes);

// Public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));



export default app;
