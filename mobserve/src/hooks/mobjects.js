import { useState, useEffect } from 'react';

const handleError = async (response) => {
  if (!response.ok) {
    let body;
    try {
      body = await response.json();
    } catch {
      throw new Error(`Server returned ${response.status}`);
    }
    throw new Error(body.message);
  }
  return response;
};

export const useMobjects = () => {
  const [mobjects, setMobjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/q', {
      method: 'GET',
    })
      .then(handleError)
      .then((response) => response.json())
      .then(setMobjects);
  }, [setMobjects]);

  return { mobjects };
};
