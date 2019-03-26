import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { DatePipe } from '@angular/common';

import { AccountProvider } from '../providers/auth/auth';
import { ZoneProvider } from '../providers/zone/zone';
import { CourseProvider } from '../providers/course/course';
import { ProfileProvider } from '../providers/profile/profile';
import { MyprojectProvider } from '../providers/myproject/myproject';
import { NoticesProvider } from '../providers/notices/notices';
import { ClassesProvider } from '../providers/classes/classes';
import { UnityCampusProvider } from '../providers/unitycampus/unitycampus';
import { ScheduleProvider } from '../providers/schedule/schedule';
import { config } from '../firebase-config';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountProvider,
    DatePipe,
    OneSignal,
    ZoneProvider,
    CourseProvider,
    ProfileProvider,
    MyprojectProvider,
    NoticesProvider,
    ClassesProvider,
    UnityCampusProvider,
    ScheduleProvider
  ]
})
export class AppModule {}
