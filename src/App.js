import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Components/Home";
import Game from "./Components/Game";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
