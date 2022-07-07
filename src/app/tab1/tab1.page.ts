import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { IonModal } from '@ionic/angular';
import { EntradaModel } from '../models/entradaModel';
import { SaidaModel } from '../models/saidaModel';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChildren(IonModal) modalList: QueryList<IonModal>;
  
  entrada: EntradaModel
  saida: SaidaModel
  saldo: any
  
  
  constructor( public data: DatabaseService) {
    this.entrada = new EntradaModel();
    this.saida = new SaidaModel();
  }

// Setando Parametros ao abrir página -----------------------------------------------------------------------------
  async ionViewWillEnter(): Promise<void>{
    
    this.saldo = await this.data.getSaldo()

    console.log(this.saldo.splice(0,0));
    
  }

// Cancelando abertura de Modal ----------------------------------------------------------------------------------
  cancel(modal:number) {
    this.modalList.toArray()[modal].dismiss(null, 'cancel');
  
  }

// Confirmação de movimentação entrada ---------------------------------------------------------------------------
  confirmEntrada(modal:number) {
    
    this.entrada.data = new Date(parseInt(`${this.entrada.data}`.split('-')[0]),parseInt(`${this.entrada.data}`.split('-')[1]),parseInt(`${this.entrada.data}`.split('-')[2]),new Date().getHours(),new Date().getMinutes(),new Date().getSeconds())
    this.modalList.toArray()[modal].dismiss(this.entrada, 'confirm-entrada');
    
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
      this.data.addEntrada(this.entrada)
    }

    if (ev.detail.role === 'confirm-saida') {
      this.data.addSaida(this.saida)
    }

    this.entrada = new EntradaModel();
    this.saida = new SaidaModel();
  }


  teste(){
  }
}
