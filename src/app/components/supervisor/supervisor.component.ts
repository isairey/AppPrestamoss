import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { Supervisor } from 'src/app/models/supervisor.model';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css'],
  providers: [SupervisorService]
})
export class SupervisorComponent implements OnInit {
  public supervisores: Supervisor[];
  
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public supervisorModel: Supervisor;
  public supervisorEditable: Supervisor;
  public supervisorSeleccionado: number[];

  public dataSource2;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _supervisorService: SupervisorService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CrearSupervisor, {
      width: '500px',
      data: { codigo: this.supervisorModel.codigo, descripcion: this.supervisorModel.descripcion, numeroRegistro: this.supervisorModel.numeroRegistro }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {        
        this.supervisorModel.codigo = result.codigo;
        this.supervisorModel.descripcion = result.descripcion;
        this.supervisorModel.numeroRegistro = result.numeroRegistro;
        console.log(result);
        console.table(this.supervisorModel);
        this.agregar();
      }
    });
  }


  openDialogEdit(): void {
    const dialogRef = this.dialog.open(ActualizarSupervisor, {
      width: '500px',
      data: { codigo: this.supervisorEditable.codigo, descripcion: this.supervisorEditable.descripcion, numeroRegistro: this.supervisorEditable.numeroRegistro }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.supervisorEditable.codigo = result.codigo;
        this.supervisorEditable.descripcion = result.descripcion;
        this.supervisorEditable.numeroRegistro = result.numeroRegistro;
        console.log(result);
        console.table(this.supervisorEditable);
        this.editar();
      }
    });
  }

  openDialogView(): void {
    const dialogRef = this.dialog.open(VerSupervisor, {
      width: '500px',
      data: { codigo: this.supervisorEditable.codigo, descripcion: this.supervisorEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.supervisorEditable.codigo = result.codigo;
        this.supervisorEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.supervisorEditable);
      }
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(EliminarSupervisor, {
      width: '500px',
      data: { codigo: this.supervisorEditable.codigo, descripcion: this.supervisorEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.supervisorEditable.codigo = result.codigo;
        this.supervisorEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.supervisorEditable);
        this.eliminar(this.supervisorSeleccionado[0]);
      }
    });
  }

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarSupervisoresParaTabla();
  }

  limpiarVariables() {
    this.supervisorEditable = new Supervisor(0, 0, '', '', '1', true,'');
    this.supervisorModel = new Supervisor(0, 0, '', '', '1', true,'');
  }

  siguientePagina(){
    if(!this.ultimaPagina){
      ++this.listarNumeroPagina;
      this.listarSupervisoresParaTabla()
    }
  }

  anteriorPagina(){
    if(!this.primeraPagina){
      --this.listarNumeroPagina;
      this.listarSupervisoresParaTabla()
    }
  }

  listarSupervisoresParaTabla() {
    this._supervisorService.listarPagina().subscribe(
      response => {
        if (response.content) {
          this.supervisores = response.content;
          this.dataSource2 = new MatTableDataSource<Supervisor>(this.supervisores);
          console.log(this.supervisores);
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

  setSupervisor(id) {
    if(this.supervisorSeleccionado == undefined) return;
    this._supervisorService.listarSupervisor(id).subscribe(
      response => {
        if (response.code == 0) {
          this.supervisorEditable = response;
          console.log(this.supervisorEditable)
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
    this._supervisorService.crearSupervisor(this.supervisorModel).subscribe(
      response => {
        console.log(response)
        this.listarSupervisoresParaTabla();
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
    this._supervisorService.actualizarSupervisor(this.supervisorEditable).subscribe(
      response => {
        console.log(response);
        this.listarSupervisoresParaTabla();
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

  eliminar(id){
    if(this.supervisorSeleccionado == undefined) return;
    this._supervisorService.eliminarSupervisor(id).subscribe(
      response => {
        this.listarSupervisoresParaTabla()
        if (response.code == 0) {
          this.supervisorEditable = response;
          console.log(this.supervisorEditable)
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
          this.snackBar.open(errorMessage,'',{duration: 3000});
          this.status = 'error';
        }
      }
    );
  
  }

  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<Supervisor>(this.supervisores);
  selection = new SelectionModel<Supervisor>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  imprimir() {
    this.supervisorSeleccionado = this.selection.selected.map(row => row.codigo);
    console.log(this.supervisorSeleccionado[0]);
    if (this.supervisorSeleccionado[0]) {
      this.setSupervisor(this.supervisorSeleccionado[0]);
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
  checkboxLabel(row?: Supervisor): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
}

//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class CrearSupervisor {
  public supervisorModel: Supervisor;
  constructor(
    public dialogRef: MatDialogRef<CrearSupervisor>,
    @Inject(MAT_DIALOG_DATA) public data: Supervisor) {
    this.supervisorModel = new Supervisor(0, 0, '', '', '1', true,'');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  agregarAlmacenadora() {

  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class ActualizarSupervisor {

  constructor(
    public dialogRef: MatDialogRef<ActualizarSupervisor>,
    @Inject(MAT_DIALOG_DATA) public data: Supervisor) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class EliminarSupervisor {

  constructor(
    public dialogRef: MatDialogRef<EliminarSupervisor>,
    @Inject(MAT_DIALOG_DATA) public data: Supervisor) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'ver-supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class VerSupervisor {

  constructor(
    public dialogRef: MatDialogRef<VerSupervisor>,
    @Inject(MAT_DIALOG_DATA) public data: Supervisor) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}