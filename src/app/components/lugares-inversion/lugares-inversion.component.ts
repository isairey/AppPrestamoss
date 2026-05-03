import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import {LugarInversionService} from 'src/app/services/lugar-inversion.service'
import {LugarInversion} from 'src/app/models/lugarInversion.model'


@Component({
  selector: 'app-lugares-inversion',
  templateUrl: './lugares-inversion.component.html',
  styleUrls: ['./lugares-inversion.component.css'],
  providers: [LugarInversionService]
})
export class LugaresInversionComponent implements OnInit {
  codigo: number;
  descripcion: string;
  equivalencia: string;

  public lugares : LugarInversion[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public lugarModel : LugarInversion;
  public lugarEditable: LugarInversion;
  public lugarSeleccionada:number[];

  public dataSource2;


  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _lugarService: LugarInversionService) { 
    this.limpiarVariables();
  }

  appyFilter(filterValue:string){
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAgregarlugaresInversion, {
      width: '500px',  
      data: {codigo: this.lugarModel.codigo , descripcion: this.lugarModel.descripcion,equivalencia:this.lugarModel.equivalencia }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result !=undefined){
        this.lugarModel.codigo = result.codigo;
        this.lugarModel.descripcion = result.descripcion;
        this.lugarModel.equivalencia = result.equivalencia;
        console.log(result);
        console.table(this.lugarModel);
        this.agregar();
      }
    });
  }

  openDialogEditar(): void {
    const dialogRef = this.dialog.open(DialogActualizarlugaresInversion, {
      width: '500px',     
      data: {codigo: this.lugarEditable.codigo, descripcion: this.lugarEditable.descripcion, equivalencia: this.lugarEditable.equivalencia}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result != undefined){
        this.lugarEditable.codigo = result.codigo;
        this.lugarEditable.descripcion = result.descripcion;
        this.lugarEditable.equivalencia = result.equivalencia;
        console.log(result);
        console.table(this.lugarEditable);
        this.editar();
      }
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DialogEliminarlugaresInversion, {
      width: '500px',     
      data: {codigo: this.lugarEditable.codigo, descripcion: this.lugarEditable.descripcion, equivalencia:this.lugarEditable.equivalencia}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result != undefined){
        this.lugarEditable.codigo = result.codigo;
        this.lugarEditable.descripcion = result.descripcion;
        this.lugarEditable.equivalencia = result.equivalencia;
        console.log(result);
        console.table(this.lugarEditable);
        this.eliminar(this.lugarSeleccionada[0]);
      }
    });
  }
  
  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarLugarInversionParaTabla();
  }

  limpiarVariables(){
    this.lugarEditable = new LugarInversion (0,0,'','','1','',true);
    this.lugarModel = new LugarInversion(0,0,'','','1','',true);
  }

  listarLugarInversionParaTabla(){
    this._lugarService.listarPagina().subscribe(
      response =>{
        if(response.content){
          this.lugares = response.content;
          this.dataSource2 = new MatTableDataSource<LugarInversion>(this.lugares);
          console.log(this.lugares);
          this.dataSource2.paginator = this.paginator;
          this.primeraPagina = response.first;
          this.ultimaPagina = response.last;
          this.cantidadActual = response.numberOfElements;
          this.status = 'ok'
        }
      },
      error=>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

  setLugarInversion(id){
    if(this.lugarSeleccionada == undefined)return;
    this._lugarService.listarLugarInversion(id).subscribe(
      response=>{
        if(response.code ==0){
          this.lugarEditable = response;
          console.log(this.lugarEditable);
          this.status='ok'
        }else{
          this.status='error'
        }
      },
      error=>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  agregar(){
    this._lugarService.crearlugarInversion(this.lugarModel).subscribe(
      response=>{
        console.log(response);
        this.listarLugarInversionParaTabla();
        if(response.code == 0){
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status='ok';
          this.limpiarVariables();
        }else{
          this.snackBar.open(response.description,'',{duration: 3000});
        }
      },
      error=>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.snackBar.open(errorMessage.description,'',{duration: 3000});
          this.status = 'error';
        }
      }
    )
  }

  editar(){
    this._lugarService.actualizarLugarInversion(this.lugarEditable).subscribe(
      response =>{
        console.log(response);
        this.listarLugarInversionParaTabla();
        if(response.code ==0){
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status='ok';
          this.limpiarVariables();
        }else{
          this.snackBar.open(response.description,'',{duration: 3000});
        }
      },
      error=>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.snackBar.open(errorMessage.description,'',{duration: 3000});
          this.status = 'error';
        }
      }
    )
  }

  eliminar(id){
    if(this.lugarSeleccionada == undefined)return;
    this._lugarService.eliminarLugarInversion(id).subscribe(
      response =>{
        if(response.code ==0){
          this.lugarEditable = response;
          console.log(this.lugarEditable);
          this.listarLugarInversionParaTabla();
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status='ok';
          this.limpiarVariables();
        }else{
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status ='error';
        }
      },
      error=>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<LugarInversion>(this.lugares);
  selection = new SelectionModel<LugarInversion>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows; 
  }

  imprimir(){
    this.lugarSeleccionada = this.selection.selected.map(row=> row.codigo);
    console.log(this.lugarSeleccionada[0]);
    if(this.lugarSeleccionada[0]){
      this.setLugarInversion(this.lugarSeleccionada[0]);
    }

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: LugarInversion): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
}

//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 

export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-lugar.component.html',
  styleUrls: ['./lugares-inversion.component.css'],
  providers: [LugarInversionService]
})
export class DialogAgregarlugaresInversion {
public lugar: LugarInversion[];
public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public lugarModel:LugarInversion;
  public lugarEditable: LugarInversion;
  constructor(
    public dialogRef: MatDialogRef<DialogAgregarlugaresInversion>,
    @Inject(MAT_DIALOG_DATA) public data: LugarInversion,
    private _lugarService: LugarInversionService
    ) {
      this.lugarModel = new LugarInversion(0,0,'','','1','',true)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-lugar.component.html',
  styleUrls: ['./lugares-inversion.component.css']
})
export class DialogActualizarlugaresInversion {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarlugaresInversion>,
    @Inject(MAT_DIALOG_DATA) public data: LugarInversion) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-lugar.component.html',
  styleUrls: ['./lugares-inversion.component.css']
})
export class DialogEliminarlugaresInversion {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarlugaresInversion>,
    @Inject(MAT_DIALOG_DATA) public data: LugarInversion) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}