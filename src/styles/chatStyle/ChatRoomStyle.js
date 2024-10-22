import styled from 'styled-components';
import UserImg from '../../images/user.png';
import RoomImg from '../../images/room.png';
import PersonImg from '../../images/person.png';
export const ChatRoomContainer = styled.div`
  width: 100%;
  height: 85%;
  padding: 1rem;
  background-color: red;
`;

// chatRayout Style

export const ChatRayoutContainer = styled.div`
  width: 100%;
  height: 15%;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  color: white;
`;

export const Profile = styled.div`
  background: url(${UserImg});

  width: 2rem;
  height: 2rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
export const Room = styled.div`
  background: url(${RoomImg});
  width: 2rem;
  height: 2rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
export const DieDie = styled.div`
  background: url(${PersonImg});
  width: 2rem;
  height: 2rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;