import { Component } from "react";
import TransactionItem from "../TransactionItem";
import AdminTransactions from "../AdminTransactions";
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
    const { details } = this.props;
    const { email } = details;

    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=300&&offset=0";
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
    const options1 = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "admin",
      },
    };
    if (email === "admin@gmail.com") {
      const response = await fetch(url, options1);
      const responseData = await response.json();
      this.setState({ allTransactions: responseData.transactions });
    } else {
      const response = await fetch(url, options);
      const responseData = await response.json();
      this.setState({ allTransactions: responseData.transactions });
    }
  };

  render() {
    const { allTransactions } = this.state;
    const { details } = this.props;
    const { email } = details;
    console.log(allTransactions);
    return (
      <ul className="all-transactions">
        {email === "admin@gmail.com" ? (
          <li className="card-item-lst">
            <p className="name1x">User Name</p>
            <p className="name1x">Transaction Type</p>
            <p className="name1x">Category</p>
            <p className="name1x">Date</p>
            <p className="name1x">Amount</p>
          </li>
        ) : (
          <li className="card-item-lst">
            <div className="div">
              <h1 className="name1">Transaction Type</h1>
            </div>
            <p className="name2">Category</p>
            <p className="name2">Date</p>
            <p className="name2">Amount</p>
          </li>
        )}
        {allTransactions.map((eachItem) =>
          email === "admin@gmail.com" ? (
            <AdminTransactions details={eachItem} key={eachItem.id} />
          ) : (
            <TransactionItem
              renderTransactions={this.renderTransactions}
              details={eachItem}
              key={eachItem.id}
            />
          )
        )}
      </ul>
    );
  }
}

export default AllTransactions;
