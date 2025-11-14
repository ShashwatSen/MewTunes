'use server';

/**
 * @fileOverview A personalized song recommendation AI agent.
 *
 * - generateSongRecommendations - A function that generates song recommendations based on user preferences.
 * - SongRecommendationInput - The input type for the generateSongRecommendations function.
 * - SongRecommendationOutput - The return type for the generateSongRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SongRecommendationInputSchema = z.object({
  listeningHistory: z
    .string()
    .describe(
      'A detailed history of the user songs, artists, and genres they have listened to, including frequency and duration.'
    ),
  genrePreferences: z
    .string()
    .describe('A list of preferred music genres specified by the user.'),
  mood: z
    .string()
    .describe(
      'The desired mood or feeling for the recommended songs (e.g., upbeat, relaxing, energetic).'
    ),
});

export type SongRecommendationInput = z.infer<typeof SongRecommendationInputSchema>;

const SongRecommendationOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of song recommendations based on the user preferences.'),
});

export type SongRecommendationOutput = z.infer<typeof SongRecommendationOutputSchema>;

export async function generateSongRecommendations(
  input: SongRecommendationInput
): Promise<SongRecommendationOutput> {
  return personalizedSongRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSongRecommendationsPrompt',
  input: {schema: SongRecommendationInputSchema},
  output: {schema: SongRecommendationOutputSchema},
  prompt: `You are a personalized music recommendation AI. Based on the user's listening history, genre preferences, and desired mood, you will provide a list of song recommendations.

Listening History: {{{listeningHistory}}}
Genre Preferences: {{{genrePreferences}}}
Mood: {{{mood}}}

Please provide a list of song recommendations that align with these preferences.`,
});

const personalizedSongRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedSongRecommendationsFlow',
    inputSchema: SongRecommendationInputSchema,
    outputSchema: SongRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
