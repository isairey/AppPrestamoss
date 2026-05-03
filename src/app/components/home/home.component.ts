import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  applyFilter(filterValue: any){
    this.fillerContent.filter = filterValue.trim().toLowerCase()
  }

  // fillerNav = Array.from({length: 100}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 1}, () =>
      `  Somos una empresa que provee soluciones de software de clase mundial. Aseguramos nuestro firme 
        compromiso con los clientes, colaboradores y accionistas, buscando constantemente los más altos 
        estándares de calidad; producto de la innovación y madurez en nuestros procesos y productos.
 
        Estamos especializados en proveer soluciones de software para las industrias de Telecomunicaciones, 
        Servicios Públicos, Banca y Finanzas.  Contamos con una amplia gama de productos, los cuales han 
        sido diseñados para permitir a nuestros usuarios solucionar y facilitar sus procesos dentro de la empresa.
       
        Ofrecemos soluciones de vanguardia y tecnología avanzada, desarrollados por un equipo altamente 
        capacitado para poder cumplir y superar las expectativas de nuestros clientes, generando relaciones 
        a largo plazo.
       
        Desde 1989, la flexibilidad y capacidades de nuestras soluciones de software y servicios profesionales, 
        han apoyado a empresas en el logro de sus objetivos.
       
        Nuestras soluciones y servicios han sido implementados y utilizados por múltiples clientes en 
        diferentes mercados, contamos con la experiencia y conocimiento de industria requerido por 
        nuestros clientes..`);

  private _mobileQueryListener: () => void;

  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }




}
