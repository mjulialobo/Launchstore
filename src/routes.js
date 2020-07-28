const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const productController = require('./app/controllers/productController')

routes.get('/', function(req, res) {
    return res.render("layout.njk")
})

//products//
routes.get('/products/create', productController.create)
routes.get('/products/:id/edit', productController.edit)

routes.post('/products', multer.array("photos", 5), productController.post)
routes.put('/products', multer.array("photos", 5), productController.put)
routes.delete('/products', productController.delete)



//alias//
routes.get('/ads/create', function(req, res) {
    return res.redirect("/products/create")
})

module.exports = routes