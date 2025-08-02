import React, { useEffect } from 'react';
import { Link } from 'react-router';

const Productgrid = ({products,loading,error}) => {
    console.log(products,loading,error)
if(loading){
    return <p> Loadin.....</p>
}
if(error){
  return  <p>{error}</p>
}
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [products]);
    return (
        products&&
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {products.map((e,i)=><Link to={`/product/${e._id}`} className="block " key={i}>
            <div className='bg-white p-4 rounded-lg'>
                <div className="w-full h-96 ">
                    <img src={e.images[0].url} alt={e.images[0].altText||e.name} className='w-full h-full object-cover rounded-lg' />
                </div>

            </div>
            <div className='ml-[30px]'>
            <h3 className='text-sm mb-2'>{e.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">${e.price}</p>
           </div> </Link>)}
        </div>
    );
}

export default Productgrid;
