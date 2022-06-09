import { useEffect, useState } from 'react';
import planetsAPI from '../services/planetAPI';

export default function useApi() {
  const [request, setRequest] = useState({});

  const getPlanets = async () => {
    const planets = await planetsAPI();
    setRequest(planets);
  };

  useEffect(() => getPlanets(), []);

  return { request, getPlanets };
}
