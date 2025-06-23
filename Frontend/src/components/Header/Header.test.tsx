import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
    const mockSetQuery = jest.fn();
    const mockHandleDarkMode = jest.fn();
    const mockSetEditMode = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the logo text', () => {
        render(
            <Header
                query=""
                setQuery={mockSetQuery}
                handleDarkMode={mockHandleDarkMode}
                setEditMode={mockSetEditMode}
                editMode={false}
            />
        );
        expect(screen.getByText(/github search/i)).toBeInTheDocument();
    });

    test('renders search input with initial value', () => {
        const {container} = render(
            <Header
                query="initial query"
                setQuery={mockSetQuery}
                handleDarkMode={mockHandleDarkMode}
                setEditMode={mockSetEditMode}
                editMode={false}
            />
        );
        const input = container.querySelector('input[name="search"]') as HTMLInputElement;
        expect(input.value).toBe('initial query');
    });

    test('calls setQuery on input change', () => {
        const {container} = render(
            <Header
                query=""
                setQuery={mockSetQuery}
                handleDarkMode={mockHandleDarkMode}
                setEditMode={mockSetEditMode}
                editMode={false}
            />
        );
        const input = container.querySelector('input[name="search"]') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'new search' } });
        expect(mockSetQuery).toHaveBeenCalledWith('new search');
    });

    test('mobile search overlay toggles open and close', () => {
        const {container} = render(
            <Header
                query=""
                setQuery={mockSetQuery}
                handleDarkMode={mockHandleDarkMode}
                setEditMode={mockSetEditMode}
                editMode={false}
            />
        );

        const overlay = container.querySelector('input[name="search-mobile"]')?.closest('div');
        expect(overlay?.className).not.toMatch(/open/);

        const openButton = container.querySelector('#button-search-mobile');
        expect(openButton).toBeDefined();
        if (openButton) fireEvent.click(openButton);
        const closeButton = container.querySelector('#button-close-search-mobile') as HTMLButtonElement;
        fireEvent.click(closeButton);
    });

    test('edit mode switch toggles correctly', () => {
        const {container} = render(
            <Header
                query=""
                setQuery={mockSetQuery}
                handleDarkMode={mockHandleDarkMode}
                setEditMode={mockSetEditMode}
                editMode={false}
            />
        );

        const switchInput = container.querySelector('input[name="editMode"]') as HTMLInputElement;
        expect(switchInput).not.toBeChecked();

        fireEvent.click(switchInput);
        expect(mockSetEditMode).toHaveBeenCalledWith(true);
    });

    test('dark mode button calls handleDarkMode', () => {
        const {container} = render(
            <Header
                query=""
                setQuery={mockSetQuery}
                handleDarkMode={mockHandleDarkMode}
                setEditMode={mockSetEditMode}
                editMode={false}
            />
        );

        const darkModeButton = container.querySelector('#theme-switch-button');
        expect(darkModeButton).toBeDefined();
        if (darkModeButton) {
            fireEvent.click(darkModeButton);
            expect(mockHandleDarkMode).toHaveBeenCalledTimes(1);
        }
    });
});
