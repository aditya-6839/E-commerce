import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import axios from "axios";
import { toast } from "react-toastify";

export default function Orders() {
  const { backendUrl, token, currency } = useContext(shopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  return (
    <div className="pt-16 px-4 sm:px-8 lg:px-16">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={" ORDERS"} />
      </div>

      {orderData.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">You have no orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-white rounded-lg shadow-md border border-gray-100 transition hover:shadow-lg"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 md:gap-6 text-gray-700 flex-1">
                <img
                  className="w-20 h-20 object-cover rounded-lg"
                  src={item.image?.[0] || "/placeholder.png"}
                  alt={item.name}
                />
                <div className="flex-1">
                  <p className="font-medium text-base sm:text-lg">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm sm:text-base text-gray-600">
                    <p className="font-semibold">{currency} {item.price}</p>
                    <p>Qty: {item.quantity || 1}</p>
                    <p>Size: {item.size || "N/A"}</p>
                  </div>
                  <p className="mt-2 text-gray-500 text-sm">
                    Date: {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                  </p>
                  <p className="mt-1 text-gray-500 text-sm">
                    Payment: {item.paymentMethod || "N/A"}
                  </p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 mt-3 md:mt-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      item.status === "Delivered"
                        ? "bg-green-500"
                        : item.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  <p className="text-sm md:text-base font-medium">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
