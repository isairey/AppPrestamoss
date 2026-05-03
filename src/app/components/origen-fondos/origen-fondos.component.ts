import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { OrigenFondos } from 'src/app/models/origen-fondos.model';
import { OrigenFondosService } from 'src/app/services/origen-fondos.service';

@Component({
  selector: 'app-origen-fondos',
  templateUrl: './origen-fondos.component.html',
  styleUrls: ['./origen-fondos.component.css'],
  providers:[OrigenFondosService]
})
export class OrigenFondosComponent implements OnInit {
  public almacenadoras: OrigenFondos[];
  
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public almacenadoraModel: OrigenFondos;
  public almacenadoraEditable: OrigenFondos;
  public almacenadoraSeleccionada: number[];

  public dataSource2;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _almacenadoraService: OrigenFondosService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOrigen, {
      width: '500px',
      data: { abreviatura: this.almacenadoraModel.abreviatura, codigo: this.almacenadoraModel.codigo, descripcion: this.almacenadoraModel.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.almacenadoraModel.abreviatura = result.abreviatura;
        this.almacenadoraModel.codigo = result.codigo;
        this.almacenadoraModel.descripcion = result.descripcion;
        console.log(result);
        console.table(this.almacenadoraModel);
        this.agregar();
      }
    });
  }


  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DialogActualizarOrigen, {
      width: '500px',
      data: { codigo: this.almacenadoraEditable.codigo, descripcion: this.almacenadoraEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.almacenadoraEditable.codigo = result.codigo;
        this.almacenadoraEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.almacenadoraEditable);
        this.editar();
      }
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DialogEliminarOrigen, {
      width: '500px',
      data: { codigo: this.almacenadoraEditable.codigo, descripcion: this.almacenadoraEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.almacenadoraEditable.codigo = result.codigo;
        this.almacenadoraEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.almacenadoraEditable);
        this.eliminar(this.almacenadoraSeleccionada[0]);
      }
    });
  }

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarAlmacenadorasParaTabla();
  }

  limpiarVariables() {
    this.almacenadoraEditable = new OrigenFondos('',0, 0,0, '', '',0, '1', true,0,'');
    this.almacenadoraModel = new OrigenFondos('',0, 0,0, '', '',0, '1', true,0,'');
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
    this._almacenadoraService.listarPagina().subscribe(
      response => {
        if (response.content) {
          this.almacenadoras = response.content;
          this.dataSource2 = new MatTableDataSource<OrigenFondos>(this.almacenadoras);
          console.log(this.almacenadoras);
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
    if(this.almacenadoraSeleccionada == undefined) return;
    this._almacenadoraService.listarAlmacenadora(id).subscribe(
      response => {
        if (response.code == 0) {
          this.almacenadoraEditable = response;
          console.log(this.almacenadoraEditable)
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
    this._almacenadoraService.crearAlmacenadora(this.almacenadoraModel).subscribe(
      response => {
        console.log(response)
        this.listarAlmacenadorasParaTabla();
        if (response.code == 0) {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
          this.limpiarVariables()
        } else {          
          this.snackBar.open(response.description,'',{duration: 3000});
          this.limpiarVariables()
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.snackBar.open(errorMessage,'',{duration: 3000});
          this.status = 'error';
        }
      }
    );
  }

  editar() {
    this._almacenadoraService.actualizarAlmacenadora(this.almacenadoraEditable).subscribe(
      response => {
        console.log(response);
        this.listarAlmacenadorasParaTabla();
        if (response.code == 0) {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
          this.limpiarVariables()
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.snackBar.open(errorMessage,'',{duration: 3000});
          this.status = 'error';
        }
      }
    );
  }

  eliminar(id){
    if(this.almacenadoraSeleccionada == undefined) return;
    this._almacenadoraService.eliminarAlmacenadora(id).subscribe(
      response => {
        this.listarAlmacenadorasParaTabla()
        if (response.code == 0) {
          this.almacenadoraEditable = response;
          console.log(this.almacenadoraEditable)
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
          this.limpiarVariables()
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'error';
          this.limpiarVariables()
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
  dataSource = new MatTableDataSource<OrigenFondos>(this.almacenadoras);
  selection = new SelectionModel<OrigenFondos>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  imprimir() {
    this.almacenadoraSeleccionada = this.selection.selected.map(row => row.codigo);
    console.log(this.almacenadoraSeleccionada[0]);
    if (this.almacenadoraSeleccionada[0]) {
      this.setAlmacenadora(this.almacenadoraSeleccionada[0]);
    }
    
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: OrigenFondos): string {
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
  styleUrls: ['./origen-fondos.component.css'],
  providers: [OrigenFondosService]
})
export class DialogOrigen {
  public almacenadoras: OrigenFondos[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public almacenadoraModel: OrigenFondos;
  public almacenadoraEditable: OrigenFondos;
  constructor(
    public dialogRef: MatDialogRef<DialogOrigen>,
    @Inject(MAT_DIALOG_DATA) public data: OrigenFondos,
    private _almacenadoraService: OrigenFondosService) {
    this.almacenadoraModel = new OrigenFondos('',0, 0,0, '', '',0, '1', true,0,'');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-origen.component.html',
  styleUrls: ['./origen-fondos.component.css']
})
export class DialogActualizarOrigen {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarOrigen>,
    @Inject(MAT_DIALOG_DATA) public data: OrigenFondos) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-origen.component.html',
  styleUrls: ['./origen-fondos.component.css']
})
export class DialogEliminarOrigen{

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarOrigen>,
    @Inject(MAT_DIALOG_DATA) public data: OrigenFondos) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}