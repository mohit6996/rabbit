// const checkout={
//     _id:"12323",
//     createdAt:new Date(),
//     // checkoutItems:[
//     //     {
//     //         productId:"1",
//     //         name:"Jacket",
//     //         color:"black",
//     //         size:"M",
//     //         price:"150",
//     //         quantity:1,
//     //         image:"https://picsum.photos/150?random=33"
//     //     }, {
//     //         productId:"2",
//     //         name:"Jacket",
//     //         color:"black",
//     //         size:"M",
//     //         price:"150",
//     //         quantity:1,
//     //         image:"https://picsum.photos/150?random=43"
//     //     }
//     // ],
//     shippingAddress:{
//         address:"123 Fashion Street",
//         city:"New York",
//         country:"USA"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearCart } from "../redux/slices/cartSlice";

    
//     }
// }
const Orderconfirmation = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {checkout}=useSelector(state=>state.checkout)
    useEffect(()=>{
        if(checkout&&checkout._id){
            dispatch(clearCart())
        }
        else{
            navigate("/order/")
        }
    },[dispatch,checkout])
    function calculatedEstimatedDelivery(createdAt){
        const orderdate=new Date(createdAt)
        orderdate.setDate(orderdate.getDate()+10);
    return orderdate.toLocaleDateString()
    }
    return (
        <div className="max-4xl mx-auto p-6 bg-white">
            <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
                Thank You for Your Order!
            </h1>
            {checkout&&<div className="p-6 rounded-lg border w-[70%] m-auto">
                <div className="flex justify-between mb-20">
                    <div className="">
                        <h2 className="text-xl font-semibold">Order Id:{checkout._id}</h2>
                        <p className="text-gray-500">Order Date:{new Date(checkout.createdAt).toLocaleDateString()}</p>

                    </div>
                    <div>
                        <p className="text-emerald-700 tetx-sm">
                            Estimated Delivery:{calculatedEstimatedDelivery(checkout.createdAt)}
                        </p>
                    </div>
                </div>
                <div className="mb-20 mx-10 ">
                    {checkout.checkoutItems.map((e,i)=><div key={e.productId} className="flex items-center mb-4 bg-gray-100" >
                        <img src={e.image} alt={e.name} className="w-16 h-16 object-cover rounded-md mr-4"></img>
                        <div>
                            <h4 className="text-md font-semi-bold">{e.name}</h4>
                            <p className="text-sm text-gray-500">{e.color}|{e.size}</p>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-md">${e.price}</p>
                            <p className="text-sm tetx-gray-500">QTY:{e.quantity}</p>
                        </div>
                    </div>)}
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Payment</h4>
                        <p className="text-gray-600">PayPal</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2"> Delivery</h4>
                        <p className="text-gray-600">{checkout.shippingAddress.address}</p>
                        <p className="text-gray-600">{checkout.shippingAddress.city}{", "}{checkout.shippingAddress.country}</p>
                    </div>
                </div>
                </div>}
        </div>
    );
}

export default Orderconfirmation;
