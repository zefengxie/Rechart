// src/App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import FeedDetailsPage from './components/FeedDetailsPage'; // 确保路径正确

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/details/:id" element={<FeedDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
