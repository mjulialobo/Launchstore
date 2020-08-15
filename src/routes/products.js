const express = require("express");
const routes = express.Router();
const multer = require("../app/middlewares/multer");
const ProductController = require("../app/controllers/ProductController");
const SearchController = require("../app/controllers/SearchController");

routes.get("/create", ProductController.create);
routes.get("/:id/", ProductController.show);
routes.get("/:id/edit", ProductController.edit);

routes.post("/", multer.array("photos", 5), ProductController.post);
routes.put("/", multer.array("photos", 5), ProductController.put);
routes.delete("/", ProductController.delete);

//search
routes.get("/products/search", SearchController.index);

module.exports = routes;
