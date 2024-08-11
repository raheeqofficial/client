import React, { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";

const BecomeSeller = () => {
  const context = useContext(MyContext)
  useEffect(() => {
    context.setisHeaderFooterShow(false);
}, []);
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <section className="sellerSection">
      <div className="sellerContainer">
        <p className="text-center mb-0"><Link onClick={()=>context.setisHeaderFooterShow(true)} to={'/'}> Back to Shop</Link></p>
        <div className="title">Registration</div>
        <p className="mt-2 text-success">After registration our team contact you as soon as possible</p>
        <form className="sellerForm" onSubmit={handleSubmit}>
          <div className="user__details">
            <div className="input__box">
              <span className="details">Full Name</span>
              <input type="text" placeholder="E.g: Raheeq Gill" required />
            </div>
            <div className="input__box">
              <span className="details">Username</span>
              <input type="text" placeholder="raheeq12" required />
            </div>
            <div className="input__box">
              <span className="details">Email</span>
              <input
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="input__box">
              <span className="details">Phone Number</span>
              <input
                type="tel"
                placeholder="0314-XXXXXXX"
                required
              />
            </div>
            <div className="input__box">
              <span className="details">Company</span>
              <input type="text" placeholder="Company" required />
            </div>
            <div className="input__box">
              <span className="details">Description</span>
              <input type="text" placeholder="Company Description" required />
            </div>
            <div className="input__box">
              <span className="details">Address</span>
              <input type="text" placeholder="Company Adress" required />
            </div>
            <div className="input__box">
              <span className="details">City</span>
              <input type="text" placeholder="Lahore" required />
            </div>
          </div>
          <div className="gender__details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span className="gender__title">Gender</span>
            <div className="category">
              <label for="dot-1">
                <span className="dot one"></span>
                <span>Male</span>
              </label>
              <label for="dot-2">
                <span className="dot two"></span>
                <span>Female</span>
              </label>
              <label for="dot-3">
                <span className="dot three"></span>
                <span>Prefer not to say</span>
              </label>
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default BecomeSeller;
