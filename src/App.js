import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ReactContext from "./ReactContext";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import "./App.css";

class App extends Component {
  state = { activeTab: "Dashboard", email: "", name: "" };

  onChangeActiveTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  onChangeEmail = (email) => {
    this.setState({ email });
  };

  onChangeName = (name) => {
    this.setState({ name });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <ReactContext.Provider
        value={{
          activeTab,
          onChangeActiveTab: this.onChangeActiveTab,
          onChangeEmail: this.onChangeEmail,
          onChangeName: this.onChangeName,
        }}
      >
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/transactions" element={<Transactions />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </ReactContext.Provider>
    );
  }
}

export default App;
