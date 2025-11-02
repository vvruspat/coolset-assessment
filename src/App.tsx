import { useCallback, useMemo, useState } from "react";
import { FilterIcon } from "./components/atoms/Icons/FilterIcon";
import { Select } from "./components/atoms/Select/Select";
import { DataTable } from "./components/molecules/DataTable/DataTable";

import { groceryItemsMock } from "./mock/data";
import type { GroceryItem } from "./types";
import { Heading } from "./components/atoms/Heading";
import styles from "./App.module.css";

type ExtendedGroceryItem = GroceryItem & { price_100: number };

function App() {
  const [sectionsFilter, setSectionsFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<keyof GroceryItem | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState<number>(25);
  const [offset, setOffset] = useState<number>(0);

  const sectionFilterOptions = useMemo(() => {
    const sections = Array.from(
      new Set(groceryItemsMock.map((item) => item.section))
    );

    return sections.map((section) => ({
      value: section,
      label: section,
    }));
  }, []);

  const filteredData = useMemo<ExtendedGroceryItem[]>(
    () =>
      groceryItemsMock
        .filter((item) =>
          sectionsFilter.length > 0
            ? sectionsFilter.includes(item.section)
            : true
        )
        .map((item) => ({
          ...item,
          price_100: parseFloat(((item.price / item.weight) * 0.1).toFixed(2)),
        })),
    [sectionsFilter]
  );

  console.log({ filteredData });

  const total = useMemo(() => filteredData.length, [filteredData]);

  const data = useMemo<ExtendedGroceryItem[]>(() => {
    let processedData = [...filteredData];

    if (sortBy) {
      processedData = processedData.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return processedData.slice(offset, offset + limit);
  }, [filteredData, sortBy, sortOrder, limit, offset]);

  const onSectionFilterChange = useCallback((values: string[]) => {
    setSectionsFilter(values);
  }, []);

  const onLoadData = useCallback(
    (
      offset: number,
      limit: number,
      sortByParam: string | null,
      sortOrderParam: "asc" | "desc" | null
    ) => {
      setSortBy(sortByParam as keyof GroceryItem | null);
      setSortOrder(sortOrderParam ?? "asc");
      setLimit(limit);
      setOffset(offset);
    },
    []
  );

  return (
    <main className={styles.container}>
      <Heading mode="h1">Coolset&rsquo;s Frontend Assessment</Heading>

      <DataTable
        headers={[
          { field: "id", label: "ID" },
          { field: "name", label: "Name", sortable: true },
          {
            field: "section",
            label: "Section",
            sortable: true,
            filter: (
              <Select
                mode="primary"
                multiselect={true}
                before={<FilterIcon />}
                after={null}
                onChoose={onSectionFilterChange}
                options={sectionFilterOptions}
              >
                Filter by section
              </Select>
            ),
          },
          {
            field: "price",
            label: "Price (€)",
            sortable: true,
            type: "number",
          },
          {
            field: "price_100",
            label: "Price / 100 g (€)",
            sortable: true,
            type: "number",
          },
        ]}
        onLoadData={onLoadData}
        rows={data}
        total={total}
        caption="Today&rsquo;s groceries"
      />
    </main>
  );
}

export default App;
