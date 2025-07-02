import { Component, EventEmitter, Input, Output } from '@angular/core';
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
}
