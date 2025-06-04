import React from 'react';
import classNames from 'classnames';

export const Button = ({ children, variant = 'default', className, ...props }) => {
  const baseStyles = 'px-4 py-2 text-sm font-medium rounded no-select';
  const variants = {
    default: 'bg-black text-white hover:bg-gray-800',
    outline: 'border border-gray-300 text-black hover:bg-gray-100',
  };

  return (
    <button
      className={classNames(baseStyles, variants[variant], className)}
      style={{ touchAction: 'manipulation' }}
      {...props}
    >
      {children}
    </button>
  );
};