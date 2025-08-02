import axios from 'axios';
import  { useEffect,useState } from 'react';
import { Link } from 'react-router';
// const newArray=[{
//     _id:"1",
//     name:"stylish Jacket",
//     price:120,
//     images:[{
//         url:"https://picsum.photos/500/500?random=1",
//         altText:"Stylish Jacket"
//     }]
// },
// {
//     _id:"2",
//     name:"stylish Jacket",
//     price:120,
//     images:[{
//         url:"https://picsum.photos/500/500?random=2",
//         altText:"Stylish Jacket"
//     }]
// },
// {
//     _id:"3",
//     name:"stylish Jacket",
//     price:120,
//     images:[{
//         url:"https://picsum.photos/500/500?random=3",
//         altText:"Stylish Jacket"
//     }]
// },
// {
//     _id:"4",
//     name:"stylish Jacket",
//     price:120,
//     images:[{
//         url:"https://picsum.photos/500/500?random=4",
//         altText:"Stylish Jacket"
//     }]
// },
// {
//     _id:"5",
//     name:"stylish Jacket",
//     price:120,
//     images:[{
//         url:"https://picsum.photos/500/500?random=5",
//         altText:"Stylish Jacket"
//     }]
// },
// {
//     _id:"6",
//     name:"stylish Jacket",
//     price:120,
//     images:[{
//         url:"https://picsum.photos/500/500?random=6",
//         altText:"Stylish Jacket"
//     }]
// },
// {
//     _id:"7",
//     name:"stylish Jacket",
//     price:120,
//     images:[{
//         url:"https://picsum.photos/500/500?random=7",
//         altText:"Stylish Jacket"
//     }]
// },
// {
//     _id:"8",
//     name:"stylish Jacket",
//     price:120,
//     images:[{
//         url:"https://picsum.photos/500/500?random=8",
//         altText:"Stylish Jacket"
//     }]
// }]
const Newarrivals = () => {
    const [newArray,setnewArray]=useState([])

    useEffect(()=>{
        const fetchNewArrivals=async()=>{
            try{

                const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/newarrivals`)
                setnewArray(res.data.data)
            }
            catch(e){
                console.log(e)

            }
        }
fetchNewArrivals()
    },[])
    
    return (
      <section className='py-16 px-4 lg:px-0'>
        <div className='mx-auto text-center mb-10 relative'>
            <h2 className='text-3xl font-bold mb-4'> Explore new Arrival's</h2>
            <p className='text-lg text-gray-600 mb-8 '>
                Discover the latest styles straight off the runway, freshlly added to keep your wardrobe on the cutting edge of fashion.
            </p>
            {/* scroll */}
            
        </div>
        {/* scrollable content  */}
        <div className='container mx-auto overflow-x-scroll flex space-x-6 relative'>
            {newArray.map((e,i)=> <div key={e._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                <Link to={`/product/${e._id}`}>
                <img className='w-full h-[500px] object-cover rounded-md' src={e.images[0]?.url} alt={e.images[0]?.altText||e.name} />

<div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-sm text-white p-4 rounded-b-lg '>
    <Link to={`/product/${e._id}`} className="block">
    <h4 className='font-medium'>{e.name}</h4>
    <p  className='mt-1'>{e.price}</p>
    </Link>
</div>
</Link>


            </div> )}

        </div>
      </section>
    );
}

export default Newarrivals;
