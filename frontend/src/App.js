import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';
import Login from './login';
import EmployeeOfTheMonthPage from './EmployeeOfTheMonth';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/nomination" element={EmployeeOfTheMonthPage}/>
      </Routes>
    </Router>
  );
}

export default App;