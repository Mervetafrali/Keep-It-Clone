import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CrudService } from '../module-160202100/notes/crudnotes.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {
  notes:any;
  nBaslik :string;
  nIcerik :string;
  nArsiv: boolean;
  nCop:boolean;
  nDate:string;
  nEtiket:string;
  isEdit:false;
  nHatirlaticiB:boolean;
  nHatirlatici:string;
  nDd:string;
  nTt:string;
  etikets:string[]=[];
  etiket:any;
  Name:string;
  myDate:string;
  myTime:string;
  myDateNTime:string;
  repeat: 'daily' | 'friday' = 'friday';
  notifyAt: string;

  isCordova: boolean;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    public dataService: DataService,
    private crudService: CrudService,
    private datePicker: DatePicker,
    private platform: Platform, 
    private localNotifications: LocalNotifications
  ) { this.notifyAt = new Date().toISOString();
    this.isCordova = this.platform.is('cordova'); }

  ngOnInit() {
    this.crudService.read_Notes().subscribe(data => {

      this.notes = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nBaslik: e.payload.doc.data()['nBaslik'],
          nIcerik: e.payload.doc.data()['nIcerik'],
          nArsiv: e.payload.doc.data()['nArsiv'],
          nCop: e.payload.doc.data()['nCop'],
          nDate: e.payload.doc.data()['nDate'],
          nEtiket: e.payload.doc.data()['nEtiket'],
          nHatirlaticiB: e.payload.doc.data()['nHatirlaticiB'],
          nHatirlatici: e.payload.doc.data()['nHatirlatici'],
          
        };
      })
      console.log(this.notes);

    });
    this.crudService.get_Tags().subscribe(data => {

      this.etiket = data.map(e => {
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['Name'],
          
        };
      })

    });

  }
  RemoveRecord(rowID) {
    this.crudService.delete_Notes(rowID);
  }

  EditRecord(record) {
    const now = new Date();
    record.isEdit = true;
    record.EditnBaslik = record.nBaslik;
    record.EditnIcerik = record.nIcerik;
    //record.EditnArsiv = false;
   // record.EditnCop = false;
   // record.EditnDate = now.toISOString();
    record.EditnEtiket = record.nEtiket;
   // record.EditnHatirlatici=record.EditnDaate+record.EditnTime;
    //record.EditnHatirlatici = record.nHatirlatici;
    record.EditnHatirlaticiB = record.nHatirlaticiB;
    
  }
 Archive(recordRow){
  const now = new Date();
  let record = {};
  record['nBaslik'] = recordRow.EditnBaslik;
  record['nIcerik'] = recordRow.EditnIcerik;
  record['nArsiv'] = true;
  record['nCop'] = false;
  record['nDate'] = now.toISOString();   
  record['nEtiket'] = recordRow.EditnEtiket;
  record['nHatirlatici'] = "";
  record['nHatirlaticiB'] = false;

  this.crudService.update_Notes(recordRow.id, record);
  recordRow.isEdit = false;
  
 }
 Reminders(recordRow){
  const now = new Date();
  let record = {};
  record['nBaslik'] = recordRow.EditnBaslik;
  record['nIcerik'] = recordRow.EditnIcerik;
  record['nArsiv'] = false;
  record['nCop'] = false;
  record['nDate'] = now.toISOString();   
  record['nEtiket'] = recordRow.EditnEtiket;
  record['nHatirlatici'] = "";
  record['nHatirlaticiB'] =false;

  this.crudService.update_Notes(recordRow.id, record);
  recordRow.isEdit = false;
  
 }
  UpdateRecord(recordRow) {
    const now = new Date();
    let record = {};
    record['nBaslik'] = recordRow.EditnBaslik;
    record['nIcerik'] = recordRow.EditnIcerik;
    record['nArsiv'] = false;
    record['nCop'] = false;
    record['nDate'] = now.toISOString();   
    record['nEtiket'] = recordRow.EditnEtiket;
    record['nHatirlatici'] = recordRow.EditnDaate+recordRow.EditnTime;;
    record['nHatirlaticiB'] = true;
    this.crudService.update_Notes(recordRow.id, record);
    recordRow.isEdit = false;
  }
  
  showDatepicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      okText:"Save Date",
      todayText:"Set Today"
    }).then(
      date => {
        this.myDate = date.getDate()+"/"+date.toLocaleString('default', { month: 'long' })+"/"+date.getFullYear();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }  
 
 
  showTimepicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
      okText:"Save Time",
      nowText:"Set Now"
    }).then(
      time => {
        this.myTime =  time.getHours()+":"+time.getMinutes();
      },
      err => console.log('Error occurred while getting time: ', err)
    );
  }  
 
 
  showDateTimepicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_TRADITIONAL,
      doneButtonLabel:"Save Date & Time",
      is24Hour:false
    }).then(
      dateTime => {
        this.myDateNTime = dateTime.getDate()+"/"+dateTime.toLocaleString('default', { month: 'long' })+"/"+dateTime.getFullYear()+" "+dateTime.getHours()+":"+dateTime.getMinutes();
      },
      err => console.log('Error occurred while getting dateTime: ', err)
    );
  }  
  onSchedule() {
    const timeAt = new Date(this.notifyAt);
    const hour = timeAt.getHours();
    const minute = timeAt.getMinutes();

    const title = 'Notify...';
    const text = 'Hi, this is test notification.';
    // const sound = this.platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf';

    if (this.isCordova) {
      switch (this.repeat) {
          case 'daily':

            const notifications: ILocalNotification[] = Array(7).fill(0).map((_, idx) => {
                return { title, text, trigger: { every: {weekday: idx + 1, hour, minute} }
              };
            });

            this.localNotifications.schedule(notifications);
            break;
          case 'friday':

            const notification: ILocalNotification = { title, text, trigger: { every: {weekday: 5, hour, minute} } };

            this.localNotifications.schedule(notification);
            break;
          default:

            this.localNotifications.schedule({ title, text, trigger: { at: timeAt } });
            break;
        }
    }
  }

  onCancel() {
    if (this.isCordova) {
      this.localNotifications.cancelAll();
    }
  }


}
