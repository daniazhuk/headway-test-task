import { FC, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  fullWidth = false,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ''}
      ${className || ''}
      `}
    >
      {children}
    </button>
  );
};
