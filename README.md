# Artworks Pagination App - [Live Link](https://selectable-datatable.netlify.app/)

This is a React-based application built with Vite and TypeScript, designed to display artwork data from the Art Institute of Chicago's public API. The application uses the **PrimeReact DataTable** component for table display and features server-side pagination with row selection functionality.

---

## Features
- **PrimeReact DataTable Integration**: Displays data fetched from the API in a responsive, styled table.
- **Server-Side Pagination**: Fetches data from the API on-demand as users navigate through pages.
- **Row Selection**:
  - Allows users to select individual rows or all rows on the current page.
  - Custom row selection panel to display selected rows.
  - Persist selected and deselected rows across page changes.
- **Fields Displayed**:
  - `title`
  - `place_of_origin`
  - `artist_display`
  - `inscriptions`
  - `date_start`
  - `date_end`

---

## API Used
- **Endpoint**: [Art Institute of Chicago Artworks API](https://api.artic.edu/api/v1/artworks?page=1)
- Data is fetched using server-side pagination based on the current page.

---

## Steps to Create the Project
1. **Set Up the React App**:
   - Use **Vite** to create the React app with TypeScript.
     ```bash
     npm create vite@latest my-app -- --template react-ts
     cd my-app
     npm install
     ```

2. **Install PrimeReact**:
   - Add PrimeReact and PrimeIcons to your project:
     ```bash
     npm install primereact primeicons
     ```

3. **Add PrimeReact Table**:
   - Use the [PrimeReact DataTable component](https://primereact.org/datatable/) for displaying the artwork data.

4. **Fetch API Data**:
   - Fetch the first page of data from the API and display it in the table.
   - Enable server-side pagination by fetching data dynamically as users change pages.

5. **Add Pagination**:
   - Add pagination to the table using PrimeReact's server-side pagination feature.

6. **Implement Row Selection**:
   - Add checkboxes for selecting individual rows or all rows on a page.
   - Implement a custom row selection panel to persist the selection/deselection of rows across page changes.

7. **Ensure Persistent Row Selection**:
   - Store selected and deselected rows such that switching back to previously visited pages maintains their state.

---

