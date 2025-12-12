// The AI flow predicts disease risks based on patient data and provides AI-powered suggestions.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiseaseRiskPredictionInputSchema = z.object({
  age: z.number().describe('The age of the patient.'),
  gender: z.enum(['male', 'female']).describe('The gender of the patient.'),
  bmi: z.number().describe('The body mass index of the patient.'),
  systolicBloodPressure: z.number().describe('The systolic blood pressure of the patient.'),
  diastolicBloodPressure: z.number().describe('The diastolic blood pressure of the patient.'),
  cholesterol: z.number().describe('The cholesterol level of the patient.'),
  smoking: z.boolean().describe('Whether the patient is a smoker.'),
  activityLevel: z.enum(['low', 'moderate', 'high']).describe('The activity level of the patient.'),
  familyHistory: z.boolean().describe('Whether the patient has a family history of the disease.'),
});
export type DiseaseRiskPredictionInput = z.infer<typeof DiseaseRiskPredictionInputSchema>;

const DiseaseRiskPredictionOutputSchema = z.object({
  heartDiseaseRisk: z.number().describe('The risk score for heart disease (0-1).'),
  diabetesRisk: z.number().describe('The risk score for diabetes (0-1).'),
  strokeRisk: z.number().describe('The risk score for stroke (0-1).'),
  kidneyDiseaseRisk: z.number().describe('The risk score for kidney disease (0-1).'),
  suggestions: z.string().describe('AI-powered suggestions based on the risk scores.'),
});
export type DiseaseRiskPredictionOutput = z.infer<typeof DiseaseRiskPredictionOutputSchema>;

export async function diseaseRiskPredictionWithSuggestions(input: DiseaseRiskPredictionInput): Promise<DiseaseRiskPredictionOutput> {
  return diseaseRiskPredictionWithSuggestionsFlow(input);
}

const diseaseRiskPredictionPrompt = ai.definePrompt({
  name: 'diseaseRiskPredictionPrompt',
  input: {schema: DiseaseRiskPredictionInputSchema},
  output: {schema: DiseaseRiskPredictionOutputSchema},
  prompt: `You are an AI assistant that predicts disease risks and provides suggestions.

  Based on the following patient data, predict the risk scores for heart disease, diabetes, stroke, and kidney disease (between 0 and 1).
  Also, provide AI-powered suggestions based on the risk scores.

  Patient Data:
  Age: {{{age}}}
  Gender: {{{gender}}}
  BMI: {{{bmi}}}
  Systolic Blood Pressure: {{{systolicBloodPressure}}}
  Diastolic Blood Pressure: {{{diastolicBloodPressure}}}
  Cholesterol: {{{cholesterol}}}
  Smoking: {{{smoking}}}
  Activity Level: {{{activityLevel}}}
  Family History: {{{familyHistory}}}

  Output the risk scores as floating point numbers between 0 and 1.  Output the suggestions as a paragraph.
  Here is the output schema description:
  {{outputSchemaDescription}}`,
});

const diseaseRiskPredictionWithSuggestionsFlow = ai.defineFlow(
  {
    name: 'diseaseRiskPredictionWithSuggestionsFlow',
    inputSchema: DiseaseRiskPredictionInputSchema,
    outputSchema: DiseaseRiskPredictionOutputSchema,
  },
  async input => {
    const {output} = await diseaseRiskPredictionPrompt(input);
    return output!;
  }
);
