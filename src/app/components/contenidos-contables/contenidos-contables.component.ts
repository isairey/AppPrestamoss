import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  codigo: number;
  descripcion: string;
}


export interface PeriodicElement {
  codigo: number;
  descripcion: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, descripcion: 'estado 1'},
  {codigo: 2, descripcion: 'estado 2'},
  {codigo: 3, descripcion: 'estado 3'},
  {codigo: 4, descripcion: 'estado 4'},
  {codigo: 5, descripcion: 'estado 5'},
];

@Component({
  selector: 'app-contenidos-contables',
  templateUrl: './contenidos-contables.component.html',
  styleUrls: ['./contenidos-contables.component.css']
})
export class ContenidosContablesComponent implements OnInit {
  codigo: number;
  descripcion: string;
  constructor(public dialog: MatDialog) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DailogAgregarContenidosContables, {
      width: '800px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DailogEliminarContenidosContables, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DailogEditarContenidosContables, {
      width: '800px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'codigo','descripcion'];
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
  templateUrl: './dialog-agregar-contenidos-contables.html',
  styleUrls: ['./contenidos-contables.component.css']
})
export class DailogAgregarContenidosContables {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarContenidosContables>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-eliminar-contenidos-contables.html',
  styleUrls: ['./contenidos-contables.component.css']
})
export class DailogEliminarContenidosContables {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarContenidosContables>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-editar-contenidos-contables.html',
  styleUrls: ['./contenidos-contables.component.css']
})
export class DailogEditarContenidosContables {

  constructor(
    public dialogRef: MatDialogRef<DailogEditarContenidosContables>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}