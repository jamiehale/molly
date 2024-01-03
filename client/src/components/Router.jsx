import React, { useEffect } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { classnames } from '../lib/classnames';

const RouterContext = createContext({
  path: '',
  setPath: () => {},
});

export const Router = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopstate = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const value = useMemo(() => {
    return {
      path,
      setPath,
    };
  }, [path, setPath]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

Router.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Route = ({ path, children }) => {
  const { path: currentPath } = useContext(RouterContext);

  const pathParts = path.split('/');
  const currentPathParts = currentPath.split('/');
  if (pathParts.length !== currentPathParts.length) {
    return null;
  }

  const params = {};
  for (let i = 0; i < pathParts.length; i++) {
    if (pathParts[i].startsWith(':')) {
      params[pathParts[i].substr(1)] = currentPathParts[i];
    } else {
      if (pathParts[i] !== currentPathParts[i]) {
        return null;
      }
    }
  }

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { params }),
  );
};

Route.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const Link = ({ className, to, children }) => {
  const { setPath } = useContext(RouterContext);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      window.history.pushState(null, to, to);
      setPath(to);
    },
    [to, setPath],
  );

  return (
    <a
      className={classnames('underline underline-offset-2', className)}
      href={to}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const useNav = () => {
  const { setPath } = useContext(RouterContext);

  const navigateTo = useCallback(
    (path) => {
      window.history.pushState(null, path, path);
      setPath(path);
    },
    [setPath],
  );

  return useMemo(
    () => ({
      navigateTo,
    }),
    [navigateTo],
  );
};
