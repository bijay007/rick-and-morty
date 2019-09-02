import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const intialState = {
  filteredPages: '',
  initialFilterPage: '',
  character: '',
};
const appReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {
        ...state,
        filteredPages: action.payload.pageCount,
        initialFilterPage: action.payload.initialPage,
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

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export {
  AppContext, AppProvider,
};
