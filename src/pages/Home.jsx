import React, { useEffect, useState } from 'react';
import Banner from '../components/mainPage/Banner';
import Section01 from '../components/mainPage/Section01';
import MainMap from '../components/mainPage/MainMap';
import Chat from '../components/chat/Chat';
import { getCookie, login } from '../api/api';
import styled from 'styled-components';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (localStorage.getItem('loginType') === 'kakao') {
        const response = await getCookie();
        // console.log(response);
        localStorage.setItem('KaKaoAccessToken', response.data.token);
        localStorage.setItem('userNickName', response.data.name);
      } else {
        const response = login();
        console.log(response);
      }
    };
    fetchAccessToken();
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
