import { FC } from 'react';

import { IQuestion } from '@/shared/types/quiz';
import { formatPrizeAmount } from '@/shared/lib/utils';
import styles from './PrizeList.module.css';
import { Step } from '../Step/Step';

interface Props {
  questions: IQuestion[];
  currentQuestionIndex: number;
}

export const PrizeList: FC<Props> = ({ questions, currentQuestionIndex }) => {
  return (
    <div className={styles['prize-list']}>
      {questions.map((question, index) => (
        <Step
          key={question.id}
          active={index === currentQuestionIndex}
          completed={index < currentQuestionIndex}
        >
          {formatPrizeAmount(question.prizeAmount)}
        </Step>
      ))}
    </div>
  );
};
