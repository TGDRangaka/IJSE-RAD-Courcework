import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../pages/admin/Dashboard'
import SideBar from '../admin/SideBar'
import Customers from '../../pages/admin/Customers'
import Inventory from '../../pages/admin/Inventory'

export default function AdminView() {
    return (

        <div className='flex flex-col min-h-screen'>
            <div className='flex w-screen grow'>
                <SideBar />
                <Routes>
                    <Route path="/">
                        <Route path="/" element={<Dashboard />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="inventory" element={<Inventory />} />
                    </Route>
                </Routes>
            </div>
        </div>
    )
}
