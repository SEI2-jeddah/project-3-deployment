import React from "react";
import axios from "axios";

class Joke extends React.Component {
  state = {
    joke: null //get joke if not give null
  };

  componentDidMount = async () => {
    this.getJoke();
  };

  getJoke = async () => {
    let id = this.props.match.params.id;
    // console.log(props.match.params.id);
    let response = await axios.get(`/api/${id}`);
    console.log(response);
    this.setState({ joke: response.data.joke });
  };

  render() {
    console.log(this.state.joke);
    return (
      <div>
        {this.state.joke ? (
          <h3>{this.state.joke.punchline}</h3>
        ) : (
          <i>isLoading</i>
        )}
      </div>
    );
  }
}

export default Joke;
