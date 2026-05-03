import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametros-adiciones-productos',
  templateUrl: './parametros-adiciones-productos.component.html',
  styleUrls: ['./parametros-adiciones-productos.component.css']
})


export class ParametrosAdicionesProductosComponent implements OnInit {
  timeLeft: number;
  interval;
  mostrar: Boolean;
  constructor() { }
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
          
          this.timeLeft = 10000;
        }
      },1000)
    }
    
  ngOnInit() {
  }

}


