const Subscription = require("../models/subscriptionModel");
const cloudinary = require("cloudinary");
const { generateRandomString } = require("../utils/generateRandomString");

const getAllProperty = async (req, res) => {
  // try {
  //   const properties = await Property.find();

  //   if (!properties || properties.length === 0) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "No properties found",
  //       data: null,
  //     });
  //   }

  //   const totalProperties = properties.length;

  //   return res.status(200).json({
  //     success: true,
  //     message: `Properties fetched successfully. Total properties: ${totalProperties}`,
  //     data: properties,
  //   });
  // } catch (error) {
  //   // Handle errors
  //   console.error("Error fetching properties:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Failed to fetch properties",
  //     error: error.message,
  //     data: null,
  //   });
  // }
};

const getLatestProducts = async (req, res) => {
  // try {
  //   const products = await Property.find({}).sort({ createdAt: -1 }).limit(7);
  //   return res.status(200).json({
  //     success: true,
  //     message: `Latest Products: ${products.length}`,
  //     products,
  //   });
  // } catch (error) {
  //   console.error("Error fetching latest products:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Failed to fetch latest products",
  //     error: error.message,
  //   });
  // }
};
const getAllCategories = async (req, res) => {
  // try {
  //   const categories = await Property.distinct("category");
  //   return res.status(200).json({
  //     success: true,
  //     message: `Total Product Categories: ${categories.length}`,
  //     categories,
  //   });
  // } catch (error) {
  //   console.error("Error fetching product categories:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Failed to fetch product categories",
  //     error: error.message,
  //   });
  // }
};
const searchProducts = async (req, res) => {
  const { search } = req.params;

  // try {
  //   // Query products with names matching the search query
  //   const products = await Property.find({
  //     name: { $regex: search, $options: "i" },
  //   });
  //   res.status(200).json({
  //     success: true,
  //     message: `Found ${products.length} products matching '${search}'`,
  //     products,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: "Internal Server Error",
  //     error: error.message,
  //   });
  // }
};
const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  // try {
  //   // Query products with the specified category
  //   const products = await Property.find({
  //     category: { $regex: category, $options: "i" },
  //   });

  //   if (!products || products.length === 0) {
  //     return res.status(404).json({
  //       success: false,
  //       message: `No products found for category '${category}'`,
  //     });
  //   }

  //   res.status(200).json({
  //     success: true,
  //     message: `Found ${products.length} products for category '${category}'`,
  //     products,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: "Internal Server Error",
  //     error: error.message,
  //   });
  // }
};

const getProductById = async (req, res) => {
  // try {
  //   const productId = req?.params?.id;
  //   const product = await Property.findById(productId);
  //   if (!product) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "Product not found",
  //       data: null,
  //     });
  //   }
  //   return res.status(200).json({
  //     success: true,
  //     message: "Product fetched successfully",
  //     data: product,
  //   });
  // } catch (error) {
  //   console.error("Error fetching product:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Failed to fetch product",
  //     error: error.message,
  //     data: null,
  //   });
  // }
};

const createProperty = async (req, res) => {
  // try {
  //   const propertyCount = await Property.countDocuments();
  //   const refPrefix = generateRandomString(2);
  //   const refNumber = String(propertyCount + 1).padStart(3, "0");
  //   const ref = `${refPrefix}-${refNumber}`;

  //   req.body.ref = ref;
  //   const newProperty = await Property.create(req.body);
  //   return res.status(201).json({
  //     success: true,
  //     message: "Property created successfully",
  //     data: newProperty,
  //   });
  // } catch (error) {
  //   console.error("Error creating property:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Failed to create property",
  //     error: error.message,
  //   });
  // }
};

const deleteProduct = async (req, res) => {
  // try {
  //   const productId = req?.params?.id;
  //   if (!productId) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "Product ID is required" });
  //   }
  //   const deletedProduct = await Product.findByIdAndDelete(productId);
  //   if (!deletedProduct) {
  //     return res
  //       .status(404)
  //       .json({ success: false, message: "Product not found" });
  //   }
  //   return res.status(200).json({
  //     success: true,
  //     message: "Product deleted successfully",
  //     data: deletedProduct,
  //   });
  // } catch (error) {
  //   console.error("Error deleting product:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Failed to delete product",
  //     error: error.message,
  //   });
  // }
};

const updateProduct = async (req, res) => {
  // try {
  //   const productId = req.params.id;
  //   const {
  //     name,
  //     description,
  //     price,
  //     category,
  //     quantity,
  //     isTopSeller,
  //     isBestDeal,
  //     subDescription,
  //     videoUrl,
  //     questions,
  //     reviews,
  //     material,
  //     stock,
  //     sizes,
  //     color,
  //     extraField,
  //   } = req.body;
  //   if (!productId) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "Product ID is required" });
  //   }
  //   const { mainImage, "subImages[]": subImages } = req.files || {};
  //   const mainImageUpload = mainImage
  //     ? await cloudinary.uploader.upload(mainImage.tempFilePath)
  //     : null;
  //   const subImagesUploadPromises = subImages
  //     ? subImages.map((subImage) =>
  //         cloudinary.uploader.upload(subImage.tempFilePath)
  //       )
  //     : [];
  //   const subImagesUpload = await Promise.all(subImagesUploadPromises);
  //   const updatedProductData = {
  //     name,
  //     description,
  //     price,
  //     category,
  //     quantity,
  //     isTopSeller,
  //     isBestDeal,
  //     subDescription,
  //     videoUrl,
  //     questions,
  //     reviews,
  //     material,
  //     stock,
  //     sizes,
  //     color,
  //     extraField, // Include extraField in the updated product data
  //   };
  //   if (mainImageUpload) {
  //     updatedProductData.mainImage = mainImageUpload.secure_url;
  //   }
  //   if (subImagesUpload.length > 0) {
  //     updatedProductData.subImages = subImagesUpload.map(
  //       (image) => image.secure_url
  //     );
  //   }
  //   // Update the product document with the new fields
  //   const updatedProduct = await Product.findByIdAndUpdate(
  //     productId,
  //     updatedProductData,
  //     { new: true }
  //   );
  //   if (!updatedProduct) {
  //     return res
  //       .status(404)
  //       .json({ success: false, message: "Product not found" });
  //   }
  //   return res.status(200).json({
  //     success: true,
  //     message: "Product updated successfully",
  //     data: updatedProduct,
  //   });
  // } catch (error) {
  //   console.error("Error updating product:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Failed to update product",
  //     error: error.message,
  //   });
  // }
};

const askQuestion = async (req, res) => {
  // try {
  //   const { productId, question } = req.body;
  //   console.log("req.body",req.body)
  //   if (!productId || !question) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "ProductId and question are required fields.",
  //     });
  //   }
  //   const product = await Product.findById(productId);
  //   if (!product) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "Product not found.",
  //     });
  //   }
  //   product?.questions?.push(question);
  //   await product.save();
  //   return res.status(201).json({
  //     success: true,
  //     message: "Question added successfully.",
  //     question,
  //   });
  // } catch (error) {
  //   console.error("Error asking question:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Failed to ask question.",
  //     error: error.message,
  //   });
  // }
};

module.exports = {
  getAllProperty,
  getLatestProducts,
  askQuestion,
  getAllCategories,
  searchProducts,
  getProductsByCategory,
  createProperty,
  deleteProduct,
  updateProduct,
  getProductById,
};
