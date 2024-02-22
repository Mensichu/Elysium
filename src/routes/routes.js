import {Router} from 'express';

const path = require('path');

const router = Router();

const passport = require('passport');



//Passport

function isAuthenticated(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }
  //Agrega a la url la direccion de redireccionamiento en la pagina login
  res.redirect('/login?returnTo='+encodeURIComponent(req.originalUrl));
}

//Login para registrarse
router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/register',
  passReqToCallback:true
}));

/* Ya no se usa, cambiado por redirecciona a la pagina que se solicito antes inicio de sesion
router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback:true
  }));
*/

router.post('/login', (req, res, next) => {
  passport.authenticate('local-signin', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      //En caso de tener redireccionamiento, enviado desde el controlador GET login
      //mandado desde el formulario de login, redirecciona a la pagina en caso de inicio de sesion exitoso!
      const returnTo = req.body.returnTo || '/';
      console.log("HERE2: "+req.body.returnTo);
      return res.redirect(returnTo);
    });
  })(req, res, next);
});


router.get('/register', (req,res)=>{
  res.render('register');
});

//Iniciar sesion
router.get('/login', (req,res)=>{
  //Agrega la pagina para redireccionar en caso de inicio de sesion exitoso
  const returnTo = req.query.returnTo || '/';
  console.log("HERE: "+req.query.returnTo)
  res.render('login',{returnTo});
});


//Cerrar sesion
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });





// Home
router.get('/',isAuthenticated, (req,res)=>{
  res.render('links/home');
});



router.get('/clientes',isAuthenticated, (req,res)=>{
  res.render('links/clientes');
});

router.get('/vehiculos/autos',isAuthenticated, (req,res)=>{
  res.render('links/vehiculos/autos');
});

router.get('/vehiculos/placas',isAuthenticated, (req,res)=>{
  res.render('links/vehiculos/placas');
});

router.get('/productos',isAuthenticated, (req,res)=>{
  res.render('links/productos/productos');
});

router.get('/productos/clasificacion',isAuthenticated, (req,res)=>{
  res.render('links/productos/clasificacion');
});

router.get('/pedidos/proveedores',isAuthenticated, (req,res)=>{
  res.render('links/pedidos/proveedores');
});

router.get('/pagos',isAuthenticated, (req,res)=>{
  res.render('links/pagos');
});

router.get('/relacionplacacliente', (req,res)=>{
  res.render('links/relaciones/relacionPlacaCliente');
});

router.get('/relacionproductoauto', (req,res)=>{
  res.render('links/relaciones/relacionProductoAuto');
});





router.get('/relacionplacacliente222', (req,res)=>{
  res.render('links/relaciones/relacionPlacaCliente222');
});


export default router;