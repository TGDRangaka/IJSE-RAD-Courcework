import React from 'react'
import SideBar from './SideBar'
import { Routes } from 'react-router-dom'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Routes>
            <div className='flex flex-col min-h-screen'>
                <header className='h-16 w-screen border'></header>
                <div className='flex w-screen grow'>
                    <SideBar />
                    {children}
                </div>
            </div>
        </Routes>

    )
}
