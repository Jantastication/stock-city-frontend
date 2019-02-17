import React, { Component } from "react";
import "./App.css";
import { Homepage } from "./components/Homepage";
import { Stockcity } from "./components/Stockcity";
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Login";
import { Portfolio } from "./components/Portfolio";
import { SignUp } from "./components/SignUp";
import { PrivateRoute } from "./components/PrivateRoute";

class App extends Component {
  state = {
    currentPrices: [],
    currentUser: null
  };

  componentDidMount() {
    let userID = localStorage.getItem("userID");
    if (userID) {
      // Fetch user
      fetch(`https://tradeup-api.herokuapp.com/api/v1/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(currentUser => {
          this.setState({ currentUser });
        });
    }
    this.fetchCurrentPrice();
    setInterval(this.fetchCurrentPrice, 30000);
  }

  setCurrentUser = currentUser => {
    this.setState({ currentUser });
  };

  fetchCurrentPrice = companySymbol => {
    fetch(
      "https://api.iextrading.com/1.0//stock/market/batch?symbols=aapl,fb,tsla,ba,brk.b,dis,ge,hd,nke,sbux,dji,amzn,baba,goog,nflx,adbe,ftnt,grub,irbt,mcd&types=chart&range=1d"
    )
      .then(res => res.json())
      .then(prices => {
        for (let symbol in prices) {
          let chart = prices[symbol].chart;
          prices[symbol] = chart[chart.length - 1];
        }
        this.setState({ currentPrices: prices });
      });
  };

  render() {
    console.log("app", this.props.history);
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                localStorage.userID ? <Redirect to="/homepage" /> : <Login />
              }
            />
            {/* <Route path="/logout" component={Logout} /> */}
            <PrivateRoute
              path="/home"
              render={props => (
                <Homepage {...props} currentPrices={this.state.currentPrices} />
              )}
            />

            <PrivateRoute
              path="/Portfolio"
              render={props => (
                <Portfolio
                  {...props}
                  currentPrices={this.state.currentPrices}
                />
              )}
            />
            <Route
              path="/SignUp"
              render={() =>
                localStorage.userID ? <Redirect to="/home" /> : <SignUp />
              }
            />
            <Route exact path="/stockcity" component={Stockcity} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
