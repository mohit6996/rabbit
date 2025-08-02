import { useEffect, useRef, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import Filtersidebar from '../components/PRODUCTS/filtersidebar';
import Sortoptions from '../components/PRODUCTS/sortoptions';
import Productgrid from '../components/PRODUCTS/productgrid';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';

const COLLECTIONPAGE = () => {
    const [sortt,setsortt]=useState('')
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const sidebarref = useRef(null);
  const [issidebaropen, setissidebaropen] = useState(false);

  // 👇 Dispatch product fetch whenever filters change
  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams]);
    dispatch(fetchProductsByFilters({ queryParams }));
  }, [searchParams.toString()]);

  // 👇 Function to update filters in the URL
  const updateFilter = (key, value) => {

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    navigate({
      pathname: `/collections`,
      search: `?${newParams.toString()}`
    });
  };

  // 👇 Toggle mobile sidebar
  const handlesidebartoggle = () => {
    setissidebaropen(!issidebaropen);
  };

  // 👇 Close sidebar when clicking outside
  const handleClickOutside = (e) => {
    if (sidebarref.current && !sidebarref.current.contains(e.target)) {
      setissidebaropen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //sort
 const getSortedProducts = () => {
    let sorted = [...products]; // shallow copy to avoid mutating original

    if (sortt === "priceAsc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortt === "priceDesc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortt === "popularity") {
      sorted.sort((a, b) => b.rating - a.rating); // or b.numReviews - a.numReviews
    }


    return sorted;
  };
  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobile filter button */}
      <button
        onClick={handlesidebartoggle}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/* filter sidebar */}
      <div
        ref={sidebarref}
        className={`${issidebaropen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <Filtersidebar updateFilter={updateFilter} />
      </div>

      {/* main content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        {/* sort options */}
        <Sortoptions sortt={sortt} setsortt={setsortt}  />

        {/* product grid */}
        <Productgrid products={getSortedProducts()} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default COLLECTIONPAGE;
