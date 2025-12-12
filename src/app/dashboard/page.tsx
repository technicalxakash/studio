import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  FileText,
  HeartPulse,
  Stethoscope,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'AI Disease Risk Prediction',
    description:
      'Predict risks for heart disease, diabetes, and more based on patient data.',
    href: '/dashboard/risk-prediction',
    icon: HeartPulse,
  },
  {
    title: 'Smart Triage System',
    description:
      'Get AI-powered suggestions for doctor, priority, and tests from symptoms.',
    href: '/dashboard/triage',
    icon: Stethoscope,
  },
  {
    title: 'Medical Document AI',
    description:
      'Extract key information from medical notes, prescriptions, and lab reports.',
    href: '/dashboard/document-ai',
    icon: FileText,
  },
  {
    title: 'Patient Support Chatbot',
    description:
      'Assist patients with appointments, report explanations, and reminders.',
    href: '/dashboard/patient-support',
    icon: Bot,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Welcome to MediSys AI
        </h1>
        <p className="text-muted-foreground mt-2">
          Your intelligent hospital management assistant.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.href} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
                <feature.icon className="w-8 h-8 text-primary ml-4" />
              </div>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter>
              <Button asChild className="w-full md:w-auto">
                <Link href={feature.href}>
                  Launch Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
