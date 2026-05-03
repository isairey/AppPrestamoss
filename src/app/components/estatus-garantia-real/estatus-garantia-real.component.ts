import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { EstatusGarantiaReal } from 'src/app/models/estatus-garantia-real.model';
import { EstatusGarantiaRealService } from 'src/app/services/estatus-garantia-real.service';


@Component({
  selector: 'app-estatus-garantia-real',
  templateUrl: './estatus-garantia-real.component.html',
  styleUrls: ['./estatus-garantia-real.component.css'],
  providers: [EstatusGarantiaRealService]
})
export class EstatusGarantiaRealComponent implements OnInit {
  public estatusGarantias: EstatusGarantiaReal[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 7;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public estatusGarantiaModel: EstatusGarantiaReal;
  public estatusGarantiaEditable: EstatusGarantiaReal;
  public estatusSeleccionado: string[];
  public dataSource2;

  constructor(public dialog: MatDialog,  public snackBar: MatSnackBar,private _estatusGarantia: EstatusGarantiaRealService) {
    this.limpiarVariables()
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase(); 
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DailogAgregarEstatusGarantiaReal, {
      width: '500px',
      data: {codigo: this.estatusGarantiaModel.codigo, descripcion: this.estatusGarantiaModel.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.estatusGarantiaModel.codigo = result.codigo
      this.estatusGarantiaModel.descripcion = result.descripcion;
      this.agregar(); 
      this.limpiarVariables();
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DailogEditarEstatusGarantiaReal, {
      width: '500px',
      data: {codigo: this.estatusGarantiaEditable.codigo, descripcion: this.estatusGarantiaEditable.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.estatusGarantiaEditable.codigo = result.codigo
        this.estatusGarantiaEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.estatusGarantiaEditable);
        this.editar();
        this.limpiarVariables();
      }      
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DailogEliminarEstatusGarantiaReal, {
      width: '500px',
      data: {codigo: this.estatusGarantiaEditable.codigo, descripcion: this.estatusGarantiaEditable.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
      if (result != undefined) {
        this.estatusGarantiaEditable.codigo = result.codigo
        this.estatusGarantiaEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.estatusGarantiaEditable);
        this.eliminar(this.estatusSeleccionado[0]);
        this.limpiarVariables();
      }
    });
  }

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarGarantiasRealesParaTabla()
  }

  limpiarVariables(){
    this.estatusGarantiaModel = new EstatusGarantiaReal(0,'','','',true),
    this.estatusGarantiaEditable = new EstatusGarantiaReal(0,'','','',true)
  }

  listarGarantiasRealesParaTabla(){
    this._estatusGarantia.listarPagina().subscribe(
      response => {
        if (response.content) {
          this.estatusGarantias = response.content;
          this.dataSource2 = new MatTableDataSource<EstatusGarantiaReal>(this.estatusGarantias);
          console.log(this.estatusGarantias);
          this.dataSource2.paginator = this.paginator;   
          this.primeraPagina = response.first;
          this.ultimaPagina = response.last;
          this.cantidadActual = response.numberOfElements;
          this.status = 'ok';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          alert(error.description)
          this.status = 'error';
        }
      }
    );
  }

  setEstatusGarantia(id){
    if(this.estatusSeleccionado == undefined) return;
    this._estatusGarantia.listarEstatusGarantia(id).subscribe(
      response => {
        if (response.code == 0) {
          this.estatusGarantiaEditable = response;
          console.log(this.estatusGarantiaEditable)
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
    this._estatusGarantia.crearEstatusGarantia(this.estatusGarantiaModel).subscribe(
      response => {
        console.log(response)
        this.listarGarantiasRealesParaTabla();
        if (response.code == 0) {
          this.snackBar.open('Agregado exitosamente','',{duration: 3000});
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

  editar(){
    this._estatusGarantia.actualizarEstatusGarantia(this.estatusGarantiaEditable).subscribe(
      response => {
        console.log(response);
        this.listarGarantiasRealesParaTabla();
        if (response.code == 0) {
          this.snackBar.open('Actualizado exitosamente','',{duration: 3000});
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
    if(this.estatusSeleccionado == undefined) return;
    this._estatusGarantia.eliminarEstatusGarantia(id).subscribe(
      response => {
        console.log(response);
        this.listarGarantiasRealesParaTabla()
        if (response.code == 0) {          
          this.estatusGarantiaEditable = response;
          console.log(this.estatusGarantiaEditable)
          this.snackBar.open('Eliminado exitosamente','',{duration: 3000});
          this.status = 'ok';
          this.listarGarantiasRealesParaTabla();
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

  displayedColumns: string[] = ['select','codigo', 'descripcion'];
  dataSource = new MatTableDataSource<EstatusGarantiaReal>(this.estatusGarantias);
  selection = new SelectionModel<EstatusGarantiaReal>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /*Selecciona un dato*/
  imprimir() {
    this.estatusSeleccionado = this.selection.selected.map(row => row.codigo);
    console.log(this.estatusSeleccionado[0]);
    if (this.estatusSeleccionado[0]) {
      this.setEstatusGarantia(this.estatusSeleccionado[0]);
    }
    //    console.table(this.selection.selected)
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EstatusGarantiaReal): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './agregar-estado-garantia-real.component.html',
  styleUrls: ['./estatus-garantia-real.component.css']
})
export class DailogAgregarEstatusGarantiaReal {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarEstatusGarantiaReal>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusGarantiaReal) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './editar-estado-garantia-real.component.html',
  styleUrls: ['./estatus-garantia-real.component.css']
})
export class DailogEditarEstatusGarantiaReal {

  constructor(
    public dialogRef: MatDialogRef<DailogEditarEstatusGarantiaReal>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusGarantiaReal) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-estado-garantia-real.component.html',
  styleUrls: ['./estatus-garantia-real.component.css']
})
export class DailogEliminarEstatusGarantiaReal {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarEstatusGarantiaReal>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusGarantiaReal) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}