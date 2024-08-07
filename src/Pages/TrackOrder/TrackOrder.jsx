import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
 

const OrderStatus = ({ status }) => {
  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Confirmed: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-orange-100 text-orange-800',
    Delivered: 'bg-green-100 text-green-800',
  };

  return (
    <div className={`p-4 rounded-lg ${statusStyles[status]}`}>
      <h2 className="text-xl font-semibold">{status}</h2>
    </div>
  );
};

const TrackOrder = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);


  React.useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const data = await fetchDataFromApi(`/api/orders/${orderId}`);
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    getOrderDetails();
  }, [orderId]);

  if (!orderDetails) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order ID: {orderDetails.id}</h2>
        <p className="text-gray-700">Order Date: {new Date(orderDetails.date).toLocaleDateString()}</p>
      </div>
      <OrderStatus status={orderDetails.status} />
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Order Details:</h3>
        <ul className="list-disc list-inside mt-2">
          {orderDetails.items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackOrder;
