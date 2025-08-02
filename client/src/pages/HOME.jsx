import React from 'react';
import GenderCollection from '../components/PRODUCTS/GenderCollection';
import Hero from '../components/LAYOUT/hero';
import Newarrivals from '../components/PRODUCTS/newarrivals';
import Productdetails from '../components/PRODUCTS/productdetails';
import Productgrid from '../components/PRODUCTS/productgrid';
import Featuredcollection from '../components/PRODUCTS/featuredcollection';
import FeaturesSection from '../components/PRODUCTS/featuresSection';
import {useDispatch, useSelector} from "react-redux"
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchProductsByFilters } from '../redux/slices/productSlice';
import axios from 'axios';
import { fetchCart } from '../redux/slices/cartSlice';
export const womenproducts=[
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=23" }]
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=32" }]
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=42" }]
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=53" }]
  },
  
  {
    _id: 5,
    name: "Product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=33" }]
  },
  {
    _id: 6,
    name: "Product 2",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=32" }]
  },
  {
    _id: 7,
    name: "Product 3",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=72" }]
  },
  {
    _id: 8,
    name: "Product 4",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=93" }]
  },
]

const HOME = () => {
  const {user,guestId}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const {products,loading,error}=useSelector((state)=>state.product)

  const [bestseller,setbestseller]=useState(null)

  useEffect(()=>{


    
    
      dispatch(fetchProductsByFilters({
        gender:"Women",category:"Bottom Wear",limit:8
      }))

      const bestselle=async()=>{
        try{
          const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/bestseller`)
          setbestseller(response.data.data[0])
        }
        catch(e){
          console.error(e)
        
      }

      }
      bestselle()
      



  
  },[dispatch])

  useEffect(()=>{
    const userId=user?.id
    dispatch(fetchCart({userId,guestId}))
  },[user,guestId])
  
if(loading) return <p className='text-center text-2xl'>loading....</p>
  
    return (
        <div className='text-3xl font-bold'>
            <Hero></Hero>
            <GenderCollection></GenderCollection>
            <Newarrivals></Newarrivals>
            <h2 className="text-3xl text-center font-bold mb-4 ">Best Seller</h2>
            {bestseller?(<Productdetails productid={bestseller._id}></Productdetails>):<p className='text-center'>loaing best seller product..</p>}
            
            <div className="container mx-auto">
                <h2 className='text-3xl text-center font-bold mb-4'>
                    Top Wears fro Women
                </h2>
                <Productgrid products={products} loading={loading} error={error}>

                </Productgrid>
            </div>
                <Featuredcollection></Featuredcollection>
                <FeaturesSection></FeaturesSection>
        </div>
    );
}

export default HOME;
