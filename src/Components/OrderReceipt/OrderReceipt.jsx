// OrderReceipt.js
import "./OrderReceipt.css";

const OrderReceipt = () => {

  return (
    <>
      <div className="invoice-card">
        <div className="imgBox">
          <img src="https://via.placeholder.com/100" alt="Logo" />
        </div>
        <div className="invoice-title">
          <div id="main-title">
            <h4>INVOICE</h4>
            <span>#89 292</span>
          </div>

          <span id="date">16/02/2019</span>
        </div>

        <div className="invoice-details">
          <table className="invoice-table">
            <thead>
              <tr>
                <td>PRODUCT</td>
                <td>UNIT</td>
                <td>PRICE</td>
              </tr>
            </thead>

            <tbody>
              <tr className="row-data">
                <td>
                  Espresso <span>(large)</span>
                </td>
                <td id="unit">1</td>
                <td>2.90</td>
              </tr>

              <tr className="row-data">
                <td>
                  Cappucino <span>(small)</span>
                </td>
                <td id="unit">2</td>
                <td>7.00</td>
              </tr>

              <tr className="calc-row">
                <td colspan="2">Total</td>
                <td>9.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="invoice-footer">
          <button className="btn btn-secondary" id="later">
            LATER
          </button>
          <button className="btn btn-primary">PAY NOW</button>
        </div>
      </div>
    </>
  );
};

export default OrderReceipt;
