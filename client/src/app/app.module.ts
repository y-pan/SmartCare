import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { ConfigService} from './services/config.service';
import {DataService} from './services/data.service';
import {MessageService} from './services/message.service';
import { NavComponent } from './components/nav/nav.component';
import { ArrayContainsPipe } from './array-contains.pipe';
import { VitalsignComponent } from './components/vitalsign/vitalsign.component';
import { TipsComponent } from './components/tips/tips.component';
import { SetvitalsignComponent } from './components/setvitalsign/setvitalsign.component';
import { SendtipsComponent } from './components/sendtips/sendtips.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    ArrayContainsPipe,
    VitalsignComponent,
    TipsComponent,
    SetvitalsignComponent,
    SendtipsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [DataService, ConfigService, MessageService],
  bootstrap: [AppComponent]
})

export class AppModule { }
