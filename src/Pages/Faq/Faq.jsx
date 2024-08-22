import "./Faq.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Faq = () => {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://hibuyshopping.com/faq" />
        <title>
          FAQ - Hibuyshopping | Frequently Asked Questions About Our E-Commerce Platform
        </title>
        <meta
          name="title"
          content="FAQ - Hibuyshopping | Frequently Asked Questions About Our E-Commerce Platform"
        />
        <meta
          name="description"
          content="Find answers to the most frequently asked questions about Hibuyshopping. Our FAQ page covers topics such as order processing, shipping, returns, payments, and more to help you navigate your online shopping experience in Pakistan."
        />
        <meta
          name="keywords"
          content="FAQ, Hibuyshopping, frequently asked questions, e-commerce help, online shopping queries, order processing, shipping information, returns and exchanges, payment options, customer support, Pakistani e-commerce"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:description"
          content="Get answers to your questions on Hibuyshopping's FAQ page. Learn about order processing, shipping, returns, payments, and more. Find the information you need to enhance your shopping experience in Pakistan's leading multi-vendor e-commerce store."
        />
        <meta property="og:url" content="https://hibuyshopping.com/faq" />
      </Helmet>
      <div className="page-wrapper">
        <main className="main">
          <div className="page-header text-center topImg">
            <div className="container">
              <h1 className="page-title">
                F.A.Q<span>Pages</span>
              </h1>
            </div>
          </div>
          <div className="page-content">
            <div className="container">
              <h2 className="hd mt-2">Account and Registration</h2>
              <div className="accordianBox mb-1 mt-1">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q1: How do I create an account?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: To create an account, click on the "Sign Up" button on
                    the top right corner of our homepage. Fill in the required
                    details, including your email address, password, and
                    personal information. Once registered, you can start
                    shopping and managing your orders.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q2: I forgot my password. How can I reset it?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: Click on the "Forgot Password?" link on the login page.
                    Enter your registered email address, and we will send you a
                    link to reset your password.
                  </AccordionDetails>
                </Accordion>
              </div>

              <h2 className="hd">Ordering and Payment</h2>
              <div className="accordianBox mb-1 mt-1">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q3: What payment methods do you accept?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: We accept cash on delivery method. We also offer major
                    credit cards (Visa, MasterCard) and other secure payment
                    methods in select regions.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q4: Can I change or cancel my order after placing it?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: You can cancel your order through our Help Center if it
                    hasn’t been confirmed yet. Simply follow these steps:
                    <br />
                    1.
                    <b>Visit the Help Center</b> : Go to our Help Center on the
                    website. <br /> 2.<b>Find the Order Cancellation Option</b>{" "}
                    : Look for the order cancellation section. <br /> 3.
                    <b>Submit Your Request: </b> : Provide the necessary details
                    about your order and submit your cancellation request.
                    <br />
                    <br />
                    Please note: Once an order is confirmed, it cannot be
                    altered or canceled. Ensure you review your order details
                    carefully before finalizing to avoid any issues.
                    <br />
                    <br />
                    If you need further assistance, feel free to contact our
                    customer service team.
                  </AccordionDetails>
                </Accordion>
              </div>

              <h2 className="hd">Shipping and Delivery</h2>
              <div className="accordianBox mb-1 mt-1">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q5: How long will it take for my order to arrive?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: Delivery times vary based on your location and the
                    shipping method selected. Standard shipping typically takes
                    5-7 business days, while expedited shipping takes 2-3
                    business days.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q7: Can I track my order?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: Yes, once your order is confirmed, you can track your
                    order. Simply follow these steps:
                    <br />
                    1.
                    <b>Visit the Help Center</b> : Go to our Help Center on the
                    website. <br /> 2.<b>Find the Order Track Option</b> : Look
                    for the order track section.
                    <br />
                    <br />
                    If you need further assistance, feel free to contact our
                    customer service team.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q7: Do you ship internationally?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: Yes, we offer international shipping to many countries.
                    Shipping fees and delivery times vary depending on the
                    destination.
                    <br />
                    <br />
                    If you need further assistance, feel free to contact our
                    customer service team(support@hibuyshopping.com).
                  </AccordionDetails>
                </Accordion>
              </div>
              <h2 className="hd">Returns and Exchanges</h2>
              <div className="accordianBox mb-1 mt-1">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q8: How do I return an item?</b>
                  </AccordionSummary>

                  <AccordionDetails>
                    A: You can return your order through our Help Center within
                    7 days. Simply follow these steps:
                    <br />
                    1.
                    <b>Visit the Help Center</b> : Go to our Help Center on the
                    website. <br /> 2.<b>Find the Order Return Option</b> : Look
                    for the order return section. <br /> 3.
                    <b>Submit Your Request: </b> : Provide the necessary details
                    about your order and submit your return request.
                    <br />
                    <br />
                    For returns, please be aware that your return request will
                    only be accepted if your order is delivered within the last
                    7 days. After this period, we will not be able to process
                    return requests.
                    <br />
                    <br />
                    If you need further assistance, feel free to contact our
                    customer service team.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q9: Can I exchange an item?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: Yes, we offer exchanges for defective or damaged items.
                    Please contact us within 7 days of receiving the item to
                    initiate the exchange process.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q10: When will I receive my refund?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: Refunds are processed within 7-10 business days after we
                    receive the returned item. The refund will be credited to
                    your original payment method.
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>

          <div className="cta cta-display bg-image pt-4 pb-4 ctaImage">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-9 col-xl-7">
                  <div className="row no-gutters flex-column flex-sm-row align-items-sm-center">
                    <div className="col">
                      <h3 className="hd text-white">
                        If You Have More Questions
                      </h3>
                      <p className="text-white">
                        If you need further assistance, feel free to contact our
                        customer service team.
                      </p>
                    </div>

                    <div className="col-auto">
                      <Link to={"/contact"} className="btn btn-blue btn-big">
                        <span>CONTACT US</span>
                        <i className="icon-long-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Faq;
