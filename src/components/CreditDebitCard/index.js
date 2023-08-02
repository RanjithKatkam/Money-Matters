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
        this.renderCreditDebitDetails
      );
    }
  };

  renderCreditDebitDetails = async () => {
    const { userId } = this.state;
    const { details } = this.props;
    const { email } = details;
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
    const url1 =
      "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin";
    const options1 = {
      method: "GET",
      hostname: "bursting-gelding-24.hasura.app",
      path: "/api/rest/transaction-totals-admin",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "admin",
      },
    };
    if (email === "admin@gmail.com") {
      const response = await fetch(url1, options1);
      const responseData = await response.json();
      const data = responseData.transaction_totals_admin;
      const creditSum = data.filter((eachItem) => eachItem.type === "credit");
      const debitSum = data.filter((eachItem) => eachItem.type === "debit");
      if (creditSum.length !== 0 && debitSum.length !== 0) {
        this.setState({ credit: creditSum[0].sum, debit: debitSum[0].sum });
      }
    } else {
      const response = await fetch(url, options);
      const responseData = await response.json();
      const data = responseData.totals_credit_debit_transactions;
      const creditSum = data.filter((eachItem) => eachItem.type === "credit");
      const debitSum = data.filter((eachItem) => eachItem.type === "debit");
      if (creditSum.length !== 0 && debitSum.length !== 0) {
        this.setState({ credit: creditSum[0].sum, debit: debitSum[0].sum });
      }
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
