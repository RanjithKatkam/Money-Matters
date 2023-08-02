import { Component } from "react";
import TransactionItem from "../TransactionItem";
import AdminTransactions from "../AdminTransactions";
import "./index.css";

class LastThreeTransactions extends Component {
  state = { userId: "", lastThreeTransactions: [] };

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
        this.renderTransactions
      );
    }
  };

  renderTransactions = async () => {
    const { userId } = this.state;

    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&&offset=0";
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
    this.setState({ lastThreeTransactions: responseData.transactions });
  };

  render() {
    const { lastThreeTransactions } = this.state;
    const { details } = this.props;
    const { email } = details;
    return (
      <ul className="last-three-transactions">
        {lastThreeTransactions.map((eachItem) =>
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

export default LastThreeTransactions;
