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
      u => {
        if( u === undefined){
        this.fg.controls.name.setValue("")
        this.fg.controls.photoURL.setValue("https://cdn-icons-png.flaticon.com/512/1077/1077012.png")
        this.fg.controls.photoFile.setValue(undefined)
      } else {
        this.fg.controls.name.setValue(u.name)
        this.fg.controls.photoURL.setValue(u.photoUrl)
        this.fg.controls.photoFile.setValue(undefined)
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

  update(){
    this.dataUserService.update({
      name: this.fg.controls.name.value,
      photoUrl: this.fg.controls.photoURL.value,
    })
  }
}