import fs from 'fs'

class CartManager{
    constructor(path){
        this.path = path
    }

    async getCart(){
        try {
            if(!fs.existsSync(this.path)){
                const carts = []

                await fs.promises.writeFile(this.path, JSON.stringify(carts))

                return carts;
            }

            const carts = JSON.parse(await fs.promises.readFile(this.path,'utf-8'))

            return carts;
        } catch (error) {
            return error
        }
    }

    async getCarts(queryObj){
        const { limit } = queryObj
        try {
            const carts = await this.getCart();
            return carts.slice(0,limit)
        } catch (error) {
            return error
        }
    }

    async getCartById(idCart){
        try {
            const carts = await this.getCarts({})
            const findCart = carts.find(c=> c.id === +idCart)
            if(findCart){
                return findCart;
            }else{
                return -1
            }

        } catch (error) {
            return error
        }
    }

    async createCart(){        
        try {
            const carts = await this.getCarts({})
            let id
            let products
            if (!carts.length) {
                id = 1
                products = []
                const newCart = { id, products }
                carts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return newCart
            }
            else {
                id = carts[carts.length - 1].id + 1
                products = []
                const newCart = { id, products }
                carts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return newCart
            }
        } catch (error) {
            error
        }
    }

    async addProductToCartById(idCart, idProduct){
        
        try {
            const carts = await this.getCarts({});
            let cartInfo = await this.getCartById(idCart);
            let cart = {...(cartInfo)}
            const productIndex = cart.products.findIndex((product)=>product.product === +idProduct)
            if(productIndex === -1){
                cart.products.push({
                    product: +idProduct,
                    quantity: 1,
                })
            }else{
                cart.products[productIndex].quantity += 1
            }

            const cartIndex = carts.findIndex((cart)=> cart.id === +idCart)
            carts[cartIndex] = cart;

            const result = await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return result

        } catch (error) {
            return error
        }
    }
}


export const cartManager = new CartManager("carts.json")
