import { useCallback } from 'react';

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

export const useCreateAttribute = (key) => {
  const createAttribute = useCallback(
    (name, value) =>
      fetch(`http://localhost:3000/o/${key}/-/attributes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, value }),
      }).then(handleError),
    [key],
  );

  return { createAttribute };
};
