import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Joke from "./Joke";
import { Home } from "./Home";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    this.fetchJokes();
  }

  fetchJokes = async () => {
    let response = await axios.get("/api/all");
    this.setState({ jokes: response.data.jokes });
  };

  render() {
    const { jokes } = this.state;
    return (
      <div className="App">
        <Router>
          <p>Jokes for the day!!</p>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                jokes.length > 0 ? <Home {...props} jokes={jokes} /> : null
              }
            />
            <Route
              exact
              path="/joke/:id"
              render={(props) => <Joke {...props} />}
            />
            <Route path="*" render={(props) => "Not Found"} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
