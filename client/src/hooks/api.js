import React, { useContext } from 'react';

export const ApiContext = React.createContext({});

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used inside ApiProvider');
  }

  return context;
};
