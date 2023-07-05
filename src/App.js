import './App.css';
import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter, Route , Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/' element={ <Home /> }></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
