import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { useQuiz } from '@/shared/context/QuizContext';
import GameOver from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/shared/context/QuizContext', () => ({
  useQuiz: jest.fn(),
}));

jest.mock('@/shared/lib/utils', () => ({
  formatPrizeAmount: (prize: number) => prize,
}));

jest.mock('@/shared/images/svg/Thumb.svg', () => {
  const ThumbSvg = ({ className }: { className: string }) => (
    <svg data-testid="thumb-svg" className={className} />
  );
  return ThumbSvg;
});

jest.mock('@/shared/components', () => ({
  Button: ({
    className,
    onClick,
    children,
  }: {
    className?: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  ),
  Typography: ({
    children,
    className,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => <div className={className}>{children}</div>,
}));

describe('GameOver Component', () => {
  const mockReplace = jest.fn();
  const mockResetGame = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: true,
      totalWinnings: 1000,
      resetGame: mockResetGame,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the GameOver component with correct elements', () => {
    render(<GameOver />);

    const thumbImage = screen.getByTestId('thumb-svg');
    expect(thumbImage).toBeInTheDocument();
    expect(thumbImage).toHaveAttribute(
      'class',
      expect.stringContaining('game-over__image'),
    );

    const title = screen.getByText(/Total score:/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('game-over__title');

    const prize = screen.getByText('1000 earned');
    expect(prize).toBeInTheDocument();
    expect(prize).toHaveClass('game-over__prize');

    const button = screen.getByRole('button', { name: /Try again/i });
    expect(button).toBeInTheDocument();
  });

  it('calls resetGame and router.replace on Try again click', () => {
    render(<GameOver />);

    const button = screen.getByRole('button', { name: /Try again/i });
    fireEvent.click(button);

    expect(mockResetGame).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith('/game');
  });

  it('redirects to home page if isGameOver is false', () => {
    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: false,
      totalWinnings: 0,
      resetGame: mockResetGame,
    });

    render(<GameOver />);

    expect(mockReplace).toHaveBeenCalledWith('/');
  });
});
