import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import GovernmentPage from './components/GovernmentPage';
import Company_ManagePage from './components/Company_ManagePage';
import Contract_ManagePage from './components/Contract_ManagePage';
import Header from './components/Header';
import Sidebar from './components/C_Nav_Bar';
import Footer from './components/Footer';
import TokenOperate from './components/TokenOperate';
import MainBoard from './components/MainBoard';
import { EthereumProvider, useEthereum } from './context/EthereumContext';
import CompanyPage from './components/CompanyPage';

function AppContent() {
  const [selectedPage, setSelectedPage] = useState('home');
  const { isOwner } = useEthereum();

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensure the minimum height is 100vh
    background: isOwner ? '#EDF9FC' : '#F7FCED', // Dynamic background color
  };

  const contentContainerStyle = {
    display: 'flex',
    flex: 1,
    position: 'relative',
  };

  const mainContentStyle = {
    flex: 1,
    padding: '20px',
    marginLeft: '262px',
    marginBottom: '0',
    overflowY: 'auto',
  };

  const pageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'calc(100vh - 66px - 40px)', // Adjust based on Header and Footer height
    overflowY: 'auto',
    padding: '20px', // Ensure padding if needed
    boxSizing: 'border-box',
  };

  return (
    <div style={appStyle}>
      <Header />
      <MainBoard />
      <div style={contentContainerStyle}>
        <Sidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        <div style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/token" element={<TokenOperate />} />
            <Route path="/company" element={
              <div style={pageContainerStyle}>
                <Company_ManagePage />
              </div>
            } />
            <Route path="/contract" element={
              <div style={pageContainerStyle}>
                <Contract_ManagePage />
              </div>
            } />
            <Route path="/report" element={<GovernmentPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <EthereumProvider>
      <Router>
        <AppContent />
      </Router>
    </EthereumProvider>
  );
}

export default App;
