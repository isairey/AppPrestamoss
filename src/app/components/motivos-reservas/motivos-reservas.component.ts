import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface MotivosReserva{
  codigo: number;
  descripcion: string;
  cargoAutomatico: string;
}

const ELEMENT_DATA: MotivosReserva[] = [
  {codigo: 1, descripcion: 'Cheque rechazado por falta de fondos', cargoAutomatico: 'N'},
  {codigo: 2, descripcion: 'Pago incorrecto por el cliente', cargoAutomatico: 'N'},
  {codigo: 3, descripcion: 'Cheque rechazado por firma incorrecta', cargoAutomatico: 'N'},  
];

@Component({
  selector: 'app-motivos-reservas',
  templateUrl: './motivos-reservas.component.html',
  styleUrls: ['./motivos-reservas.component.css']
})
export class MotivosReservasComponent implements OnInit {
  codigo: number;
  descripcion: string;
  cargoAutomatico: string;
  moneda: string;
  valor: number;

  constructor(public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DailogAgregarMotivosReservasComponent, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion, cargoAutomatico: this.cargoAutomatico}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogEditar(): void {
    const dialogRef = this.dialog.open(DailogActualizarMotivosReservasComponent, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion, cargoAutomatico: this.cargoAutomatico}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DailogEliminarMotivosReservasComponent, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion, cargoAutomatico: this.cargoAutomatico}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogSelect(): void {
    const dialogRef = this.dialog.open(DailogValorCobroComponent, {
      width: '500px',      
      data: {moneda: this.moneda, valor: this.valor}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'codigo','descripcion', 'cargoAutomatico'];
  dataSource = new MatTableDataSource<MotivosReserva>(ELEMENT_DATA);
  selection = new SelectionModel<MotivosReserva>(true, []);

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
  checkboxLabel(row?: MotivosReserva): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

}

export interface AgrearDailogData{
  codigo: number;
  descripcion: string;
  cargoAutomatico: string;
}

export interface AgrearCobroDailogData{
  moneda: string;
  valor: number;
}

@Component({
  selector: 'app-motivos-reservas',
  templateUrl: './agregar-motivos-reservas.component.html',
  styleUrls: ['./motivos-reservas.component.css']
})
export class DailogAgregarMotivosReservasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarMotivosReservasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgrearDailogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-motivos-reservas',
  templateUrl: './actualizar-motivos-reservas.component.html',
  styleUrls: ['./motivos-reservas.component.css']
})
export class DailogActualizarMotivosReservasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DailogActualizarMotivosReservasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgrearDailogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-motivos-reservas',
  templateUrl: './eliminar-motivos-reservas.component.html',
  styleUrls: ['./motivos-reservas.component.css']
})
export class DailogEliminarMotivosReservasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarMotivosReservasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgrearDailogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-motivos-reservas',
  templateUrl: './valor-cobro.component.html',
  styleUrls: ['./motivos-reservas.component.css']
})
export class DailogValorCobroComponent implements OnInit {
  moneda: string;
  valor: number;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DailogValorCobroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgrearCobroDailogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    openDialogAddCobro(): void {
      const dialogRef = this.dialog.open(DailogAgregarValorCobroComponent, {
        width: '500px',
        data: {codigo: this.moneda, descripcion: this.valor}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.moneda = result;
      });
    }

    openDialogEliminarCobro(): void {
      const dialogRef = this.dialog.open(DailogEliminarValorCobroComponent, {
        width: '500px',
        data: {codigo: this.moneda, descripcion: this.valor}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.moneda = result;
      });
    }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-motivos-reservas',
  templateUrl: './agregar-valor-cobro.component.html',
  styleUrls: ['./motivos-reservas.component.css']
})
export class DailogAgregarValorCobroComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarValorCobroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgrearCobroDailogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-motivos-reservas',
  templateUrl: './eliminar-valor-cobro.component.html',
  styleUrls: ['./motivos-reservas.component.css']
})
export class DailogEliminarValorCobroComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarValorCobroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgrearCobroDailogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }
}