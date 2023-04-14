
import {Router} from 'express';



const path = require('path');

const router = Router();


router.get('/', (req,res)=>{
    //res.sendFile(path.resolve(__dirname,'../public/index.html'));
    res.render('links/add');

});

router.get('/agentes', (req,res)=>{
    res.render('links/agentes');
});

router.get('/vehiculos', (req,res)=>{
    res.render('links/vehiculos');
    //console.log(req.nav);
});

router.get('/vehiculos/placas', (req,res)=>{
    res.render('links/placas');
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