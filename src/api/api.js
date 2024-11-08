import axios from 'axios';
import instance from './instance';

export const login = async (email, password) => {
  try {
    const response = await instance.post('/users/login', { email, password });
    return response;
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    return null;
  }
};
export const logout = async () => {
  try {
    const response = await instance.post('/users/logout');
    return response;
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
    return null;
  }
};

// export const checkEmail = async (email) => {
//   const response = await instance.post('/users/check-email', email);
//   return response.data;
// };

export const formSubmit = async (formData) => {
  try {
    const response = await instance.post('/users/signup', formData);
    return response.data;
  } catch (error) {
    console.error(
      '회원가입 중 오류 발생@@@@:',
      error.response || error.message || error
    );
  }
};

// 사용자위치기반 대기질정보 ✅완료
export const airConditionData = async ({ lat, lon }) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`
    );
    const air = response.data.list[0].components;
    return air;
  } catch (e) {
    console.log('대기질정보를 가져오는데 실패했습니다: ', e.message);
  }
};

// 일반모임목록 ✅완료
export const gatheringData = async () => {
  try {
    const response = await instance.get(
      '/gatherings?gathering_type=GENERAL&order_by=CREATED_AT&sort_direction=ASC'
    );
    return response.data;
  } catch (error) {
    console.error('일반모임목록 데이터를 가져오는 중 오류발생:', error);
  }
};

// 모임상세페이지🚂...보류
export const gatheringDetailData = async (gathering_id) => {
  try {
    const response = await instance.get(`/gatherings/${gathering_id}`);
    return response.data;
  } catch (error) {
    console.error('상세페이지 데이터를 가져오는 중 오류발생:', error.message);
  }
};
// 모임상세이미지🚂...보류
export const gatheringDetailImagesData = async (gathering_id) => {
  try {
    const response = await instance.get(`/images?gathering_id=${gathering_id}`);
    return response.data;
  } catch (error) {
    console.error('모임이미지 데이터를 가져오는 중 오류발생:', error.message);
  }
};
// 모임상세구성원목록🚂...보류
export const gatheringDetailMembersData = async (gathering_id) => {
  try {
    const response = await instance.get(`/gatherings/${gathering_id}/members`);
    return response.data;
  } catch (error) {
    console.error(
      '모임구성원목록 데이터를 가져오는 중 오류발생:',
      error.message
    );
  }
};
// 모임참가신청 ✅완료
export const gatheringParticipation = async (gathering_id) => {
  try {
    const response = await instance.post(
      `/gatherings/${gathering_id}/participation`
    );
    if (response.status === 200) {
      console.log('모임참가신청이 완료되었습니다');
    }
    // console.log(response); // 200확인
    return response;
  } catch (error) {
    if (error.status === 409) {
      console.log('이미 참가된 모임입니다:', error.message);
    } else {
      console.log('모임참가신청 중 연결오류발생:', error.message);
    }
  }
};
// 모임참가취소 ✅완료
export const gatheringParticipationCancle = async (gathering_id) => {
  try {
    const response = await instance.delete(
      `/gatherings/${gathering_id}/participation`
    );
    if (response.status === 200) {
      console.log('모임참가신청이 취소되었습니다');
    }
    // console.log(response.status); // 200확인
    return response;
  } catch (error) {
    console.log('모임참가취소신청 중 연결오류발생:', error.message);
  }
};

export const getChatRoomList = async () => {
  try {
    const response = await instance.get('/chat/group/list');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGroupMapPoint = async (radius_distance, Xpoint, Ypoint) => {
  try {
    const response = await instance.get(
      `/gatherings/map?radius_distance=${radius_distance}&x=${Xpoint}&y=${Ypoint}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
