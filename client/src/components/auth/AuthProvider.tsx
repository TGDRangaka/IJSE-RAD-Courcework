import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Login from "./Login";
import Register from "./Register";
import { userActions } from "../../reducers/userSlice";
import { FiLoader } from "react-icons/fi";
import { api } from "../../api/api";
import { cartActions } from "../../reducers/cartSlice";

type Props = {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
    const { isUserAuthed } = useSelector((root: RootState) => root.user)

    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as string);
        const cart = JSON.parse(localStorage.getItem('cart') as string);
        if (user) {
            api.post('user/refresh').then(response => {
                if (response.status === 200) {
                    dispatch(userActions.login(user));
                    dispatch(cartActions.setData({ userId: user._id, cartId: cart._id }))
                    setIsLogin(true);
                }
                setTimeout(() => setLoading(false), 500);
            }).catch(error => {
                console.error(error);
                localStorage.removeItem('user');
                setIsLogin(true);
            });
            return;
        }

        setTimeout(() => setLoading(false), 500);
    }, [])

    return loading ?
        (
            <div className="flex fixed top-0 left-0 items-center bg-black justify-center w-screen h-screen text-gray-500">
                <FiLoader className="w-10 h-10 animate-spin" />
            </div>
        )
        : isUserAuthed ? (
            <div
                className="w-screen flex flex-col items-center"
            >
                {children}
            </div>
        )
            : (
                <div className="min-h-screen w-screen flex flex-col gap-12 items-center justify-center bg-gradient-to-r from-yellow-200 to-main">
                    <h1 className="text-gray-700 text-6xl font-semibold -mt-20">SpareLK</h1>
                    {
                        isLogin
                            ? <Login setIsLogin={setIsLogin} />
                            : <Register setIsLogin={setIsLogin} />
                    }
                </div>
            )
}
