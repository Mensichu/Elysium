import {tablaMarca} from '../../models/Auto/tablaMarca';
import {tablaAuto} from '../../models/Auto/tablaAuto';



export const createMarca = async (req,res) =>{
    try{
        const {nom_marca}= req.body;

        const newMarca = await tablaMarca.create({
            nom_marca:nom_marca,
            alias:nom_marca
        })
        res.json(newMarca);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}


export const updateMarca = async (req,res) =>{
    const {id} = req.params;
    const {nom_marca,alias} = req.body;
    try{
        const marca = await tablaMarca.findByPk(id);
        if(marca!==null){
            //.log(marca instanceof tablaMarca);
            marca.nom_marca=nom_marca;
            marca.alias=alias;

            await marca.save();

            res.json(marca);

        }else{
            res.send('not found');
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const updateMarcaAlias = async (req,res) =>{
    const {id} = req.params;
    const {alias} = req.body;
    try{
        const marca = await tablaMarca.findByPk(id);
        if(marca!==null){
            marca.alias=alias;

            await marca.save();

            res.json(marca);

        }else{
            res.status(404).json({message: 'marca not found'});
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}


export const deleteMarca = async (req,res) =>{
    try{
        const {id} = req.params
        await tablaMarca.destroy({
            where: {
                id
            }
        })
        res.sendStatus(204);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}


export const getMarcaById = async (req,res) =>{
    const {id} = req.params
    try{
        const marca = await tablaMarca.findOne({
            where:{
                id
            }
        });
        if(marca!==null){
            res.json(marca)
        }else{
            res.status(404).json({message: 'marca not found'});
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



export const getMarcas = async (req,res) =>{
    try{
        const marcas = await tablaMarca.findAll();
        res.json(marcas);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }

}

export const getComboMarcas = async (req,res) =>{
    try{
        const marcas = await tablaMarca.findAll({
            where:{estado:true},
            attributes: ['id','nom_marca'],
            order:[['nom_marca','ASC']]
        });
        res.json(marcas);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }

}



export const getMarcaAutos = async (req,res) =>{
    const {id} = req.params;

    const autos = await tablaAuto.findAll({
        where: {
            id_marca:id
        },
        include: {
            model: tablaMarca,
            attributes: ['nom_marca']
        }
    });

    if(autos!==null){
        res.json(autos);
    }else{
        res.status(404).json({message: 'autos con id de marca no encontrados'})
    }
}


export const getMarcasRepetidas = async (req, res)=>{
    const {nom_marca} = req.params;
    console.log(nom_marca)
    try{
        const marcaEncontrada = await tablaMarca.findOne({
            where:{
                nom_marca:nom_marca
            }
        });
        if(marcaEncontrada!==null){
            res.json( {respuesta:true} );
        }else{
            res.json( {respuesta:false} );
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}




//------------------------------------- AUTO


export const createAuto = async (req,res) =>{
    try{
        const {nom_auto,ano,cilindraje,consumo_motor,consumo_caja,combustible,id_marca} = req.body;

        const auto = await tablaAuto.create(
            {
            nom_auto,
            ano,
            cilindraje,
            consumo_motor,
            consumo_caja,
            combustible,
            id_marca
            
            }
        );
        res.json(auto);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }   
}


export const updateAuto = async (req,res)=>{
    const {id} = req.params;
    const {ano,cilindraje,consumo_motor,consumo_caja} = req.body;
    try{
        const auto = await tablaAuto.findByPk(id);
        if(auto!==null){
            //Al ser los mismos nombres de parametros se usa auto = req.body
            //si solo paso los campos que quiero actualizar el solo actualizo esos campos
            //auto.set(req.body) No deseo actualizar modelo y marca
            auto.ano = ano,
            auto.cilindraje=cilindraje,
            auto.consumo_motor=consumo_motor,
            auto.consumo_caja=consumo_caja

            await auto.save();

            res.json(auto);
        }else{
            res.status(404).json({message: 'auto not found'});
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }


}

export const updateNomAuto = async (req,res)=>{
    const {id} = req.params;
    const {nom_auto} = req.body;
    try{
        const auto = await tablaAuto.findByPk(id);
        if(auto!==null){
            auto.nom_auto = nom_auto
            await auto.save();

            res.json(auto);
        }else{
            res.status(404).json({message: 'auto not found'});
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }


}

export const deleteAuto = async (req,res)=>{
    const {id}= req.params;
    try{
        const auto = await tablaAuto.findByPk(id);
        if(auto!==null){
            await auto.destroy({
                where: id
            });
            return res.sendStatus(204);
        }else{
            res.status(404).json({message: 'auto not found'});
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }

}


export const getAutoById = async (req,res)=>{
    const {id} = req.params;
    try{
        const auto = await tablaAuto.findOne({
            where:{id},
            attributes:{
                exclude:['estado','createdAt','updatedAt']
            },
            include:{
                model:tablaMarca,
                attributes:['alias']
            }
        })
        if (auto!==null){
            res.json(auto);
        }else{
            res.status(404).json({message: 'auto not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}

export const getAutos = async (req,res) =>{
    try{
        const autos = await tablaAuto.findAll({
            where:{estado:true},
            attributes:['nom_auto','ano','cilindraje','combustible'],
            include:{
                model: tablaMarca,
                attributes: ['nom_marca']
            }
        });
        res.json(autos);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}

import Sequelize from 'sequelize';

export const getComboAutosUnico = async (req,res) =>{
    const {id} = req.params
    try{
        const autos = await tablaAuto.findAll({
            where:{
                id_marca: id,
                estado:true
            },
            include:{
                model: tablaMarca,
                attributes: ['alias']
            },
            attributes: [
                [Sequelize.fn('MIN', Sequelize.col('Auto.id')), 'id'],
                'nom_auto',
                [Sequelize.col('Marca.alias'), 'alias']
            ],
            group: ['nom_auto', 'Marca.id', 'Marca.alias'],
            order: [['nom_auto','ASC']]
        });
        res.json(autos);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}



/*
export const getTablaAutos = async (req,res) =>{
    try{
        const {page,size,search}= req.query;
        const searchString = search ? search.toUpperCase() : '';
        const autos = await tablaAuto.findAndCountAll({
            limit: parseInt(size),
            offset: parseInt(page)*parseInt(size),
            where:
            {
                estado:true,
                [Op.or]: [
                    Sequelize.where(Sequelize.fn('upper', Sequelize.col('nom_auto')), 'LIKE', `%${searchString}%`),
                ],
            },
            attributes:
                [
                    'id',
                    [Sequelize.fn('upper', Sequelize.col('nom_auto')), 'modelo'],
                    ['ano','año'],
                    'cilindraje',
                    [Sequelize.literal("CASE WHEN combustible=1 THEN 'DIESEL' ELSE 'GAS.' END"), 'combustible']
                ],
            include:{
                model: tablaMarca,
                attributes: [[Sequelize.fn('upper',Sequelize.col('nom_marca')),'nom_marca']]
            },
            order:[[tablaMarca,'nom_marca','ASC'],['nom_auto','ASC']]
        });
        res.json({rows: autos.rows, count: autos.count});
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}
*/



export const getTablaAutos = async (req,res) =>{
    try{
        let {page,size,search1,search2}= req.query;
        
        page=page!==undefined?page:'';
        size=size!==undefined?size:'';
        search1=search1!==undefined?search1:'';
        search2=search2!==undefined?search2:'';
        size = size!=-1 ? size : '';//Envia todos los registros si es -1
        const searchString1 = search1 ? search1.toUpperCase() : '';
        const searchString2 = search2 ? search2.toUpperCase() : '';

        console.log('valores: '+page+' '+size+' '+search1+' '+search2)

        const autos = await tablaAuto.findAndCountAll({
            limit: parseInt(size),
            offset: parseInt(page)*parseInt(size),
            where:
                {
                    estado:true,
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('Marca.nom_marca')), 'LIKE', `%${searchString1}%`),
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('nom_auto')), 'LIKE', `%${searchString2}%`)
                    ],
                },
            attributes:['id','nom_auto','ano','cilindraje','combustible'],
            include:{
                model: tablaMarca,
                attributes: ['nom_marca']
            },
            order:[[tablaMarca,'nom_marca','ASC'],['nom_auto','ASC']]
        });
        res.json(autos);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}







const { Op } = require("sequelize");

export const getAutosRepetidos = async (req, res)=>{
    const {id, nom_auto,cilindraje,ano,combustible} = req.query;
    console.log(id)
    console.log(nom_auto)
    try{
        const autoEncontrado = await tablaAuto.findAll({
            where:{
                nom_auto:nom_auto,
                cilindraje:cilindraje,
                ano:ano,
                combustible:combustible,
                id: {
                    [Op.not]: id
                  }
            }
        });
        if(autoEncontrado!==null && autoEncontrado.length>0){
            res.json( {respuesta:true} );
        }else{
            res.json( {respuesta:false} );
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}




//Relaciones


export const getAutoByData = async (req,res)=>{
    const {id} = req.params;
    try{
        const auto = await tablaAuto.findOne({
            where:{id:id},
            attributes:{
                exclude:['estado','createdAt','updatedAt']
            },
            include:[
                {
                    model:tablaMarca,
                    attributes:['nom_marca']
                }
        ]
        });
        if (auto!==null){
            //res.json(client);
            // Obtener los registros del vehiculo
            const registros = await auto.getRegistros();
            //console.log("ESTOS SON LOS REGISTROS DEL VEHICULO");
            //console.log(registros[0].dataValues.id)
            // Mapear los registros para obtener la información de la placa
            const productos = await Promise.all(registros.map(async registro => {
                console.log("REGISTRO")
                console.log(registro.dataValues.id)
                const producto = await registro.getProducto({
                    attributes:['id','marca','nom_producto']
                });
                const productoConIdRelacion = {
                    ...producto.toJSON(),
                    id_relacion: registro.dataValues.id
                };
                return productoConIdRelacion;
            }));
            // Agregar la información de la placa al objeto del cliente
            const autoConProductos = auto.toJSON();
            autoConProductos.productos = productos;
            res.json(autoConProductos);
        }else{
            res.status(404).json({message: 'auto not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}