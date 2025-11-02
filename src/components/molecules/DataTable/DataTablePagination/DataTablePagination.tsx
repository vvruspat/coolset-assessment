import { useId } from "react";

export const DataTablePagination = () => {
  const uiniqieId = useId();

  return (
    <nav aria-label="Table pagination">
      <div className="pagination-controls">
        <label
          htmlFor={`rows-per-page-${uiniqieId}`}
          className="visually-hidden"
        >
          Rows per page
        </label>
        <select
          id={`rows-per-page-${uiniqieId}`}
          name={`rows-per-page-${uiniqieId}`}
          aria-label="Rows per page"
        >
          <option value="10" selected>
            10
          </option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>

        <ul className="pagination">
          <li>
            <button type="button" aria-label="Previous page">
              Previous
            </button>
          </li>
          <li>
            <button type="button" aria-label="Page 1" aria-current="page">
              1
            </button>
          </li>
          <li>
            <button type="button" aria-label="Page 2">
              2
            </button>
          </li>
          <li>
            <button type="button" aria-label="Next page">
              Next
            </button>
          </li>
        </ul>

        <div aria-live="polite" className="sr-only" id="table-status">
          Showing 1–10 of 45 users
        </div>
      </div>
    </nav>
  );
};
