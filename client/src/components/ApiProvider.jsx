import { useState } from 'react';
import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ApiContext } from '../hooks/api';

export const ApiProvider = ({ baseUrl, children }) => {
  const [apiKey, setApiKey] = useState('12345');

  const authorizedGet = useCallback(
    (path) =>
      fetch(`${baseUrl}${path}`, {
        method: 'GET',
        headers: { Authorization: `ApiKey ${apiKey}` },
      }).then((response) => response.json()),
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
      }).then((response) => response.json()),
    [baseUrl, apiKey],
  );

  const value = useMemo(
    () => ({
      authorizedGet,
      authorizedPost,
    }),
    [authorizedGet, authorizedPost],
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
