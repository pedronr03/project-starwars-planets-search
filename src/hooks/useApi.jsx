import { useEffect, useState } from 'react';
import planetsAPI from '../services/planetAPI';

export default function useApi() {
  const [requestAPI, setRequest] = useState({});

  useEffect(() => {
    const getPlanets = async () => {
      const planets = await planetsAPI();
      setRequest(planets.results);
    };
    getPlanets();
  }, []);

  return { requestAPI };
}
