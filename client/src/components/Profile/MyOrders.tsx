import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiInfo } from "react-icons/fi";
import Order from "../my-orders/Order";
import { RootState } from "../../store/store";

export default function MyOrders() {
    //   const userId = useSelector((state) => state.user.user._id);
    const [status, setStatus] = useState("All");
    const [orderItems, setOrderItems] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
    }, [refresh]);

    return (
        <div className="container flex-grow py-3 mt-4 min-h-svh">
            <h2 className="text-white mb-5">Order History</h2>

            <div className="space-y-12">
                {
                    new Array(3).fill(null).map(i => <Order />)
                }
            </div>
        </div>
    );
}


function ReviewForm({ setReviewFormOpened, submitReview }: any) {
    const userName = useSelector((state: RootState) => state.user.user?.firstName);

    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(5);

    const handleCancel = () => {
        setReviewFormOpened(false);
    };

    const handleReview = () => {
        submitReview({
            user: userName,
            comment: comment,
            rate: rate,
            date: new Date().toLocaleString(),
        });
        setReviewFormOpened(false);
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">Select Rating</h2>
                <div className="flex text-3xl text-yellow-400 gap-3">
                    {Array(1, 2, 3, 4, 5).map((n, i) => {
                        return (
                            <FontAwesomeIcon
                                onClick={() => setRate(n)}
                                icon={rate >= n ? faStar : faEmptyStar}
                                key={i}
                            />
                        );
                    })}
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Write a Review</h2>
                <textarea
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    rows={4}
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-4"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleReview}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}
