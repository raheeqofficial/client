import React from 'react'
import './FiftyPerSaleCard.css'
import img from '../../assets/images/saleBanner.webp'
import { Link } from 'react-router-dom'

const FiftyPerSaleCard = () => {
  return (
    <section className='fiftyPerSaleCard'>
        <div className="fiftyPerSaleCardWrapper">
            <Link>
            <div className="fiftyPerSaleCardImg">
                <img src={img} alt="sale banner" />
            </div>
            </Link>
        </div>
    </section>
  )
}

export default FiftyPerSaleCard