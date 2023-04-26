
import app from './app';
import {sequelize} from './aSequelize/database/database'

//import './aSequelize/models/tablaMarca'
//import './aSequelize/models/tablaAuto'
//import './aSequelize/models/tablaPlaca'
//import './aSequelize/models/tablaColor'
//import './aSequelize/models/tablaPlacaColores'
//import './aSequelize/models/Sri/tablaTipoDeIdentificacion'
//import './aSequelize/models/tablaCliente'

function main(){
    try{
        //await sequelize.sync({force:false});
        //await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(app.get('port'));
        console.log('server on port: '+app.get('port'));
    }catch(error){
        console.log('Unable to connect to the database:', error)
    }
}

main();

