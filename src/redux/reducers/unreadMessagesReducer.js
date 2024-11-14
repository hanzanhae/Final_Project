export const ADD_UNREAD_MESSAGE = 'ADD_UNREAD_MESSAGE';
export const RESET_UNREAD_MESSAGES = 'RESET_UNREAD_MESSAGES';

export const addUnreadMessage = () => ({
  type: ADD_UNREAD_MESSAGE
});

export const resetUnreadMessages = () => ({
  type: RESET_UNREAD_MESSAGES
});

const initialState = 0;

const unreadMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_UNREAD_MESSAGE:
      return state + 1;
    case RESET_UNREAD_MESSAGES:
      return 0;
    default:
      return state;
  }
};

export default unreadMessagesReducer;
