import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';
import { DataService, MiahootUser } from '../data.service';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent {
  
  user !: MiahootUser;

  
  constructor(private dataUserService : DataService, private fs : Firestore){
    this.dataUserService.obsMiahootUser$.subscribe(
      u => {if( u === undefined){
        this.user = {
          name : "",
          photoUrl:""
        }
      } else {
        this.user = u
      }
    }
    )
    async (u : User) => {
      await updateDoc(doc(this.fs,"users",u.uid),{
        foo : 'bar'
      })
    }
  }
}