
import {Router} from 'express';



const path = require('path');

const router = Router();


router.get('/', (req,res)=>{
    //res.sendFile(path.resolve(__dirname,'../public/index.html'));
    res.render('links/main');

});

router.get('/clientes', (req,res)=>{
    res.render('links/clientes');
});

router.get('/vehiculos/modelos', (req,res)=>{
    res.render('links/vehiculos/modelos');
    //console.log(req.nav);
});

router.get('/vehiculos/placas', (req,res)=>{
    res.render('links/vehiculos/placas');
    //console.log(req.nav);
});

router.get('/vehiculos/autos', (req,res)=>{
    res.render('links/autos');
    //console.log(req.nav);
});

router.get('/pagos', (req,res)=>{
    res.render('links/pagos');
    //console.log(req.nav);
});



export default router;