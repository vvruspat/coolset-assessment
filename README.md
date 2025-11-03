# Coolset Frontend position assessment

## Where to try

- App with integrated component: [https://coolset-assessment-app.vercel.app/](https://coolset-assessment-app.vercel.app/)
- Storybook: [https://coolset-assessment.vercel.app/](https://coolset-assessment.vercel.app/)

## Run locally

### run app

```bash
npm install
npm run dev
```

### run storybook

```bash
npm run storybook
```

### run tests

```bash
npm run test
```

## Architecture

### 1. General Requirements

- **Responsive design** – adjusts layout and interactions for all screen sizes.  
- **Accessibility (a11y)** – supports keyboard navigation, ARIA attributes, and screen readers.  
- **Code quality** – follows React + TypeScript best practices, modular structure, and clean style conventions.

---

### 2. Functional Requirements

- **Sorting** – enable sorting on at least one column.  
- **Filtering** – allow filtering by section column.  
- **Pagination** – support dynamic page size selection.  
- **Sticky header** – table headers remain visible during scroll.  

---

### 3. Tech stack

- Typescript
- React
- Storybook
- Vite
- Vitest + React testing library

---

### 3. Component Architecture

#### Atoms

- **Button**
  - `mode="primary"`
  - `mode="transparent"`
- **Header**
  - `mode="h1"`, `mode="h2"`, etc.
- **Select**

#### Molecules

- **DataTable**
  - `DataTableCaption`
  - `DataTableHead`
  - `DataTableHeadCell`
  - `DataTableRow`
  - `DataTableRowCell`
  - `DataTableFooter`