import React, { useState, useEffect } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Searchbar = () => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ✅ Always reflect current query in input box
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    setText(currentSearch);
  }, [searchParams]);

  const handleSearchToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);

    if (text.trim() !== '') {
      newParams.set('search', text.trim());
    } else {
      newParams.delete('search');
    }

    navigate({
      pathname: '/collections',
      search: `?${newParams.toString()}`
    });

    setIsOpen(false);
  };

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      {isOpen ? (
        <form onSubmit={handleFormSubmit} className='relative flex items-center justify-center w-full'>
          <div className='relative w-1/2'>
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              placeholder="Search"
              value={text}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700 cursor-pointer"
            />
            <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
              <HiMagnifyingGlass className='w-6 h-6 cursor-pointer' />
            </button>
          </div>
          <button
            onClick={handleSearchToggle}
            type="button"
            className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
          >
            <HiMiniXMark className='w-6 h-6 cursor-pointer' />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className='h-6 w-6 cursor-pointer' />
        </button>
      )}
    </div>
  );
};

export default Searchbar;



// import React from 'react';
// import { useState } from 'react';
// import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

// const Searchbar = () => {
//         const [text,settext]=useState("")

//     const [isopen,setisopen]=useState(false)
//     function handlesearchtoggle(){
//         setisopen(isopen=>!isopen)

//     }
//     function handleformsubmit(e){
//         e.preventDefault()
//         console.log("search term :",text)
//         setisopen(false)

//     }
//     return (
//         <div className={`flex items-center justify-center w-full transition-all duration-300 ${isopen?"absolute top-0 left-0 w-full bg-white h-24 z-50":"w-auto"}` }>
//             {isopen?<form onSubmit={handleformsubmit} className='relative flex items-center justify-center w-full'>
//                 <div className='relative w-1/2'>
//                 <input type="text" onChange={(e)=>settext(e.target.value)} placeholder="search" value={text} className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700 cursor-pointer"></input>
//                 <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
//                     <HiMagnifyingGlass className='w-6 h-6 cursor-pointer'></HiMagnifyingGlass>
//                 </button>
//                 </div>
//                 {/* close button */}
//                 <button onClick={handlesearchtoggle} type="button" className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
//                     <HiMiniXMark className='w-6 h-6 cursor-pointer'></HiMiniXMark>

//                 </button>
//             </form>:(
//                 <button onClick={handlesearchtoggle}>
//                     <HiMagnifyingGlass className='h-6 w-6 cursor-pointer '></HiMagnifyingGlass>
//                 </button>
//             )}
//         </div>
//     );
// }

// export default Searchbar;
