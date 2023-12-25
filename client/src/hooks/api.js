import { useCallback, useMemo } from "react";

export const useApi = (baseUrl, apiKey) => {
  const authorizedGet = useCallback(
    (path) =>
      fetch(`${baseUrl}${path}`, {
        method: "GET",
        headers: { Authorization: `ApiKey ${apiKey}` },
      }).then((response) => response.json()),
    [baseUrl, apiKey]
  );

  const authorizedPost = useCallback(
    (path, body) =>
      fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
          Authorization: `ApiKey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) => response.json()),
    [baseUrl, apiKey]
  );

  return useMemo(
    () => ({ authorizedGet, authorizedPost }),
    [authorizedGet, authorizedPost]
  );
};
