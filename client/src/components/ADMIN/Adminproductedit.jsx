// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';

// const Adminproductedit = () => {
//     const dispatch =useDispatch()
//     const navigate=useNavigate()
//     const {user}=useSelector(state=>state.auth)
    
//     const [currdata,setcurrdata]=useState({
//         name:"",description:"",price:"",countInStock:0,sku:"",size:[],color:[],images:[{
//             url:"https://picsum.photos/150?random=13"
//         },
//         {
//             url:"https://picsum.photos/150?random=203"
//         },
//         {
//             url:"https://picsum.photos/150?random=3"
//         }
    
    
//     ]
//     })
//     useEffect(()=>{
//         if(user?.role=="admin"){


//         }
//         else{
//             navigate("/")
//         }

//     },[dispatch])
//     function handlechange(e){

//         const {name,value}=e.target
//         setcurrdata(s=>({...s,[name]:value}))
//     }
//      async function handleimageupload(e){
//         const  file=e.target.files[0]
//         console.log(file)
//      }
//      function handlesubmit(e){
//         e.preventDefault()
//         console.log("d",e)
//      }
//     return (
//         <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md '>
//             <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
//             <form onSubmit={handlesubmit}>
//                 {/* name */}
//                 <div className="mb-6 ">
//                     <label htmlFor="" className='block font-semibold mb-2'>Product Name</label>
//                     <input type="text" name="name" value={currdata.name} onChange={handlechange}  className='border border-gray-300 rounded-md p-2' required/>
//                 </div>
//                 {/* description */}
//                  <div className="mb-6 ">
//                     <label htmlFor="" className='block font-semibold mb-2'>Product Name</label>
//                     <textarea name="description" onChange={handlechange} value={currdata.description} className='w-full border border-gray-300 rounded-md p-2' rows={4} required></textarea>
//                 </div>
//                 {/* price */}
// <div className="mb-6">
//     <label htmlFor="" className='block font-semibold mb-2 '>Price</label>
//     <input type="number" name="price" value={currdata.price} onChange={handlechange} className='w-full border border-gray-300 rounded-md p-2'/>
// </div>
// {/* countinstock */}
// <div className="mb-6">
//     <label htmlFor="" className='block font-semibold mb-2 '>CountInStock</label>
//     <input type="number" name="countInStock" value={currdata.countInStock} onChange={handlechange} className='w-full border border-gray-300 rounded-md p-2'/>
// </div>
// {/* sku */}
// <div className="mb-6">
//     <label htmlFor="" className='block font-semibold mb-2 '>SKU</label>
//     <input type="text" name="sku" value={currdata.sku} onChange={handlechange} className='w-full border border-gray-300 rounded-md p-2'/>
// </div>
// {/* sizes */}
// <div className="mb-6">
//     <label htmlFor="" className='block font-semibold mb-2 '>Sizes (comma-seperated)</label>
//     <input type="text" name="size" value={currdata.size} onChange={(e)=>setcurrdata((s)=>({...s,[e.target.name]:e.target.value.split(",").map(e=>e.trim())}))} className='w-full border border-gray-300 rounded-md p-2'/>
// </div>
// {/* colors */}
// <div className="mb-6">
//     <label htmlFor="" className='block font-semibold mb-2 '>Colors (comma-seperated)</label>
//     <input type="text" name="color" value={currdata.color} onChange={(e)=>setcurrdata((s)=>({...s,[e.target.name]:e.target.value.split(",").map(e=>e.trim())}))} className='w-full border border-gray-300 rounded-md p-2'/>
// </div>
// {/* img */}
// <div className="mb-6">
//     <label className='block font-semibold mb-2 '>Upload Image</label>
//     <input type="file" onChange={handleimageupload} />
//     <div className="flex gap-4 mt-4">
//         {currdata.images.map((e,i)=><div key={i}>
//             <img src={e.url} alt="productimage" className='w-20 h-20 object-cover rounded-md shadow-md' />
//         </div>)}
//     </div>
// </div>
// <button type="submit" className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors'>Update Product</button>

//             </form>
//         </div>
//     );
// }

// export default Adminproductedit;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../../redux/slices/adminProductsSlice';

const Adminproductedit = () => {
    const [newImageUrl, setNewImageUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const { products } = useSelector(state => state.adminProduct);

  const productToEdit = products.find(p => p._id === id);

  const [currdata, setcurrdata] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: 0,
    sku: "",
    size: [],
    color: [],
    images: []
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (productToEdit) {
      setcurrdata({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        price: productToEdit.price || "",
        countInStock: productToEdit.countInStock || 0,
        sku: productToEdit.sku || "",
        size: productToEdit.sizes || [],
        color: productToEdit.colors || [],
        images: productToEdit.images || []
      });
    }
  }, [productToEdit]);

  function handlechange(e) {
    const { name, value } = e.target;
    setcurrdata(prev => ({ ...prev, [name]: value }));
  }

  function handlesubmit(e) {
    e.preventDefault();
    const payload = {
      ...currdata,
      sizes: currdata.size,
      colors: currdata.color
    };
    dispatch(updateProduct({ id, data: payload })).then(() => {
      navigate("/admin/products");
    });
  }

  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md '>
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handlesubmit}>
        {/* name */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Product Name</label>
          <input type="text" name="name" value={currdata.name} onChange={handlechange} className='border border-gray-300 rounded-md p-2 w-full' required />
        </div>
        {/* description */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Description</label>
          <textarea name="description" value={currdata.description} onChange={handlechange} className='w-full border border-gray-300 rounded-md p-2' rows={4} required />
        </div>
        {/* price */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Price</label>
          <input type="number" name="price" value={currdata.price} onChange={handlechange} className='w-full border border-gray-300 rounded-md p-2' />
        </div>
        {/* stock */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Stock</label>
          <input type="number" name="countInStock" value={currdata.countInStock} onChange={handlechange} className='w-full border border-gray-300 rounded-md p-2' />
        </div>
        {/* sku */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>SKU</label>
          <input type="text" name="sku" value={currdata.sku} onChange={handlechange} className='w-full border border-gray-300 rounded-md p-2' />
        </div>
        {/* size */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
          <input type="text" name="size" value={currdata.size.join(", ")} onChange={(e) => setcurrdata(s => ({ ...s, size: e.target.value.split(",").map(x => x.trim()) }))} className='w-full border border-gray-300 rounded-md p-2' />
        </div>
        {/* color */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Colors (comma-separated)</label>
          <input type="text" name="color" value={currdata.color.join(", ")} onChange={(e) => setcurrdata(s => ({ ...s, color: e.target.value.split(",").map(x => x.trim()) }))} className='w-full border border-gray-300 rounded-md p-2' />
        </div>
        {/* images */}
        {/* Image URL Management */}
<div className="mb-6">
  <label className="block font-semibold mb-2">Add Image URL</label>
  <div className="flex gap-2 mb-2">
    <input
      type="text"
      value={newImageUrl}
      onChange={(e) => setNewImageUrl(e.target.value)}
      placeholder="https://example.com/image.jpg"
      className="flex-1 border border-gray-300 rounded-md p-2"
    />
    <button
      type="button"
      onClick={() => {
        if (newImageUrl.trim()) {
          setcurrdata((prev) => ({
            ...prev,
            images: [...prev.images, { url: newImageUrl.trim() }]
          }));
          setNewImageUrl("");
        }
      }}
      className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
    >
      Add
    </button>
  </div>

  {/* Preview Uploaded URLs */}
  <div className="flex gap-4 flex-wrap">
    {currdata.images.map((img, index) => (
      <div key={index} className="relative group">
        <img
          src={img.url}
          alt={`product-${index}`}
          className="w-20 h-20 object-cover rounded shadow"
        />
        <button
          type="button"
          onClick={() =>
            setcurrdata((prev) => ({
              ...prev,
              images: prev.images.filter((_, i) => i !== index)
            }))
          }
          className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div>

        <button type="submit" className='w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition'>Update Product</button>
      </form>
    </div>
  );
};

export default Adminproductedit;
