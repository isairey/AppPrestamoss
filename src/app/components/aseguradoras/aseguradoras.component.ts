import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { Aseguradora } from 'src/app/models/aseguradora.model'
import { AseguradoraService } from 'src/app/services/aseguradora.service'
import { from } from 'rxjs';


@Component({
  selector: 'app-aseguradoras',
  templateUrl: './aseguradoras.component.html',
  styleUrls: ['./aseguradoras.component.css'],
  providers: [AseguradoraService]
})

export class AseguradorasComponent implements OnInit {
  public aseguradoras: Aseguradora[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public aseguradoraModel: Aseguradora;
  public aseguradoraEditable: Aseguradora;
  public aseguradoraSeleccionada: number[];

  public dataSource2;


  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _aseguradoraService: AseguradoraService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAseg, {
      width: '500px',
      data: { codigo: this.aseguradoraModel.codigo, descripcion: this.aseguradoraModel.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        console.log(result);
        this.aseguradoraModel.codigo = result.codigo;
        this.aseguradoraModel.descripcion = result.descripcion;
        console.table(this.aseguradoraModel);
        this.agregar();
        this.limpiarVariables();
      }
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DialogActualizarAseg, {
      width: '500px',
      data: { codigo: this.aseguradoraEditable.codigo, descripcion: this.aseguradoraEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.aseguradoraEditable.codigo = result.codigo;
        this.aseguradoraEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.aseguradoraEditable);
        this.editar();
        this.limpiarVariables();
      }
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DialogEliminarAseg, {
      width:'510px',
      data: {codigo:this.aseguradoraEditable.codigo, descripcion:this.aseguradoraEditable.descripcion}
    })

    dialogRef.afterClosed().subscribe(result =>{
      console.log('the dialog was closed');
      if(result !=undefined){
        this.aseguradoraEditable.codigo = result.codigo;
        this.aseguradoraEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.aseguradoraEditable);
        this.eliminar(this.aseguradoraSeleccionada[0]);       
        this.limpiarVariables();        
      }
    });
  }

  @ViewChild (MatPaginator) paginator: MatPaginator;
  
  ngOnInit() {
    this.listarAseguradoraParaTabla();
  }

  limpiarVariables() {
    this.aseguradoraEditable = new Aseguradora(0, 0, "", "", "1", true);
    this.aseguradoraModel = new Aseguradora(0, 0, '', '', '1', true);
  }

  listarAseguradoraParaTabla() {
    this._aseguradoraService.listarPagina(this.numeroPagina, this.numeroItems).subscribe(
      response => {
        if (response.content) {
          this.aseguradoras = response.content;
          this.dataSource2 = new MatTableDataSource<Aseguradora>(this.aseguradoras);
          console.log(this.aseguradoras);
          this.dataSource2.paginator = this.paginator;
          this.primeraPagina = response.first;
          this.ultimaPagina = response.last;
          this.cantidadActual = response.numberOfElements;
          this.status = 'ok';
        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'ok';
        }
      }
    );

  }

  setAseguradora(id) {
    if(this.aseguradoraSeleccionada == undefined) return;
    this._aseguradoraService.listarAseguradora(id).subscribe(
      response => {
        if (response.code == 0) {
          this.aseguradoraEditable=response;
          console.log(this.aseguradoraEditable);
          this.status = 'ok';
        } else {
          this.status = 'error';
        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  agregar() {
    this._aseguradoraService.crearAseguradora(this.aseguradoraModel).subscribe(
      response => {
        console.log(response);
        this.listarAseguradoraParaTabla();
        if (response.code == 0) {
          this.snackBar.open('Agregado exitosamente','',{duration: 3000});
          this.status = 'ok';
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
        }
      },
      error => {
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
    this._aseguradoraService.actualizarAseguradora(this.aseguradoraEditable).subscribe(
      response =>{
        console.log(response);
        this.listarAseguradoraParaTabla();
        if(response.code ==0){
          this.snackBar.open('Actualizado exitosamente','',{duration: 3000});
          this.status = 'ok';
        }else{
          this.snackBar.open(response.description,'',{duration: 3000});
        }

      },
      error =>{
        let errorMessage =<any>error;
        console.log(errorMessage);
        if(errorMessage !=null){
          alert(error.description);
          this.status = 'error'
        }
      }
    );
  }

  eliminar(id){
    if(this.aseguradoraSeleccionada[0] == undefined) return
    this._aseguradoraService.eliminarAseguradora(id).subscribe(
      response =>{
        if(response.code ==0){
          this.aseguradoraEditable =response;
          console.log(this.aseguradoraEditable)
          this.listarAseguradoraParaTabla();
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
        }else{
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'error';
        }
      },
      error =>{
        let errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage !=null){
          this.status = 'error';
        }
      }
    );
  }

  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<Aseguradora>(this.aseguradoras);
  selection = new SelectionModel<Aseguradora>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  imprimir(){
    this.aseguradoraSeleccionada = this.selection.selected.map(row => row.codigo);
    console.log(this.aseguradoraSeleccionada[0]);
    if(this.aseguradoraSeleccionada){
      this.setAseguradora(this.aseguradoraSeleccionada[0]);
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Aseguradora): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
}

//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 

// export interface DialogData {
//   animal: string;
//   names: string;
// }

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-aseguradora.component.html',
  styleUrls: ['./aseguradoras.component.css'],
  providers: [AseguradoraService]
})
export class DialogAseg {

  public aseguradoras: Aseguradora[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public aseguradoraModel: Aseguradora;
  public aseguradoraEditable: Aseguradora;
  constructor(
    public dialogRef: MatDialogRef<DialogAseg>,
    @Inject(MAT_DIALOG_DATA) public data: Aseguradora,
    private _aseguradoraService: AseguradoraService
  ) {
    this.aseguradoraModel = new Aseguradora(0, 0, '', '', '', true)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-aseguradora.component.html',
  styleUrls: ['./aseguradoras.component.css']
})
export class DialogActualizarAseg {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarAseg>,
    @Inject(MAT_DIALOG_DATA) public data: Aseguradora) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-aseguradora.component.html',
  styleUrls: ['./aseguradoras.component.css']
})
export class DialogEliminarAseg {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarAseg>,
    @Inject(MAT_DIALOG_DATA) public data: Aseguradora) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
