import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";

const RouterContext = createContext({
  path: "",
  setPath: () => {},
});

export const Router = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);

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

  if (path === currentPath) {
    return children;
  }

  return null;
};

Route.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const Link = ({ to, children }) => {
  const { setPath } = useContext(RouterContext);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      window.history.pushState(null, to, to);
      setPath(to);
    },
    [to, setPath]
  );

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
