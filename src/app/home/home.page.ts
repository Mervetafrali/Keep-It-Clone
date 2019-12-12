import { Component } from '@angular/core';
import { SQLService } from '../services/sql/sql.service';
import { MenuController, IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  portals = [];

  constructor(private sqlService: SQLService,
    public menuCtrl: MenuController
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
}
