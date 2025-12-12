import { RiskPredictionForm } from './risk-prediction-form';

export default function RiskPredictionPage() {
  return (
    <div className="container mx-auto py-4">
      <div className="mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Disease Risk Prediction
        </h1>
        <p className="text-muted-foreground mt-2">
          Enter patient data to predict risks for major diseases and receive
          AI-powered suggestions.
        </p>
      </div>
      <RiskPredictionForm />
    </div>
  );
}
