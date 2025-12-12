import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const roles = ['Admin', 'Doctor', 'Nurse', 'Receptionist', 'Patient'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-8 font-headline">Select Your Role</h1>
      <p className="text-muted-foreground mb-8">
        Please select your role to log in to the MediSys platform.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {roles.map((role) => (
          <Button key={role} asChild variant="outline" className="w-40 h-12">
            <Link href={`/login/${role.toLowerCase()}`}>{role}</Link>
          </Button>
        ))}
      </div>
       <div className="mt-8">
          <Button variant="link" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
    </div>
  );
}
