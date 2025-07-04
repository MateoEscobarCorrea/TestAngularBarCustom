import { Component, Input, Output, EventEmitter, Injector, Type, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgComponentOutlet } from '@angular/common/dynamic';

@Component({
  selector: 'app-window',
  standalone: true,
  templateUrl: './windows.component.html',
  styleUrls: ['./windows.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatIconModule,
    NgComponentOutlet
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
