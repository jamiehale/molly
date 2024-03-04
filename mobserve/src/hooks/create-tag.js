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

export const useCreateTag = (key) => {
  const createTag = useCallback(
    (tag) =>
      fetch(`http://localhost:3000/o/${key}/-/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag }),
      }).then(handleError),
    [key],
  );

  return { createTag };
};
