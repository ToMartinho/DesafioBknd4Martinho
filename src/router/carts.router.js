import { Router } from 'express'
import { cartManager } from '../CartManager.js'

const router = Router()

router.get("/:idCart", async(req,res)=>{
    try {
        const {idCart} = req.params

        const result = await cartManager.getCartById(idCart)
        res.status(200).json({message: result})
    } catch (error) {
        return error
    }
})

router.post("/", async(req,res)=>{
    try {
        const result = await cartManager.createCart(req.body)
        res.status(200).json({message: result})
    } catch (error) {
        return error
    }
})

router.post("/:idCart/products/:idProduct", async(req,res)=>{
    try {
        const {idCart, idProduct} = req.params
        const cart = await cartManager.addProductToCartById(idCart,idProduct)
        res.status(200).json({message: "product added to cart",products: cart.products})
    } catch (error) {
        return error
    }
})
export default router