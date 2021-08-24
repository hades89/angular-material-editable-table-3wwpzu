import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { TableData } from './table-data.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: TableData[] = [
    { from: new Date(), to: new Date(), checked: Boolean(), desc: String() }
  ];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['from', 'to', 'checked', 'desc'];
  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ data: this.rows });
  array = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.array = [
      {
        seq: 1,
        checked: false
      },
      {
        seq: 2,
        checked: true
      }
    ];
    this.data.forEach((d: TableData) => {
      this.array.forEach(info => {
        this.addRow(d, false, info);
      });
    });
    this.updateView();
  }

  emptyTable() {
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }
  }

  addRow(d?: TableData, noUpdate?: boolean, info?: any) {
    // console.log('aa: ' + info.checked);

    const row = this.fb.group({
      from: [d && d.from ? d.from : null, []],
      to: [d && d.to ? d.to : null, []],
      checked: [info.checked],
      desc: [d && d.desc ? d.desc : null, []]
    });
    console.log(row);
    this.rows.push(row);
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }
}
