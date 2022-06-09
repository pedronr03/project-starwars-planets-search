import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import Table from '../Table/Table';

export default function MainPage() {
  const {
    onChangeInput,
    filter: { filterByName: { name } },
  } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="inputFilter">
        <input
          id="inputFilter"
          type="text"
          value={ name }
          data-testid="name-filter"
          onChange={ onChangeInput }
        />
      </label>
      <Table />
    </div>
  );
}
