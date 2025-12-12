import { config } from 'dotenv';
config();

import '@/ai/flows/extract-medical-document-info.ts';
import '@/ai/flows/disease-risk-prediction-suggestions.ts';
import '@/ai/flows/triage-suggestions.ts';
import '@/ai/flows/patient-ai-support.ts';