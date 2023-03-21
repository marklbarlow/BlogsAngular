import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  CardComponent,
  CommentsComponent,
  EditBlogComponent,
  HomeComponent,
  LikesComponent,
  NavBarComponent,
  PageNotFoundComponent,
  ViewBlogComponent,
} from './components';
import { effects } from './effects';
import { reducers } from './store';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CommentsComponent,
    EditBlogComponent,
    HomeComponent,
    LikesComponent,
    NavBarComponent,
    ViewBlogComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(effects),
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
