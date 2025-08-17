import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [asc, setAsc] = useState(true);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const newAsc = sortKey === col.key ? !asc : true;
    setAsc(newAsc);
    setSortKey(col.key);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey as keyof T];
    const bVal = b[sortKey as keyof T];
    return asc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const toggleRow = (row: T) => {
    let newSelected: T[];
    if (selected.includes(row)) {
      newSelected = selected.filter((r) => r !== row);
    } else {
      newSelected = [...selected, row];
    }
    setSelected(newSelected);
    onRowSelect?.(newSelected);
  };

  if (loading) return <p>Loading...</p>;
  if (!data.length) return <p>No data available</p>;

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          {selectable && <th className="border px-3 py-2"></th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className="cursor-pointer border px-3 py-2"
              onClick={() => handleSort(col)}
            >
              {col.title} {col.sortable && "⇅"}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id} className="border">
            {selectable && (
              <td className="border px-3 py-2">
                <input
                  type="checkbox"
                  checked={selected.includes(row)}
                  onChange={() => toggleRow(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="border px-3 py-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
