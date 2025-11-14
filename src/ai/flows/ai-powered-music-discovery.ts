'use server';

/**
 * @fileOverview AI-powered music discovery flow.
 *
 * This flow allows users to describe the kind of music they're in the mood for,
 * and the AI generates music recommendations that match their specific preferences.
 *
 * @interface AiPoweredMusicDiscoveryInput - The input type for the aiPoweredMusicDiscovery function.
 * @interface AiPoweredMusicDiscoveryOutput - The output type for the aiPoweredMusicDiscovery function.
 * @function aiPoweredMusicDiscovery - A function that takes a description of desired music
 *   and returns a list of music recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredMusicDiscoveryInputSchema = z.object({
  description: z.string().describe('A description of the desired music (e.g., upbeat, instrumental music with a nostalgic feel).'),
});
export type AiPoweredMusicDiscoveryInput = z.infer<typeof AiPoweredMusicDiscoveryInputSchema>;

const AiPoweredMusicDiscoveryOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('A music recommendation based on the description.')
  ).describe('A list of music recommendations.'),
});
export type AiPoweredMusicDiscoveryOutput = z.infer<typeof AiPoweredMusicDiscoveryOutputSchema>;

export async function aiPoweredMusicDiscovery(input: AiPoweredMusicDiscoveryInput): Promise<AiPoweredMusicDiscoveryOutput> {
  return aiPoweredMusicDiscoveryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredMusicDiscoveryPrompt',
  input: {schema: AiPoweredMusicDiscoveryInputSchema},
  output: {schema: AiPoweredMusicDiscoveryOutputSchema},
  prompt: `You are a music expert.  A user will describe the kind of music they are in the mood for, and you will provide a list of music recommendations that match their preferences.

  Description: {{{description}}}

  Please provide the recommendations as a list of song titles and artists.
  `,
});

const aiPoweredMusicDiscoveryFlow = ai.defineFlow(
  {
    name: 'aiPoweredMusicDiscoveryFlow',
    inputSchema: AiPoweredMusicDiscoveryInputSchema,
    outputSchema: AiPoweredMusicDiscoveryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
