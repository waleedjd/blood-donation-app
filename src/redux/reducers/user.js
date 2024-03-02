const INITIAL_STATES = {
  userData: null,
  userToken: '',
  isDonor: false,
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        userData: action.payload,
      };
    case 'SAVE_TOKEN':
      return {
        ...state,
        userToken: action.payload,
      };
    case 'SAVE_IS_DONOR':
      return {
        ...state,
        isDonor: action.payload,
      };
    case 'LOGOUT':
      return INITIAL_STATES;
    default:
      return state;
  }
}
