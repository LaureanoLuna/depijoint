"use client";
import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Seleccion from "../Seleccion";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  opcionesFilto: string[];
  tieneDeshabilotado?:boolean
}

export function Tabla<TData, TValue>({
  columns,
  data,
  opcionesFilto,
  tieneDeshabilotado = false
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [seleccion, setSeleccion] = React.useState(
    opcionesFilto[0].toLowerCase()
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const manejaCambioSeleccion = (e: string) => {
    let opcion = e.toLowerCase();
    setSeleccion(opcion);
  };

  return (
    <>
      <div className="flex items-center py-4 gap-2">
        <Seleccion
          opciones={opcionesFilto}
          titulo={"Filtro"}
          funccion={manejaCambioSeleccion}
        />
        <Input
          placeholder="..."
          value={(table.getColumn(seleccion)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>{
            table.getColumn(seleccion)?.setFilterValue(event.target.value)}
          }
          className="max-w-xs"
        />
      </div>
      <div className="rounded-md border px-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`font-semibold tracking-wider ${tieneDeshabilotado? (row.getValue("deshabilitado") ? "line-through text-red-600" : "" ): ""} `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`text-start pl-2`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay nada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}