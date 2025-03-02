import OrderedItem from "./OrderedItem";

export default function Order() {
  return (
    <div className="grid grid-cols-3 gap-3 h-[430px]">
      <div className="col-span-2 flex flex-col border rounded-lg overflow-hidden border-gray-500">
        <div className="w-full bg-yellow-400 px-5 py-3 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-black mb-1 uppercase">#asdflk234sd2j2kl2</h4>
            <div>
              <span className="text-gray-800">Aug 8, 2024 | 18.39</span>
              <span className="text-blue-600 ml-2"> Delivered</span>
            </div>
          </div>
        </div>
        <div className="pl-16 flex-grow pr-8 mt-2 max-h-full space-y-4 overflow-y-auto">
          {new Array(4).fill(null).map((i) => (
            <OrderedItem />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="border border-gray-500 p-4 rounded-lg flex flex-col gap-2">
          <h6 className="font-bold text-lg text-gray-800">Payment Summery</h6>
          <Label label="Subtotal" value="$249.00" />
          <Label label="Shipping estimate" value="$9.00" />
          <Label label="Tax estimate" value="$24.00" />
          <Label label="Total" value="$249.00" className='bg-gray-300 rounded-lg' lCass='text-gray-600' />
        </div>

        <div className="border border-gray-500 p-4 rounded-lg flex flex-col gap-2 bg-gray-400/30">
          <h6 className="font-bold text-lg text-gray-800">Order Summery</h6>
          <Label label="Total Items" value="15" />
          <Label label="Status" value="Success" className='bg-main rounded-lg' lCass='text-gray-200' vClass='text-gray-500' />
        </div>
      </div>
    </div>
  );
}

const Label = ({ label, value, className, lClass, vClass }: any) => {
  return (
    <div
      className={
        "flex justify-between items-center p-2 border-gray-500 " + className
      }
    >
      <p className={"text-gray-600 " + lClass}>{label}</p>
      <p className={"text-gray-600 font-semibold " + vClass}>{value}</p>
    </div>
  );
};
