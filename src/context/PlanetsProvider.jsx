import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from './PlanetsContext';
import useApi from '../hooks/useApi';

export default function PlanetsContext({ children }) {
  const { requestAPI } = useApi();
  const [request, setRequest] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });

  const onChangeInput = ({ target: { value } }) => {
    setFilter({ ...filter, filterByName: { name: value } });
  };

  const setNewFilter = (newFilter) => {
    setFilter((prev) => ({
      ...prev,
      filterByNumericValues: prev.filterByNumericValues.concat(newFilter),
    }));
  };

  const removeFilter = (indexOfFilter) => {
    const removeAll = -1;
    if (indexOfFilter === removeAll) {
      return setFilter((prev) => ({
        ...prev,
        filterByNumericValues: [],
      }));
    }
    setFilter((prev) => ({
      ...prev,
      filterByNumericValues: prev
        .filterByNumericValues.filter((_item, index) => index !== indexOfFilter),
    }));
  };

  useEffect(() => {
    const filterByName = () => {
      if (!requestAPI.length) return;
      const { name } = filter.filterByName;
      const map = requestAPI
        .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
      setRequest(map);
    };

    const filterByNumeric = () => {
      const { filterByNumericValues } = filter;
      if (!filterByNumericValues.length) return;
      let newList = [...requestAPI];
      filterByNumericValues.forEach((filterObj) => {
        newList = newList.filter((planet) => {
          if (filterObj.comparison === 'maior que') {
            return Number(planet[filterObj.column]) > filterObj.value;
          }
          if (filterObj.comparison === 'menor que') {
            return Number(planet[filterObj.column]) < filterObj.value;
          }
          return planet[filterObj.column] === filterObj.value;
        });
      });
      setRequest(newList);
    };
    filterByName();
    filterByNumeric();
  }, [requestAPI, filter]);

  const context = { request, onChangeInput, filter, setNewFilter, removeFilter };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

PlanetsContext.propTypes = {
  children: propTypes.node.isRequired,
};
