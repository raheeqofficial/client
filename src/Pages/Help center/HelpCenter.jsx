import { Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { questionData } from "../../data/customerQuestion";
import { useContext } from "react";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";
import HelpNav from "./HelpNav";

const HelpCenter = () => {
  const context = useContext(MyContext);
  const onClickHandle = () => {
    context.setAlertBox({
      open: true,
      error: false,
      msg: "This will be available soon.",
    });
  };
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://hibuyshopping.com/help-center" />
        <title>
          Help Center - Hibuyshopping 
        </title>
        <meta
          name="title"
          content="Help Center - Hibuyshopping | Support and Assistance for Your Online Shopping Needs"
        />
        <meta
          name="description"
          content="Visit Hibuyshopping's Help Center for comprehensive support and assistance. Find answers to common questions, get help with orders, returns, payments, and more. Our Help Center is here to ensure a smooth shopping experience on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="Help Center, Hibuyshopping, customer support, online shopping help, e-commerce assistance, order support, returns and exchanges, payment issues, FAQ, Pakistani e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta property="og:url" content="https://hibuyshopping.com/help-center" />
      </Helmet>
      <HelpNav/>
      <section className="helpCenter">
        <div className="helpCenterWrapper">
          <div className="helpTopics">
            <div>
              <Link to={"/help-center/shipping-delivery"}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/delivery--v1.png"
                  alt="delivery--v1"
                />
                <h5>Shipping and Delivery</h5>
              </Link>
            </div>
            <div>
              <Link to={"#"} onClick={onClickHandle}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/place-marker--v1.png"
                  alt="place-marker--v1"
                />
                <h5>Track My Order</h5>
              </Link>
            </div>
            <div>
              <Link to={"/help-center/return-order"}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/pulsar-gradient/48/coin-in-hand.png"
                  alt="coin-in-hand"
                />
                <h5>Returns My Order</h5>
              </Link>
            </div>
            <div>
              <Link to={"/help-center/cancel-order"}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/cancel-order.png"
                  alt="cancel-order"
                />
                <h5>Cancel My Order</h5>
              </Link>
            </div>
            <div>
              <Link to={"#"}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/bubbles/50/guest-male.png"
                  alt="guest-male"
                />
                <h5>My Account</h5>
              </Link>
            </div>
            <div>
              <Link to={"#"} onClick={onClickHandle}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/lock-orientation.png"
                  alt="lock-orientation"
                />
                <h5>Reset Password</h5>
              </Link>
            </div>
          </div>
          <div className="helpTopics-mb">
            <div>
              <Link to={"/help-center/shipping-delivery"}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/delivery--v1.png"
                  alt="delivery--v1"
                />
                <h5>Shipping and Delivery</h5>
              </Link>
            </div>
            <div>
              <Link to={"#"} onClick={onClickHandle}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/place-marker--v1.png"
                  alt="place-marker--v1"
                />
                <h5>Track My Order</h5>
              </Link>
            </div>

            <div>
              <Link to={"/help-center/return-order"}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/pulsar-gradient/48/coin-in-hand.png"
                  alt="coin-in-hand"
                />
                <h5>Returns My Order</h5>
              </Link>
            </div>
            <div>
              <Link to={"/help-center/cancel-order"}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/cancel-order.png"
                  alt="cancel-order"
                />
                <h5>Cancel My Order</h5>
              </Link>
            </div>
            <div>
              <Link to={"#"} onClick={onClickHandle}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/bubbles/50/guest-male.png"
                  alt="guest-male"
                />
                <h5>My Account</h5>
              </Link>
            </div>
            <div>
              <Link to={"#"} onClick={onClickHandle}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/lock-orientation.png"
                  alt="lock-orientation"
                />
                <h5>Reset Password</h5>
              </Link>
            </div>
          </div>
          {/* <div className="helpQuestions">
            <h1>Customers Questions</h1>
            <div className="accordianBox mb-3 mt-3">
              {questionData.map((data) => (
                <Accordion key={data.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>{data.question}</b>
                  </AccordionSummary>
                  <AccordionDetails>{data.answer}</AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default HelpCenter;
