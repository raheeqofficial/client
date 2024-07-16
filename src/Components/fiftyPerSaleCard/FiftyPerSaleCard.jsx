import React, { useEffect, useState } from 'react'
import './FiftyPerSaleCard.css'
import img from '../../assets/images/Banner-flash sale.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const FiftyPerSaleCard = () => {
  const [id, setId] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    const newId = `${uuidv4()}${uuidv4()}`;
        setId(newId);
  }, [id])
  const handleDiscountClick = () => {
    navigate(`/products/flash-sale/${id}`)
}
  return (
    <section className='fiftyPerSaleCard'>
        <div className="fiftyPerSaleCardWrapper">
            <div className="fiftyPerSaleCardImg" onClick={() => handleDiscountClick()}>
                <img src={img} alt="sale banner" />
            </div>
        </div>
    </section>
  )
}

export default FiftyPerSaleCard