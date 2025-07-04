import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WindowInstance {
  component: Type<any>;
  data?: any;
  title: string;
  componentInstance?: any; // importante para la toolbar
}

@Injectable({ providedIn: 'root' })
export class WindowService {
  windows: WindowInstance[] = [];
  focused: WindowInstance | null = null;

  private focusedWindowSubject = new BehaviorSubject<WindowInstance | null>(null);
  focusedWindow$ = this.focusedWindowSubject.asObservable();

  open(component: Type<any>, title: string, data?: any) {
    const win: WindowInstance = { component, title, data };
    this.windows.push(win);
    this.focus(win);
  }

  close(win: WindowInstance) {
    this.windows = this.windows.filter(w => w !== win);
    if (this.focused === win) {
      this.focused = this.windows.length ? this.windows[this.windows.length - 1] : null;
      this.focusedWindowSubject.next(this.focused);
    }
  }

  focus(win: WindowInstance) {
    this.focused = win;
    this.focusedWindowSubject.next(win);
  }

  registerComponentInstance(win: WindowInstance, instance: any) {
    win.componentInstance = instance;
    if (this.focused === win) {
      this.focusedWindowSubject.next(win); // actualiza con la instancia
    }
  }
}
