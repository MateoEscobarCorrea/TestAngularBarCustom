import { PaymentsComponent } from 'src/app/pages/payments/payments.component';
import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:atom-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'DevExpress',
    divider: true
  },
  {
    displayName: 'Payments',
    iconName: 'solar:password-minimalistic-input-line-duotone',
    component: PaymentsComponent
  },

];
