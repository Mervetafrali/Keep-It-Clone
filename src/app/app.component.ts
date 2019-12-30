import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import {LoggerService} from './services/logger.service'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Ana Sayfa',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Notlar',
      url: '/notes',
      icon: 'create'
    },
    {
      title: 'Etiketler',
      url: '/tags',
      icon: 'pricetag'
    }   ,
    {
      title: 'Arşiv',
      url: '/archive',
      icon: 'archive'
    },
    {
      title: 'ToDo',
      url: '/todo',
      icon: 'checkbox'
    },
    {
      title: 'Çıkış',
      url: '/logout',
      icon: 'exit'
    }
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private logger: LoggerService
    
  ) {
    this.initializeApp();
    // Incorrect source file name and line number :(
      logger.invokeConsoleMethod( 'info', 'AppComponent: logger.invokeConsoleMethod()');
      logger.invokeConsoleMethod( 'warn', 'AppComponent: logger.invokeConsoleMethod()');
      logger.invokeConsoleMethod( 'error', 'AppComponent: logger.invokeConsoleMethod()');
  
      // Correct source file name and line number :)
      logger.info('AppComponent: logger.info()');
      logger.warn('AppComponent: logger.warn()');
      logger.error('AppComponent: logger.error()');
  }1

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }
}
