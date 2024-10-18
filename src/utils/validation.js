import { slangList } from './slangWords';

// 이메일 유효성검사
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const isValidEmail = (email) => {
  return emailRegex.test(email);
};

// 비밀번호 유효성검사
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
export const isValidPassword = (password) => {
  return passwordRegex.test(password);
};

// 전화번호 유효성검사
const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
export const isValidPhone = (phone) => {
  return phoneRegex.test(phone);
};

// 비속어 유효성검사
export const containSlang = (input) => {
  return slangList.some((word) => input.includes(word));
};

//test 메서드는 true, false를 반환
