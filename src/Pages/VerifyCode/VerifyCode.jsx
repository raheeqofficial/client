import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OtpVerification.css'
import { MyContext } from '../../App';

const VerifyPage = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();
  const context = useContext(MyContext)
  
  useEffect(() => {
      context.setisHeaderFooterShow(true)
  },[])

  const handleVerify = async () => {
    
    const email = localStorage.getItem('userEmail');
    if (!email) {
      setMessage('Email not found in local storage');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify-code/verify`, { email, code });
      if (response.data.success === true) {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "User verified successfully!"
      });
        // Redirect to another page or perform other actions
        history('/signIn');
      } else if (response.data.success === false)  {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Please enter valid verification code');
      console.error('Verification error:', error);
    }
  };

  return (
    <div className="verify-container">
            <div className="verify-box">
                <h1>Verify it's You</h1>
                <p className="mb-4">Enter the verification code sent to your email</p>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter verification code"
                    className="verify-input"
                />
                <button onClick={handleVerify} className="verify-button">Verify</button>
                {message && <p className="verify-message">{message}</p>}
            </div>
        </div>
  );
};

export default VerifyPage;
