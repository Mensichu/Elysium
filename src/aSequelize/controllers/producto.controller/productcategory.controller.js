import {tablaProductCategory} from '../../models/Productos/tablaProductCategory';
import {tablaProducto} from '../../models/Productos/tablaProducto';

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CATEGORIAS


export const createCategoriaPadre = async (req,res) =>{
    try{
        const {name}= req.body;

        const categoriaPadre = await tablaProductCategory.create({
            name
        })
        res.json(categoriaPadre);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



export const createCategoriaHijo = async (req,res) =>{
    try{
        const {name,parentCategoryId}= req.body;

        const categoriaHijo = await tablaProductCategory.create({
            name,
            parentCategoryId
        })
        res.json(categoriaHijo);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



export const getCategorias = async (req,res) =>{
    try{
        let {id}= req.params;
        id=id==-1?null:id;
        const categorias = await tablaProductCategory.findAll({
            where: {parentCategoryId:id},
            order:[['name','ASC']]
        })
        res.json(categorias);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

//NO la estoy usando
import {sequelize} from '../../database/database'
const { Sequelize } = require('sequelize');
/*SELECT id, value, ROW_NUMBER() OVER (PARTITION BY id ORDER BY (SELECT NULL)) AS rn*/
class ProductCategory extends Sequelize.Model {
    static async findAllCategories() {
        const queryMio = `
        WITH category_tree AS (
            SELECT id, name, parentCategoryId, CAST(name AS nvarchar(max)) AS path
            FROM ProductCategory
            WHERE parentCategoryId IS NULL
            UNION ALL
            SELECT c.id, c.name, c.parentCategoryId, ct.path + N', ' + CAST(c.name AS nvarchar(max))
            FROM ProductCategory c
            JOIN category_tree ct ON ct.id = c.parentCategoryId
        ), 
        category_split AS (
            SELECT id, value, ROW_NUMBER() OVER (PARTITION BY id ORDER BY (SELECT NULL)) AS rn
            FROM category_tree
            CROSS APPLY STRING_SPLIT(path, N',')
        )
        SELECT 
            MAX(CASE WHEN rn = 1 THEN value END) AS Columna1,
            MAX(CASE WHEN rn = 2 THEN value END) AS Columna2,
            MAX(CASE WHEN rn = 3 THEN value END) AS Columna3,
            MAX(CASE WHEN rn = 4 THEN value END) AS Columna4
        FROM category_split
        GROUP BY id
        `;
  
      const result = await sequelize.query(queryMio);
      return result[0];
    }
}


export const getCategoriasTabla = async (req,res) =>{
    try{
        const categorias = await ProductCategory.findAllCategories()

        res.json(categorias);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

const { Op } = require("sequelize");

export const getCategoriasAll = async (req,res) =>{
    try{
        const categoriasAll = await tablaProductCategory.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            }
        })
        let filaSubgrupos = clasificacionTabla(categoriasAll)[0];
        const idSubgrupos = clasificacionTabla(categoriasAll)[1];

        const productos = await tablaProducto.findAll({
            where: {
                id_subgrupo: {
                  [Op.in]: idSubgrupos
                }
            },
            attributes:['id','nom_producto','id_subgrupo'],
        });
        
        /*
        let arrayTemp =[];
        filaSubgrupos.forEach((subgrupo)=>{
            console.log('Este es el subgrupo:');
            console.log(subgrupo);
            let filaTemp = {...subgrupo};
            productos.forEach((producto)=>{
                if(subgrupo.id!== undefined){
                    if (subgrupo.id === producto.id_subgrupo) {
                        if(subgrupo.nom_producto === undefined){
                            subgrupo.nom_producto= producto.nom_producto;
                        }else{
                            filaTemp.nom_producto = producto.nom_producto;
                            arrayTemp.push(filaTemp);
                        }
                    }
                }
            });
        });


        */

        let arrayTemp =[...filaSubgrupos];
        for(let i=0;i<filaSubgrupos.length;i++){
            console.log('filaSubgrupo i: '+i);
            let filaTemp = {...filaSubgrupos[i]};
            for(let j=0;j<productos.length;j++){
                console.log('j: '+j);
                if (filaSubgrupos[i].id === productos[j].id_subgrupo) {
                    console.log('-------------Este es el subgrupo '+i+':');
                    console.log(filaSubgrupos[i]);
                    console.log('Este es producto '+i+':');
                    console.log(productos[j].id_subgrupo);
                    console.log(productos[j].nom_producto);
                    console.log('-------------------------------------------------');
                    if(filaSubgrupos[i].nom_producto === undefined){
                        filaSubgrupos[i].nom_producto= productos[j].nom_producto;
                        arrayTemp[i].nom_producto= productos[j].nom_producto;
                        console.log('Agregamos el nombre');    
                    }else{
                        console.log('++++++++++++++++++++++++++++Ya tiene Nombre+++++++++++++++++++++++++++++');
                        filaTemp.nom_producto = productos[j].nom_producto;
                        arrayTemp.splice(i, 0, filaTemp);
                    }
                }
            }
        }   

        //filaSubgrupos = filaSubgrupos.concat(arrayTemp);

        res.json(arrayTemp);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



export const getCategoriasById = async (req,res)=>{
    const {id} = req.params;
    
    try{
        let c=[];
        let temp = id;
        c.push({"columna":parseInt(temp)});
        while (temp!==null) {
            const categoria = await tablaProductCategory.findByPk(temp);
            if(categoria!==null){
                c.push({"columna":categoria.parentCategoryId})
                temp = categoria.parentCategoryId;
            }else{
                res.status(404).json({message: 'categoriasById not found'});
            }
        }
        res.json(c);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}



function clasificacionTabla(data){
    const listaIds=[];
    let filas=[];

    let c1=[],c2=[],c3=[],c4=[];
    data.forEach(tipo =>{
        if(null === tipo.parentCategoryId){
            c1.push({"id":tipo.id,"parentCategoryId":tipo.parentCategoryId,"name":tipo.name})
            
        }
    });
    //console.log('Este es c1: ');
    //console.log(c1);
    let band=0;
    c1.forEach(tipo =>{
        data.forEach(categoria =>{
            if(categoria.parentCategoryId==tipo.id){
                c2.push({"id":categoria.id,"c1":categoria.parentCategoryId,"c1_name":tipo.name,"name":categoria.name})
                band=1;
            }
        });
        if(band==0){
            //console.log('No encontro ninguno de:');
            //console.log(tipo.name);
            filas.push({"c1":tipo.name,"c2":"","c3":"","c4":""})
        }
        band=0;
    });
    //console.log('Este es c2: ');
    //console.log(c2);
    band=0;
    c2.forEach(categoria =>{
        data.forEach(grupo =>{
            if(grupo.parentCategoryId==categoria.id){
                c3.push({"id":grupo.id,
                            "c2":grupo.parentCategoryId, "c2_name":categoria.name,
                            "c1":categoria.c1,"c1_name":categoria.c1_name,
                            "name":grupo.name})
                band=1;
            }
        });
        if(band==0){
            //console.log('No encontro ninguno de:');
            //console.log(categoria.name);
            filas.push({"c1":categoria.c1_name,"c2":categoria.name,"c3":"","c4":""})
        }
        band=0;
    });
    //console.log('Este es c3: ');
    //console.log(c3);
    band=0;
    c3.forEach(grupo =>{
        data.forEach(subgrupo =>{
            if(subgrupo.parentCategoryId==grupo.id){
                c4.push({"id":subgrupo.id,
                            "c3":subgrupo.parentCategoryId, "c3_name":grupo.name,
                            "c2":grupo.c2,"c2_name":grupo.c2_name,
                            "c1":grupo.c1,"c1_name":grupo.c1_name,
                            "name":subgrupo.name})
                band=1;
                filas.push({"c1":grupo.c1_name,"c2":grupo.c2_name,"c3":grupo.name,"c4":subgrupo.name,"id":subgrupo.id})    
                listaIds.push(subgrupo.id)
            }
        });
        if(band==0){
            //console.log('No encontro ninguno de:');
            //console.log(grupo.name);
            filas.push({"c1":grupo.c1_name,"c2":grupo.c2_name,"c3":grupo.name,"c4":""})
        }
        band=0;
    });
    //console.log('Este es c4: ');
    //console.log(c4);

    return [filas,listaIds]
}