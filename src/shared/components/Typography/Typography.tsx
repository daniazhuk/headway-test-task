'use client';

import { createElement, FC, ReactNode } from 'react';

import styles from './Typography.module.css';

interface TypographyProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  color?: 'black' | 'gray' | 'orange';
  fontWeight?: 'normal' | 'bold';
  className?: string;
}

export const Typography: FC<TypographyProps> = ({
  as = 'p',
  color = 'black',
  fontWeight = 'normal',
  className,
  children,
}) => {
  const combinedClassName = `
    ${styles.typography}
    ${styles[`typography--${as}`]}
    ${styles[`typography--${fontWeight}`]}
    ${styles[`typography--color-${color}`]}
    ${className ?? ''}
  `.trim();

  return createElement(as, { className: combinedClassName }, children);
};
