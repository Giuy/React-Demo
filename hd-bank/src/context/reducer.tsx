import { AppActionStates, AppStateType } from "./states";

export const reducer = (state: any, action: AppStateType) => {
  switch (action.type) {
    case AppActionStates.LOGGED:
      return {
        ...state,
        isLogged: action.payload,
      };

    default:
      throw new Error("Invalid global state!!!");
  }
};
