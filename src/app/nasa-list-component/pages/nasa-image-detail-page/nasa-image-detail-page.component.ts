import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NasaListService } from 'src/app/services/nasa-images/nasa-list.service';
import { NasaApod } from 'src/app/interfaces/nasa-images-interfaces';

@Component({
  selector: 'app-nasa-image-detail-page',
  templateUrl: './nasa-image-detail-page.component.html',
  styles: [],
})
export class NasaImageDetailPageComponent implements OnInit {
  public nasaImageDetail: NasaApod | null = null;

  constructor(
    private route: ActivatedRoute,
    private nasaService: NasaListService
  ) {}

  ngOnInit(): void {
    const date = this.route.snapshot.paramMap.get('id');
    if (date) {
      this.nasaService
        .getNasaImagesList({ date: date })
        .subscribe((nasaImage) => {
          if (!Array.isArray(nasaImage)) {
            this.nasaImageDetail = nasaImage;
          }
        });
    }
  }
}
