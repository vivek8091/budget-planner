import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  incomeForm:any;
  selectedMonth:any;
  monthSelected:boolean = false;
  januaryIncome: any[] = [
    { source: 'Salary', amount: 5000, investments: '401(k)'},
    { source: 'Freelancing', amount: 1000, investments: 'Stocks'},
  ];
  februaryIncome: any[] = [
    { source: 'Salary', amount: 5500, investments: '401(k)'},
    { source: 'Rental Income', amount: 700, investments: 'Real Estate'},
  ];
  marchIncome: any[] = [
    { source: 'Salary', amount: 5200, investments: '401(k)'},
    { source: 'Freelancing', amount: 1200, investments: 'Stocks'},
    { source: 'Rental Income', amount: 600, investments: 'Real Estate'},
  ];

  constructor(public fb: FormBuilder){
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }
  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required]
    })
  }

  onChange(event: any){
    this.selectedMonth = event.target.value;
    this.monthSelected=true;
    this.getFilteredIncomes();
  }

  calculateTotalIncome(month: string): number {
    let totalIncome = 0;
    for (const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomesForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryIncome;
        case 'February':
        return this.februaryIncome;
        case 'March':
        return this.marchIncome;
    
      default:
        return[];
    }
  }

  getFilteredIncomes(){
    let filteredIncomes:any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncome];
        break;
        case 'February':
          filteredIncomes = [...this.februaryIncome];
          break;
        case 'March':
          filteredIncomes = [...this.marchIncome];
          break;
      default:
        break;
    }
    return filteredIncomes;
  }

  onSubmit(){

  }
}
