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
  
  constructor( public data: DatabaseService) {
    this.entrada = new EntradaModel();
    this.saida = new SaidaModel();
  }

  cancel(modal:number) {
    this.modalList.toArray()[modal].dismiss(null, 'cancel');
    
  }

  confirmEntrada(modal:number) {
    
    this.modalList.toArray()[modal].dismiss(this.entrada, 'confirm');
    this.data.addEntrada(this.entrada)
  }

  confirmSaida(modal:number) {
    
    this.modalList.toArray()[modal].dismiss(this.saida, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

    if (ev.detail.role === 'confirm') {
      console.log(ev.detail);

    }



  }

  teste(){
    
    console.log(this.entrada);
    
    console.log(this.modalList.toArray());
    
    console.log(this.data.getteste());
    
    
  }
}
