import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { EstatusAvaluosService } from 'src/app/services/estatus-avaluos.service';
import { EstatusAvaluos } from 'src/app/models/estatus-avaluos.model';


@Component({
  selector: 'app-estatus-avaluos',
  templateUrl: './estatus-avaluos.component.html',
  styleUrls: ['./estatus-avaluos.component.css'],
  providers: [EstatusAvaluosService]
})
export class EstatusAvaluosComponent implements OnInit {
  public avaluos: EstatusAvaluos[];
  
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public estatusModel: EstatusAvaluos;
  public estatusEditable: EstatusAvaluos;
  public estatusSeleccionado: number[];

  public dataSource2;
  
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _estatusAvaluosService: EstatusAvaluosService) {
    this.limpiarVariables()
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase(); 
  }

  limpiarVariables(){
    this.estatusModel = new EstatusAvaluos(0,0,'','','1',true);
    this.estatusEditable = new EstatusAvaluos(0,0,'','','1',true);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DailogAgregarEstatusAvaluos, {
      width: '500px',
      data: {codigo: this.estatusModel.codigo, descripcion: this.estatusModel.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.estatusModel.codigo = result.codigo;
      this.estatusModel.descripcion = result.descripcion;
      console.table(this.estatusModel);
      this.agregar();
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DailogEditarEstatusAvaluos, {
      width: '500px',
      data: { codigo: this.estatusEditable.codigo, descripcion: this.estatusEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result != undefined) {
        this.estatusEditable.codigo = result.codigo;
        this.estatusEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.estatusEditable);
        this._estatusAvaluosService.actualizarEstatusAvaluos(this.estatusEditable).subscribe(
          response => {
            console.log(response);
            this.listarEstatusAvaluosParaTabla();
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
        this.limpiarVariables()
      }
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DailogEliminarEstatusAvaluos, {
      width: '500px',
      data: {codigo: this.estatusEditable.codigo, descripcion: this.estatusEditable.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.estatusEditable.codigo = result.codigo;
        this.estatusEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.estatusEditable);
        this.eliminar(this.estatusSeleccionado[0]);
        this.limpiarVariables()
      }
    });
  }

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarEstatusAvaluosParaTabla()
  }

  listarEstatusAvaluosParaTabla(){
    this._estatusAvaluosService.listarPagina().subscribe(
      response=>{
        this.avaluos = response.content;
          this.dataSource2 = new MatTableDataSource<EstatusAvaluos>(this.avaluos);
          console.log(this.avaluos);
          this.dataSource2.paginator = this.paginator;   
          this.primeraPagina = response.first;
          this.ultimaPagina = response.last;
          this.listarNumeroPagina = response.numberOfElements;
          this.status = 'ok';
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  setEstatusAvaluos(id){
    if(this.estatusSeleccionado == undefined) return;
    this._estatusAvaluosService.listarEstatusAvaluos(id).subscribe(
      response => {
        if (response.code == 0) {
          this.estatusEditable = response;
          console.log(this.estatusEditable)
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

  agregar(){
    this._estatusAvaluosService.crearEstatusAvaluos(this.estatusModel).subscribe(
      response=>{
        console.log(response);
        this.listarEstatusAvaluosParaTabla()
        if(response.code == 0){
          this.snackBar.open('Agregado exitosamente','',{duration: 3000});
          this.status = 'OK'
        }else{
          this.snackBar.open(response.description,'',{duration: 3000});
        }
      },error=>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          alert(error.description);
          this.status = 'error';
        }
      }
    )
  }

  editar(){    
    this._estatusAvaluosService.actualizarEstatusAvaluos(this.estatusEditable).subscribe(
      response => {
        console.log(response);
        this.listarEstatusAvaluosParaTabla();
        if (response.code == 0) {
          this.status = 'ok';
        } else {
          alert(response.description);
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
    this._estatusAvaluosService.eliminarEstatusAvaluos(id).subscribe(
      response => {
        console.log(response);
        if (response.code == 0) {          
          this.estatusEditable = response;
          console.log(this.estatusEditable)
          this.snackBar.open('Eliminado exitosamente','',{duration: 3000});
          this.status = 'ok';
          this.listarEstatusAvaluosParaTabla();
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

  displayedColumns: string[] = ['select', 'codigo','descripcion'];
  dataSource = new MatTableDataSource<EstatusAvaluos>(this.avaluos);
  selection = new SelectionModel<EstatusAvaluos>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  imprimir() {
    this.estatusSeleccionado = this.selection.selected.map(row => row.codigo);
    console.log(this.estatusSeleccionado[0]);
    if (this.estatusSeleccionado[0]) {
      this.setEstatusAvaluos(this.estatusSeleccionado[0]);
    }
    //    console.table(this.selection.selected)
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EstatusAvaluos): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './agregar-estatus-avaluos.component.html',
  styleUrls: ['./estatus-avaluos.component.css']
})
export class DailogAgregarEstatusAvaluos {

  constructor(
    public dialogRef: MatDialogRef<DailogAgregarEstatusAvaluos>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusAvaluos) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './editar-estatus-avaluos.component.html',
  styleUrls: ['./estatus-avaluos.component.css']
})
export class DailogEditarEstatusAvaluos {

  constructor(
    public dialogRef: MatDialogRef<DailogEditarEstatusAvaluos>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusAvaluos) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './eliminar-estatus-avaluos.component.html',
  styleUrls: ['./estatus-avaluos.component.css']
})
export class DailogEliminarEstatusAvaluos {

  constructor(
    public dialogRef: MatDialogRef<DailogEliminarEstatusAvaluos>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusAvaluos) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}