let Router = require('express').Router;
const apiRouter = Router()

/*
 * NOTE: the model for the data-table should not have the name 'SomeModel'
 */
let ProductModel = require('../db/models/productModel.js')
let apiController = require('../controllers/apiController.js')(ProductModel)

let {	getRouteExamples, getMany, getOne, 	createOne,	updateOne, deleteOne} = apiController

apiRouter
 .get('/', (req, res) => {
 	 res  .json({
 	 	 '/products': "https://mallory-furniture-admin.now.sh/api/v1/products",
 		 '/products?category=[catName]': "https://mallory-furniture-admin.now.sh/api/v1/products?category=seating",
 		 '/products/[productId]' : "https://mallory-furniture-admin.now.sh/api/v1/products/SkwebWxWB0b"
 	 })
 })

 .get('/products', getMany)
 .get('/products/:_id', getOne)
 // .post('/', createOne)
 // .put('/shouts/:_id', updateOne)
 // .delete('/shouts/:_id', deleteOne)

 // TO DELETE ALL:
 // .delete("/resources/all/records", function(req, res){
 //   SomeModel.remove({}, (err) => {
 //     if(err) return res.json(err)
 //     res.json({
 //       msg: `EVEYTHING successfully deleted`
 //     })
 //   })
 // })

module.exports = apiRouter
