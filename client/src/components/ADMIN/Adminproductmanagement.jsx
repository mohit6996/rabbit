import { useEffect } from "react"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductsSlice";
const Adminproductmanagement = () => {
    const {products,error,loading}=useSelector((state)=>state.adminProduct)
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.auth)
    const navigate=useNavigate()
    // const products=[
    //     {
    //         _id:123123,
    //         name:"Shirt",
    //         price:110,
    //         sku:"12333221",
    //     }
    // ]

    useEffect(()=>{
        if(user && user.role=="admin"){
            dispatch(fetchAdminProducts())
        }
        else{
            navigate("/")
            
        }
    }
    ,[dispatch])
    function handledeleteproduct(id){
        if(window.confirm("Are you sure you want to delete the Product?")) {
            dispatch(deleteProduct(id))
        }
    }
    return (
        <div className="max-w-7xl mx-auto p-6 ">
            <h2 className='text-2xl font-bold mb-6'>Product Management</h2>
            <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>Name</th>
                            <th className='py-3 px-4'>Price</th>
                            <th className='py-3 px-4'>SKU</th>
                            <th className='py-3 px-4'>Actions</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {products.length>0?(products.map((e,i)=><tr key={e._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                            <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{e.name}</td>
                            <td className='p-4 '>${e.price}</td>
                            <td className='p-4 '>{e.sku}</td>
                            <td className='p-4 '><Link to={`/admin/products/${e._id}/edit`} className="bg-yellow-500 text-white px-2 mr-2 hover:bg-yellow-600 py-1">Edit</Link>
                            <button onClick={()=>handledeleteproduct(e._id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"> delete</button>
                            </td>

                        </tr>)):(<tr>
                            <td colSpan={4} className="p-4 text-center text-gray-500">No Products Found</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Adminproductmanagement;
