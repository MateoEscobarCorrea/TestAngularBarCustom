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

  resizing = false;
  resizeDir: 'right' | 'bottom' | 'corner' | null = null;
  startX = 0;
  startY = 0;
  startWidth = 0;
  startHeight = 0;

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
  onResizeStart(event: MouseEvent, dir: 'right' | 'bottom' | 'corner') {
    event.preventDefault();
    this.resizing = true;
    this.resizeDir = dir;
    this.startX = event.clientX;
    this.startY = event.clientY;

    const rect = this.windowRef.nativeElement.getBoundingClientRect();
    this.startWidth = rect.width;
    this.startHeight = rect.height;

    document.addEventListener('mousemove', this.onResizing);
    document.addEventListener('mouseup', this.onResizeEnd);
  }

  onResizing = (event: MouseEvent) => {
    if (!this.resizing || !this.resizeDir) return;

    let newWidth = this.startWidth;
    let newHeight = this.startHeight;

    if (this.resizeDir === 'right' || this.resizeDir === 'corner') {
      newWidth = this.startWidth + (event.clientX - this.startX);
    }

    if (this.resizeDir === 'bottom' || this.resizeDir === 'corner') {
      newHeight = this.startHeight + (event.clientY - this.startY);
    }

    const el = this.windowRef.nativeElement;
    el.style.width = newWidth + 'px';
    el.style.height = newHeight + 'px';
  };
  onResizeEnd = () => {
    this.resizing = false;
    this.resizeDir = null;
    document.removeEventListener('mousemove', this.onResizing);
    document.removeEventListener('mouseup', this.onResizeEnd);
  };
}
