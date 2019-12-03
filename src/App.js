import React, { Component } from "react";
// import ReactDOM from "react-dom";
import Particles from "react-particles-js";
import Timer from "./components/Timer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles
          width="100vw"
          height="100vh"
          params={{
            particles: {
              number: {
                value: 150
              },
              line_linked: {
                shadow: {
                  enable: true,
                  color: "#3CA9D1",
                  blur: 50
                },
                opacity: {
                  value: 0.05
                }
              },
              move: {
                speed: 0.4
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "grab"
                },
                onclick: {
                  enable: true,
                  mode: "push"
                }
              }
            }
          }}
        />
        <Timer />
      </div>
    );
  }
}

export default App;
