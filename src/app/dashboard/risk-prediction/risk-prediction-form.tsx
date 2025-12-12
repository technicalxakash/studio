'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  diseaseRiskPredictionWithSuggestions,
  DiseaseRiskPredictionOutput,
} from '@/ai/flows/disease-risk-prediction-suggestions';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, Heart, Brain, Droplet, Shield } from 'lucide-react';

const formSchema = z.object({
  age: z.coerce.number().min(1, 'Age is required.'),
  gender: z.enum(['male', 'female']),
  bmi: z.coerce.number().min(1, 'BMI is required.'),
  systolicBloodPressure: z.coerce.number().min(1, 'Systolic BP is required.'),
  diastolicBloodPressure: z.coerce.number().min(1, 'Diastolic BP is required.'),
  cholesterol: z.coerce.number().min(1, 'Cholesterol is required.'),
  smoking: z.boolean(),
  activityLevel: z.enum(['low', 'moderate', 'high']),
  familyHistory: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const riskCategories = {
  heartDiseaseRisk: { label: 'Heart Disease', icon: Heart },
  diabetesRisk: { label: 'Diabetes', icon: Droplet },
  strokeRisk: { label: 'Stroke', icon: Brain },
  kidneyDiseaseRisk: { label: 'Kidney Disease', icon: Shield },
};

export function RiskPredictionForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseRiskPredictionOutput | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 45,
      gender: 'male',
      bmi: 25,
      systolicBloodPressure: 120,
      diastolicBloodPressure: 80,
      cholesterol: 200,
      smoking: false,
      activityLevel: 'moderate',
      familyHistory: false,
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const prediction = await diseaseRiskPredictionWithSuggestions(values);
      setResult(prediction);
    } catch (e) {
      setError(
        'An error occurred while fetching predictions. Please try again.'
      );
      console.error(e);
    }
    setLoading(false);
  }

  const getProgressColor = (value: number) => {
    if (value > 70) return 'bg-destructive';
    if (value > 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Patient Data</CardTitle>
          <CardDescription>
            Fill in the patient's information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="45" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bmi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BMI</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="25.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cholesterol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cholesterol</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="systolicBloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Systolic BP</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="120" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diastolicBloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diastolic BP</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormField
                  control={form.control}
                  name="smoking"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Smoking</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="familyHistory"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Family History</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Predict Risk
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(riskCategories).map(([key, value]) => {
                  const riskValue = result[key as keyof typeof result] as number;
                  const riskPercentage = Math.round(riskValue * 100);
                  const Icon = value.icon;
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{value.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={riskPercentage}
                          className="h-2 flex-1"
                          indicatorClassName={getProgressColor(riskPercentage)}
                        />
                        <span className="text-sm font-bold w-12 text-right">
                          {riskPercentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>AI Suggestions</AlertTitle>
                <AlertDescription>{result.suggestions}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
