'use server';

/**
 * @fileOverview This file defines the patient AI support flow, which allows patients to interact with an AI chatbot for various tasks.
 *
 * - patientAISupport - An async function that takes a patient's query and returns a response from the AI chatbot.
 * - PatientAISupportInput - The input type for the patientAISupport function, representing the patient's query.
 * - PatientAISupportOutput - The output type for the patientAISupport function, representing the AI chatbot's response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PatientAISupportInputSchema = z.object({
  query: z.string().describe('The patient\u2019s query or request.'),
});
export type PatientAISupportInput = z.infer<typeof PatientAISupportInputSchema>;

const PatientAISupportOutputSchema = z.object({
  response: z.string().describe('The AI chatbot\u2019s response to the patient\u2019s query.'),
});
export type PatientAISupportOutput = z.infer<typeof PatientAISupportOutputSchema>;

export async function patientAISupport(input: PatientAISupportInput): Promise<PatientAISupportOutput> {
  return patientAISupportFlow(input);
}

const patientAISupportPrompt = ai.definePrompt({
  name: 'patientAISupportPrompt',
  input: {schema: PatientAISupportInputSchema},
  output: {schema: PatientAISupportOutputSchema},
  prompt: `You are a helpful AI assistant designed to help patients manage their health. 
You can answer questions about symptoms, book appointments, explain reports, and set medication reminders.

Here is the patient's query:

{{query}}`,
});

const patientAISupportFlow = ai.defineFlow(
  {
    name: 'patientAISupportFlow',
    inputSchema: PatientAISupportInputSchema,
    outputSchema: PatientAISupportOutputSchema,
  },
  async input => {
    const {output} = await patientAISupportPrompt(input);
    return output!;
  }
);
