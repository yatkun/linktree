"use client";

import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";
export type Link = {
  id: number;
  name: string;
  url: string;
  order: number;
  is_active?: boolean;
  status?: string;
};

export const columns: ColumnDef<Link>[] = [
  {
    accessorKey: "order",
    header: "Urutan",
    cell: ({ row }) => row.getValue("order"),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <a
        href={row.getValue("url")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {row.getValue("url")}
      </a>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active");
      const statusColor = isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
      const label = isActive ? "Aktif" : "Tidak Aktif";
      return (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}
        >
          {label}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const link = row.original;
      const DialogEditLink = dynamic(() => import("../components/dialog-edit-link"), { ssr: false });
      return (
        <div className="flex gap-2">
          <DialogEditLink link={link} />
          <button
            className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={() => alert(`Hapus link id: ${link.id}`)}
          >
            Hapus
          </button>
        </div>
      );
    },
  },
];
