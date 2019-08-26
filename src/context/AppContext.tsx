import React, { createContext, useState } from 'react';

const AppContext = createContext([{}, () => {}]);
export default function AppProvider(props) {
  const [state, setState] = useState({
    filteredList: [],
    pages: 0
  });
  return (
    <AppContext.Provider value={[state, setState]}>
      {
        props.children
      }
    </AppContext.Provider>
  )
}

export {
  AppContext, AppProvider,
};
