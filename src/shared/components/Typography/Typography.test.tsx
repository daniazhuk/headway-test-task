import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Typography } from './Typography';

describe('Typography Component', () => {
  it('renders children inside a <p> tag by default', () => {
    render(<Typography as="p">Default paragraph</Typography>);
    const element = screen.getByText(/Default paragraph/i);
    expect(element.tagName).toBe('P');
  });

  it('renders the correct tag when "as" prop is provided', () => {
    render(<Typography as="h1">Heading</Typography>);
    const element = screen.getByText(/Heading/i);
    expect(element.tagName).toBe('H1');
  });

  it('applies the expected color class when "color" is set', () => {
    render(
      <Typography as="h2" color="orange">
        Orange text
      </Typography>,
    );
    const element = screen.getByText(/Orange text/i);
    expect(element).toHaveClass('typography--color-orange');
  });

  it('applies the expected weight class when "fontWeight" is set', () => {
    render(
      <Typography as="h3" fontWeight="bold">
        Bold text
      </Typography>,
    );
    const element = screen.getByText(/Bold text/i);
    expect(element).toHaveClass('typography--bold');
  });

  it('merges a custom class with default ones', () => {
    render(
      <Typography as="h4" className="custom-class">
        With custom class
      </Typography>,
    );
    const element = screen.getByText(/With custom class/i);
    expect(element).toHaveClass('custom-class');
  });

  it('combines multiple classes correctly', () => {
    render(
      <Typography as="h5" color="gray" fontWeight="normal" className="extra">
        Multi-class text
      </Typography>,
    );
    const element = screen.getByText(/Multi-class text/i);
    expect(element).toHaveClass('typography--color-gray');
    expect(element).toHaveClass('typography--normal');
    expect(element).toHaveClass('extra');
  });
});
