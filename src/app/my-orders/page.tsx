"use client";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const base_url_api = "https://test-tomies.vercel.app/";

interface stockObject {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

export default function MyOrders() {
  const [stockData, setStockData] = useState<stockObject[]>([]);

  const getListData = async () => {
    const response = await axios.get(base_url_api + "my-orders");
    setStockData(response?.data?.data || []);
  };

  useEffect(() => {
    getListData();
  }, []);
  console.log(stockData)

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
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Total Price</th>
                <th className="border border-gray-300 p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {stockData?.length > 0 ? (
                stockData.toReversed().map((item: stockObject, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 text-center">
                      {item?.productId}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${item.price}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${item.totalPrice}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                  <td className="border border-gray-300 p-2">-</td>
                  <td className="border border-gray-300 p-2 text-center">-</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
