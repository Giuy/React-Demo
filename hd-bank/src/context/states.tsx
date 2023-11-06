export type AppStateType = {
  type: AppActionStates;
  payload: any;
};

export type InitAppStateType = {
  isLogged: boolean;
};

// Initial state
const initAppState: InitAppStateType = {
  isLogged: false,
};

// Actions state
enum AppActionStates {
  LOGGED,
}

const appSetState = (type: AppActionStates, payload: any) => {
  return {
    type,
    payload,
  };
};

export { initAppState, appSetState, AppActionStates };
