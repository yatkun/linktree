

"use client";
import { useEffect, useState } from "react";

type Link = {
  id: number;
  name: string;
  url: string;
  order: number;
  is_active?: boolean;
};

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      setLoading(true);
      const res = await fetch("http://localhost:8001/api/links", { cache: "no-store" });
      const json = await res.json();
      // Filter hanya yang aktif dan urutkan
      setLinks((json.data || []).filter((l: Link) => l.is_active).sort((a: Link, b: Link) => a.order - b.order));
      setLoading(false);
    }
    fetchLinks();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center  dark:from-black dark:to-gray-900 p-4">
      <div className="flex flex-col items-center w-full max-w-md gap-6">
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {/* Ganti dengan avatar/logo Anda jika ada */}
            <span className="text-3xl font-bold text-gray-500 dark:text-gray-300">STAT</span>
          </div>
          <h1 className="text-2xl font-bold text-center">Statistika Unsulbar</h1>
          <p className="text-gray-500 text-center">Temukan semua link penting di sini!</p>
        </div>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <div className="flex flex-col w-full gap-4">
            {links.length === 0 && (
              <div className="text-center text-gray-400">Belum ada link aktif.</div>
            )}
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-3 text-center font-semibold text-gray-800 dark:text-gray-100 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
