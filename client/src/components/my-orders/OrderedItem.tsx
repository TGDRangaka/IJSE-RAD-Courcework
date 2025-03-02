import React from "react";
import { FiLayout, FiPenTool } from "react-icons/fi";

export default function OrderedItem() {
  return (
    <div className="flex gap-3 w-full">
      <img
        src="/shirt1.png"
        alt="shirt"
        className="aspect-square h-24 rounded-xl"
      />
      <div className="flex-grow relative flex flex-col">
        <div className="flex items-center gap-4">
          <h6 className=" text-gray-700">Red Men's Premium Polo T Shirt</h6>
          <div className="flex-grow"></div>
          <span className="border-2 rounded-lg border-gray-600 py-1 px-3">
            $28
          </span>
        </div>

        <div className="flex">
          <span className=" flex text-sm items-center gap-2 pr-4 text-gray-500">
            <FiPenTool /> Black
          </span>
          <span className="border-l text-sm border-gray-600  flex items-center gap-2 px-4 text-gray-500">
            <FiLayout /> 2XL
          </span>
        </div>

        <div className="flex justify-between flex-grow items-end">
          <span className=" text-sm text-gray-700">Qty 4</span>
          <button
            type="button"
            className="text-base text-gray-500 font-bold hover:text-gray-300 duration-100"
          >
            Leave Review
          </button>
        </div>
      </div>
    </div>
  );
}
