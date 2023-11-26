import { User } from "../../services/User.service";
import { setToken } from "../../helper/http";

export const setCurrentUser = (token) => {
  return (dispatch) => {
    setToken(token);
    User.getCurrentUser().then((user) => {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: user,
      });
    });
  };
};
