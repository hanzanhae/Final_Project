import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import MainHeader from '../components/MainHeader';
import AddMeeting from '../pages/AddMeeting';
import DetailMeeting from '../pages/DetailMeeting';
import Login from '../pages/Login';
import Mypage from '../pages/Mypage';

const Router = () => {
  return (
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/addMeet" element={<AddMeeting />} />
        <Route path="/detail/:id" element={<DetailMeeting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
