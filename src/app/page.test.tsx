import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Home from './page';

jest.mock('@/shared/images/svg/Thumb.svg', () => {
  const ThumbSvg = ({ className }: { className: string }) => (
    <svg data-testid="thumb-svg" className={className} />
  );
  ThumbSvg.displayName = 'ThumbSvg';
  return ThumbSvg;
});

jest.mock('@/shared/components', () => ({
  Button: ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => (
    <button type="button" className={className}>
      {children}
    </button>
  ),
  Typography: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

describe('Home Component', () => {
  it('renders the Home component with correct elements', () => {
    render(<Home />);

    const thumbImage = screen.getByTestId('thumb-svg');
    expect(thumbImage).toBeInTheDocument();
    expect(thumbImage).toHaveAttribute(
      'class',
      expect.stringContaining('home__image'),
    );

    const heading = screen.getByText(/Who wants to be a millionaire\?/i);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute(
      'class',
      expect.stringContaining('home__text'),
    );

    const link = screen.getByRole('link', { name: /Start/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'class',
      expect.stringContaining('home__button'),
    );
    expect(link).toHaveAttribute('href', '/game');
  });
});
