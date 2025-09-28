import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('fullWidth');
  });

  it('does not apply fullWidth class when fullWidth is false', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('fullWidth');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when button is disabled', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Click Me
      </Button>,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
