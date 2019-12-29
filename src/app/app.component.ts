import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Portal',
      url: '/portal',
      icon: 'grid'
    },
    {
      title: 'Player',
      url: '/player',
      icon: 'musical-notes'
    },
    {
      title: 'Notes',
      url: '/notes',
      icon: 'create'
    },
    {
      title: 'Tags',
      url: '/tags',
      icon: 'pricetag'
    }   ,
    {
      title: 'Archive',
      url: '/archive',
      icon: 'archive'
    },
    {
      title: 'Reminders',
      url: '/reminders',
      icon: 'notifications'
    },
    {
      title: 'ToDo',
      url: '/todo',
      icon: 'checkbox'
    }
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    
  ) {
    this.initializeApp();
  }1

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }
}
