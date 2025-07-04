import { Component, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  standalone: true,
  selector: 'app-action-toolbar',
  templateUrl: './action-toolbar.component.html',
  styleUrls: ['./action-toolbar.component.scss'],
  imports: [
    MaterialModule,
  ]
})
export class ActionToolbarComponent {
  activeComponent: any;

  constructor(private windowService: WindowService) {
    // Escucha el componente enfocado y lo guarda en `activeComponent`
    this.windowService.focusedWindow$.subscribe(win => {
      this.activeComponent = win?.componentInstance;
    });
  }

  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() list = new EventEmitter<void>();
  @Output() export = new EventEmitter<void>();

  @Input() canEdit = false;
  @Input() canDelete = false;
  @Input() canSave = false;
  @Input() canList = false;
  @Input() canExport = false;

  // Botones que llaman a métodos del componente activo si existen
  onCreate() { this.activeComponent?.onCreate?.(); }
  onEdit() { this.activeComponent?.onEdit?.(); }
  onDelete() { this.activeComponent?.onDelete?.(); }
  onSave() { this.activeComponent?.onSave?.(); }
  onSearch() { this.activeComponent?.onSearch?.(); }
  onList() { this.activeComponent?.onList?.(); }
  onExport() { this.activeComponent?.onExport?.(); }

  // Atajos de teclado globales
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'F2':
        this.onCreate();
        break;
      case 'F9':
        event.preventDefault();
        this.onList();
        break;
      case 'F5':
        event.preventDefault();
        this.onSave();
        break;
      case 'F11':
        event.preventDefault();
        this.onExport();
        break;
    }
  }
}
