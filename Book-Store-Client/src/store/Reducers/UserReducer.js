const initialState = {
  currentUser: null,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
