"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { blockUser, deleteUser, unblockUser } from "@/lib/actions/user.actions";
import { Button } from "../ui/button";
import Image from "next/image";
import { DataTableProps } from "@/types";
import { useState } from "react";
import SubmitButton from "../SubmitButton";

export function DataTable<TData extends { id: string; email: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [isBlockedLoading, setIsBlockedLoading] = useState(false);
  const [isUnblockLoading, setIsUnblockLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;

  const handleBlockUsers = async () => {
    setIsBlockedLoading(true);
    try {
      await blockUser(selectedRows.map((row) => row.original.id));
      setTimeout(() => {
        table.resetRowSelection();
        setIsBlockedLoading(false);
        window.location.reload();
      }, 300);
    } catch (error) {
      console.error("Error blocking users:", error);
      setIsBlockedLoading(false);
    }
  };

  const handleUnblockUsers = async () => {
    setIsUnblockLoading(true);
    try {
      await unblockUser(selectedRows.map((row) => row.original.id));
      setTimeout(() => {
        table.resetRowSelection();
        setIsUnblockLoading(false);
        window.location.reload();
      }, 300);
    } catch (error) {
      console.error("Error unblocking users:", error);
      setIsUnblockLoading(false);
    }
  };

  const handleDeleteUsers = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteUser(selectedRows.map((row) => row.original.id));
      setTimeout(() => {
        table.resetRowSelection();
        setIsDeleteLoading(false);
        window.location.reload();
      }, 300);
    } catch (error) {
      console.error("Error deleting users:", error);
      setIsDeleteLoading(false);
    }
  };

  return (
    <div className="data-table">
      <div className="m-4 flex gap-2">
        <SubmitButton
          buttonText="Block"
          isLoading={isBlockedLoading}
          onClick={handleBlockUsers}
          className={`px-3 py-1 rounded ${
            selectedRows.length === 0
              ? "bg-gray-300"
              : "bg-gray-600 text-white hover:bg-gray-500"
          }`}
          disabled={selectedRows.length === 0}
          toastProps={{
            title: "Selected user(s) have been blocked",
            description: "You have successfully blocked the selected user(s).",
          }}
        />
        <SubmitButton
          buttonText="Unblock"
          isLoading={isUnblockLoading}
          onClick={handleUnblockUsers}
          className={`px-3 py-1 rounded ${
            selectedRows.length === 0
              ? "bg-gray-300"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
          disabled={selectedRows.length === 0}
          toastProps={{
            title: "Selected user(s) have been unblocked",
            description: "The selected user(s) are now unblocked.",
          }}
        />
        <SubmitButton
          buttonText="Delete"
          isLoading={isDeleteLoading}
          onClick={handleDeleteUsers}
          className={`px-3 py-1 rounded ${
            selectedRows.length === 0
              ? "bg-gray-300"
              : "bg-red-600 text-white hover:bg-red-500"
          }`}
          disabled={selectedRows.length === 0}
          toastProps={{
            title: "Selected user(s) have been deleted",
            description: "The selected user(s) have been permanently removed.",
          }}
        />
      </div>
      <Table className="shad-table">
        <TableHeader className="bg-dark-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="shad-table-row-header">
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
                className="shad-table-row"
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
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-gray-500"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="table-actions">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="shad-gray-btn"
        >
          <Image src="/icons/arrow.svg" width={24} height={24} alt="arrow" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="shad-gray-btn"
        >
          <Image
            src="/icons/arrow.svg"
            width={24}
            height={24}
            alt="arrow"
            className="rotate-180"
          />
        </Button>
      </div>
    </div>
  );
}
