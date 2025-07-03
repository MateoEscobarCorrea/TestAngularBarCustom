import { Injectable, Type } from '@angular/core';

interface WindowInstance {
  component: Type<any>;
  data?: any;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  windows: WindowInstance[] = [];
  focused: WindowInstance | null = null;

  open(component: Type<any>, title: string, data?: any) {
    const win = { component, title, data };
    this.windows.push(win);
    this.focused = win;
  }

  close(win: WindowInstance) {
    this.windows = this.windows.filter(w => w !== win);
    if (this.focused === win) {
      this.focused = this.windows.length ? this.windows[this.windows.length - 1] : null;
    }
  }

  focus(win: WindowInstance) {
    this.focused = win;
  }
}
