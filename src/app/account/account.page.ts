import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
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
  users: any;
  uname: string;
  usurname: string;
  userName: string;
  umail: string;
  upass: string;
  arttir:string;

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    public dataService: DataService,
    private crudService: CrudService


  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['mail']; this.pass=params['password'] });
      
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
  }
  CreateRecord() {
    
    let record = {};
    record['Name'] = this.uname;
    record['Surname'] = this.usurname;
    record['Username'] = this.userName;
    record['Mail'] = this.id;
    record['Password'] = this.pass;
    this.crudService.create_NewUser(record).then(resp => {
      this.uname = "";
      this.usurname ="";
      this.userName = "";
      this.umail = "";
      this.upass = "";
      this.navCtrl.navigateForward('/home');
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }



}











