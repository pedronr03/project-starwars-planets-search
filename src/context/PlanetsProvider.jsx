import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from './PlanetsContext';
import useApi from '../hooks/useApi';

export default function PlanetsContext({ children }) {
  const { requestAPI } = useApi();
  const [request, setRequest] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
  });

  const onChangeInput = ({ target: { value } }) => {
    setFilter({ ...filter, filterByName: { name: value } });
  };

  useEffect(() => {
    const filterByName = () => {
      if (!requestAPI.length) return;
      const { name } = filter.filterByName;
      const map = requestAPI.filter((planet) => planet.name.includes(name));
      setRequest(map);
    };
    filterByName();
  }, [filter.filterByName.name, requestAPI]);

  const context = { request, onChangeInput, filter };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

PlanetsContext.propTypes = {
  children: propTypes.node.isRequired,
};
