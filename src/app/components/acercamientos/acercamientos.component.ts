import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';

export interface PeriodicElement {
  description: string;
  number: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number: 1, description: 'Sin Acercamiento'},
  {number: 2, description: 'Sin Acercamiento'},
  {number: 3, description: 'Sin Acercamiento'},
  {number: 4, description: 'Con Acercamiento'},
  {number: 5, description: 'Sin Acercamiento'},
  {number: 6, description: 'Sin Acercamiento'},
  {number: 7, description: 'Con Acercamiento'},
  {number: 8, description: 'Sin Acercamiento'},
  {number: 9, description: 'Con Acercamiento'},
  {number: 10, description: 'Con Acercamiento'},
];

@Component({
  selector: 'app-acercamientos',
  templateUrl: './acercamientos.component.html',
  styleUrls: ['./acercamientos.component.css']
})
export class AcercamientosComponent implements OnInit {


  mode = new FormControl('over');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  animal: string;
  names: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearAcercamiento, {
      width: '300px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogEditar(): void {
    const dialogRef = this.dialog.open(ActualizarAcercamiento, {
      width: '300px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(EliminarAcercamiento, {
      width: '500px',      
      data: {names: this.names, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
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


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


  muestra(id){
    if(id.className=='no'){
    document.getElementById(id).className='si';
    }else{
      document.getElementById(id).className='no';
    }
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
  templateUrl: 'agregar-acercamientos.component.html',
  styleUrls: ['./acercamientos.component.css']
})
export class CrearAcercamiento {

  constructor(
    public dialogRef: MatDialogRef<CrearAcercamiento>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-acercamiento.component.html',
  styleUrls: ['./acercamientos.component.css']
})
export class ActualizarAcercamiento {

  constructor(
    public dialogRef: MatDialogRef<ActualizarAcercamiento>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-acercamiento.component.html',
  styleUrls: ['./acercamientos.component.css']
})
export class EliminarAcercamiento {

  constructor(
    public dialogRef: MatDialogRef<EliminarAcercamiento>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

