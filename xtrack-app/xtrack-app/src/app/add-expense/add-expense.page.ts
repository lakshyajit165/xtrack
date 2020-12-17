import { Component, OnInit } from '@angular/core';
import { payeeData } from '../providers/payeeData.provider';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {

  payee: string;
  constructor(
    private payeeData: payeeData
  ) {
    this.payee = this.payeeData.payeedata === undefined ? '' : this.payeeData.payeedata;
   }

  ngOnInit() {
  }

}
