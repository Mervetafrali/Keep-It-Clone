import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { MenuController, IonSlides } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { SQLService } from '../services/sql/sql.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  row_data: any = [];
  portals = [];
  validations_form: FormGroup;
  errorMessage: string = '';
  public idd:string;
  public onlineOffline: boolean = navigator.onLine;
  public text: string = 'check your internet';
  public items: Array<{ uname: string; surname:string; mail: string; pass: string ; username:string }> = [];
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private router: Router,
    private sqlService: SQLService,
   
   
 
  ) {this.sqlService.getDbState().subscribe(ready => {
    if (ready) {
      this.getPortals();
    }
  }); }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }
   
   getPortals() {
    this.sqlService.db.executeSql('SELECT * FROM portal').then((rs: any) => {
      this.sqlService.asArray(rs).then((list) => {
        this.portals = list;
        console.log(this.portals);
      });
    });
  }
 
  ngOnInit() {
    
    
 
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
 
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
 

  loginUser(value){
  
      this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        console.log(value.email);
        this.idd=value.email;
        this.router.navigate(['/notes', { id: value.email} ]);
      }, err => {
        this.errorMessage = err.message;
      })
    
  
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }
  public changeText(): void {

    if (!navigator.onLine) {
      this.text='You are offline'
      }else{
        this.text='You are onnline'
      }
   
  }
  goToForgetPage(){
    
    this.navCtrl.navigateForward('/forget');
  }
  
   
  
    
  
 
}