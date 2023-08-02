import { Component } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";
import "./index.css";

class LastSevenDaysReport extends Component {
  state = { userId: "", LastSevenDaysReport: [] };

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

  renderLastSevenDaysReport = async () => {
    const { userId } = this.state;
    const { details } = this.props;
    const { email } = details;

    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";
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
      "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin";
    const options1 = {
      method: "GET",
      hostname: "bursting-gelding-24.hasura.app",
      path: "/api/rest/daywise-totals-last-7-days-admin",
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
      this.setState({
        LastSevenDaysReport: responseData.last_7_days_transactions_totals_admin,
      });
    } else {
      const response = await fetch(url, options);
      const responseData = await response.json();
      this.setState({
        LastSevenDaysReport:
          responseData.last_7_days_transactions_credit_debit_totals,
      });
    }
  };

  render() {
    const { LastSevenDaysReport } = this.state;

    const convertDatesToDaysOfWeek = (data) => {
      return data.map((item) => ({
        ...item,
        dayOfWeek: new Date(item.date).toLocaleDateString(undefined, {
          weekday: "short",
        }),
      }));
    };

    const formattedData = convertDatesToDaysOfWeek(LastSevenDaysReport);

    return (
      <div className="seven-days-container">
        <div className="last-seven-days-details">
          <h1 className="heading1">
            <span className="span">$7,560</span> Debited &{" "}
            <span className="span">$5,420</span> Credited in this Week
          </h1>
          <div className="days-details1">
            <div className="details1">
              <div className="debit-circle"></div>
              <p className="head">Debit</p>
            </div>
            <div className="details1">
              <div className="credit-circle"></div>
              <p className="head">Credit</p>
            </div>
          </div>
        </div>
        <BarChart width={1150} height={380} data={formattedData}>
          <XAxis dataKey="dayOfWeek" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sum" fill="#4C78FF">
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.type === "credit" ? "#FCAA0B" : "#4C78FF"}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    );
  }
}

export default LastSevenDaysReport;
