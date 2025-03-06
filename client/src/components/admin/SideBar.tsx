import { Link } from 'react-router-dom'

export default function SideBar() {
    return (
        <div className="flex flex-col gap-5 w-[400px] border-r-4 border-gray-700 bg-gray-800 p-10 pt-2">
            <h2 className='font-bold text-center text-main'>SpareLK</h2>
            <Li to='/' text='Dashboard' />
            <Li to='/customers' text='Customers' />
            <Li to='/inventory' text='Inventory' />
            <Li to='/orders' text='Orders' />
            <div className='grow'></div>
            <Li to='/' text='Logout' />
        </div>
    )
}

function Li({ to, text }: any) {
    return (
        <Link to={to} className='bg-gray-600 border-l-4 hover:border-yellow-800 rounded-md p-3 font-bold text-lg text-gray-100 hover:bg-main hover:text-gray-950 duration-100'>
            {text}
        </Link>
    )
}