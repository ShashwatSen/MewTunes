"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/components/Providers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function PlaylistsPage() {
  const { playlists, createPlaylist } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName, newPlaylistDescription);
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">My Playlists</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Playlist
        </Button>
      </div>

      {playlists.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6">
          {playlists.map((playlist, index) => (
            <Link href={`/playlists/${playlist.id}`} key={playlist.id}>
              <div className="group space-y-2">
                <div className="aspect-square relative bg-muted rounded-lg flex items-center justify-center group-hover:bg-card/60 transition-colors">
                  <Image
                    data-ai-hint="music playlist cover"
                    src={`https://picsum.photos/seed/${playlist.id}/300/300`}
                    alt={playlist.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.6vw"
                    priority={index < 6}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                    <h3 className="font-semibold truncate group-hover:text-primary">{playlist.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{playlist.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">You haven't created any playlists yet.</p>
          <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
            Create Your First Playlist
          </Button>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new playlist</DialogTitle>
            <DialogDescription>Give your new playlist a name and an optional description.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="playlist-name">Playlist Name</Label>
                <Input
                    id="playlist-name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="My Awesome Mix"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="playlist-description">Description (optional)</Label>
                <Textarea
                    id="playlist-description"
                    value={newPlaylistDescription}
                    onChange={(e) => setNewPlaylistDescription(e.target.value)}
                    placeholder="A collection of my favorite tracks..."
                />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreatePlaylist}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
