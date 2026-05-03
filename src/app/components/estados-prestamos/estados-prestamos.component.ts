import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  codigo: number;
  descripcion: string;
}

export interface subEstado{
  Subcodigo: number;
  Subdescripcion: string;
}

export interface criterioTraslado{
  correlativo: number;
  campo: string,
  descripcionCampo: string;
}

export interface PeriodicElement {
  codigo: number;
  descripcion: string;
}

export interface trasladoestadoPrestamo{
  codigoEstado: number;
  Subcodigo: number;
  descripcion: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, descripcion: 'estado 1'},
  {codigo: 2, descripcion: 'estado 2'},
  {codigo: 3, descripcion: 'estado 3'},
  {codigo: 4, descripcion: 'estado 4'},
  {codigo: 5, descripcion: 'estado 5'},
];

const DatosSubEstado: subEstado[] = [
  {Subcodigo: 1, Subdescripcion: 'estado 1'},
  {Subcodigo: 2, Subdescripcion: 'estado 2'},
  {Subcodigo: 3, Subdescripcion: 'estado 3'},
  {Subcodigo: 4, Subdescripcion: 'estado 4'},
  {Subcodigo: 5, Subdescripcion: 'estado 5'},
];

const DatosTrasladoEstado: trasladoestadoPrestamo[] = [
  {codigoEstado: 1, Subcodigo: 1,descripcion: 'estado 1'},
  {codigoEstado: 2, Subcodigo: 1,descripcion: 'estado 2'},
  {codigoEstado: 3, Subcodigo: 1,descripcion: 'estado 3'},
  {codigoEstado: 4, Subcodigo: 1,descripcion: 'estado 4'},
  {codigoEstado: 5, Subcodigo: 1,descripcion: 'estado 5'},
];

const DatosCriterio: criterioTraslado[] = [
  {correlativo: 1, campo:'CACAVI', descripcionCampo: 'Saldo de capital'},
  {correlativo: 2, campo:'CADIMC', descripcionCampo: 'Dias de ataso de capital'},
  {correlativo: 3, campo:'CADIMI', descripcionCampo: 'Dias de atraso de interes'},
  {correlativo: 4, campo:'CAVGAR', descripcionCampo: 'Valor de la Garantia'},
  {correlativo: 5, campo:'MONCOL', descripcionCampo: 'Monto colocacion'},
];

@Component({
  selector: 'app-estados-prestamos',
  templateUrl: './estados-prestamos.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class EstadosPrestamosComponent implements OnInit {
  codigo: number;
  descripcion: string;

  constructor(public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DailogAgregarEstadoPrestamo, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }
  
  openDialogEditar(): void {
    const dialogRef = this.dialog.open(DailogActualizarEstadoPrestamo, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }
  
  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DailogEliminarEstadoPrestamo, {
      width: '500px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogSelect(): void {
    const dialogRef = this.dialog.open(DailogSubEstadoPrestamo, {
      width: '1000px',      
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
  templateUrl: './agregar-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogAgregarEstadoPrestamo {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './actualizar-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogActualizarEstadoPrestamo {

  constructor(
    public dialogRef: MatDialogRef<DailogActualizarEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogEliminarEstadoPrestamo {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

/*---------------------------------------------------------------------------
-------------------------- SUB ESTADO ---------------------------------------
-----------------------------------------------------------------------------*/

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './sub-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogSubEstadoPrestamo {
  Subcodigo: number;
  Subdescripcion: string;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DailogSubEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogAddSub(): void {
    const dialogRef = this.dialog.open(DailogAgregarSubEstadoPrestamo, {
      width: '500px',      
      data: {codigo: this.Subcodigo, descripcion: this.Subdescripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Subdescripcion = result;
    });
  }

  openDialogEditarSub(): void {
    const dialogRef = this.dialog.open(DailogActualizarSubEstadoPrestamo, {
      width: '500px',      
      data: {codigo: this.Subcodigo, descripcion: this.Subdescripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Subdescripcion = result;
    });
  }

  openDialogEliminarSub(): void {
    const dialogRef = this.dialog.open(DailogEliminarSubEstadoPrestamo, {
      width: '500px',      
      data: {codigo: this.Subcodigo, descripcion: this.Subdescripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Subdescripcion = result;
    });
  }

  openDialogSelectSub(): void {
    const dialogRef = this.dialog.open(DailogTrasladoEstadoPrestamo, {
      width: '900px',      
      data: {codigo: this.Subcodigo, descripcion: this.Subdescripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Subdescripcion = result;
    });
  }


    onNoClick(): void {
      this.dialogRef.close();
    }

    displayedColumns: string[] = ['select', 'Subcodigo','Subdescripcion'];
  dataSource = new MatTableDataSource<subEstado>(DatosSubEstado);
  selection = new SelectionModel<subEstado>(true, []);

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
  checkboxLabel(row?: subEstado): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Subcodigo + 1}`;
  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './agregar-sub-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogAgregarSubEstadoPrestamo {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarSubEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './actualizar-sub-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogActualizarSubEstadoPrestamo {

  constructor(
    public dialogRef: MatDialogRef<DailogActualizarSubEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-sub-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogEliminarSubEstadoPrestamo {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarSubEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

/*-------------------------------------------------------------------
------------------------ Traslado Estado Prestamo -------------------
---------------------------------------------------------------------*/

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './traslado-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogTrasladoEstadoPrestamo {
  codigoEstado: number;
  Subcodigo: number;
  descripcion: string;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DailogTrasladoEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogAddTraslado(): void {
    const dialogRef = this.dialog.open(DailogAgregarTrasladoEstadoPrestamo, {
      width: '500px',      
      data: {codigoEstado: this.codigoEstado,Subcodigo: this.Subcodigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogEditarTraslado(): void {
    const dialogRef = this.dialog.open(DailogActualizarTrasladoEstadoPrestamo, {
      width: '500px',      
      data: {codigoEstado: this.codigoEstado,Subcodigo: this.Subcodigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogEliminarTraslado(): void {
    const dialogRef = this.dialog.open(DailogEliminarTrasladoEstadoPrestamo, {
      width: '500px',      
      data: {codigoEstado: this.codigoEstado,Subcodigo: this.Subcodigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogCriterio(): void {
    const dialogRef = this.dialog.open(DailogCriteriosTraslado, {
      width: '800px',      
      data: {codigoEstado: this.codigoEstado,Subcodigo: this.Subcodigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    displayedColumns: string[] = ['select', 'codigoEstado','Subcodigo','descripcion'];
  dataSource = new MatTableDataSource<trasladoestadoPrestamo>(DatosTrasladoEstado);
  selection = new SelectionModel<trasladoestadoPrestamo>(true, []);

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
  checkboxLabel(row?: trasladoestadoPrestamo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigoEstado + 1}`;
  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './agregar-traslado-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogAgregarTrasladoEstadoPrestamo {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarTrasladoEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './actualizar-traslado-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogActualizarTrasladoEstadoPrestamo {

  constructor(
    public dialogRef: MatDialogRef<DailogActualizarTrasladoEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-traslado-estado-prestamo.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogEliminarTrasladoEstadoPrestamo {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarTrasladoEstadoPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

/*-------------------------------------------------------------------
------------------------ Criterio De Traslado -----------------------
---------------------------------------------------------------------*/

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './criterios-traslado.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogCriteriosTraslado {
  correlativo: number;
  campo: string;
  descripcionCampo: string;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DailogCriteriosTraslado>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogAddCriterio(): void {
    const dialogRef = this.dialog.open(DailogAgregarCriterio, {
      width: '500px',      
      data: {correlativo: this.correlativo,campo: this.campo, descripcionCampo: this.descripcionCampo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.campo = result;
    });
  }

  openDialogEditarCriterio(): void {
    const dialogRef = this.dialog.open(DailogActualizarCriterio, {
      width: '500px',      
      data: {correlativo: this.correlativo,campo: this.campo, descripcionCampo: this.descripcionCampo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.campo = result;
    });
  }

  openDialogEliminarCriterio(): void {
    const dialogRef = this.dialog.open(DailogEliminarCriterio, {
      width: '500px',      
      data: {correlativo: this.correlativo,campo: this.campo, descripcionCampo: this.descripcionCampo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.campo = result;
    });
  }

  

    onNoClick(): void {
      this.dialogRef.close();
    }

    displayedColumns: string[] = ['select', 'correlativo','campo','descripcionCampo'];
  dataSource = new MatTableDataSource<criterioTraslado>(DatosCriterio);
  selection = new SelectionModel<criterioTraslado>(true, []);

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
  checkboxLabel(row?: criterioTraslado): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.correlativo + 1}`;
  }


}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './agregar-criterio-traslado.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogAgregarCriterio {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarCriterio>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './actualizar-criterio-traslado.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogActualizarCriterio {

  constructor(
    public dialogRef: MatDialogRef<DailogActualizarCriterio>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-criterio-traslado.component.html',
  styleUrls: ['./estados-prestamos.component.css']
})
export class DailogEliminarCriterio {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarCriterio>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}