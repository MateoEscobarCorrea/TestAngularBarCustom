import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-action-toolbar',
  templateUrl: './action-toolbar.component.html',
  styleUrls: ['./action-toolbar.component.scss'],
  imports: [
    MaterialModule,
  ]
})
export class ActionToolbarComponent {
  @Input() canEdit = false;
  @Input() canDelete = false;
  @Input() canSave = false;
  @Input() canList = false;

  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() search = new EventEmitter<void>();
  @Output() list = new EventEmitter<void>();

  // Escuchar teclas globales
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'F2':
        this.create.emit();
        break;
      case 'F9':
        event.preventDefault();
        this.list.emit();
        break;
      case 'F5':
        event.preventDefault();
        this.save.emit();
        break;
    }
  }
}
