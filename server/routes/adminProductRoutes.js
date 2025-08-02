import express from "express"
import Product from "../models/products.js"
import protect from "../middleware/authmiddleware.js"
import { checkadmin } from "../middleware/authmiddleware.js"

const router = express.Router()

// 📦 GET all products (admin only)
router.get("/getallproducts", protect, checkadmin, async (req, res) => {
  try {
    const products = await Product.find({})
    res.json({ data: products })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

// 📦 GET single product by ID
router.get("/:id", protect, checkadmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json({ message: "Product found", data: product })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

// 🗑️ DELETE a product
router.delete("/:id", protect, checkadmin, async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    await product.deleteOne()
    res.json({ message: "Product deleted" })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

// 🆕 CREATE a new product
// router.post("/createproduct", protect, checkadmin, async (req, res) => {
//   try {
//     const { name, description, price, category, stock, images } = req.body

//     const newProduct = await Product.create({
//       name,
//       description,
//        price,
//       discountPrice,
//       countInStock,
//       sku,
//       brand,
//       sizes,
//       colrs,
//       collections,
//       material,
//       gender,images,isFeatured,isPublished,

//       
//       category,
      
//       images,
//     })

//     res.status(201).json({ message: "Product created", data: newProduct })
//   } catch (e) {
//     console.error(e)
//     res.status(500).json({ message: "Server error" })
//   }
// })

router.put("/:id", protect, checkadmin, async (req, res) => {
  try {
    const { name, description, price, countInStock, sku, sizes, images, category } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.sku = sku || product.sku;
    product.sizes = sizes || product.sizes;
    product.images = images || product.images;

    await product.save();

    return res.status(202).json({ message: "Product updated", data: product });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});


export default router
