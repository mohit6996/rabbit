
import { Route, Routes } from 'react-router'
import HOME from './pages/HOME'
import Userlayout from './components/LAYOUT/userlayout'
import LOGIN from './pages/LOGIN.jsx'
import REGISTER from './pages/REGISTER.jsx'
import PROFILE from './pages/PROFILE.jsx'
import COLLECTIONPAGE from './pages/COLLECTIONPAGE.jsx'
import Productdetails from './components/PRODUCTS/productdetails.jsx'
import Checkout from './components/CART/Checkout.jsx'
import Orderconfirmation from './pages/Orderconfirmation.jsx'
import Orderdetails from './pages/orderdetails.jsx'
import MYORDERS from './pages/MYORDERS.jsx'
import AdminLayout from './components/ADMIN/AdminLayout.jsx'
import ADMINHOMEPAGE from './pages/ADMINHOMEPAGE.jsx'
import AdminUsermanagement from './components/ADMIN/AdminUsermanagement.jsx'
import Adminproductmanagement from './components/ADMIN/adminproductmanagement.jsx'
import Adminproductedit from './components/ADMIN/Adminproductedit.jsx'
import AdminOrdermanagement from './components/ADMIN/AdminOrdermanagement.jsx'
import {Provider} from "react-redux"
import store from './redux/store.js'
import ProtectedRoute from './components/COMMON/protectedRoute.jsx'

function App() {
  
  return <>
  <Provider store={store}>
  
    {/*common components  exmaple header*/}
    <Routes>
      {/* userlayout */}
      <Route path="/" element={<Userlayout></Userlayout>}>
        <Route  index element={<HOME></HOME>}></Route>
      <Route path="login" element={<LOGIN></LOGIN>}></Route>
  <Route path="register" element={<REGISTER></REGISTER>}></Route>
  <Route path="profile" element={<PROFILE></PROFILE>}></Route>
  <Route path='collections/' element={<COLLECTIONPAGE></COLLECTIONPAGE>}></Route>
  <Route path="product/:id" element={<Productdetails/>}></Route>
  <Route path="checkout" element={<Checkout></Checkout>}></Route>
  <Route path="order-confirmation" element={<Orderconfirmation></Orderconfirmation>}></Route>
  <Route path="order/:id" element={<Orderdetails></Orderdetails>}></Route>
  <Route path='my-orders' element={<MYORDERS></MYORDERS>}></Route>
      </Route>

      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout></AdminLayout></ProtectedRoute>} >
          <Route index element={<ADMINHOMEPAGE></ADMINHOMEPAGE>}></Route>
          <Route path="users" element={<AdminUsermanagement></AdminUsermanagement>}  ></Route>
          <Route path="products" element={<Adminproductmanagement></Adminproductmanagement>}  ></Route>
          <Route path="products/:id/edit" element={<Adminproductedit></Adminproductedit>}></Route>
          <Route path="orders" element={<AdminOrdermanagement></AdminOrdermanagement>}></Route>
      </Route>

      {/* adminlayout */}





    </Routes>





    {/*common components exmaple footer */}

  
  </Provider>
  </>
}

export default App
