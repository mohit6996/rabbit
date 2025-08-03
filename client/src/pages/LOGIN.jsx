import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import login from "../assets/login.webp";
import { loginUser } from '../redux/slices/authSlice';

// import { loginUser } from '../../../../server/data/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';
import { toast } from "react-toastify";

const LOGIN = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart) || {};

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  // Handle login success -> merge cart -> redirect
  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, isCheckoutRedirect, cart, dispatch, navigate]);

  // Show error toast only if error exists


  // Handle login submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password: pass }));
    
  };

  return (
    <div className="flex">
      {/* left side - login form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
          <p className="text-center mb-6">
            Enter your Email and Password to login
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              placeholder="Enter Your Email Address"
              className="w-full p-2 border rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              className="w-full p-2 border rounded"
              placeholder="Enter Your Password"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-2 rounded-lg font-semibold ${
              loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm">
            Don't have an Account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* right side - image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={login}
            alt="Login to Account"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LOGIN;
