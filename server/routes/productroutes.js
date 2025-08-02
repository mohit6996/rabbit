import express from "express";
import jwt from "jsonwebtoken";
import Product from "../models/products.js";
import protect, { checkadmin } from "../middleware/authmiddleware.js";

// adjust path as needed

const router = express.Router();

// ✅ Create Product - Protected Route (Admin)
router.post("/create",protect,checkadmin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      size,
      color,
      collection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      size,
      color,
      collection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      user: req.user._id // ✅ Set user from auth middleware
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the product"
    });
  }
});


router.put("/:id", protect, checkadmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      size,
      color,
      collection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions
    } = req.body;

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInStock = countInStock || product.countInStock;
    product.sku = sku || product.sku;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.sizes = size || product.sizes;
    product.colors = color || product.colors;
    product.collection = collection || product.collection;
    product.material = material || product.material;
    product.gender = gender || product.gender;
    product.images = images || product.images;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
    product.rating = rating || product.rating;
    product.numReviews = numReviews || product.numReviews;
    product.tags = tags || product.tags;
    product.metaTitle = metaTitle || product.metaTitle;
    product.metaDescription = metaDescription || product.metaDescription;
    product.metaKeywords = metaKeywords || product.metaKeywords;
    product.dimensions = dimensions || product.dimensions;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

//delete by id product

router.delete("/:id",protect,checkadmin,async (req,res)=>{
    try{
        
        const oldproduct=await Product.findById(req.params.id)
        if(!oldproduct){
            return res.status(404).json({sucess:false,message:"not found"})
        }
        await oldproduct.deleteOne()
        res.status(200).json({success:true,message:"the product is deleted"})


    }
    catch(e){
        console.error(e)
        res.status(500).json({success:false,message:"server error"})
    }
})
//get all product
// router.get("/getallproducts",async (req,res)=>{
//     try{
// const {
//       collection,
//       size,
//       color,
//       minPrice,
//       maxPrice,
//       search,
//       category,
//       material,
//       brand,
//       gender,
      
//     } = req.query;    
//         let query={}
//         if (collection && collection.toLowerCase() !== "all") {
//           console.log(collection)
//       query.collection = collection;
//     }
//        console.log(collection)

//     // Category filter
//     if (category && category.toLowerCase() !== "all") {
//       query.category = category;
//     }

//     // Material filter (comma-separated string → array)
//     if (material) {
//       query.material = { $in: material.split(",") };
//     }

//     // Brand filter
//     if (brand) {
//       query.brand = { $in: brand.split(",") };
//     }

//     // Size filter
//     if (size) {
//       query.size = { $in: size.split(",") };
//     }

//     // Color filter
//     if (color) {
//       query.colors = { $in: color.split(",") }; // assumes colors is an array in DB
//     }

//     // Gender filter
//     if (gender && gender.toLowerCase() !== "all") {
//       query.gender = gender;
//     }

//     // Price range filter
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = parseFloat(minPrice);
//       if (maxPrice) query.price.$lte = parseFloat(maxPrice);
//     }

//     // Search by name or description
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//       ];
//     }
//     const products=await Product.find(query)
//     res.status(200).json({success:true,message:"fetching is done",data:products})


//     }catch(e){
//         console.error(e)
//         res.status(500).json({success:false,message:"server error"})

//     }
// })
router.post("/getallproducts", async (req, res) => {
// console.log("Filters:", JSON.stringify(req.query, null, 2));
console.log(req.body)

  try {
    const {
      collection,
      size,
      color,
      price,
      search,
      category,
      material,
      brand,
      gender
    } = req.body.queryParams?req.body.queryParams:req.body;

    const normalizeArray = (value) => {
      if (!value) return [];
      return Array.isArray(value) ? value : value.split(",");
    };

    let query = {};
    if (collection && collection.toLowerCase() !== "all") {
  query.collection = { $regex: `^${collection}$`, $options: "i" };
}

if (category && category.toLowerCase() !== "all") {
  query.category = { $regex: `^${category}$`, $options: "i" };
}

if (material) {
  query.material = { $in: normalizeArray(material).map(v => new RegExp(`^${v}$`, "i")) };
}

if (brand) {
  query.brand = { $in: normalizeArray(brand).map(v => new RegExp(`^${v}$`, "i")) };
}

if (size) {
  query.sizes = { $in: normalizeArray(size).map(v => new RegExp(`^${v}$`, "i")) };
}

if (color) {
  query.colors = { $in: normalizeArray(color).map(v => new RegExp(`^${v}$`, "i")) };
}

if (gender && gender.toLowerCase() !== "all") {
  query.gender = { $regex: `^${gender}$`, $options: "i" };
}


    // if (collection && collection.toLowerCase() !== "all") {
    //   query.collection = collection;
    // }
   

    // if (category && category.toLowerCase() !== "all") {
    //   query.category = category;
    // }

    // if (material) {
    //   query.material = { $in: normalizeArray(material) };
    // }

    // if (brand) {
    //   query.brand = { $in: normalizeArray(brand) };
    // }

    // if (size) {
    //   query.size = { $in: normalizeArray(size) };
    // }

    // if (color) {
    //   query.colors = { $in: normalizeArray(color) };
    // }

    // if (gender && gender.toLowerCase() !== "all") {
    //   query.gender = gender;
    // }

    if (price) {
  query.price = { $lte: Number(price) }; // Convert to number first
}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    
const products = await Product.find(query); 
// console.log(products,"products")


    res.status(200).json({ success: true, message: "fetching is done", data: products });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "server error" });
  }
});

//getsingle product
router.get("/getproduct/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id)
        if(!product) return res.status(404).json({message:"not found"})
        res.status(200).json({
            data:product
        })

    }
    catch(e){
        console.error(e)
        res.send({message:"server erro"})

    }

})
//similar producst 
router.get("/getsimilarto/:id",async(req,res)=>{
    try{
        const product= await Product.findById(req.params.id)
        if(!product){
            return res.json({message:"not found 404"})
        }
        //similar by gender and category

        const similarproducts=await Product.find({_id:{$ne:product._id},category:product.category,gender:product.gender}).limit(4)
        const fi=similarproducts.filter(e=>e._id.toString()!=product._id.toString())
        res.json({data:fi})


    }catch(e){
        console.error(e)
        res.json({messsage:"server error500"})
    }
})
//best seller 
router.get("/bestseller",async(req,res)=>{
    try{
        const bestsellers=await Product.find().sort({rating:-1}).limit(1)
       
        res.json({data:bestsellers})

    }
catch(e){
console.error(e)
res.json({message:"server error"})
}    
})

//newarrivals
router.get("/newarrivals",async(req,res)=>{
    try{
        const newproducts=await Product.find().sort({createdAt:-1}).limit(8)
        res.json({data:newproducts})
    }
    catch(e){
        console.error(e)
        res.json({message:"server error"})
    }

})
export default router;
