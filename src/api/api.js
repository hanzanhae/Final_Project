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
    // localStorage.removeItem('refreshToken');
  }
};
export const kakaoLogout = async () => {
  try {
    const response = await instance.post('users/oauth2/logout');
    return response;
  } catch (error) {
    console.error('Failed to get access token from backend:', error);
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

export const gatheringData = async (pageNumber, pageSize) => {
  try {
    const response = await instance.get(
      `/gatherings?gathering_type=GENERAL&order_by=CREATED_AT&sort_direction=DESC&page=${pageNumber}&size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error('일반모임목록 데이터를 가져오는 중 오류발생:', error);
  }
};

export const getCookie = async () => {
  try {
    const response = await instance.get('/users/cookie');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const gatheringDetailData = async (gathering_id) => {
  try {
    const response = await instance.get(`/gatherings/${gathering_id}`);
    return response.data;
  } catch (error) {
    console.error('상세페이지 데이터를 가져오는 중 오류발생:', error.message);
  }
};

export const gatheringDetailImagesData = async (gathering_id) => {
  try {
    const response = await instance.get(`/images?gathering_id=${gathering_id}`);
    return response.data;
  } catch (error) {
    console.error('모임이미지 데이터를 가져오는 중 오류발생:', error.message);
  }
};

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

export const gatheringParticipation = async (gathering_id) => {
  try {
    const response = await instance.post(
      `/gatherings/${gathering_id}/participation`
    );
    if (response.status === 200) {
      console.log('모임참가신청이 완료되었습니다');
    }
    return response;
  } catch (error) {
    if (error.status === 409) {
      console.log('이미 참가된 모임입니다:', error.message);
    } else {
      console.log('모임참가신청 중 연결오류발생:', error.message);
    }
  }
};

export const gatheringParticipationCancle = async (gathering_id) => {
  try {
    const response = await instance.delete(
      `/gatherings/${gathering_id}/participation`
    );
    if (response.status === 200) {
      console.log('모임참가신청이 취소되었습니다');
    }
    return response;
  } catch (error) {
    console.log('모임참가취소신청 중 연결오류발생:', error.message);
  }
};

export const gatheringForLacation = async (lat, lon) => {
  try {
    const response = await instance.get(
      `/gatherings/map?radius_distance=10&x=${lon}&y=${lat}`
    );
    return response.data;
  } catch (error) {
    console.log(
      '위치기반 모임목록을 가져오는 중 연결오류발생: ',
      error.message
    );
  }
};

export const getChatRoomList = async (roomType, pageNum) => {
  try {
    const endpoint =
      roomType === 'group' ? '/chat/group/list' : '/chat/direct/list';
    const response = await instance.get(`${endpoint}?page=${pageNum}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getChattingLog = async (roomType, roomId, pageNum) => {
  try {
    const response = await instance.get(
      `/chat/${roomType}/${roomId}?page=${pageNum}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDirectChat = async (otherId, pageNum = 0) => {
  try {
    const response = await instance.get(
      `/chat/direct?other_id=${otherId}&page=${pageNum}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postGroupChatRoomId = async (id) => {
  try {
    const response = await instance.post(`/chat/group?id=${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postGroupChatJoin = async (id) => {
  try {
    const response = await instance.post(`/chat/group/join?id=${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postImgData = async (formData) => {
  try {
    const response = await instance.post('/images/gatherings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error(error);
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

export const getCalendarData = async (year, month) => {
  try {
    const response = await instance.get(
      `/users/calender?year=${year}&month=${month}`
    );
    return response.data;
  } catch (error) {
    console.log('API 요청 에러:', error);
    return null;
  }
};

//내 프로필 데이터 받아오기
// export const getProfile = async (user_id) => {
//   try {
//     const response = await instance.get(`/users/${user_id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching profile data:', error);
//     throw error;
//   }
// };

export const fetchMeetings = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await instance.get(`/users/gatherings?${queryString}`);

    if (response.status !== 200) {
      throw new Error('데이터 가져오기 실패했습니다');
    }

    return response.data;
  } catch (error) {
    console.error('모임 정보 가져오기 중 오류 발생:', error);
    return null;
  }
};

export const fetchMyMeetingMembers = async (id) => {
  try {
    const response = await instance.get(`/gatherings/${id}/members`);

    if (response.status !== 200) {
      throw new Error('데이터 가져오기 실패했습니다');
    }

    return response.data;
  } catch (error) {
    console.error('모임 구성원정보 가져오기 중 오류 발생:', error);
    return null;
  }
};

export const uploadEventImage = async (imageFile) => {
  const imageData = new FormData();
  imageData.append('file', imageFile);

  try {
    const response = await instance.post('/gatherings/events', imageData);
    if (response.status !== 200) {
      throw new Error('이미지 업로드 중 오류가 발생했습니다.');
    }
    return response.data.content_image_urls;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    return [];
  }
};

export const fetchCoordinates = async (address) => {
  try {
    const apiKey = process.env.REACT_APP_DETAIL_KAKAO_API_KEY;
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
      {
        headers: {
          Authorization: apiKey
        }
      }
    );
    const result = await response.json();
    const location = result.documents[0];
    return { x: location.x, y: location.y };
  } catch (error) {
    console.error('좌표 가져오기 중 오류:', error);
    return { x: 0, y: 0 };
  }
};

export const submitEventRequest = async (data) => {
  try {
    const response = await instance.post('/gatherings/events', data);
    if (response.status !== 200) {
      throw new Error('이벤트 신청 중 오류가 발생했습니다.');
    }
    return response.data;
  } catch (error) {
    console.error('이벤트 신청 실패:', error);
    throw error;
  }
};

export const fetchEvents = async () => {
  try {
    const response = await instance.get(
      `/gatherings?gathering_type=EVENT&order_by=CREATED_AT&sort_direction=ASC`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};

export const attendanceCheck = async (gathering_id, data) => {
  try {
    const response = await instance.patch(
      `/gatherings/${gathering_id}/members/attendance`,
      data
    );
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }
};
