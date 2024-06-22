import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';

const HelpNav = () => {
    const [user, setUser] = useState()
    const [isLogin, setIsLogin] = useState(false);
    const context = useContext(MyContext)
    useEffect(() => {
      context.setisHeaderFooterShow(false);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
  
      const userData = JSON.parse(localStorage.getItem("user"));
  
      setUser(userData);
  
    }
  }, []);
  return (
    <div>
        <div className="helpNav">
        <Link onClick={()=>context.setisHeaderFooterShow(true)} to={'/'}><h1>Raheeq</h1></Link>
        <Link onClick={()=>context.setisHeaderFooterShow(true)} to={'/'}><p>Back To Shop</p></Link>
      </div>
      <div className="helpMsg">
        <h1 className='text-center'>{user ? user?.name : "Hi"}. How can we help?</h1>
      </div>
    </div>
  )
}

export default HelpNav