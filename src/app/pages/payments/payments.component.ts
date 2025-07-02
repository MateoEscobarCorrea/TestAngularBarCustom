import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MaterialModule } from '../../material.module';
import { ActionToolbarComponent } from "../../shared/action-toolbar/action-toolbar.component";

export interface Payment {
  id: number;
  date: string;
  amount: number;
  description?: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  imports: [
    MaterialModule,
    ActionToolbarComponent
  ]
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  selectedPayment: Payment | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {

  }

  onCreate(){ console.log("Create clicked")}
  onEdit(){ console.log("Edit clicked")}
  onDelete(){ console.log("Dlete clicked")}
  onSave(){ console.log("Save clicked")}
  onSearch(){ console.log("Search clicked")}
  onList(){
    this.api.getAll<Payment>('payments').subscribe({
      next: data => this.payments = data,
      error: err => console.error(err)
    });
  }
}
