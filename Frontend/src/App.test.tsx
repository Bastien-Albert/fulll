import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { searchUsers } from './services/api';

jest.mock('./services/api');

describe('App component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders header and initial no result message', () => {
        render(<App />);
        expect(screen.getByText(/github search/i)).toBeInTheDocument();
        expect(screen.getByText(/no result/i)).toBeInTheDocument();
    });

    test('toggles dark mode when button clicked', () => {
        const {container} = render(<App />);
        const rootDiv = screen.getByRole('banner').parentElement || screen.getByText(/github search/i).closest('div');
        expect(rootDiv).toHaveClass('theme-mode-dark root-container');

        const darkModeButton = container.querySelector('#theme-switch-button');
        if (darkModeButton) {
            fireEvent.click(darkModeButton);
            expect(rootDiv).toHaveClass('theme-mode-light root-container');
        }
    });

    test('performs a search and renders users', async () => {
        const fakeUsers = {
            incomplete_results: false,
            items: [{ id: 1, login: 'user1', avatar_url: 'url1', html_url: 'url1' }],
            total_count: 1,
            totalPage: 1,
        };
        (searchUsers as jest.Mock).mockResolvedValueOnce(fakeUsers);

        render(<App />);

        const inputs = screen.getAllByPlaceholderText(/search/i);
        const input = inputs[0];
        fireEvent.change(input, { target: { value: 'react' } });

        await waitFor(() => expect(searchUsers).toHaveBeenCalledWith('react', expect.any(Object), 1));

        expect(await screen.findByText('user1')).toBeInTheDocument();
    });

    test('shows error message on API error', async () => {
        (searchUsers as jest.Mock).mockRejectedValueOnce(new Error('API failure'));

        render(<App />);
        const inputs = screen.getAllByPlaceholderText(/search/i);
        const input = inputs[0];
        fireEvent.change(input, { target: { value: 'react' } });

        await waitFor(() => expect(searchUsers).toHaveBeenCalled());

        expect(await screen.findByText(/api failure/i)).toBeInTheDocument();
    });
});
