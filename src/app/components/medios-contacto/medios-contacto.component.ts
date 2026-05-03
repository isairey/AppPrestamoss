import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import {MedioContacto} from 'src/app/models/medioContacto.model'
import {MediosContactoService} from 'src/app/services/medios-contacto.service'  


@Component({
  selector: 'app-medios-contacto',
  templateUrl: './medios-contacto.component.html',
  styleUrls: ['./medios-contacto.component.css'],
  providers: [MediosContactoService]
})
export class MediosContactoComponent implements OnInit {

  public medios: MedioContacto[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public medioModel: MedioContacto;
  public medioEditable: MedioContacto;
  public medioSeleccionado: number[];

  public dataSource2;

  

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _medioService:MediosContactoService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContacto, {
      width: '400px',
      data: {codigo: this.medioModel.codigo, descripcion: this.medioModel.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result !=undefined){
        this.medioModel.codigo = result.codigo;
        this.medioModel.descripcion = result.descripcion;
        console.log(result);
        console.table(this.medioModel);
        this.agregar();
      }
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DialogActualizarMedio, {
      width: '400px',
      data: { codigo: this.medioEditable.codigo, descripcion: this.medioEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
         this.medioEditable.codigo = result.codigo;
         this.medioEditable.descripcion = result.descripcion;
        console.log(result);
         console.table(this.medioEditable);
         this.editar();
      }
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DialogEliminarContacto, {
      width: '500px',
      data: {codigo: this.medioEditable.codigo, descripcion: this.medioEditable.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result !=undefined){
        this.medioEditable.codigo = result.codigo;
         this.medioEditable.descripcion = result.descripcion;
         console.log(result);
         console.table(this.medioEditable);
         this.eliminar(this.medioSeleccionado[0]);
      }
    });
  }


  @ViewChild (MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.listarMedioContactoParaTabla();
  }

  limpiarVariables(){
    this.medioEditable = new MedioContacto (0,0,'','','1',true);
    this.medioModel = new MedioContacto (0,0,'','','1',true)
  }

  listarMedioContactoParaTabla(){
    this._medioService.listarPagina().subscribe(
      response=>{
        if(response.content){
          this.medios = response.content;
          this.dataSource2 = new MatTableDataSource<MedioContacto>(this.medios);
          console.log(this.medios);
          this.dataSource2.paginator = this.paginator;
          this.primeraPagina = response.first;
          this.ultimaPagina = response.last;
          this.cantidadActual = response.numberOfElements;
          this.status='ok'
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

  setMediosContacto(id){
    if(this.medioSeleccionado==undefined)return;
    this._medioService.listarMedioContacto(id).subscribe(
      response=>{
        if(response.code ==0){
          this.medioEditable= response;
          console.log(this.medioEditable);
          this.status= 'error';
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
    this._medioService.crearMedioContacto(this.medioModel).subscribe(
      response=>{
        console.log(response);
        this.listarMedioContactoParaTabla();
        if(response.code ==0){
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
          this.limpiarVariables()
        }else{
          this.snackBar.open(response.description,'',{duration: 3000});
        }
      },
      error=>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.snackBar.open(errorMessage,'',{duration: 3000});
          this.status = 'error';
        }
      }
    )
  }

  editar(){
    this._medioService.actualizarMedioContacto(this.medioEditable).subscribe(
      response=>{
        console.log(response);
        this.listarMedioContactoParaTabla();
        if(response.code ==0){
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status='ok';
          this.limpiarVariables()
        }else{
          this.snackBar.open(response.description,'',{duration: 3000});
        }
      },
      error=>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.snackBar.open(errorMessage,'',{duration: 3000});
          this.status = 'error';
        }
      }
    )
  }

  eliminar(id){
    if(this.medioSeleccionado==undefined)return;
    this._medioService.eliminarMedioContacto(id).subscribe(
      response=>{
        if(response.code==0){
          this.medioEditable= response;
          console.log(this.medioEditable);
          this.listarMedioContactoParaTabla();
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status='ok';
          this.limpiarVariables()
        }else{
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status ='error';
        }
      },
      error=>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.snackBar.open(errorMessage,'',{duration: 3000});
          this.status = 'error';
        }
      }
    )
  }

  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<MedioContacto>(this.medios);
  selection = new SelectionModel<MedioContacto>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows; 
  }

  imprimir(){
    this.medioSeleccionado = this.selection.selected.map(row=> row.codigo);
    console.log(this.medioSeleccionado[0]);
    if(this.medioSeleccionado[0]){
      this.setMediosContacto(this.medioSeleccionado[0]);
    }
    
  
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MedioContacto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

}




@Component({
  selector: 'Dialog-Contacto',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./medios-contacto.component.css'],
  providers : [MediosContactoService]
})
export class DialogContacto {
  public medios:MedioContacto[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public medioModel: MedioContacto;
  public medioEditable: MedioContacto;

  constructor(
    public dialogRef: MatDialogRef<DialogContacto>,
    @Inject(MAT_DIALOG_DATA) public data: MedioContacto,
    private _medioService: MediosContactoService) {
      this.medioModel = new MedioContacto(0,0,'','','1',true);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'Dialog-Contacto',
  templateUrl: 'Dialog-eliminar-medios-coontacto.component.html',
  styleUrls: ['./medios-contacto.component.css']

})
export class DialogEliminarContacto {
  

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarContacto>,
    @Inject(MAT_DIALOG_DATA) public data: MedioContacto) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'Dialog-Contacto',
  templateUrl: 'actualizar-Medios.component.html',
  styleUrls: ['./medios-contacto.component.css']
})
export class DialogActualizarMedio {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarMedio>,
    @Inject(MAT_DIALOG_DATA) public data: MedioContacto) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}