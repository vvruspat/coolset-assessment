# System Design

## 1. General Requirements

- **Responsive design** – adjusts layout and interactions for all screen sizes.  
- **Accessibility (a11y)** – supports keyboard navigation, ARIA attributes, and screen readers.  
- **Code quality** – follows React + TypeScript best practices, modular structure, and clean style conventions.

---

## 2. Functional Requirements

- **Sorting** – enable sorting on at least one column.  
- **Filtering** – allow filtering by section column.  
- **Pagination** – support dynamic page size selection.  
- **Sticky header** – table headers remain visible during scroll.  

---

## 3. Component Architecture

### Atoms

- **Button**
  - `mode="primary"`
  - `mode="transparent"`
- **Header**
  - `mode="h1"`, `mode="h2"`, etc.
- **Selectbox**
- **DataTable**
  - `DataTableCaption`
  - `DataTableHead`
  - `DataTableHeadCell`
  - `DataTableRow`
  - `DataTableRowCell`
  - `DataTableFooter`