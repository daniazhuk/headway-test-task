import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Step } from './Step';

jest.mock('./WrapperSvg.svg', () => {
  const MockedSvg = () => <svg data-testid="mocked-svg" />;
  return MockedSvg;
});

describe('Step Component', () => {
  it('renders correctly with children', () => {
    render(<Step>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).toBeInTheDocument();
    expect(step).toHaveTextContent('Step Content');
  });

  it('applies "step--active" class when active is true', () => {
    render(<Step active>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).toHaveClass('step--active');
  });

  it('does not apply "step--active" class when active is false', () => {
    render(<Step>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).not.toHaveClass('step--active');
  });

  it('applies "step--completed" class when completed is true', () => {
    render(<Step completed>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).toHaveClass('step--completed');
  });

  it('does not apply "step--completed" class when completed is false', () => {
    render(<Step>Step Content</Step>);
    const step = screen.getByTestId('step');
    expect(step).not.toHaveClass('step--completed');
  });
});
