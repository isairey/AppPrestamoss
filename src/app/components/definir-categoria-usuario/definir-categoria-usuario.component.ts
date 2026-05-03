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
  {codigo: 1, descripcion: 'Gerente'},
  {codigo: 2, descripcion: 'Jefe'},
  {codigo: 3, descripcion: 'Acesor'},
  {codigo: 4, descripcion: 'Prueba'},
  {codigo: 5, descripcion: 'Oficial'},
];

@Component({
  selector: 'app-definir-categoria-usuario',
  templateUrl: './definir-categoria-usuario.component.html',
  styleUrls: ['./definir-categoria-usuario.component.css']
})
export class DefinirCategoriaUsuarioComponent implements OnInit {
  codigo: number;
  descripcion: string;

  constructor(public dialog: MatDialog) {}

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DailogAgregarCategoriaUsuario, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.codigo = result;
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DailogEliminarCategoriaUsuario, {
      width: '400px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.codigo = result;
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DailogEditarCategoriaUsuario, {
      width: '400px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.codigo = result;
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
  templateUrl: './agregar-categoria-usuario.component.html',
  styleUrls: ['./definir-categoria-usuario.component.css']
})

export class DailogAgregarCategoriaUsuario {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarCategoriaUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-categoria-usuario.component.html',
  styleUrls: ['./definir-categoria-usuario.component.css']
})

export class DailogEliminarCategoriaUsuario {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarCategoriaUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './editar-categoria-usuario.component.html',
  styleUrls: ['./definir-categoria-usuario.component.css']
})

export class DailogEditarCategoriaUsuario {

  constructor(
    public dialogRef: MatDialogRef<DailogEditarCategoriaUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}