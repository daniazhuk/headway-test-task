'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQuiz } from '@/shared/context/QuizContext';
import { areAllSelectedAnswersCorrect } from '@/shared/lib/utils';
import { IQuestion } from '@/shared/types/quiz';
import { AnswersList } from '../AnswersList';
import { Typography } from '../Typography/Typography';
import { ACTION_DELAY } from '@/shared/constants/game';
import styles from './Question.module.css';

interface Props {
  question: IQuestion;
  hasNextQuestion: boolean;
}

export const Question: FC<Props> = ({ question, hasNextQuestion }) => {
  const router = useRouter();
  const { goToNextQuestion, finishGame } = useQuiz();

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const onAnswersCheck = (userAnswers: string[]) => {
    if (userAnswers.length !== question.minCorrectAnswers) return;

    setIsRevealed(true);

    const allCorrect = areAllSelectedAnswersCorrect(
      question.answers,
      userAnswers,
    );

    const proceedToNext = allCorrect && hasNextQuestion;

    setTimeout(() => {
      if (proceedToNext) {
        setSelectedAnswers([]);
        setIsRevealed(false);
        goToNextQuestion(question.prizeAmount);
      } else {
        router.replace('/game-over');
        finishGame(question.prizeAmount);
      }
    }, ACTION_DELAY);
  };

  const onAnswerSelect = (answerId: string) => {
    if (isRevealed) return;

    const updated = selectedAnswers.includes(answerId)
      ? selectedAnswers.filter((id) => id !== answerId)
      : [...selectedAnswers, answerId];

    setSelectedAnswers(updated);
    onAnswersCheck(updated);
  };

  return (
    <div className={styles.question}>
      <Typography
        as="h2"
        color="black"
        fontWeight="bold"
        className={styles.question__text}
      >
        {question.text}
      </Typography>

      <AnswersList
        answers={question.answers}
        userAnswers={selectedAnswers}
        isRevealed={isRevealed}
        onAnswerSelect={onAnswerSelect}
      />
    </div>
  );
};
