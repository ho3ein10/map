// React:
import React from "react";
// Routes creator:
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components:
import Map from "./components/map/Map";
import Error from "./components/error/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
