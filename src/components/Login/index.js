import { Component } from "react";
import "./index.css";
import { Navigate } from "react-router-dom";

const userLoginDetails = [
  {
    Email: "jane.doe@gmail.com",
    Password: "janedoe@123",
    "User Id": 1,
    name: "jane.doe",
  },
  {
    Email: "samsmith@gmail.com",
    Password: "samsmith@123",
    "User Id": 2,
    name: "samsmith",
  },
  {
    Email: "rahul@gmail.com",
    Password: "rahul@123",
    "User Id": 4,
    name: "rahul",
  },
  {
    Email: "teja@gmail.com",
    Password: "teja@123",
    "User Id": 5,
    name: "teja",
  },
  {
    Email: "loki@gmail.com",
    Password: "loki@123",
    "User Id": 6,
    name: "loki",
  },
  {
    Email: "ramesh@gmail.com",
    Password: "ramesh@123",
    "User Id": 7,
    name: "ramesh",
  },
  {
    Email: "suresh@gmail.com",
    Password: "suresh@123",
    "User Id": 8,
    name: "suresh",
  },
  {
    Email: "prem@gmail.com",
    Password: "prem@123",
    "User Id": 9,
    name: "prem",
  },
  {
    Email: "piyush@gmail.com",
    Password: "piyush@123",
    "User Id": 10,
    name: "piyush",
  },
  {
    Email: "isha@gmail.com",
    Password: "isha@123",
    "User Id": 12,
    name: "isha",
  },
  {
    Email: "seema@gmail.com",
    Password: "seema@123",
    "User Id": 14,
    name: "seema",
  },
  {
    Email: "seema@123",
    Password: "arjun@123",
    "User Id": 15,
    name: "seema",
  },
  {
    Email: "radha@gmail.com",
    Password: "radha@123",
    "User Id": 16,
    name: "radha",
  },
  {
    Email: "phani@gmail.com",
    Password: "phani@123",
    "User Id": 17,
    name: "phani",
  },
];

class Login extends Component {
  state = {
    showPassword: false,
    email: "",
    password: "",
    name: "",
    loggedIn: false,
    errorMsg: false,
  };

  onSubmitLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const admin = email === "admin@gmail.com" && password === "Admin@123";
    const user = userLoginDetails.filter(
      (eachItem) => eachItem.Email === email && eachItem.Password === password
    );
    if (admin) {
      this.setState({
        loggedIn: true,
        name: "Admin",
      });
    } else if (user.length !== 0) {
      this.setState({ loggedIn: true, name: user[0].name });
    } else {
      this.setState({ errorMsg: true });
    }
  };

  onToggleCheckbox = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const {
      showPassword,
      errorMsg,
      email,
      name,
      password,
      loggedIn,
    } = this.state;

    if (loggedIn) {
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("password", password);
      return <Navigate to="/" />;
    }

    return (
      <div className="login-main-container">
        <form onSubmit={this.onSubmitLogin} className="login-sub-container">
          <div className="logo-container">
            <img
              alt="logo"
              src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690738822/Group_tkdib7.jpg"
            />
            <h1 className="money">Money</h1>
            <h1 className="matters">Matters</h1>
          </div>
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              onChange={this.onChangeEmail}
              className="input"
              id="email"
              type="text"
              placeholder="Enter Your Email"
              value={email}
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              onChange={this.onChangePassword}
              className="input"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
            />
          </div>
          <input
            onChange={this.onToggleCheckbox}
            className="checkbox"
            id="checkbox"
            type="checkbox"
          />
          <label className="label1" htmlFor="checkbox">
            Show Password
          </label>
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMsg && <p className="error-msg">*Enter Details Correctly</p>}
        </form>
      </div>
    );
  }
}

export default Login;
