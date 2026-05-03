import { Component, OnInit, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { DiaInhabil } from 'src/app/models/dia-inhabil.model';
import { DiaInhabilService } from 'src/app/services/dia-inhabil.service';

@Component({
  selector: 'app-dias-inhabiles',
  templateUrl: './dias-inhabiles.component.html',
  styleUrls: ['./dias-inhabiles.component.css'],
  providers: [DiaInhabilService]
})
export class DiasInhabilesComponent implements OnInit {
  
  checked = false;
  checked2 = false;
  checked3 = false;
  public diasInhabiles: DiaInhabil[];
  public diaInhabilSeleccionado2: string[];
  public diaInhabilSeleccionado: Date[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public diaInhabilModel: DiaInhabil;
  public diaInhabilEditable: DiaInhabil;
  mostrar: Boolean;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  public dataSource2;

  timeLeft: number;
  interval;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _diaInhabilService: DiaInhabilService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase(); 
  }

  limpiarVariables() {
    var start;
    this.diaInhabilEditable = new DiaInhabil(0,'','','1',true,start = new Date(Date.now()),'');
    this.diaInhabilModel = new DiaInhabil(0,'','','1',true,start = new Date(Date.now()),'');
  }


  setNotario(fechaFeriado, tipoFeriado) { 
    if(this.diaInhabilSeleccionado == undefined) return;
    this._diaInhabilService.listarDiaInhabil(fechaFeriado,tipoFeriado).subscribe(
      response => {
        if (response.code == 0) {
          this.diaInhabilEditable = response;
          console.log(this.diaInhabilEditable)
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
      const dialogRef = this.dialog.open(DialogEliminarDiaInhabil, {
        width: '500px',
        data: { descripcion: this.diaInhabilEditable.descripcion, 
          fechaFeriado: this.diaInhabilEditable.fechaFeriado,
          tipoFeriado: this.diaInhabilEditable.tipoFeriado,
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result != undefined) {
          this.diaInhabilEditable.descripcion  = result.descripcion;
          this.diaInhabilEditable.fechaFeriado = result.fechaFeriado;
          this.diaInhabilEditable.tipoFeriado = result.tipoFeriado;
          console.log(result);
          console.table(this.diaInhabilEditable);
          this.eliminar(this.diaInhabilSeleccionado[0]);
          this.limpiarVariables()
        }
      });
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogDiaInhabil, {
        width: '60%',
        data: { descripcion: this.diaInhabilEditable.descripcion, 
          fechaFeriado: this.diaInhabilEditable.fechaFeriado,
          tipoFeriado: this.diaInhabilEditable.tipoFeriado,
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result != undefined) {
          console.log("k:"+result.tipoFeriado)

        if (result.tipoFeriado == true) {
          // this.CheckAfectaSaldoCapital = 'S'
          result.tipoFeriado = 'V'
        }
        if (result.tipoFeriado == false) {
          // this.CheckAfectaSaldoInteres = 'S'
          result.tipoFeriado = 'F'
        }
        console.log(result.fechaFeriado)
          this.diaInhabilModel.descripcion  = result.descripcion;
          this.diaInhabilModel.fechaFeriado = result.fechaFeriado;
          this.diaInhabilModel.tipoFeriado = result.tipoFeriado;
          console.log(result);
          console.table(this.diaInhabilModel);
          this.agregar();
          this.limpiarVariables()
        }
      });
    }

    openDialogEdit(): void {
      const dialogRef = this.dialog.open(DialogActualizarDiaInhabil, {
        width: '500px',
        data: { descripcion: this.diaInhabilEditable.descripcion, 
          fechaFeriado: this.diaInhabilEditable.fechaFeriado,
          tipoFeriado: this.diaInhabilEditable.tipoFeriado,
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result != undefined) {
          this.diaInhabilEditable.descripcion  = result.descripcion;
          this.diaInhabilEditable.fechaFeriado = result.fechaFeriado;
          this.diaInhabilEditable.tipoFeriado = result.tipoFeriado;
          console.log(result);
          console.table(this.diaInhabilEditable);
          this.editar();
          this.limpiarVariables();
        }
      });
    }

    editar() {
      this._diaInhabilService.actualizarDiaInhabil(this.diaInhabilEditable).subscribe(
        response => {
          console.log(response);
          this.listarNotariosParaDiaInhabil();
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

    agregar() {
      this._diaInhabilService.crearDiaInhabil(this.diaInhabilModel).subscribe(
        response => {
          console.log(response)
          this.listarNotariosParaDiaInhabil();
          this.limpiarVariables();
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

    eliminar(id){
      if(this.diaInhabilSeleccionado == undefined) return;
      this._diaInhabilService.eliminarDiaInhabil(id).subscribe(
        response => {
          if (response.code == 0) {
            this.listarNotariosParaDiaInhabil();
            this.diaInhabilEditable = response;
            console.log(this.diaInhabilEditable)
            this.snackBar.open('Eliminado exitosamente','',{duration: 3000});
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

  ngOnInit() {
    this.listarNotariosParaDiaInhabil();
  }

  siguientePagina(){
    if(!this.ultimaPagina){
      ++this.listarNumeroPagina;
      this.listarNotariosParaDiaInhabil()
    }
  }

  anteriorPagina(){
    if(!this.primeraPagina){
      --this.listarNumeroPagina;
      this.listarNotariosParaDiaInhabil()
    }
  }

  listarNotariosParaDiaInhabil() {
    this._diaInhabilService.listarPagina(this.numeroPagina, this.numeroItems).subscribe(
      response => {
        if (response.content) {
          this.diasInhabiles = response.content;
          this.dataSource2 = new MatTableDataSource<DiaInhabil>(this.diasInhabiles);
          console.log(this.diasInhabiles);
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

  displayedColumns: string[] = ['select', 'codigo', 'descripcion','fecha'];
  dataSource = new MatTableDataSource<DiaInhabil>(this.diasInhabiles);
  selection = new SelectionModel<DiaInhabil>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows; 
  }

  imprimir() {
    //REVISAR
    this.diaInhabilSeleccionado = this.selection.selected.map(row => row.fechaFeriado);
    this.diaInhabilSeleccionado2 = this.selection.selected.map(row => row.tipoFeriado);
    console.log(this.diaInhabilSeleccionado[0]);
    console.log(this.diaInhabilSeleccionado2[0]);
    if (this.diaInhabilSeleccionado[0]) {
      this.setNotario(this.diaInhabilSeleccionado[0].toDateString,this.diaInhabilSeleccionado2[0]);
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
  checkboxLabel(row?: DiaInhabil): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tipoFeriado + 1}`;
  }

}
//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 

export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-dias-inhabiles.component.html',
  styleUrls: ['./dias-inhabiles.component.css']
})
export class DialogDiaInhabil {

  constructor(
    public dialogRef: MatDialogRef<DialogDiaInhabil>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar.html',
  styleUrls: ['./dias-inhabiles.component.css']
})
export class DialogEliminarDiaInhabil {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarDiaInhabil>,
    @Inject(MAT_DIALOG_DATA) public data: DiaInhabil) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'editar.html',
  styleUrls: ['./dias-inhabiles.component.css']
})
export class DialogActualizarDiaInhabil {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarDiaInhabil>,
    @Inject(MAT_DIALOG_DATA) public data: DiaInhabil) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}