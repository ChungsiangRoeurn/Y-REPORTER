import {
    BookOpen,
    ListOrdered,
    Printer,
    Repeat,
    UserPlus,
} from 'lucide-react';
export const features = [
  {
    icon: BookOpen,
    title: 'Add and Manage Books',
    description:
      'Store and organize book details including title, author, and description.',
    color: 'bg-gradient-to-r from-pink-100 to-pink-50',
  },
  {
    icon: UserPlus,
    title: 'Track Borrowers',
    description:
      'Maintain records of borrowers with contact information.',
    color: 'bg-gradient-to-r from-green-100 to-green-50',
  },
  {
    icon: Repeat,
    title: 'Assign Books',
    description:
      'Assign books to borrowers and track borrow dates.',
    color: 'bg-gradient-to-r from-yellow-100 to-yellow-50',
  },
  {
    icon: ListOrdered,
    title: 'View Borrow List',
    description:
      'Check current borrowed books with borrower info and due dates.',
    color: 'bg-gradient-to-r from-blue-100 to-blue-50',
  },
  {
    icon: Printer,
    title: 'Export PDF Reports',
    description:
      'Generate downloadable PDF reports of borrowing activity.',
    color: 'bg-gradient-to-r from-purple-100 to-purple-50',
  },
];
