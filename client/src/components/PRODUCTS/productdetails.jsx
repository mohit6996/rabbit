import { useState } from 'react';
import { toast } from 'sonner';
import Productgrid from './productgrid';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductDetail, fetchSimilarProducts } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
const maxq = 5;

// const selectedProduct = {
//   name: "Stylish Jacket",
//   price: 120,
//   OriginalPrice: 130,
//   description: "This is a stylish jacket perfect for any occasion.",
//   brand: "FashionBrand",
//   material: "Leather",
//   Sizes: ["S", "M", "L", "XL"],
//   colors: ["red", "black"],
//   images: [
//     {
//       url: 'https://picsum.photos/500/500?random=1',
//       altText: "Stylish Jacket",
//     },
//     {
//       url: 'https://picsum.photos/500/500?random=2',
//       altText: "Stylish Jacket",
//     },
//   ]
// };

// const similarproducts=[
//   {
//     _id: 1,
//     name: "Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=2" }]
//   },
//   {
//     _id: 2,
//     name: "Product 2",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=3" }]
//   },
//   {
//     _id: 3,
//     name: "Product 3",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=4" }]
//   },
//   {
//     _id: 4,
//     name: "Product 4",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=5" }]
//   },

// ]



const Productdetails = ({productid}) => {
  const {id}=useParams()
  const dispatch=useDispatch()
  const {selectedProduct,loading,error,similarProducts}=useSelector((state)=>{ return state.product})

  const {guestId,user}=useSelector((state)=>state.auth)
  const [mimg, setmimg] = useState(null);
  const [size, setsize] = useState("");
  const [color, setcolor] = useState("");
  const [quantity, setquantity] = useState(1);
  const productfetchid=productid||id
console.log(similarProducts,"fgfdf")

  useEffect(()=>{
    if(productfetchid){
      dispatch(fetchProductDetail(productfetchid))
      dispatch(fetchSimilarProducts({id:productfetchid}))

    }
  },[dispatch,productfetchid])

  useEffect(() => {
  if (selectedProduct?.images?.[0]?.url) {
    setmimg(selectedProduct.images[0].url);
  }
}, [selectedProduct]);

  useEffect(() => {
    if (productfetchid) {
      dispatch(fetchSimilarProducts(productfetchid));
    }
  }, [dispatch, productfetchid]);



  function handleaddtocart(e) {
    e.preventDefault();
    if (color === "" || size === "") {
      toast.error("Please select the color and size before adding to cart", { duration: 1000 });
    } else {
      console.log("cartdata",productfetchid,quantity,size,color,guestId,user)
      dispatch(addToCart({
        productId:productfetchid,quantity,size,color,guestId,user
      })).then(
        toast.success("product added to the cart",{duration:1000})
      )
      // Optionally reset
      setcolor("");
      setsize("");
      setquantity(1);
    }
  }
  if(loading) return <p  className='text-center'>loading.....</p>
  if(error) return <p className='error'>{error}</p>

  return (
    <div className="p-6">
      {selectedProduct ?(
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          
          {/* Left thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((e, i) => (
              <img
                key={i}
                src={e.url}
                alt={e.altText || 'Thumbnail'}
                className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${
                  e.url === mimg ? 'border-4 border-black' : 'border-gray-900'
                }`}
                onClick={() => setmimg(e.url)}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                className="w-full h-auto object-cover rounded-lg"
                src={mimg}
                alt="Selected product image"
              />
            </div>

            {/* Mobile thumbnails */}
            <div className="md:hidden flex overflow-x-auto space-x-4 mb-4">
              {selectedProduct.images.map((e, i) => (
                <img
                  key={i}
                  src={e.url}
                  alt={e.altText || 'Thumbnail'}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${
                    e.url === mimg ? 'border-4 border-black' : 'border-gray-900'
                  }`}
                  onClick={() => setmimg(e.url)}
                />
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.OriginalPrice && `${selectedProduct.OriginalPrice}`}
            </p>
            <p className="text-xl text-gray-800 mb-2">{selectedProduct.price}</p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Color options */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((e, i) => (
                  <button
                    key={i}
                    onClick={() => setcolor(e)}
                    className={`w-8 h-8 rounded-full border ${
                      color === e ? 'border-[3px] border-dotted border-gray-500 p-4' : ''
                    }`}
                    style={{ backgroundColor: e }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size options */}
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((e, i) => (
                  <button
                    key={i}
                    onClick={() => setsize(e)}
                    className={`px-4 py-2 rounded border ${
                      size === e ? 'text-white bg-black' : ''
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  disabled={quantity === 1}
                  onClick={() => setquantity(quantity - 1)}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  disabled={quantity === maxq}
                  onClick={() => setquantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={color === "" || size === ""}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 cursor-pointer ${
                color === "" || size === ""
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-900"
              }`}
              onClick={handleaddtocart}
            >
              ADD TO CART
            </button>

            {/* Characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
         
        </div>
         <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
         <Productgrid products={similarProducts} loading={loading} error={error} ></Productgrid>
          </div>
      </div>):""}
    </div>
  );
};

export default Productdetails;
