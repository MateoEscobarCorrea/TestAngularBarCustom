import {
  Component,
  Input,
  Output,
  EventEmitter,
  Injector,
  Type,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
  ViewContainerRef,
  ComponentRef,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WindowInstance } from '../../services/window.service';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WindowComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  @Input() component!: Type<any>;
  @Input() data: any;
  @Input() title: string = '';
  @Input() focused: boolean = false;
  @Input() windowInstance!: WindowInstance;

  @Output() closed = new EventEmitter<void>();
  @Output() focusedEvent = new EventEmitter<void>();

  isMinimized = false;
  isMaximized = false;

  constructor(private injector: Injector) {}

  onFocus() {
    this.focusedEvent.emit();
  }

  ngAfterViewInit(): void {
    this.container.clear();
    const ref: ComponentRef<any> = this.container.createComponent(this.component, {
      injector: Injector.create({
        providers: [{ provide: 'data', useValue: this.data }],
        parent: this.injector,
      }),
    });
    this.windowInstance.componentInstance = ref.instance;
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
  }
}
