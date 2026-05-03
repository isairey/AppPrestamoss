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
  selector: 'app-asesores-prestamo',
  templateUrl: './asesores-prestamo.component.html',
  styleUrls: ['./asesores-prestamo.component.css']
})
export class AsesoresPrestamoComponent implements OnInit {

  animal: string;
  names: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearAsesoresPrestamos, {
      width: '300px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogEditar(): void {
    const dialogRef = this.dialog.open(ActualizarAsesoresPrestamos, {
      width: '300px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(EliminarAsesoresPrestamos, {
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
  selector: 'asesores-prestamo',
  templateUrl: 'agregar-asesores-prestamo.component.html',
  styleUrls: ['./asesores-prestamo.component.css']
})
export class CrearAsesoresPrestamos {

  constructor(
    public dialogRef: MatDialogRef<CrearAsesoresPrestamos>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'asesores-prestamo',
  templateUrl: 'actualizar-asesores-prestamo.component.html',
  styleUrls: ['./asesores-prestamo.component.css']
})
export class ActualizarAsesoresPrestamos {

  constructor(
    public dialogRef: MatDialogRef<ActualizarAsesoresPrestamos>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'asesores-prestamo',
  templateUrl: 'eliminar-asesores-prestamo.component.html',
  styleUrls: ['./asesores-prestamo.component.css']
})
export class EliminarAsesoresPrestamos {

  constructor(
    public dialogRef: MatDialogRef<EliminarAsesoresPrestamos>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
