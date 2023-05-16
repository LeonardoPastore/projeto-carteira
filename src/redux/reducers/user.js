import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE = { email: '' };

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case (SAVE_EMAIL):
    return ({ ...state, email: payload });
  default:
    return state;
  }
};

export default userReducer;
