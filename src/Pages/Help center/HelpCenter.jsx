import {Link} from 'react-router-dom'
import { CiDeliveryTruck } from "react-icons/ci";
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { questionData } from '../../data/customerQuestion';

const HelpCenter = () => {

  return (
    <section className='helpCenter'>
      
      <div className="helpCenterWrapper">

      <div className="helpTopics">
        <div>
          <Link to={'/help-center/shipping-delivery'}>
          <CiDeliveryTruck/>
          <h5>Shipping and Delivery</h5>
          </Link>
        </div>
        <div>
          <Link to={'#'}>
          <CiDeliveryTruck/>
          <h5>Shipping and Delivery</h5>
          </Link>
        </div>
        <div>
          <Link to={'#'}>
          <CiDeliveryTruck/>
          <h5>Shipping and Delivery</h5>
          </Link>
        </div>
        <div>
          <Link to={'#'}>
          <CiDeliveryTruck/>
          <h5>Shipping and Delivery</h5>
          </Link>
        </div>
        <div>
          <Link to={'#'}>
          <CiDeliveryTruck/>
          <h5>Shipping and Delivery</h5>
          </Link>
        </div>
        <div>
          <Link to={'#'}>
          <CiDeliveryTruck/>
          <h5>Shipping and Delivery</h5>
          </Link>
        </div>
      </div>
      <div className="helpQuestions">
        <h1>Customers Questions</h1>
        <div className="accordianBox mb-3 mt-3">
          {
            questionData.map((data) => (
              <Accordion key={data.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <b>{data.question}</b>
        </AccordionSummary>
        <AccordionDetails>
          {data.answer}
        </AccordionDetails>
      </Accordion>
            ) )
          }
        </div>
      </div>
      </div>
    </section>
  )
}

export default HelpCenter