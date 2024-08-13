import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';
import Login from './login';
import EmployeeOfTheMonthPage from './EmployeeOfTheMonth';
import EmployeeNomination from './EmployeeNominationPage';
import Nominate from './nominate';
import Profile from './profile';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/nomination" element={<EmployeeNomination/>}/>
        <Route path="/vote" element={<EmployeeOfTheMonthPage/>}/>
        <Route path="nominate" element={<Nominate/>}/>
        <Route path="profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;