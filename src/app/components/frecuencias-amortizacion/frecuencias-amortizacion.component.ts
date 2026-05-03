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
export interface DialogData2 {
  animal: string;
  name: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'INGRESOS INSTITUCIONES'},
];
@Component({
  selector: 'app-frecuencias-amortizacion',
  templateUrl: './frecuencias-amortizacion.component.html',
  styleUrls: ['./frecuencias-amortizacion.component.css']
})
export class FrecuenciasAmortizacionComponent implements OnInit {
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFrecuenciaAmortizacionAgregar, {
      width: '800px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }  
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
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'DialogFrecuenciaAmortizacionAgregar.html',
  styleUrls: ['./frecuencias-amortizacion.component.css']
})
export class DialogFrecuenciaAmortizacionAgregar {

  constructor(
    public dialogRef: MatDialogRef<DialogFrecuenciaAmortizacionAgregar>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}