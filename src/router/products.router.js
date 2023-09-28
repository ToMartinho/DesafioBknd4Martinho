import { Router } from 'express'
import { productsManager } from '../ProductManager.js'

const router = Router()


// TRAER TODOS LOS PRODUCTOS
router.get('/',async(req,res)=>{
    try {
        const products = await productsManager.getProducts(req.query)
        if(!products.length){
            res.status(200).json({message:'No Product found'})
        }else{
            res.status(200).json({message:'Product found', products})
        }


    } catch (error) {
        res.status(500).json({message: error})
    }
})

// TRAER PRODUCTOS POR ID QUE VIENE EN LOS PARAMS
router.get('/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    try {
        const product = await productsManager.getProductById(+idProduct)
        if(!product){
            res.status(400).json({message: 'Product not found with the id sent'})
        }else{
            res.status(200).json({message: 'Product found',product})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

// ELIMINAR UN PRODUCTO
router.delete('/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    try {
        const response = await productsManager.deleteProduct(+idProduct)
        if(response === -1){
            res.status(400).json({message:'Product not found with the id sent'})
        }else{
            res.status(200).json({message:'product deleted'})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

// ACTUALIZAR UN PRODUCTO
router.put('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params
    try {
        const response = await productsManager.updateProduct(+idProduct,req.body)
        if(response === -1){
            res.status(400).json({message:'Product not found with the id sent'})
        }else{
            res.status(200).json({message:'Product updated'})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

// CREAR PRODUCTOS

/*
 --------- DATOS NECESARIOS PARA EL BODY ---------
    "name": 'sprite',
    "description": 'bevida',
    "price": 600,
    "stock": 100
*/
router.post('/',async(req,res)=>{
    // validamos que nos envien los datos necesarios
    const{name,description,price,stock} = req.body
    if(!name|| !description || !price || !stock){
        return res.status(400).json({message:'Some data is missing'})
    }
    try {
        const newProduct = await productsManager.createProduct(req.body)
        res.status(200).json({message: 'Product created',product:newProduct})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

export default router