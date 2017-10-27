let Router = require('express').Router;
const apiRouter = Router()

/*
 * NOTE: the model for the data-table should not have the name 'SomeModel'
 */
let FurnitureModel = require('../db/models/furnitureModel.js')
let apiController = require('../controllers/apiController.js')(FurnitureModel)
let {	getMany, getOne, 	createOne,	updateOne, deleteOne} = apiController

apiRouter
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
