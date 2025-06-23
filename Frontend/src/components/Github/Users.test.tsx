import { render, screen, fireEvent } from '@testing-library/react';
import Users from './Users';
import Github from "../../types/github.ts";

const mockUsersPage = {
    1: [
        { id: 1, login: 'user1', avatar_url: '', html_url: 'https://github.com/user1' },
        { id: 2, login: 'user2', avatar_url: '', html_url: 'https://github.com/user2' },
    ],
};

const mockGithubInfo: Github = { total_count: 2, incomplete_results: false, items: [], totalPage: 3 };

describe('Users component', () => {
    let selectedIds: Set<number>;
    let setSelectedIds: jest.Mock;
    let setUsersPage: jest.Mock;
    let setPage: jest.Mock;

    beforeEach(() => {
        selectedIds = new Set();
        setSelectedIds = jest.fn(ids => { selectedIds = ids; });
        setUsersPage = jest.fn();
        setPage = jest.fn();
    });

    test('renders users and pagination', () => {
        render(
            <Users
                usersPage={mockUsersPage}
                githubInfo={mockGithubInfo}
                page={1}
                setPage={setPage}
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
                setUsersPage={setUsersPage}
                editMode={false}
            />
        );

        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('user2')).toBeInTheDocument();
        const links = screen.getAllByRole('link', { name: /view profile/i });
        expect(links).toHaveLength(mockUsersPage[1].length);
    });

    test('renders UserControl only in edit mode', () => {
        const { rerender } = render(
            <Users
                usersPage={mockUsersPage}
                githubInfo={mockGithubInfo}
                page={1}
                setPage={setPage}
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
                setUsersPage={setUsersPage}
                editMode={true}
            />
        );

        expect(screen.getByLabelText(/.*elements selected/i)).toBeInTheDocument();

        rerender(
            <Users
                usersPage={mockUsersPage}
                githubInfo={mockGithubInfo}
                page={1}
                setPage={setPage}
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
                setUsersPage={setUsersPage}
                editMode={false}
            />
        );

        expect(screen.queryByLabelText(/elements selected/i)).not.toBeInTheDocument();
    });

    test('select all toggles selection', () => {
        selectedIds = new Set();
        const notChecked = render(
            <Users
                usersPage={mockUsersPage}
                githubInfo={mockGithubInfo}
                page={1}
                setPage={setPage}
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
                setUsersPage={setUsersPage}
                editMode={true}
            />
        );

        const checkbox = notChecked.container.querySelector('input[name="selectAll"]') as HTMLInputElement;
        expect(checkbox.checked).toBe(false);

        fireEvent.click(checkbox);
        expect(setSelectedIds).toHaveBeenCalledWith(new Set([1, 2]));

        selectedIds = new Set([1, 2]);
        const checked = render(
            <Users
                usersPage={mockUsersPage}
                githubInfo={mockGithubInfo}
                page={1}
                setPage={setPage}
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
                setUsersPage={setUsersPage}
                editMode={true}
            />
        );

        const checkbox2 = checked.container.querySelector('input[name="selectAll"]') as HTMLInputElement;
        expect(checkbox2.checked).toBe(true);

        fireEvent.click(checkbox2);
        expect(setSelectedIds).toHaveBeenCalledWith(new Set());
    });

    test('handleDuplicateSelected duplicates selected users', () => {
        selectedIds = new Set([1]);
        const usersPageCopy = { ...mockUsersPage };

        render(
            <Users
                usersPage={usersPageCopy}
                githubInfo={mockGithubInfo}
                page={1}
                setPage={setPage}
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
                setUsersPage={setUsersPage}
                editMode={true}
            />
        );

        const buttons = screen.getAllByRole('button');
        const duplicateBtn = buttons[1];

        fireEvent.click(duplicateBtn);

        expect(setUsersPage).toHaveBeenCalled();
        expect(setSelectedIds).toHaveBeenCalledWith(new Set());
    });

    test('handleDeleteSelected deletes selected users', () => {
        selectedIds = new Set([1]);
        const usersPageCopy = {
            1: [
                { id: 1, login: 'user1', avatar_url: '', html_url: 'https://github.com/user1' },
                { id: 2, login: 'user2', avatar_url: '', html_url: 'https://github.com/user2' },
            ],
        };

        render(
            <Users
                usersPage={usersPageCopy}
                githubInfo={mockGithubInfo}
                page={1}
                setPage={setPage}
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
                setUsersPage={setUsersPage}
                editMode={true}
            />
        );

        const buttons = screen.getAllByRole('button');
        const deleteBtn = buttons[0];

        fireEvent.click(deleteBtn);

        expect(setUsersPage).toHaveBeenCalledWith({
            1: [
                { id: 2, login: 'user2', avatar_url: '', html_url: 'https://github.com/user2' },
            ],
        });
        expect(setSelectedIds).toHaveBeenCalledWith(new Set());
    });
});
