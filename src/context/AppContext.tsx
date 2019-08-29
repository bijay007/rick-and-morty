import React, { createContext, useReducer } from 'react';

const intialState = {
  pageCount: '',
  character: ''
};
const appReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {
        pageCount: action.payload.pages,
        character: action.payload.character,
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
