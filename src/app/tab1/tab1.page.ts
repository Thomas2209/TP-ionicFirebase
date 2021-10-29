import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private userListe: any;

  constructor(private firebase: AngularFireDatabase) {

    firebase.list('users/').valueChanges().subscribe(
      (res)=>{
        this.userListe = res;
      }
    )
  }

}
