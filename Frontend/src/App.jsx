import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './LandingPage/NavBar';
import Landing from './LandingPage/Landing';
import Login from './SignUp_Login/Login';
import SignUp from './SignUp_Login/SignUp';
import Buy from './Buying_page/Buy';
import SignUp_Login from './SignUp_Login/SignUp_Login';

const App = () => {
  // const location = useLocation();

  // const getBackgroundClass = () => {
  //   if (location.pathname === '/login' || location.pathname === '/signup') {
  //     return 'bg-[url("loginsignUp.jpg")] bg-cover bg-center bg-no-repeat';
  //   } else if (location.pathname === '/buy') {
  //     return 'bg-blue-100';
  //   }
  //   return 'bg-[url("bg-image-2.jpg")] bg-cover bg-center bg-no-repeat';
  // };

  return (
    <div className={`w-full flex flex-col`}>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<SignUp_Login />} />
        <Route path='/signup' element={<SignUp_Login />} />
        <Route path='/buy' element={<><Buy /></>} />
      </Routes>
    </div>
  );
};

export default App;
