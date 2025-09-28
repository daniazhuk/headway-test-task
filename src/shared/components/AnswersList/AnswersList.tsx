import { FC } from 'react';

import { IAnswer } from '@/shared/types/quiz';
import styles from './AnswersList.module.css';
import { QuizButton } from '../QuizButton/QuizButton';
import { Typography } from '../Typography/Typography';
import { ANSWER_LABELS } from '@/shared/constants/game';

interface Props {
  answers: IAnswer[];
  userAnswers: string[];
  isRevealed: boolean;
  onAnswerSelect: (answerId: string) => void;
}

export const AnswersList: FC<Props> = ({
  answers,
  userAnswers,
  isRevealed,
  onAnswerSelect,
}) => {
  return (
    <div className={styles['answers-list']}>
      {answers.map(({ text, isCorrect, id }, index) => {
        const isSelected = userAnswers.includes(id);
        const isAnswerRevealed = isCorrect || isSelected ? isRevealed : false;
        return (
          <QuizButton
            key={id}
            isCorrect={isCorrect}
            isSelected={isSelected}
            isRevealed={isAnswerRevealed}
            className={styles['answers-list__answer']}
            onClick={() => onAnswerSelect(id)}
          >
            <div className={styles['answers-list__answer-text']}>
              <Typography
                as="p"
                color="orange"
                fontWeight="bold"
                className={styles['answers-list__label']}
              >
                {ANSWER_LABELS[index]}
              </Typography>
              <Typography as="p">{text}</Typography>
            </div>
          </QuizButton>
        );
      })}
    </div>
  );
};
