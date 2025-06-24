# ⚛️ React GitHub User Search App – Documentation

A lightweight GitHub user search interface built with React, TypeScript, and Vite.  
It supports live debounced search, dark/light mode, multi-selection, pagination, and local editing (duplicate/delete).

## 📚 Table of Contents

- [Setup](#note-on-the-setup)
- [Project Structure](#-project-structure)
- [Component Overview](#-components-summary)
- [API Service](#-api-service)
- [Debounced Search Logic](#-debounced-search-with-useeffect)
- [Header Controls](#header-component-controls)
- [Getting Started](#-getting-started)

## 🛠️ Note on the Setup

This project uses **Vite** instead of Create React App for faster development.  
Only minimal dependencies are used: `react` and `react-dom`.

## 📁 Project Structure

```
__mocks__/
src/
├── components/       # All UI components (User, Header, Pagination, etc.)
├── services/         # API calls to GitHub
├── types/            # TypeScript type declarations
├── App.tsx           # Root component
├── App.css           # Global styles

```

---

## 🌐 Components Summary

### `Card`

* The block is used not only to display a user, but also to display errors.

### `Header`

* Handles search input, dark mode toggle, and edit mode switch.

### `User`

* Displays a GitHub user (with checkbox if in edit mode enabled).

### `Users`

* List of users, supports selection, duplication, deletion.

### `Checkbox`

* Custom checkbox with icons.

### `Pagination`

* Button-based pagination with ellipses.

### `Switch`

* Toggle with icon feedback.

### `Icon`
* Reusable SVG icon list.

---

## 🔍 API Service

### `searchUsers(query: string, options: object, page: number)`

Fetches GitHub users matching the query string.  
Returns a GitHub-style object including:

- `items`: array of users
- `total_count`: total result count
- `incomplete_results`: boolean
- `totalPage`: number of pages (custom)

---

## ⏳ Debounced Search with `useEffect`

To improve performance and avoid sending too many requests to the GitHub API, we implement a debounced search using React's `useEffect`, combined with `setTimeout` and `AbortController`.

This technique waits for the user to stop typing (500ms delay) before triggering the actual search, and cancels any previous pending request if the query changes in the meantime.

### 💡 Why this matters

- **Debouncing**: Prevents making an API call on every keystroke.
- **AbortController**: Cancels the previous fetch if a new one starts, avoiding race conditions and unnecessary data updates.
- **Cleanup**: Ensures no memory leaks by clearing the timeout and aborting fetch on unmount or query change.

### 📦 Implementation

```tsx
useEffect(() => {
    const controller = new AbortController();

    if (!query) {
        // If the search field is empty, reset everything
        setGithubInfo({
            incomplete_results: false,
            items: [],
            total_count: 0,
            totalPage: 0
        });
        setUsersPage({});
        return;
    }

    // Wait 500ms before triggering the search
    const timeout = setTimeout(() => {
        setLoading(true);
        setError('');
        setPage(1);
        setUsersPage({});

        searchUsers(query, { signal: controller.signal }, page)
            .then((data: Github) => {
                setGithubInfo(data);
                setSelectedIds(new Set());
                setUsersPage({ [page]: data.items });
            })
            .catch(err => {
                // Ignore abort errors, display others
                if (err.name !== 'AbortError') setError(err.message);
            })
            .finally(() => setLoading(false));
    }, 500);

    return () => {
        // Cancel the fetch if query changes or component unmounts
        controller.abort();
        clearTimeout(timeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [query]);
```
---

## Header Component Controls

The header contains two important control buttons:

- **Edit Mode Toggle**

  This is a switch that enables or disables the "edit mode" of the application.

    - When **enabled**, the user list shows checkboxes allowing multi-selection of users.
    - When **disabled**, the user list hides these checkboxes for a cleaner display.
    - The switch visually indicates the current state.

- **Dark/Light Mode Toggle**

  This button toggles the app's color theme between dark and light modes.

    - Clicking the button switches the UI theme instantly.
    - An icon reflects the current theme (e.g., light bulb for light mode, moon/sun for dark mode).

---
## 💻 Getting Started

### Start the project in development mode

```bash
npm install
npm start
```

### Run tests

```bash
npm run test
```
