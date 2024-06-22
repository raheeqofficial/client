import React from "react";
import HelpNav from "./HelpNav";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { data } from '../../data/shippingAndDelivery'

const ShippingAndDelivery = () => {
  return (
    <>
      <HelpNav />
      <div className="helpCenterWrapper">
        <h1>Shipping and Delivery</h1>
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
    </>
  );
};

export default ShippingAndDelivery;
