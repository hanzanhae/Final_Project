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
