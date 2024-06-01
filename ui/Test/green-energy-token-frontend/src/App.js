import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StatusBar from './components/StatusBar';
import HomePage from './components/HomePage';
import GovernmentPage from './components/GovernmentPage';
import CompanyPage from './components/CompanyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <StatusBar />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/government">Government Dashboard</Link>
            </li>
            <li>
              <Link to="/company">Company Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/government" element={<GovernmentPage />} />
          <Route path="/company" element={<CompanyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
