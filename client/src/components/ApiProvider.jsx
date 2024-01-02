import { useState } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ApiContext } from '../hooks/api';

const handleError = (response) => {
  if (!response.ok) {
    let body;
    try {
      body = response.json();
    } catch {
      throw new Error(`Server returned ${response.status}`);
    }
    throw new Error(body.message);
  }
  return response;
};

export const ApiProvider = ({ baseUrl, children }) => {
  const [apiKey, setApiKey] = useState('12345');

  const authorizedGet = useCallback(
    (path) =>
      fetch(`${baseUrl}${path}`, {
        method: 'GET',
        headers: { Authorization: `ApiKey ${apiKey}` },
      })
        .then(handleError)
        .then((response) => response.json()),
    [baseUrl, apiKey],
  );

  const authorizedPost = useCallback(
    (path, body) =>
      fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `ApiKey ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(handleError)
        .then((response) => response.json()),
    [baseUrl, apiKey],
  );

  const authorizedPatch = useCallback(
    (path, body) =>
      fetch(`${baseUrl}${path}`, {
        method: 'PATCH',
        headers: {
          Authorization: `ApiKey ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(handleError)
        .then((response) => response.json()),
    [baseUrl, apiKey],
  );

  const value = {
    authorizedGet,
    authorizedPost,
    authorizedPatch,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
