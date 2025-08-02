import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Filtersidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        category: "",
        gender: "",
        color: [],
        size: [],
        material: [],
        brand: [],
        price: 100,
        search:""
    });

    const category = ["Top wear", "Bottom wear"];
    const color = ['red', 'blue', 'black', 'green', "yellow", "gray", "white", "pink", "navy"];
    const size = ["xs", "s", "m", "l", "xl", "xxl"];
    const material = ["cotton", "wool", "denim", "polyester", "silk", "linen", "viscose", "fleece"];
    const brand = ['Urband Threads', 'Modern Fit', 'Street Style', 'Beach Breeze', 'Fashionista', 'ChicStyle'];
    const gender = ["men", "women"];

    // Load from query params
    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);

        setFilter({
            search:params.search||"",
            category: params.category || "",
            gender: params.gender || "",
            color: params.color ? params.color.split(",") : [],
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            price: params.price ? parseInt(params.price) : 100
        });
    }, [searchParams]);

    // Update URL when filters change
    useEffect(() => {
        const query = new URLSearchParams();
                if (filter.search) query.set("search", filter.search);

        if (filter.category) query.set("category", filter.category);
        if (filter.gender) query.set("gender", filter.gender);
        if (filter.color.length) query.set("color", filter.color.join(","));
        if (filter.size.length) query.set("size", filter.size.join(","));
        if (filter.material.length) query.set("material", filter.material.join(","));
        if (filter.brand.length) query.set("brand", filter.brand.join(","));
        if (filter.price !== 100) query.set("price", filter.price);

        navigate({
            pathname: "/collections",
            search: `?${query.toString()}`
        });
    }, [filter]);

    function handlefilterchange(e) {
        const { name, value, checked, type, tagName } = e.target;

        // Handle color button
        if (tagName === "BUTTON" && name === "color") {
            e.preventDefault();
            setFilter((prev) => {
                const newColors = prev.color.includes(value)
                    ? prev.color.filter(c => c !== value)
                    : [...prev.color, value];
                return { ...prev, color: newColors };
            });
            return;
        }

        if (type !== "checkbox") {
            setFilter((prev) => ({ ...prev, [name]: value }));
        } else {
            setFilter((prev) => {
                const updated = checked
                    ? [...prev[name], value]
                    : prev[name].filter((v) => v !== value);
                return { ...prev, [name]: updated };
            });
        }
    }

    return (
        <div className="p-4">
            <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>

            {/* Category */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Category</label>
                {category.map((e) => (
                    <div key={e} className='flex items-center mb-1'>
                        <input
                            onChange={handlefilterchange}
                            checked={filter.category === e}
                            value={e}
                            type="radio"
                            name="category"
                            className='mr-4 h-4 w-4 text-blue-500'
                        />
                        <span className='text-gray-700'>{e}</span>
                    </div>
                ))}
            </div>

            {/* Gender */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Gender</label>
                {gender.map((e) => (
                    <div key={e} className='flex items-center mb-1'>
                        <input
                            checked={filter.gender === e}
                            onChange={handlefilterchange}
                            value={e}
                            type="radio"
                            name="gender"
                            className='mr-4 h-4 w-4 text-blue-500'
                        />
                        <span className='text-gray-700'>{e.toUpperCase()}</span>
                    </div>
                ))}
            </div>

            {/* Color */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Color</label>
                <div className="flex flex-wrap gap-2">
                    {color.map((e) => (
                        <button
                            key={e}
                            name="color"
                            value={e}
                            onClick={handlefilterchange}
                            className='w-8 h-8 rounded-full border border-black cursor-pointer'
                            style={{
                                backgroundColor: e,
                                outline: filter.color.includes(e) ? "3px solid black" : "none"
                            }}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Size */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Size</label>
                {size.map((e) => (
                    <div key={e} className='flex items-center mb-1'>
                        <input
                            checked={filter.size.includes(e)}
                            onChange={handlefilterchange}
                            value={e}
                            type="checkbox"
                            name="size"
                            className='mr-2 h-4 w-4 text-blue-500'
                        />
                        <span className='text-gray-700'>{e.toUpperCase()}</span>
                    </div>
                ))}
            </div>

            {/* Material */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Material</label>
                {material.map((e) => (
                    <div key={e} className='flex items-center mb-1'>
                        <input
                            checked={filter.material.includes(e)}
                            onChange={handlefilterchange}
                            value={e}
                            type="checkbox"
                            name="material"
                            className='mr-2 h-4 w-4 text-blue-500'
                        />
                        <span className='text-gray-700'>{e.toUpperCase()}</span>
                    </div>
                ))}
            </div>

            {/* Brand */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Brand</label>
                {brand.map((e) => (
                    <div key={e} className='flex items-center mb-1'>
                        <input
                            checked={filter.brand.includes(e)}
                            onChange={handlefilterchange}
                            value={e}
                            type="checkbox"
                            name="brand"
                            className='mr-2 h-4 w-4 text-blue-500'
                        />
                        <span className='text-gray-700'>{e.toUpperCase()}</span>
                    </div>
                ))}
            </div>

            {/* Price */}
            <div className="mb-8">
                <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
                <input
                    onChange={handlefilterchange}
                    type="range"
                    name="price"
                    min="0"
                    max="100"
                    value={filter.price}
                    className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
                />
                <div className='flex justify-between text-gray-600 mt-2'>
                    <span>$0</span>
                    <span>${filter.price}</span>
                </div>
            </div>
        </div>
    );
};

export default Filtersidebar;






// import React, { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router';

// const Filtersidebar = () => {
//     const [searchParams,setSearchParams]=useSearchParams()
//     const navigate=useNavigate()
//     const [filter,setfilter]=useState({
//         category:"",
//         gender:"",
//         color:"",
//         size:[],
//         material:[],
//         brand:[],
//         price:100
//     })
//     const [pricerange,setpricerange]=useState(50)
//     const category=["Top wear","Bottom wear"]
//     const color=[
//         'red',
//         'blue',
//         'black',
//         'green',"yellow",
//         "gray","white","pink","navy"
//     ]
//     const size=["xs","s","m","l","xl","xxl "]
//     const material=[
//         "cotton","wool","denim","polyester","silk","linen","viscose","fleece"
//     ]
//     const brand=['Urband Threads','Modern Fit','Street Style','Beach Breeze','Fashionista','ChicStyle']
//     const gender=["men","women"]
//     useEffect(
//         ()=>{
//             const params=Object.fromEntries([...searchParams])

//             setfilter({
//                 sortby:"",
//                 category:params.category||"",
//                 gender:params.gender||"",
//                 color:params.color||[],
//                 size:params.size?params.size.split(","):[],
//                 material:params.material?params.material.split(","):[],
//                 brand:params.brand?params.brand.split(","):[],
                

//                 price:params.price||100

                

//             })
//         },[searchParams]
//     )

//     function handlefilterchange(e){
//         const {name,value,checked,type}=e.target
//         // Special handling for color buttons if neede
//     // if (e.target.tagName === "BUTTON" && name === "color") {
//     //     setfilter((filter) => {
//     //         const alreadySelected = filter.color.includes(value);
//     //         return {
//     //             ...filter,
//     //             color: alreadySelected
//     //                 ? filter.color.filter((c) => c !== value) // remove
//     //                 : [...filter.color, value], // add
//     //         };
//     //     });
//     //     return;
//     // }
//         if (type!="checkbox"){
//             console.log("d")
//             setfilter((filter)=>({...filter,[name]:value}))
//         }
//         else{
//             if(checked==true){
//             setfilter((filter)=>({...filter,[name]:[...filter[name],value]}))
//                 } 
//                 else{
//             setfilter((filter)=>({...filter,[name]:filter[name].filter(e=>e!==value)}))

//                 }   
//     }

//         // console.log(name,value,checked,type)

        

//     }
    




// useEffect(()=>{
//   const params=new URLSearchParams(filter)
//         navigate(`?${params.toString()}`)

// },[filter])


//     return (
//         <div>
//             <div className="p-4">
//                 <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>
//                {/* caterogeyr */}
//                 <div className="mb-6 ">
//                     <label className='block text-gray-600 font-medium mb-2'> Category</label>
//                     {category.map((e,i)=><div key={e} className='flex items-center mb-1'>
//                         <input onChange={handlefilterchange} checked={filter.category==e} value={e}  type="radio" name="category" className='mr-4 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
//                         <span className='text-gray-700'>{e}</span>

//                     </div>)}
//                 </div>
//                 {/* gender */}
//                  <div className="mb-6 ">
//                     <label className='block text-gray-600 font-medium mb-2'>Gender</label>
//                      {gender.map((e,i)=><div key={e} className='flex items-center mb-1'>
//                         <input checked={filter.gender==e} onChange={handlefilterchange} value={e}  type="radio" name="gender" className='mr-4 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
//                         <span className='text-gray-700'>{e.toUpperCase()}</span>

//                      </div>)}
//                 </div>
          
//             <div className="mb-6">
//                 <label className='block text-gray-600 font-medium mb-2 '>Color</label>
//                 <div className="flex flex-wrap gap-2">
//                     {color.map((e,i)=><button  value={e} onClick={handlefilterchange} className='w-8 h-8 rounded-full border border-black-900 cursor-pointer transition hover:scale-105' name="color" style={{backgroundColor:e.toLowerCase(),border:filter.color==e?"5px double white":""}} key={e}>

//                     </button>)}
//                 </div>
//             </div>
//             {/* size */}
//             <div className="mb-6 ">
//                 <label className='block text-gray-600 font-medium mb-2'>Size</label>
//                 {size.map((e,i)=><div key={e}  className='flex items-center mb-1'>
//                     <input checked={filter.size.includes(e)} onChange={handlefilterchange} value={e} type="checkbox" name="size" className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 '></input>
//                     <span className='text-gray-700'>{e.toUpperCase()}</span>
//                 </div>)}
//             </div>
//             {/* material */}
//             <div className="mb-6 ">
//                 <label className='block text-gray-600 font-medium mb-2'>Material</label>
//                 {material.map((e,i)=><div key={e} className='flex items-center mb-1'>
//                     <input checked={filter.material.includes(e)} onChange={handlefilterchange} value={e} type="checkbox" name="material" className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 '></input>
//                     <span className='text-gray-700'>{e.toUpperCase()}</span>
//                 </div>)}
//             </div>
//             {/* brand */}
//             <div className="mb-6 ">
//                 <label className='block text-gray-600 font-medium mb-2'>Brand</label>
//                 {brand.map((e,i)=><div key={e} className='flex items-center mb-1'>
//                     <input checked={filter.brand.includes(e)} onChange={handlefilterchange} value={e} type="checkbox" name="brand" className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 '></input>
//                     <span className='text-gray-700'>{e.toUpperCase()}</span>
//                 </div>)}
//             </div>
//     {/* price */}
//     <div className="mb-8">
//         <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Price Range</label>
//         <input onChange={(e)=>{handlefilterchange(e)}}  type="range" name="price" min="0" max="100"  value={filter.price} className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' />
//    <div className='flex justify-between text-gray-600 mt-2'>
//     <span>$0</span>
//     <span>${filter.price}</span>
//    </div>
//     </div>
//             </div>
//         </div>
//     );
// }

// export default Filtersidebar;
