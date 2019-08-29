import React, { createContext, useReducer } from 'react';

const intialState = {
  filteredPages: '',
  character: '',
};
const appReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {
        ...state,
        filteredPages: action.payload.pageCount,
        character: action.payload.character,
      };
    default:
      throw new Error('Use dispatcher for list updates only.');
  }
};
const AppContext = createContext(null);

export default function AppProvider(props) {
  const [state, dispatch] = useReducer(appReducer, intialState);
  const { children } = props;
  return (
    <AppContext.Provider value={[state, dispatch]}>
      { children }
    </AppContext.Provider>
  );
}

export {
  AppContext, AppProvider,
};
