import { Component, ElementRef, ViewChild,EventEmitter } from '@angular/core';
import { arrayRemove } from 'firebase/firestore';
import { Chart, ChartItem} from 'node_modules/chart.js'
import { Observable, of } from 'rxjs';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  canvas: any
  voted = new EventEmitter<any>();
  titulos_entrada = new Array()
  titulos_saida = new Array()
  vetteste: any[] = ['asd','asd']
  valor_entrada = new Array()
  valor_saida = new Array()
  valor_porcento = new Array()
  saida_total: any
  myChart: any;
  

  @ViewChild('meucanvas',{static:true}) chart: any
 
  constructor(public data: DatabaseService) {
      
    setTimeout(()=>{
      this.canvas = this.chart.nativeElement.getContext('2d')
    console.log(this.chart);
      this.generateGraph()
      
    },1000)
  }

  ionViewWillEnter() {

    this.data.getTitulos().subscribe(res=>{
      this.titulos_entrada = res.entrada
      this.titulos_saida = res.saida
      this.valor_entrada = res.valor_entrada
      this.valor_saida = res.valor_saida
    })
    this.myChart.destroy()
    this.generateGraph()
    this.valor_saida.forEach((item)=>{
      this.valor_porcento.push((item/this.saida_total*-100).toFixed(2))
    })
    console.log('update');
    
  }
  
  ngOnInit(): void{
    this.data.getTitulos().subscribe(res=>{
      this.titulos_entrada = res.entrada
      this.titulos_saida = res.saida
      this.valor_entrada = res.valor_entrada
      this.valor_saida = res.valor_saida
      this.saida_total = res.saida_total
      this.valor_saida.forEach((item)=>{
        this.valor_porcento.push((item/this.saida_total*-100).toFixed(2))
      })
    })
  }

  teste(){
    console.log(this.chart);
  }

  generateGraph(){
    
    this.myChart = new Chart(this.canvas, {
      type: 'pie',
      data: {
          labels: this.titulos_saida,
          datasets: [{
              label: '# of Votes',
              data: this.valor_saida,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  
              ],
              borderWidth: 3
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  
      
  }

}
