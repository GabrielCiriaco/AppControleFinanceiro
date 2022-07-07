import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

   extrato : any[] = []
   saldo: any
   
   
   
  

  constructor(private data: DatabaseService) {

    this.data.getExtrato().subscribe(res=>{
      console.log(res);
      this.extrato = res
      
    })
   }
   
}



