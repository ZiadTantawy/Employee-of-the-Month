import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';
import Login from './login';
import EmployeeOfTheMonthPage from './EmployeeOfTheMonth';
import EmployeeNomination from './EmployeeNominationPage';
import Nominate from './nominate';
import Profile from './profile';
import AdminPage from './adminPage';
import AddUser from './addUser';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/nomination" element={<EmployeeNomination/>}/>
        <Route path="/vote" element={<EmployeeOfTheMonthPage/>}/>
        <Route path="/nominate" element={<Nominate/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/adminControl" element={<AdminPage/>}/>
        <Route path="addUser" element={<AddUser/>}/>
      </Routes>
    </Router>
  );
}

export default App;