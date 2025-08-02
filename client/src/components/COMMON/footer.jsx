import React, { useState } from 'react';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import {FiPhoneCall} from "react-icons/fi"
import { TbBrandMeta, TbFilePhone } from 'react-icons/tb';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { tosubscribe } from '../../redux/slices/subscribeSlice';


const Footer = () => {
    const dispatch=useDispatch()
    const [email,setemail]=useState("")
    
    function handlesubmit(e){
        e.preventDefault()
        dispatch(tosubscribe(email))
        setemail("")

    }
    return (
       <footer className='border-t py-12 '>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
            <div>
                <h3 className='text-lg mb-4 text-gray-800'>Newsletter</h3>
                <p className='text-gray-500 mb-4'>
                    Be the first to hear about new products , exclusive events and online offers.
                </p>
                <p className='font-medium text-sm text-gray-600 mb-6 '>
                    sign up and get 10% off on your first order

                </p>
                <form onSubmit={handlesubmit} className='flex'>
                    <input value={email} onChange={(e)=>setemail(e.target.value)} type="email"placeholder='Enter your Email' className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus-ring-gray-500 transition-all' required></input>
                    <button type="submit" className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
                </form>
            </div>
            {/* shop links */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Men's Top wear</Link>
                    </li><li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Women's Top wear</Link>
                    </li><li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Men's Bottom wear</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">women's Bottom wear</Link>
                    </li>

                </ul>
            </div>
            {/* support links */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Contact'us</Link>
                    </li><li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">About'us</Link>
                    </li><li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">FASQ</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">Features</Link>
                    </li>

                </ul>
            </div>
            {/* follow us */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                <div className='flex items-center space-x-4 mb-6'>
                    <a href="facebok" traget="_blank" rel="noopener noreferrer" className='hover:text-gray-500'>
                        <TbBrandMeta className='h-5 w-5'></TbBrandMeta>
                    </a><a href="facebok" traget="_blank" rel="noopener noreferrer" className='hover:text-gray-500'>
                        <IoLogoInstagram className='h-5 w-5'></IoLogoInstagram>
                    </a><a href="facebok" traget="_blank" rel="noopener noreferrer" className='hover:text-gray-500'>
                        <RiTwitterXLine className='h-5 w-5'></RiTwitterXLine>
                    </a>
                </div>
                <p className='text-gray-500'>Call Us</p>
                <p>
                   <FiPhoneCall className='inline-block mr-2'></FiPhoneCall>
                   7304003569
                </p>
            </div>
        </div>
        {/* footer bottom */}
        <div className='container mx-auto px-4 lg:px-0 border-t border-gray-200 pt-6'>
            <p className='text-gray-500 text-sm tracking-tighter text-center'>
                &copy; 2025, Shop4U. All Right Reserved.
            </p>
        </div>
        
        </footer>
    );
}

export default Footer;
