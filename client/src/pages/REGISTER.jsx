// import React from 'react';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router';
// import register from "../assets/register.webp"
// import { registerUser } from '../../../server/data/slices/authSlice';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { toast } from 'sonner';
// const REGISTER = () => {
//     const dispatch=useDispatch()
//     const navigate=useNavigate()
//     const [email,setemail]=useState("")
//     const [name,setname]=useState("")
//     const {user,loading,error}=useSelector((s)=>s.auth)
//    if(error){
//           toast.error(error || "Something went wrong")
    
//    }

//     const [pass,setpass]=useState("")
//     function handlesubmit(e){
//         e.preventDefault()
        
//             dispatch(registerUser({email,name,password:pass}))

//     }
//     return (
//         <div className="flex ">
//             <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
//             <form onSubmit={handlesubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
//                 <div className="flex justify-center mb-6 ">
//                     <h2 className="text-xl font-medium">rabbit</h2>
//                 </div>
//                 <h2 className="text-2xl font-bold text-center mb-6 ">Hey there! </h2>
//                 <p className="text-center mb-6">
//                     Enter your Email and Passowrd to login
//                 </p>
//                 <div className="mb-4">
//                     <label className='block text-sm font-semibold mb-2 '>Name</label>
//                     <input placeholder='Enter Your Name' className='w-full p-2 border rounded' type="text" value={name} onChange={(e)=>setname(e.target.value)}>
//                     </input>
//                 </div>
//                 <div className="mb-4">
//                     <label className='block text-sm font-semibold mb-2 '> Email</label>
//                     <input placeholder='Enter Your email Address' className='w-full p-2 border rounded' type="email" value={email} onChange={(e)=>setemail(e.target.value)}>
//                     </input>
//                 </div>
//                 <div className="mb-4">
//                     <label className='block text-sm font-semibold mb-2 '>Passsword</label>
//                     <input className='w-full p-2 border rounded' placeholder="Enter Your Password" type="password" value={pass} onChange={(e)=>setpass(e.target.value)} />


//                 </div>
                
//                 <button type="submit" className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 ' >Sign Up</button>
//                 <p className="mt-6 text-center text-sm">
//                     Already have an Account?<Link to="/login" className='text-blue-500'>Register</Link>
//                 </p>
//                 </form>
//                 </div>
//                 {/* right side */}
//                 <div className="hidden  md:block w-1/2  bg-gray-800">
//                     <div className="h-full flex flex-col justify-center items-center">
//                         <img src={register} alt="Login to Account" className=" h-[750px] w-full object-cover" />
//                     </div>
//                 </div>
//         </div>
//     );
// }

// export default REGISTER;



import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // ⛔ fix: use `react-router-dom`
import register from "../assets/register.webp";
import { registerUser } from '../redux/slices/authSlice';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const REGISTER = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [pass, setpass] = useState("");

  const { user, loading, error } = useSelector((s) => s.auth);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong");
    }

    if (user) {
      navigate(isCheckoutRedirect ? "/checkout" : "/");
    }
  }, [error, user, isCheckoutRedirect, navigate]);

  function handlesubmit(e) {
    e.preventDefault();
    dispatch(registerUser({ email, name, password: pass }));
  }

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handlesubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
          <div className="flex justify-center mb-6 ">
            <h2 className="text-xl font-medium">rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 ">Welcome!</h2>
          <p className="text-center mb-6">
            Enter your details to create an account
          </p>
          <div className="mb-4">
            <label className='block text-sm font-semibold mb-2 '>Name</label>
            <input placeholder='Enter Your Name' className='w-full p-2 border rounded' type="text" value={name} onChange={(e) => setname(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className='block text-sm font-semibold mb-2 '> Email</label>
            <input placeholder='Enter Your email Address' className='w-full p-2 border rounded' type="email" value={email} onChange={(e) => setemail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className='block text-sm font-semibold mb-2 '>Password</label>
            <input className='w-full p-2 border rounded' placeholder="Enter Your Password" type="password" value={pass} onChange={(e) => setpass(e.target.value)} />
          </div>
          <button type="submit" className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800'>
            Sign Up
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an Account?
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'> Login</Link>
          </p>
        </form>
      </div>

      {/* right side */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img src={register} alt="Register" className="h-[750px] w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default REGISTER;
