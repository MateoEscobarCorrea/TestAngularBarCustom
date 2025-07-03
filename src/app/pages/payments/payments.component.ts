import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MaterialModule } from '../../material.module';
import { ActionToolbarComponent } from "../../shared/action-toolbar/action-toolbar.component";
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface Payment {
  id?: number;
  date: string;
  amount: number;
  description?: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  imports: [
    MaterialModule,
    ActionToolbarComponent,
    FormsModule
  ]
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  //actions
  formModel = {
    date: '',
    amount: 0,
    description: ''
  }
  selectedPayment: Payment | null = null;

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

  }

  onEdit(){ console.log("Edit clicked")}
  onDelete(){ console.log("Dlete clicked")}
  onSearch(){ console.log("Search clicked")}
  onList(){
    this.api.getAll<Payment>('payments').subscribe({
      next: data => this.payments = data,
      error: err => console.error(err)
    });
  }



  onRowClick(event: any){
    //event.data.date = event.data.date?.substring(0, 10);
    this.selectedPayment = event.data;
    this.formModel = { ...event.data };
  }

  onCreate(){
    this.selectedPayment = null;
    this.formModel = {
      date: '',
      amount: 0,
      description: ''
    }
  }

  onSave(){
    if(this.selectedPayment){
      this.api.update<Payment>('payments', this.selectedPayment?.id ?? 0, this.formModel).subscribe(() => {
        this.onList();
        this.snackBar.open('Payment updated successfully!', 'close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
      });
    }else{
      this.api.create<Payment>('payments', this.formModel).subscribe(() => {
        this.onList();
        this.snackBar.open('Payment created successfully!', 'close', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
      });
    }
  }

  onExport(){
    alert("va");
  }
}
