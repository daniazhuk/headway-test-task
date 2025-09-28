import { FC, ReactNode } from 'react';

import WrapperSvg from './WrapperSvg.svg';
import styles from './Step.module.css';

interface StepProps {
  active?: boolean;
  completed?: boolean;
  children: ReactNode;
}

export const Step: FC<StepProps> = ({
  active = false,
  completed = false,
  children,
}) => {
  const className = `
    ${styles.step}
    ${active ? styles['step--active'] : ''}
    ${completed ? styles['step--completed'] : ''}
  `.trim();

  return (
    <div data-testid="step" className={className}>
      <span className={styles.step__line} />
      <div className={styles.step__container}>
        <WrapperSvg className={styles.step__icon} />
        <div className={styles.step__content}>{children}</div>
      </div>
      <span className={styles.step__line} />
    </div>
  );
};
