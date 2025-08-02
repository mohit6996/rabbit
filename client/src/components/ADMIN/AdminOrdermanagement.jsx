import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchAdminOrders, updateOrder } from '../../redux/slices/adminOrderSlice';

const AdminOrdermanagement = () => {

    const {orders,error,loading}=useSelector(state=>state.adminOrder)
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    // const orders=[{
    //     _id:133,
    //     user:{
    //         name:"john",

    //     },
    //     totalPrice:110,
    //     status:"Processing"
    // }]
    function handlestatuschange(id,data){
        dispatch(updateOrder({id,data}))
    }
    useEffect(()=>{
        if(user?.role=="admin"){
            dispatch(fetchAdminOrders())

        }
        else{
            navigate("/")
        }
    },[dispatch])
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-6 '>Order Management</h2>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className='min-w-fulll tetx-left tetx-gray-500'>
                    <thead className='bg-gray-100 tetx-sx uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>Order ID</th>
                            <th className='py-3 px-4'>Customer</th>
                            <th className='py-3 px-4'>Total Price</th>
                            <th className='py-3 px-4'>Status</th>
                            <th className='py-3 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length>0?(orders.map((e,i)=><tr key={e._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                            <td className='py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>{e._id}</td>
                            <td className='p-4'>{e.user.name}</td>
                            <td className='p-4'>{e.totalPrice}</td>
                            <td className='p-4'>
                                <select value={e.status} onChange={(ee)=>handlestatuschange(e._id,ee.target.value  )} className='bg-gray-50 border border-gray-300 text-gray-900 tetx-sm rounded foucus:ring-blue-500 focus:border-blue-500 block p-2.5' >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                            <td className='p-4'></td>
                            <td className='p-4'>
                                <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600' onClick={()=>handlestatuschange(e._id,"Delivered")}>
                                    Mark As Delivered
                                </button>
                            </td>
                        </tr>)):(<tr>
                            <td colSpan={5} className='p-4 text-center text-gray-500'>
                                No Orders found.

                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminOrdermanagement;
