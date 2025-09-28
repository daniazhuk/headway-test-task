import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { AnswersList } from './AnswersList';
import { IAnswer } from '@/shared/types/quiz';
import { ANSWER_LABELS } from '@/shared/constants/game';

jest.mock('@/shared/components/QuizButton/QuizButton', () => ({
  QuizButton: ({
    children,
    isSelected,
    isRevealed,
    isCorrect,
    onClick,
  }: {
    children: React.ReactNode;
    isSelected?: boolean;
    isRevealed?: boolean;
    isCorrect?: boolean;
    onClick?: () => void;
  }) => {
    let className = 'quiz-button';
    if (isSelected) className += ' quiz-button--selected';
    if (isRevealed && isCorrect) className += ' quiz-button--correct';
    if (isRevealed && isCorrect === false) className += ' quiz-button--wrong';

    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  },
}));

jest.mock('@/shared/components/Typography', () => ({
  Typography: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
}));

const mockAnswers: IAnswer[] = [
  { id: '1', text: 'Answer 1', isCorrect: false },
  { id: '2', text: 'Answer 2', isCorrect: true },
  { id: '3', text: 'Answer 3', isCorrect: false },
  { id: '4', text: 'Answer 4', isCorrect: false },
];

describe('AnswersList Component', () => {
  const mockOnAnswerSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all answers with labels', () => {
    render(
      <AnswersList
        answers={mockAnswers}
        userAnswers={[]}
        isRevealed={false}
        onAnswerSelect={mockOnAnswerSelect}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockAnswers.length);

    mockAnswers.forEach((answer, idx) => {
      expect(screen.getByText(answer.text)).toBeInTheDocument();
      expect(screen.getByText(ANSWER_LABELS[idx])).toBeInTheDocument();
    });
  });

  it('calls onAnswerSelect with the answer id when clicked', () => {
    render(
      <AnswersList
        answers={mockAnswers}
        userAnswers={[]}
        isRevealed={false}
        onAnswerSelect={mockOnAnswerSelect}
      />,
    );

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockOnAnswerSelect).toHaveBeenCalledWith('1');
  });

  it('applies correct classes for selection and reveal state', () => {
    render(
      <AnswersList
        answers={mockAnswers}
        userAnswers={['1']}
        isRevealed
        onAnswerSelect={mockOnAnswerSelect}
      />,
    );

    const [first, second] = screen.getAllByRole('button');

    expect(first).toHaveClass('quiz-button--selected');
    expect(first).toHaveClass('quiz-button--wrong');

    expect(second).not.toHaveClass('quiz-button--selected');
    expect(second).toHaveClass('quiz-button--correct');
  });
});
