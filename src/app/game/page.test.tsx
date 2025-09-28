import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { useQuiz } from '@/shared/context/QuizContext';
import { useMockedQuizData } from '@/shared/hooks';
import Quiz from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/shared/context/QuizContext', () => ({
  useQuiz: jest.fn(),
}));

jest.mock('@/shared/hooks', () => ({
  useMockedQuizData: jest.fn(),
}));

jest.mock('@/shared/components', () => ({
  Loader: () => <div>Loading...</div>,
  Question: () => <div>Question</div>,
  PrizeMenu: () => <div>PrizeMenu</div>,
  PrizeList: () => <div>PrizeList</div>,
}));

describe('Quiz Component', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when data is loading', () => {
    (useMockedQuizData as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });
    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: false,
      currentQuestionIndex: 0,
    });

    render(<Quiz />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    (useMockedQuizData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: 'Some error occurred',
    });

    render(<Quiz />);

    expect(screen.getByText('Error: Some error occurred')).toBeInTheDocument();
  });

  it('redirects to game-over page when isGameOver is true', async () => {
    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: true,
      currentQuestionIndex: 0,
    });

    (useMockedQuizData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(<Quiz />);

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/game-over'));
  });

  it('renders the quiz page correctly when data is available and not loading', () => {
    const mockData = [
      {
        id: '1',
        text: 'What is 2 + 2?',
        answers: [],
        minCorrectAnswers: 1,
        prizeAmount: 100,
      },
      {
        id: '2',
        text: 'What is 3 + 5?',
        answers: [],
        minCorrectAnswers: 1,
        prizeAmount: 200,
      },
    ];

    (useQuiz as jest.Mock).mockReturnValue({
      isGameOver: false,
      currentQuestionIndex: 0,
    });

    (useMockedQuizData as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Quiz />);

    expect(screen.getByText('Question')).toBeInTheDocument();
    expect(screen.getByText('PrizeMenu')).toBeInTheDocument();
    expect(screen.getByText('PrizeList')).toBeInTheDocument();
  });
});
