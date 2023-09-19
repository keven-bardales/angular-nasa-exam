import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NasaListComponentComponent } from './nasa-list-component/nasa-list-component.component';
import { ListPageComponent } from './nasa-list-component/pages/list-page/list-page.component';
import { NasaImageDetailPageComponent } from './nasa-list-component/pages/nasa-image-detail-page/nasa-image-detail-page.component';
import { NavbarNasaListComponent } from './nasa-list-component/components/navbar-nasa-list/navbar-nasa-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NasaListService } from './services/nasa-images/nasa-list.service';
import { ListPageResolver } from './nasa-list-component/pages/list-page/list-page.resolver';
import { NasaImageDetailPageResolver } from './nasa-list-component/pages/nasa-image-detail-page/nasa-detail.resolver';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NasaListComponentComponent,
    ListPageComponent,
    NasaImageDetailPageComponent,
    NavbarNasaListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpClientModule,
    NasaListService,
    ListPageResolver,
    NasaImageDetailPageResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
