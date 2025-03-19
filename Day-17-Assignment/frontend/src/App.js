import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Login from './components/Login';
import Header from './components/Header';

/**
 * App Component
 * Sets up routing for the application and includes the header for authenticated pages.
 */
function App() {
  return (
    <Router>
      <div className="container mt-4">
        {/* Header will render except on the login page */}
        <Header />
        <Routes>
          {/* Route for login */}
          <Route path="/login" element={<Login />} />
          {/* Routes for employee management */}
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
