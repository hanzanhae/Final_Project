import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import MainHeader from '../components/MainHeader';
import User from '../pages/User';
import AddMeeting from '../pages/AddMeeting';
import DetailMeeting from '../pages/DetailMeeting';
import Calendar from '../components/Calendar';

const Router = () => {
  return (
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user" element={<User />} />
        <Route path="/addMeet" element={<AddMeeting />} />
        <Route path="/detail" element={<DetailMeeting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
