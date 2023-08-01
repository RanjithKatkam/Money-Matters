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
    const response = await fetch(url, options);
    const responseData = await response.json();
    this.setState({
      LastSevenDaysReport:
        responseData.last_7_days_transactions_credit_debit_totals,
    });
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
            $7,560 Debited & $5,420 Credited in this Week
          </h1>
        </div>
        <BarChart width={800} height={400} data={formattedData}>
          <XAxis dataKey="dayOfWeek" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sum" fill="#8884d8">
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.type === "credit" ? "#82ca9d" : "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    );
  }
}

export default LastSevenDaysReport;
