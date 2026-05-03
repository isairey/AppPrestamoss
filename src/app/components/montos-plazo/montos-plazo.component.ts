import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  codigo: number;
  valorMinimo: number;
  valorMaximo: number;
  plazo: string;
  tasa: number;
}


export interface PeriodicElement {
  codigo: number;
  valorMinimo: number;
  valorMaximo: number;
  plazo: string;
  tasa: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
  {codigo: 2, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
  {codigo: 3, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
  {codigo: 4, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
  {codigo: 5, valorMaximo: 0.00, valorMinimo: 0.00, plazo:'',tasa: 0.0000},
];

@Component({
  selector: 'app-montos-plazo',
  templateUrl: './montos-plazo.component.html',
  styleUrls: ['./montos-plazo.component.css']
})

export class MontosPlazoComponent implements OnInit {
  codigo: number;
  valorMinimo: number;
  valorMaximo: number;
  plazo: string;
  tasa: number;
  showSpinner = false;

  constructor(public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }
  displayedColumns: string[] = ['select', 'codigo','valorMaximo', 'valorMinimo', 'plazo', 'tasa'];
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

}