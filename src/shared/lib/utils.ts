import { IAnswer } from '@/shared/types/quiz';

export const areAllSelectedAnswersCorrect = (
  answers: IAnswer[],
  userAnswers: string[],
) => {
  return userAnswers.every(
    (answerId) => answers.find((answer) => answer.id === answerId)?.isCorrect,
  );
};

export const formatPrizeAmount = (cents: number) => {
  return `$${(cents / 100).toLocaleString('en-US')}`;
};
