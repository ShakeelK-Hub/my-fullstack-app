import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home.js';
import Employees from './Components/Employees.js';
import Department from './Components/Department.js';
import './App.css';

function App() {

  return (

    <div className="app-container">

      <nav className="nav">

        <div className="logo">Shakeel Khan WDB361</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/departments">Departments</Link>
        </div>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/departments" element={<Department />} />
      </Routes>
      
    </div>
  );
}

export default App;



