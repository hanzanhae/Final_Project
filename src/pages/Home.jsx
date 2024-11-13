import React, { useEffect, useState } from 'react';
import Banner from '../components/mainPage/Banner';
import Section01 from '../components/mainPage/Section01';
import MainMap from '../components/mainPage/MainMap';
import Chat from '../components/chat/Chat';
import axios from 'axios';
import styled from 'styled-components';

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
  function getAuthTokenFromCookies() {
    const cookies = document.cookie.split('; ');
    console.log(cookies);
    const authCookie = cookies.find((cookie) =>
      cookie.startsWith('Authorization=')
    );

    if (authCookie) {
      return authCookie.split('=')[1]; // Token value after 'Authorization='
    }
    return null; // Token not found
  }

  const token = getAuthTokenFromCookies();
  console.log('Authorization Token:', token);
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
      <SectionBox>
        <Section01 />
        <MainMap />
      </SectionBox>
      <Chat isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Home;

const SectionBox = styled.div`
  width: 100%;
  height: fit-content;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  overflow: hidden;
  position: absolute;
  top: 100vh;
  z-index: 9;
`;
