import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './AirFryerHome';
import DemoRedirect from './Demo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<DemoRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
