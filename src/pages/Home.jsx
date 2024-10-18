import React from 'react';
import Banner from '../components/mainPage/Banner';
import Section01 from '../components/mainPage/Section01';
import Section02 from '../components/mainPage/Section02';
import Chat from '../components/chat/Chat';

const Home = () => {
  return (
    <>
      <Banner />
      <Section01 />
      <Section02 />
      <Chat />
    </>
  );
};

export default Home;
