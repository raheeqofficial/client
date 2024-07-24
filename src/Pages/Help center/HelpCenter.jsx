import { Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { questionData } from "../../data/customerQuestion";
import { useContext } from "react";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";

const HelpCenter = () => {
  const context = useContext(MyContext)
  const onClickHandle = () => {
    context.setAlertBox({
      open: true,
      error: false,
      msg: "This will be available soon."
  })
  }
  return (
    <>
    <Helmet>
      <title>Help Center - EliphStore</title>
      <meta
        name="description"
        content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
      />
      <meta
        name="keywords"
        content="Help Center, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
      />
    </Helmet>
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
            <Link to={"#"} onClick={onClickHandle}>
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
            <Link to={"#"} onClick={onClickHandle}>
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
    </>
  );
};

export default HelpCenter;
