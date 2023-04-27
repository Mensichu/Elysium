
import express from 'express'
import config from './config'


const {engine} = require('express-handlebars');
const morgan = require('morgan');

import productsRoutes from './routes/routes';
import autoRoutes from  './routes/auto.routes';
import placaRoutes from './routes/placa.routes';
import colorRoutes from './routes/color.routes';
import clientRoutes from './routes/client.routes';
import registroPCRoutes from './routes/registroPC.routes';



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
//Importa la informacion en el body (req.body)
app.use(express.urlencoded({extended: false}));//reciba desde from en html

// Routes
app.use(productsRoutes);
app.use(autoRoutes);
app.use(placaRoutes);
app.use(colorRoutes);
app.use(clientRoutes);
app.use(registroPCRoutes);


// Public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));



export default app;
