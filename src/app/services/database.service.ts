import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dados: any[] = []

  constructor(private fireStore: AngularFirestore) { }

  getteste() {
    const docRef = this.fireStore.collection('teste')

    docRef.get().subscribe((todos) => {
      todos.forEach((data: any) => {
          this.dados.push(data.data());
      });
      
  });
    return this.dados;
}

addEntrada(entrada:any) {

  const docRef =  this.fireStore.doc('teste/asasd')
  const novodado = {
      ...entrada,
  };

  docRef.set(novodado, {
      merge: true,
  })
  
}
}


