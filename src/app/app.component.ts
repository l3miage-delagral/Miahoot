import { ChangeDetectionStrategy, Component} from '@angular/core';
import { firebaseApp$ } from '@angular/fire/app';
import { Auth, authState, signOut, User, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getDoc } from 'firebase/firestore';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService, MiahootUser } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly user: Observable<MiahootUser | undefined>;
  public bsIsAuth = new BehaviorSubject<boolean>(false)
    
  constructor(private auth: Auth, 
              private firestore: Firestore, 
              private dataService: DataService, 
              private fb: FormBuilder) {

    this.user = dataService.obsMiahootUser$;
    
  }

  async login() {
    this.bsIsAuth.next(true);
    
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
    try {
      await signInWithPopup(this.auth, googleProvider);
    }catch (err) {
      console.log(err)
    }
    
    this.bsIsAuth.next(false);
  }


  async logout() {
    return signOut(this.auth);
  }

}