import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Paypalbutton from './paypalbutton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';

const Checkout = () => {
  const [checkoutId, setCheckoutId] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    firstname: '',
    lastname: '',
    country: '',
    phone: '',
    postalCode: '',
    city: '',
    address: ''
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) navigate('/');
  }, [cart]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      try {
        const res = await dispatch(
          createCheckout({
            checkoutItems: cart.products,
            shippingAddress: shippingAddress,
            paymentMethod: 'PayPal',
            totalPrice: cart.totalPrice
          })
        ).unwrap();
       
        if (res && res.data._id) {
          setCheckoutId(res.data._id);
        }
      } catch (err) {
        console.error('Checkout creation failed:', err);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: 'paid',
          paymentDetails: details
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (res.status === 200) {
        await handleFinalizeCheckout(checkoutId);
      } else {
        throw new Error('Failed to mark order as paid');
      }
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, // ✅ CORRECTED
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    if (res.status === 200 || res.status === 201) {
      navigate('/order-confirmation');
    } else {
      throw new Error('Failed to finalize checkout');
    }
  } catch (e) {
    console.error('Finalize Error:', e);
  }
};

  const handlePaymentError = (err) => {
    console.error('PayPal error:', err);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}...</p>;
  if (!cart || !cart.products || cart.products.length === 0) return <p>Your cart is empty</p>;
console.log(checkoutId,"jf")
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-6 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" value={user?.email || ''} className="w-full p-2 rounded bg-gray-100" disabled />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.firstname}
                onChange={(e) => setShippingAddress((d) => ({ ...d, firstname: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.lastname}
                onChange={(e) => setShippingAddress((d) => ({ ...d, lastname: e.target.value }))}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              required
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress((d) => ({ ...d, address: e.target.value }))}
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress((d) => ({ ...d, city: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress((d) => ({ ...d, postalCode: e.target.value }))}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              required
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress((d) => ({ ...d, country: e.target.value }))}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              className="w-full p-2 border rounded"
              required
              value={shippingAddress.phone}
              onChange={(e) => setShippingAddress((d) => ({ ...d, phone: e.target.value }))}
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button onClick={handleCheckout} type="submit" className="w-full bg-black text-white py-3 rounded">
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay With PayPal</h3>
                <Paypalbutton
                  onError={handlePaymentError}
                  onSuccess={handlePaymentSuccess}
                  amount={cart?.totalPrice || 0}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((item, i) => (
            <div className="flex items-start justify-between py-2 border-b" key={i}>
              <div className="flex items-start">
                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover mr-4" />
                <div>
                  <h3 className="text-md">{item.name}</h3>
                  <p className="text-gray-500">Size: {item.size}</p>
                  <p className="text-gray-500">Color: {item.color}</p>
                </div>
              </div>
              <p className="text-xl">${item.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>SubTotal</p>
          <p>${cart?.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart?.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
