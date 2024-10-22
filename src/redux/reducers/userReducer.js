const initialState = {
  name: '',
  email: '',
  profileImage: '',
  isAuthenticated: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        profileImage: action.payload.profileImage,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
