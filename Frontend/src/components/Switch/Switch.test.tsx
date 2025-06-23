import { render, screen, fireEvent } from '@testing-library/react';
import Switch from './Switch';

describe('Switch component', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test('renders input with correct checked state', () => {
        render(<Switch checked={true} onChange={mockOnChange} />);
        const input = screen.getByRole('checkbox') as HTMLInputElement;
        expect(input.checked).toBe(true);
    });

    test('renders input with name attribute when provided', () => {
        render(<Switch name="my-switch" checked={false} onChange={mockOnChange} />);
        const input = screen.getByRole('checkbox') as HTMLInputElement;
        expect(input.name).toBe('my-switch');
    });

    test('calls onChange with new checked value when clicked', () => {
        render(<Switch checked={false} onChange={mockOnChange} />);
        const input = screen.getByRole('checkbox');
        fireEvent.click(input);
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(true);
    });

    test('shows TimeIcon when checked is true', () => {
        const {container} = render(<Switch checked={true} onChange={mockOnChange} />);
        const timeIcon = container.querySelector('.time-icon');
        expect(timeIcon).toBeInTheDocument();
    });

    test('shows CheckIcon when checked is false', () => {
        const {container} = render(<Switch checked={false} onChange={mockOnChange} />);
        const checkIcon = container.querySelector('.check-icon');
        expect(checkIcon).toBeInTheDocument();
    });
});
