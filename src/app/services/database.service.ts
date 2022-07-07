import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dados = new Array()

  constructor(private fireStore: AngularFirestore) { }

// Recuperando saldo ----------------------------------------------------------------------------------------------
  async getSaldo() {
    let dados = [];
    const docRef =  await this.fireStore.collection('wallet')
    await docRef.get().subscribe( array =>{
      array.forEach(item=>{
        dados.push(item.data())
      });
    })
    return dados;
  }

// Recuperando extrato --------------------------------------------------------------------------------------------
  async getExtrato() {

    let dados = []
    const docRef = this.fireStore.collection('teste')
    
    docRef.get().subscribe( array =>{
      array.forEach(item=>{

        dados.push(item.data());
      });
    })

    return dados
  }

// Adicionando entrada --------------------------------------------------------------------------------------------
  addEntrada(entrada:any) {
    
    const uid = uuidv4();
    entrada.uid =uid
    const docRef =  this.fireStore.doc(`teste/${uid}`)
    const novodado = {
        ...entrada,
    };

    docRef.set(novodado, {
      merge: true,
    }) 
  }

// Adicionando saida ----------------------------------------------------------------------------------------------
  addSaida(saida:any) {
    
    const uid = uuidv4();
    saida.uid =uid
    const docRef =  this.fireStore.doc(`teste/${uid}`)
    const novodado = {
      ...saida,
    };

    docRef.set(novodado, {
        merge: true,
    }) 
  }

}


