'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  triageSuggestions,
  TriageSuggestionsOutput,
} from '@/ai/flows/triage-suggestions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Loader2,
  Stethoscope,
  Siren,
  FlaskConical,
} from 'lucide-react';

const formSchema = z.object({
  symptoms: z.string().min(10, 'Symptoms must be at least 10 characters.'),
  vitals: z.string().min(10, 'Vitals must be at least 10 characters.'),
});

type FormData = z.infer<typeof formSchema>;

export function TriageForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriageSuggestionsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
      vitals: '',
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const suggestions = await triageSuggestions(values);
      setResult(suggestions);
    } catch (e) {
      setError(
        'An error occurred while fetching triage suggestions. Please try again.'
      );
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>
            Enter the patient's current symptoms and vital signs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., high fever, persistent cough, difficulty breathing"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vitals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vitals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Temp: 39.5°C, BP: 140/90 mmHg, HR: 110 bpm, SpO2: 92%"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Suggestions
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>AI Triage Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <Stethoscope className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Suggested Doctor / Department</p>
                  <p className="text-muted-foreground">
                    {result.suggestedDoctor}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <Siren className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Suggested Priority</p>
                  <p className="text-muted-foreground">
                    {result.suggestedPriority}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <FlaskConical className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Suggested Tests</p>
                  <p className="text-muted-foreground">
                    {result.suggestedTests}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
