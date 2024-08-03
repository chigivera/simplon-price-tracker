import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Product',
    href: '/dashboard/product',
    icon: 'add',
    label: 'product'
  },
  {
    title: 'Billing',
    href: '/dashboard/billing',
    icon: 'billing',
    label: 'billing'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
    label: 'settings'
  },
  {
    title: 'Log out',
    href: '/',
    icon: 'login',
    label: 'logout'
  }
];
