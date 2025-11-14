"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { generateSongRecommendations, type SongRecommendationInput } from "@/ai/flows/personalized-song-recommendations";

export default function DiscoverPage() {
  const [formState, setFormState] = useState<SongRecommendationInput>({
    listeningHistory: "Loves classic rock like Led Zeppelin and Pink Floyd, but also enjoys modern indie artists like Tame Impala and The War on Drugs.",
    genrePreferences: "Rock, Indie, Psychedelic",
    mood: "Adventurous",
  });
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof SongRecommendationInput, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await generateSongRecommendations(formState);
        setRecommendations(result.recommendations);
      } catch (error) {
        console.error("Failed to get recommendations:", error);
        toast({
          variant: "destructive",
          title: "Recommendation Failed",
          description: "Could not generate recommendations. Please try again.",
        });
      }
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold tracking-tighter mb-2">Personalized Discovery</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Let our AI craft a playlist just for you.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Tell Us Your Taste</CardTitle>
              <CardDescription>
                The more details, the better the recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="listeningHistory">Listening History</Label>
                  <Textarea
                    id="listeningHistory"
                    name="listeningHistory"
                    value={formState.listeningHistory}
                    onChange={handleInputChange}
                    placeholder="e.g., I listen to a lot of 80s pop and some modern electronic music..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genrePreferences">Genre Preferences</Label>
                  <Input
                    id="genrePreferences"
                    name="genrePreferences"
                    value={formState.genrePreferences}
                    onChange={handleInputChange}
                    placeholder="e.g., Pop, Electronic, Synthwave"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mood">Current Mood</Label>
                  <Select
                    name="mood"
                    onValueChange={(value) => handleSelectChange('mood', value)}
                    value={formState.mood}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Upbeat">Upbeat</SelectItem>
                      <SelectItem value="Relaxing">Relaxing</SelectItem>
                      <SelectItem value="Energetic">Energetic</SelectItem>
                      <SelectItem value="Melancholy">Melancholy</SelectItem>
                      <SelectItem value="Adventurous">Adventurous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Playlist
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
           <Card className="min-h-full">
            <CardHeader>
                <CardTitle>Your AI-Generated Playlist</CardTitle>
            </CardHeader>
            <CardContent>
                {recommendations.length > 0 ? (
                    <ul className="space-y-3">
                    {recommendations.map((rec, index) => (
                        <li key={index} className="p-3 bg-muted rounded-md flex items-center gap-3">
                            <Sparkles className="h-5 w-5 text-accent"/>
                            <span>{rec}</span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center h-64">
                        <Sparkles className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground">Your recommendations will appear here.</p>
                    </div>
                )}
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
