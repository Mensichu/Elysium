import {Router} from 'express'
import {createMarca,getMarcas,updateMarca,deleteMarca,getMarcaById,
        createAuto,getAutos,getTablaAutos,updateAuto,deleteAuto,getAutoById,getMarcaAutos} from '../aSequelize/controllers/auto.controller'

const router = Router();


//Marca
router.get('/marcas',getMarcas);
router.post('/marca',createMarca);

router.put('/marca/:id',updateMarca);
router.delete('/marca/:id',deleteMarca);
router.get('/marca/:id',getMarcaById);

router.get('/marca/:id/autos',getMarcaAutos);


//Auto
router.get('/autos',getAutos);

router.get('/autos2',getTablaAutos);

router.post('/auto',createAuto);

router.put('/auto/:id',updateAuto);
router.delete('/auto/:id',deleteAuto);

router.get('/auto/:id',getAutoById);


export default router