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

export const useDeleteMobjectTag = (key) => {
  const deleteTag = useCallback(
    (tag) =>
      fetch(`http://localhost:3000/o/${key}/-/tags/${tag}`, {
        method: 'DELETE',
      }).then(handleError),
    [key],
  );

  return { deleteTag };
};
