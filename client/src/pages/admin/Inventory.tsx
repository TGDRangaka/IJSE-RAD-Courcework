import { useEffect, useState } from "react"
import ItemForm from "../../components/admin/ItemForm";
import { api } from "../../api/api";
import { TItem } from "../../types";
import { FiEye } from "react-icons/fi";
import { FaBitbucket } from "react-icons/fa";

export default function Inventory() {
    const [loading, setLoading] = useState(true);
    const [itemFormOpen, setItemFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('new');

    const [items, setItems] = useState<TItem[]>([]);

    const getItems = async () => {
        try {
            const { data } = await api.get('item/all');
            setItems(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const removeItem = async (id: string, index: number) => {
        try {
            await api.delete(`item/${id}`);
            // set item isActive to false
            const updatedItems = [...items];
            updatedItems[index].isActive = true;
            setItems(updatedItems);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getItems();
    }, [itemFormOpen])

    return (
        <>
            <div className="grow p-4 bg-gray-900">
                <div className="flex mb-3 w-full justify-between items-center">
                    <div className="w-[500px]">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </div>
                    <button onClick={() => {
                        setSelectedItem('new');
                        setItemFormOpen(true);
                    }} type="button" className="px-3 h-12 bg-main rounded-lg">
                        Add New Item
                    </button>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-56">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock
                                </th>
                                <th scope="col" className="px-8 py-3">
                                    Active
                                </th>
                                <th scope="col" className="px-6 py-3 w-fit">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading
                                    ? <tr className="flex mt-10 justify-center w-full">
                                        Loading...
                                    </tr>
                                    : items.length == 0
                                        ? <tr> No Data </tr>
                                        : items.map((item: TItem, i: number) => (
                                            <tr key={item._id} className="bg-white text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="w-56 truncate text-main font-bold">
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.category}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.stock}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {
                                                        item.isActive
                                                            ? <span className="text-green-500 py-1 px-3 bg-green-500/10 rounded-lg">Active</span>
                                                            : <span className="text-red-400 py-1 px-3 bg-red-500/10 rounded-lg">Inactive</span>
                                                    }
                                                </td>
                                                <td className="px-6 py-4 w-fit flex items-center gap-4 justify-end">
                                                    <FiEye onClick={() => {
                                                        setSelectedItem(item._id);
                                                        setItemFormOpen(true);
                                                    }} className="text-lg text-white cursor-pointer hover:scale-125 duration-75" />

                                                    <FaBitbucket
                                                        onClick={() => removeItem(item._id, i)}
                                                        className="text-lg text-red-500 cursor-pointer hover:scale-125 duration-75" />
                                                </td>
                                            </tr>
                                        ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            {
                itemFormOpen && (
                    <ItemForm onClose={(v: boolean) => {
                        setSelectedItem('new');
                        setItemFormOpen(v);
                    }} isNewItem={selectedItem} />
                )
            }
        </>

    )
}
