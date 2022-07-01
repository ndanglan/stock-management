import { ActionTypes } from "../constants";

export const screenResize = (payload: number) => {
  return {
    type: ActionTypes.SCREEN_RESIZE,
    payload,
  };
};