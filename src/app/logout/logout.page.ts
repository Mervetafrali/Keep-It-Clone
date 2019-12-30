import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private navCtrl: NavController,public fAuth: AngularFireAuth) { this.logout()}

  ngOnInit() {
  }
  logout() {

    return this.fAuth.auth.signOut().then(() => {
      this.navCtrl.navigateForward('/');
    })
  }

}
