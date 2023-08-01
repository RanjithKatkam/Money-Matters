import { Component } from "react";
import TransactionItem from "../TransactionItem";
import "./index.css";

class AllTransactions extends Component {
  state = { userId: "", allTransactions: [] };

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
    this.setState(
      { userId: responseData.get_user_id[0].id },
      this.renderTransactions
    );
  };

  renderTransactions = async () => {
    const { userId } = this.state;

    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=90&&offset=0";
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
    this.setState({ allTransactions: responseData.transactions });
  };

  render() {
    const { allTransactions } = this.state;
    return (
      <ul className="all-transactions">
        <li className="card-item-lst">
          <div className="div">
            <h1 className="name1">Transaction Type</h1>
          </div>
          <p className="name2">Category</p>
          <p className="name3">Date</p>
          <p className="name4">Amount</p>
        </li>
        {allTransactions.map((eachItem) => (
          <TransactionItem details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    );
  }
}

export default AllTransactions;
