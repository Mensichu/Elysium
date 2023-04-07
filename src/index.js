
import app from './app';
import {sequelize} from './aSequelize/database/database'

import './aSequelize/models/tablaMarca'

async function main(){
    try{
        await sequelize.sync({force:true});
        console.log('Connection has been established successfully.');
        //app.listen(app.get('port'));
        console.log('server on port: '+app.get('port'));
    }catch(error){
        console.log('Unable to connect to the database:', error)
    }
}

main();


/*

//UI
document.querySelector('.navPrincipal').addEventListener('click',(e)=>{
    console.log('Ajaaa!');
});




*/