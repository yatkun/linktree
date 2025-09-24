"use client";

import { useEffect, useState } from "react";

import { columns } from "./columns"
import type { Link } from "./columns"
import DialogLink from "../components/dialog-link"
import { DataTable } from "./data-table"

import dynamic from "next/dynamic";
const DialogEditLinkLazy = dynamic(() => import("../components/dialog-edit-link"), { ssr: false });
const DialogDeleteLinkLazy = dynamic(() => import("../components/dialog-delete-link"), { ssr: false });


export default function LinkPage() {
  const [data, setData] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("https://portal.fmipa.unsulbar.ac.id/api/links", {
      cache: "no-store",
    });
    const links = await res.json();
    setData(links["data"] || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Kolom dinamis agar bisa inject onEdited
  const columnsWithEdit = columns.map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        // Assuming your table expects a 'cell' render function
        cell: ({ row }: { row: { original: Link } }) => (
          <div className="flex gap-2">
            <DialogEditLinkLazy link={row.original} onEdited={fetchData} />
            <DialogDeleteLinkLazy link={row.original} onDeleted={fetchData} />
          </div>
        ),
      };
    }
    return col;
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Links</h1>
  <DialogLink onCreated={fetchData} data={data} />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columnsWithEdit} data={data} />
      )}
    </div>
  );
}