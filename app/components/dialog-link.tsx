"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DialogLink({ onCreated, data }: { onCreated?: () => void, data?: { order: number }[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    order: 1,
  });

  useEffect(() => {
    if (open && data && data.length > 0) {
      // Cari order terbesar, set order baru ke max+1
      const maxOrder = Math.max(...data.map((d) => d.order ?? 0));
      setFormData((prev) => ({ ...prev, order: maxOrder + 1 }));
    } else if (open) {
      setFormData((prev) => ({ ...prev, order: 1 }));
    }
  }, [open, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://portal.fmipa.unsulbar.ac.id/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create link");
      }

  setFormData({ name: "", url: "", order: 1 });
  setOpen(false);
  if (onCreated) onCreated();
  router.refresh();
    } catch (error) {
      console.error("Error creating link:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Link</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Link</DialogTitle>
            <DialogDescription>
              Add a new link to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Enter link name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Enter URL"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="order" className="text-right">
                Urutan
              </Label>
              <Input
                id="order"
                name="order"
                type="number"
                value={formData.order}
                min={1}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Urutan"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}