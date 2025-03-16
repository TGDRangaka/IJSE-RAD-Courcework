import { FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store/store'
import { userActions } from '../../reducers/userSlice';

export default function SideBar() {
    const { user } = useSelector((root: RootState) => root.user);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-5 w-[400px] border-r-4 border-gray-700 bg-gray-800 p-10 pt-2">
            <div className='flex flex-col items-center gap-5'>
                <h2 className='font-bold text-center text-main'>SpareLK</h2>

                {/* profile */}
                <div className="flex gap-2 w-full items-center border border-main px-5 py-2 rounded-lg">
                    <FiUser className='text-main text-3xl' />
                    <p className="text-white font-bold mt-1 flex-grow truncate">{user?.firstName}</p>
                </div>
            </div>
            <hr className='my-5 border-gray-500' />
            <Li to='/' text='Dashboard' />
            <Li to='/customers' text='Customers' />
            <Li to='/inventory' text='Inventory' />
            <div className='grow'></div>
            <Li
                onClick={() => {
                    dispatch(userActions.logout());
                }}
                to='/' text='Logout' />
        </div>
    )
}

function Li({ to, text, onClick }: any) {
    return (
        <Link
            onClick={onClick} to={to} className='bg-gray-600 border-l-4 hover:border-yellow-800 rounded-md p-3 font-bold text-lg text-gray-100 hover:bg-main hover:text-gray-950 duration-100'>
            {text}
        </Link>
    )
}