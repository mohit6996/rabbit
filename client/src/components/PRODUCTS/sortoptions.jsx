import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Sortoptions = ({sortt,setsortt}) => {
    

    return (
        <div className="mb-4 flex items-center justify-end">
            <select 
                id="sort" 
                onChange={(e)=>setsortt(e.target.value)}  
                value={sortt} 
                className='border p-2 rounded-md focus:outline-none'
            >
                <option value="">Default</option>
                <option value="priceAsc">Price: Low To High</option>
                <option value="priceDesc">Price: High To Low</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    );
}

export default Sortoptions;