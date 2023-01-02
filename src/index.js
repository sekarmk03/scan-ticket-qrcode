import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerificationStatus from './VerificationStatus';
import Login from './Login';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
          <Route path='/login/:id' element={<Login/>} />
          <Route path='/admin/verification/:id' element={<App />} />
          <Route path='/admin/verification-status/:id'  element={<VerificationStatus/>} />
      </Routes>
    </BrowserRouter>
);

