import { Component } from "react";
import "./index.css";

class CreditDebitCard extends Component {
  state = { userId: "", debit: 0, credit: 0 };

  componentDidMount() {
    this.renderUserDetails();
  }

  renderUserDetails = async () => {
    const { details } = this.props;
    const url = "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
      body: JSON.stringify(details),
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (responseData.get_user_id[0].id !== undefined) {
      this.setState(
        { userId: responseData.get_user_id[0].id },
        this.renderLastSevenDaysReport
      );
    }
  };

  renderCreditDebitDetails = async () => {
    const { userId } = this.state;
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": userId,
      },
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    const data = responseData.totals_credit_debit_transactions;
    console.log(data);
    if (data[0].type === "credit" && data.length === 1) {
      this.setState({
        credit: data[0].sum,
        debit: 0,
      });
    } else if (data[0].type === "debit" && data.length === 1) {
      this.setState({
        debit: data[0].sum,
        credit: 0,
      });
    } else if (data[0].type === "debit" && data[1].type === "credit") {
      this.setState({
        credit: data[1].sum,
        debit: data[0].sum,
      });
    } else {
      this.setState({
        credit: 0,
        debit: 0,
      });
    }
  };

  render() {
    const { credit, debit } = this.state;
    return (
      <ul className="credit-debit-container">
        <li className="credit-debt-item">
          <div>
            <h1 className="credit-amount">{`$${credit}`}</h1>
            <p className="credit-debit-heading">Credit</p>
          </div>
          <img
            src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690826160/Group_g2a2bl.png"
            alt="credit-img"
          />
        </li>
        <li className="credit-debt-item">
          <div>
            <h1 className="debit-amount">{`$${debit}`}</h1>
            <p className="credit-debit-heading">Debit</p>
          </div>
          <img
            src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690826167/Group_1_h6q8lg.png"
            alt="debit-img"
          />
        </li>
      </ul>
    );
  }
}

export default CreditDebitCard;
