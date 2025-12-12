import { ChatInterface } from './chat-interface';

export default function PatientSupportPage() {
  return (
    <div className="h-[calc(100vh-theme(spacing.28))] flex flex-col">
       <div className="mb-4">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Patient AI Support
        </h1>
        <p className="text-muted-foreground mt-2">
          Chat with our AI assistant for help with symptoms, appointments, and more.
        </p>
      </div>
      <ChatInterface />
    </div>
  );
}
