import React, { useEffect } from 'react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Cartcontents from '../CART/Cartcontents';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/slices/cartSlice';
const Cartdrawer = ({iscartopen,handlecarttoggle}) => {
  const {user,guestId}=useSelector(state=>state.auth)
  const {cart}=useSelector(state=>state.cart)

  
    
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
    function handlecheckout(){
      handlecarttoggle()
      if(!user){
        navigate("/login?redirect=checkout")
      }
      else{
       navigate("/checkout")}
    }
   useEffect(()=>{
    const userId=user?.id
    dispatch(fetchCart({userId,guestId}))
    
    

   },[user,guestId])
    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-2/4 lg:w-2/6 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${iscartopen?"translate-x-0":"translate-x-full"}`}>
          <div className='flex jusitfy end p-4'>
            <button onClick={handlecarttoggle}>
                <IoMdClose className='h-6 w-6  text-gray-600'></IoMdClose>
            </button>
          </div>
       
       
          <div className='flex-grow p-4 overflow-scroll'>
            <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
            {cart && cart?.products?.length>0?<Cartcontents cart={cart} userId={user} guestId={guestId}></Cartcontents>:<p>Your Cart is Empty</p>}
             

          </div>
            
          <div className='p-4 bg-white sticky bottom-0'>
            {cart && cart?.products?.length>0?        <>  <button className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition' onClick={handlecheckout}>Checkout</button><p className='text-sm tracking-tighter text-gray-500 mt-2 text-center p-y-4 '>
              Shipping taxes, and discount codes calculated at checkout
            </p></> :""}
            
          </div>

          {/* button fixed at bottom  */}
        </div>
    );
}

export default Cartdrawer;
