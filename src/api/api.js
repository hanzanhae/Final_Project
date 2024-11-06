import instance from './instance';

export const login = async (email, password) => {
  try {
    const response = await instance.post('/users/login', { email, password });
    const accessToken = response.headers['authorization'].split(' ')[1];
    if (!accessToken) {
      throw new Error('Authorization 헤더에서 토큰을 추출할 수 없습니다.');
    }
    const { refresh } = response.data;
    if (!refresh) {
      throw new Error('응답 데이터에 리프레시 토큰이 없습니다.');
    }
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refresh);
    return response;
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// export const checkEmail = async (email) => {
//   const response = await instance.post('/users/check-email', email);
//   return response.data;
// };

export const formSubmit = async (formData) => {
  try {
    const response = await instance.post('/users/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(
      '회원가입 중 오류 발생@@@@:',
      error.response || error.message || error
    );
  }
};

// //일반모임목록🚂
// export const gatheringData = async () => {
//   try {
//     const response = await instance.get(
//       '/gatherings?gathering_type=GENERAL&order_by=CREATED_AT&sort_direction=ASC'
//     );
//     return response.data;
//   } catch (error) {
//     console.error('일반모임목록 데이터를 가져오는 중 오류발생:', error.message);
//   }
// };

// export const gatheringData = async () => {
//   try {
//     const response = await instance.get('/gatherings', {
//       params: {
//         gathering_type: 'GENERAL',
//         order_by: 'CREATED_AT',
//         sort_direction: 'ASC'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('일반모임목록 데이터를 가져오는 중 오류발생:', error.message);
//   }
// };

export const gatheringData = async () => {
  const url =
    'https://myspringserver.store/gatherings?gathering_type=GENERAL&order_by=CREATED_AT&sort_direction=ASC';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      '일반모임목록 데이터를 가져오는 중 오류 발생:',
      error.message
    );
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
