import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { IonModal } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  extrato : any[] = []
  saldo: any
  teste: any = 1
  @ViewChild(IonModal) modal: IonModal;
  isModalOpen = false;
  detalhes: any

  saldoExibido: number = 0
  titulos_entrada = new Array()
  titulos_saida = new Array()
  valor_entrada = new Array()
  valor_saida = new Array()
  saida_total:any
   
  
  constructor(private data: DatabaseService, private alertController: AlertController) {
    
    this.data.getExtrato().subscribe(res=>{
      
      this.extrato = res
      this.extrato.sort((a,b)=>{

      return new Date(b.data).getTime() - new Date(a.data).getTime()
      });
    })

    
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
   
  converteData(data:any){

    let novaData = `${data.split('-')[2]} / ${data.split('-')[1]}`
    
    return novaData

  }

  setOpen(isOpen: boolean, item?: any) {
    this.isModalOpen = isOpen;
    if(item){
      this.detalhes = item;
    }
  }
  
  async delete() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          
          
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => { 
            if(this.detalhes.tipo =='entrada'){
              let novoSaldo = this.saldoExibido*100 - this.detalhes.valor*100
              this.data.updateSaldo(novoSaldo/100);
            }
            else{
              let novoSaldo = this.saldoExibido*100 + this.detalhes.valor*100
              this.data.updateSaldo(novoSaldo/100);

              this.titulos_saida.forEach((item, index)=>{
                if( this.detalhes.titulo === item){
                  this.valor_saida[index] -= this.detalhes.valor
                  this.saida_total += this.detalhes.valor 
                  this.data.updateTitulo({ ...{entrada: this.titulos_entrada}, ...{saida: this.titulos_saida}, ...{saida_total:this.saida_total},...{valor_entrada: this.valor_entrada}, ...{valor_saida: this.valor_saida}})
                  return
                }
              })
            }
            this.data.deleteMovimento(this.detalhes)
            this.setOpen(false)
            

           }
        }
      ]
    });

    await alert.present();


  }
}



