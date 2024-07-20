import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReceiptGenerator = () => {
  const [orderId, setOrderId] = useState('');
  const [receiptUrl, setReceiptUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const generateReceipt = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/generate-receipt/${orderId}`, { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
      setReceiptUrl(url);
    } catch (error) {
      setError('Error generating receipt. Please check the Order ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Generate Receipt</h2>
      <div className="mb-4">
        <input
          type="text"
          value={orderId}
          onChange={handleInputChange}
          placeholder="Enter Order ID"
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={generateReceipt}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Receipt'}
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {receiptUrl && (
        <div className="mt-4">
          <h3 className="text-xl">Receipt:</h3>
          <img src={receiptUrl} alt="Receipt" className="border rounded" />
          <Link
            onClick={receiptUrl}
            download={`receipt_${orderId}.jpeg`}
            className="bg-green-500 text-white p-2 rounded mt-4 inline-block"
          >
            Download Receipt
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReceiptGenerator;
