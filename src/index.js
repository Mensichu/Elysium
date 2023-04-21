
import app from './app';
import {sequelize} from './aSequelize/database/database'

//import './aSequelize/models/tablaMarca'
//import './aSequelize/models/tablaAuto'
//import './aSequelize/models/tablaPlaca'

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

