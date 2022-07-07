import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

   extrato : any[] = []
   
  

  constructor(private data: DatabaseService) { }
  

  async ionViewWillEnter(): Promise<void>{
    this.extrato = []
    this.extrato = await this.data.getExtrato()
  }
   
}



