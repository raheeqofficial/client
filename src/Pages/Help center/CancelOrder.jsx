import React, { useState } from 'react';
import axios from 'axios';
import './OrderCancellationForm.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const OrderCancellationForm = () => {
    const [orderId, setOrderId] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleCancelOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/orders/cancel/${orderId}`, { reason });
            if (response.data.success) {
                setMessage('Order cancelled successfully');
                setOrderId('')
                setReason('')
            } else {
                setMessage('Failed to cancel the order');
            }
        } catch (error) {
            setMessage('Error: ' + "Invalid Order id");
        }
    };

    return (
        <div className="form-container">
            <form className="cancellation-form" onSubmit={handleCancelOrder}>
                <h2>Cancel Order</h2>
                <div className="form-group">
                    <label htmlFor="orderId">Order ID</label>
                    <input
                        type="text"
                        id="orderId"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason for Cancellation</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Cancel Order</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default OrderCancellationForm;
