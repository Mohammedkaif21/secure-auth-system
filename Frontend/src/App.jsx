import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Routes,Route } from 'react-router';
import { SignupPage } from './pages/SignupPage';
import Login from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="light"/>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App
