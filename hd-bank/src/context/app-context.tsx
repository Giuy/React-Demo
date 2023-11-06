import { createContext, Dispatch, useReducer } from "react";
import { reducer } from "./reducer";
import { initAppState, InitAppStateType } from "./states";

const AppContext = createContext<{
  state: InitAppStateType;
  dispatch: Dispatch<any>;
}>({ state: initAppState, dispatch: () => null });

type AppProviderType = { children: any };

function AppProvider(props: AppProviderType) {
  const [state, dispatch] = useReducer(reducer, initAppState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
