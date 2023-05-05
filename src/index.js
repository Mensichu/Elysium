
import app from './app';
import {sequelize} from './aSequelize/database/database'

//import './aSequelize/models/Productos/tablaProductoSeccion'
//import './aSequelize/models/Productos/tablaProductCategory'
//import './aSequelize/models/Productos/tablaProducto'
//import './aSequelize/models/Productos/tablaRegistroProveedorProducto'

async function main(){
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