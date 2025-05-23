import { BarChart, BookOpen, Facebook, FileText, Github, Linkedin, PlusSquare, Settings, Users } from "lucide-react";
import { features } from "./features";

export const socialLinks = [
    {
        href: "https://github.com/ChungsiangRoeurn/library-tracker",
        icon: Github,
        label: "GitHub",
    },
    {
        href: "www.linkedin.com/in/chungsiang-roeurn/",
        icon: Linkedin,
        label: "LinkedIn",
    },
    {
        href: "https://www.facebook.com/chungsiang.roeurn.79",
        icon: Facebook,
        label: "Facebook",
    },
];

export  const extendedFeatures = [
    ...features,
    {
      title: 'Add New Book',
      description: 'Easily add books to your digital collection.',
      icon: PlusSquare,
      color: 'ring-pink-400/30',
    },
    {
      title: 'Generate Reports',
      description: 'Create PDF reports for borrowing summaries.',
      icon: FileText,
      color: 'ring-orange-400/30',
    },
    {
      title: 'Settings & Config',
      description: 'Customize library settings and preferences.',
      icon: Settings,
      color: 'ring-cyan-400/30',
    },
    {
      title: 'User Management',
      description: 'Manage staff and borrower permissions.',
      icon: Users,
      color: 'ring-yellow-400/30',
    },
    {
      title: 'Analytics',
      description: 'Get insights on book popularity and activity.',
      icon: BarChart,
      color: 'ring-green-400/30',
    },
    {
      title: 'Borrowing History',
      description: 'View detailed borrowing history for each book.',
      icon: BookOpen,
      color: 'ring-purple-400/30',
    },
    {
      title: 'Book Recommendations',
      description: 'Get personalized book recommendations.',
      icon: BookOpen,
      color: 'ring-red-400/30',
    },
    {
      title: 'Search & Filter',
      description: 'Quickly find books with advanced search options.',
      icon: BookOpen,
      color: 'ring-blue-400/30',
    },
    {
      title: 'Notifications',
      description: 'Receive alerts for overdue books and new arrivals.',
      icon: BookOpen,
      color: 'ring-teal-400/30',
    },
    {
      title: 'Mobile Access',
      description: 'Access your library on the go with our mobile app.',
      icon: BookOpen,
      color: 'ring-purple-400/30',
    }
  ];