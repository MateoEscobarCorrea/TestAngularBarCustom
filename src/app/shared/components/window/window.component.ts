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
  TemplateRef,
  ElementRef,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WindowInstance } from '../../services/window.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [CommonModule, MatIconModule, DragDropModule],
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WindowComponent implements AfterViewInit, OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('windowRef') windowRef!: ElementRef<HTMLDivElement>;

  @Input() component!: Type<any>;
  @Input() data: any;
  @Input() title: string = '';
  @Input() focused: boolean = false;
  @Input() windowInstance!: WindowInstance;

  @Output() closed = new EventEmitter<void>();
  @Output() focusedEvent = new EventEmitter<void>();

  isMinimized = false;
  isMaximized = false;

  private minimizeSub?: Subscription;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    if (this.windowInstance?.onMinimizeChange) {
      this.windowInstance.onMinimizeChange.subscribe((state: boolean) => {
        this.isMinimized = state;
      });
      this.minimizeSub = this.windowInstance.onMinimizeChange.subscribe(value => {
        this.isMinimized = value;
      });
    }
  }

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
    if (this.windowInstance) {
      this.windowInstance.isMinimized = this.isMinimized;
    }
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
    if (this.isMaximized && this.windowRef) {
      const el = this.windowRef.nativeElement;
      el.style.transform = 'none';
    }
  }
}
