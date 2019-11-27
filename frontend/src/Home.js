import React from "react";
import { NavLink } from "react-router-dom";
export const Home = (props) => {
  return (
    <div>
      {props.jokes.map((joke, i) => (
        <li key={i}>
          <NavLink to={`/joke/${joke.id}`}>{joke.setup}</NavLink>
        </li>
      ))}
    </div>
  );
};
