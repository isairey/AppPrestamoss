import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface PeriodicElement {
  description: string;
  number: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number: 1, description: 'Hydrogen'},
  {number: 2, description: 'Helium'},
  {number: 3, description: 'Lithium'},
  {number: 4, description: 'Beryllium'},
  {number: 5, description: 'Boron'},
  {number: 6, description: 'Carbon'},
  {number: 7, description: 'Nitrogen'},
  {number: 8, description: 'Oxygen'},
  {number: 9, description: 'Fluorine'},
  {number: 10, description: 'Neon'},
];

@Component({
  selector: 'app-tipos-deducciones',
  templateUrl: './tipos-deducciones.component.html',
  styleUrls: ['./tipos-deducciones.component.css']
})
export class TiposDeduccionesComponent implements OnInit {

  animal: string;
  names: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearTiposDeducciones, {
      width: '300px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(EliminarTiposDeducciones, {
      width: '500px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogEditar(): void {
    const dialogRef = this.dialog.open(ActualizarTiposDeducciones, {
      width: '300px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

 displayedColumns: string[] = ['select', 'number', 'description'];

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.number + 1}`;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

} 
//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 

export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-tipos-deducciones.component.html',
  styleUrls: ['./tipos-deducciones.component.css']
})
export class CrearTiposDeducciones {

  constructor(
    public dialogRef: MatDialogRef<CrearTiposDeducciones>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-tipo-deduccion.component.html',
  styleUrls: ['./tipos-deducciones.component.css']
})
export class ActualizarTiposDeducciones {

  constructor(
    public dialogRef: MatDialogRef<ActualizarTiposDeducciones>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-tipo-deduccion.component.html',
  styleUrls: ['./tipos-deducciones.component.css']
})
export class EliminarTiposDeducciones {

  constructor(
    public dialogRef: MatDialogRef<EliminarTiposDeducciones>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
