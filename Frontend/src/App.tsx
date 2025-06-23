import { useEffect, useState } from 'react';
import {searchUsers} from "./services/api.ts";
import type Github from './types/github';
import type {User as GithubUser} from './types/github';
import Header from "./components/Header/Header.tsx";
import './App.css';
import Users from "./components/Github/Users.tsx";
import Card from "./components/Card/Card.tsx";
import Loader from "./components/Loader/Loader.tsx";

const App = () => {
    const [query, setQuery] = useState('');
    const [githubInfo, setGithubInfo] = useState<Github>({incomplete_results: false, items: [], total_count: 0, totalPage: 0});
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [usersPage, setUsersPage] = useState<Record<number, GithubUser[]>>({});

    // Debounced search
    useEffect(() => {
        const controller = new AbortController();

        if (!query) {
            setGithubInfo({incomplete_results: false, items: [], total_count: 0, totalPage: 0});
            setUsersPage({})
            return;
        }

        const timeout = setTimeout(() => {
            setLoading(true);
            setError('');
            setPage(1);
            setUsersPage({})

            searchUsers(query, { signal: controller.signal }, page)
                .then(data => {
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
            .then(data => {
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
            localStorage.setItem('darkMode', 'false');
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
                <div className="container">
                    {error && !loading && <Card className="p-10">{error}</Card>}
                    {!error && !loading && !githubInfo.items.length && <Card className="p-10">No result</Card>}
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
                </div>
            </main>
        </div>
    );
};

export default App;
