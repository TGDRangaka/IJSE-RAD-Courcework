import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

type Props = {
    onClose: (t:boolean) => void,
    isNewItem: string,
}

const ItemForm = ({ onClose, isNewItem }: Props) => {
    const params = useParams();
    const navigate = useNavigate();

    const [itemData, setItemData] = useState({
        name: '',
        discount: 0,
        price: 0,
        description: '',
        image: null,
        stock: 0,
        category: ''
    });
    const [validations, setValidations] = useState({ name: false, discount: true, price: false, description: false, image: false, stock: false, category: false });
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [categories, setCategories] = useState(['Electronic Accessories', 'Electronic Devices', 'Health & Beauty', 'Babies & Toys', 'Home & Lifestyle', 'Fashion', 'Sports & Outdoor']);

    useEffect(() => {
        if (params.itemId !== 'new') {
            getItem();
            setValidations({ name: true, discount: true, price: true, description: true, image: true, stock: true, category: true })
        }
    }, [])

    const handleChange = (e: any) => {
        if (e.target.type === 'file') {
            setItemData({
                ...itemData,
                [e.target.name]: e.target.files[0],
            });

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            checkValidations('image', e.target.files[0]);
        } else {
            const { name, value } = e.target;
            setItemData({
                ...itemData,
                [name]: value,
            });
            checkValidations(name, value);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', itemData.name);
        formData.append('discount', itemData.discount.toString());
        formData.append('price', itemData.price.toString());
        formData.append('description', itemData.description);
        formData.append('image', itemData.image as any);
        formData.append('stock', itemData.stock.toString());
        formData.append('category', itemData.category);

        isNewItem ? saveItem(formData) : updateItem(formData);

        console.log(itemData);
    };

    function saveItem(formData: FormData) {
        api.post('item', formData).then(result => {
            console.log(result.data.data);
            navigate('/profile/manage-items')
            Swal.fire({
                icon: 'success',
                title: 'Item Added Successfully',
                showConfirmButton: false,
                timer: 1500
            });
        }).catch(err => console.log(err));
    }

    function updateItem(formData: FormData) {
        api.put('item/' + params.itemId, formData).then(result => {
            console.log(result);
            Swal.fire({
                icon: 'success',
                title: 'Item Updated Successfully',
                showConfirmButton: false,
                timer: 1500
            });
        }).catch(err => console.log(err));
    }

    function getItem() {
        api.get('item/' + params.itemId).then(result => {
            setItemData(result.data.data);
            setImagePreview('http://localhost:3000/sparelk/api/v1/images/' + result.data.data.image);
        }).catch(err => console.log(err));
    }

    const checkValidations = (field: string, value: string) => {
        if (field === 'name') {
            value
                ? setValidations({ ...validations, name: true }) : setValidations({ ...validations, name: false });
        } else if (field === 'discount') {
            parseFloat(value) <= 100 && parseFloat(value) >= 0
                ? setValidations({ ...validations, discount: true }) : setValidations({ ...validations, discount: false });
        } else if (field === 'price') {
            parseFloat(value) >= 0
                ? setValidations({ ...validations, price: true }) : setValidations({ ...validations, price: false });
        } else if (field === 'description') {
            value
                ? setValidations({ ...validations, description: true }) : setValidations({ ...validations, description: false });
        } else if (field === 'image') {
            !value
                ? setValidations({ ...validations, image: false }) : setValidations({ ...validations, image: true });
        } else if (field === 'stock') {
            parseInt(value) > 0 && Number.isInteger(parseFloat(value))
                ? setValidations({ ...validations, stock: true }) : setValidations({ ...validations, stock: false });
        } else if (field === 'category') {
            !value
                ? setValidations({ ...validations, category: false }) : setValidations({ ...validations, category: true });
        }
    }

    return (
        <div className="fixed w-screen h-screen top-0 left-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm ">
            <div className="w-full h-full absolute left-0 top-0" onClick={() => onClose(false)}></div>
            <div className=" mx-auto rounded px-6 bg-white z-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl mt-3 underline w-full text-center font-semibold mb-4">Add Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image (1 : 1)</label>
                        {imagePreview && (
                            <div className='my-2 w-40 aspect-square bg-cover bg-center' style={{ backgroundImage: `url(${imagePreview})` }}></div>
                        )}

                        <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} className={`w-80 h-9 ${validations.image ? 'bg-green-100' : 'bg-red-100'} rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200`} />
                    </div>
                    <div className='grid grid-cols-4 gap-3'>
                        <div className="mb-4 col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" id="name" name="name" value={itemData.name} onChange={handleChange} className={`w-full h-9 ${validations.name ? 'bg-green-100' : 'bg-red-100'} px-2 border border-black rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200`} />
                        </div>
                        <div className="mb-4 col-span-2 sm:col-span-1">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input type="number" id="stock" name="stock" value={itemData.stock} onChange={handleChange} className={`w-full h-9 ${validations.stock ? 'bg-green-100' : 'bg-red-100'} border px-2 border-black rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200`} />
                        </div>
                        <div className="mb-4 col-span-2 sm:col-span-1">
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                            <input type="number" id="discount" name="discount" value={itemData.discount} onChange={handleChange} className={`w-full h-9 ${validations.discount ? 'bg-green-100' : 'bg-red-100'} px-2 border border-black rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200`} />
                        </div>
                        <div className="mb-4 col-span-4 sm:col-span-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (Rs)</label>
                            <input type="number" id="price" name="price" value={itemData.price} onChange={handleChange} className={`w-full h-9 ${validations.price ? 'bg-green-100' : 'bg-red-100'} px-2 border border-black rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200`} />
                        </div>
                        <div className="mb-4 col-span-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea id="description" name="description" value={itemData.description} onChange={handleChange} className={`w-full ${validations.description ? 'bg-green-100' : 'bg-red-100'} border p-2 border-black rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200`}></textarea>
                        </div>
                        <div className="mb-4 col-span-2">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select id="category" name="category" value={itemData.category} onChange={handleChange} className={`w-full h-9 ${validations.category ? 'bg-green-100' : 'bg-red-100'} border px-2 border-black rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200`}>
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white mb-5 py-1 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                            {isNewItem ? 'Add' : 'Update'} Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemForm;
