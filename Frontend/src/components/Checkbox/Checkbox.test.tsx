import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
    test('renders label when provided', () => {
        render(<Checkbox checked={false} onChange={() => {}} label="My label" />);
        expect(screen.getByText('My label')).toBeInTheDocument();
    });

    test('does not render label when not provided', () => {
        render(<Checkbox checked={false} onChange={() => {}} />);
        expect(screen.queryByText(/.+/)).toBeNull();
    });

    test('shows CheckSquareIcon when checked is true', () => {
        const {container} = render(<Checkbox checked={true} onChange={() => {}} />);
        const checkedIcon = container.querySelector('.check-square-icon');
        expect(checkedIcon).toBeInTheDocument();
    });

    test('shows MinusSquareIcon when checked is false and preChecked is true', () => {
        const {container} = render(<Checkbox checked={false} preChecked={true} onChange={() => {}} />);
        const minusIcon = container.querySelector('.minus-square-icon');
        expect(minusIcon).toBeInTheDocument();
    });

    test('shows SquareIcon when checked and preChecked are false', () => {
        const {container} = render(<Checkbox checked={false} preChecked={false} onChange={() => {}} />);
        const squareIcon = container.querySelector('.square-icon');
        expect(squareIcon).toBeInTheDocument();
    });

    test('input checkbox reflects the checked value', () => {
        render(<Checkbox checked={true} onChange={() => {}} />);
        const input = screen.getByRole('checkbox') as HTMLInputElement;
        expect(input.checked).toBe(true);
    });

    test('clicking checkbox triggers onChange handler', () => {
        const onChange = jest.fn();
        render(<Checkbox checked={false} onChange={onChange} />);
        const input = screen.getByRole('checkbox');
        fireEvent.click(input);
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('input has the name attribute if provided', () => {
        render(<Checkbox checked={false} onChange={() => {}} name="my-checkbox" />);
        const input = screen.getByRole('checkbox') as HTMLInputElement;
        expect(input.name).toBe('my-checkbox');
    });
});
