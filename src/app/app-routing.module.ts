import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NasaListComponentComponent } from './nasa-list-component/nasa-list-component.component';
import { ListPageComponent } from './nasa-list-component/pages/list-page/list-page.component';
import { NasaImageDetailPageComponent } from './nasa-list-component/pages/nasa-image-detail-page/nasa-image-detail-page.component';
import { ListPageResolver } from './nasa-list-component/pages/list-page/list-page.resolver';
import { NasaImageDetailPageResolver } from './nasa-list-component/pages/nasa-image-detail-page/nasa-detail.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nasa-images/list',
    pathMatch: 'full',
  },
  {
    path: 'nasa-images',
    component: NasaListComponentComponent,
    resolve: {
      nasaImages: ListPageResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListPageComponent,
      },
      {
        path: 'detail/:id',
        component: NasaImageDetailPageComponent,
        resolve: {
          detailResolver: NasaImageDetailPageResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
