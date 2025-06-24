# React GitHub User Search App – Documentation

## Note on the setup

This project uses **Vite** instead of Create React App for faster development.  
No runtime dependencies were added (only `react` and `react-dom`).

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
* An SVG icon list

---

## 🔍 API Service

### `searchUsers(query, { signal }, page)`

Returns a GitHub-style object with `items`, `total_count`, `incomplete_results`, and `totalPage`.
Used with debounce and pagination.

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
