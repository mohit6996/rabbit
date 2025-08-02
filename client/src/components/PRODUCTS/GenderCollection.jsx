import React from 'react';
import mensColllectionImage from "../../assets/mens-collection.webp"
import womensColllectionImage from "../../assets/womens-collection.webp"
import { Link } from 'react-router';

const GenderCollection = () => {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className="container mx-auto flex flex-col md:flex-row gap-8">
                {/* woomens collection */}
                <div className='relative flex-1'>
                    <img src={womensColllectionImage} alt="women collection" className='w-full h-[700px] object-cover'/>
                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-2'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>Women's Collection</h2>
                        <Link to="collections?gender=women" className='text-gray-900 underline'>
                        Shop Now</Link>
                    </div>
                </div>
                {/* mens collection */}
                <div className='relative flex-1'>
                    <img src={mensColllectionImage} alt="men collection" className='w-full h-[700px] object-cover'/>
                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-2'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>Men's Collection</h2>
                        <Link to="collections?gender=men" className='text-gray-500 underline'>
                        Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GenderCollection;
