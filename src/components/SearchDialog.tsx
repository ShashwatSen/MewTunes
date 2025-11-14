"use client";

import { useState, useEffect, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SongList } from "./SongList";
import type { Song } from "@/lib/types";
import { Search, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isPending, startTransition] = useTransition();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const search = async () => {
      if (debouncedSearchTerm.length > 2) {
        startTransition(async () => {
          const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedSearchTerm)}`);
          const data = await res.json();
          setSearchResults(data.results || []);
        });
      } else {
        setSearchResults([]);
      }
    };

    search();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    // Reset search when dialog is closed
    if (!open) {
      setSearchTerm("");
      setSearchResults([]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="sr-only">Search</DialogTitle>
           <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for songs, artists, albums..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 px-0 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {isPending && <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />}
          </div>
        </DialogHeader>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {isPending ? (
             <div className="text-center text-muted-foreground py-8">Searching...</div>
          ) : searchResults.length > 0 ? (
            <SongList songs={searchResults} layout="list" />
          ) : debouncedSearchTerm.length > 2 ? (
            <p className="text-center text-muted-foreground py-8">No results found for "{debouncedSearchTerm}".</p>
          ) : (
             <p className="text-center text-muted-foreground py-8">Start typing to search for music.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
