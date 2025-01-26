"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/StatusBadge";
import { User } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p className="text-14-medium">{row.original.name}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="text-14-medium">{row.original.email}</p>,
  },
  {
    accessorKey: "status",
    header: "User Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status ? "active" : "blocked"} />
      </div>
    ),
  },
  {
    accessorKey: "last_login_time",
    header: "Last Seen",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[150px]">
        {formatDateTime(row.original.last_login_time).dateTime}
      </p>
    ),
  },
];
