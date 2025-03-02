import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OrderItem from "../components/order/OrderItem";
import CreditCardForm from "../components/order/CreditCardForm";
import AddressForm from "../components/order/AddressForm";
import { FiCheck, FiCreditCard, FiInfo, FiMapPin, FiUser, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { RootState } from "../store/store";
import Page from "../components/Page";

const Order = () => {
    const navigate = useNavigate();

    const { cartItems, total } = useSelector((state: RootState) => state.cart);
    const { isUserAuthed, user } = useSelector((state: RootState) => state.user);

    const [isAddressFormOpen, setAddressForm] = useState(false);
    const [isCreditCardFormOpen, setCreditCardForm] = useState(false);

    const handleOrderConfirm = async () => {
        toast.success("Order Placed successfully!")
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/')
    }

    if (!isUserAuthed || !user) {
        return (
            <Page>
                <div className="flex items-center justify-center h-full text-gray-500">
                    <FiInfo className="w-10 h-10" />
                    <p className="ml-3">Please login to view your shopping cart</p>
                </div>
            </Page>
        );
    }

    return (
        <div className="container xl:max-w-7xl flex-grow py-3 mt-12 min-h-svh">
            <h2 className="text-white mt-10">Checkout</h2>

            <div className="grid grid-cols-5 gap-28">
                <div className="col-span-3 space-y-5">
                    {/* contact info */}
                    <div className="flex items-center gap-5 mt-5 border p-8 border-gray-500 rounded-2xl">
                        <FiUser className="text-4xl" />
                        <div className="flex-grow space-y-2">
                            <h5 className="text-gray-300">
                                CONTACT INFO <FiCheck className="inline-block text-2xl" />
                            </h5>
                            <div className="space-x-4">
                                <span className="text-gray-100 font-bold">
                                    {user.firstName} {user.lastName}
                                </span>
                                <span>|</span>
                                <span className="text-gray-100 font-bold">{user.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* address */}
                    <div className="flex items-center gap-5 mt-5 border p-8 border-gray-500 rounded-2xl">
                        <FiMapPin className="text-4xl" />
                        <div className="flex-grow space-y-2">
                            <h5 className="text-gray-300">
                                SHIPPING ADDRESS{" "}
                                {user.address ? (
                                    <FiCheck className="inline-block text-2xl" />
                                ) : (
                                    <FiX className="inline-block text-2xl" />
                                )}
                            </h5>
                            {user.address ? (
                                <div className="space-x-2">
                                    <span className="text-gray-100 font-bold">
                                        {user.address.no},
                                    </span>
                                    <span className="text-gray-100 font-bold">
                                        {user.address.street},
                                    </span>
                                    <span className="text-gray-100 font-bold">
                                        {user.address.city}
                                    </span>
                                </div>
                            ) : (
                                <p className="text-gray-500">No address found</p>
                            )}
                        </div>
                        <button
                            onClick={() => setAddressForm(true)}
                            className="text-base px-6 py-2 bg-gray-700 border border-gray-300 rounded-xl"
                        >
                            Change
                        </button>
                    </div>

                    {/* payment */}
                    <div className="flex items-center gap-5 mt-5 border p-8 border-gray-500 rounded-2xl">
                        <FiCreditCard className="text-4xl" />
                        <div className="flex-grow space-y-2">
                            <h5 className="text-gray-300">
                                Payment Method{" "}
                                {user.creditCard ? (
                                    <FiCheck className="inline-block text-2xl" />
                                ) : (
                                    <FiX className="inline-block text-2xl" />
                                )}
                            </h5>
                            {user.creditCard ? (
                                <div className="space-x-4">
                                    <span className="text-gray-100 font-bold">VISA</span>
                                    <span className="text-gray-100 font-bold">
                                        **** **** **** {user.creditCard.number.substring(12, 16)}
                                    </span>
                                </div>
                            ) : (
                                <p className="text-gray-500">No credit card found</p>
                            )}
                        </div>
                        <button
                            onClick={() => setCreditCardForm(true)}
                            className="text-base px-6 py-2 bg-gray-700 border border-gray-300 rounded-xl"
                        >
                            Change
                        </button>
                    </div>
                </div>

                <div className="relative col-span-2">
                    <div>
                        <h4 className="text-gray-300 text-xl font-bold">Order Items</h4>
                        {cartItems.map((item: any) => (
                            <OrderItem key={item.id} item={item} />
                        ))}
                    </div>

                    <div className="sticky top-16">
                        <h6 className="font-bold text-lg text-gray-200">
                            Order Summary ({cartItems.length})
                        </h6>
                        <div className="flex justify-between items-center border-b py-4 border-gray-500">
                            <p className="text-gray-400">Subtotoal</p>
                            <p className="text-gray-200 font-semibold">Rs.{total}</p>
                        </div>
                        <div className="flex justify-between items-center border-b py-4 border-gray-500">
                            <p className="text-gray-400">Shipping estimate</p>
                            <p className="text-gray-200 font-semibold">Rs.5.00</p>
                        </div>
                        <div className="flex justify-between items-center border-b py-4 border-gray-500">
                            <p className="text-gray-400">Tax estimate</p>
                            <p className="text-gray-200 font-semibold">Rs.24.00</p>
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <p className="text-gray-200 font-semibold">Order Total</p>
                            <p className="text-gray-200 font-semibold">Rs.276.00</p>
                        </div>
                        <Link to="/order" className="w-full h-full">
                            <button
                                type="button"
                                onClick={handleOrderConfirm}
                                className="w-full h-12 text-xl bg-gray-100 text-gray-900 rounded-3xl mt-3 hover:bg-gray-50 duration-300 ease-in-out"
                            >
                                Confirm Order
                            </button>
                        </Link>
                        <p className="flex items-center text-sm text-gray-500 justify-center mt-4 gap-1">
                            <FiInfo className="mr-2" />
                            Learn more{" "}
                            <b>
                                <u>Taxes</u>
                            </b>{" "}
                            and{" "}
                            <b>
                                <u>Shipping</u>
                            </b>{" "}
                            infomation
                        </p>
                    </div>
                </div>
            </div>

            {isAddressFormOpen && (
                <AddressForm
                    isAddressFormOpened={isAddressFormOpen}
                    currentAdd={user.address}
                    setAddressForm={setAddressForm}
                />
            )}
            {isCreditCardFormOpen && (
                <CreditCardForm
                    isCreditCardFormOpened={isCreditCardFormOpen}
                    currentCreditCard={user.creditCard}
                    setCreditCardForm={setCreditCardForm}
                />
            )}
        </div>
    );
};

export default Order;
