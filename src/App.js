
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ProtectedRoute from './ProtectedRoute';
import MainPage from './MainPage/MainPage'
import Login from './Login/Login'

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><MainPage/></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
