import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit ,OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';


export interface PeriodicElement {
  descripcion: string;
  enlace: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {descripcion: 'Almacenadora', enlace:'almacenadora'},
  {descripcion: 'Aseguradora', enlace:'aseguradora'},
  // {descripcion: 'Agrupacion de Creditos', enlace:'agrupacionCredito'},
  // {descripcion: 'Acercamiento', enlace:'acercamiento'},
  // {descripcion: 'Acesores de Prestamos', enlace:'acesoresPrestamos'},
  // {descripcion: 'Archivos de Limpieza', enlace:'archivosLimpieza'},
  // {descripcion: 'Asignacion de Categorias', enlace:'asignacionCategorias'},
  
  // {descripcion: 'Bancos', enlace:'bancos'},
  
  {descripcion: 'Categorias SIB', enlace:'categoriasSIB'},
  // {descripcion: 'Definir Categorias de Usuario', enlace:'definirCategoriasUsuario'},
  // {descripcion: 'Copiar Parametros del Producto', enlace:'copiarParametrosProductos'},
  // {descripcion: 'Canales de Venta', enlace:'canalesVenta'},
  // {descripcion: 'Clasificacion', enlace:'clasificacion'},
  {descripcion: 'Cobros Adicionales', enlace:'cobrosAdicionales'},
  // {descripcion: 'Consultas', enlace:'consultas'},
  // {descripcion: 'Contenido Contable', enlace:'contenidoContable'},
  
  // {descripcion: 'Datos Generales de Registro y Control', enlace:'datosGeneralesRC'},
  {descripcion: 'Destinos', enlace:'destinos'},
  // {descripcion: 'Dias Inhabiles', enlace:'diasInhabiles'},
  // {descripcion: 'Documentos por Producto', enlace:'documentosProducto'},
  
  // {descripcion: 'Enlaces de Contabilidad', enlace:'enlaceContabilidad'},
  // {descripcion: 'Estados de Prestamos', enlace:'estadosPrestamos'},
  {descripcion: 'Estatus de Avaluos', enlace:'estatusAvaluos'},
  {descripcion: 'Estatus de Garantia Real', enlace:'estatusGarantiaReal'},
  // {descripcion: 'Estatus Legal', enlace:'estatusLegales'},
  // {descripcion: 'Ecentos de Solicitudes', enlace:'eventosSolicitudes'},
  
  // {descripcion: 'Frecuencias de Amortizacion', enlace:'frecuenciasAmortizacion'},
  {descripcion: 'Formas de Desembolso', enlace:'formasDesembolso'},
  {descripcion: 'Formas Pago', enlace:'formasPago'},
  
  // {descripcion: 'Garantias Contables', enlace:'garantiasContables'},
  
  // {descripcion: 'Ingenieros Valuadores', enlace:'ingenierosValuadores'},
  {descripcion: 'Instancia', enlace:'instancia'},
  {descripcion: 'Instituciones de Cobro Adicional', enlace:'institucionesCobroAdicional'},
  
  // {descripcion: 'Limpieza de Archivos', enlace:'limpiezaArchivos'},
  {descripcion: 'Lugares de Inversion', enlace:'lugaresInversion'},
  
  // {descripcion: 'Montos Plazo', enlace:'montosPlazo'}, 
  {descripcion: 'Motivos Ajuste', enlace:'motivosAjuste'},
  // {descripcion: 'Motivos Reserva', enlace:'motivosReserva'},
  // {descripcion: 'Motivos de Refencia al Cliente', enlace:'motivosReferenciaCliente'},
  {descripcion: 'Medios Contacto', enlace:'mediosContacto'},
  
  // {descripcion: 'Niveles de Contabilizacion', enlace:'nivelesContabilizacion'},
  {descripcion: 'Notarios', enlace:'notarios'},
  
  {descripcion: 'Origen de Fondos', enlace:'origenFondos'},
  
  // {descripcion: 'Parametros Adicioneles por Producto', enlace:'parametrosAdicionalesProductos'},
  // {descripcion: 'Parametrizacion Numero de Prestamo', enlace:'parametrizacionNumeroPrestamo'},
  {descripcion: 'Poder', enlace:'poder'},
  // {descripcion: 'Porcentaje Financiero', enlace:'porcentajeFinanciero'},
  // {descripcion: 'Pasos de Cierre', enlace:'pasosCierre'},
  // {descripcion: 'Productos', enlace:'productos'},
  
  // {descripcion: 'Rango de Plazos Interes', enlace:'rangoPlazosInteres'},
  // {descripcion: 'Relacion Transaccion Deposito', enlace:'relacionTransaccionDeposito'},
  
  {descripcion: 'Supervisor', enlace:'supervisor'},

  // {descripcion: 'Tipos Canales de Distribucion', enlace:'tiposCanalesDistribucion'},
  // {descripcion: 'Tipos de Deduccion', enlace:'tiposDeducciones'},
  // {descripcion: 'Tipos de Prestamo', enlace:'tiposPrestamos'},
  // {descripcion: 'Tipos y Subtipos Grantias Reales', enlace:'tiposSubtiposGarantiasRealas'},
  // {descripcion: 'Tipos de Transaccion', enlace:'tiposTransacciones'},
  
  // {descripcion: 'Ubicacion de Garantias', enlace:'ubicacionGarantia'},
];


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})




export class SidenavComponent implements OnInit, OnDestroy {
  events: string[] = [];
  opened: boolean;

  displayedColumns: string[] = ['descripcion'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  mobileQuery: MediaQueryList;

  ngOnInit() {
  }
  private _mobileQueryListener: () => void;

  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px;min-width: 300px )');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

