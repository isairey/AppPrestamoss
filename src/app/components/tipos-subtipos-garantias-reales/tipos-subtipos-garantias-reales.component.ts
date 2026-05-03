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
export interface DialogData3 {
  animal: string;
  name: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'INGRESOS INSTITUCIONES'},
];
@Component({
  selector: 'app-tipos-subtipos-garantias-reales',
  templateUrl: './tipos-subtipos-garantias-reales.component.html',
  styleUrls: ['./tipos-subtipos-garantias-reales.component.css']
})
export class TiposSubtiposGarantiasRealesComponent implements OnInit {
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTiposSubtiposAgregar, { 
      width: '500px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(DialogTiposSubtiposAgregarCheck, {
      width: '900px',
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
  templateUrl: 'tiposSubtiposAgregar.html',
  styleUrls: ['./tipos-subtipos-garantias-reales.component.css']
})
export class DialogTiposSubtiposAgregar {

  constructor(
    public dialogRef: MatDialogRef<DialogTiposSubtiposAgregar>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: 'tipos-subtipos-check.html',
  styleUrls: ['./tipos-subtipos-garantias-reales.component.css']
})
export class DialogTiposSubtiposAgregarCheck {
  animal: string;
  name: string;
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
 
  constructor(public dialog: MatDialog) {}
  openDialog3(): void {
    const dialogRef = this.dialog.open(TiposSubtiposGarantiasCheckAgregar, {
      width: '500px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

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
  // constructor(
  //   public dialogRef: MatDialogRef<DialogTiposSubtiposAgregarCheck>,
  //   @Inject(MAT_DIALOG_DATA) public data: DialogData2) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'TiposSubtiposGarantiasCheckAgregar.html',
  styleUrls: ['./tipos-subtipos-garantias-reales.component.css']
})
export class TiposSubtiposGarantiasCheckAgregar {

  constructor(
    public dialogRef: MatDialogRef<TiposSubtiposGarantiasCheckAgregar>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
