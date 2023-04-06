
import express from 'express'
import config from './config'

const {engine} = require('express-handlebars');
const morgan = require('morgan');

import productsRoutes from './routes/products.routes';


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

// Public
app.use(express.static(path.join(__dirname, 'public')));




export default app;
