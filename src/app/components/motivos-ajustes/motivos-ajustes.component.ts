import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { MotivoAjuste } from 'src/app/models/motivo-ajuste.model';
import { MotivosAjustesService } from 'src/app/services/motivo-ajuste.service';


@Component({
  selector: 'app-motivos-ajustes',
  templateUrl: './motivos-ajustes.component.html',
  styleUrls: ['./motivos-ajustes.component.css'],
  providers: [MotivosAjustesService]
})
export class MotivosAjustesComponent implements OnInit {
  
//VARIABLES CHECKBOX
  checked2 = false;
  checked3 = false;
 public CheckAfectaSaldoCapital: string;
 public CheckAfectaSaldoInteres: string;
 public CheckAfectaSaldoMora: string;
  //



  public motivosAjustes: MotivoAjuste[];
  public motivoAjusteSeleccionado: number[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public motivoAjusteModel: MotivoAjuste;
  public motivoAjusteEditable: MotivoAjuste;
  mostrar: Boolean;
  centered = false;
  disabled = false;
  unbounded = false;
  public variable: string;
  radius: number;
  color: string;
  public dataSource2;

  timeLeft: number;
  interval;
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
    

 

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _motivoAjusteService: MotivosAjustesService) {
    this.limpiarVariables();
    this.limpiarChecks();
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  limpiarVariables() {
    this.motivoAjusteEditable = new MotivoAjuste('','','',0,0,'','','','','1',true);
    this.motivoAjusteModel = new MotivoAjuste('','','',0,0,'','','','','1',true);
  }
  
  setNotario(id) {
    if(this.motivoAjusteSeleccionado == undefined) return;
    this._motivoAjusteService.listarMotivoAjuste(id).subscribe(
      response => {
        if (response.code == 0) {
          this.motivoAjusteEditable = response;
          console.log(this.motivoAjusteEditable)
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAgregarMotivoAjuste, {
      width: '500px', 
      data: {afectaSaldoCapital: this.CheckAfectaSaldoCapital,
            afectaSaldoInteres: this.CheckAfectaSaldoInteres,
            afectaSaldoMora: this.CheckAfectaSaldoMora,
            codigo: this.motivoAjusteModel.codigo,
            descripcion: this.motivoAjusteModel.descripcion,
            descripcion2: this.motivoAjusteModel.descripcion2,
            descripcion3: this.motivoAjusteModel.descripcion3
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        console.log("k:"+result.afectaSaldoCapital)

        if (result.afectaSaldoCapital == 'S') {
          // this.CheckAfectaSaldoCapital = 'S'
          result.AfectaSaldoCapital = 'S'
        }else{
          result.AfectaSaldoCapital = 'N'
        }

        if (result.afectaSaldoInteres == 'S') {
          // this.CheckAfectaSaldoInteres = 'S'
          result.afectaSaldoInteres = 'S'
        }else{
          result.afectaSaldoInteres = 'N'
        }

        if (result.afectaSaldoMora == 'S') {
          // this.CheckAfectaSaldoMora = 'S'
          result.afectaSaldoMora = 'S'
        }else{
          result.afectaSaldoMora = 'N'
        }        
        
        this.motivoAjusteModel.afectaSaldoCapital  = result.afectaSaldoCapital;
        this.motivoAjusteModel.afectaSaldoInteres = result.afectaSaldoInteres;
        this.motivoAjusteModel.afectaSaldoMora = result.afectaSaldoMora;
        this.motivoAjusteModel.codigo = result.codigo;
        this.motivoAjusteModel.descripcion = result.descripcion;
        this.motivoAjusteModel.descripcion2 = result.descripcion2;
        this.motivoAjusteModel.descripcion3 = result.descripcion3;
        console.log(result);
        console.table(this.motivoAjusteModel);
        this.agregar();
        
      }
    });
  }

  limpiarChecks(){

    this.checked2 = false;
    this.checked3 = false;
    
  }

  openDialogEditar(): void {
    const dialogRef = this.dialog.open(DialogActualizarMotivoAjuste, {
      width: '500px', 
      data: {afectaSaldoCapital: this.motivoAjusteEditable.afectaSaldoCapital,
        afectaSaldoInteres: this.motivoAjusteEditable.afectaSaldoInteres,
        afectaSaldoMora: this.motivoAjusteEditable.afectaSaldoMora,
        codigo: this.motivoAjusteEditable.codigo,
        descripcion: this.motivoAjusteEditable.descripcion,
        descripcion2: this.motivoAjusteEditable.descripcion2,
        descripcion3: this.motivoAjusteEditable.descripcion3
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.motivoAjusteEditable.afectaSaldoCapital  = result.afectaSaldoCapital;
        this.motivoAjusteEditable.afectaSaldoInteres = result.afectaSaldoInteres;
        this.motivoAjusteEditable.afectaSaldoMora = result.afectaSaldoMora;
        this.motivoAjusteEditable.codigo = result.codigo;
        this.motivoAjusteEditable.descripcion = result.descripcion;
        this.motivoAjusteEditable.descripcion2 = result.descripcion2;
        this.motivoAjusteEditable.descripcion3 = result.descripcion3;
        console.log(result);
        console.table(this.motivoAjusteEditable);
        this.editar();
      };
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DialogEliminarMotivoAjuste, {
      width: '500px', 
      data: {afectaSaldoCapital: this.motivoAjusteEditable.afectaSaldoCapital,
        afectaSaldoInteres: this.motivoAjusteEditable.afectaSaldoInteres,
        afectaSaldoMora: this.motivoAjusteEditable.afectaSaldoMora,
        codigo: this.motivoAjusteEditable.codigo,
        descripcion: this.motivoAjusteEditable.descripcion,
        descripcion2: this.motivoAjusteEditable.descripcion2,
        descripcion3: this.motivoAjusteEditable.descripcion3
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.motivoAjusteEditable.afectaSaldoCapital  = result.afectaSaldoCapital;
        this.motivoAjusteEditable.afectaSaldoInteres = result.afectaSaldoInteres;
        this.motivoAjusteEditable.afectaSaldoMora = result.afectaSaldoMora;
        this.motivoAjusteEditable.codigo = result.codigo;
        this.motivoAjusteEditable.descripcion = result.descripcion;
        this.motivoAjusteEditable.descripcion2 = result.descripcion2;
        this.motivoAjusteEditable.descripcion3 = result.descripcion3;
        console.log(result);
        console.table(this.motivoAjusteEditable);
        this.eliminar(this.motivoAjusteSeleccionado[0]);
      }
    });
  }

  editar() {
    this._motivoAjusteService.actualizarMotivoAjuste(this.motivoAjusteEditable).subscribe(
      response => {
        console.log(response);
        this.listarMotivosAjustesParaTabla();
        if (response.code == 0) {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
          this.limpiarVariables();          
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

  agregar() {
    this._motivoAjusteService.crearMotivoAjuste(this.motivoAjusteModel).subscribe(
      response => {
        console.log(response)
        this.listarMotivosAjustesParaTabla();
        if (response.code == 0) {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
          this.limpiarVariables();
          this.limpiarChecks()
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
    if(this.motivoAjusteSeleccionado == undefined) return;
    this._motivoAjusteService.eliminarMotivoAjuste(id).subscribe(
      response => {
        if (response.code == 0) {
          this.listarMotivosAjustesParaTabla();
          this.motivoAjusteEditable = response;
          console.log(this.motivoAjusteEditable)
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
          this.limpiarChecks();
          this.limpiarVariables();
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

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarMotivosAjustesParaTabla();
  }

  siguientePagina(){
    if(!this.ultimaPagina){
      ++this.listarNumeroPagina;
      this.listarMotivosAjustesParaTabla()
    }
  }

  anteriorPagina(){
    if(!this.primeraPagina){
      --this.listarNumeroPagina;
      this.listarMotivosAjustesParaTabla()
    }
  }

  listarMotivosAjustesParaTabla() {
    this._motivoAjusteService.listarPagina().subscribe(
      response => {
        if (response.content) {
          this.motivosAjustes = response.content;
          this.dataSource2 = new MatTableDataSource<MotivoAjuste>(this.motivosAjustes);
          console.log(this.motivosAjustes);
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
  dataSource = new MatTableDataSource<MotivoAjuste>(this.motivosAjustes);
  selection = new SelectionModel<MotivoAjuste>(false, []);

  

  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows; 
  }

  imprimir() {
    this.motivoAjusteSeleccionado = this.selection.selected.map(row => row.codigo);
    console.log(this.motivoAjusteSeleccionado[0]);
    if (this.motivoAjusteSeleccionado[0]) {
      this.setNotario(this.motivoAjusteSeleccionado[0]);
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
  checkboxLabel(row?: MotivoAjuste): string {
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
  templateUrl: 'agregar-motivos-ajustes.component.html',
  styleUrls: ['./motivos-ajustes.component.css']
})
export class DialogAgregarMotivoAjuste {

  constructor(
    public dialogRef: MatDialogRef<DialogAgregarMotivoAjuste>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-motivos-ajustes.component.html',
  styleUrls: ['./motivos-ajustes.component.css']
})
export class DialogActualizarMotivoAjuste {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarMotivoAjuste>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-motivos-ajustes.component.html',
  styleUrls: ['./motivos-ajustes.component.css']
})
export class DialogEliminarMotivoAjuste {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarMotivoAjuste>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
