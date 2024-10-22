import React from 'react';
import Banner from '../components/mainPage/Banner';
import Section01 from '../components/mainPage/Section01';
import MainMap from '../components/mainPage/MainMap';
import Chat from '../components/chat/Chat';

const Home = () => {
  return (
    <>
      <Banner />
      <Section01 />
      <MainMap />
      <Chat />
    </>
  );
};

export default Home;
