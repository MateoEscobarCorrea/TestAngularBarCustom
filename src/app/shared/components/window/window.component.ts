import {
  Component,
  Input,
  Output,
  EventEmitter,
  Injector,
  Type,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet, MatIconModule],
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WindowComponent {
  @Input() component!: Type<any>;
  @Input() data: any;
  @Input() title: string = '';
  @Input() focused: boolean = false;

  @Output() closed = new EventEmitter<void>();
  @Output() focusedEvent = new EventEmitter<void>();

  constructor(private injector: Injector) {}

  onFocus() {
    this.focusedEvent.emit();
  }

  onActivate(instance: any) {
    this.data.componentRef = instance;
  }

  createInjector(): Injector {
    return Injector.create({
      providers: [{ provide: 'data', useValue: this.data }],
      parent: this.injector,
    });
  }
}
