"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Country } from "@/models/Country";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type CountryTableProps = {
  data: Country[];
};

const columns: ColumnDef<Country>[] = [
  {
    accessorKey: "flag",
    header: "Flag",
    cell: ({ row }) => (
      <Image
        className="rounded-sm size-auto"
        src={row.original.flags.png || row.original.flags.svg}
        alt={`${row.original.name} flag`}
        width={80}
        height={80}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name.common,
  },
  {
    accessorKey: "population",
    header: "Population",
    cell: ({ row }) => row.original.population.toLocaleString(),
  },
  {
    accessorKey: "area",
    header: "Area (km²)",
    cell: ({ row }) => row.original.area.toLocaleString(),
  },
];

export function CountryTable({ data }: CountryTableProps) {
  const router = useRouter();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    onColumnVisibilityChange: setColumnVisibility,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { columnVisibility },
  });

  // 🔹 Detect screen width and update column visibility
  useEffect(() => {
    const handleResize = () => {
      setColumnVisibility({
        flag: window.innerWidth >= 450,
      });
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="px-3 w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b-mutedGray border-b"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="text-inherit text-xs" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-none cursor-pointer"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() =>
                  router.push(`/country/${row.original.name.common}`)
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center space-x-2 justify-center p-4">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft />
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
