import React from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';

const Cartcontents = ({cart,userId,guestId}) => {
    // const cartproduct=[
    //     {productid:1,
    //         name:"tshirt",
    //         size:"m",
    //         color:"red",
    //         quantity:1,
    //         price:15,
    //         image:"https://picsum.photos/200?random=1"
    //     },
    //     {productid:1,
    //         name:"blouse",
    //         size:"lg",
    //         color:"red",
    //         quantity:3,
    //         price:21,
    //         image:"https://picsum.photos/200?random=20"
    //     },{productid:2,
    //         name:"jeans",
    //         size:"lg",
    //         color:"black",
    //         quantity:1,
    //         price:25,
    //         image:"https://picsum.photos/200?random=21"
    //     }
    // ]
    const dispatch=useDispatch()
    const handleAddToCart=(productId,delta,quantity,size,color)=>{
        const newquantity=quantity+delta
        if(newquantity>=1){

            dispatch(updateCartItemQuantity({

                productId,quantity:newquantity,guestId,userId,size,color
            }))
        }
    }

    const handleRemoveFromCart=(productId,size,color)=>{
        console.log("d")
        dispatch(removeFromCart({productId,guestId,userId:userId.id,size,color}))
    }



    return (
        <div>
            {
        cart.products.map((e,i)=><div key={i} className='flex items-start justify-between py-4 border-b'>
            <div className='flex items-center'>
                <img src={e.image} alt={e.name} className='w-20 h-24 object-cover mr-4  rounded '></img>
                <div>
                        <h3>{e.name}</h3>
                        <p className='text-sm text-gray-500 text-bold'>
                            Size: {e.size}  |  Color: {e.color}
                        </p>
                        <div className='flex items-center mt-2'>
                            <button onClick={()=> handleAddToCart(e.productId,-1,e.quantity,e.size,e.color,userId,guestId)}  className='border rounded px-3 py-1 text-xl font-medium'>-</button>
                            {e.quantity}
                            <button onClick={()=> handleAddToCart(e.productId,1,e.quantity,e.size,e.color,userId,guestId)} className='border rounded px-2.5 py-1 text-xl font-medium'>+</button>

                            </div>
                    </div>


                </div>
                <div className=''>
                    <p>
                        ${e.price.toLocaleString()}
                    </p>

                        <button onClick={()=>handleRemoveFromCart(e.productId,e.size,e.color)}>
                            <RiDeleteBin3Line className='w-6 h-6 mt-2 text-red-600'></RiDeleteBin3Line>
                        </button>

                    </div>
            </div>

               
       
    )
}

</div>
    )


}

export default Cartcontents;
