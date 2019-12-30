import { Component, OnInit } from '@angular/core';
import { SQLService } from "../../services/sql/sql.service";

@Component({
  selector: 'app-select',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
})
export class SelectPage implements OnInit {

  portals = [];
  users = [];
  constructor(private sqlService: SQLService) { }

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

}
