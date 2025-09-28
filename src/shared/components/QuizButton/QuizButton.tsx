import { FC } from 'react';

import styles from './QuizButton.module.css';
import WrapperSvg from './WrapperSvg.svg';

export interface Props {
  children: React.ReactNode;
  isSelected?: boolean;
  isCorrect?: boolean;
  isRevealed?: boolean;
  className?: string;
  onClick?: () => void;
}

export const QuizButton: FC<Props> = ({
  children,
  isSelected = false,
  isCorrect = false,
  isRevealed = false,
  className = '',
  onClick,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      className={`
        ${styles['quiz-button']} 
        ${isSelected ? styles['quiz-button--selected'] : ''} 
        ${isRevealed && isCorrect ? styles['quiz-button--correct'] : ''}
        ${isRevealed && !isCorrect ? styles['quiz-button--wrong'] : ''}
        ${className}
      `}
      data-testid="quiz-button"
    >
      <span className={styles['quiz-button__line']} />
      <div className={styles['quiz-button__container']}>
        <WrapperSvg className={styles['quiz-button__icon']} />
        <div className={styles['quiz-button__content']}>{children}</div>
      </div>
      <span className={styles['quiz-button__line']} />
    </button>
  );
};
