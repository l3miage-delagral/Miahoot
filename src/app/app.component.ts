import { ChangeDetectionStrategy, Component} from '@angular/core';
import { Auth, authState, signOut, User, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly user: Observable<User | null> = EMPTY;
  public bsIsAuth = new BehaviorSubject<boolean>(false)

  constructor(private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      
    }
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