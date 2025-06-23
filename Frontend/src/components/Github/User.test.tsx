import { render, screen, fireEvent } from '@testing-library/react';
import User from './User';
import type { User as UserGithub } from '../../types/github';

const mockUser: UserGithub = {
    id: 123,
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
    html_url: 'https://github.com/testuser',
};

describe('<User />', () => {
    test('affiche les informations utilisateur', () => {
        render(
            <User
                user={mockUser}
                selectedIds={new Set()}
                setSelectedIds={() => {}}
                editMode={false}
            />
        );

        expect(screen.getByText('testuser')).toBeInTheDocument();
        expect(screen.getByText('123')).toBeInTheDocument();
        expect(screen.getByAltText(/Avatar du compte gitbug de/)).toHaveAttribute(
            'src',
            mockUser.avatar_url
        );
    });

    test('n’affiche pas la checkbox si editMode est false', () => {
        render(
            <User
                user={mockUser}
                selectedIds={new Set()}
                setSelectedIds={() => {}}
                editMode={false}
            />
        );
        expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });

    test('affiche la checkbox si editMode est true', () => {
        render(
            <User
                user={mockUser}
                selectedIds={new Set()}
                setSelectedIds={() => {}}
                editMode={true}
            />
        );
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    test('checkbox reflète la sélection actuelle', () => {
        render(
            <User
                user={mockUser}
                selectedIds={new Set([123])}
                setSelectedIds={() => {}}
                editMode={true}
            />
        );
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    test('clique sur la checkbox ajoute ou supprime l’ID du Set', () => {
        const mockSetSelectedIds = jest.fn();

        const selected = new Set<number>();

        render(
            <User
                user={mockUser}
                selectedIds={selected}
                setSelectedIds={mockSetSelectedIds}
                editMode={true}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(mockSetSelectedIds).toHaveBeenCalledWith(new Set([123]));
    });

    test('clique sur la checkbox retire l’ID si déjà présent', () => {
        const mockSetSelectedIds = jest.fn();

        const selected = new Set<number>([123]);

        render(
            <User
                user={mockUser}
                selectedIds={selected}
                setSelectedIds={mockSetSelectedIds}
                editMode={true}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(mockSetSelectedIds).toHaveBeenCalledWith(new Set());
    });
});
