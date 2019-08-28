import React, { createContext, useReducer } from 'react';

const intialState = {
  filteredList: [],
  pageCount: 0,
};
const appReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {
        filteredList: action.payload.data,
        pageCount: action.payload.pages,
      };
    default:
      throw new Error('Use dispatcher for list updates only.');
  }
}
const AppContext = createContext(null);

export default function AppProvider(props) {
  const [state, dispatch] = useReducer(appReducer, intialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      { props.children }
    </AppContext.Provider>
  )
}

export {
  AppContext, AppProvider,
};
