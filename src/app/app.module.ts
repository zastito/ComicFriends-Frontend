import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { TopBar2Component } from './top-bar2/top-bar2.component';
import { WikiComponent } from './wiki/wiki.component';
import { Profile2Component } from './profile2/profile2.component';
import { ListdesiredComponent } from './listdesired/listdesired.component';
import { ListsaledComponent } from './listsaled/listsaled.component';
import { ListComponent } from './list/list.component';
import { ComicComponent } from './comic/comic.component';
import { OtherprofileComponent } from './otherprofile/otherprofile.component';
import { ShippingComponent } from './shipping/shipping.component';
import { UserComponent } from './user/user.component';
import { User2Component } from './user2/user2.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'main', component: MainComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile2', component: Profile2Component },
      { path: 'profile/:userId', component: OtherprofileComponent },
      { path: 'wiki', component: WikiComponent },
      { path: 'list', component: ListComponent },
      { path: 'listdesired', component: ListdesiredComponent },
      { path: 'listsaled', component: ListsaledComponent },
      { path: 'comic/:comicId', component: ComicComponent},
      { path: 'shipping/:comicPriceId', component: ShippingComponent },
      { path: 'user/:userId', component: UserComponent },
      { path: 'user2/:userId', component: User2Component }
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    TopBar2Component,
    LoginComponent,
    SignupComponent,
    MainComponent,
    ProfileComponent,
    Profile2Component,
    WikiComponent,
    ListComponent,
    ListdesiredComponent,
    ListsaledComponent,
    ComicComponent,
    OtherprofileComponent,
    ShippingComponent,
    UserComponent,
    User2Component
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/