import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { updateDoc } from '@firebase/firestore';
import { DataService, MiahootUser } from '../data.service';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent {
  
  user !: MiahootUser;
  public fg: FormGroup<{ 
    name:      FormControl<string>, 
    photoURL:  FormControl<string> 
    photoFile: FormControl<File | undefined> 
    }>;
  
  constructor(private dataUserService : DataService, private fs : Firestore, private fb: FormBuilder){
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
    
    this.fg = fb.nonNullable.group({
      name: [""],
      photoURL: [""],
      photoFile: [undefined as undefined | File]
    })
  }
}