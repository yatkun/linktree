"use client";

import { useEffect, useState } from "react";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card";

export default function Page() {
  type User = {
    id: number;
    name: string;
    // Tambahkan field lain sesuai kebutuhan
  };

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8001/api/users", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Gagal mengambil data user");
        const data = await res.json();
        setUsers(data["data"] || []);
      } catch (error) {
        setError("Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const userCount = users.length;

  return (

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {loading ? "Loading..." : error ? "-" : userCount}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
 
  );
}
