import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../pages/admin/Dashboard'
import SideBar from '../admin/SideBar'
import AdminHeader from '../admin/AdminHeader'
import Customers from '../../pages/admin/Customers'
import Inventory from '../../pages/admin/Inventory'
import Orders from '../../pages/admin/Orders'

export default function AdminView() {
    return (

        <div className='flex flex-col min-h-screen'>
            <AdminHeader />
            <div className='flex w-screen grow'>
                <SideBar />
                <Routes>
                    <Route path="/">
                        <Route path="/" element={<Dashboard />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                </Routes>
            </div>
        </div>
    )
}
