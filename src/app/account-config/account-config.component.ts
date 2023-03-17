import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';
import { DataService, MiahootUser } from '../data.service';


@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent {
  
  private user!: MiahootUser;
  private newName!: string;

  constructor(private userDataService: DataService){
    this.fireStore.then(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  updateName() {
    if (this.user && this.newName) {
      const userRef = this.userDataService.uid;
      updateDoc(userRef, { name: this.newName });
    }
  }

}
