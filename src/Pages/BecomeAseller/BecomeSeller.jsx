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
      <div class="sellerContainer">
        <p className="text-center mb-0"><Link onClick={()=>context.setisHeaderFooterShow(true)} to={'/'}> Back to Shop</Link></p>
        <div class="title">Registration</div>
        <p className="mt-2 text-success">After registration our team contact you as soon as possible</p>
        <form className="sellerForm" onSubmit={handleSubmit}>
          <div class="user__details">
            <div class="input__box">
              <span class="details">Full Name</span>
              <input type="text" placeholder="E.g: Raheeq Gill" required />
            </div>
            <div class="input__box">
              <span class="details">Username</span>
              <input type="text" placeholder="raheeq12" required />
            </div>
            <div class="input__box">
              <span class="details">Email</span>
              <input
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div class="input__box">
              <span class="details">Phone Number</span>
              <input
                type="tel"
                placeholder="0314-XXXXXXX"
                required
              />
            </div>
            <div class="input__box">
              <span class="details">Company</span>
              <input type="text" placeholder="Company" required />
            </div>
            <div class="input__box">
              <span class="details">Description</span>
              <input type="text" placeholder="Company Description" required />
            </div>
            <div class="input__box">
              <span class="details">Address</span>
              <input type="text" placeholder="Company Adress" required />
            </div>
            <div class="input__box">
              <span class="details">City</span>
              <input type="text" placeholder="Lahore" required />
            </div>
          </div>
          <div class="gender__details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span class="gender__title">Gender</span>
            <div class="category">
              <label for="dot-1">
                <span class="dot one"></span>
                <span>Male</span>
              </label>
              <label for="dot-2">
                <span class="dot two"></span>
                <span>Female</span>
              </label>
              <label for="dot-3">
                <span class="dot three"></span>
                <span>Prefer not to say</span>
              </label>
            </div>
          </div>
          <div class="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default BecomeSeller;
