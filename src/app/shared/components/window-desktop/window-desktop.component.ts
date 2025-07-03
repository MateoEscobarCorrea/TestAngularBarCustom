import { Component } from '@angular/core';
import { WindowComponent } from '../../windows/windows.component';
import { WindowService } from 'src/app/shared/services/window.service';
import { CommonModule, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-window-desktop',
  templateUrl: './window-desktop.component.html',
  styleUrls: ['./window-desktop.component.scss'],
  standalone: true,
  imports: [CommonModule, WindowComponent, NgComponentOutlet],
})
export class WindowDesktopComponent {
  constructor(public windowService: WindowService) {}
}
