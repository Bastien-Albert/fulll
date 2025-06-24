import { useEffect, useState } from 'react';
import {searchUsers} from "./services/api.ts";
import type Github from './types/github';
import type {User as GithubUser} from './types/github';
import Header from "./components/Header/Header.tsx";
import './App.css';
import Users from "./components/Github/Users.tsx";
import Loader from "./components/Loader/Loader.tsx";
import Message from "./components/Message/Message.tsx";

const App = () => {
    const [query, setQuery] = useState<string>('');
    const [githubInfo, setGithubInfo] = useState<Github>({incomplete_results: false, items: [], total_count: 0, totalPage: 0});
    const [isDarkMode, setIsDarkMode] = useState<boolean>(
        localStorage.getItem('darkMode') === 'true'
            ? true
            : localStorage.getItem('darkMode') !== 'false'
    );
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [usersPage, setUsersPage] = useState<Record<number, GithubUser[]>>({});

    // Debounced search
    useEffect(() => {
        const controller = new AbortController();

        if (!query) {
            setGithubInfo({incomplete_results: false, items: [], total_count: 0, totalPage: 0});
            setUsersPage({})
            return;
        }

        const timeout = setTimeout((): void => {
            setLoading(true);
            setError('');
            setPage(1);
            setUsersPage({})

            searchUsers(query, { signal: controller.signal }, page)
                .then((data: Github) => {
                    setGithubInfo(data);
                    setSelectedIds(new Set());
                    setUsersPage({[page]: data.items});
                })
                .catch(err => {
                    if (err.name !== 'AbortError') setError(err.message);
                })
                .finally(() => setLoading(false));
        }, 500);

        return () => {
            controller.abort();
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    useEffect(() => {
        const controller = new AbortController();

        if(!query) {
            return;
        }

        if(loading) {
            return;
        }
        setLoading(true);
        if(typeof usersPage[page] !== 'undefined') {
            setError('');
            setTimeout(() => setLoading(false), 500);
            return;
        }

        setError('');

        searchUsers(query, { signal: controller.signal }, page)
            .then((data: Github) => {
                setGithubInfo(data);
                setSelectedIds(new Set());
                setUsersPage({...usersPage, [page]: data.items});
            })
            .catch(err => {
                if (err.name !== 'AbortError') setError(err.message);
            })
            .finally(() => setLoading(false));

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleDarkMode = function () {
        if(isDarkMode) {
            setIsDarkMode(false)
            localStorage.setItem('darkMode', 'false');
        } else {
            localStorage.setItem('darkMode', 'true');
            setIsDarkMode(true)
        }
    }

    return (
        <div className={(isDarkMode  ? 'theme-mode-dark' : 'theme-mode-light') +  ' root-container'}>
            <Header query={query}
                    setQuery={setQuery}
                    handleDarkMode={handleDarkMode}
                    setEditMode={setEditMode}
                    editMode={editMode}/>
            <main>
                {error && !loading && <Message>{error}</Message>}
                {!error && !loading && !githubInfo.items.length && <Message>No result</Message>}
                {loading && (<Loader />)}
                {typeof usersPage[page] !== "undefined" && !error && !loading
                    ? <Users setSelectedIds={setSelectedIds}
                             selectedIds={selectedIds}
                             githubInfo={githubInfo}
                             usersPage={usersPage}
                             setUsersPage={setUsersPage}
                             page={page}
                             editMode={editMode}
                             setPage={setPage}/>
                    : null
                }
            </main>
        </div>
    );
};

export default App;
