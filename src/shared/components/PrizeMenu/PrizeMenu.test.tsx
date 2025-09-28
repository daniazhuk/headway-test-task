import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PrizeMenu } from './PrizeMenu';
import { IQuestion } from '@/shared/types/quiz';

jest.mock('../PrizeList/PrizeList', () => ({
  PrizeList: () => <div data-testid="prizes-list">PrizeList</div>,
}));

jest.mock('@/shared/images/svg/Menu.svg', () => {
  const MenuIcon = () => <svg data-testid="menu-icon" />;
  return MenuIcon;
});
jest.mock('@/shared/images/svg/Cross.svg', () => {
  const CrossIcon = () => <svg data-testid="cross-icon" />;
  return CrossIcon;
});

const mockQuestions: IQuestion[] = [
  { id: '1', text: 'Q1', prizeAmount: 1000, answers: [], minCorrectAnswers: 1 },
  { id: '2', text: 'Q2', prizeAmount: 2000, answers: [], minCorrectAnswers: 1 },
  { id: '3', text: 'Q3', prizeAmount: 3000, answers: [], minCorrectAnswers: 1 },
];

describe('PrizesMenu Component', () => {
  it('renders the correct icon (Menu or Cross) based on the state', () => {
    render(<PrizeMenu questions={mockQuestions} currentQuestionIndex={1} />);

    const menuButton = screen.getByRole('button');

    waitFor(() => {
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('cross-icon')).not.toBeInTheDocument();
    });

    fireEvent.click(menuButton);

    waitFor(() => {
      expect(screen.getByTestId('cross-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument();
    });

    fireEvent.click(menuButton);

    waitFor(() => {
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('cross-icon')).not.toBeInTheDocument();
    });
  });

  it('renders prizes list and toggles visibility based on menu state', () => {
    render(<PrizeMenu questions={mockQuestions} currentQuestionIndex={1} />);

    const menuButton = screen.getByRole('button');
    const prizesList = screen.getByTestId('prizes-list');

    waitFor(() => {
      expect(prizesList).not.toBeVisible();
    });

    fireEvent.click(menuButton);

    waitFor(() => {
      expect(prizesList).toBeVisible();
    });

    fireEvent.click(menuButton);

    waitFor(() => {
      expect(screen.queryByTestId('prizes-list')).not.toBeVisible();
    });
  });
});
