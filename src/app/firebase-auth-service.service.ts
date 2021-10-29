import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth/';
import {AngularFireDatabase} from '@angular/fire/compat/database'



@Injectable({
  providedIn: 'root'
 

})
export class FirebaseAuthServiceService {

  constructor(private angularFire: AngularFireAuth) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.angularFire.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))

    })

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFire.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFire.currentUser) {
        this.angularFire.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.angularFire.user
  }

  /**
   * 

  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const scopes = ['profile', 'email'];
    return this.socialSignIn(provider.providerId, scopes);
  }
  * 
   */
  

  /**
   * 


  socialSignIn(providerName: string, scopes?: Array<string>): Promise<any> {
    const provider = new auth.OAuthProvider(providerName);
  
    // add any permission scope you need
    if (scopes) {
      scopes.forEach(scope => {
        provider.addScope(scope);
      });
    }
  
    if (this.platform.is('desktop')) {
      return this.angularFire.signInWithPopup(provider);
    } else {
      // web but not desktop, for example mobile PWA
      return this.angularFire.signInWithRedirect(provider);
    }
  }
   */

}
