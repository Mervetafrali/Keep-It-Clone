import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  arttir:string;
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 
  create_NewUser(record) {
    return this.firestore.collection('Users').add(record);
  }
 
  read_Users() {
    return this.firestore.collection('Users').snapshotChanges();
  }
 
  update_User(recordID,record){
    this.firestore.doc('Users/' + recordID).update(record);
  }
 
  delete_User(record_id) {
    this.firestore.doc('Users/' + record_id).delete();
  }
  create_NewNotes(record) {
    return this.firestore.collection('Notes').add(record);
  }
 
  read_Notes() {
    return this.firestore.collection('Notes').snapshotChanges();
  }
 
  update_Notes(recordID,record){
    this.firestore.doc('Notes/' + recordID).update(record);
  }
 
  delete_Notes(record_id) {
    this.firestore.doc('Notes/' + record_id).delete();
  }
}
 
