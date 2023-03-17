import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Auth, authState, User, user } from '@angular/fire/auth';
import { docData, DocumentData, FirestoreDataConverter, getDoc, QueryDocumentSnapshot, setDoc } from '@angular/fire/firestore';
import { doc, Firestore } from '@firebase/firestore';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';



export interface MiahootUser {
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

  readonly name !: String;
  readonly photoURL !: String;
  private obsMia = new Observable<MiahootUser | undefined>();
  private obsUser = authState(this.auth);

  constructor(private auth: Auth, private fireStore: Firestore) {
      authState(this.auth).pipe(
      filter( u => !!u ),
      map( u => u as User ),
      tap( async u => {
        const docUser =  doc(this.fireStore , `users/${u.uid}`).withConverter(postConverter) ;
        const snapUser = await getDoc( docUser );
        if (!snapUser.exists()) {
          setDoc(docUser, {
            name: u.displayName ?? u.email ?? u.uid,
            photoURL: u.photoURL ?? "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
          } satisfies MiahootUser)
        }
      })
    ).subscribe()
    
    
    this.obsMia = this.obsUser.pipe(
      switchMap((user) => {
        if(user){
          const userRef = doc(this.fireStore , `users/${user.uid}`).withConverter(postConverter)
          const userData$ = docData(userRef)
          
          return userData$;
        } else {
        // Si l'utilisateur est null, retourner l'observable qui publie undefined
        return of(undefined);
        }
      })
    );
  }

}
