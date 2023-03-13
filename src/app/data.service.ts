import { Injectable } from '@angular/core';
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';



interface MiahootUser {
  readonly name: String;
  readonly photoURL: String;
}

const postConverter: FirestoreDataConverter<MiahootUser> = {
  toFirestore(MiahootUser: MiahootUser): DocumentData {
    return { ...MiahootUser};
  },

  fromFirestore(snapshot: QueryDocumentSnapshot): MiahootUser {
    const name = snapshot.get('name') ?? '';
    const photoURL = snapshot.get('photoURL') ?? '';
    return {name, photoURL};
  },
};

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }
}


