const planetsAPI = async () => {
  const link = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const fetchPlanets = await fetch(link).then((requestPlanets) => requestPlanets.json());
  return fetchPlanets;
};

export default planetsAPI;
