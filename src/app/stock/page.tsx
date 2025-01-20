"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const base_url_api = "https://test-tomies.vercel.app/";

interface stockObject {
  availability: string;
  id: number;
  name: string;
  price: number;
}

export default function Stock() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<stockObject>();
  const [quantity, setQuantity] = useState<string>("");
  const [stockData, setStockData] = useState<stockObject[]>([]);

  const handleOrderClick = (item: stockObject) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleSubmit = async () => {
    const payload = {
      productId: selectedItem?.id,
      quantity: quantity,
    };
    try {
      const response = await axios.post(base_url_api + "order", payload);
      setQuantity("");
      setIsPopupOpen(false);
      alert(response?.data?.message);
    } catch (err: any) {
      alert(err?.response?.data?.message || err);
    }
  };

  const getListData = async () => {
    const response = await axios.get(base_url_api + "products");
    setStockData(response?.data || []);
  };

  const handleChangeQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/palyndrome-checker"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Palyndrome Checker
        </Link>
        <Link
          href="/stock"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Stock
        </Link>
        <Link
          href="/my-orders"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          My Orders
        </Link>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Stock Page</h1>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Availability</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {stockData?.length > 0 ? (
                stockData.map((item: stockObject, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 text-center">
                      {item?.id}
                    </td>
                    <td className="border border-gray-300 p-2">{item.name}</td>
                    <td className="border border-gray-300 p-2">
                      ${item.price}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.availability}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleOrderClick(item)}
                      >
                        Order
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                </tr>
              )}
            </tbody>
          </table>
          {isPopupOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-black">Order</h2>
                <label className="block mb-2 text-black">
                  Quantity:
                  <input
                    type="number"
                    className="border border-gray-300 rounded w-full px-3 py-2 mt-1 text-black"
                    value={quantity}
                    onChange={handleChangeQty}
                  />
                </label>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
