import { Component, OnInit, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface PeriodicElement {
  codigo: number;
  usuario: string;
  categoria: number;
  descripcion: string;
}

export interface tipoProducto{
  codigo: number;
  tipo: number;
  descripcionProducto: string;
}

const TipoProducto_DATA: tipoProducto[]=[
  {codigo:1, tipo:1, descripcionProducto: 'FIDUCIARIOS'}
]
const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, usuario: 'Jelipe', categoria: 1, descripcion: 'Gerente'},
  {codigo: 2, usuario: 'Goku', categoria: 1,descripcion: 'Gerente'},
  
];

@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './Asignacion-de-Categorias.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class AsignacionCategoriasComponent implements OnInit {
  codigo: number;
  usuario: string;
  categoria: number;
  descripcion: string;

  mostrar: Boolean;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  

  timeLeft: number;
  interval;

  constructor(public dialog: MatDialog) {} 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
// startTimer() {
//   this.timeLeft = 2;
//     this.interval = setInterval(() => {
//       if(this.timeLeft >0 && this.timeLeft < 10){
//         this.mostrar = true;
//         this.timeLeft--;
//       }
//       else if( this.timeLeft > 0) {
//         this.timeLeft--;
        
//       } else if (this.timeLeft == 0) {
//         this.mostrar = false;
//         this.openDialog();
        
//         this.timeLeft = 10000;
//       }
//     },1000)
//   }

  // startTimerV() {
  //   this.timeLeft = 2;
  //     this.interval = setInterval(() => {
  //       if(this.timeLeft >0 && this.timeLeft < 10){
  //         this.mostrar = true;
  //         this.timeLeft--;
  //       }
  //       else if( this.timeLeft > 0) {
  //         this.timeLeft--;
          
  //       } else if (this.timeLeft == 0) {
  //         this.mostrar = false;
  //         this.openDialogV();
  //         this.timeLeft = 10000;
  //       }
  //     },1000)
  //   }

    // startTimerT() {
    //   this.timeLeft = 2;
    //     this.interval = setInterval(() => {
    //       if(this.timeLeft >0 && this.timeLeft < 10){
    //         this.mostrar = true;
    //         this.timeLeft--;
    //       }
    //       else if( this.timeLeft > 0) {
    //         this.timeLeft--;
            
    //       } else if (this.timeLeft == 0) {
    //         this.mostrar = false;
    //         this.openDialogT();
    //         this.timeLeft = 10000;
    //       }
    //     },1000)
    //   }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAsignacionCategorias, {
      width: '500px',      
      data: {codigo: this.codigo, usuario: this.usuario, categoria: this.categoria, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcion = result;
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DialogEliminarAsignacionCategorias, {
      width: '500px',      
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.descripcion = result;
    });
  }


  openDialogT(): void {
    const dialogRef = this.dialog.open(DialogAsignacionCategoriasT, {
      width: '500px',      
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.descripcion = result;
    });
  }

  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'codigo', 'usuairo', 'categoria', 'descripcion'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows; 
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

}


export interface DialogData {
  animal: string;
  names: string;
}

@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './DialogAsignacionCategorias.component.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class DialogAsignacionCategorias {

  constructor(
    public dialogRef: MatDialogRef<DialogAsignacionCategorias>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './eliminar-asignacion-categoria.component.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class DialogEliminarAsignacionCategorias {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarAsignacionCategorias>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './DialogAsignacionCategoriasV.component.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class DialogAsignacionCategoriasV{

  constructor(   
    public dialogRef: MatDialogRef<DialogAsignacionCategoriasV>,
    @Inject(MAT_DIALOG_DATA) public data: tipoProducto) {}

  onNoClick(): void {
    this.dialogRef.close();
  }   

}



@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './DialogAsignacionCategoriasT.component.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class DialogAsignacionCategoriasT{
  codigo: number;
  tipo: number;
  descripcionProducto: string;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogAsignacionCategoriasT>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  openDialogV(): void {
    const dialogRef = this.dialog.open(DialogAsignacionCategoriasV, {
      width: '500px',      
      data: {codigo: this.codigo, tipos: this.tipo, descripcionProducto: this.descripcionProducto}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcionProducto = result;
    });
  }

  openDialogEliminar(): void {
    const dialogRef = this.dialog.open(DialogEliminarAsignacionTipoProducto, {
      width: '500px',      
      data: {codigo: this.codigo, tipos: this.tipo, descripcionProducto: this.descripcionProducto}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcionProducto = result;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayedColumns: string[] = ['select', 'codigo', 'tipo', 'descripcionProducto'];
  dataSource = new MatTableDataSource<tipoProducto>(TipoProducto_DATA);
  selection = new SelectionModel<tipoProducto>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows; 
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: tipoProducto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }  

}

@Component({
  selector: 'app-Asignacion-de-Categorias',
  templateUrl: './Dialog-eliminar-asignacion-tipo-producto.component.html',
  styleUrls: ['./Asignacion-de-Categorias.css']
})
export class DialogEliminarAsignacionTipoProducto{

  constructor(   
    public dialogRef: MatDialogRef<DialogEliminarAsignacionTipoProducto>,
    @Inject(MAT_DIALOG_DATA) public data: tipoProducto) {}

  onNoClick(): void {
    this.dialogRef.close();
  }   

}