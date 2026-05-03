import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormasPago } from 'src/app/models/formas-pago.model';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { FormasPagoService } from 'src/app/services/formas-pago.service';

@Component({
  selector: 'app-formas-pago',
  templateUrl: './formas-pago.component.html',
  styleUrls: ['./formas-pago.component.css'],
  providers:[FormasPagoService]
})
export class FormasPagoComponent implements OnInit {
  public formasdepago: FormasPago[];
  
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public formasModel: FormasPago;
  public formasEditable: FormasPago;
  public formasSeleccionada: number[];

  public dataSource2;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _formasService: FormasPagoService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormas, {
      width: '500px',
      data: { codigo: this.formasModel.codigo, descripcion: this.formasModel.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.formasModel.codigo = result.codigo;
        this.formasModel.descripcion = result.descripcion;
        console.log(result);
        console.table(this.formasModel);
        this.agregar();
        this.limpiarVariables()
      }
    });
  }


  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DialogActualizarFormas, {
      width: '500px',
      data: { codigo: this.formasEditable.codigo, descripcion: this.formasEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.formasEditable.codigo = result.codigo;
        this.formasEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.formasEditable);
        this.editar();
        this.limpiarVariables()
      }
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DialogEliminarFormas, {
      width: '500px',
      data: { codigo: this.formasEditable.codigo, descripcion: this.formasEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.formasEditable.codigo = result.codigo;
        this.formasEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.formasEditable);
        this.eliminar(this.formasSeleccionada[0]);
        this.limpiarVariables()
      }
    });
  }

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarAlmacenadorasParaTabla();
  }

  limpiarVariables() {
    this.formasEditable = new FormasPago(0, 0, '', '', '1', true);
    this.formasModel = new FormasPago(0, 0, '', '', '1', true);
  }

  siguientePagina(){
    if(!this.ultimaPagina){
      ++this.listarNumeroPagina;
      this.listarAlmacenadorasParaTabla()
    }
  }

  anteriorPagina(){
    if(!this.primeraPagina){
      --this.listarNumeroPagina;
      this.listarAlmacenadorasParaTabla()
    }
  }

  listarAlmacenadorasParaTabla() {
    this._formasService.listarPagina().subscribe(
      response => {
        if (response.content) {
          this.formasdepago = response.content;
          this.dataSource2 = new MatTableDataSource<FormasPago>(this.formasdepago);
          console.log(this.formasdepago);
          this.dataSource2.paginator = this.paginator;   
          this.primeraPagina = response.first;
          this.ultimaPagina = response.last;
          this.listarNumeroPagina = response.numberOfElements;
          this.status = 'ok';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  setAlmacenadora(id) {
    if(this.formasSeleccionada == undefined) return;
    this._formasService.listarFormasPago(id).subscribe(
      response => {
        if (response.code == 0) {
          this.formasEditable = response;
          console.log(this.formasEditable)
          this.status = 'ok';
        } else {
          this.status = 'error';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  agregar() {
    this._formasService.crearFormasPago(this.formasModel).subscribe(
      response => {
        console.log(response)
        this.listarAlmacenadorasParaTabla();
        if (response.code == 0) {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          alert(error.description);
          this.status = 'error';
        }
      }
    );
  }

  editar() {
    this._formasService.actualizarFormasPago(this.formasEditable).subscribe(
      response => {
        console.log(response);
        this.listarAlmacenadorasParaTabla();
        if (response.code == 0) {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          alert(error.description);
          this.status = 'error';
        }
      }
    );
  }

  eliminar(id){
    if(this.formasSeleccionada == undefined) return;
    this._formasService.eliminarFormasPago(id).subscribe(
      response => {
        if (response.code == 0) {
          this.formasEditable = response;
          this.listarAlmacenadorasParaTabla()
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'error';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  
  }

  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<FormasPago>(this.formasdepago);
  selection = new SelectionModel<FormasPago>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  imprimir() {
    this.formasSeleccionada = this.selection.selected.map(row => row.codigo);
    console.log(this.formasSeleccionada[0]);
    if (this.formasSeleccionada[0]) {
      this.setAlmacenadora(this.formasSeleccionada[0]);
    }
    
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FormasPago): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
}

//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./formas-pago.component.css'],
  providers: [FormasPagoService]
})
export class DialogFormas {
  public almacenadoras: FormasPago[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public almacenadoraModel: FormasPago;
  public almacenadoraEditable: FormasPago;
  constructor(
    public dialogRef: MatDialogRef<DialogFormas>,
    @Inject(MAT_DIALOG_DATA) public data: FormasPago,
    private _almacenadoraService: FormasPagoService) {
    this.almacenadoraModel = new FormasPago(0, 0, '', '', '1', true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-forma.component.html',
  styleUrls: ['./formas-pago.component.css']
})
export class DialogActualizarFormas {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarFormas>,
    @Inject(MAT_DIALOG_DATA) public data: FormasPago) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-forma.component.html',
  styleUrls: ['./formas-pago.component.css']
})
export class DialogEliminarFormas{

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarFormas>,
    @Inject(MAT_DIALOG_DATA) public data: FormasPago) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}