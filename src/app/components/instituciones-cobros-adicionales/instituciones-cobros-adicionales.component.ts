import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { InstitucionCobroAdicional } from 'src/app/models/institucion-cobro-adicional.model';
import { InstitucionCobroAdicionalService } from 'src/app/services/institucion-cobro-adicional.service';


@Component({
  selector: 'app-instituciones-cobros-adicionales',
  templateUrl: './instituciones-cobros-adicionales.component.html',
  styleUrls: ['./instituciones-cobros-adicionales.component.css'],
  providers: [InstitucionCobroAdicionalService]
})
export class InstitucionesCobrosAdicionalesComponent implements OnInit {
  instituciones: InstitucionCobroAdicional[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public institucionModel: InstitucionCobroAdicional;
  public institucionEditable: InstitucionCobroAdicional;
  public institucionSeleccionada: number[];

  public dataSource2;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _institucionService: InstitucionCobroAdicionalService) {
    this.limpiarVariables();
  }

  limpiarVariables(){
    this.institucionModel = new InstitucionCobroAdicional(0,0,'','','1',true),
    this.institucionEditable = new InstitucionCobroAdicional(0,0,'','','1',true)
  }
  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase(); 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCobrosAgregar, {
      width: '500px',
      data: {codigo: this.institucionModel.codigo, descripcion: this.institucionModel.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.institucionModel.codigo = result.codigo;
      this.institucionModel.descripcion = result.descripcion;
      console.table(this.institucionModel);
        this.agregar();
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DialogCobrosEditar, {
      width: '500px',
      data: {codigo: this.institucionEditable.codigo, descripcion: this.institucionEditable.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.institucionEditable.codigo = result.codigo;
        this.institucionEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.institucionEditable);
        this.editar();
      }
    });
  }
  
  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DialogCobrosEliminar, {
      width: '500px',
      data: {codigo: this.institucionEditable.codigo, descripcion: this.institucionEditable.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.institucionEditable.codigo = result.codigo;
        this.institucionEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.institucionEditable);
        this.eliminar(this.institucionSeleccionada[0]);
      }
    });
  }

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarInstitucionesCobroParaTabla()
  }

  listarInstitucionesCobroParaTabla(){
    this._institucionService.listarPagina().subscribe(
      response =>{
        if (response.content) {
          this.instituciones = response.content;
          this.dataSource2 = new MatTableDataSource<InstitucionCobroAdicional>(this.instituciones);
          console.log(this.instituciones);
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
          this.snackBar.open(errorMessage,'',{duration: 3000});
          this.status = 'error';
        }
      }
    );
  }

  setInstitucionesCobro(id){
    if(this.institucionSeleccionada == undefined) return;
    this._institucionService.listarInstitucionCobro(id).subscribe(
      response => {
        if (response.code == 0) {
          this.institucionEditable = response;
          console.log(this.institucionEditable)
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'error';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.snackBar.open(errorMessage.description,'',{duration: 3000});
          this.status = 'error';
        }
      }
    );
  }

  agregar(){
    this._institucionService.crearInstitucionCobro(this.institucionModel).subscribe(
      response => {
        console.log(response)
        this.listarInstitucionesCobroParaTabla();
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
          this.snackBar.open(errorMessage.description,'',{duration: 3000});
          this.status = 'error';
        }
      }
    );
  }

  editar(){
    this._institucionService.actualizarInstitucionCobro(this.institucionEditable).subscribe(
      response => {
        console.log(response);
        this.listarInstitucionesCobroParaTabla()
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
          this.snackBar.open(errorMessage.description,'',{duration: 3000});
          this.status = 'error';
        }
      }
    );
  }

  eliminar(id){
    if(this.institucionSeleccionada == undefined) return;
    this._institucionService.eliminarInstitucionCobro(id).subscribe(
      response => {
        this.listarInstitucionesCobroParaTabla()
        if (response.code == 0) {
          this.institucionEditable = response;
          console.log(this.institucionEditable)
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'error';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.snackBar.open(errorMessage.description,'',{duration: 3000});
          this.status = 'error';
        }
      }
    );
  }
 
  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<InstitucionCobroAdicional>(this.instituciones);
  selection = new SelectionModel<InstitucionCobroAdicional>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  imprimir() {
    this.institucionSeleccionada = this.selection.selected.map(row => row.codigo);
    console.log(this.institucionSeleccionada[0]);
    if (this.institucionSeleccionada[0]) {
      this.setInstitucionesCobro(this.institucionSeleccionada[0]);
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
  checkboxLabel(row?: InstitucionCobroAdicional): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'cobros-agregar.html',
  styleUrls: ['./instituciones-cobros-adicionales.component.css']
})
export class DialogCobrosAgregar {

  constructor(
    public dialogRef: MatDialogRef<DialogCobrosAgregar>,
    @Inject(MAT_DIALOG_DATA) public data: InstitucionCobroAdicional) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: 'cobros-editar.html',
  styleUrls: ['./instituciones-cobros-adicionales.component.css']
})
export class DialogCobrosEditar {

  constructor(
    public dialogRef: MatDialogRef<DialogCobrosEditar>,
    @Inject(MAT_DIALOG_DATA) public data: InstitucionCobroAdicional) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: 'eliminar-cobro.html',
  styleUrls: ['./instituciones-cobros-adicionales.component.css']
})
export class DialogCobrosEliminar {

  constructor(
    public dialogRef: MatDialogRef<DialogCobrosEliminar>,
    @Inject(MAT_DIALOG_DATA) public data: InstitucionCobroAdicional) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}