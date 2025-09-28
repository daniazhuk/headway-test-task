import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PrizeList } from './PrizeList';
import { IQuestion } from '@/shared/types/quiz';

jest.mock('@/shared/components/Step/Step', () => ({
  Step: ({
    children,
    active,
    completed,
  }: {
    children: React.ReactNode;
    active?: boolean;
    completed?: boolean;
  }) => (
    <div data-testid="step" data-current={active} data-answered={completed}>
      {children}
    </div>
  ),
}));

jest.mock('@/shared/lib/utils', () => ({
  formatPrizeAmount: (prize: number) => `$${prize}`,
}));

const mockQuestions: IQuestion[] = [
  {
    id: '1',
    text: 'text1',
    prizeAmount: 1000,
    answers: [],
    minCorrectAnswers: 1,
  },
  {
    id: '2',
    text: 'text2',
    prizeAmount: 2000,
    answers: [],
    minCorrectAnswers: 1,
  },
  {
    id: '3',
    text: 'text3',
    prizeAmount: 3000,
    answers: [],
    minCorrectAnswers: 1,
  },
];

describe('PrizeList Component', () => {
  it('renders the prizes correctly', () => {
    render(<PrizeList questions={mockQuestions} currentQuestionIndex={1} />);

    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByText('$2000')).toBeInTheDocument();
    expect(screen.getByText('$3000')).toBeInTheDocument();
  });

  it('marks the current and answered steps correctly', () => {
    render(<PrizeList questions={mockQuestions} currentQuestionIndex={1} />);

    const steps = screen.getAllByTestId('step');

    expect(steps[0]).toHaveAttribute('data-answered', 'true');
    expect(steps[0]).toHaveAttribute('data-current', 'false');

    expect(steps[1]).toHaveAttribute('data-answered', 'false');
    expect(steps[1]).toHaveAttribute('data-current', 'true');

    expect(steps[2]).toHaveAttribute('data-answered', 'false');
    expect(steps[2]).toHaveAttribute('data-current', 'false');
  });
});
