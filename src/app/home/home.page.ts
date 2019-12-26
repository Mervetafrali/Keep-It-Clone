import { Component } from '@angular/core';
import { SQLService } from '../services/sql/sql.service';
import { MenuController, IonSlides } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  portals = [];
  capturedSnapURL:string;
 
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(private sqlService: SQLService,
    public menuCtrl: MenuController, private navCtrl: NavController,private camera: Camera,public fAuth: AngularFireAuth, private router: Router,
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
    this.sqlService.db.executeSql('SELECT * FROM portal').then((rs: any) => {
      this.sqlService.asArray(rs).then((list) => {
        this.portals = list;
        console.log(this.portals);
      });
    });
  }
  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {
      
      console.log(err);
      // Handle error
    });
  }
  logout() {
   
    return this.fAuth.auth.signOut().then(() => {
      this.navCtrl.navigateForward('/');
    })
  }
}
