import React, { useContext } from "react";
import HelpNav from "./HelpNav";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { data } from '../../data/shippingAndDelivery'
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const ShippingAndDelivery = () => {
  const context = useContext(MyContext);
  return (
    <>
      <HelpNav />
      <section className="helpCenter">
      <div className="helpCenterWrapper">
        <Link to={'/help-center'} onClick={() => context.setisHeaderFooterShow(true)}><IoArrowBackSharp/></Link>
        <div className="helpQuestions">
          <h1>Customers Questions</h1>
          <div className="accordianBox mb-3 mt-3">
            {data.map((data) => (
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
    </>
  );
};

export default ShippingAndDelivery;
