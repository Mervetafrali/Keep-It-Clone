import { Component } from '@angular/core';
import { SQLService } from '../services/sql/sql.service';
import { MenuController, IonSlides } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text = "mail";
  portals = [];
  users = [];
  constructor(private sqlService: SQLService,
    public menuCtrl: MenuController, 
    private navCtrl: NavController, 
    public fAuth: AngularFireAuth, 
    private router: Router, 
    private nativeStorage: NativeStorage,
  ) {
    this.sqlService.getDbState().subscribe(ready => {
      if (ready) {
        this.getPortals();
      }
    });
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  getPortals() {
    this.sqlService.db.executeSql('SELECT * FROM users').then((rs: any) => {
      this.sqlService.asArray(rs).then((list) => {
        this.users = list;
        console.log(this.users);
      });
    });
  }
  ngOnInit() {
    this.sqlService.getDbState().subscribe(ready => {
      if (ready) {
        this.getPortals();
      }
    });
  }

  logout() {

    return this.fAuth.auth.signOut().then(() => {
      this.navCtrl.navigateForward('/');
    })
  }
  public changeText(): void {
    this.nativeStorage.getItem('loginitem')
      .then(
        data => {
          console.log(data.mailad)
          this.text = data.mailad;
        },
        error => console.error(error)
      );


  }
}
