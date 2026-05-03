import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { Notario } from 'src/app/models/notarios.models';
import { NotarioService } from 'src/app/services/notario.service';



@Component({
  selector: 'app-notarios',
  templateUrl: './notarios.component.html',
  styleUrls: ['./notarios.component.css'],
  providers: [NotarioService]
})
export class NotariosComponent implements OnInit {
  public notarios: Notario[];
  public notarioSeleccionado: number[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public notarioModel: Notario;
  public notarioEditable: Notario;
  mostrar: Boolean;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  public dataSource2;

  timeLeft: number;
  interval;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _notarioService: NotarioService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  limpiarVariables() {
    this.notarioEditable = new Notario('',0,0,'','','','','','1',true,'','','','',0,'',0);
    this.notarioModel = new Notario('',0,0,'','','','','','1',true,'','','','',0,'',0);
  }


  setNotario(id) {
    if(this.notarioSeleccionado == undefined) return;
    this._notarioService.listarNotario(id).subscribe(
      response => {
        if (response.code == 0) {
          this.notarioEditable = response;
          console.log(this.notarioEditable)
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
  
startTimer() {
  this.timeLeft = 2;
    this.interval = setInterval(() => {
      if(this.timeLeft >0 && this.timeLeft < 10){
        this.mostrar = true;
        this.timeLeft--;
      }
      else if( this.timeLeft > 0) {
        this.timeLeft--;
        
      } else if (this.timeLeft == 0) {
        this.mostrar = false;
        this.openDialog();
        this.timeLeft = 10000;
      }
    },1000)
  }
  
  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DialogEliminarNotario, {
      width: '500px',
      data: { codigo: this.notarioEditable.codigo, direccion: this.notarioEditable.direccion,
        nombre: this.notarioEditable.nombre, cheque: this.notarioEditable.cheque,
        colegiado: this.notarioEditable.colegiado, identificacion: this.notarioEditable.identificacion,
        telefono: this.notarioEditable.telefono, fax: this.notarioEditable.fax}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.notarioEditable.codigo  = result.codigo;
        this.notarioEditable.direccion = result.direccion;
        this.notarioEditable.nombre = result.nombre;
        this.notarioEditable.cheque = result.cheque;
        this.notarioEditable.colegiado = result.colegiado;
        this.notarioEditable.identificacion = result.identificacion;
        this.notarioEditable.telefono = result.telefono;
        this.notarioEditable.fax = result.fax;
        console.log(result);
        console.table(this.notarioEditable);
        this.eliminar(this.notarioSeleccionado[0]);
      }
    });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNotario, {
      width: '60%',
      data: {codigo: this.notarioModel.codigo, direccion: this.notarioModel.direccion, nombre:this.notarioModel.nombre, cheque:this.notarioModel.cheque, colegiado:this.notarioModel.colegiado,
      identificacion:this.notarioModel.identificacion, telefono:this.notarioModel.telefono, fax:this.notarioModel.fax
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.notarioModel.codigo  = result.codigo;
        this.notarioModel.direccion = result.direccion;
        this.notarioModel.nombre = result.nombre;
        this.notarioModel.cheque = result.cheque;
        this.notarioModel.colegiado = result.colegiado;
        this.notarioModel.identificacion = result.identificacion;
        this.notarioModel.telefono = result.telefono;
        this.notarioModel.fax = result.fax;
        console.log(result);
        console.table(this.notarioModel);
        this.agregar();
      }
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DialogActualizarNotario, {
      width: '60%',
      data: { codigo: this.notarioEditable.codigo, direccion: this.notarioEditable.direccion,
              nombre: this.notarioEditable.nombre, cheque: this.notarioEditable.cheque,
              colegiado: this.notarioEditable.colegiado, identificacion: this.notarioEditable.identificacion,
              telefono: this.notarioEditable.telefono, fax: this.notarioEditable.fax }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.notarioEditable.codigo  = result.codigo;
        this.notarioEditable.direccion = result.direccion;
        this.notarioEditable.nombre = result.nombre;
        this.notarioEditable.cheque = result.cheque;
        this.notarioEditable.colegiado = result.colegiado;
        this.notarioEditable.identificacion = result.identificacion;
        this.notarioEditable.telefono = result.telefono;
        this.notarioEditable.fax = result.fax;
        console.log(result);
        console.table(this.notarioEditable);
        this.editar();
      }
    });
  }

  editar() {
    this._notarioService.actualizarNotario(this.notarioEditable).subscribe(
      response => {
        console.log(response);
        this.listarNotariosParaTabla();
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

  agregar() {
    this._notarioService.crearNotario(this.notarioModel).subscribe(
      response => {
        console.log(response)
        this.listarNotariosParaTabla();
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
    if(this.notarioSeleccionado == undefined) return;
    this._notarioService.eliminarNotario(id).subscribe(
      response => {
        if (response.code == 0) {
          this.listarNotariosParaTabla();
          this.notarioEditable = response;
          console.log(this.notarioEditable)
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
          this.limpiarVariables()
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'error';
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

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarNotariosParaTabla();
  }


  siguientePagina(){
    if(!this.ultimaPagina){
      ++this.listarNumeroPagina;
      this.listarNotariosParaTabla()
    }
  }

  anteriorPagina(){
    if(!this.primeraPagina){
      --this.listarNumeroPagina;
      this.listarNotariosParaTabla()
    }
  }

  listarNotariosParaTabla() {
    this._notarioService.listarPagina().subscribe(
      response => {
        if (response.content) {
          this.notarios = response.content;
          this.dataSource2 = new MatTableDataSource<Notario>(this.notarios);
          console.log(this.notarios);
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
          this.status = 'error';
        }
      }
    );
  }


  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<Notario>(this.notarios);
  selection = new SelectionModel<Notario>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  imprimir() {
    this.notarioSeleccionado = this.selection.selected.map(row => row.codigo);
    console.log(this.notarioSeleccionado[0]);
    if (this.notarioSeleccionado[0]) {
      this.setNotario(this.notarioSeleccionado[0]);
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
  checkboxLabel(row?: Notario): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

}
//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-notarios.component.html',
  styleUrls: ['./notarios.component.css'],
  providers: [NotarioService]
})
export class DialogNotario {

  public notarios: Notario[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public notarioModel: Notario;
  public notarioEditable: Notario;
  constructor(
    public dialogRef: MatDialogRef<DialogNotario>,
    @Inject(MAT_DIALOG_DATA) public data: Notario,
    private _notarioService: NotarioService) {
    this.notarioModel = new Notario('',0,0,'','','','','','1',true,'','','','',0,'',0);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }  
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-notario.html',
  styleUrls: ['./notarios.component.css']
})
export class DialogActualizarNotario {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarNotario>,
    @Inject(MAT_DIALOG_DATA) public data: Notario) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-notario.component.html',
  styleUrls: ['./notarios.component.css']
})
export class DialogEliminarNotario {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarNotario>,
    @Inject(MAT_DIALOG_DATA) public data: Notario) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}