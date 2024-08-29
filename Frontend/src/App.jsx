import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp_Login from './SignUp_Login/SignUp_Login';
import Landing from './LandingPage/Landing';
import Buy from './Buying_page/Buy';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <div className="w-full flex flex-col">
      <Routes>
        <Route path="/" element={<SignUp_Login />} />
        <Route path="/login" element={<SignUp_Login />} />
        <Route path="/signup" element={<SignUp_Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Landing />} />
          <Route path="/buy" element={<Buy />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
