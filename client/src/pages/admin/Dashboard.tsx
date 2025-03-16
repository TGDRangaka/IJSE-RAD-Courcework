import { FiBox, FiFile, FiFilter, FiUser } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "../../api/api";
import { useEffect, useState } from "react";

function Card({ children }: any) {
    return <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-5">{children}</div>;
}

function CardContent({ children }: any) {
    return <div>{children}</div>;
}

const data = [
    { day: "Mon", orders: 30 },
    { day: "Tue", orders: 45 },
    { day: "Wed", orders: 20 },
    { day: "Thu", orders: 50 },
    { day: "Fri", orders: 40 },
    { day: "Sat", orders: 70 },
    { day: "Sun", orders: 60 },
];

export default function Dashboard() {
    const [counts, setCounts] = useState({
        totCustomers: 0,
        totItems: 0,
        totOrders: 0,
    });

    const getData = async () => {
        try {
            const { data } = await api.get('user/dashboard');
            console.log(data);
            setCounts(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="grow bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-3 gap-6 mb-8">
                <Card>
                    <FiUser className="text-5xl text-white" />
                    <CardContent>
                        <h2 className="text-lg font-semibold">Total Customers</h2>
                        <p className="text-3xl text-main">{counts.totCustomers}</p>
                    </CardContent>
                </Card>

                <Card>
                    <FiFilter className="text-5xl text-white" />
                    <CardContent>
                        <h2 className="text-lg font-semibold">Total Items</h2>
                        <p className="text-3xl text-main">{counts.totItems}</p>
                    </CardContent>
                </Card>

                <Card>
                    <FiBox className="text-5xl text-white" />
                    <CardContent>
                        <h2 className="text-lg font-semibold">Total Orders</h2>
                        <p className="text-3xl text-main">{counts.totOrders}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Orders by Day</h2>
                <ResponsiveContainer width="100%" height={550}>
                    <BarChart data={data} barSize={40}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="orders" fill="#00C49F" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}