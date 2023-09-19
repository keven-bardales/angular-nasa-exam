import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { NasaListService } from 'src/app/services/nasa-images/nasa-list.service';

const today = new Date();
const START_DATE = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
const END_DATE = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

@Injectable({ providedIn: 'root' })
export class ListPageResolver implements Resolve<any> {
  constructor(private nasaListService: NasaListService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.nasaListService.getNasaImagesList({
      count: 20,
    });
  }
}
