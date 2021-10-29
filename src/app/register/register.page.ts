import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseAuthServiceService } from '../firebase-auth-service.service';
import {AngularFireDatabase} from '@angular/fire/compat/database'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'name': [
      { type: 'required', message: 'name is required.' },
      { type: 'pattern', message: 'Enter your name.' }
    ],
    'prenom': [
      { type: 'required', message: 'prenom is required.' },
      { type: 'pattern', message: 'Enter your firstname.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };


  constructor(
    private navCtrl: NavController,
    private authService: FirebaseAuthServiceService,
    private formBuilder: FormBuilder,
    private afdt : AngularFireDatabase
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
        
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  
  



  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.afdt.object('users/' + res.user.uid).set({
          name: value.name,
          prenom: value.prenom,
          email: value.email,
          uid: res.user.uid,
          password: value.password,
          profil : " ",
          date_ajout: Date.now(),
        })
        this.successMessage = "Your account has been created. Please log in.";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

}
