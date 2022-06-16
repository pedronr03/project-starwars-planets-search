import React, { useContext, useState } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import Table from '../Table/Table';

export default function MainPage() {
  const INITIAL_STATE = {
    column: 'population',
    comparison: 'maior que',
    value: 0,
  };

  const {
    onChangeInput,
    setNewFilter,
    removeFilter,
    setOrder,
    filter: { filterByName: { name }, filterByNumericValues },
  } = useContext(PlanetsContext);
  const [filter, setFilter] = useState(INITIAL_STATE);
  const [orderUp, setOrderUp] = useState({ column: 'population', sort: 'ASC' });

  const columnOrder = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const columnFilter = columnOrder
    .filter((item) => !filterByNumericValues.some(({ column }) => column === item));

  const comparisonFilter = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const handleFilter = ({ target }) => setFilter({
    ...filter, [target.id]: target.value,
  });

  const handleSort = ({ target }) => {
    setOrderUp((prev) => ({ ...prev, sort: target.value }));
  };

  const getFilter = () => {
    setNewFilter({ ...filter });
    setFilter(INITIAL_STATE);
  };

  const removeAll = -1;

  return (
    <div>
      <form>
        <label htmlFor="inputFilter">
          <input
            id="inputFilter"
            type="text"
            value={ name }
            data-testid="name-filter"
            onChange={ onChangeInput }
          />
        </label>
        <label htmlFor="columnFilter">
          <select
            id="column"
            data-testid="column-filter"
            value={ filter.column }
            onChange={ handleFilter }
          >
            {
              columnFilter.map((column) => (
                <option key={ column } value={ column }>{ column }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            id="comparison"
            data-testid="comparison-filter"
            onChange={ handleFilter }
          >
            {
              comparisonFilter.map((comparison) => (
                <option key={ comparison } value={ comparison }>{ comparison }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="value">
          <input
            value={ filter.value }
            type="number"
            id="value"
            data-testid="value-filter"
            onChange={ handleFilter }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ getFilter }
        >
          Filtrar
        </button>
        <label htmlFor="columnOrder">
          <select
            id="columnOrder"
            data-testid="column-sort"
            onChange={
              ({ target }) => setOrderUp((prev) => ({ ...prev, column: target.value }))
            }
          >
            {
              columnOrder.map((column) => (
                <option key={ column } value={ column }>{ column }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="ASC">
          Ascendente
          <input
            onChange={ handleSort }
            type="radio"
            name="order"
            id="ASC"
            value="ASC"
            checked={ orderUp.sort === 'ASC' }
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            onChange={ handleSort }
            type="radio"
            name="order"
            id="DESC"
            value="DESC"
            checked={ orderUp.sort === 'DESC' }
            data-testid="column-sort-input-desc"
          />
        </label>
        <button
          type="button"
          onClick={ () => setOrder(orderUp) }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
        <div>
          {
            filterByNumericValues.map(({ column, comparison, value }, index) => (
              <div data-testid="filter" key={ index }>
                <p>{`${column} ${comparison} ${value}`}</p>
                <button
                  type="button"
                  onClick={ () => removeFilter(index) }
                >
                  Remove
                </button>
              </div>
            ))
          }
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => removeFilter(removeAll) }
          >
            Remover filtragens
          </button>
        </div>
      </form>
      <Table />
    </div>
  );
}
