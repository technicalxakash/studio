import { DocumentAnalysisForm } from './document-analysis-form';

export default function DocumentAiPage() {
  return (
    <div className="container mx-auto py-4">
      <div className="mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Medical Document AI
        </h1>
        <p className="text-muted-foreground mt-2">
          Paste medical document text to automatically extract key information.
        </p>
      </div>
      <DocumentAnalysisForm />
    </div>
  );
}
