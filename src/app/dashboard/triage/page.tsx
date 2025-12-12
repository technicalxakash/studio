import { TriageForm } from './triage-form';

export default function TriagePage() {
  return (
    <div className="container mx-auto py-4">
      <div className="mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Smart Triage System
        </h1>
        <p className="text-muted-foreground mt-2">
          Enter patient symptoms and vitals to receive AI-powered triage suggestions.
        </p>
      </div>
      <TriageForm />
    </div>
  );
}
