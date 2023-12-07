import React from 'react';
import {BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/customers" className="nav-button">Customers</NavLink>
            </li>
            <li>
              <NavLink to="/trainings" className="nav-button">Trainings</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path="/customers" element={<CustomerList />}></Route>
        <Route path="/trainings" element={<TrainingList />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
