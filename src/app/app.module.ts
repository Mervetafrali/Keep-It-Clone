import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { PortalModule } from './portal/portal.module';
import { PlayerModule } from "./player/player.module";
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Camera } from '@ionic-native/camera/ngx'
import { File } from '@ionic-native/file/ngx';
import * as firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    PortalModule,
    PlayerModule,
    ReactiveFormsModule,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AngularFireAuthModule, HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
   
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera,
    AuthenticateService,
    DatePicker,
    LocalNotifications,
    File,
    AngularFireAuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite, NativeStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
