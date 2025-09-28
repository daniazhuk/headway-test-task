import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { Question } from './Question';
import { useQuiz } from '@/shared/context/QuizContext';
import { IAnswer, IQuestion } from '@/shared/types/quiz';
import { ACTION_DELAY } from '@/shared/constants/game';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/shared/context/QuizContext', () => ({
  useQuiz: jest.fn(),
}));

jest.mock('../AnswersList', () => {
  const MockAnswersList = ({
    answers,
    onAnswerSelect,
  }: {
    answers: IAnswer[];
    onAnswerSelect: (id: string) => void;
  }) => (
    <div>
      {answers.map((answer) => (
        <button
          type="button"
          key={answer.id}
          onClick={() => onAnswerSelect(answer.id)}
        >
          {answer.text}
        </button>
      ))}
    </div>
  );

  return { AnswersList: MockAnswersList };
});

jest.mock('@/shared/components', () => ({
  Typography: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockGoToNextQuestion = jest.fn();
const mockFinishGame = jest.fn();
const mockRouter = { replace: jest.fn() };

const mockQuestion: IQuestion = {
  id: '1',
  text: 'What is 2 + 2?',
  prizeAmount: 1000,
  minCorrectAnswers: 1,
  answers: [
    { id: 'a', text: '3', isCorrect: false },
    { id: 'b', text: '4', isCorrect: true },
    { id: 'c', text: '5', isCorrect: false },
  ],
};

describe('Question Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useQuiz as jest.Mock).mockReturnValue({
      goToNextQuestion: mockGoToNextQuestion,
      finishGame: mockFinishGame,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the question text', () => {
    render(<Question question={mockQuestion} hasNextQuestion />);
    expect(screen.getByText(/What is 2 \+ 2\?/i)).toBeInTheDocument();
  });

  it('calls goToNextQuestion if the correct answer is chosen and there is a next question', () => {
    render(<Question question={mockQuestion} hasNextQuestion />);

    fireEvent.click(screen.getByText('4'));
    jest.advanceTimersByTime(ACTION_DELAY);

    expect(mockGoToNextQuestion).toHaveBeenCalledWith(mockQuestion.prizeAmount);
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });

  it('calls finishGame if the answer is incorrect or there is no next question', () => {
    render(<Question question={mockQuestion} hasNextQuestion={false} />);

    fireEvent.click(screen.getByText('3'));
    jest.advanceTimersByTime(ACTION_DELAY);

    expect(mockRouter.replace).toHaveBeenCalledWith('/game-over');
    expect(mockFinishGame).toHaveBeenCalledWith(mockQuestion.prizeAmount);
  });

  it('blocks answer selection after reveal', () => {
    render(<Question question={mockQuestion} hasNextQuestion />);

    fireEvent.click(screen.getByText('4')); // правильный
    fireEvent.click(screen.getByText('3')); // должен быть заблокирован
    jest.advanceTimersByTime(ACTION_DELAY);

    expect(mockGoToNextQuestion).toHaveBeenCalledWith(mockQuestion.prizeAmount);
    expect(mockFinishGame).not.toHaveBeenCalled();
  });
});
