import React, { useState } from 'react';
import Navbar from './navbar';
import Topbar from './topbar';
import Cartdrawer from '../LAYOUT/cartdrawer';
const Header = () => {
    
    return (
        <header className='border-b border-gray-200'>
            <Topbar></Topbar>
            <Navbar></Navbar>
        
        </header>
    );
}

export default Header;
