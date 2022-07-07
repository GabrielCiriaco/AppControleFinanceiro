import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  
  
  constructor( public data: DatabaseService) {
    this.entrada = new dataClass();
    this.saida = new dataClass();
    
    this.data.getSaldo().subscribe(res =>{ 
      console.log(res)
      this.saldo = {...res}
      this.saldoExibido = this.saldo.saldo
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
    
    this.entrada.data = new Date(parseInt(`${this.entrada.data}`.split('-')[0]),parseInt(`${this.entrada.data}`.split('-')[1]),parseInt(`${this.entrada.data}`.split('-')[2]),new Date().getHours(),new Date().getMinutes(),new Date().getSeconds())
    this.modalList.toArray()[modal].dismiss(this.entrada, 'confirm-entrada');
    console.log(this.entrada);
    
  }

// Confirmação de movimentação saida ------------------------------------------------------------------------------
  confirmSaida(modal:number) {
    this.saida.data = new Date(parseInt(`${this.saida.data}`.split('-')[0]),parseInt(`${this.saida.data}`.split('-')[1]),parseInt(`${this.saida.data}`.split('-')[2]),new Date().getHours(),new Date().getMinutes(),new Date().getSeconds())
    this.modalList.toArray()[modal].dismiss(this.saida, 'confirm-saida');
    
  }

 // Ao fechar o Modal ---------------------------------------------------------------------------------------------
  onWillDismiss(event: Event) {
    
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

    if (ev.detail.role === 'confirm-entrada') {
      this.entrada.tipo = 'entrada'
      let novoSaldo = this.saldoExibido + this.entrada.valor
      this.data.updateSaldo(novoSaldo)
      console.log('soma:', novoSaldo);
      
      this.data.addEntrada({...this.entrada})
    }

    if (ev.detail.role === 'confirm-saida') {
      this.saida.tipo = 'saida'
      let novoSaldo = this.saldoExibido - this.saida.valor
      this.data.updateSaldo(novoSaldo)
      console.log('soma:', novoSaldo);
      this.data.addSaida({...this.saida})
    }

    this.entrada = new dataClass();
    this.saida = new dataClass();

  }


  teste(){
  }
}
