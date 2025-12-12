// triage-suggestions.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing doctor and priority suggestions based on patient symptoms and vitals.
 *
 * - triageSuggestions - A function that takes patient symptoms and vitals as input and returns suggested doctor and priority.
 * - TriageSuggestionsInput - The input type for the triageSuggestions function.
 * - TriageSuggestionsOutput - The return type for the triageSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TriageSuggestionsInputSchema = z.object({
  symptoms: z.string().describe('The symptoms the patient is experiencing.'),
  vitals: z.string().describe('The patient vitals, such as temperature, blood pressure, heart rate, etc.'),
});

export type TriageSuggestionsInput = z.infer<typeof TriageSuggestionsInputSchema>;

const TriageSuggestionsOutputSchema = z.object({
  suggestedDoctor: z.string().describe('The suggested doctor for the patient based on their symptoms and vitals.'),
  suggestedPriority: z.string().describe('The suggested priority level for the patient (e.g., high, medium, low).'),
  suggestedTests: z.string().describe('The suggested tests for the patient based on their symptoms and vitals.'),
});

export type TriageSuggestionsOutput = z.infer<typeof TriageSuggestionsOutputSchema>;

export async function triageSuggestions(input: TriageSuggestionsInput): Promise<TriageSuggestionsOutput> {
  return triageSuggestionsFlow(input);
}

const triageSuggestionsPrompt = ai.definePrompt({
  name: 'triageSuggestionsPrompt',
  input: {schema: TriageSuggestionsInputSchema},
  output: {schema: TriageSuggestionsOutputSchema},
  prompt: `You are an AI triage assistant. Given the following patient symptoms and vitals, suggest a doctor, priority level, and tests.

Symptoms: {{{symptoms}}}
Vitals: {{{vitals}}}

Consider all information provided when making your suggestions. Return the suggested doctor, priority and tests.
`,
});

const triageSuggestionsFlow = ai.defineFlow(
  {
    name: 'triageSuggestionsFlow',
    inputSchema: TriageSuggestionsInputSchema,
    outputSchema: TriageSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await triageSuggestionsPrompt(input);
    return output!;
  }
);
