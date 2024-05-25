const express = require("express");
const { Router } = express;
const catchAsync = require("../middlewares/catchAsync");
const authMiddleware = require("../middlewares/authentication");
const upload = require("../middlewares/multerConfig");
const {
  getAllProperty,
  createProperty,
  updateProduct,
  deleteProduct,
  getProductById,
  getLatestProducts,
  getAllCategories,
  searchProducts,
  getProductsByCategory,
  askQuestion,
} = require("../controllers/subscriptionController");

const subscriptionRoutes = Router();

subscriptionRoutes.post("/create", catchAsync(createProperty));
subscriptionRoutes.put("/update/:id", catchAsync(updateProduct));
subscriptionRoutes.get("/properties", catchAsync(getAllProperty));
subscriptionRoutes.get("/latest", catchAsync(getLatestProducts));
subscriptionRoutes.get("/categories", catchAsync(getAllCategories));
subscriptionRoutes.get("/search/:search", searchProducts);
subscriptionRoutes.get("/category/:category", getProductsByCategory);
subscriptionRoutes.get("/:id", catchAsync(getProductById));
subscriptionRoutes.delete("/delete/:id", catchAsync(deleteProduct));
subscriptionRoutes.post("/ask-question", catchAsync(askQuestion));

module.exports = { subscriptionRoutes };
