import {getConnection, sql, queries} from '../database';


export const getProducts = async (req,res) => {
    //Realiza la consulta
    try{
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllProduct);
        res.json(result.recordset);
    }catch(error){
        res.status(500)
        res.send(error.message)
    }
    
};


export const createNewProduct = async (req,res)=>{
    //Recibe los datos
    const {name, description} = req.body;
    let {quantity} = req.body;
    
    //Valida los datos
    if(name == null || description == null){
        return res.status(400).json({msg: 'Bad requires, llene todos los campos'});
    }

    if(quantity==null) quantity =0;

    //Realiza la consulta
    try{
        const pool = await getConnection();
        await pool.request()
        .input('Name', sql.VarChar, name)
        .input('Description', sql.Text, description)
        .input('Quantity', sql.Int, quantity)
        .query(queries.addNewProduct);

        res.json({name,description,quantity});

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};



export const getCountProducts = async (req,res) =>{

    const pool = await getConnection();
    const result = await pool.request()
    .query(queries.getTotalProducts);
    
    res.json(result.recordset[0]['']);
}



export const getProductById = async (req,res) =>{

    const {id} = req.params;

    const pool = await getConnection();

    const result = await pool.request()
    .input('Id', id)
    .query(queries.getProductById);
    console.log(result);
    res.send(result.recordset[0]);
}



export const deleteProductById = async (req,res) =>{

    const {id} = req.params;

    const pool = await getConnection();

    const result = await pool.request()
    .input('Id', id)
    .query(queries.deleteProduct);
    
    res.sendStatus(204);
}



export const updateProductById = async (req,res) =>{

    const {name, description, quantity} = req.body;
    const {id} = req.params;

    //Valida los datos
    if(name == null || description == null || quantity == null){
        return res.status(400).json({msg: 'Bad requires, llene todos los campos'});
    }

    const pool = await getConnection();
    await pool.request()
    .input('name', sql.VarChar,name)
    .input('description', sql.Text,description)
    .input('quantity', sql.Int,quantity)
    .input('id', sql.Int, id)
    .query(queries.updateProductsById);

    res.json({name,description,quantity});

};






//------------------------------------------------COMBO MARCA


export const getComboMarca = async (req,res) => {
    //Realiza la consulta
    try{
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllMarca);

        res.json(result.recordset);
    }catch(error){
        res.status(500)
        res.send(error.message)
    }
    
};


//------------------------------------------------COMBO MODELO

export const getComboModeloById = async (req,res) =>{
    //El id que hace request es el id de marca en la tabla modelo
    const {id} = req.params;//Devuelve {id: el id que se pide} y almacena id = id
    const pool = await getConnection();

    const result = await pool.request()
    .input('idMarca', id)
    .query(queries.getComboModeloById);
    //console.log(result);
    res.send(result.recordset);
}


//------------------------------------------------TABLA AUTOS


export const getTablaModelos = async (req,res) => {
    //Realiza la consulta
    try{
        const pool = await getConnection();
        const result = await pool.request().query(queries.getTablaModelos);

        res.json(result.recordset);
    }catch(error){
        res.status(500)
        res.send(error.message)
    }
    
};

//------------------------------------------------AUTO ID

export const getModeloById = async (req,res) =>{
    //El id que hace request es el id de marca en la tabla modelo
    const {id} = req.params;//Devuelve {id: el id que se pide} y almacena id = id
    const pool = await getConnection();

    const result = await pool.request()
    .input('idAuto', id)
    .query(queries.getModeloById);
    //console.log(result);
    res.send(result.recordset);
}



export const updateModeloById = async (req,res) =>{

    const {Marca, Modelo, Alias, Año, Cilindraje, Consumo_Motor, Consumo_Caja, Combustible} = req.body;
    const {id} = req.params;

    //Valida los datos
    if(Marca == null || Modelo == null || Alias == null || Año == null ||
        Cilindraje == null || Consumo_Motor == null || Consumo_Caja == null || Combustible == null){
        return res.status(400).json({msg: 'Bad requires, llene todos los campos'});
    }

    const pool = await getConnection();
    await pool.request()
    .input('Marca', sql.Int,Marca)
    .input('Modelo', sql.NVarChar,Modelo)
    .input('Alias', sql.NVarChar,Alias)
    .input('Año', sql.Int,Año)
    .input('Cilindraje', sql.NVarChar,Cilindraje)
    .input('Consumo_Motor', sql.Float, Consumo_Motor)
    .input('Consumo_Caja', sql.Float, Consumo_Caja)
    .input('Combustible', sql.Bit, Combustible)
    //.input('Modificacion', sql.DateTime,Modificacion)
    .input('Id', sql.Int, id)
    .query(queries.updateModeloById);

    res.json({Marca,Modelo,Alias});

};


export const createNewModelo = async (req,res)=>{
    //Recibe los datos
    //console.log("Llegue a createNewAuto en product controller");
    const {Marca,Modelo,Año,Cilindraje,Consumo_Motor,Consumo_Caja,Combustible} = req.body;
    //let {quantity} = req.body;
    //Valida los datos
    if(Marca == null || Modelo == null || Año == null ||
        Cilindraje == null || Consumo_Motor == null || Consumo_Caja == null || Combustible == null){
        return res.status(400).json({msg: 'Bad requires, llene todos los campos'});
    }
    //Realiza la consulta
    try{
        const pool = await getConnection();
        const result = await pool.request()
        
        .input('Marca', sql.Int,Marca)
        .input('Modelo', sql.NVarChar,Modelo)
        .input('Año', sql.Int,Año)
        .input('Cilindraje', sql.NVarChar,Cilindraje)
        .input('Consumo_Motor', sql.Float, Consumo_Motor)
        .input('Consumo_Caja', sql.Float, Consumo_Caja)
        .input('Combustible', sql.Bit, Combustible)
        .query(queries.addNewModelo);
        const idGenerado = result.recordset[0].Id;
        res.json({ id: idGenerado });
    }catch(error){
        res.status(500);
        res.send(error);
    }
};


export const createNewMarca = async (req,res)=>{
    //Recibe los datos
    //console.log("Llegue a createNewAuto en product controller");
    const {Marca} = req.body;
    //let {quantity} = req.body;
    //Valida los datos
    if(Marca == null){
        return res.status(400).json({msg: 'Bad requires, llene todos los campos'});
    }
    //Realiza la consulta
    try{
        const pool = await getConnection();
        const result = await pool.request()
        
        .input('Marca', sql.NVarChar,Marca)
        .query(queries.addNewMarca);
        const idGenerado = result.recordset[0].Id;
        res.json({ id: idGenerado });
    }catch(error){
        res.status(500);
        res.send(error);
    }
};


export const updateAliasMarca = async (req,res) =>{

    const {Marca, Alias} = req.body;
    const {id} = req.params;
    console.log('yo soy el id: '+id);
    //Valida los datos
    if( Marca == null || Alias == null ){
        return res.status(400).json({msg: 'Bad requires, llene todos los campos'});
    }

    const pool = await getConnection();
    await pool.request()
    .input('Marca', sql.Int,Marca)
    .input('Alias', sql.NVarChar,Alias)
    .input('Id', sql.Int, id)
    .query(queries.updateAliasMarca);

    res.json({Alias});

};