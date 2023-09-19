import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { NasaApod } from 'src/app/interfaces/nasa-images-interfaces';
import { environment } from 'src/app/environments/environment';
import { NasaImagesListOptions } from 'src/app/interfaces/http/appi-options';

@Injectable({
  providedIn: 'root',
})
export class NasaListService {
  private baseUrl = environment.API_BASE_URL;
  private apiKey = environment.API_KEY;

  private _nasaImagesList: BehaviorSubject<NasaApod[] | null> =
    new BehaviorSubject<NasaApod[] | null>(null);

  private _nasaImageDetail: BehaviorSubject<NasaApod | null> =
    new BehaviorSubject<NasaApod | null>(null);

  constructor(private httpClient: HttpClient) {}

  get nasaImagesList$() {
    return this._nasaImagesList.asObservable();
  }

  getNasaImagesList(params: NasaImagesListOptions) {
    return this.httpClient
      .get<NasaApod[] | NasaApod>(`${this.baseUrl}/planetary/apod`, {
        params: {
          ...params,
          api_key: this.apiKey,
        },
      })
      .pipe(
        tap((nasaImages) => {
          console.log(nasaImages);
          if (Array.isArray(nasaImages)) {
            this._nasaImagesList.next(nasaImages);
          } else {
            this._nasaImageDetail.next(nasaImages);
          }
        }),
        catchError((err) => {
          console.log(err);
          return [];
        })
      );
  }

  getNasaImageDetail(date: string) {
    return this.httpClient
      .get<NasaApod>(`${this.baseUrl}/planetary/apod`, {
        params: {
          date: date,
          api_key: this.apiKey,
        },
      })
      .pipe(
        tap((nasaImageDetail) => {
          this._nasaImageDetail.next(nasaImageDetail);
        }),
        catchError((err) => {
          console.log(err);
          return [];
        })
      );
  }
}
