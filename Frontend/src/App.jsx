import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './LandingPage/NavBar';
import MiddleSection from './LandingPage/MiddleSection';
import Login from './SignUp_Login/Login';
import SignUp from './SignUp_Login/SignUp';

const App = () => {

  const location = useLocation();

  const getBackgroundClass = () => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      return 'bg-[url("loginsignUp.jpg")] bg-cover bg-center bg-no-repeat';
    }
    return 'bg-[url("bg-image.webp")] bg-cover bg-center bg-no-repeat';
  };

  return (
    <div className={`min-h-screen w-full flex flex-col ${getBackgroundClass()}`}>
      <Routes>
        <Route path='/' element={<><NavBar /><MiddleSection /></>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
