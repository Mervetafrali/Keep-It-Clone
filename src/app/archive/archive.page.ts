import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CrudService } from '../module-160202100/notes/crudnotes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
  notes:any;
  nBaslik :string;
  nIcerik :string;
  nArsiv: boolean;
  nCop:boolean;
  nDate:string;
  nEtiket:string;
  isEdit:false;
  etikets:string[]=[];
  etiket:any;
  Name:string;

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
  }
 Archive(recordRow){
  const now = new Date();
  let record = {};
  record['nBaslik'] = recordRow.EditnBaslik;
  record['nIcerik'] = recordRow.EditnIcerik;
  record['nArsiv'] = false;
  record['nCop'] = false;
  record['nDate'] = now.toISOString();   
  record['nEtiket'] = recordRow.EditnEtiket;
  this.crudService.update_Notes(recordRow.id, record);
  recordRow.isEdit = false;
  
 }
  UpdateRecord(recordRow) {
    const now = new Date();
    let record = {};
    record['nBaslik'] = recordRow.EditnBaslik;
    record['nIcerik'] = recordRow.EditnIcerik;
    record['nArsiv'] = true;
    record['nCop'] = false;
    record['nDate'] = now.toISOString();   
    record['nEtiket'] = recordRow.EditnEtiket;
    this.crudService.update_Notes(recordRow.id, record);
    recordRow.isEdit = false;
  }
  

}
