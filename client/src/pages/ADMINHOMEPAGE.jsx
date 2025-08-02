import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { fetchAdminOrders } from '../redux/slices/adminOrderSlice';
import { fetchAdminProducts } from '../redux/slices/adminProductsSlice';

const ADMINHOMEPAGE = () => {
  //   const orders=[
  //       {
  //   _id: 123123,
  //   user: { name: "Jhone Doe" },
  //   totalPrice: 110,
  //   status: "Processing"
  // },
  // {
  //   _id: 123124,
  //   user: { name: "Alice Smith" },
  //   totalPrice: 95,
  //   status: "Shipped"
  // },
  // {
  //   _id: 123125,
  //   user: { name: "Bob Johnson" },
  //   totalPrice: 250,
  //   status: "Delivered"
  // },
  // {
  //   _id: 123126,
  //   user: { name: "Eve Williams" },
  //   totalPrice: 180,
  //   status: "Processing"
  // },
  // {
  //   _id: 123127,
  //   user: { name: "Charlie Brown" },
  //   totalPrice: 75,
  //   status: "Cancelled"
  // },
  // {
  //   _id: 123128,
  //   user: { name: "David Lee" },
  //   totalPrice: 300,
  //   status: "Processing"
  // },
  // {
  //   _id: 123129,
  //   user: { name: "Fiona Clark" },
  //   totalPrice: 220,
  //   status: "Shipped"
  // },
  // {
  //   _id: 123130,
  //   user: { name: "George Adams" },
  //   totalPrice: 90,
  //   status: "Delivered"
  // },
  // {
  //   _id: 123131,
  //   user: { name: "Hannah Scott" },
  //   totalPrice: 160,
  //   status: "Processing"
  // },
  // {
  //   _id: 123132,
  //   user: { name: "Ivan Garcia" },
  //   totalPrice: 145,
  //   status: "Shipped"
  // }
  //   ]
  const dispatch=useDispatch()
  const {products,loading:productloading,error:producterror}=useSelector(state=>state.adminProduct)
  
  const {orders,totalOrders,totalSales,loading:orderloading,error:ordererror}=useSelector(state=>state.adminOrder)
  useEffect(()=>{
    dispatch(fetchAdminOrders())
    dispatch(fetchAdminProducts())
  },[dispatch])
  console.log(orders,"orders")
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            {productloading || orderloading ? <p>laoding...</p>:producterror?<p className='text-red-500'>error fetching products:</p>:ordererror?<p className='text-red-500'>error fetching order:{ordererror}</p>:
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className="p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Revenue</h2>
                    <p className="text-2xl ">${totalSales.toFixed(2)}</p>
                </div>
                <div className="p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <p className="text-2xl ">{totalOrders}</p>
                    <Link to="orders" className='text-blue-500 hover:underline '>Manage Orders</Link>
                </div>
                <div className="p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Total Products</h2>
                    <p className="text-2xl ">{products.length}</p>
                    <Link to="products" className='text-blue-500 hover:underline '>Manage Products</Link>

                </div>
            </div>}
            <div className='mt-6'>
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-gray-500">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className='py-3 px-4'>Order ID</th>
                                <th className='py-3 px-4'>User</th>
                                <th className='py-3 px-4'>Total Price</th>
                                <th className='py-3 px-4'>Status</th>
                            </tr>
                        </thead>
                        <tbody>{orders.length>0?(orders.map((e,i)=><tr key={e._id} className='border-b hover:bg-gray-50 cursor=pointer'>
                           <td className='p-4'>{e._id}</td>
                            <td className='p-4'>{e.user.name}</td>
                            <td className='p-4'>{e.totalPrice.toFixed(2)}</td>
                            <td className='p-4'>{e.status}</td>
                        </tr>)):(<tr >
                            <td colSpan={4} className='p-4 text-center text-gray-500'>
                                No Recent Order Found
                            </td>
                        </tr>)}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ADMINHOMEPAGE;
