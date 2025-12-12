'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  HeartPulse,
  Stethoscope,
  FileText,
  Bot,
  type LucideIcon,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/risk-prediction',
    label: 'Risk Prediction',
    icon: HeartPulse,
  },
  {
    href: '/dashboard/triage',
    label: 'Smart Triage',
    icon: Stethoscope,
  },
  {
    href: '/dashboard/document-ai',
    label: 'Document AI',
    icon: FileText,
  },
  {
    href: '/dashboard/patient-support',
    label: 'Patient Support',
    icon: Bot,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} className="block">
            <SidebarMenuButton isActive={pathname === item.href} className="w-full">
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
