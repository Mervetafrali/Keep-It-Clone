import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import {Router, ActivatedRoute} from '@angular/router';
import {DataService} from '../data.service';
import { CrudService } from '../crud.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  public onlineOffline: boolean = navigator.onLine;
  public text: string = 'hello';
  sub;
  id;
  pass;
 users:any;
 uname:string;
usurname:string;
 userName:string;
 umail:string;
 upass:string;

  constructor(
 
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public router:Router, 
    public activatedRoute:ActivatedRoute,
    private route: ActivatedRoute,
    public dataService:DataService,
    private crudService: CrudService
   
 
  ) { }
 
  ngOnInit() {
   
    this.crudService.read_Users().subscribe(data => {

      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Surname: e.payload.doc.data()['Surname'],
          Username: e.payload.doc.data()['Username'],
          Mail: e.payload.doc.data()['Mail'],
          Password: e.payload.doc.data()['Password'],
        };
      })
      console.log(this.users);

    });
    
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      surname: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
    

  }
 
 
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'Please enter a valid name.' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' },
      { type: 'minlength', message: 'Please enter a valid surname.' }
    ],
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Usernama must be at least 5 characters long.' }
    ]
  };
 
 
  loginUser(value){
    
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/home');
    }, err => {
      this.errorMessage = err.message;
    })
  }
 
  goToNotePage(){
    this.navCtrl.navigateForward('/home');
  }
  public changeText(): void {

    
    this.sub = this.route.params.subscribe(params => {
      this.id = params['mail']; this.pass=params['password'] });
      

      this.text=this.id+this.pass;
   
   
  }
  CreateRecord() {
    let record = {};
    record['Name'] = this.uname;
    record['Surname'] = this.usurname;
    record['Username'] = this.userName;
    record['Mail'] = this.umail;
    record['Password'] = this.upass;
    this.crudService.create_NewUser(record).then(resp => {
      this.uname = "";
      this.usurname ="";
      this.userName = "";
      this.umail = "";
      this.upass = "";

      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_User(rowID);
  }

 /* EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }
s
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }*/


 
  
 
}