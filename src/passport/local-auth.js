const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {tablaUser} = require('../aSequelize/models/Users/tablaUser');

passport.serializeUser(function(user, done) {
    console.log('User serialized: ', user);
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try{
        // Retrieve user information from the database
        const user = await tablaUser.findByPk(id); 
        done(null, user);
    }catch(error){
        done(error);
    }
});


passport.use('local-signup', new LocalStrategy({
    //Objeto: registro de datos
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req,username,password,done)=>{
    try{
        const [user,created] = await tablaUser.findOrCreate(
            {
                where:{
                    username:username
                },
                defaults: {password:password}
            }
        );
        if (created) {
            console.log('Usuario creado exitosamente');
            done(null, user)
        } else {
            console.log('El usuario ya existe');
            done(null, false, req.flash('signupMessage','El usuario ya existe!'));
        }
    }catch(error){
        //500 es un error que indica q es error del servidor
        done(error);
        return res.status(500).json({ message: error.message });
    } 
}));


passport.use('local-signin', new LocalStrategy({
    //Objeto: registro de datos
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req,username,password,done)=>{
    try{
        // Busca el usuario en la base de datos
        const user = await tablaUser.findOne({ where: { username } });

        // Si no encontró un usuario con ese nombre de usuario
        if (!user) {
            return done(null, false,  req.flash('signinMessage','Nombre de usuario o contraseña incorrecta') );
        }

        // Compara la contraseña ingresada con la almacenada en la base de datos
        const validPassword = await user.comparePassword(password);

        // Si la contraseña es incorrecta
        if (!validPassword) {
            return done(null, false, req.flash('signinMessage','Nombre de usuario o contraseña incorrecta'));
        }

        // Si el usuario y la contraseña son correctos
        return done(null, user);
       
    }catch(error){
        //500 es un error que indica q es error del servidor
        done(error);
        return res.status(500).json({ message: error.message });
    } 
}));