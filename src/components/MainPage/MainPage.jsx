import React, { useContext, useState } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import Table from '../Table/Table';

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

const columnFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparisonFilter = [
  'maior que',
  'menor que',
  'igual a',
];

export default function MainPage() {
  const {
    onChangeInput,
    setNewFilter,
    filter: { filterByName: { name } },
  } = useContext(PlanetsContext);
  const [filter, setFilter] = useState(INITIAL_STATE);

  const handle = ({ target }) => setFilter({ ...filter, [target.id]: target.value });

  const getFilter = () => {
    setNewFilter({ ...filter });
    setFilter(INITIAL_STATE);
  };

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
            onChange={ handle }
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
            value={ filter.comparison }
            onChange={ handle }
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
            onChange={ handle }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ getFilter }
        >
          Filtrar
        </button>
      </form>
      <Table />
    </div>
  );
}
