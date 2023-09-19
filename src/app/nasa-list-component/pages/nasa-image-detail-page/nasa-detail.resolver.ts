import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NasaListService } from 'src/app/services/nasa-images/nasa-list.service';
import { NasaApod } from 'src/app/interfaces/nasa-images-interfaces';

@Injectable({
  providedIn: 'root',
})
export class NasaImageDetailPageResolver implements Resolve<any> {
  constructor(private nasaService: NasaListService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const date = route.paramMap.get('id');
    if (date) {
      return this.nasaService.getNasaImagesList({ date });
    }
    return;
  }
}
