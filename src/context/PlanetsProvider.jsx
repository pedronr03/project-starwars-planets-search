import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from './PlanetsContext';
import useApi from '../hooks/useApi';

export default function PlanetsContext({ children }) {
  const { requestAPI } = useApi();
  const [request, setRequest] = useState([]);
  const [order, setOrder] = useState({ column: '', sort: '' });
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

  const alphabetical = (list) => {
    const alphabeticalList = list.sort((a, b) => {
      const less = -1;
      if (a.name < b.name) return less;
      if (a.name > b.name) return 1;
      return 0;
    });
    return alphabeticalList;
  };

  const sortItems = (list) => {
    const { column, sort } = order;
    if (!column) return alphabetical(list);
    const unknown = list.filter((item) => item[column] === 'unknown');
    let newList = list.filter((item) => item[column] !== 'unknown');
    newList = newList.sort((a, b) => Number(a[column]) - Number(b[column]));
    newList = sort === 'ASC' ? newList : newList.reverse();
    return [...newList, ...unknown];
  };

  useEffect(() => {
    const filterByName = () => {
      if (!requestAPI.length) return;
      const { name } = filter.filterByName;
      const newList = requestAPI
        .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
      setRequest(sortItems(newList));
    };

    const filterByNumeric = () => {
      const { filterByNumericValues } = filter;
      if (!filterByNumericValues.length) return;
      let newList = [...requestAPI];
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        newList = newList.filter((planet) => {
          if (comparison === 'maior que') {
            return Number(planet[column]) > value;
          }
          if (comparison === 'menor que') {
            return Number(planet[column]) < value;
          }
          return planet[column] === value;
        });
      });
      setRequest(sortItems(newList));
    };
    filterByName();
    filterByNumeric();
  }, [requestAPI, filter, order]);

  const context = {
    request, onChangeInput, filter, setNewFilter, removeFilter, setOrder,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

PlanetsContext.propTypes = {
  children: propTypes.node.isRequired,
};
