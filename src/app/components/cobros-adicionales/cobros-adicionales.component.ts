import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { CobroAdicional } from 'src/app/models/cobro-adicional.model';
import { CobroAdicionalService } from 'src/app/services/cobro-adicional.service';

@Component({
  selector: 'app-cobros-adicionales',
  templateUrl: './cobros-adicionales.component.html',
  styleUrls: ['./cobros-adicionales.component.css'],
  providers: [CobroAdicionalService]
})
export class CobrosAdicionalesComponent implements OnInit {
  public cobrosoAdicionales: CobroAdicional[];
  public cobroAdicionalSeleccionado: number[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public cobroAdicionaloModel: CobroAdicional;
  public cobroAdicionalEditable: CobroAdicional;

  public polizaColectiva: string;
  public seUsaEnFianza: string;
  public acumulaPeriodos: string;
  public pagosAterceros: string;
  public provisiona: string;  
  public incluyeCalculoInteres: string;
  public incluyeCalculoMora: string;
  public incluyeEnCapital: string;
  public inclusionComprobada: string;
  public calculoFlatAlVencimiento: string;
  public paraCalculoDeMora: string;
  public repPagoTercero: string;
  public utilizaCodeudor: string;
  public asociaSeguros: string;
  public opcionAcompra: string;
  public utilizaFactorDivisorParaCalculoFlat: string;
  
  mostrar: Boolean;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  public dataSource2;

  timeLeft: number;
  interval;
  
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _notarioService: CobroAdicionalService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase(); 
  }

  limpiarVariables() {
    this.cobroAdicionalEditable = new CobroAdicional('','','',0,0,'','','','1',true,'','','','','','','','','','','','','','');
    this.cobroAdicionaloModel = new CobroAdicional('','','',0,0,'','','','1',true,'','','','','','','','','','','','','','');
  }

  setNotario(id) {
    if(this.cobroAdicionalSeleccionado == undefined) return;
    this._notarioService.listarCobroAdicional(id).subscribe(
      response => {
        if (response.code == 0) {
          this.cobroAdicionalEditable = response;
          console.log(this.cobroAdicionalEditable)
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

 

    openDialogDelete(): void {
    const dialogRef = this.dialog.open(DialogEliminarCobroAdicional, {
      width: '500px',
      data: { 
        codigo: this.cobroAdicionalEditable.codigo, 
        acumulaPeriodos: this.cobroAdicionalEditable.acumulaPeriodos,
        asociaSeguros: this.cobroAdicionalEditable.asociaSeguros, 
        calculoFlatAlVencimiento: this.cobroAdicionalEditable.calculoFlatAlVencimiento,
        descripcion: this.cobroAdicionalEditable.descripcion,
        descripcionCorta: this.cobroAdicionalEditable.descripcionCorta,
        formatoImpresion: this.cobroAdicionalEditable.formatoImpresion,
        inclusionComprobada: this.cobroAdicionalEditable.inclusionComprobada,
        incluyeCalculoInteres: this.cobroAdicionalEditable.incluyeCalculoInteres,
        incluyeCalculoMora: this.cobroAdicionalEditable.incluyeCalculoMora,
        incluyeEnCapital: this.cobroAdicionalEditable.incluyeEnCapital, 
        opcionAcompra: this.cobroAdicionalEditable.opcionAcompra,
        pagosAterceros: this.cobroAdicionalEditable.pagosAterceros,
        paraCalculoDeMora: this.cobroAdicionalEditable.paraCalculoDeMora,
        polizaColectiva: this.cobroAdicionalEditable.polizaColectiva, 
        provisiona: this.cobroAdicionalEditable.provisiona,  
        repPagoTercero: this.cobroAdicionalEditable.repPagoTercero,
        seUsaEnFianza: this.cobroAdicionalEditable.seUsaEnFianza,  
        utilizaCodeudor: this.cobroAdicionalEditable.utilizaCodeudor, 
        utilizaFactorDivisorParaCalculoFlat: this.cobroAdicionalEditable.utilizaFactorDivisorParaCalculoFlat,  
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.cobroAdicionalEditable.codigo  = result.codigo;
        this.cobroAdicionalEditable.descripcion = result.descripcion;
        this.cobroAdicionalEditable.descripcionCorta = result.descripcionCorta;
        this.cobroAdicionalEditable.acumulaPeriodos  = result.acumulaPeriodos;
        this.cobroAdicionalEditable.asociaSeguros = result.asociaSeguros;
        this.cobroAdicionalEditable.calculoFlatAlVencimiento = result.calculoFlatAlVencimiento;
        this.cobroAdicionalEditable.formatoImpresion  = result.formatoImpresion;
        this.cobroAdicionalEditable.inclusionComprobada = result.inclusionComprobada;
        this.cobroAdicionalEditable.incluyeCalculoInteres = result.incluyeCalculoInteres;
        this.cobroAdicionalEditable.incluyeCalculoMora  = result.incluyeCalculoMora;
        this.cobroAdicionalEditable.incluyeEnCapital = result.incluyeEnCapital;
        this.cobroAdicionalEditable.opcionAcompra = result.opcionAcompra;
        this.cobroAdicionalEditable.pagosAterceros = result.pagosAterceros;
        this.cobroAdicionalEditable.paraCalculoDeMora = result.paraCalculoDeMora;
        this.cobroAdicionalEditable.polizaColectiva  = result.polizaColectiva;
        this.cobroAdicionalEditable.repPagoTercero = result.repPagoTercero;
        this.cobroAdicionalEditable.provisiona = result.provisiona;
        this.cobroAdicionalEditable.seUsaEnFianza  = result.seUsaEnFianza;
        this.cobroAdicionalEditable.utilizaCodeudor = result.utilizaCodeudor;
        this.cobroAdicionalEditable.utilizaFactorDivisorParaCalculoFlat = result.utilizaFactorDivisorParaCalculoFlat;
        console.log(result);
        console.table(this.cobroAdicionalEditable);
        this.eliminar(this.cobroAdicionalSeleccionado[0]);
        this.limpiarVariables()
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCobroAdicional, {
      width: '500px',
      data: { 
        codigo: this.cobroAdicionaloModel.codigo, 
        descripcion: this.cobroAdicionaloModel.descripcion,
        formatoImpresion: this.cobroAdicionaloModel.formatoImpresion, 
        acumulaPeriodos: this.acumulaPeriodos,
        asociaSeguros: this.asociaSeguros, 
        calculoFlatAlVencimiento: this.calculoFlatAlVencimiento,                 
        inclusionComprobada: this.inclusionComprobada,
        incluyeCalculoInteres: this.incluyeCalculoInteres, 
        incluyeCalculoMora: this.incluyeCalculoMora,
        incluyeEnCapital: this.incluyeEnCapital, 
        opcionAcompra: this.opcionAcompra,
        pagosAterceros: this.pagosAterceros, 
        paraCalculoDeMora: this.paraCalculoDeMora,
        polizaColectiva: this.polizaColectiva, 
        provisiona: this.provisiona,  
        repPagoTercero: this.repPagoTercero, 
        seUsaEnFianza: this.seUsaEnFianza,  
        utilizaCodeudor: this.utilizaCodeudor, 
        utilizaFactorDivisorParaCalculoFlat: this.utilizaFactorDivisorParaCalculoFlat,  
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        
        this.cobroAdicionaloModel.codigo  = result.codigo;
        this.cobroAdicionaloModel.descripcion = result.descripcion;
        this.cobroAdicionaloModel.descripcionCorta = result.descripcionCorta;
        this.cobroAdicionaloModel.codigo  = result.codigo;
        this.cobroAdicionaloModel.descripcion = result.descripcion;
        this.cobroAdicionaloModel.descripcionCorta = result.descripcionCorta;
        this.cobroAdicionaloModel.acumulaPeriodos  = result.acumulaPeriodos;
        this.cobroAdicionaloModel.asociaSeguros = result.asociaSeguros;
        this.cobroAdicionaloModel.calculoFlatAlVencimiento = result.calculoFlatAlVencimiento;
        this.cobroAdicionaloModel.formatoImpresion  = result.formatoImpresion;
        this.cobroAdicionaloModel.inclusionComprobada = result.inclusionComprobada;
        this.cobroAdicionaloModel.incluyeCalculoInteres = result.incluyeCalculoInteres;
        this.cobroAdicionaloModel.incluyeCalculoMora  = result.incluyeCalculoMora;
        this.cobroAdicionaloModel.incluyeEnCapital = result.incluyeEnCapital;
        this.cobroAdicionaloModel.opcionAcompra = result.opcionAcompra;
        this.cobroAdicionaloModel.pagosAterceros = result.pagosAterceros;
        this.cobroAdicionaloModel.paraCalculoDeMora = result.paraCalculoDeMora;
        this.cobroAdicionaloModel.polizaColectiva  = result.polizaColectiva;
        this.cobroAdicionaloModel.repPagoTercero = result.repPagoTercero;
        this.cobroAdicionaloModel.provisiona = result.provisiona;
        this.cobroAdicionaloModel.seUsaEnFianza  = result.seUsaEnFianza;
        this.cobroAdicionaloModel.utilizaCodeudor = result.utilizaCodeudor;
        this.cobroAdicionaloModel.utilizaFactorDivisorParaCalculoFlat = result.utilizaFactorDivisorParaCalculoFlat;
        console.log(result);
        console.table(this.cobroAdicionaloModel);
        this.agregar();        
      }
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DialogActualizarCobroAdicional, {
      width: '500px',
      data: { codigo: this.cobroAdicionalEditable.codigo, acumulaPeriodos: this.cobroAdicionalEditable.acumulaPeriodos,
        asociaSeguros: this.cobroAdicionalEditable.asociaSeguros, calculoFlatAlVencimiento: this.cobroAdicionalEditable.calculoFlatAlVencimiento,
        descripcion: this.cobroAdicionalEditable.descripcion, descripcionCorta: this.cobroAdicionalEditable.descripcionCorta,
        formatoImpresion: this.cobroAdicionalEditable.formatoImpresion, inclusionComprobada: this.cobroAdicionalEditable.inclusionComprobada,
        incluyeCalculoInteres: this.cobroAdicionalEditable.incluyeCalculoInteres, incluyeCalculoMora: this.cobroAdicionalEditable.incluyeCalculoMora,
        incluyeEnCapital: this.cobroAdicionalEditable.incluyeEnCapital, opcionAcompra: this.cobroAdicionalEditable.opcionAcompra,
        pagosAterceros: this.cobroAdicionalEditable.pagosAterceros, paraCalculoDeMora: this.cobroAdicionalEditable.paraCalculoDeMora,
        polizaColectiva: this.cobroAdicionalEditable.polizaColectiva, provisiona: this.cobroAdicionalEditable.provisiona,  
        repPagoTercero: this.cobroAdicionalEditable.repPagoTercero, seUsaEnFianza: this.cobroAdicionalEditable.seUsaEnFianza,  
        utilizaCodeudor: this.cobroAdicionalEditable.utilizaCodeudor, utilizaFactorDivisorParaCalculoFlat: this.cobroAdicionalEditable.utilizaFactorDivisorParaCalculoFlat,  
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.cobroAdicionalEditable.codigo  = result.codigo;
        this.cobroAdicionalEditable.descripcion = result.descripcion;
        this.cobroAdicionalEditable.descripcionCorta = result.descripcionCorta;
        this.cobroAdicionalEditable.codigo  = result.codigo;
        this.cobroAdicionalEditable.descripcion = result.descripcion;
        this.cobroAdicionalEditable.descripcionCorta = result.descripcionCorta;
        this.cobroAdicionalEditable.acumulaPeriodos  = result.acumulaPeriodos;
        this.cobroAdicionalEditable.asociaSeguros = result.asociaSeguros;
        this.cobroAdicionalEditable.calculoFlatAlVencimiento = result.calculoFlatAlVencimiento;
        this.cobroAdicionalEditable.formatoImpresion  = result.formatoImpresion;
        this.cobroAdicionalEditable.inclusionComprobada = result.inclusionComprobada;
        this.cobroAdicionalEditable.incluyeCalculoInteres = result.incluyeCalculoInteres;
        this.cobroAdicionalEditable.incluyeCalculoMora  = result.incluyeCalculoMora;
        this.cobroAdicionalEditable.incluyeEnCapital = result.incluyeEnCapital;
        this.cobroAdicionalEditable.opcionAcompra = result.opcionAcompra;
        this.cobroAdicionalEditable.pagosAterceros = result.pagosAterceros;
        this.cobroAdicionalEditable.paraCalculoDeMora = result.paraCalculoDeMora;
        this.cobroAdicionalEditable.polizaColectiva  = result.polizaColectiva;
        this.cobroAdicionalEditable.repPagoTercero = result.repPagoTercero;
        this.cobroAdicionalEditable.provisiona = result.provisiona;
        this.cobroAdicionalEditable.seUsaEnFianza  = result.seUsaEnFianza;
        this.cobroAdicionalEditable.utilizaCodeudor = result.utilizaCodeudor;
        this.cobroAdicionalEditable.utilizaFactorDivisorParaCalculoFlat = result.utilizaFactorDivisorParaCalculoFlat;

        console.log(result);
        console.table(this.cobroAdicionalEditable);
        this.editar();        
      }
    });
  }
   
  editar() {
    this._notarioService.actualizarCobroAdicional(this.cobroAdicionalEditable).subscribe(
      response => {
        console.log(response);
        this.listarCobrosAdicionalesParaTabla();
        if (response.code == 0) {
          this.snackBar.open(response.description,'',{duration: 3000});
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
    this._notarioService.crearCobroAdicional(this.cobroAdicionaloModel).subscribe(
      response => {
        console.log(response)
        this.listarCobrosAdicionalesParaTabla();
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
    if(this.cobroAdicionalSeleccionado == undefined) return;
    this._notarioService.eliminarCobroAdicional(id).subscribe(
      response => {
        if (response.code == 0) {
          this.listarCobrosAdicionalesParaTabla();
          this.cobroAdicionalEditable = response;
          console.log(this.cobroAdicionalEditable)
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

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarCobrosAdicionalesParaTabla();
  }

  siguientePagina(){
    if(!this.ultimaPagina){
      ++this.listarNumeroPagina;
      this.listarCobrosAdicionalesParaTabla()
    }
  }

  anteriorPagina(){
    if(!this.primeraPagina){
      --this.listarNumeroPagina;
      this.listarCobrosAdicionalesParaTabla()
    }
  }

  listarCobrosAdicionalesParaTabla() {
    this._notarioService.listarPagina(this.numeroPagina, this.numeroItems).subscribe(
      response => {
        if (response.content) {
          this.cobrosoAdicionales = response.content;
          this.dataSource2 = new MatTableDataSource<CobroAdicional>(this.cobrosoAdicionales);
          console.log(this.cobrosoAdicionales);
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
  dataSource = new MatTableDataSource<CobroAdicional>(this.cobrosoAdicionales);
  selection = new SelectionModel<CobroAdicional>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows; 
  }

  imprimir() {
    
    this.cobroAdicionalSeleccionado = this.selection.selected.map(row => row.codigo);
    console.log(this.cobroAdicionalSeleccionado[0]);
    if (this.cobroAdicionalSeleccionado[0]) {
      this.setNotario(this.cobroAdicionalSeleccionado[0]);
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
  checkboxLabel(row?: CobroAdicional): string {
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
  templateUrl: 'agregar-cobros-adicionales.component.html',
  styleUrls: ['./cobros-adicionales.component.css']
})
export class DialogCobroAdicional {

  constructor(
    public dialogRef: MatDialogRef<DialogCobroAdicional>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-CobroAdicional.component.html',
  styleUrls: ['./cobros-adicionales.component.css']
})
export class DialogEliminarCobroAdicional {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarCobroAdicional>,
    @Inject(MAT_DIALOG_DATA) public data: CobroAdicional) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-cobro.component.html',
  styleUrls: ['./cobros-adicionales.component.css']
})
export class DialogActualizarCobroAdicional {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarCobroAdicional>,
    @Inject(MAT_DIALOG_DATA) public data: CobroAdicional) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}