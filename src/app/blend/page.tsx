"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Users, Plus, Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockFriends = [
  { id: 'f1', name: 'Jane Doe', avatarUrl: 'https://picsum.photos/seed/jane/100/100' },
  { id: 'f2', name: 'Chris Green', avatarUrl: 'https://picsum.photos/seed/chris/100/100' },
];

const mockBlends = [
  { 
    id: 'b1', 
    friendName: 'Jane Doe', 
    friendAvatar: 'https://picsum.photos/seed/jane/100/100',
    sharedArtists: ['Tame Impala', 'The War on Drugs', 'Bon Iver'],
    coverSeed: 'blend1' 
  },
  { 
    id: 'b2', 
    friendName: 'Chris Green', 
    friendAvatar: 'https://picsum.photos/seed/chris/100/100',
    sharedArtists: ['Led Zeppelin', 'Daft Punk', 'Gorillaz'],
    coverSeed: 'blend2' 
  },
];


export default function BlendPage() {
  const [inviteEmail, setInviteEmail] = useState('');
  const { toast } = useToast();

  const handleInvite = () => {
    if (inviteEmail) {
      toast({
        title: "Invitation Sent!",
        description: `An invite has been sent to ${inviteEmail}.`
      });
      setInviteEmail('');
    }
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-2">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter">Blend</h1>
      </div>
      <p className="text-lg text-muted-foreground mb-8">
        Create shared playlists with friends and discover new music together.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Invite a Friend</CardTitle>
              <CardDescription>Enter your friend's email to start a new Blend.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="friend@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <Button onClick={handleInvite}>Invite</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockFriends.map(friend => (
                <div key={friend.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{friend.name}</span>
                  </div>
                  <Button variant="outline" size="sm">View Profile</Button>
                </div>
              ))}
               <Button variant="secondary" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Friend
                </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Your Blends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockBlends.map(blend => (
              <Card key={blend.id} className="group hover:bg-card/60 transition-colors duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                   <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        data-ai-hint="music playlist cover"
                        src={`https://picsum.photos/seed/${blend.coverSeed}/200/200`}
                        alt={`${blend.friendName} Blend`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  <div>
                    <CardTitle>You & {blend.friendName}</CardTitle>
                    <CardDescription>A mix of your favorite tracks.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm font-medium mb-2">Shared Artists:</p>
                    <div className="flex flex-wrap gap-2">
                        {blend.sharedArtists.map(artist => (
                            <div key={artist} className="flex items-center gap-1.5 bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                                <Music className="h-3 w-3" />
                                {artist}
                            </div>
                        ))}
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
