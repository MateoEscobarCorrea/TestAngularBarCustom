import {
  Component,
  Input,
  Output,
  EventEmitter,
  Injector,
  Type,
  ViewEncapsulation
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-window',
  templateUrl: './windows.component.html',
  styleUrls: ['./windows.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatIconModule
  ]
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

  createInjector(): Injector {
    return Injector.create({
      providers: [{ provide: 'data', useValue: this.data }],
      parent: this.injector
    });
  }
}
