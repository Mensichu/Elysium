import sql from 'mssql'

const dbSettings = {
    user:       process.env.userIgnore || 'defaultUser',
    password:   process.env.passwordIgnore || 'defaultPassword',
    server:     process.env.serverIgnore || 'defaultServer',
    database:   process.env.databaseIgnore || 'defaultDatabase',
    options: {
        encrypt:true,
        trustServerCertificate: true
    }
}

export async function getConnection (){
    try{
    const pool = await sql.connect(dbSettings);
    return pool;
    
    }catch(e){
        console.log("ERROR: "+e)
    }
}

export {sql};