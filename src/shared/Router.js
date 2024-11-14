import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import MainHeader from '../components/header/MainHeader';
import AddMeeting from '../pages/AddMeeting';
import DetailMeeting from '../pages/DetailMeeting';
import Mypage from '../pages/Mypage';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import AdminHomePage from '../components/admin/adminHome/AdminHomePage';
import AdminUsersPage from '../components/admin/adminUsers/AdminUsersPage';
import AdminMeetingsPage from '../components/admin/adminMeetings/AdminMeetingsPage';
import AdminEventsPage from '../components/admin/adminEvents/AdminEventsPage';

const Router = () => {
  return (
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addMeet" element={<AddMeeting />} />
        <Route path="/gatherings/:id" element={<DetailMeeting />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<AdminHomePage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="meetings" element={<AdminMeetingsPage />} />
          <Route path="events" element={<AdminEventsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
