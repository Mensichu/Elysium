import {Router} from 'express';
import { createUser } from '../aSequelize/controllers/login.controller/login.controller'

const path = require('path');

const router = Router();

const passport = require('passport');

//Passport


/*
router.post('/login', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/login',
  passReqToCallback:true
}));
*/

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback:true
  }));

router.get('/login', (req,res)=>{
  res.render('login');
});

/*
router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
*/

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });



function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


router.get('/',isAuthenticated, (req, res) => {
  res.render('links/home');
});





router.post('/createUser', createUser);


























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