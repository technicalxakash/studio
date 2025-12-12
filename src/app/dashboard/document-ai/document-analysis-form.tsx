'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  extractMedicalDocumentInfo,
  ExtractMedicalDocumentInfoOutput,
} from '@/ai/flows/extract-medical-document-info';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, User, FileText, Activity } from 'lucide-react';

const formSchema = z.object({
  documentText: z
    .string()
    .min(50, 'Document text must be at least 50 characters long.'),
});

type FormData = z.infer<typeof formSchema>;

export function DocumentAnalysisForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<ExtractMedicalDocumentInfoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentText: '',
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const extractedInfo = await extractMedicalDocumentInfo(values);
      setResult(extractedInfo);
    } catch (e) {
      setError(
        'An error occurred while analyzing the document. Please try again.'
      );
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Analyze Document</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="documentText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Document Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the patient's lab report, doctor's notes, or prescription here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Document
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Extracted Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <User className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Patient Name</p>
                <p className="text-muted-foreground">{result.patientName}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Diagnosis</p>
                <p className="text-muted-foreground">{result.diagnosis}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Activity className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Relevant Values</p>
                <p className="text-muted-foreground">{result.relevantValues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
