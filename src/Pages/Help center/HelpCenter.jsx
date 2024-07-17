import { Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { questionData } from "../../data/customerQuestion";
import { GrMapLocation } from "react-icons/gr";

const HelpCenter = () => {
  return (
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
            <Link to={"#"}>
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
            <Link to={"#"}>
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
            <Link to={"#"}>
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
          <Link to={"/track-order"}>
          <div>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/place-marker--v1.png"
                alt="place-marker--v1"
              />
              <h5>Track My Order</h5>
          </div>
          </Link>
          <div>
            <Link to={"#"}>
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
            <Link to={"/help-center/shipping-delivery"}>
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
            <Link to={"#"}>
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
        <div className="helpQuestions">
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
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;
