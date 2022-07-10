import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { IonModal } from '@ionic/angular';

import { dataClass } from '../models/dataClass';
import { dataModel } from '../models/dataModel';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChildren(IonModal) modalList: QueryList<IonModal>;
  
  entrada: dataClass
  saida: dataClass
  saldo: any
  saldoExibido: number = 0
  titulos_entrada = new Array()
  titulos_saida = new Array()
  valor_entrada = new Array()
  valor_saida = new Array()
  saida_total:any
  blur:string = 'desfocado'

  @ViewChild('Icone') icon: any
  
  constructor( public data: DatabaseService) {
    this.entrada = new dataClass();
    this.saida = new dataClass();

   
    
    
    this.data.getSaldo().subscribe(res =>{ 
      console.log(res)
      this.saldo = {...res}
      this.saldoExibido = this.saldo.saldo
    })

    this.data.getTitulos().subscribe(res=>{
      this.titulos_entrada = res.entrada
      this.titulos_saida = res.saida
      this.valor_entrada = res.valor_entrada
      this.valor_saida = res.valor_saida
      this.saida_total = res.saida_total
      
    })

  }

// Setando Parametros ao abrir página -----------------------------------------------------------------------------
  async ionViewWillEnter(): Promise<void>{
    
  }

// Cancelando abertura de Modal ----------------------------------------------------------------------------------
  cancel(modal:number) {
    this.modalList.toArray()[modal].dismiss(null, 'cancel');
  
  }

// Confirmação de movimentação entrada ---------------------------------------------------------------------------
  confirmEntrada(modal:number) {
    
    this.entrada.data = `${this.entrada.data}` 
    this.modalList.toArray()[modal].dismiss(this.entrada, 'confirm-entrada');
    console.log(this.entrada);
    
  }

// Confirmação de movimentação saida ------------------------------------------------------------------------------
  confirmSaida(modal:number) {
    this.saida.data = `${this.saida.data}`
    this.modalList.toArray()[modal].dismiss(this.saida, 'confirm-saida');
    
  }

 // Ao fechar o Modal ---------------------------------------------------------------------------------------------
  onWillDismiss(event: Event) {
    
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

    if (ev.detail.role === 'confirm-entrada') {
      this.entrada.tipo = 'entrada'
      let novoSaldo = this.saldoExibido*100 + this.entrada.valor*100
      this.data.updateSaldo(novoSaldo/100)

      console.log('soma:', novoSaldo);
      this.data.addEntrada({...this.entrada})

    }

    if (ev.detail.role === 'confirm-saida') {
      this.saida.tipo = 'saida'
      let novoSaldo = this.saldoExibido*100 - this.saida.valor*100
      this.data.updateSaldo(novoSaldo/100);
      this.saida_total -= this.saida.valor 
      this.data.updateSaidaTota({ ...{entrada: this.titulos_entrada}, ...{saida: this.titulos_saida}, ...{saida_total:this.saida_total},...{valor_entrada: this.valor_entrada}, ...{valor_saida: this.valor_saida}})
       
      this.data.addSaida({...this.saida})

      this.titulos_saida.forEach((item, index)=>{
        if( this.saida.titulo === item){
          this.valor_saida[index] += this.saida.valor
          console.log(this.valor_saida[index]);
          this.data.updateTitulo({ ...{entrada: this.titulos_entrada}, ...{saida: this.titulos_saida}, ...{saida_total:this.saida_total},...{valor_entrada: this.valor_entrada}, ...{valor_saida: this.valor_saida}})
        }
      
    })
    
    }
    
    this.entrada = new dataClass();
    this.saida = new dataClass();

  

  }
  
// Ao fechar o Modal ---------------------------------------------------------------------------------------------
  changeFocus(){
    if(this.blur =='focado'){
      this.blur = 'desfocado'
      
      this.icon.name = 'eye-off-outline'
      console.log(this.icon.name);
      
     
    }
    else{
      this.blur = 'focado'
      this.icon.name = 'eye-outline'
    }
      
  }


}
