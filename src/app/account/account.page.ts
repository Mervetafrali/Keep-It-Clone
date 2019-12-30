import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CrudService } from '../crud.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
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
  arttir: string;
  capturedSnapURL: string;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  // Upload Task 
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  //Uploaded Image List
  images: Observable<MyData[]>;

  //File details  
  fileName: string;
  fileSize: number;

  //Status check 
  isUploading: boolean;
  isUploaded: boolean;
  private imageCollection: AngularFirestoreCollection<MyData>;
  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public router: Router,
    private camera: Camera,
    public activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    public dataService: DataService,
    private crudService: CrudService,
    private storage: AngularFireStorage, private database: AngularFirestore,private nativeStorage: NativeStorage


  ) {
    
  this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();
    
  }
  clear() {
    this.nativeStorage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id = params['mail']; this.pass = params['password']
    });
    
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
  CreateRecord() {

    let record = {};
    record['Name'] = this.uname;
    record['Surname'] = this.usurname;
    record['Username'] = this.userName;
    record['Mail'] = this.id;
    record['Password'] = this.pass;
    this.crudService.create_NewUser(record).then(resp => {
      this.uname = "";
      this.usurname = "";
      this.userName = "";
      this.umail = "";
      this.upass = "";
      this.nativeStorage.setItem('loginitem', { mailad: this.id, passad: this.pass })
          .then(
            (data) => console.log('Stored first item!', data),
            error => console.error('Error storing item', error)
          );
      this.navCtrl.navigateForward('/home');
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  uploadFile(event: FileList) {


    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;

    // The storage path
    const path = `freakyStorage/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };

    //File reference
    const fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();

        this.UploadedFileURL.subscribe(resp => {
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        })
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();

    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }


}











