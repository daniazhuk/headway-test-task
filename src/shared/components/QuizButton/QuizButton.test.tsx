import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { QuizButton } from './QuizButton';

jest.mock('./WrapperSvg.svg', () => {
  const MockedSvg = () => <svg data-testid="mocked-svg" />;
  return MockedSvg;
});

describe('QuizButton Component', () => {
  it('renders with the correct classes when selected', () => {
    render(<QuizButton isSelected>Answer</QuizButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('quiz-button--selected');
  });

  it('renders with the correct classes when revealed and correct', () => {
    render(
      <QuizButton isRevealed isCorrect>
        Answer
      </QuizButton>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('quiz-button--correct');
  });

  it('renders with the correct classes when revealed and wrong', () => {
    render(
      <QuizButton isRevealed isCorrect={false}>
        Answer
      </QuizButton>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('quiz-button--wrong');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<QuizButton onClick={onClick}>Answer</QuizButton>);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter or Space is pressed', () => {
    const onClick = jest.fn();
    render(<QuizButton onClick={onClick}>Answer</QuizButton>);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
