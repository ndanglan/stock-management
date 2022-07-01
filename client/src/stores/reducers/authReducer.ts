import { ActionTypes } from "../constants";

const initialState: { screenWidth: number | null } = {
  screenWidth: typeof window === "object" ? window.innerWidth : null,
};

const uiReducer = (
  state = initialState,
  action: { type: string; payload: number }
) => {
  switch (action.type) {
    case ActionTypes.SCREEN_RESIZE:
      return {
        ...state,
        screenWidth: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;