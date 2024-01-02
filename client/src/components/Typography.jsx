import { classnames } from '../lib/classnames';

const types = {
  title: ({ className, children, ...props }) => (
    <h1 className={classnames(className, '')} {...props}>
      {children}
    </h1>
  ),
  p: ({ className, children, ...props }) => (
    <p className={classnames(className, '')} {...props}>
      {children}
    </p>
  ),
  error: ({ className, children, ...props }) => (
    <p className={classnames(className, 'italic text-red-600')} {...props}>
      {children}
    </p>
  ),
};

export const Typography = ({ as, ...props }) => types[as || 'p'](props);
