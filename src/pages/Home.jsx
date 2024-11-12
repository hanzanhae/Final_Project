import React, { useEffect, useState } from 'react';
import Banner from '../components/mainPage/Banner';
import Section01 from '../components/mainPage/Section01';
import MainMap from '../components/mainPage/MainMap';
import Chat from '../components/chat/Chat';
import axios from 'axios';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    console.log(document.cookie);
    const accessToken = getCookie('Authorization'); // 백엔드에서 쿠키에 담아준 accessToken 이름에 맞게 수정
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      localStorage.setItem('accessToken', accessToken);
    } else {
      console.error('Access Token이 쿠키에 없습니다.');
    }
  }, []);
  return (
    <>
      <Banner />
      <Section01 />
      <MainMap />
      <Chat isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Home;
