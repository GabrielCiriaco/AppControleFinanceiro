import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  Firestore, collectionData, addDoc, doc, docData,updateDoc } from '@angular/fire/firestore';

import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { dataModel } from '../models/dataModel';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dados = new Array()

  constructor(private firestore: Firestore) { }


// Recuperando saldo ----------------------------------------------------------------------------------------------
  getSaldo(): Observable<dataModel[]> {

    const saldoRef = doc(this.firestore, 'wallet/dados')
    return docData(saldoRef, {idField: 'id'}) as Observable<dataModel[]>
  }

// Atualizando saldo ----------------------------------------------------------------------------------------------
  updateSaldo(novoSaldo:number){
    
    const saldoRef = doc(this.firestore, 'wallet/dados')
    return updateDoc(saldoRef, {saldo: novoSaldo}) 
    
  }

// Recuperando extrato --------------------------------------------------------------------------------------------
  getExtrato(): Observable<dataModel[]> {

    const extratoRef = collection(this.firestore, 'teste')
    return collectionData(extratoRef, {idField: 'id'}) as Observable<dataModel[]>
  }

// Adicionando entrada --------------------------------------------------------------------------------------------
  addEntrada(entrada:any) {
       
    const docRef = collection(this.firestore, 'teste' )  
    return addDoc(docRef, entrada)
  }

// Adicionando saida ----------------------------------------------------------------------------------------------
  addSaida(saida:any) {
    

    const docRef = collection(this.firestore, 'teste' )  
    return addDoc(docRef, saida)
  }

}


