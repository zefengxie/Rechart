// src/App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import FeedDetailsPage from './components/FeedDetailsPage';
import SegmentsPage from './pages/SegmentsPage'; // 刚才那份新建的页面

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/details/:id" element={<FeedDetailsPage />} />
        <Route path="/segments" element={<SegmentsPage />} /> {/* 新增 */}
      </Routes>
    </Router>
  );
}

export default App;
