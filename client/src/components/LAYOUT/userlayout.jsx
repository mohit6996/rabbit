import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Header from '../COMMON/header';
import Footer from '../COMMON/footer';
import { ToastContainer } from 'react-toastify';
const Userlayout = () => {
    return (
        <>
            <ToastContainer></ToastContainer>

        {/* header */}
        <Header >
            

        </Header>

        {/* header */}



        {/* main */}
        {/* main */}
<main>
        <Outlet></Outlet>
    
</main>

{/* main */}
        {/* footer */}
        <Footer>
            
        </Footer>
        {/* footer */}
        </>
    );
}

export default Userlayout;
