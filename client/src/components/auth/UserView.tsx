import React from 'react'
import Navbar from '../Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Cart from '../../pages/Cart'
import Shop from '../../pages/Shop'
import AboutUs from '../../pages/AboutUs'
import Item from '../../pages/Item'
import Profile from '../../pages/Profile'
import MyProfile from '../Profile/MyProfile'
import MyOrders from '../Profile/MyOrders'
import Footer from '../Footer'
import Order from '../../pages/Order'

export default function UserView() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/item/:itemId" element={<Item />} />
                <Route path='/checkout' element={<Order />} />
                <Route path='profile' element={<Profile />}>
                    <Route path='my-profile' element={<MyProfile />} />
                    <Route path='my-orders' element={<MyOrders />} />
                </Route>
            </Routes>
            <Footer />
        </>
    )
}
