import {tablaProductCategory} from '../../models/Productos/tablaProductCategory';


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
            where: {parentCategoryId:id}
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



//Este devuelve todos los datos, mediante una funcion en el front End se ordena los datos.
export const getCategoriasAll = async (req,res) =>{
    try{
        const categoriasAll = await tablaProductCategory.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            }
        })
        res.json(categoriasAll);
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