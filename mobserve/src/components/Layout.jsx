import PropTypes from 'prop-types';
import { Link } from './Router';
import { List, ListItem } from './List';

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    <span className="ms-3">{children}</span>
  </Link>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const Layout = ({ children }) => (
  <div>
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <List>
          <ListItem>
            <NavLink to="/">All</NavLink>
          </ListItem>
        </List>
      </div>
    </aside>
    <div className="p-4 sm:ml-64">{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};
