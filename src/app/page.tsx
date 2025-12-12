import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, FileText, HeartPulse, Stethoscope } from 'lucide-react';
import { Logo } from '@/components/icons';

const features = [
  {
    title: 'AI Disease Risk Prediction',
    description: 'Predict risks for heart disease, diabetes, and more based on patient data.',
    icon: HeartPulse,
  },
  {
    title: 'Smart Triage System',
    description: 'Get AI-powered suggestions for doctor, priority, and tests from symptoms.',
    icon: Stethoscope,
  },
  {
    title: 'Medical Document AI',
    description: 'Extract key information from medical notes, prescriptions, and lab reports.',
    icon: FileText,
  },
  {
    title: 'Patient Support Chatbot',
    description: 'Assist patients with appointments, report explanations, and reminders.',
    icon: Bot,
  },
];


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">MediSys AI</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up Free</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              The Future of Hospital Management is Here
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              MediSys leverages cutting-edge AI to streamline operations, improve patient outcomes, and reduce administrative overhead.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">AI-Powered Features</h2>
              <p className="mt-2 text-muted-foreground">
                Explore the intelligent tools that set MediSys apart.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center flex flex-col">
                  <CardHeader className="items-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Transform Your Hospital?</h2>
                <p className="mt-4 text-muted-foreground">
                    Join the growing number of institutions embracing the future of healthcare technology. Sign up today and experience the power of AI.
                </p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="/signup">Sign Up for MediSys AI <ArrowRight className="ml-2"/></Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <footer className="bg-muted border-t">
        <div className="container mx-auto px-4 md:px-6 py-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} MediSys AI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
