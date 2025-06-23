import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
    const mockSetPage = jest.fn();

    beforeEach(() => {
        mockSetPage.mockClear();
    });

    test('renders correct page buttons and ellipsis', () => {
        render(<Pagination page={5} totalPage={10} setPage={mockSetPage} />);

        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();

        const ellipsis = screen.getAllByText('...');
        expect(ellipsis.length).toBeGreaterThan(0);
    });

    test('highlights the current page button', () => {
        const {container} = render(<Pagination page={3} totalPage={5} setPage={mockSetPage} />);
        const activeButton = container.querySelector('#paginationButton-3') as HTMLButtonElement;
        expect(activeButton?.className).toMatch(/paginationButtonPage/);
    });

    test('calls setPage when clicking on a non-active page button', () => {
        render(<Pagination page={2} totalPage={4} setPage={mockSetPage} />);
        const button = screen.getByRole('button', { name: '3' });
        fireEvent.click(button);
        expect(mockSetPage).toHaveBeenCalledWith(3);
    });

    test('does not call setPage when clicking on the active page button', () => {
        render(<Pagination page={2} totalPage={4} setPage={mockSetPage} />);
        const activeButton = screen.getByRole('button', { name: '2' });
        fireEvent.click(activeButton);
        expect(mockSetPage).not.toHaveBeenCalled();
    });

    test('renders only first and last page when totalPage is 1', () => {
        render(<Pagination page={1} totalPage={1} setPage={mockSetPage} />);
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
        expect(screen.queryByText('...')).toBeNull();
    });
});
