import {
  BookOpen,
  Home,
  ListOrdered,
  LucideIcon,
  Printer,
  Repeat
} from 'lucide-react';

export interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const menuItems: MenuItem[] = [
  { label: 'All Book', href: '/all-book', icon: BookOpen },
  { label: 'Read & Borrow', href: '/borrow-now', icon: Repeat },
  { label: 'View Borrow List', href: '/borrow-list', icon: ListOrdered },
  { label: 'Export Report', href: '/export-report', icon: Printer },
];
export const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "All Book", href: "/all-book", icon: BookOpen },
    { label: "Borrow List", href: "/borrow-list", icon: ListOrdered },
];