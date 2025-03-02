import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'
import { faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { RootState } from '../../store/store'
import { api } from '../../api/api'
import { userActions } from '../../reducers/userSlice'
import { TAddress, TCreditCard, TUser } from '../../types'

export default function MyProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    if (!user) return <></>;

    const [tempUser, setTempUser] = useState<TUser>(user);
    const [validations, setValidations] = useState({ firstName: true, lastName: true, email: true, password: true });
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isAddressFormOpened, setAddressFormOpened] = useState(false);
    const [isCreditCardFormOpened, setCreditCardFormOpened] = useState(false);

    function saveUser() {
        if (Object.values(validations).every(v => v)) {
            api.put(`user/${user?._id}`, tempUser).then(() => {
                dispatch(userActions.updateUser(tempUser));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch(err => console.error(err));
        } else {
            Swal.fire({ icon: 'error', title: 'Please fill in all fields' });
        }
    }

    const checkValidations = (field: string, text: string) => {
        const validators: Record<string, RegExp> = {
            firstName: /^[^0-9]*[a-zA-Z]{2,}[^0-9]*$/,
            lastName: /^[^0-9]*[a-zA-Z]{2,}[^0-9]*$/,
            email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
            password: /^.{6,}$/
        };
        setValidations({ ...validations, [field]: validators[field].test(text) });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">My Profile</h2>
            <div className="space-y-4">
                {[{ label: 'First Name', field: 'firstName' }, { label: 'Last Name', field: 'lastName' }, { label: 'Email', field: 'email' }].map(({ label, field }) => (
                    <div key={field} className="flex flex-col">
                        <label className="text-gray-600">{label}</label>
                        <input type="text" value={tempUser[field] as string}
                            className={`border rounded-md h-10 p-3 focus:outline-none transition-all ${validations[field] ? 'bg-green-100' : 'bg-red-100'}`}
                            onChange={e => {
                                setTempUser({ ...tempUser, [field]: e.target.value });
                                checkValidations(field, e.target.value);
                            }}
                        />
                    </div>
                ))}
                <div className="relative">
                    <label className="text-gray-600">Password</label>
                    <input type={isPasswordVisible ? 'text' : 'password'}
                        className={`border rounded-md h-10 p-3 w-full pr-10 focus:outline-none transition-all ${validations.password ? 'bg-green-100' : 'bg-red-100'}`}
                        value={tempUser.password}
                        onChange={e => {
                            setTempUser({ ...tempUser, password: e.target.value });
                            checkValidations('password', e.target.value);
                        }}
                    />
                    <FontAwesomeIcon className="absolute right-3 top-10 cursor-pointer text-gray-500" icon={isPasswordVisible ? faEye : faEyeSlash} onClick={() => setPasswordVisible(!isPasswordVisible)} />
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-700">Delivery Address</h3>
            <div className="bg-green-100 p-4 rounded-lg flex justify-between items-center">
                <p className="text-gray-700">{tempUser.address ? `${tempUser.address.no}, ${tempUser.address.street}, ${tempUser.address.city}` : 'No address added'}</p>
                <FontAwesomeIcon icon={faPenToSquare} className="text-xl cursor-pointer text-gray-600" onClick={() => setAddressFormOpened(true)} />
            </div>

            <h3 className="text-2xl font-semibold text-gray-700">Payment Info</h3>
            <div className="bg-green-100 p-4 rounded-lg flex justify-between items-center">
                <p className="text-gray-700">{tempUser.creditCard ? `**** **** **** ${tempUser.creditCard.number.substring(12)}` : 'No credit card added'}</p>
                <div className="flex space-x-3">
                    <FontAwesomeIcon icon={faPenToSquare} className="text-xl cursor-pointer text-gray-600" onClick={() => setCreditCardFormOpened(true)} />
                    {tempUser.creditCard && <FontAwesomeIcon icon={faTrash} className="text-xl cursor-pointer text-red-600" onClick={() => setTempUser({ ...tempUser, creditCard: null })} />}
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" onClick={saveUser}>Update</button>
                <button className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={() => setTempUser(user)}>Cancel</button>
            </div>
        </div>
    );
}

function AddressForm({ setAddress, currentAdd, setAddressForm }: any) {
    const [address, setNewAddress] = useState(currentAdd);
    const [validations, setValidations] = useState({ no: true, street: true, city: true });

    const checkValidations = (field: string, text: string) => {
        if (field === 'no') {
            !text ? setValidations({ ...validations, no: false }) : setValidations({ ...validations, no: true });
        } else if (field === 'street') {
            !text ? setValidations({ ...validations, street: false }) : setValidations({ ...validations, street: true });
        } else if (field === 'city') {
            !text ? setValidations({ ...validations, city: false }) : setValidations({ ...validations, city: true });
        }
    }

    return (
        <div className={`fixed flex items-center justify-center w-full h-full backdrop-blur-lg top-0 left-0`}>
            <div className='w-96 flex flex-col bg-white border border-gray-300 rounded-2xl p-6'>
                <h3 className='self-center text-2xl font-semibold mb-4'>Address Form</h3>

                <label className='mb-2 text-gray-600'>House/Flat No.</label>
                <input
                    type='text'
                    className={`border border-gray-300 rounded-lg p-2 mb-4 ${validations.no ? 'bg-green-100' : 'bg-red-100'}`}
                    value={address?.no}
                    onChange={(e) => {
                        setNewAddress({ ...address, no: e.target.value })
                        checkValidations('no', e.target.value);
                    }}
                />

                <label className='mb-2 text-gray-600'>Street</label>
                <input
                    type='text'
                    className={`border border-gray-300 rounded-lg p-2 mb-4 ${validations.street ? 'bg-green-100' : 'bg-red-100'}`}
                    value={address?.street}
                    onChange={(e) => {
                        setNewAddress({ ...address, street: e.target.value })
                        checkValidations('street', e.target.value);
                    }}
                />

                <label className='mb-2 text-gray-600'>City</label>
                <input
                    type='text'
                    className={`border border-gray-300 rounded-lg p-2 mb-4 ${validations.city ? 'bg-green-100' : 'bg-red-100'}`}
                    value={address?.city}
                    onChange={(e) => {
                        setNewAddress({ ...address, city: e.target.value })
                        checkValidations('city', e.target.value);
                    }}
                />

                <div className='flex justify-end gap-4'>
                    <button className='bg-gray-200 text-gray-700 rounded-lg px-6 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300'
                        onClick={() => { setAddressForm(false) }}>
                        Cancel
                    </button>
                    <button
                        className='bg-blue-400 text-gray-700 rounded-lg px-6 py-2 hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300'
                        onClick={() => {
                            if (validations.no && validations.street && validations.city) {
                                setAddressForm(false)
                                setAddress(address)
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Please fill all the fields'
                                })
                            }
                        }}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
}


function CreditCardForm({ setCreditCard, currentCard, setCreditCardForm }: any) {
    const [creditCard, setNewCreditCard] = useState(currentCard);
    const [validations, setValidations] = useState({ number: true, month: true, year: true, cvv: true });

    const checkValidations = (field: string, text: string) => {
        if (field === 'number') {
            !/^\d{16}$/.test(text) ? setValidations({ ...validations, number: false }) : setValidations({ ...validations, number: true });
        } else if (field === 'month') {
            !/^(0[1-9]|1[0-2])$/.test(text) ? setValidations({ ...validations, month: false }) : setValidations({ ...validations, month: true });
        } else if (field === 'year') {
            (parseInt(text) < 24) ? setValidations({ ...validations, year: false }) : setValidations({ ...validations, year: true });
        } else if (field === 'cvv') {
            !/^\d{3}$/.test(text) ? setValidations({ ...validations, cvv: false }) : setValidations({ ...validations, cvv: true });
        }
    }

    return (
        <div className='fixed flex items-center justify-center w-full h-full backdrop-blur-lg top-0 left-0'>
            <div className='w-96 flex flex-col bg-white border border-gray-300 rounded-2xl p-6'>
                <h3 className='self-center text-2xl font-semibold mb-4'>Card Details</h3>

                <label className='mb-2 text-gray-600'>Card Number</label>
                <input
                    type='text' placeholder='XXXXXXXXXXXXXXXX'
                    className={`border border-gray-300 rounded-lg p-2 mb-4 ${validations.number ? 'bg-green-100' : 'bg-red-100'}`}
                    value={creditCard?.number}
                    onChange={(e) => {
                        setNewCreditCard({ ...creditCard, number: e.target.value })
                        checkValidations('number', e.target.value);
                    }}
                />

                <div className='flex gap-4 mb-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-600'>Expiry Month</label>
                        <input
                            type='number' placeholder='MM'
                            className={`w-16 border border-gray-300 rounded-lg p-2 ${validations.month ? 'bg-green-100' : 'bg-red-100'}`}
                            value={creditCard?.expiryMonth}
                            onChange={(e) => {
                                setNewCreditCard({ ...creditCard, expiryMonth: e.target.value })
                                checkValidations('month', e.target.value);
                            }}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-600'>Expiry Year</label>
                        <input
                            type='number' placeholder='YY'
                            className={`w-16 border border-gray-300 rounded-lg p-2 ${validations.year ? 'bg-green-100' : 'bg-red-100'}`}
                            value={creditCard?.expiryYear}
                            onChange={(e) => {
                                setNewCreditCard({ ...creditCard, expiryYear: e.target.value })
                                checkValidations('year', e.target.value);
                            }}
                        />
                    </div>
                </div>

                <label className='mb-2 text-gray-600'>CVV</label>
                <input
                    type='number' placeholder='CVV'
                    className={`border border-gray-300 rounded-lg p-2 mb-4 ${validations.cvv ? 'bg-green-100' : 'bg-red-100'}`}
                    value={creditCard?.cvv}
                    onChange={(e) => {
                        setNewCreditCard({ ...creditCard, cvv: e.target.value })
                        checkValidations('cvv', e.target.value);
                    }}
                />

                <div className='flex justify-end gap-4'>
                    <button className='bg-gray-200 text-gray-700 rounded-lg px-6 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300'
                        onClick={() => { setCreditCardForm(false) }}>
                        Cancel
                    </button>
                    <button
                        className='bg-blue-400 text-gray-700 rounded-lg px-6 py-2 hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300'
                        onClick={() => {
                            if (validations.number && validations.month && validations.year && validations.cvv) {
                                setCreditCardForm(false);
                                setCreditCard(creditCard);
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Please fill all the fields'
                                })
                            }
                        }}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
}