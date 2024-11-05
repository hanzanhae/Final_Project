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

// 일반모임목록🚂
export const gatheringData = async () => {
  try {
    const response = await instance.get(
      '/gatherings?gathering_type=GENERAL&order_by=CREATED_AT&sort_direction=ASC'
    );
    return response.data.gathering_responses;
  } catch (error) {
    console.error('일반모임목록 데이터를 가져오는 중 오류발생:', error.message);
  }
};
// export const gatheringData = async () => {
//   const url =
//     'https://myspringserver.store/gatherings?gathering_type=GENERAL&order_by=CREATED_AT&sort_direction=ASC';

//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     const data = await response.json();
//     return data.gathering_responses;
//   } catch (error) {
//     console.error(
//       '일반모임목록 데이터를 가져오는 중 오류 발생:',
//       error.message
//     );
//   }
// };

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
