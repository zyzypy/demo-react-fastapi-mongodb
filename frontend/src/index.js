import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './index.css';

import Cars from './pages/Cars'
import Car from './pages/Car'
import NewCar from './pages/NewCar'

// import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* BrowserRouter  http://abc.com/cars   HashRouter  http://abc.com/#/cars  */}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Cars/>} />
      <Route path="/cars" element={<Cars/>} />
      <Route path="/cars/:id" element={<Car/>} />
      <Route path="/new" element={<NewCar/>} />
      {/*<Route path="/about" element={<About/>} />*/}
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
