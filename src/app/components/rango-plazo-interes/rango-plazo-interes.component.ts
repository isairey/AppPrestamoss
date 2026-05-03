import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
export interface PeriodicElement {
  name: string;
  position: number;
}
export interface DialogData {
  animal: string;
  name: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'INGRESOS INSTITUCIONES'},
];
@Component({
  selector: 'app-rango-plazo-interes',
  templateUrl: './rango-plazo-interes.component.html',
  styleUrls: ['./rango-plazo-interes.component.css']
})
export class RangoPlazoInteresComponent implements OnInit {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  ngOnInit() {
  }

}

