import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import MainHeader from '../components/MainHeader';
import User from '../pages/User';
import AddMeeting from '../pages/AddMeeting';
import DetailMeeting from '../pages/DetailMeeting';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import AdminHome from '../components/admin/AdminHome';
import AdminUsers from '../components/admin/AdminUsers';
import AdminMeeting from '../components/admin/AdminMeetings';
import AdminEvent from '../components/admin/AdminEvents';
//import Calendar from '../components/calendar/Calendar';

const Router = () => {
  return (
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/addMeet" element={<AddMeeting />} />
        <Route path="/detail/:id" element={<DetailMeeting />} />

        <Route path="/admin/*" element={<Admin />}>
          <Route index element={<Navigate to="home" />} />
          {/* pages에 있는 admin.jsx를 간결하게 유지하기 위해 adminHome을 따로 작성하여 관리 */}
          <Route path="home" element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="meetings" element={<AdminMeeting />} />
          <Route path="events" element={<AdminEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
