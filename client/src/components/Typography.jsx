import { classnames } from '../lib/classnames';

const types = {
  title: ({ className, children, ...props }) => (
    <h1 className={classnames('text-4xl mb-2', className)} {...props}>
      {children}
    </h1>
  ),
  subtitle: ({ className, children, ...props }) => (
    <h1 className={classnames('text-2xl mb-2', className)} {...props}>
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
