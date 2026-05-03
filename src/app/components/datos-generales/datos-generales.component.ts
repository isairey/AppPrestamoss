import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDatepickerModule} from '@angular/material';


@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.html',
  styleUrls: ['./datos-generales.css']
})
export class DatosGeneralesComponet implements OnInit {
    animal: string;
    names: string;
  
    constructor(public dialog: MatDialog) { }
    openDialog(): void {
      const dialogRef = this.dialog.open(DialogG, {
        width: '500px',      
        data: {names: this.names, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

    openDialog2(): void {
      const dialogRef = this.dialog.open(DialogE, {
        width: '500px',      
        data: {names: this.names, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

    openDialog3(): void {
      const dialogRef = this.dialog.open(DialogN, {
        width: '500px',      
        data: {names: this.names, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

    openDialog4(): void {
      const dialogRef = this.dialog.open(DialogA, {
        width: '500px',      
        data: {names: this.names, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
  ngOnInit() {
  }

}
//------------------------------------------------------------------
export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-datos-generales.component.html',
  styleUrls: ['./datos-generales.css']
})
export class DialogG {

  constructor(
    public dialogRef: MatDialogRef<DialogG>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

//---------------------------------
export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-datos-generales-B.component.html',
  styleUrls: ['./datos-generales.css']
})
export class DialogE {

  constructor(
    public dialogRef: MatDialogRef<DialogG>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

//****************************************************************************** */
export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-datos-generales.component.1.html',
  styleUrls: ['./datos-generales.css']
})
export class DialogN {

  constructor(
    public dialogRef: MatDialogRef<DialogN>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

//---------------------------------------------------------

export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-datos-generales.component.2.html',
  styleUrls: ['./datos-generales.css']
})
export class DialogA {

  constructor(
    public dialogRef: MatDialogRef<DialogA>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
