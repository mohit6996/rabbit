import mongoose from "mongoose";
import User from "./users.js"; // Added `.js` if using ESModules

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  sku: { // Changed from `Sku` to `sku` for consistency
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  sizes: {
    type: [String],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  collections: {
    type: String,
    required: true
  },
  material: {
    type: String
  },
  gender: {
    type: String,
    enum: ["Men", "Women", "Unisex"]
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      alt: {
        type: String
      }
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  tags: [String],
  
  // 📌 Reference to the user who created or owns the product
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // SEO fields
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  metaKeywords: { // Changed to camelCase `metaKeywords`
    type: String
  },

  // Physical dimensions
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number
  }
}, { timestamps: true });
const  Product =mongoose.model("Product", productSchema);
export default Product
