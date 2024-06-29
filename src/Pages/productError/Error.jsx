import React from 'react'
import img from '../../assets/images/404.png'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const Error = () => {
  return (
    <div className='errorContainer'>
        <div className="errorWrapper">
            <div className="imgBox">
                <img width="200" height="200" src={img} alt="external-Not-Found-web-maintenance-sapphire-kerismaker"/>
            </div>
            <div className="textBox">
                <h5>We are sorry an error has eccoured</h5>
                <p>We seem to have lost this page but we don't want to lose you</p>
                <Link to={'/'}><Button className='btn btn-blue btn-lg'>BACK TO MY HOME</Button></Link>
            </div>
        </div>
    </div>
  )
}

export default Error