import {Router} from 'express';

const path = require('path');

const router = Router();

const passport = require('passport');



//Passport

function isAuthenticated(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/login');
}

//*/




//*/



//Login para registrarse
router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/register',
  passReqToCallback:true
}));
//*/

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback:true
  }));



  
router.get('/register', (req,res)=>{
  res.render('register');
});

router.get('/login', (req,res)=>{
  res.render('login');
});



router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });






  router.get('/',isAuthenticated, (req,res)=>{
    res.render('links/home');
});



router.get('/clientes',isAuthenticated, (req,res)=>{
    res.render('links/clientes');
});

router.get('/vehiculos/modelos',isAuthenticated, (req,res)=>{
    res.render('links/vehiculos/modelos');
});

router.get('/vehiculos/placas',isAuthenticated, (req,res)=>{
    res.render('links/vehiculos/placas');
});

router.get('/vehiculos/autos',isAuthenticated, (req,res)=>{
    res.render('links/autos');
});

router.get('/productos', (req,res)=>{
  res.render('links/productos/productos');
});

router.get('/productos/clasificacion', (req,res)=>{
  res.render('links/productos/clasificacion');
});

router.get('/pedidos/proveedores',isAuthenticated, (req,res)=>{
  res.render('links/pedidos/proveedores');
});

router.get('/pagos',isAuthenticated, (req,res)=>{
    res.render('links/pagos');
});



export default router;