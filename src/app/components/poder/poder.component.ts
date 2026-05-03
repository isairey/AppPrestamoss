import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator' ;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from  '@angular/material/snack-bar' ;
import { Poder } from 'src/app/models/poder.model';
import { PoderService } from 'src/app/services/poder.service';

@Component({
  selector: 'app-poder',
  templateUrl: './poder.component.html',
  styleUrls: ['./poder.component.css'],
  providers: [PoderService]
})
export class PoderComponent implements OnInit {
  public poderes: Poder[];
  
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public poderModel: Poder;
  public poderEditable: Poder;
  public poderSeleccionado: number[];

  public dataSource2;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,private _poderService: PoderService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CrearPoder, {
      width: '500px',
      data: { codigo: this.poderModel.codigo, descripcion: this.poderModel.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.poderModel.codigo = result.codigo;
        this.poderModel.descripcion = result.descripcion;
        console.log(result);
        console.table(this.poderModel);
        this.agregar();
      }
    });
  }


  openDialogEdit(): void {
    const dialogRef = this.dialog.open(ActualizarPoder, {
      width: '500px',
      data: { codigo: this.poderEditable.codigo, descripcion: this.poderEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.poderEditable.codigo = result.codigo;
        this.poderEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.poderEditable);
        this.editar();
      }
    });
  }

  openDialogView(): void {
    const dialogRef = this.dialog.open(VerPoder, {
      width: '500px',
      data: { codigo: this.poderEditable.codigo, descripcion: this.poderEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.poderEditable.codigo = result.codigo;
        this.poderEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.poderEditable);
      }
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(EliminarPoder, {
      width: '500px',
      data: { codigo: this.poderEditable.codigo, descripcion: this.poderEditable.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.poderEditable.codigo = result.codigo;
        this.poderEditable.descripcion = result.descripcion;
        console.log(result);
        console.table(this.poderEditable);
        this.eliminar(this.poderSeleccionado[0]);
      }
    });
  }

  @ViewChild (MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.listarPoderesParaTabla();
  }

  limpiarVariables() {
    this.poderEditable = new Poder(0, 0, '', '', '1', true);
    this.poderModel = new Poder(0, 0, '', '', '1', true);
  }

  siguientePagina(){
    if(!this.ultimaPagina){
      ++this.listarNumeroPagina;
      this.listarPoderesParaTabla()
    }
  }

  anteriorPagina(){
    if(!this.primeraPagina){
      --this.listarNumeroPagina;
      this.listarPoderesParaTabla()
    }
  }

  listarPoderesParaTabla() {
    this._poderService.listarPagina().subscribe(
      response => {
        if (response.content) {
          this.poderes = response.content;
          this.dataSource2 = new MatTableDataSource<Poder>(this.poderes);
          console.log(this.poderes);
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

  setPoder(id) {
    if(this.poderSeleccionado == undefined) return;
    this._poderService.listarPoder(id).subscribe(
      response => {
        if (response.code == 0) {
          this.poderEditable = response;
          console.log(this.poderEditable)
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
    this._poderService.crearPoder(this.poderModel).subscribe(
      response => {
        console.log(response)
        this.listarPoderesParaTabla();
        if (response.code == 0) {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.status = 'ok';
          this.limpiarVariables()
        } else {
          this.snackBar.open(response.description,'',{duration: 3000});
          this.limpiarVariables();
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
    this._poderService.actualizarPoder(this.poderEditable).subscribe(
      response => {
        console.log(response);
        this.listarPoderesParaTabla();
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
    if(this.poderSeleccionado == undefined) return;
    this._poderService.eliminarPoder(id).subscribe(
      response => {
        this.listarPoderesParaTabla()
        if (response.code == 0) {
          this.poderEditable = response;
          console.log(this.poderEditable)
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
  dataSource = new MatTableDataSource<Poder>(this.poderes);
  selection = new SelectionModel<Poder>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  imprimir() {
    this.poderSeleccionado = this.selection.selected.map(row => row.codigo);
    console.log(this.poderSeleccionado[0]);
    if (this.poderSeleccionado[0]) {
      this.setPoder(this.poderSeleccionado[0]);
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
  checkboxLabel(row?: Poder): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
}

//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'agregar-poder.component.html',
  styleUrls: ['./poder.component.css'],
  providers: [PoderService]
})
export class CrearPoder {
  public almacenadoras: Poder[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public almacenadoraModel: Poder;
  public almacenadoraEditable: Poder;
  constructor(
    public dialogRef: MatDialogRef<CrearPoder>,
    @Inject(MAT_DIALOG_DATA) public data: Poder,
    private _almacenadoraService: PoderService) {
    this.almacenadoraModel = new Poder(0, 0, '', '', '1', true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  agregarAlmacenadora() {

  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'actualizar-poder.component.html',
  styleUrls: ['./poder.component.css']
})
export class ActualizarPoder {

  constructor(
    public dialogRef: MatDialogRef<ActualizarPoder>,
    @Inject(MAT_DIALOG_DATA) public data: Poder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eliminar-poder.component.html',
  styleUrls: ['./poder.component.css']
})
export class EliminarPoder {

  constructor(
    public dialogRef: MatDialogRef<EliminarPoder>,
    @Inject(MAT_DIALOG_DATA) public data: Poder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'ver-poder.component.html',
  styleUrls: ['./poder.component.css']
})
export class VerPoder {

  constructor(
    public dialogRef: MatDialogRef<VerPoder>,
    @Inject(MAT_DIALOG_DATA) public data: Poder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}