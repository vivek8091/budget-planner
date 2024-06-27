import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: string;
  expenseAdded = false;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 1500 },
    { month: 'February', expenseAmount: 2000 },
    { month: 'March', expenseAmount: 1800 }
  ];
  monthSelected: boolean = false;
  januaryExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1000 },
    { expenseType: 'Groceries', expenseAmount: 500},
  ];
  februaryExpense: any[] = [
    { expenseType: 'Utilities', expenseAmount: 200 },
    { expenseType: 'Groceries', expenseAmount: 400 }
  ];
  marchExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1100 },
    { expenseType: 'Utilities', expenseAmount: 250 }
  ];

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
      this.expenseForm.patchValue({month: '', expenseType: ''});
    // this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
      this.expenseAdded = true;
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }



  saveForm() {
    if(this.expenseAdded){
      console.log("Form saved!");
      this.snackBar.open("Form Saved Successfully", 'close');
      this.expenseAdded = false;
    }
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  } 

}
