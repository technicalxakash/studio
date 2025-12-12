'use server';

/**
 * @fileOverview This file defines a Genkit flow to extract key information from medical documents.
 *
 * It uses a prompt to extract patient name, diagnosis, and relevant values from the document text.
 * The flow takes medical document text as input and returns the extracted information as output.
 *
 * @exports {
 *   extractMedicalDocumentInfo,
 *   ExtractMedicalDocumentInfoInput,
 *   ExtractMedicalDocumentInfoOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractMedicalDocumentInfoInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the medical document to be analyzed.'),
});
export type ExtractMedicalDocumentInfoInput = z.infer<
  typeof ExtractMedicalDocumentInfoInputSchema
>;

const ExtractMedicalDocumentInfoOutputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  diagnosis: z.string().describe('The diagnosis extracted from the document.'),
  relevantValues: z
    .string()
    .describe('Any relevant values or findings from the document.'),
});
export type ExtractMedicalDocumentInfoOutput = z.infer<
  typeof ExtractMedicalDocumentInfoOutputSchema
>;

const extractMedicalDocumentInfoPrompt = ai.definePrompt({
  name: 'extractMedicalDocumentInfoPrompt',
  input: {schema: ExtractMedicalDocumentInfoInputSchema},
  output: {schema: ExtractMedicalDocumentInfoOutputSchema},
  prompt: `You are an expert medical document analyzer. Your task is to extract key information from the provided medical document text.

  Specifically, you need to identify and extract the following:
  - Patient Name: The full name of the patient mentioned in the document.
  - Diagnosis: The primary diagnosis or medical condition identified in the document.
  - Relevant Values: Any significant values, findings, or observations noted in the document (e.g., lab results, measurements).

  Please provide the extracted information in a structured format.

  Medical Document Text: {{{documentText}}}`,
});

const extractMedicalDocumentInfoFlow = ai.defineFlow(
  {
    name: 'extractMedicalDocumentInfoFlow',
    inputSchema: ExtractMedicalDocumentInfoInputSchema,
    outputSchema: ExtractMedicalDocumentInfoOutputSchema,
  },
  async input => {
    const {output} = await extractMedicalDocumentInfoPrompt(input);
    return output!;
  }
);

export async function extractMedicalDocumentInfo(
  input: ExtractMedicalDocumentInfoInput
): Promise<ExtractMedicalDocumentInfoOutput> {
  return extractMedicalDocumentInfoFlow(input);
}
