
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Github, Mail, Settings, LogOut, User, Link as LinkIcon, Trash2, Palette } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAppContext } from "@/components/Providers";

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.243 13.94c-.198.297-.594.416-.89.218a5.59 5.59 0 01-3.354-1.206c-.297-.198-.356-.594-.158-.89.198-.297.594-.356.89-.158a5.006 5.006 0 012.97 1.08c.297.198.356.594.158.89zm.772-2.118c-.237.356-.713.475-1.07.238a6.934 6.934 0 01-4.158-1.505c-.356-.237-.475-.713-.238-1.07.238-.356.713-.475 1.07-.237a6.293 6.293 0 013.754 1.388c.356.237.475.713.238 1.07zm.832-2.296c-.278.416-.832.555-1.248.277A8.707 8.707 0 016.52 9.49c-.416-.277-.555-.831-.278-1.248.278-.416.832-.555 1.248-.277a9.428 9.428 0 015.553 2.455c.416.277.555.83.278 1.248z" />
    </svg>
  );

export default function SettingsPage() {
  const { toast } = useToast();
  const { user } = useAppContext();

  const handleClearHistory = () => {
    toast({
      title: "Listening History Cleared",
      description: "Your listening history has been successfully cleared.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="flex items-center gap-4 mb-2">
        <Settings className="h-8 w-8" />
        <h1 className="text-4xl font-bold tracking-tighter">Settings</h1>
      </div>
      <p className="text-lg text-muted-foreground mb-8">
        Customize your MewTone experience.
      </p>
      
      <Tabs defaultValue="account" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger value="account"><User className="mr-2 h-4 w-4"/>Account</TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4"/>Appearance</TabsTrigger>
            <TabsTrigger value="connections"><LinkIcon className="mr-2 h-4 w-4"/>Connections</TabsTrigger>
            <TabsTrigger value="data"><Trash2 className="mr-2 h-4 w-4"/>Data</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} />
                </div>
                <Button variant="destructive" className="w-full sm:w-auto">
                    <LogOut className="mr-2 h-4 w-4"/>
                    Log Out
                </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <Label htmlFor="dark-theme" className="flex flex-col gap-1">
                    <span>Theme</span>
                    <span className="font-normal text-sm text-muted-foreground">
                        Select a theme for the application.
                    </span>
                </Label>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>Connections</CardTitle>
              <CardDescription>Connect to your favorite music services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                  <Label>Connected Accounts</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <Button variant="outline"><SpotifyIcon className="h-4 w-4 mr-2"/> Spotify</Button>
                      <Button variant="outline"><Mail className="h-4 w-4 mr-2"/> Gmail</Button>
                      <Button variant="outline"><Github className="h-4 w-4 mr-2"/> GitHub</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="music-source">Music Source</Label>
                  <Select defaultValue="spotify">
                    <SelectTrigger id="music-source">
                      <SelectValue placeholder="Select a source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spotify">Spotify</SelectItem>
                      <SelectItem value="youtube-music">Youtube Music</SelectItem>
                      <SelectItem value="soundcloud">SoundCloud</SelectItem>
                      <SelectItem value="audius">Audius</SelectItem>
                      <SelectItem value="musopen">Musopen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage your application data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/50">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="clear-history">Clear Listening History</Label>
                     <span className="font-normal text-sm text-muted-foreground">
                        This action is irreversible and will permanently delete all your listening data.
                    </span>
                </div>
                <Button id="clear-history" variant="destructive" onClick={handleClearHistory}>
                    Clear History
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
