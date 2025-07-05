import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { WindowComponent } from '../window/window.component';
import { WindowInstance, WindowService } from '../../services/window.service';

@Component({
  selector: 'app-window-desktop',
  standalone: true,
  imports: [CommonModule, NgForOf, WindowComponent],
  templateUrl: './window-desktop.component.html',
  styleUrls: ['./window-desktop.component.scss']
})
export class WindowDesktopComponent {
  constructor(public windowService: WindowService) {}

  trackByFn(index: number, win: WindowInstance): string {
    return win.id;
  }

  get minimizedWindows() {
    return this.windowService.windows.filter(w => w.isMinimized);
  }
  restore(win: WindowInstance) {
    win.onMinimizeChange?.next(false);
    win.isMinimized = false;
    this.windowService.focus(win);
  }
}
