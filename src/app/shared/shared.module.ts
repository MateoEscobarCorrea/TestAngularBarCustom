import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { WindowDesktopComponent } from './components/window-desktop/window-desktop.component';
import { WindowComponent } from './windows/windows.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    WindowDesktopComponent, // ✅ importa directamente el standalone
    WindowComponent // si también es standalone
  ],
  exports: [
    MatIconModule,
    WindowDesktopComponent
  ]
})
export class SharedModule {}
