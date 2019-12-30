import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { SQLService } from '../services/sql/sql.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
 
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  private mail='merve';
  private pass;
  
  users = [];
 
  
 
  validation_messages = {
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
    private sqlService: SQLService,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private nativeStorage: NativeStorage,
   
    
   
    
  ) {}
 
  ngOnInit(){
    this.sqlService.getDbState().subscribe(ready => {
      if (ready) {
        this.getPortals();
      }
    });
    this.validations_form = this.formBuilder.group({
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
  getPortals2(mail,pass) {
    
    var sql = "INSERT INTO `users` (mailadd,upas) VALUES ('"+mail+"','"+ pass+"')";
    
     this.sqlService.db.executeSql(sql,{})
     .then(() => console.log("başarılı"))
     .catch(e => console.log("başarısız"));

  }
  getPortals() {
    this.sqlService.db.executeSql('SELECT * FROM users').then((rs: any) => {
      this.sqlService.asArray(rs).then((list) => {
        this.users = list;
        console.log(this.users);
      });
    });
  }
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
       this.getPortals2(value.email,value.password);
       this.router.navigate(['/account', { mail: value.email ,password:value.password}]);
       
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
  
  goLoginPage(){
    this.navCtrl.navigateForward('/');
  }
 
 
}