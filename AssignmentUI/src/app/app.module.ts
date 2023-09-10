import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { GifsComponent } from './components/gifs/gifs.component';
import { MaterialModule } from './material/material.module';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';
import { FavouritesComponent } from './components/favourites/favourites/favourites.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SearchBarComponent,
    GifsComponent,
    GifDetailComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    NgxMasonryModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
