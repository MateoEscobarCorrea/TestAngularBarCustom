import { Type } from '@angular/core';

export interface NavItem {
  displayName?: string;
  divider?: boolean;
  iconName?: string;
  navCap?: string;
  route?: string;
  children?: NavItem[];
  chip?: boolean;
  chipContent?: string;
  chipClass?: string;
  external?: boolean;
  subItemIcon?: boolean;
  component?: Type<any>;
}
