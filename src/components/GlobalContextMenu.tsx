
"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Scissors,
  ClipboardCopy,
  ClipboardPaste,
  Share2,
  Heart,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "./Providers";

export function GlobalContextMenu({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const { playlists } = useAppContext();

  const handleAction = (action: string) => {
    toast({
      title: `${action} action`,
      description: `You triggered the "${action}" action.`,
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={() => handleAction("Cut")}>
          <Scissors className="mr-2 h-4 w-4" />
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => handleAction("Copy")}>
          <ClipboardCopy className="mr-2 h-4 w-4" />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => handleAction("Paste")}>
          <ClipboardPaste className="mr-2 h-4 w-4" />
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={() => handleAction("Share")}>
          <Share2 className="mr-2 h-4 w-4" />
          Share...
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => handleAction("Favorite")}>
          <Heart className="mr-2 h-4 w-4" />
          Favorite
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add to Playlist
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {playlists.map(p => (
              <ContextMenuItem key={p.id} onClick={() => handleAction(`Add to ${p.name}`)}>
                {p.name}
              </ContextMenuItem>
            ))}
             {playlists.length === 0 && (
                <ContextMenuItem disabled>No playlists</ContextMenuItem>
             )}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem inset className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/40">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
