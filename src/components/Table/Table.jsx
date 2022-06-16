import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

export default function Table() {
  const { request } = useContext(PlanetsContext);

  const headers = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  return (
    <table>
      <tbody>
        <tr>
          {
            headers.map((header) => <th key={ header }>{ header }</th>)
          }
        </tr>
        {
          request.length
            ? request.map((result, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{ result.name }</td>
                <td>{ result.rotation_period }</td>
                <td>{ result.orbital_period }</td>
                <td>{ result.diameter }</td>
                <td>{ result.climate }</td>
                <td>{ result.gravity }</td>
                <td>{ result.terrain }</td>
                <td>{ result.surface_water }</td>
                <td>{ result.population }</td>
                <td>{ result.films }</td>
                <td>{ result.created }</td>
                <td>{ result.edited }</td>
                <td>{ result.url }</td>
              </tr>
            ))
            : null
        }
      </tbody>
    </table>
  );
}
