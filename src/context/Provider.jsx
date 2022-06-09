import React from 'react';
import propTypes from 'prop-types';
import Context from './Context';
import useApi from '../hooks/useApi';

export default function Provider({ children }) {
  const { request } = useApi();

  const context = { request };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};
