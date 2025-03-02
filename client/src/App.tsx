import { CookiesProvider } from 'react-cookie'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import AuthProvider from './components/auth/AuthProvider'
import Item from './pages/Item'
import Cart from './pages/Cart'
import PlaceOrder from './pages/Order'
import Profile from './pages/Profile'
import MyProfile from './components/Profile/MyProfile'
import MyOrders from './components/Profile/MyOrders'
import ManageItems from './components/Profile/ManageItems'
import AddItemForm from './components/Profile/AddItemForm'
import Shop from './pages/Shop'
import AboutUs from './pages/AboutUs'

function App() {

  return (
    <div className='flex flex-col min-h-screen items-center'>
      <CookiesProvider>
        <AuthProvider>
          <Navbar />
          {/* routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/item/:itemId" element={<Item />} />
            <Route path='/cart/place-order/:cartId' element={<PlaceOrder />} />
            <Route path='/item/place-order/:itemId/:qty' element={<PlaceOrder />} />
            <Route path='profile' element={<Profile />}>
              <Route path='my-profile' element={<MyProfile />} />
              <Route path='my-orders' element={<MyOrders />} />
              <Route path='manage-items' element={<ManageItems />} />
              <Route path='add-item/:itemId' element={<AddItemForm />} />
            </Route>
          </Routes>
          <Footer />
        </AuthProvider>
      </CookiesProvider>
    </div>

  )
}

export default App
