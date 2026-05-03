import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  codigo: number;
  nombre: string;
  registro: string;
}

export interface PeriodicElement {
  codigo: number;
  nombre: string;
  registro: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, nombre: 'estado 1', registro: 'hola'},
  {codigo: 2, nombre: 'estado 2', registro: 'hola'},
  {codigo: 3, nombre: 'estado 3', registro: 'hola'},
  {codigo: 4, nombre: 'estado 4', registro: 'hola'},
  {codigo: 5, nombre: 'estado 5', registro: 'hola'},
];
@Component({
  selector: 'app-ingenieros-valuadores',
  templateUrl: './ingenieros-valuadores.component.html',
  styleUrls: ['./ingenieros-valuadores.component.css']
})
export class IngenierosValuadoresComponent implements OnInit {

  codigo: number;
  nombre: string;
  registro: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DailogAgregarIngenierosValuadores, {
      width: '500px',
      data: {codigo: this.codigo, nombre: this.nombre, registro: this.registro}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nombre = result;
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DailogEditarIngenierosValuadores, {
      width: '500px',
      data: {codigo: this.codigo, nombre: this.nombre, registro: this.registro}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nombre = result;
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DailogEliminarIngenierosValuadores, {
      width: '450px',
      data: {codigo: this.codigo, nombre: this.nombre, registro: this.registro}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nombre = result;
    });
  }

  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'codigo','nombre', 'registro'];
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './agregar-ingenieros-valuadores.component.html',
  styleUrls: ['./ingenieros-valuadores.component.css']
})
export class DailogAgregarIngenierosValuadores {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarIngenierosValuadores>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './editar-ingenieros-valuadores.component.html',
  styleUrls: ['./ingenieros-valuadores.component.css']
})
export class DailogEditarIngenierosValuadores {

  constructor(
    public dialogRef: MatDialogRef<DailogEditarIngenierosValuadores>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-ingenieros-valuadores.component.html',
  styleUrls: ['./ingenieros-valuadores.component.css']
})
export class DailogEliminarIngenierosValuadores {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarIngenierosValuadores>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}