import { render, screen, fireEvent } from '@testing-library/react';
import UserControl from './UserControl';
import type { User as UserGithub } from "../../types/github.ts";

const mockUsers: UserGithub[] = [
    { id: 1, login: 'user1', avatar_url: '', html_url: 'https://github.com/user1' },
    { id: 2, login: 'user2', avatar_url: '', html_url: 'https://github.com/user2' },
];

describe('UserControl component', () => {
    const handleDuplicateSelected = jest.fn();
    const handleDeleteSelected = jest.fn();
    const handlerSelectAll = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders checkbox with correct label', () => {
        render(
            <UserControl
                users={mockUsers}
                selectedIds={new Set([1])}
                handleDuplicateSelected={handleDuplicateSelected}
                handleDeleteSelected={handleDeleteSelected}
                handlerSelectAll={handlerSelectAll}
            />
        );

        expect(screen.getByLabelText('1 elements selected')).toBeInTheDocument();
    });

    test('checkbox is checked only if all users are selected', () => {
        // Not all selected
        const { rerender } = render(
            <UserControl
                users={mockUsers}
                selectedIds={new Set([1])}
                handleDuplicateSelected={handleDuplicateSelected}
                handleDeleteSelected={handleDeleteSelected}
                handlerSelectAll={handlerSelectAll}
            />
        );
        const checkbox = screen.getByRole('checkbox', { name: /elements selected/i });
        expect(checkbox).not.toBeChecked();

        // All selected
        rerender(
            <UserControl
                users={mockUsers}
                selectedIds={new Set([1, 2])}
                handleDuplicateSelected={handleDuplicateSelected}
                handleDeleteSelected={handleDeleteSelected}
                handlerSelectAll={handlerSelectAll}
            />
        );
        expect(screen.getByRole('checkbox', { name: /elements selected/i })).toBeChecked();
    });

    test('calls handlerSelectAll when checkbox is clicked', () => {
        render(
            <UserControl
                users={mockUsers}
                selectedIds={new Set()}
                handleDuplicateSelected={handleDuplicateSelected}
                handleDeleteSelected={handleDeleteSelected}
                handlerSelectAll={handlerSelectAll}
            />
        );

        const checkbox = screen.getByRole('checkbox', { name: /elements selected/i });
        fireEvent.click(checkbox);

        expect(handlerSelectAll).toHaveBeenCalledTimes(1);
    });

    test('calls handleDeleteSelected when delete button is clicked', () => {
        const { container } = render(
            <UserControl
                users={mockUsers}
                selectedIds={new Set()}
                handleDuplicateSelected={handleDuplicateSelected}
                handleDeleteSelected={handleDeleteSelected}
                handlerSelectAll={handlerSelectAll}
            />
        );

        const deleteButton = container.querySelector('button[name="deleteSelected"]') as HTMLButtonElement;
        fireEvent.click(deleteButton);

        expect(handleDeleteSelected).toHaveBeenCalledTimes(1);
    });

    test('calls handleDuplicateSelected when duplicate button is clicked', () => {
        render(
            <UserControl
                users={mockUsers}
                selectedIds={new Set()}
                handleDuplicateSelected={handleDuplicateSelected}
                handleDeleteSelected={handleDeleteSelected}
                handlerSelectAll={handlerSelectAll}
            />
        );

        const buttons = screen.getAllByRole('button');
        const duplicateButton = buttons[1]; // second button is duplicate
        fireEvent.click(duplicateButton);

        expect(handleDuplicateSelected).toHaveBeenCalledTimes(1);
    });
});
