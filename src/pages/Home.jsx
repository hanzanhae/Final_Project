import React, { useEffect, useState } from 'react';
import Banner from '../components/mainPage/Banner';
import Section01 from '../components/mainPage/Section01';
import MainMap from '../components/mainPage/MainMap';
import Chat from '../components/chat/Chat';
import { getCookie, login } from '../api/api';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (localStorage.getItem('loginType') === 'kakao') {
        const response = await getCookie();
        console.log(response);
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
      <Section01 />
      <MainMap />
      <Chat isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Home;
