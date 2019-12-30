import { Component, OnInit } from '@angular/core';
import { SQLService } from '../services/sql/sql.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  users = [];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private sqlService: SQLService) {
    /*
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/
  }
  getPortals() {
    this.sqlService.db.executeSql('SELECT * FROM users').then((rs: any) => {
      this.sqlService.asArray(rs).then((list) => {
        this.users = list;
        console.log(this.users);
      });
    });
  }
  getNotes() {
    this.sqlService.db.executeSql('SELECT * FROM note').then((rs: any) => {
      this.sqlService.asArray(rs).then((list) => {
        this.items = list;
        console.log(this.items);
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
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
