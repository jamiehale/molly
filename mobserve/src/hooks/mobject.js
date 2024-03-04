import { useState, useEffect, useCallback } from 'react';

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

export const useMobject = (id) => {
  const [mobject, setMobject] = useState(undefined);

  const loadMobject = useCallback(
    () =>
      fetch(`http://localhost:3000/m/${id}`, {
        method: 'GET',
      })
        .then(handleError)
        .then((response) => response.json())
        .then(setMobject),
    [id, setMobject],
  );

  useEffect(() => {
    loadMobject();
  }, [loadMobject]);

  return { mobject, reloadMobject: loadMobject };
};
