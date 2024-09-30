import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp_Login from './SignUp_Login/SignUp_Login';
import Landing from './LandingPage/Landing';
import Buy from './Buying_page/Buy';
import Selling_form from './Sell_page/Selling_form';
import Listing_Page from './Single_Listing/Listing_Page';
import MyListingsPage from './Listing/MyListingsPage';

const App = () => {
  return (
    <div className="w-full flex flex-col">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<SignUp_Login />} />
        <Route path="/signup" element={<SignUp_Login />} />
        <Route path="/buy" element={<Buy />} />
        <Route path='/sell' element={<Selling_form/>}/>
        <Route path='/details/:id' element={<Listing_Page/>}/>
        <Route path='myListings' element={<MyListingsPage/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
